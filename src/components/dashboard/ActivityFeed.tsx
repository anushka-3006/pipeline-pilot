import { Mail, Phone, Calendar, UserPlus, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "email_opened",
    icon: Mail,
    title: "Sarah Chen opened your email",
    description: "Subject: \"Quick question about your Q1 goals\"",
    time: "2 minutes ago",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    id: 2,
    type: "meeting_booked",
    icon: Calendar,
    title: "Meeting booked with Marcus Johnson",
    description: "Demo call scheduled for tomorrow at 2:00 PM",
    time: "15 minutes ago",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
  },
  {
    id: 3,
    type: "reply_received",
    icon: MessageSquare,
    title: "New reply from David Park",
    description: "\"Thanks for reaching out! I'd love to learn more...\"",
    time: "1 hour ago",
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  {
    id: 4,
    type: "lead_added",
    icon: UserPlus,
    title: "45 new leads imported",
    description: "From CSV: \"Tech Companies SF - January.csv\"",
    time: "2 hours ago",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
  {
    id: 5,
    type: "call_completed",
    icon: Phone,
    title: "AI call completed with Jennifer Wu",
    description: "Qualified lead - interested in enterprise plan",
    time: "3 hours ago",
    color: "text-amber-400",
    bgColor: "bg-amber-500/20",
  },
];

export function ActivityFeed() {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={cn(
              "flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer",
              "animate-slide-in-bottom"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", activity.bgColor)}>
              <activity.icon className={cn("w-5 h-5", activity.color)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
