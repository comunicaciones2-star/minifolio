"use client";

import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { QuoteSteps } from "@/components/quote/QuoteSteps";
import { ResultPanel } from "@/components/quote/ResultPanel";
import { LeadCaptureStep, type LeadFormData } from "@/components/quote/LeadCaptureStep";
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
  { id: 6, label: "Contacto", fields: [] as Array<keyof QuoteFormValues> },
];

const LEADS_STORAGE_KEY = "minifolio:leads:v1";

type LeadFormErrors = Partial<Record<keyof LeadFormData, string>>;

export function QuoteWizard() {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("admin") === "1";
  const queryService = searchParams.get("service");
  const [currentStep, setCurrentStep] = useState(1);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [priceUnlocked, setPriceUnlocked] = useState(false);
  const [submittingLead, setSubmittingLead] = useState(false);
  const [lead, setLead] = useState<LeadFormData>({
    name: "",
    phone: "",
    email: "",
    company: "",
  });
  const [leadErrors, setLeadErrors] = useState<LeadFormErrors>({});
  const [consented, setConsented] = useState(false);

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
  const whatsappUrl = useMemo(() => buildQuoteWhatsappUrl(values, quote, lead), [values, quote, lead]);
  const mobileWhatsappLabel = values.urgency === "express" ? "Enviar solicitud express" : "Enviar por WhatsApp";

  const progress = Math.round((currentStep / steps.length) * 100);
  const showPrice = priceUnlocked;

  const setLeadField = (field: keyof LeadFormData, value: string) => {
    setLead((prev) => ({ ...prev, [field]: value }));
    setLeadErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateLead = () => {
    const errors: LeadFormErrors = {};
    if (lead.name.trim().length < 2) {
      errors.name = "Ingresa tu nombre.";
    }

    if (!/^\+?\d{7,15}$/.test(lead.phone.replace(/\s+/g, ""))) {
      errors.phone = "Ingresa un teléfono válido.";
    }

    if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim())) {
      errors.email = "Ingresa un correo válido.";
    }

    if (lead.company && lead.company.trim().length < 2) {
      errors.company = "Ingresa una empresa válida.";
    }

    setLeadErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const leadIsValid =
    consented &&
    lead.name.trim().length >= 2 &&
    /^\+?\d{7,15}$/.test(lead.phone.replace(/\s+/g, "")) &&
    (!lead.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim()));

  const saveLeadLocally = (payload: unknown) => {
    if (typeof window === "undefined") {
      return;
    }

    const raw = window.localStorage.getItem(LEADS_STORAGE_KEY);
    const current = raw ? (JSON.parse(raw) as unknown[]) : [];
    current.push(payload);
    window.localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(current));
  };

  const buildLeadPayload = () => ({
    profile: companyLabels[values.companyType],
    service: serviceLabels[values.service],
    scope: `${values.deliverables.length} entregables / ${values.piecesCount} piezas`,
    budget: {
      target: values.budgetValue,
      range: {
        min: quote.min,
        max: quote.max,
      },
    },
    timeline: urgencyLabels[values.urgency],
    sector: sectorLabels[values.sector],
    lead: {
      name: lead.name.trim(),
      phone: lead.phone.trim(),
      email: lead.email.trim(),
      company: lead.company.trim(),
    },
    createdAt: new Date().toISOString(),
  });

  const nextStep = async () => {
    if (currentStep === steps.length) {
      if (!validateLead()) {
        setFeedback("Completa los campos requeridos para continuar.");
        return;
      }

      setSubmittingLead(true);
      const payload = buildLeadPayload();
      saveLeadLocally(payload);

      try {
        const response = await fetch("/api/lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          setFeedback("Registramos tu lead localmente. No se pudo sincronizar con CRM en este intento.");
        } else {
          setFeedback("Lead registrado y resumen enviado. Ahora puedes continuar por WhatsApp.");
        }
      } catch {
        setFeedback("Registramos tu lead localmente. Falló la sincronización remota por conexión.");
      } finally {
        setSubmittingLead(false);
      }

      setPriceUnlocked(true);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      return;
    }

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
      `Cuéntanos sobre tu negocio: ${companyLabels[values.companyType]}`,
      `¿A qué se dedica tu negocio?: ${sectorLabels[values.sector]}`,
      `Servicio: ${serviceLabels[values.service]}`,
      `Rango estimado: ${showPrice ? `${formatCOP(quote.min)} - ${formatCOP(quote.max)} COP` : "Disponible al finalizar el paso 6"}`,
      `Presupuesto aproximado: ${formatCOP(values.budgetValue)}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setFeedback("Resumen copiado correctamente.");
    } catch {
      setFeedback("No se pudo copiar el resumen.");
    }
  };

  const downloadSummary = () => {
    const summary = [
      "Resumen del cotizador",
      `Empresa: ${companyLabels[values.companyType]}`,
      `Sector: ${sectorLabels[values.sector]}`,
      `Servicio: ${serviceLabels[values.service]}`,
      `Rango estimado: ${formatCOP(quote.min)} - ${formatCOP(quote.max)} COP`,
      `Presupuesto objetivo: ${formatCOP(values.budgetValue)} COP`,
      `Contacto: ${lead.name} - ${lead.phone}`,
      lead.email ? `Correo: ${lead.email}` : "",
      lead.company ? `Empresa: ${lead.company}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "resumen-cotizacion.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <FormProvider {...form}>
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="space-y-5 pb-28 lg:pb-0">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-[var(--neutral)]">
              Completa estos pasos para organizar lo que necesitas y recibir una estimación aproximada según el tipo de negocio,
              el tipo de proyecto y los tiempos de entrega.
            </p>
            <p className="mt-2 text-sm text-[var(--neutral)]">Primero te damos claridad sobre el alcance y al final te mostramos el rango estimado.</p>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>Paso {currentStep} de {steps.length}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-[var(--secondary)] transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            {currentStep < steps.length ? (
              <QuoteSteps currentStep={currentStep} />
            ) : (
              <LeadCaptureStep lead={lead} errors={leadErrors} onChange={setLeadField} consented={consented} onConsentChange={setConsented} />
            )}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <SecondaryButton type="button" onClick={previousStep} disabled={currentStep === 1} className="disabled:cursor-not-allowed disabled:opacity-50">
                  Anterior
                </SecondaryButton>
                <PrimaryButton type="button" onClick={nextStep} disabled={(currentStep === steps.length && !leadIsValid) || submittingLead}>
                  {currentStep === steps.length ? (submittingLead ? "Enviando..." : "Ver estimación y continuar") : "Siguiente"}
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
            onCopySummary={copySummary}
            onDownloadSummary={downloadSummary}
            showPrice={showPrice}
          />

          {feedback && <p className="text-sm text-[var(--neutral)]">{feedback}</p>}
        </section>

        <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:sticky lg:top-24 lg:block">
          <h3 className="text-base font-semibold text-[var(--primary)]">Resumen de tu proyecto</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-500">Cuéntanos sobre tu negocio</dt>
              <dd className="font-medium text-[var(--primary)] break-words">{companyLabels[values.companyType]}</dd>
            </div>
            <div>
              <dt className="text-slate-500">¿A qué se dedica tu negocio?</dt>
              <dd className="font-medium text-[var(--primary)] break-words">{sectorLabels[values.sector]}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Servicio</dt>
              <dd className="font-medium text-[var(--primary)] break-words">{serviceLabels[values.service]}</dd>
            </div>
            <div>
              <dt className="text-slate-500">¿Qué necesitas desarrollar?</dt>
              <dd className="font-medium text-[var(--primary)] break-words">{values.deliverables.length} elementos seleccionados</dd>
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

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.12)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileSummaryOpen((prev) => !prev)}
          aria-expanded={mobileSummaryOpen}
          aria-controls="mobile-project-summary"
          className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-3 py-3 text-left dark:bg-slate-800"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Resumen rapido</p>
            {showPrice ? (
              <p className="mt-1 text-sm font-semibold text-[var(--primary)]">
                {formatCOP(quote.min)} - {formatCOP(quote.max)} COP
              </p>
            ) : (
              <p className="mt-1 text-sm font-semibold text-[var(--primary)]">Completa el paso 6 para ver tu estimación</p>
            )}
          </div>
          <span className="text-sm font-semibold text-[var(--secondary)]">{mobileSummaryOpen ? "Ocultar" : "Ver"}</span>
        </button>

        {mobileSummaryOpen && (
          <div id="mobile-project-summary" className="mt-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
            <dl className="space-y-2 text-sm">
              <div className="flex items-start justify-between gap-3">
                <dt className="text-slate-500">Tu negocio</dt>
                <dd className="min-w-0 max-w-[58%] break-words text-right font-medium text-[var(--primary)]">{companyLabels[values.companyType]}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-slate-500">Actividad</dt>
                <dd className="min-w-0 max-w-[58%] break-words text-right font-medium text-[var(--primary)]">{sectorLabels[values.sector]}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-slate-500">Servicio</dt>
                <dd className="min-w-0 max-w-[58%] break-words text-right font-medium text-[var(--primary)]">{serviceLabels[values.service]}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-slate-500">Desarrollo</dt>
                <dd className="min-w-0 max-w-[58%] break-words text-right font-medium text-[var(--primary)]">{values.deliverables.length} elementos</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-slate-500">Presupuesto</dt>
                <dd className="min-w-0 max-w-[58%] break-words text-right font-medium text-[var(--primary)]">{formatCOP(values.budgetValue)}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-slate-500">Tiempo</dt>
                <dd className="min-w-0 max-w-[58%] break-words text-right font-medium text-[var(--primary)]">{urgencyLabels[values.urgency]}</dd>
              </div>
            </dl>
            {showPrice && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonBaseClass, primaryButtonClass, "mt-3 w-full")}
              >
                {mobileWhatsappLabel}
              </a>
            )}
          </div>
        )}
      </div>
    </FormProvider>
  );
}
