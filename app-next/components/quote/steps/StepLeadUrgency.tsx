"use client";

import { useFormContext } from "react-hook-form";
import { globalExtras, urgencyLabels, type UrgencyType } from "@/lib/pricing/pricingConfig";
import type { QuoteFormValues } from "@/lib/validation/quoteSchema";

export function StepLeadUrgency() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<QuoteFormValues>();

  const urgency = watch("urgency");

  return (
    <section id="lead-form" aria-labelledby="step-lead-title" className="space-y-4">
      <h2 id="step-lead-title" className="text-xl font-semibold text-slate-900">
        5. Urgencia, extras y contacto
      </h2>
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700">Urgencia</p>
        <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Urgencia del proyecto">
          {(Object.keys(urgencyLabels) as UrgencyType[]).map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={urgency === option}
              onClick={() => setValue("urgency", option, { shouldValidate: true })}
              className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
                urgency === option
                  ? "border-blue-600 bg-blue-50 text-blue-800"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              {urgencyLabels[option]}
            </button>
          ))}
        </div>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-slate-700">Extras</legend>
        {globalExtras.map((item) => (
          <label key={item.id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <input
              type="checkbox"
              value={item.id}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              {...register("extras")}
            />
            <span className="text-sm text-slate-700">{item.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="leadName" className="text-sm font-medium text-slate-700">
            Nombre
          </label>
          <input
            id="leadName"
            type="text"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            aria-invalid={Boolean(errors.leadName)}
            {...register("leadName")}
          />
          {errors.leadName && <p className="text-sm text-red-600">{errors.leadName.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="leadCompany" className="text-sm font-medium text-slate-700">
            Empresa
          </label>
          <input
            id="leadCompany"
            type="text"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            aria-invalid={Boolean(errors.leadCompany)}
            {...register("leadCompany")}
          />
          {errors.leadCompany && <p className="text-sm text-red-600">{errors.leadCompany.message}</p>}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="leadContact" className="text-sm font-medium text-slate-700">
            WhatsApp o email
          </label>
          <input
            id="leadContact"
            type="text"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            aria-invalid={Boolean(errors.leadContact)}
            {...register("leadContact")}
          />
          {errors.leadContact && <p className="text-sm text-red-600">{errors.leadContact.message}</p>}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="budgetTarget" className="text-sm font-medium text-slate-700">
            Presupuesto objetivo
          </label>
          <input
            id="budgetTarget"
            type="text"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            {...register("budgetTarget")}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="notes" className="text-sm font-medium text-slate-700">
            Notas
          </label>
          <textarea
            id="notes"
            rows={4}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            aria-invalid={Boolean(errors.notes)}
            {...register("notes")}
          />
          {errors.notes && <p className="text-sm text-red-600">{errors.notes.message}</p>}
        </div>
      </div>
    </section>
  );
}
