import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  
  const reference = searchParams.get("reference");

  useEffect(() => {
    // Give webhook time to process
    const timer = setTimeout(() => {
      setVerifying(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center space-y-6">
          {verifying ? (
            <>
              <div className="flex justify-center">
                <Loader2 className="h-16 w-16 text-accent animate-spin" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Verifying Payment...
                </h1>
                <p className="text-muted-foreground">
                  Please wait while we confirm your payment.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-success" />
                </div>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Payment Successful!
                </h1>
                <p className="text-muted-foreground">
                  Welcome to RealtorFlow AI Pro! Your subscription is now active.
                </p>
              </div>

              {reference && (
                <p className="text-xs text-muted-foreground">
                  Reference: {reference}
                </p>
              )}

              <div className="space-y-3 pt-4">
                <Button 
                  onClick={() => navigate("/dashboard")}
                  className="w-full gap-2"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/dashboard/settings")}
                  className="w-full"
                >
                  Configure Settings
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
