"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { BudgetSlider } from "@/components/quote/BudgetSlider";
import { Input, Select } from "@/components/ui/FormControls";
import {
  companyLabels,
  deliverablesByService,
  globalExtras,
  sectorLabels,
  serviceLabels,
  urgencyLabels,
  type CompanyType,
  type SectorType,
  type ServiceType,
  type UrgencyType,
} from "@/lib/pricing/pricingConfig";
import type { QuoteFormValues } from "@/lib/validation/quoteSchema";

type QuoteStepsProps = {
  currentStep: number;
};

export function QuoteSteps({ currentStep }: QuoteStepsProps) {
  const { watch, setValue, register, formState } = useFormContext<QuoteFormValues>();
  const values = watch();

  const companyDescriptions: Record<CompanyType, string> = {
    startup: "Negocio en etapa inicial o emprendimiento.",
    pyme: "Organización pequeña o mediana en crecimiento.",
    enterprise: "Organización consolidada o corporativa.",
  };

  const serviceDescriptions: Record<ServiceType, string> = {
    branding: "Construcción de marca desde la estrategia hasta la identidad visual.",
    identity: "Diseño profesional de logo y sistema visual de marca.",
    campaign: "Piezas visuales enfocadas en atraer clientes y mejorar la presencia digital.",
    print: "Material gráfico listo para impresión con una línea visual profesional.",
  };

  const urgencyDescriptions: Record<UrgencyType, string> = {
    normal: "Tiempo estimado: 2 a 4 semanas",
    priority: "Tiempo estimado: 1 a 2 semanas",
    express: "Tiempo estimado: 3 a 5 días",
  };

  useEffect(() => {
    const options = deliverablesByService[values.service];
    if (!values.deliverables.length && options.length > 0) {
      setValue("deliverables", [options[0].id], { shouldValidate: true });
    }
  }, [values.service, values.deliverables.length, setValue]);

  if (currentStep === 1) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--primary)]">1. Perfil corporativo</h2>
        <p className="text-sm text-[var(--neutral)]">Selecciona el perfil que mejor describe tu organización.</p>
        <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Perfil corporativo">
          {(Object.keys(companyLabels) as CompanyType[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setValue("companyType", option, { shouldValidate: true })}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                values.companyType === option
                  ? "border-[var(--secondary)] bg-blue-50 text-[var(--secondary)]"
                  : "border-slate-200 bg-white text-[var(--neutral)]"
              }`}
            >
              <span className="block text-sm font-semibold">{companyLabels[option]}</span>
              <span className="mt-1 block text-xs text-slate-500">{companyDescriptions[option]}</span>
            </button>
          ))}
        </div>
      </section>
    );
  }

  if (currentStep === 2) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--primary)]">2. Sector económico</h2>
        <p className="text-sm text-[var(--neutral)]">
          El sector de tu organización nos ayuda a estimar el nivel de complejidad y los requerimientos de comunicación.
        </p>
        <Select
          id="sector"
          {...register("sector")}
        >
          <option value="" disabled>
            Selecciona el sector de tu organización
          </option>
          {(Object.keys(sectorLabels) as SectorType[]).map((option) => (
            <option key={option} value={option}>
              {sectorLabels[option]}
            </option>
          ))}
        </Select>
      </section>
    );
  }

  if (currentStep === 3) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--primary)]">3. ¿Qué tipo de proyecto necesitas?</h2>
        <p className="text-sm text-[var(--neutral)]">Selecciona el servicio principal que necesitas para tu organización.</p>
        <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Servicio requerido">
          {(Object.keys(serviceLabels) as ServiceType[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setValue("service", option, { shouldValidate: true })}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                values.service === option
                  ? "border-[var(--secondary)] bg-blue-50 text-[var(--secondary)]"
                  : "border-slate-200 bg-white text-[var(--neutral)]"
              }`}
            >
              <span className="block text-sm font-semibold">{serviceLabels[option]}</span>
              <span className="mt-1 block text-xs text-slate-500">{serviceDescriptions[option]}</span>
            </button>
          ))}
        </div>
      </section>
    );
  }

  if (currentStep === 4) {
    const deliverables = deliverablesByService[values.service];
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--primary)]">4. Alcance del proyecto</h2>
        <p className="text-sm text-[var(--neutral)]">Selecciona los elementos que te gustaría incluir en este proyecto.</p>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-[var(--neutral)]">Este proyecto podría incluir:</legend>
          {deliverables.map((item) => (
            <label key={item.id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
              <input type="checkbox" value={item.id} {...register("deliverables")} className="h-4 w-4 accent-[var(--secondary)]" />
              {item.label}
            </label>
          ))}
        </fieldset>

        <div className="space-y-2">
          <label htmlFor="piecesCount" className="text-sm font-medium text-[var(--neutral)]">
            Cantidad de piezas o aplicaciones
          </label>
          <Input
            id="piecesCount"
            type="number"
            min={1}
            max={500}
            {...register("piecesCount", { valueAsNumber: true })}
          />
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-[var(--neutral)]">Adicionales (opcionales)</legend>
          {globalExtras.map((item) => (
            <label key={item.id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
              <input type="checkbox" value={item.id} {...register("extras")} className="h-4 w-4 accent-[var(--secondary)]" />
              {item.label}
            </label>
          ))}
        </fieldset>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <h2 className="text-xl font-semibold text-[var(--primary)]">5. Presupuesto y tiempos de entrega</h2>
      <p className="text-sm text-[var(--neutral)]">
        Indica el presupuesto aproximado que tienes para este proyecto. Esto nos ayuda a ajustar el alcance de la propuesta.
      </p>
      <BudgetSlider value={values.budgetValue} onChange={(next) => setValue("budgetValue", next, { shouldValidate: true })} />
      <p className="text-sm text-[var(--neutral)]">
        Presupuesto seleccionado: <strong className="text-[var(--primary)]">{new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(values.budgetValue)} COP</strong>
      </p>
      <p className="text-sm font-medium text-[var(--primary)]">¿Qué tan pronto necesitas este proyecto?</p>
      <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Nivel de urgencia">
        {(Object.keys(urgencyLabels) as UrgencyType[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setValue("urgency", option, { shouldValidate: true })}
            className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
              values.urgency === option
                ? "border-[var(--secondary)] bg-blue-50 text-[var(--secondary)]"
                : "border-slate-200 bg-white text-[var(--neutral)]"
            }`}
          >
            <span className="block text-sm font-semibold">{urgencyLabels[option]}</span>
            <span className="mt-1 block text-xs text-slate-500">{urgencyDescriptions[option]}</span>
          </button>
        ))}
      </div>
      {formState.errors.budgetValue && <p className="text-sm text-red-600">{formState.errors.budgetValue.message}</p>}
    </section>
  );
}
