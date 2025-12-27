import { useState } from "react";
import { 
  Phone, PhoneIncoming, PhoneOutgoing, Search, Filter, SlidersHorizontal,
  Calendar, Clock, Settings, ChevronLeft, ChevronRight, Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CallCard, type Call } from "@/components/calls/CallCard";
import { CallDetail } from "@/components/calls/CallDetail";
import { CallPolicySettings } from "@/components/calls/CallPolicySettings";

const mockCalls: Call[] = [
  {
    id: "1",
    leadName: "Sarah Johnson",
    leadCompany: "TechCorp Inc.",
    type: "outbound",
    purpose: "reminder",
    status: "completed",
    outcome: "confirmed",
    duration: "0:42",
    completedAt: "Today, 10:30 AM",
    confidence: 0.91,
  },
  {
    id: "2",
    leadName: "Michael Chen",
    leadCompany: "Innovate Labs",
    type: "inbound",
    purpose: "booking",
    status: "completed",
    outcome: "booked",
    duration: "2:15",
    completedAt: "Today, 9:15 AM",
    confidence: 0.88,
  },
  {
    id: "3",
    leadName: "Emily Rodriguez",
    leadCompany: "Growth Partners",
    type: "outbound",
    purpose: "reminder",
    status: "missed",
    outcome: "no-answer",
    scheduledAt: "Today, 8:00 AM",
  },
  {
    id: "4",
    leadName: "David Kim",
    leadCompany: "StartupXYZ",
    type: "outbound",
    purpose: "reminder",
    status: "scheduled",
    scheduledAt: "Tomorrow, 2:00 PM",
  },
  {
    id: "5",
    leadName: "Jessica Williams",
    leadCompany: "Enterprise Co",
    type: "inbound",
    purpose: "booking",
    status: "completed",
    outcome: "rescheduled",
    duration: "1:38",
    completedAt: "Yesterday, 4:45 PM",
    confidence: 0.76,
  },
  {
    id: "6",
    leadName: "Robert Taylor",
    leadCompany: "Acme Corp",
    type: "outbound",
    purpose: "reminder",
    status: "completed",
    outcome: "voicemail",
    duration: "0:28",
    completedAt: "Yesterday, 11:20 AM",
  },
  {
    id: "7",
    leadName: "Amanda Foster",
    leadCompany: "Digital Solutions",
    type: "inbound",
    purpose: "booking",
    status: "completed",
    outcome: "declined",
    duration: "0:55",
    completedAt: "Yesterday, 10:00 AM",
    confidence: 0.94,
  },
];

export default function Calls() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCall, setSelectedCall] = useState<Call | null>(mockCalls[0]);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const filteredCalls = mockCalls.filter((call) => {
    const matchesSearch = 
      call.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.leadCompany.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "inbound") return matchesSearch && call.type === "inbound";
    if (activeTab === "outbound") return matchesSearch && call.type === "outbound";
    if (activeTab === "scheduled") return matchesSearch && call.status === "scheduled";
    return matchesSearch;
  });

  const stats = {
    total: mockCalls.length,
    completed: mockCalls.filter(c => c.status === "completed").length,
    scheduled: mockCalls.filter(c => c.status === "scheduled").length,
    missed: mockCalls.filter(c => c.status === "missed").length,
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col animate-fade-in">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Calls</h1>
            <p className="text-muted-foreground mt-1">
              Manage inbound booking and outbound reminder calls
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Call
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Call
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-card/50 border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Total Calls</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="p-4 rounded-lg bg-card/50 border border-border">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Completed</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
          </div>
          <div className="p-4 rounded-lg bg-card/50 border border-border">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Scheduled</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.scheduled}</p>
          </div>
          <div className="p-4 rounded-lg bg-card/50 border border-border">
            <div className="flex items-center gap-2 text-destructive mb-1">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Missed</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.missed}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-3 border-b border-border">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All Calls</TabsTrigger>
            <TabsTrigger value="inbound">
              <PhoneIncoming className="w-4 h-4 mr-1" />
              Inbound
            </TabsTrigger>
            <TabsTrigger value="outbound">
              <PhoneOutgoing className="w-4 h-4 mr-1" />
              Outbound
            </TabsTrigger>
            <TabsTrigger value="scheduled">
              <Clock className="w-4 h-4 mr-1" />
              Scheduled
            </TabsTrigger>
            <TabsTrigger value="policies">
              <Settings className="w-4 h-4 mr-1" />
              Policies
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="policies" className="flex-1 overflow-y-auto p-6 m-0">
          <CallPolicySettings />
        </TabsContent>

        {["all", "inbound", "outbound", "scheduled"].map((tab) => (
          <TabsContent key={tab} value={tab} className="flex-1 flex overflow-hidden m-0">
            {/* Calls List */}
            <div 
              className={cn(
                "border-r border-border flex flex-col bg-card/30 transition-all duration-300 ease-in-out relative",
                isPanelCollapsed ? "w-0 min-w-0 overflow-hidden border-r-0" : "w-96 min-w-[384px]"
              )}
            >
              {/* Search */}
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search calls..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-background/50"
                  />
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Sort
                  </Button>
                </div>
              </div>

              {/* Call List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {filteredCalls.map((call) => (
                  <CallCard
                    key={call.id}
                    call={call}
                    isSelected={selectedCall?.id === call.id}
                    onClick={() => setSelectedCall(call)}
                  />
                ))}
                {filteredCalls.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Phone className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No calls found</p>
                  </div>
                )}
              </div>

              {/* Toggle Button */}
              <button 
                onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors shadow-lg z-10"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-foreground" />
              </button>
            </div>

            {/* Toggle Button when collapsed */}
            {isPanelCollapsed && (
              <button 
                onClick={() => setIsPanelCollapsed(false)}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors shadow-lg z-10"
              >
                <ChevronRight className="w-3.5 h-3.5 text-foreground" />
              </button>
            )}

            {/* Call Detail */}
            <div className="flex-1 bg-background/50">
              {selectedCall ? (
                <CallDetail call={selectedCall} />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Phone className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>Select a call to view details</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
