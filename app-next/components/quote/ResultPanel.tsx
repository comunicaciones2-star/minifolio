"use client";

import { formatCOP } from "@/lib/utils/money";
import type { QuoteResult } from "@/lib/pricing/calculateQuote";

type ResultPanelProps = {
  quote: QuoteResult;
  onCopySummary: () => void;
  onGoToLead: () => void;
  whatsappUrl: string;
};

export function ResultPanel({ quote, onCopySummary, onGoToLead, whatsappUrl }: ResultPanelProps) {
  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm" aria-live="polite">
      <h3 className="text-lg font-semibold text-slate-900">Resultado estimado</h3>
      <p className="text-2xl font-bold text-slate-900">
        {formatCOP(quote.min)} - {formatCOP(quote.max)}
      </p>
      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
        <p>Multiplicador sector: x{quote.breakdown.sectorMultiplier.toFixed(2)}</p>
        <p>Multiplicador urgencia: x{quote.breakdown.urgencyMultiplier.toFixed(2)}</p>
        <p>
          Entregables: +{formatCOP(quote.breakdown.deliverablesMinAdd)} a +
          {formatCOP(quote.breakdown.deliverablesMaxAdd)}
        </p>
        <p>
          Extras: +{formatCOP(quote.breakdown.extrasMinAdd)} a +{formatCOP(quote.breakdown.extrasMaxAdd)}
        </p>
        <p>Complejidad: x{quote.breakdown.complexityMultiplier.toFixed(2)}</p>
      </div>
      <p className="text-xs text-slate-500">
        Estimación orientativa. El valor final depende del alcance, tiempos y complejidad.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onGoToLead}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Solicitar cotización personalizada
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Enviar por WhatsApp
        </a>
        <button
          type="button"
          onClick={onCopySummary}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Copiar resumen
        </button>
      </div>
    </section>
  );
}
