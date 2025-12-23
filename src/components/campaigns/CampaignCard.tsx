import { Mail, Users, Calendar, MoreVertical, Play, Pause, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Campaign {
  id: string;
  name: string;
  category: "outreach" | "nurture" | "onboarding";
  status: "draft" | "active" | "paused";
  leadsEnrolled: number;
  emailsSent: number;
  openRate: number;
  replyRate: number;
  meetingsBooked: number;
  createdAt: string;
}

interface CampaignCardProps {
  campaign: Campaign;
  onClick?: () => void;
}

const statusStyles = {
  draft: "bg-muted text-muted-foreground",
  active: "bg-success/20 text-success",
  paused: "bg-warning/20 text-warning",
};

const categoryStyles = {
  outreach: "bg-blue-500/20 text-blue-400",
  nurture: "bg-purple-500/20 text-purple-400",
  onboarding: "bg-emerald-500/20 text-emerald-400",
};

export function CampaignCard({ campaign, onClick }: CampaignCardProps) {
  return (
    <div
      className="bg-card rounded-xl border border-border p-5 card-hover cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide", categoryStyles[campaign.category])}>
              {campaign.category}
            </span>
            <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium", statusStyles[campaign.status])}>
              {campaign.status}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-foreground truncate">{campaign.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          {campaign.status === "active" ? (
            <button
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={(e) => { e.stopPropagation(); }}
            >
              <Pause className="w-4 h-4 text-muted-foreground" />
            </button>
          ) : campaign.status === "paused" ? (
            <button
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={(e) => { e.stopPropagation(); }}
            >
              <Play className="w-4 h-4 text-muted-foreground" />
            </button>
          ) : null}
          <button
            className="p-2 rounded-lg hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Leads</p>
          <p className="text-lg font-semibold text-foreground">{campaign.leadsEnrolled}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Open Rate</p>
          <p className="text-lg font-semibold text-foreground">{campaign.openRate}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Reply Rate</p>
          <p className="text-lg font-semibold text-foreground">{campaign.replyRate}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Meetings</p>
          <p className="text-lg font-semibold text-primary">{campaign.meetingsBooked}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <span>{campaign.emailsSent} sent</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{campaign.createdAt}</span>
          </div>
        </div>
        <button
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <BarChart3 className="w-3 h-3" />
          View Report
        </button>
      </div>
    </div>
  );
}
