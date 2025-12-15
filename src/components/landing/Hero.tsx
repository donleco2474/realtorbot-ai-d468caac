import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, MessageSquare, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/5 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              AI-Powered Lead Follow-Up for Realtors
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="animate-slide-up text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Turn Every Lead Into a{" "}
            <span className="text-gradient">Closing Opportunity</span>
          </h1>

          {/* Subheading */}
          <p className="animate-slide-up text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10" style={{ animationDelay: '0.1s' }}>
            Automate your WhatsApp follow-ups with intelligent AI that nurtures leads 24/7, qualifies them instantly, and alerts you when they're ready to buy.
          </p>

          {/* CTA Buttons */}
          <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center mb-16" style={{ animationDelay: '0.2s' }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/auth">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/auth">
                View Demo
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="animate-slide-up grid grid-cols-3 gap-8 max-w-2xl mx-auto" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                <span className="text-3xl font-bold">10x</span>
              </div>
              <p className="text-sm text-muted-foreground">More Responses</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="text-3xl font-bold">40%</span>
              </div>
              <p className="text-sm text-muted-foreground">Higher Conversion</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-3xl font-bold">24/7</span>
              </div>
              <p className="text-sm text-muted-foreground">Lead Nurturing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
