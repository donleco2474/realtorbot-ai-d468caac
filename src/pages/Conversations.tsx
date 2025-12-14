import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, Bot, User } from "lucide-react";

const conversations = [
  {
    id: 1,
    leadName: "Sarah Johnson",
    leadScore: "Hot",
    messages: [
      { role: "bot", content: "Hi Sarah! 👋 I'm reaching out from ABC Realty. I noticed you're interested in Downtown Condos. What's your timeline for buying?" },
      { role: "user", content: "I'm looking to move within the next 2 months" },
      { role: "bot", content: "That's a great timeline! There are some excellent units coming on the market. What's your budget range and how many bedrooms do you need?" },
      { role: "user", content: "I'm ready to see properties this weekend!" },
    ],
    timestamp: "5 min ago",
    status: "Active",
  },
  {
    id: 2,
    leadName: "Michael Chen",
    leadScore: "Hot",
    messages: [
      { role: "bot", content: "Hello Michael! Thanks for your interest in suburban homes. What features are most important to you?" },
      { role: "user", content: "Looking for 4 bedrooms, good schools nearby" },
      { role: "bot", content: "I have several properties that match! When would be a good time to chat about your specific needs?" },
      { role: "user", content: "Can we schedule a viewing tomorrow?" },
    ],
    timestamp: "12 min ago",
    status: "Active",
  },
  {
    id: 3,
    leadName: "James Wilson",
    leadScore: "Warm",
    messages: [
      { role: "bot", content: "Hi James! Following up on your inquiry about investment properties. Are you still looking?" },
      { role: "user", content: "Yes, but not ready to buy yet. Maybe in 6 months" },
    ],
    timestamp: "1 hour ago",
    status: "Paused",
  },
];

const Conversations = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Conversations</h2>
            <p className="text-muted-foreground">Review AI-powered lead interactions</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-9 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="grid gap-4">
          {conversations.map((convo) => (
            <div 
              key={convo.id}
              className="rounded-2xl gradient-card shadow-card border border-border/50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="font-semibold text-sm">
                      {convo.leadName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{convo.leadName}</h3>
                    <p className="text-xs text-muted-foreground">{convo.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={convo.leadScore === "Hot" ? "hot" : "secondary"}>
                    {convo.leadScore}
                  </Badge>
                  <Badge variant={convo.status === "Active" ? "success" : "secondary"}>
                    {convo.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages Preview */}
              <div className="p-4 space-y-3 max-h-48 overflow-y-auto">
                {convo.messages.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`flex gap-3 ${msg.role === 'bot' ? '' : 'justify-end'}`}
                  >
                    {msg.role === 'bot' && (
                      <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-accent-foreground" />
                      </div>
                    )}
                    <div className={`max-w-[70%] p-3 rounded-xl text-sm ${
                      msg.role === 'bot' 
                        ? 'bg-secondary' 
                        : 'bg-primary text-primary-foreground'
                    }`}>
                      {msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Conversations;
