import { useState } from "react";
import { 
  Phone, PhoneIncoming, PhoneOutgoing, Search, Filter, SlidersHorizontal,
  Calendar, Clock, ChevronLeft, ChevronRight, Plus, FileText, Activity, Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CallCard, type Call } from "@/components/calls/CallCard";
import { CallDetail } from "@/components/calls/CallDetail";
import { CallPolicySettings } from "@/components/calls/CallPolicySettings";
import { CallScriptEditor } from "@/components/calls/CallScriptEditor";
import { VoiceInfraHealth } from "@/components/calls/VoiceInfraHealth";

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

const filters = [
  { id: "all", label: "All Calls", icon: Phone },
  { id: "inbound", label: "Inbound", icon: PhoneIncoming },
  { id: "outbound", label: "Outbound", icon: PhoneOutgoing },
  { id: "scheduled", label: "Scheduled", icon: Clock },
];

export default function Calls() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCalls = mockCalls.filter((call) => {
    const matchesSearch = 
      call.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.leadCompany.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "inbound") return matchesSearch && call.type === "inbound";
    if (activeFilter === "outbound") return matchesSearch && call.type === "outbound";
    if (activeFilter === "scheduled") return matchesSearch && call.status === "scheduled";
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
      <div className="p-6 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Calls</h1>
            <p className="text-muted-foreground mt-1">
              Manage inbound booking and outbound reminder calls
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Scripts Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Scripts
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                <CallScriptEditor />
              </DialogContent>
            </Dialog>

            {/* Infrastructure Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Activity className="w-4 h-4 mr-2" />
                  Infrastructure
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[600px] sm:max-w-[600px] overflow-y-auto">
                <VoiceInfraHealth />
              </SheetContent>
            </Sheet>

            {/* Policies Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Policies
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[600px] sm:max-w-[600px] overflow-y-auto">
                <CallPolicySettings />
              </SheetContent>
            </Sheet>

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

      {/* Main Content - Two Panel Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Calls List Panel */}
        <div 
          className={cn(
            "border-r border-border flex flex-col bg-card/30 transition-all duration-300 ease-in-out relative",
            isPanelCollapsed ? "w-0 min-w-0 overflow-hidden border-r-0" : "w-96 min-w-[384px]"
          )}
        >
          {/* Filters */}
          <div className="p-3 border-b border-border flex gap-1 overflow-x-auto scrollbar-thin">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2",
                  activeFilter === filter.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <filter.icon className="w-3.5 h-3.5" />
                {filter.label}
              </button>
            ))}
          </div>

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
            {filteredCalls.map((call, index) => (
              <div
                key={call.id}
                className="animate-slide-in-bottom"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <CallCard
                  call={call}
                  isSelected={selectedCall?.id === call.id}
                  onClick={() => setSelectedCall(call)}
                />
              </div>
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

        {/* Call Detail Panel */}
        <div className="flex-1 bg-background/50 overflow-y-auto">
          {selectedCall ? (
            <CallDetail call={selectedCall} />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Phone className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <h3 className="text-lg font-medium text-foreground mb-2">No call selected</h3>
                <p className="text-sm">Select a call from the list to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
