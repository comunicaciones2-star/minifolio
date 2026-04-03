import { cn } from "@/lib/utils/cn";

export type LeadStatus = "new" | "contacted" | "closed";

type StatusBadgeProps = {
  status: LeadStatus;
};

const labelByStatus: Record<LeadStatus, string> = {
  new: "Nuevo",
  contacted: "Contactado",
  closed: "Cerrado",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        status === "new" && "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
        status === "contacted" && "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
        status === "closed" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
      )}
    >
      {labelByStatus[status]}
    </span>
  );
}
