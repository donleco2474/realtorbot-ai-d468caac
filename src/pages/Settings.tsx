import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Key, Calendar, Brain, Bell } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const defaultSystemPrompt = `You are an AI assistant for a real estate agent. Your role is to:
1. Engage warmly with potential home buyers
2. Understand their needs and timeline
3. Qualify their level of interest (Hot/Warm/Cold)
4. Answer basic questions about the buying process
5. Suggest scheduling a call or viewing when appropriate

Always be professional, friendly, and helpful. If a lead shows strong buying intent, mark them as "Hot" and suggest they speak with the agent directly.`;

const Settings = () => {
  const [apiKeys, setApiKeys] = useState({
    wasenderKey: "",
    openaiKey: "",
  });
  
  const [notifications, setNotifications] = useState({
    phone: "+1 (555) 000-0000",
    email: "agent@realty.com",
  });

  const [aiSettings, setAiSettings] = useState({
    systemPrompt: defaultSystemPrompt,
    calendarLink: "https://calendly.com/your-link",
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings saved!",
      description: `Your ${section} settings have been updated.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-muted-foreground">Configure your integrations and preferences</p>
        </div>

        <Tabs defaultValue="integrations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="integrations" className="gap-2">
              <Key className="w-4 h-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2">
              <Brain className="w-4 h-4" />
              AI Configuration
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="integrations" className="space-y-6">
            <div className="p-6 rounded-2xl gradient-card shadow-card border border-border/50">
              <h3 className="text-lg font-semibold mb-4">API Keys</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wasender">WASender API Key</Label>
                  <Input
                    id="wasender"
                    type="password"
                    placeholder="Enter your WASender API key"
                    value={apiKeys.wasenderKey}
                    onChange={(e) => setApiKeys({ ...apiKeys, wasenderKey: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="openai">OpenAI API Key</Label>
                  <Input
                    id="openai"
                    type="password"
                    placeholder="sk-..."
                    value={apiKeys.openaiKey}
                    onChange={(e) => setApiKeys({ ...apiKeys, openaiKey: e.target.value })}
                  />
                </div>
                <Button 
                  variant="accent" 
                  className="gap-2"
                  onClick={() => handleSave("API")}
                >
                  <Save className="w-4 h-4" />
                  Save API Keys
                </Button>
              </div>
            </div>

            <div className="p-6 rounded-2xl gradient-card shadow-card border border-border/50">
              <h3 className="text-lg font-semibold mb-4">Webhook Configuration</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Your Webhook URL</Label>
                  <Input
                    value="https://yourapp.com/api/webhook/whatsapp"
                    readOnly
                    className="bg-secondary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Add this URL to your WhatsApp provider's webhook settings to receive incoming messages.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <div className="p-6 rounded-2xl gradient-card shadow-card border border-border/50">
              <h3 className="text-lg font-semibold mb-4">AI System Prompt</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="systemPrompt">System Instructions</Label>
                  <Textarea
                    id="systemPrompt"
                    value={aiSettings.systemPrompt}
                    onChange={(e) => setAiSettings({ ...aiSettings, systemPrompt: e.target.value })}
                    rows={10}
                    className="resize-none font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Customize how the AI responds to your leads. Be specific about your brand voice and qualification criteria.
                  </p>
                </div>
                <Button 
                  variant="accent" 
                  className="gap-2"
                  onClick={() => handleSave("AI")}
                >
                  <Save className="w-4 h-4" />
                  Save AI Settings
                </Button>
              </div>
            </div>

            <div className="p-6 rounded-2xl gradient-card shadow-card border border-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Calendar Integration
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="calendar">Booking Link</Label>
                  <Input
                    id="calendar"
                    placeholder="https://calendly.com/your-link"
                    value={aiSettings.calendarLink}
                    onChange={(e) => setAiSettings({ ...aiSettings, calendarLink: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    The AI will share this link when leads want to schedule a viewing or call.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="p-6 rounded-2xl gradient-card shadow-card border border-border/50">
              <h3 className="text-lg font-semibold mb-4">Alert Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notifPhone">WhatsApp Number for Alerts</Label>
                  <Input
                    id="notifPhone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={notifications.phone}
                    onChange={(e) => setNotifications({ ...notifications, phone: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Receive hot lead alerts and delivery failure notifications here.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notifEmail">Email Address</Label>
                  <Input
                    id="notifEmail"
                    type="email"
                    placeholder="agent@realty.com"
                    value={notifications.email}
                    onChange={(e) => setNotifications({ ...notifications, email: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Daily summary reports and important updates will be sent here.
                  </p>
                </div>
                <Button 
                  variant="accent" 
                  className="gap-2"
                  onClick={() => handleSave("notification")}
                >
                  <Save className="w-4 h-4" />
                  Save Notification Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
