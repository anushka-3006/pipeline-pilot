import { Users, Mail, Calendar, TrendingUp, Send, Clock, Phone } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { CampaignPerformance } from "@/components/dashboard/CampaignPerformance";
import { PipelineOverview } from "@/components/dashboard/PipelineOverview";
import { CallAnalytics } from "@/components/dashboard/CallAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, John. Here's what's happening with your outreach.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Leads"
          value="1,284"
          change={12.5}
          changeLabel="vs last week"
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          title="Emails Sent"
          value="4,892"
          change={8.2}
          changeLabel="vs last week"
          icon={<Send className="w-5 h-5" />}
        />
        <StatCard
          title="Reply Rate"
          value="18.4%"
          change={-2.3}
          changeLabel="vs last week"
          icon={<Mail className="w-5 h-5" />}
        />
        <StatCard
          title="Meetings Booked"
          value="47"
          change={24.1}
          changeLabel="vs last week"
          icon={<Calendar className="w-5 h-5" />}
        />
      </div>

      {/* Tabs for different analytics views */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calls" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Call Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CampaignPerformance />
              <ActivityFeed />
            </div>
            <div className="space-y-6">
              <PipelineOverview />
              
              {/* Quick Actions */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-primary justify-start">
                    <Users className="w-4 h-4" />
                    Import Leads
                  </button>
                  <button className="w-full btn-secondary justify-start">
                    <Send className="w-4 h-4" />
                    Create Campaign
                  </button>
                  <button className="w-full btn-ghost justify-start border border-border">
                    <Clock className="w-4 h-4" />
                    Schedule Follow-ups
                  </button>
                </div>
              </div>

              {/* Health Status */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Email Health</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Domain reputation</span>
                    <span className="text-sm font-medium text-success">Excellent</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Warm-up status</span>
                    <span className="text-sm font-medium text-primary">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">SPF/DKIM</span>
                    <span className="text-sm font-medium text-success">Configured</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Daily limit</span>
                    <span className="text-sm font-medium text-foreground">145 / 200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calls" className="mt-6">
          <CallAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
