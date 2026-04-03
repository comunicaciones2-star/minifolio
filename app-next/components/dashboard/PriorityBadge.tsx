import { cn } from "@/lib/utils/cn";

export type LeadPriority = "Alta" | "Media" | "Baja";

type PriorityBadgeProps = {
  priority: LeadPriority;
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        priority === "Alta" && "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
        priority === "Media" && "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
        priority === "Baja" && "bg-slate-100 text-slate-700 dark:bg-slate-700/40 dark:text-slate-200",
      )}
    >
      {priority}
    </span>
  );
}
