import { formatCOP } from "@/lib/utils/money";
import type { QuoteBreakdown } from "@/lib/pricing/calculateQuote";

type AdminBreakdownProps = {
  breakdown: QuoteBreakdown;
};

export function AdminBreakdown({ breakdown }: AdminBreakdownProps) {
  return (
    <section className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h4 className="text-sm font-semibold text-[var(--primary)]">Modo admin: desglose técnico</h4>
      <div className="mt-3 grid gap-2 text-sm text-[var(--neutral)] sm:grid-cols-2">
        <p>Base: {formatCOP(breakdown.baseMin)} - {formatCOP(breakdown.baseMax)}</p>
        <p>Multiplicador sector: x{breakdown.sectorMultiplier.toFixed(2)}</p>
        <p>Multiplicador urgencia: x{breakdown.urgencyMultiplier.toFixed(2)}</p>
        <p>Complejidad: x{breakdown.complexityMultiplier.toFixed(2)}</p>
        <p>Entregables: +{formatCOP(breakdown.deliverablesMinAdd)} a +{formatCOP(breakdown.deliverablesMaxAdd)}</p>
        <p>Extras: +{formatCOP(breakdown.extrasMinAdd)} a +{formatCOP(breakdown.extrasMaxAdd)}</p>
      </div>
    </section>
  );
}
