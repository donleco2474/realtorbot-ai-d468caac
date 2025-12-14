import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect Your Tools",
    description: "Link your Google Sheets, WhatsApp API, and OpenAI in minutes with our guided setup wizard.",
  },
  {
    number: "02",
    title: "Customize Your Messages",
    description: "Craft your perfect drip sequence with personalized templates and smart placeholders.",
  },
  {
    number: "03",
    title: "Add Leads & Watch the Magic",
    description: "Add leads to your sheet and RealtorFlow AI handles the rest—messaging, qualifying, and alerting.",
  },
  {
    number: "04",
    title: "Close Hot Leads",
    description: "Get instant notifications when leads are ready to buy. Step in at the perfect moment.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get started in under 10 minutes. No coding required.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent hidden md:block" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="relative flex gap-8 items-start"
                >
                  {/* Step number */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center text-xl font-bold text-accent-foreground shadow-glow shrink-0">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-lg text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Checkmark for completed feel */}
                  <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-3 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
