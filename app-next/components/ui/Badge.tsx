import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-brand-accent/20 bg-brand-accent/5 px-2.5 py-1 text-xs font-semibold tracking-wide text-brand-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
