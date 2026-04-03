import type { DashboardLead } from "@/components/dashboard/LeadsTable";
import { PriorityBadge } from "@/components/dashboard/PriorityBadge";

type LeadTimelineProps = {
  leads: DashboardLead[];
};

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat("es-CO", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));

export function LeadTimeline({ leads }: LeadTimelineProps) {
  const items = leads
    .filter((lead) => Boolean(lead.nextFollowUpAt))
    .sort((a, b) => new Date(a.nextFollowUpAt).getTime() - new Date(b.nextFollowUpAt).getTime())
    .slice(0, 10);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-[var(--primary)]">Timeline de seguimiento</h2>
        <p className="text-xs text-[var(--neutral)]">Próximos contactos recomendados</p>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-[var(--neutral)]">No hay eventos de seguimiento aún.</p>
        ) : (
          items.map((lead) => (
            <article key={lead.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[var(--primary)]">{lead.name}</p>
                <PriorityBadge priority={lead.priority} />
              </div>
              <p className="mt-1 text-xs text-[var(--neutral)]">{lead.company} • {lead.service}</p>
              <p className="mt-1 text-xs font-medium text-[var(--primary)]">Seguimiento: {formatDate(lead.nextFollowUpAt)}</p>
              <a
                href={lead.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex rounded-md border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Contactar por WhatsApp
              </a>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
