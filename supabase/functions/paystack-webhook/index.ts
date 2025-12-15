import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-paystack-signature',
};

// Verify Paystack webhook signature using Web Crypto API
async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign']
  );
  
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  const computedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return computedHash === signature;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!PAYSTACK_SECRET_KEY) {
      console.error('PAYSTACK_SECRET_KEY is not configured');
      throw new Error('Payment gateway not configured');
    }

    // Get the raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    console.log('Received webhook with signature:', signature ? 'present' : 'missing');

    // Verify the webhook signature
    if (!signature) {
      console.error('No signature provided');
      return new Response(JSON.stringify({ error: 'No signature' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const isValid = await verifySignature(rawBody, signature, PAYSTACK_SECRET_KEY);
    if (!isValid) {
      console.error('Invalid signature');
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Signature verified successfully');

    // Parse the webhook payload
    const payload = JSON.parse(rawBody);
    const { event, data } = payload;

    console.log('Webhook event:', event);
    console.log('Webhook data reference:', data?.reference);

    // Only process successful charges
    if (event !== 'charge.success') {
      console.log('Ignoring non-success event:', event);
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create Supabase client with service role for admin operations
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Extract data from the webhook
    const { reference, metadata, amount } = data;
    const userId = metadata?.user_id;
    const upsellSelected = metadata?.upsell_selected || false;

    if (!userId) {
      console.error('No user_id in metadata');
      throw new Error('Missing user_id in payment metadata');
    }

    console.log('Processing payment for user:', userId, 'Amount:', amount / 100);

    // Calculate expiry date (4 months from now)
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 4);

    // Update payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .update({
        status: 'success',
        paystack_reference: data.id?.toString(),
        updated_at: new Date().toISOString(),
      })
      .eq('reference', reference);

    if (paymentError) {
      console.error('Error updating payment record:', paymentError);
    }

    // Update user profile with subscription info
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        plan_expiry_date: expiryDate.toISOString(),
        is_active: true,
        white_glove_setup_purchased: upsellSelected,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (profileError) {
      console.error('Error updating profile:', profileError);
      throw new Error('Failed to activate subscription');
    }

    console.log('Subscription activated successfully for user:', userId);
    console.log('Expiry date:', expiryDate.toISOString());
    console.log('White-glove setup:', upsellSelected);

    return new Response(JSON.stringify({ 
      received: true,
      user_id: userId,
      expiry_date: expiryDate.toISOString(),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Webhook processing failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
