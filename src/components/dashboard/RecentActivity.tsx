import { MessageSquare, Send, Bell, CheckCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "message_received",
    title: "Reply from Sarah Johnson",
    description: "AI qualified as Hot Lead",
    time: "5 min ago",
    icon: MessageSquare,
  },
  {
    id: 2,
    type: "message_sent",
    title: "Day 2 message sent",
    description: "To Michael Chen",
    time: "15 min ago",
    icon: Send,
  },
  {
    id: 3,
    type: "alert",
    title: "Hot Lead Alert",
    description: "Emily Rodriguez is ready to buy",
    time: "28 min ago",
    icon: Bell,
  },
  {
    id: 4,
    type: "campaign_complete",
    title: "Campaign completed",
    description: "David Kim - 5 day sequence done",
    time: "1 hour ago",
    icon: CheckCircle,
  },
];

export function RecentActivity() {
  return (
    <div className="rounded-2xl gradient-card shadow-card border border-border/50 overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Latest updates from your campaigns</p>
      </div>
      
      <div className="divide-y divide-border">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 flex items-start gap-4 hover:bg-secondary/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <activity.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.description}</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
