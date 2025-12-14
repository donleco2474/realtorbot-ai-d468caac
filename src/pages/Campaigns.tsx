import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const defaultMessages = [
  {
    day: 0,
    label: "Day 0 - Initial Contact",
    enabled: true,
    message: "Hi {{name}}! 👋 I'm reaching out from ABC Realty. I noticed you're interested in {{area}}. I'd love to help you find your perfect property! What's your timeline for buying?",
  },
  {
    day: 1,
    label: "Day 1 - Follow Up",
    enabled: true,
    message: "Hi {{name}}, just checking in! Did you have a chance to think about your property search? I have some great listings in {{area}} I'd love to share with you.",
  },
  {
    day: 2,
    label: "Day 2 - Value Add",
    enabled: true,
    message: "{{name}}, I just came across a new listing in {{area}} that matches what many buyers are looking for. Would you like me to send you the details?",
  },
  {
    day: 4,
    label: "Day 4 - Engagement",
    enabled: true,
    message: "Hi {{name}}! The market in {{area}} is moving fast. If you're still interested, I'd be happy to set up a quick call to discuss your options. When works for you?",
  },
  {
    day: 6,
    label: "Day 6 - Final Touch",
    enabled: true,
    message: "{{name}}, I wanted to reach out one more time. If you're ready to explore properties in {{area}}, I'm here to help! Just reply to this message or give me a call anytime.",
  },
];

const Campaigns = () => {
  const [messages, setMessages] = useState(defaultMessages);

  const handleMessageChange = (index: number, newMessage: string) => {
    const updated = [...messages];
    updated[index].message = newMessage;
    setMessages(updated);
  };

  const handleToggle = (index: number) => {
    const updated = [...messages];
    updated[index].enabled = !updated[index].enabled;
    setMessages(updated);
  };

  const handleSave = () => {
    toast({
      title: "Campaign saved!",
      description: "Your drip campaign messages have been updated.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Drip Campaigns</h2>
            <p className="text-muted-foreground">Customize your automated message sequence</p>
          </div>
          <Button variant="accent" className="gap-2" onClick={handleSave}>
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>

        {/* Placeholders Info */}
        <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-start gap-3">
          <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Available Placeholders</p>
            <p className="text-sm text-muted-foreground">
              Use <code className="px-1 py-0.5 rounded bg-secondary">{"{{name}}"}</code> for lead's name and{" "}
              <code className="px-1 py-0.5 rounded bg-secondary">{"{{area}}"}</code> for their area of interest.
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-6">
          {messages.map((item, index) => (
            <div 
              key={item.day}
              className={`p-6 rounded-2xl gradient-card shadow-card border border-border/50 transition-opacity ${
                !item.enabled ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">{item.label}</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {item.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <Switch
                    checked={item.enabled}
                    onCheckedChange={() => handleToggle(index)}
                  />
                </div>
              </div>
              <Textarea
                value={item.message}
                onChange={(e) => handleMessageChange(index, e.target.value)}
                rows={4}
                className="resize-none"
                disabled={!item.enabled}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {item.message.length} characters
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
