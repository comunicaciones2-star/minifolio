"use client";

import { useFormContext } from "react-hook-form";
import { sectorLabels, type SectorType } from "@/lib/pricing/pricingConfig";
import type { QuoteFormValues } from "@/lib/validation/quoteSchema";

export function StepSector() {
  const {
    register,
    formState: { errors },
  } = useFormContext<QuoteFormValues>();

  return (
    <section aria-labelledby="step-sector-title" className="space-y-4">
      <h2 id="step-sector-title" className="text-xl font-semibold text-slate-900">
        2. Sector económico
      </h2>
      <p className="text-sm text-slate-600">Selecciona el sector para ajustar complejidad regulatoria y competitiva.</p>
      <label className="block text-sm font-medium text-slate-700" htmlFor="sector-select">
        Sector
      </label>
      <select
        id="sector-select"
        aria-invalid={Boolean(errors.sector)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-blue-500"
        {...register("sector")}
      >
        {(Object.keys(sectorLabels) as SectorType[]).map((option) => (
          <option key={option} value={option}>
            {sectorLabels[option]}
          </option>
        ))}
      </select>
      {errors.sector && <p className="text-sm text-red-600">{errors.sector.message}</p>}
    </section>
  );
}
