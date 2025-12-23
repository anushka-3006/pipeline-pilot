import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stages = [
  { name: "Leads", count: 234, color: "bg-slate-500", percentage: 100 },
  { name: "Outreach", count: 156, color: "bg-blue-500", percentage: 67 },
  { name: "Warm", count: 89, color: "bg-amber-500", percentage: 38 },
  { name: "Nurture", count: 67, color: "bg-purple-500", percentage: 29 },
  { name: "Opportunities", count: 23, color: "bg-emerald-500", percentage: 10 },
  { name: "Customers", count: 12, color: "bg-primary", percentage: 5 },
];

export function PipelineOverview() {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Pipeline Overview</h3>
          <p className="text-sm text-muted-foreground mt-1">Lead distribution by stage</p>
        </div>
        <Link
          to="/pipeline"
          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          View pipeline
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div
            key={stage.name}
            className="animate-slide-in-bottom"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", stage.color)} />
                <span className="text-sm font-medium text-foreground">{stage.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{stage.count}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-500", stage.color)}
                style={{ width: `${stage.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Conversion rate</span>
          <span className="font-semibold text-success">5.1%</span>
        </div>
      </div>
    </div>
  );
}
