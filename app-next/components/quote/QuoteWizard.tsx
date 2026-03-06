"use client";

import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { QuoteSteps } from "@/components/quote/QuoteSteps";
import { ResultPanel } from "@/components/quote/ResultPanel";
import { calculateQuote } from "@/lib/pricing/calculateQuote";
import { companyLabels, sectorLabels, serviceLabels, urgencyLabels } from "@/lib/pricing/pricingConfig";
import { loadQuote, saveQuote } from "@/lib/storage/persistQuote";
import { formatCOP } from "@/lib/utils/money";
import { quoteSchema, defaultQuoteValues, type QuoteFormValues } from "@/lib/validation/quoteSchema";
import { buildQuoteWhatsappUrl } from "@/lib/whatsapp/buildQuoteWhatsappUrl";
import { PrimaryButton, SecondaryButton, buttonBaseClass, primaryButtonClass } from "@/components/ui/Buttons";
import { cn } from "@/lib/utils/cn";

const steps = [
  { id: 1, label: "Empresa", fields: ["companyType"] as Array<keyof QuoteFormValues> },
  { id: 2, label: "Sector", fields: ["sector"] as Array<keyof QuoteFormValues> },
  { id: 3, label: "Servicio", fields: ["service"] as Array<keyof QuoteFormValues> },
  { id: 4, label: "Alcance", fields: ["deliverables", "piecesCount", "extras"] as Array<keyof QuoteFormValues> },
  { id: 5, label: "Presupuesto", fields: ["budgetValue", "urgency"] as Array<keyof QuoteFormValues> },
];

