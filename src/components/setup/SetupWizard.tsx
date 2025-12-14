import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle2, 
  FileSpreadsheet, 
  MessageCircle, 
  Brain, 
  Bell,
  ArrowRight,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "google",
    title: "Connect Google",
    description: "Link your Google account to create your leads database",
    icon: FileSpreadsheet,
  },
  {
    id: "whatsapp",
    title: "WhatsApp API",
    description: "Connect your WhatsApp business API provider",
    icon: MessageCircle,
  },
  {
    id: "openai",
    title: "AI Configuration",
    description: "Add your OpenAI API key for intelligent responses",
    icon: Brain,
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Set up alerts for hot leads",
    icon: Bell,
  },
];

interface SetupWizardProps {
  onComplete: () => void;
}

export function SetupWizard({ onComplete }: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    wasenderApiKey: "",
    webhookUrl: "https://yourapp.com/api/webhook/whatsapp",
    openaiApiKey: "",
    notificationPhone: "",
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onComplete();
      }, 1500);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-secondary/50 border border-border">
              <h4 className="font-medium mb-2">What we'll create for you:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  RealtorFlow Leads DB spreadsheet
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Leads, Conversations, Hot Leads tabs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Auto-sync with your campaigns
                </li>
              </ul>
            </div>
            <Button variant="accent" className="w-full" size="lg">
              <FileSpreadsheet className="w-5 h-5 mr-2" />
              Connect Google Account
            </Button>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wasenderApiKey">WASender API Key</Label>
                <Input
                  id="wasenderApiKey"
                  type="password"
                  placeholder="Enter your WASender API key"
                  value={formData.wasenderApiKey}
                  onChange={(e) => setFormData({ ...formData, wasenderApiKey: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Your Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  value={formData.webhookUrl}
                  readOnly
                  className="bg-secondary"
                />
                <p className="text-xs text-muted-foreground">
                  Add this URL to your WhatsApp provider's webhook settings
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openaiApiKey">OpenAI API Key</Label>
                <Input
                  id="openaiApiKey"
                  type="password"
                  placeholder="sk-..."
                  value={formData.openaiApiKey}
                  onChange={(e) => setFormData({ ...formData, openaiApiKey: e.target.value })}
                />
              </div>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm">
                  <strong>Recommended:</strong> GPT-4 Turbo for best lead qualification results
                </p>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notificationPhone">Your WhatsApp Number</Label>
                <Input
                  id="notificationPhone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.notificationPhone}
                  onChange={(e) => setFormData({ ...formData, notificationPhone: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  You'll receive hot lead alerts and delivery failure notifications here
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                  index < currentStep 
                    ? "bg-success text-success-foreground" 
                    : index === currentStep
                    ? "gradient-accent text-accent-foreground shadow-glow"
                    : "bg-secondary text-muted-foreground"
                )}>
                  {index < currentStep ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-16 sm:w-24 h-1 mx-2 rounded-full transition-colors duration-300",
                    index < currentStep ? "bg-success" : "bg-secondary"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl gradient-card shadow-card border border-border/50 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h2>
            <p className="text-muted-foreground">{steps[currentStep].description}</p>
          </div>

          {renderStepContent()}

          {/* Actions */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              variant="accent"
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Setting up...
                </>
              ) : currentStep === steps.length - 1 ? (
                "Complete Setup"
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
