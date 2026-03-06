"use client";

import { formatCOP } from "@/lib/utils/money";
import { Slider } from "@/components/ui/Slider";

type BudgetSliderProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

export function BudgetSlider({
  value,
  min = 300_000,
  max = 25_000_000,
  step = 50_000,
  onChange,
}: BudgetSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--neutral)]">Presupuesto estimado</span>
        <strong className="text-[var(--primary)]">{formatCOP(value)}</strong>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-brand-accent"
        aria-label="Presupuesto aproximado en pesos colombianos"
      />
      <div className="flex justify-between text-xs text-slate-500">
        <span>{formatCOP(min)}</span>
        <span>{formatCOP(max)}</span>
      </div>
    </div>
  );
}
