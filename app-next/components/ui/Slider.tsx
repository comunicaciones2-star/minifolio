import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Slider({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="range"
      className={cn("h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-accent", className)}
      {...props}
    />
  );
}
