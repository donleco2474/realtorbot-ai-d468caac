import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Clock } from "lucide-react";

const hotLeads = [
  {
    id: 1,
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    area: "Downtown Condos",
    score: "Hot",
    lastMessage: "I'm ready to see properties this weekend!",
    timestamp: "5 min ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    phone: "+1 (555) 234-5678",
    area: "Suburban Homes",
    score: "Hot",
    lastMessage: "Can we schedule a viewing tomorrow?",
    timestamp: "12 min ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    phone: "+1 (555) 345-6789",
    area: "Waterfront Properties",
    score: "Hot",
    lastMessage: "I've been pre-approved and ready to make an offer",
    timestamp: "28 min ago",
  },
];

export function HotLeadsTable() {
  return (
    <div className="rounded-2xl gradient-card shadow-card border border-border/50 overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">Hot Leads - Ready to Close</h3>
        <p className="text-sm text-muted-foreground">Leads showing strong buying intent</p>
      </div>
      
      <div className="divide-y divide-border">
        {hotLeads.map((lead) => (
          <div key={lead.id} className="p-6 hover:bg-secondary/30 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold">{lead.name}</h4>
                  <Badge variant="hot">🔥 {lead.score}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{lead.area}</p>
                <p className="text-sm truncate">&quot;{lead.lastMessage}&quot;</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {lead.timestamp}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="accent" size="icon">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
