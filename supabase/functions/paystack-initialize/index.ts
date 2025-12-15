import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;

    if (!PAYSTACK_SECRET_KEY) {
      console.error('PAYSTACK_SECRET_KEY is not configured');
      throw new Error('Payment gateway not configured');
    }

    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Create Supabase client with user's auth
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } }
    });

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('User auth error:', userError);
      throw new Error('Unauthorized');
    }

    console.log('Processing payment for user:', user.id);

    // Parse request body
    const { amount, upsell_selected } = await req.json();

    if (!amount || amount < 100) {
      throw new Error('Invalid amount');
    }

    // Generate unique reference
    const reference = `RF_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    console.log('Initializing Paystack transaction:', { amount, reference, upsell_selected });

    // Get callback URL from request origin or use a default
    const origin = req.headers.get('origin') || 'https://lovable.app';
    const callbackUrl = `${origin}/payment-success`;

    // Initialize Paystack transaction
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        amount: amount * 100, // Paystack expects amount in kobo
        reference,
        callback_url: callbackUrl,
        metadata: {
          user_id: user.id,
          upsell_selected: upsell_selected || false,
          custom_fields: [
            {
              display_name: "Plan",
              variable_name: "plan",
              value: "RealtorFlow AI Pro - 4 Months"
            },
            {
              display_name: "Upsell",
              variable_name: "upsell",
              value: upsell_selected ? "White-Glove Setup" : "None"
            }
          ]
        }
      }),
    });

    const paystackData = await paystackResponse.json();

    console.log('Paystack response:', paystackData);

    if (!paystackData.status) {
      throw new Error(paystackData.message || 'Failed to initialize payment');
    }

    // Store payment record in database
    const { error: insertError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        amount,
        reference,
        status: 'pending',
        upsell_selected: upsell_selected || false,
        metadata: { paystack_access_code: paystackData.data.access_code }
      });

    if (insertError) {
      console.error('Error storing payment record:', insertError);
      // Continue anyway - payment can still proceed
    }

    return new Response(JSON.stringify({
      authorization_url: paystackData.data.authorization_url,
      reference,
      access_code: paystackData.data.access_code,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Payment initialization error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Payment initialization failed' 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
