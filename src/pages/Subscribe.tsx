import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Sparkles, Shield, Clock, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MAIN_PRICE = 40000;
const UPSELL_PRICE = 25000;
const MONTHLY_PRICE = 15000;

export default function Subscribe() {
  const [upsellSelected, setUpsellSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalPrice = MAIN_PRICE + (upsellSelected ? UPSELL_PRICE : 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please sign in to continue");
      navigate("/auth");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('paystack-initialize', {
        body: {
          amount: totalPrice,
          upsell_selected: upsellSelected,
        },
      });

      if (error) throw error;

      if (data?.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        throw new Error("Failed to get payment URL");
      }
    } catch (error: any) {
      console.error("Payment initialization error:", error);
      toast.error(error.message || "Failed to initialize payment");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "Automated WhatsApp lead follow-up",
    "AI-powered conversation analysis",
    "Smart drip campaign automation",
    "Hot lead detection & alerts",
    "Unlimited leads & conversations",
    "Priority support",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Limited Launch Offer</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Transform Your Real Estate Business
          </h1>
          <p className="text-lg text-muted-foreground">
            Get 4 months of RealtorFlow AI Pro and never miss another lead again.
            Automate your follow-ups and close more deals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Pricing Card */}
          <Card className="relative overflow-hidden border-2 border-accent shadow-glow">
            <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-sm font-medium rounded-bl-lg">
              LAUNCH SPECIAL
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">RealtorFlow AI Pro</CardTitle>
              <CardDescription>4 Months Full Access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-foreground">{formatPrice(MAIN_PRICE)}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="line-through">{formatPrice(MONTHLY_PRICE * 4)}</span>
                  {" "}— Save {formatPrice((MONTHLY_PRICE * 4) - MAIN_PRICE)}!
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Standard price: {formatPrice(MONTHLY_PRICE)}/month after promotional period
                </p>
              </div>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-success" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Offer ends soon — Lock in this price today!
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Upsell & Payment Card */}
          <div className="space-y-6">
            {/* Upsell Option */}
            <Card className="border-dashed border-2 border-border hover:border-accent/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Checkbox
                    id="upsell"
                    checked={upsellSelected}
                    onCheckedChange={(checked) => setUpsellSelected(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="upsell" className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="h-5 w-5 text-accent" />
                        <span className="font-semibold text-foreground">White-Glove Setup Service</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Save time and avoid technical headaches. Our team will handle the complete setup for you, 
                        including connecting your Google and WhatsApp accounts.
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground">+{formatPrice(UPSELL_PRICE)}</span>
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded text-secondary-foreground">ONE-TIME</span>
                      </div>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Order Summary</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-90">RealtorFlow AI Pro (4 months)</span>
                    <span>{formatPrice(MAIN_PRICE)}</span>
                  </div>
                  {upsellSelected && (
                    <div className="flex justify-between">
                      <span className="opacity-90">White-Glove Setup Service</span>
                      <span>{formatPrice(UPSELL_PRICE)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-primary-foreground/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <Button 
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-button h-12 text-base font-semibold"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Proceed to Payment
                    </span>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs opacity-75">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment powered by Paystack</span>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-xs text-muted-foreground">Active Agents</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">10K+</div>
                <div className="text-xs text-muted-foreground">Leads Captured</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-xs text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
