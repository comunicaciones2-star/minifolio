import { AdminBreakdown } from "./AdminBreakdown";
import { WhatsappButton } from "./WhatsappButton";
import type { QuoteResult } from "@/lib/pricing/calculateQuote";
import { getCustomerBenefits, getTimelineByUrgency } from "@/lib/pricing/customerInsights";
import type { ServiceType, UrgencyType } from "@/lib/pricing/pricingConfig";
import { formatCOP } from "@/lib/utils/money";
import { GhostButton } from "@/components/ui/Buttons";

type ResultPanelProps = {
  quote: QuoteResult;
  service: ServiceType;
  urgency: UrgencyType;
  whatsappUrl: string;
  isAdmin: boolean;
  budgetValue: number;
  onCopySummary: () => void;
  onDownloadSummary: () => void;
  onPrint: () => void;
  showPrice: boolean;
};

export function ResultPanel({
  quote,
  service,
  urgency,
  whatsappUrl,
  isAdmin,
  budgetValue,
  onCopySummary,
  onDownloadSummary,
  onPrint,
  showPrice,
}: ResultPanelProps) {
  const benefits = getCustomerBenefits(service);
  const timeline = getTimelineByUrgency(urgency);

  const budgetMessage =
    budgetValue < quote.min
      ? "Tu presupuesto está por debajo del rango estimado. Podemos ajustar el alcance del proyecto para adaptarlo a tu presupuesto."
      : budgetValue > quote.max
        ? "Con ese presupuesto podemos plantear una solución más completa para tu empresa."
        : "Tu presupuesto está alineado con este tipo de proyecto.";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="text-lg font-semibold text-[var(--primary)]">Resultado de tu proyecto</h3>
      {showPrice ? (
        <>
          <p className="mt-2 text-sm text-[var(--neutral)]">Según la información que ingresaste, tu proyecto podría estar aproximadamente entre:</p>
          <p className="mt-2 break-words text-3xl font-semibold text-[var(--primary)]">
            {formatCOP(quote.min)} - {formatCOP(quote.max)} COP
          </p>
        </>
      ) : (
        <p className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-[var(--neutral)] dark:border-slate-700 dark:bg-slate-900/70">
          Completa el paso 6 y haz clic en <strong className="text-[var(--primary)]">Ver estimación y continuar</strong> para conocer tu rango aproximado en COP.
        </p>
      )}

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-[var(--primary)]">Esta inversión podría incluir</h4>
        <ul className="mt-3 space-y-2 text-sm text-[var(--neutral)]">
          {benefits.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="font-semibold text-[var(--secondary)]">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-lg bg-slate-50 px-3 py-3 dark:bg-slate-900/70">
        <h4 className="text-sm font-semibold text-[var(--primary)]">Tiempo estimado de desarrollo</h4>
        <p className="mt-1 text-sm text-[var(--neutral)]">
          Dependiendo del alcance final del proyecto, el tiempo de desarrollo podría estar entre: <strong className="text-[var(--primary)]">{timeline}</strong>
        </p>
      </div>

      {showPrice && <p className="mt-4 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-[var(--neutral)] dark:border-slate-700 dark:bg-slate-900">{budgetMessage}</p>}

      <div className="mt-4 flex flex-wrap gap-3">
        {showPrice && <WhatsappButton url={whatsappUrl} label="Continuar por WhatsApp" />}
        {showPrice && (
          <GhostButton type="button" onClick={onCopySummary} className="px-4 py-2">
            Copiar resumen
          </GhostButton>
        )}
        {showPrice && (
          <GhostButton type="button" onClick={onDownloadSummary} className="px-4 py-2">
            Descargar resumen
          </GhostButton>
        )}
        {showPrice && (
          <GhostButton type="button" onClick={onPrint} className="px-4 py-2">
            Imprimir / PDF
          </GhostButton>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Esta es una estimación orientativa. El valor final puede variar según el alcance definitivo, tiempos de entrega y nivel de complejidad del proyecto.
      </p>

      {isAdmin && <AdminBreakdown breakdown={quote.breakdown} />}
    </section>
  );
}
