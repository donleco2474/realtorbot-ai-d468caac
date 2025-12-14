import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, MessageSquare, Search, Filter, Clock } from "lucide-react";

const allHotLeads = [
  {
    id: 1,
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    area: "Downtown Condos",
    score: "Hot",
    lastMessage: "I'm ready to see properties this weekend!",
    timestamp: "5 min ago",
    budget: "$500K - $750K",
  },
  {
    id: 2,
    name: "Michael Chen",
    phone: "+1 (555) 234-5678",
    area: "Suburban Homes",
    score: "Hot",
    lastMessage: "Can we schedule a viewing tomorrow?",
    timestamp: "12 min ago",
    budget: "$400K - $600K",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    phone: "+1 (555) 345-6789",
    area: "Waterfront Properties",
    score: "Hot",
    lastMessage: "I've been pre-approved and ready to make an offer",
    timestamp: "28 min ago",
    budget: "$800K - $1.2M",
  },
  {
    id: 4,
    name: "David Kim",
    phone: "+1 (555) 456-7890",
    area: "New Construction",
    score: "Hot",
    lastMessage: "Looking for a 4 bedroom with a pool",
    timestamp: "1 hour ago",
    budget: "$600K - $900K",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    phone: "+1 (555) 567-8901",
    area: "Historic District",
    score: "Hot",
    lastMessage: "We need to close within 30 days",
    timestamp: "2 hours ago",
    budget: "$350K - $500K",
  },
];

const HotLeads = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Hot Leads</h2>
            <p className="text-muted-foreground">Leads ready for immediate follow-up</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search leads..." 
                className="pl-9 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Leads Grid */}
        <div className="grid gap-4">
          {allHotLeads.map((lead) => (
            <div 
              key={lead.id}
              className="p-6 rounded-2xl gradient-card shadow-card border border-border/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{lead.name}</h3>
                    <Badge variant="hot">🔥 {lead.score}</Badge>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Area</p>
                      <p className="font-medium">{lead.area}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Budget</p>
                      <p className="font-medium">{lead.budget}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-medium">{lead.phone}</p>
                    </div>
                  </div>
                  <div className="mt-3 p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm italic">&quot;{lead.lastMessage}&quot;</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {lead.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </Button>
                  <Button variant="accent" className="gap-2">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HotLeads;
