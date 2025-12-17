import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, AlertTriangle, Clock } from "lucide-react";
import { differenceInDays, format } from "date-fns";

type SubscriptionState = "active" | "expiring_soon" | "expired" | "no_subscription";

export const SubscriptionStatus = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<SubscriptionState>("no_subscription");
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_active, plan_expiry_date")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profile?.plan_expiry_date) {
        const expiry = new Date(profile.plan_expiry_date);
        const now = new Date();
        const days = differenceInDays(expiry, now);

        setExpiryDate(expiry);
        setDaysLeft(days);

        if (days < 0) {
          setStatus("expired");
        } else if (days <= 7) {
          setStatus("expiring_soon");
        } else if (profile.is_active) {
          setStatus("active");
        } else {
          setStatus("no_subscription");
        }
      } else {
        setStatus("no_subscription");
      }

      setLoading(false);
    };

    fetchSubscriptionStatus();
  }, [user]);

  if (loading) {
    return null;
  }

  const renderContent = () => {
    switch (status) {
      case "active":
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Pro Plan Active</p>
                <p className="text-sm text-muted-foreground">
                  Expires {expiryDate && format(expiryDate, "MMM d, yyyy")} ({daysLeft} days left)
                </p>
              </div>
            </div>
            <Badge variant="default" className="bg-success text-success-foreground">Active</Badge>
          </div>
        );

      case "expiring_soon":
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-warning" />
              <div>
                <p className="font-medium text-foreground">Subscription Expiring Soon</p>
                <p className="text-sm text-muted-foreground">
                  Only {daysLeft} day{daysLeft !== 1 ? "s" : ""} left! Renew now to avoid interruption.
                </p>
              </div>
            </div>
            <Button asChild size="sm">
              <Link to="/subscribe">Renew Now</Link>
            </Button>
          </div>
        );

      case "expired":
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <div>
                <p className="font-medium text-foreground">Subscription Expired</p>
                <p className="text-sm text-muted-foreground">
                  Your subscription expired on {expiryDate && format(expiryDate, "MMM d, yyyy")}. Renew to continue using RealtorFlow.
                </p>
              </div>
            </div>
            <Button asChild size="sm" variant="destructive">
              <Link to="/subscribe">Reactivate</Link>
            </Button>
          </div>
        );

      case "no_subscription":
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">No Active Subscription</p>
                <p className="text-sm text-muted-foreground">
                  Subscribe to unlock all features and automate your lead nurturing.
                </p>
              </div>
            </div>
            <Button asChild size="sm">
              <Link to="/subscribe">Subscribe Now</Link>
            </Button>
          </div>
        );
    }
  };

  return (
    <Card className={`${status === "expired" ? "border-destructive/50" : status === "expiring_soon" ? "border-warning/50" : ""}`}>
      <CardContent className="pt-4 pb-4">
        {renderContent()}
      </CardContent>
    </Card>
  );
};
