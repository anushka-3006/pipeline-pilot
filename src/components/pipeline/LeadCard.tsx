import { Building2, Mail, Clock, MoreVertical, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  avatar?: string;
  lastActivity: string;
  source: string;
  stage: string;
}

interface LeadCardProps {
  lead: Lead;
  onClick?: () => void;
}

const sourceColors: Record<string, string> = {
  CSV: "bg-slate-500/20 text-slate-400",
  Form: "bg-blue-500/20 text-blue-400",
  LinkedIn: "bg-sky-500/20 text-sky-400",
  Referral: "bg-emerald-500/20 text-emerald-400",
  Ad: "bg-purple-500/20 text-purple-400",
};

export function LeadCard({ lead, onClick }: LeadCardProps) {
  return (
    <div
      className="lead-card group"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
          <span className="text-sm font-semibold text-primary">
            {lead.name.split(" ").map(n => n[0]).join("")}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold text-foreground truncate">{lead.name}</h4>
              <p className="text-xs text-muted-foreground truncate">{lead.role}</p>
            </div>
            <button 
              className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-muted transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Building2 className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground truncate">{lead.company}</span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium", sourceColors[lead.source] || sourceColors.CSV)}>
              {lead.source}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{lead.lastActivity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
