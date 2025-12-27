import { Phone, PhoneIncoming, PhoneOutgoing, Clock, Calendar, User, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface Call {
  id: string;
  leadName: string;
  leadCompany: string;
  leadAvatar?: string;
  type: "inbound" | "outbound";
  purpose: "booking" | "reminder" | "followup";
  status: "completed" | "missed" | "scheduled" | "in-progress" | "failed";
  outcome?: "booked" | "rescheduled" | "declined" | "confirmed" | "cancelled" | "no-answer" | "voicemail";
  duration?: string;
  scheduledAt?: string;
  completedAt?: string;
  confidence?: number;
}

interface CallCardProps {
  call: Call;
  onClick?: () => void;
  isSelected?: boolean;
}

const statusColors: Record<Call["status"], string> = {
  completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  missed: "bg-destructive/10 text-destructive border-destructive/20",
  scheduled: "bg-primary/10 text-primary border-primary/20",
  "in-progress": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
};

const outcomeColors: Record<NonNullable<Call["outcome"]>, string> = {
  booked: "bg-emerald-500/10 text-emerald-400",
  rescheduled: "bg-amber-500/10 text-amber-400",
  declined: "bg-destructive/10 text-destructive",
  confirmed: "bg-emerald-500/10 text-emerald-400",
  cancelled: "bg-destructive/10 text-destructive",
  "no-answer": "bg-muted text-muted-foreground",
  voicemail: "bg-muted text-muted-foreground",
};

export function CallCard({ call, onClick, isSelected }: CallCardProps) {
  const initials = call.leadName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-all cursor-pointer group",
        isSelected && "ring-1 ring-primary bg-card/80"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-sm font-medium text-foreground">{initials}</span>
          </div>
          <div className={cn(
            "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center",
            call.type === "inbound" ? "bg-emerald-500/20" : "bg-primary/20"
          )}>
            {call.type === "inbound" ? (
              <PhoneIncoming className="w-3 h-3 text-emerald-400" />
            ) : (
              <PhoneOutgoing className="w-3 h-3 text-primary" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground truncate">{call.leadName}</h4>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground truncate">{call.leadCompany}</p>
          
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant="outline" className={cn("text-xs", statusColors[call.status])}>
              {call.status}
            </Badge>
            {call.outcome && (
              <Badge variant="secondary" className={cn("text-xs", outcomeColors[call.outcome])}>
                {call.outcome}
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs capitalize">
              {call.purpose}
            </Badge>
          </div>

          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            {call.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {call.duration}
              </span>
            )}
            {call.scheduledAt && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {call.scheduledAt}
              </span>
            )}
            {call.confidence !== undefined && (
              <span className="flex items-center gap-1">
                <span className={cn(
                  "w-2 h-2 rounded-full",
                  call.confidence >= 0.8 ? "bg-emerald-400" : call.confidence >= 0.5 ? "bg-amber-400" : "bg-destructive"
                )} />
                {Math.round(call.confidence * 100)}% confidence
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
