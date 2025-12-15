import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto rounded-3xl gradient-primary p-12 md:p-16 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Never Miss a Lead Again?
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Join hundreds of top-performing realtors who trust RealtorFlow AI to nurture their leads while they focus on closing deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="xl" asChild>
                <Link to="/subscribe">
                  Get Started - ₦40,000 for 4 Months
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/60 mt-6">
              Limited launch offer • Save ₦20,000 • Full access included
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
