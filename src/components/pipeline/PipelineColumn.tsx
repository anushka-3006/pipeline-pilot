import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface PipelineColumnProps {
  title: string;
  count: number;
  color: string;
  children: ReactNode;
  onAddClick?: () => void;
}

export function PipelineColumn({ title, count, color, children, onAddClick }: PipelineColumnProps) {
  return (
    <div className="pipeline-column shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", color)} />
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
            {count}
          </span>
        </div>
        {onAddClick && (
          <button
            onClick={onAddClick}
            className="p-1 rounded hover:bg-muted transition-colors"
          >
            <Plus className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Cards */}
      <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin max-h-[calc(100vh-280px)]">
        {children}
      </div>
    </div>
  );
}
