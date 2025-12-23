import { Mail, Phone, Star, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  leadName: string;
  company: string;
  subject: string;
  snippet: string;
  channel: "email" | "call";
  stage: string;
  timestamp: string;
  isUnread: boolean;
  hasAiSuggestion: boolean;
  needsReview: boolean;
}

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const stageColors: Record<string, string> = {
  outreach: "bg-blue-500/20 text-blue-400",
  warm: "bg-amber-500/20 text-amber-400",
  nurture: "bg-purple-500/20 text-purple-400",
  opportunity: "bg-emerald-500/20 text-emerald-400",
};

export function ConversationItem({ conversation, isActive, onClick }: ConversationItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 border-b border-border cursor-pointer transition-colors",
        isActive ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted/50",
        conversation.isUnread && "bg-primary/5"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
          <span className="text-sm font-semibold text-primary">
            {conversation.leadName.split(" ").map(n => n[0]).join("")}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <h4 className={cn(
                "text-sm truncate",
                conversation.isUnread ? "font-semibold text-foreground" : "font-medium text-foreground"
              )}>
                {conversation.leadName}
              </h4>
              {conversation.channel === "email" ? (
                <Mail className="w-3 h-3 text-muted-foreground" />
              ) : (
                <Phone className="w-3 h-3 text-muted-foreground" />
              )}
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{conversation.timestamp}</span>
          </div>

          <p className="text-xs text-muted-foreground mb-1">{conversation.company}</p>
          
          <p className={cn(
            "text-sm truncate",
            conversation.isUnread ? "text-foreground" : "text-muted-foreground"
          )}>
            {conversation.subject}
          </p>
          
          <p className="text-xs text-muted-foreground truncate mt-1">{conversation.snippet}</p>

          <div className="flex items-center gap-2 mt-2">
            <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium", stageColors[conversation.stage])}>
              {conversation.stage}
            </span>
            {conversation.hasAiSuggestion && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/20 text-primary">
                AI suggested
              </span>
            )}
            {conversation.needsReview && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-warning/20 text-warning">
                Needs review
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
