"use client";

import { useFormContext } from "react-hook-form";
import { deliverablesByService, type ServiceType } from "@/lib/pricing/pricingConfig";
import type { QuoteFormValues } from "@/lib/validation/quoteSchema";

export function StepScope() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<QuoteFormValues>();

  const service = watch("service") as ServiceType;
  const deliverables = deliverablesByService[service];

  return (
    <section aria-labelledby="step-scope-title" className="space-y-4">
      <h2 id="step-scope-title" className="text-xl font-semibold text-slate-900">
        4. Alcance y piezas
      </h2>
      <p className="text-sm text-slate-600">Selecciona entregables y cuántas piezas o aplicaciones necesitas.</p>
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-slate-700">Entregables</legend>
        {deliverables.map((item) => (
          <label key={item.id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <input
              type="checkbox"
              value={item.id}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              {...register("deliverables")}
            />
            <span className="text-sm text-slate-700">{item.label}</span>
          </label>
        ))}
      </fieldset>
      {errors.deliverables && <p className="text-sm text-red-600">{errors.deliverables.message}</p>}
      <div className="space-y-2">
        <label htmlFor="piecesCount" className="text-sm font-medium text-slate-700">
          Cantidad de piezas/aplicaciones
        </label>
        <input
          id="piecesCount"
          type="number"
          min={1}
          max={500}
          aria-invalid={Boolean(errors.piecesCount)}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          {...register("piecesCount", { valueAsNumber: true })}
        />
        {errors.piecesCount && <p className="text-sm text-red-600">{errors.piecesCount.message}</p>}
      </div>
    </section>
  );
}
