import { cn } from "@/lib/utils/cn";
import type { LeadStatus } from "@/components/dashboard/StatusBadge";

export type LeadFilter = "all" | LeadStatus;

type FilterBarProps = {
  activeFilter: LeadFilter;
  total: number;
  byStatus: Record<LeadStatus, number>;
  onChange: (filter: LeadFilter) => void;
};

export function FilterBar({ activeFilter, total, byStatus, onChange }: FilterBarProps) {
  const items: Array<{ value: LeadFilter; label: string; count: number }> = [
    { value: "all", label: "Todos", count: total },
    { value: "new", label: "Nuevos", count: byStatus.new },
    { value: "contacted", label: "Contactados", count: byStatus.contacted },
    { value: "closed", label: "Cerrados", count: byStatus.closed },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          className={cn(
            "rounded-lg border px-3 py-2 text-sm font-medium transition",
            activeFilter === item.value
              ? "border-[var(--secondary)] bg-blue-50 text-[var(--secondary)] dark:bg-blue-950/40"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
          )}
        >
          {item.label} ({item.count})
        </button>
      ))}
    </div>
  );
}
