import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
};

export function Card({ children, className, hoverable = false }: CardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border border-slate-200 bg-brand-white p-6 shadow-soft md:p-8",
        hoverable && "transition duration-300 hover:-translate-y-1 hover:shadow-card",
        className,
      )}
    >
      {children}
    </article>
  );
}
