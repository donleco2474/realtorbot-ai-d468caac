import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { HotLeadsTable } from "@/components/dashboard/HotLeadsTable";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { SubscriptionStatus } from "@/components/dashboard/SubscriptionStatus";
import { SetupWizard } from "@/components/setup/SetupWizard";
import { Users, Flame, Send, MessageSquare } from "lucide-react";

const Dashboard = () => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isSetupComplete) {
    return <SetupWizard onComplete={() => setIsSetupComplete(true)} />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Subscription Status */}
        <SubscriptionStatus />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Leads"
            value="248"
            change="+12%"
            changeType="positive"
            icon={<Users className="w-6 h-6 text-primary" />}
          />
          <MetricCard
            title="Hot Leads"
            value="18"
            change="+5 today"
            changeType="positive"
            icon={<Flame className="w-6 h-6 text-hot" />}
          />
          <MetricCard
            title="Active Campaigns"
            value="42"
            change="6 completing today"
            changeType="neutral"
            icon={<Send className="w-6 h-6 text-accent" />}
          />
          <MetricCard
            title="Response Rate"
            value="67%"
            change="+8%"
            changeType="positive"
            icon={<MessageSquare className="w-6 h-6 text-success" />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <HotLeadsTable />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
