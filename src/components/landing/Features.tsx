import { 
  MessageSquare, 
  Brain, 
  Bell, 
  Calendar, 
  BarChart3, 
  Shield 
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Smart Drip Campaigns",
    description: "Automated WhatsApp sequences that adapt to each lead's responses and engagement level.",
  },
  {
    icon: Brain,
    title: "AI Lead Qualification",
    description: "GPT-4 analyzes every reply, scores leads as Hot/Warm/Cold, and generates perfect responses.",
  },
  {
    icon: Bell,
    title: "Instant Hot Lead Alerts",
    description: "Get notified the moment a lead shows buying intent—never miss a ready-to-close opportunity.",
  },
  {
    icon: Calendar,
    title: "Seamless Scheduling",
    description: "AI automatically offers your calendar link when leads are ready to book a viewing.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track campaign performance, response rates, and conversion metrics at a glance.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Your data stays safe with encryption and secure API integrations you control.",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Close More Deals</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful automation tools designed specifically for real estate professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl gradient-card shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
