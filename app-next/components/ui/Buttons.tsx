import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
};

type ActionButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

type ActionLinkProps = ButtonBaseProps & {
  href: string;
};

export const buttonBaseClass =
  "inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-surface-base";

export const primaryButtonClass = "bg-brand-accent text-brand-white shadow-soft hover:bg-[#1d4ed8]";

export const secondaryButtonClass =
  "border border-slate-300 bg-brand-white text-brand-primary hover:border-brand-accent/30 hover:bg-blue-50 dark:border-white/[0.10] dark:bg-surface-card dark:text-white/90 dark:hover:border-white/[0.18] dark:hover:bg-surface-elevated";

export function PrimaryButton({ children, className, ...props }: ActionButtonProps) {
  return (
    <button
      className={cn(buttonBaseClass, primaryButtonClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function PrimaryLink({ href, children, className }: ActionLinkProps) {
  return (
    <Link href={href} className={cn(buttonBaseClass, primaryButtonClass, className)}>
      {children}
    </Link>
  );
}

export function SecondaryButton({ children, className, ...props }: ActionButtonProps) {
  return (
    <button
      className={cn(
        buttonBaseClass,
        secondaryButtonClass,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryLink({ href, children, className }: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonBaseClass,
        secondaryButtonClass,
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function GhostButton({ children, className, ...props }: ActionButtonProps) {
  return (
    <button className={cn(buttonBaseClass, "px-3 py-2 text-brand-accent hover:bg-blue-50 dark:hover:bg-slate-800", className)} {...props}>
      {children}
    </button>
  );
}
