"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { deliverablesByService, serviceLabels, type ServiceType } from "@/lib/pricing/pricingConfig";
import type { QuoteFormValues } from "@/lib/validation/quoteSchema";

export function StepService() {
  const { watch, setValue, formState } = useFormContext<QuoteFormValues>();
  const selectedService = watch("service");

  useEffect(() => {
    const deliverables = deliverablesByService[selectedService];
    setValue("deliverables", deliverables.length ? [deliverables[0].id] : [], { shouldValidate: true });
  }, [selectedService, setValue]);

  return (
    <section aria-labelledby="step-service-title" className="space-y-4">
      <h2 id="step-service-title" className="text-xl font-semibold text-slate-900">
        3. Servicio principal
      </h2>
      <p className="text-sm text-slate-600">Define la línea de servicio base para calcular el rango inicial.</p>
      <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Servicio principal">
        {(Object.keys(serviceLabels) as ServiceType[]).map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selectedService === option}
            onClick={() => setValue("service", option, { shouldValidate: true })}
            className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
              selectedService === option
                ? "border-blue-600 bg-blue-50 text-blue-800"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            {serviceLabels[option]}
          </button>
        ))}
      </div>
      {formState.errors.service && <p className="text-sm text-red-600">{formState.errors.service.message}</p>}
    </section>
  );
}