export function QuoteWizard() {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("admin") === "1";
  const queryService = searchParams.get("service");
  const [currentStep, setCurrentStep] = useState(1);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [quoteRequested, setQuoteRequested] = useState(false);

  const resolvedService =
    queryService === "branding" || queryService === "identity" || queryService === "campaign" || queryService === "print"
      ? queryService
      : undefined;

  const persisted = loadQuote() ?? defaultQuoteValues;
  const initialValues: QuoteFormValues = {
    ...persisted,
    ...(resolvedService ? { service: resolvedService } : {}),
  };

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const values = form.watch();
  const quote = useMemo(() => calculateQuote(values), [values]);
  const whatsappUrl = useMemo(() => buildQuoteWhatsappUrl(values, quote), [values, quote]);
  const mobileWhatsappLabel = values.urgency === "express" ? "Enviar solicitud express" : "Enviar por WhatsApp";

  const progress = Math.round((currentStep / steps.length) * 100);

  const nextStep = async () => {
    const fields = steps[currentStep - 1].fields;
    const isValid = await form.trigger(fields);
    if (!isValid) {
      return;
    }
    saveQuote(values);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const copySummary = async () => {
    const summary = [
      "Resumen del cotizador",
      `Perfil corporativo: ${companyLabels[values.companyType]}`,
      `Sector: ${sectorLabels[values.sector]}`,
      `Servicio: ${serviceLabels[values.service]}`,
      `Rango estimado: ${formatCOP(quote.min)} - ${formatCOP(quote.max)} COP`,
      `Presupuesto aproximado: ${formatCOP(values.budgetValue)}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setFeedback("Resumen copiado correctamente.");
    } catch {
      setFeedback("No se pudo copiar el resumen.");
    }
  };

  const requestPersonalizedQuote = () => {
    saveQuote(values);
    setQuoteRequested(true);
    setFeedback("Tu solicitud fue registrada correctamente.");
  };

  return (
    <FormProvider {...form}>
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="space-y-5 pb-28 lg:pb-0">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-[var(--neutral)]">
              Completa estos pasos para obtener una estimación aproximada en pesos colombianos según el tipo de empresa, sector,
              alcance del proyecto y tiempos de entrega.
            </p>
            <p className="mt-2 text-sm text-[var(--neutral)]">Esta estimación te ayudará a tener una idea inicial de la inversión necesaria.</p>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>Paso {currentStep} de {steps.length}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-[var(--secondary)] transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <QuoteSteps currentStep={currentStep} />
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <SecondaryButton type="button" onClick={previousStep} disabled={currentStep === 1} className="disabled:cursor-not-allowed disabled:opacity-50">
                  Anterior
                </SecondaryButton>
                <PrimaryButton type="button" onClick={nextStep}>
                  {currentStep === steps.length ? "Actualizar resultado" : "Siguiente"}
                </PrimaryButton>
              </div>
            </div>
          </div>

          <ResultPanel
            quote={quote}
            service={values.service}
            urgency={values.urgency}
            budgetValue={values.budgetValue}
            whatsappUrl={whatsappUrl}
            isAdmin={isAdmin}
            onRequestQuote={requestPersonalizedQuote}
            onCopySummary={copySummary}
          />

          {quoteRequested && (
            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <h3 className="text-lg font-semibold text-[var(--primary)]">Gracias por tu interés</h3>
              <p className="mt-2 text-sm text-[var(--neutral)]">
                Tu información ha sido enviada correctamente. En breve podrás recibir una propuesta más detallada según las necesidades
                de tu proyecto.
              </p>
            </section>
          )}

          {feedback && <p className="text-sm text-[var(--neutral)]">{feedback}</p>}
        </section>

        <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:block">
          <h3 className="text-base font-semibold text-[var(--primary)]">Resumen de tu proyecto</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-500">Perfil corporativo</dt>
              <dd className="font-medium text-[var(--primary)]">{companyLabels[values.companyType]}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Sector</dt>
              <dd className="font-medium text-[var(--primary)]">{sectorLabels[values.sector]}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Servicio</dt>
              <dd className="font-medium text-[var(--primary)]">{serviceLabels[values.service]}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Alcance</dt>
              <dd className="font-medium text-[var(--primary)]">{values.deliverables.length} elementos seleccionados</dd>
            </div>
            <div>
              <dt className="text-slate-500">Presupuesto</dt>
              <dd className="font-medium text-[var(--primary)]">{formatCOP(values.budgetValue)}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Tiempo</dt>
              <dd className="font-medium text-[var(--primary)]">{urgencyLabels[values.urgency]}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.12)] backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setMobileSummaryOpen((prev) => !prev)}
          aria-expanded={mobileSummaryOpen}
          aria-controls="mobile-project-summary"
          className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-3 py-3 text-left"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Resumen rapido</p>
            <p className="mt-1 text-sm font-semibold text-[var(--primary)]">
              {formatCOP(quote.min)} - {formatCOP(quote.max)} COP
            </p>
          </div>
          <span className="text-sm font-semibold text-[var(--secondary)]">{mobileSummaryOpen ? "Ocultar" : "Ver"}</span>
        </button>

        {mobileSummaryOpen && (
          <div id="mobile-project-summary" className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
            <dl className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500">Corporativo</dt>
                <dd className="font-medium text-[var(--primary)]">{companyLabels[values.companyType]}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500">Sector</dt>
                <dd className="font-medium text-[var(--primary)]">{sectorLabels[values.sector]}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500">Servicio</dt>
                <dd className="font-medium text-[var(--primary)]">{serviceLabels[values.service]}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500">Alcance</dt>
                <dd className="font-medium text-[var(--primary)]">{values.deliverables.length} elementos</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500">Presupuesto</dt>
                <dd className="font-medium text-[var(--primary)]">{formatCOP(values.budgetValue)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500">Tiempo</dt>
                <dd className="font-medium text-[var(--primary)]">{urgencyLabels[values.urgency]}</dd>
              </div>
            </dl>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonBaseClass, primaryButtonClass, "mt-3 w-full")}
            >
              {mobileWhatsappLabel}
            </a>
          </div>
        )}
      </div>
    </FormProvider>
  );
}
