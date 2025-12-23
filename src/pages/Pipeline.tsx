import { useState } from "react";
import { Search, Filter, Upload, Plus, SlidersHorizontal } from "lucide-react";
import { PipelineColumn } from "@/components/pipeline/PipelineColumn";
import { LeadCard } from "@/components/pipeline/LeadCard";

const mockLeads = {
  leads: [
    { id: "1", name: "Sarah Chen", role: "VP of Sales", company: "TechCorp", email: "sarah@techcorp.com", lastActivity: "2h ago", source: "LinkedIn", stage: "leads" },
    { id: "2", name: "Michael Brown", role: "CTO", company: "StartupX", email: "michael@startupx.io", lastActivity: "5h ago", source: "Form", stage: "leads" },
    { id: "3", name: "Emily Davis", role: "Director of Marketing", company: "GrowthCo", email: "emily@growthco.com", lastActivity: "1d ago", source: "CSV", stage: "leads" },
  ],
  outreach: [
    { id: "4", name: "James Wilson", role: "CEO", company: "InnovateLabs", email: "james@innovatelabs.com", lastActivity: "1h ago", source: "Referral", stage: "outreach" },
    { id: "5", name: "Lisa Anderson", role: "Head of Ops", company: "ScaleUp", email: "lisa@scaleup.io", lastActivity: "3h ago", source: "Ad", stage: "outreach" },
  ],
  warm: [
    { id: "6", name: "David Park", role: "Founder", company: "NextGen", email: "david@nextgen.co", lastActivity: "30m ago", source: "LinkedIn", stage: "warm" },
    { id: "7", name: "Jennifer Wu", role: "VP Engineering", company: "BuildFast", email: "jennifer@buildfast.io", lastActivity: "2h ago", source: "Form", stage: "warm" },
  ],
  nurture: [
    { id: "8", name: "Robert Taylor", role: "CFO", company: "FinanceHub", email: "robert@financehub.com", lastActivity: "1d ago", source: "CSV", stage: "nurture" },
  ],
  opportunities: [
    { id: "9", name: "Amanda Martinez", role: "COO", company: "OperateWell", email: "amanda@operatewell.com", lastActivity: "45m ago", source: "Referral", stage: "opportunities" },
  ],
  customers: [
    { id: "10", name: "Chris Johnson", role: "Head of Growth", company: "RocketScale", email: "chris@rocketscale.io", lastActivity: "1w ago", source: "LinkedIn", stage: "customers" },
  ],
};

const columns = [
  { id: "leads", title: "Leads", color: "bg-slate-500" },
  { id: "outreach", title: "Outreach", color: "bg-blue-500" },
  { id: "warm", title: "Warm", color: "bg-amber-500" },
  { id: "nurture", title: "Nurture", color: "bg-purple-500" },
  { id: "opportunities", title: "Opportunities", color: "bg-emerald-500" },
  { id: "customers", title: "Customers", color: "bg-primary" },
];

export default function Pipeline() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-screen flex flex-col animate-fade-in">
      {/* Header */}
      <div className="p-8 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leads & Pipeline</h1>
            <p className="text-muted-foreground mt-1">Manage your leads through the sales pipeline</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary">
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button className="btn-primary">
              <Plus className="w-4 h-4" />
              Add Lead
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search leads by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button className="btn-ghost border border-border">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="btn-ghost border border-border">
            <SlidersHorizontal className="w-4 h-4" />
            Sort
          </button>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="flex-1 overflow-x-auto px-8 pb-8">
        <div className="flex gap-4 h-full min-w-max">
          {columns.map((column) => (
            <PipelineColumn
              key={column.id}
              title={column.title}
              count={mockLeads[column.id as keyof typeof mockLeads].length}
              color={column.color}
              onAddClick={column.id === "leads" ? () => {} : undefined}
            >
              {mockLeads[column.id as keyof typeof mockLeads].map((lead, index) => (
                <div
                  key={lead.id}
                  className="animate-slide-in-bottom"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <LeadCard lead={lead} onClick={() => console.log("Open lead:", lead.id)} />
                </div>
              ))}
            </PipelineColumn>
          ))}
        </div>
      </div>
    </div>
  );
}
