import { useState } from "react";
import { Search, Plus, Filter, Grid3X3, List } from "lucide-react";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { cn } from "@/lib/utils";

const mockCampaigns = [
  {
    id: "1",
    name: "Q1 Enterprise Outreach",
    category: "outreach" as const,
    status: "active" as const,
    leadsEnrolled: 234,
    emailsSent: 1847,
    openRate: 42,
    replyRate: 18,
    meetingsBooked: 23,
    createdAt: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "SMB Product Launch",
    category: "outreach" as const,
    status: "active" as const,
    leadsEnrolled: 156,
    emailsSent: 892,
    openRate: 38,
    replyRate: 15,
    meetingsBooked: 12,
    createdAt: "Jan 20, 2024",
  },
  {
    id: "3",
    name: "Long-term Nurture Sequence",
    category: "nurture" as const,
    status: "active" as const,
    leadsEnrolled: 89,
    emailsSent: 534,
    openRate: 35,
    replyRate: 8,
    meetingsBooked: 5,
    createdAt: "Dec 10, 2023",
  },
  {
    id: "4",
    name: "Trial User Onboarding",
    category: "onboarding" as const,
    status: "paused" as const,
    leadsEnrolled: 67,
    emailsSent: 268,
    openRate: 52,
    replyRate: 22,
    meetingsBooked: 8,
    createdAt: "Jan 5, 2024",
  },
  {
    id: "5",
    name: "Re-engagement Campaign",
    category: "nurture" as const,
    status: "draft" as const,
    leadsEnrolled: 0,
    emailsSent: 0,
    openRate: 0,
    replyRate: 0,
    meetingsBooked: 0,
    createdAt: "Jan 28, 2024",
  },
];

export default function Campaigns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "paused" | "draft">("all");

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    if (activeFilter !== "all" && campaign.status !== activeFilter) return false;
    if (searchQuery && !campaign.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground mt-1">Create and manage your outreach sequences</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" />
          Create Campaign
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            {(["all", "active", "paused", "draft"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize",
                  activeFilter === filter
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-ghost border border-border">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                viewMode === "grid" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                viewMode === "list" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className={cn(
        "grid gap-6",
        viewMode === "grid" ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
      )}>
        {filteredCampaigns.map((campaign, index) => (
          <div
            key={campaign.id}
            className="animate-slide-in-bottom"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CampaignCard campaign={campaign} />
          </div>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No campaigns found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
