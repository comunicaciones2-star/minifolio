import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  actions?: ReactNode;
  className?: string;
};

export function SectionTitle({
  title,
  subtitle,
  description,
  align = "left",
  actions,
  className,
}: SectionTitleProps) {
  const isCenter = align === "center";

  return (
    <div className={cn("space-y-4", isCenter && "text-center", className)}>
      {subtitle ? (
        <span className="inline-flex rounded-md border border-brand-accent/20 bg-brand-accent/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-accent">
          {subtitle}
        </span>
      ) : null}
      <h2 className="text-h2 font-heading font-bold tracking-tight text-brand-primary">{title}</h2>
      {description ? <p className="max-w-3xl text-body text-brand-neutral/95">{description}</p> : null}
      {actions ? <div className={cn("flex flex-wrap gap-3", isCenter && "justify-center")}>{actions}</div> : null}
    </div>
  );
}
