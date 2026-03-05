"use client";

import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateQuote } from "@/lib/pricing/calculateQuote";
import { deliverablesByService, globalExtras } from "@/lib/pricing/pricingConfig";
import { clearQuote, loadQuote, saveQuote } from "@/lib/storage/persistQuote";
import {
  buildLeadHistoryCsv,
  clearLeadHistory,
  getLeadHistory,
  saveLeadToHistory,
  type StoredLead,
} from "@/lib/storage/leadHistory";
import { buildWhatsappMessage } from "@/lib/whatsapp/buildWhatsappMessage";
import { defaultQuoteValues, quoteSchema, type QuoteFormValues } from "@/lib/validation/quoteSchema";
import { StepCompany } from "@/components/quote/steps/StepCompany";
import { StepSector } from "@/components/quote/steps/StepSector";
import { StepService } from "@/components/quote/steps/StepService";
import { StepScope } from "@/components/quote/steps/StepScope";
import { StepLeadUrgency } from "@/components/quote/steps/StepLeadUrgency";
import { SummaryCard } from "@/components/quote/SummaryCard";
import { ResultPanel } from "@/components/quote/ResultPanel";
import { RecentLeadsTable } from "@/components/quote/RecentLeadsTable";
import { formatCOP } from "@/lib/utils/money";

const steps = [
  { key: "company", label: "Empresa", fields: ["companyType"] as const },
  { key: "sector", label: "Sector", fields: ["sector"] as const },
  { key: "service", label: "Servicio", fields: ["service"] as const },
  { key: "scope", label: "Alcance", fields: ["deliverables", "piecesCount"] as const },
  {
    key: "lead",
    label: "Contacto",
    fields: ["urgency", "leadName", "leadCompany", "leadContact", "budgetTarget", "notes"] as const,
  },
];

export function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [toast, setToast] = useState("");
  const [recentLeads, setRecentLeads] = useState<StoredLead[]>([]);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    mode: "onBlur",
    defaultValues: defaultQuoteValues,
  });

  const values = form.watch();

  useEffect(() => {
    const persisted = loadQuote();
    if (persisted) {
      form.reset(persisted);
    }
    setRecentLeads(getLeadHistory().slice(0, 5));
  }, [form]);

  useEffect(() => {
    saveQuote(values);
  }, [values]);

  const quote = useMemo(() => calculateQuote(values), [values]);

  const whatsappData = useMemo(() => {
    return buildWhatsappMessage({
      values,
      result: quote,
      serviceDeliverables: deliverablesByService[values.service],
      extrasCatalog: globalExtras,
    });
  }, [values, quote]);

  const goNext = async () => {
    const targetFields = [...steps[currentStep - 1].fields] as Array<keyof QuoteFormValues>;
    const isValid = await form.trigger(targetFields);
    if (!isValid) {
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const goBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const copySummary = async () => {
    const summary = [
      `Rango estimado: ${formatCOP(quote.min)} - ${formatCOP(quote.max)}`,
      `Empresa: ${values.leadCompany}`,
      `Contacto: ${values.leadContact}`,
      `Servicio: ${values.service}`,
      `Urgencia: ${values.urgency}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setToast("Resumen copiado.");
    } catch {
      setToast("No se pudo copiar. Intenta manualmente.");
    }
  };

  const handleLeadSubmit = async (data: QuoteFormValues) => {
    saveQuote(data);
    saveLeadToHistory(data, quote);
    setRecentLeads(getLeadHistory().slice(0, 5));
    setToast("Lead guardado en historial local.");
  };

  const exportLeadCsv = () => {
    const leads = getLeadHistory();
    if (!leads.length) {
      setToast("No hay leads en historial para exportar.");
      return;
    }

    const csv = buildLeadHistoryCsv(leads);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads-cotizador-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToast(`CSV exportado (${leads.length} lead${leads.length === 1 ? "" : "s"}).`);
  };

  const handleClearHistory = () => {
    const confirmed = window.confirm("¿Seguro que deseas eliminar el historial local de leads?");
    if (!confirmed) {
      return;
    }
    clearLeadHistory();
    setRecentLeads([]);
    setToast("Historial local eliminado.");
  };

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timeout = window.setTimeout(() => setToast(""), 2500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const progressPercent = Math.round((currentStep / steps.length) * 100);

  return (
    <FormProvider {...form}>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
              <span>
                Paso {currentStep} de {steps.length}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200" aria-label="Progreso del wizard">
              <div className="h-full bg-blue-600 transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <form onSubmit={form.handleSubmit(handleLeadSubmit)} className="space-y-5">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              {currentStep === 1 && <StepCompany />}
              {currentStep === 2 && <StepSector />}
              {currentStep === 3 && <StepService />}
              {currentStep === 4 && <StepScope />}
              {currentStep === 5 && <StepLeadUrgency />}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={currentStep === 1}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Anterior
              </button>

              <div className="flex items-center gap-2">
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Siguiente
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Guardar lead
                    </button>
                    <button
                      type="button"
                      onClick={exportLeadCsv}
                      className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      Exportar CSV
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        clearQuote();
                        form.reset(defaultQuoteValues);
                        setCurrentStep(1);
                      }}
                      className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      Reiniciar
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>

          <ResultPanel
            quote={quote}
            onCopySummary={copySummary}
            whatsappUrl={whatsappData.url}
            onGoToLead={() => {
              setCurrentStep(5);
              document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />

          <RecentLeadsTable leads={recentLeads} onClearHistory={handleClearHistory} />
        </div>

        <SummaryCard values={values} />
      </div>

      {toast && (
        <p className="fixed bottom-5 right-5 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white shadow-lg" role="status">
          {toast}
        </p>
      )}
    </FormProvider>
  );
}
