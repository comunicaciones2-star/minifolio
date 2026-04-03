import type { DashboardLead } from "@/components/dashboard/LeadsTable";
import { PriorityBadge } from "@/components/dashboard/PriorityBadge";
import { StatusBadge, type LeadStatus } from "@/components/dashboard/StatusBadge";
import { formatCOP } from "@/lib/utils/money";

type PipelineBoardProps = {
  leads: DashboardLead[];
};

const statusConfig: Array<{ key: LeadStatus; title: string }> = [
  { key: "new", title: "Nuevos" },
  { key: "contacted", title: "Contactados" },
  { key: "closed", title: "Cerrados" },
];

export function PipelineBoard({ leads }: PipelineBoardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-[var(--primary)]">Pipeline de ventas</h2>
        <p className="text-xs text-[var(--neutral)]">Vista rápida por estado</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {statusConfig.map((status) => {
          const items = leads.filter((lead) => lead.status === status.key).slice(0, 4);
          return (
            <div key={status.key} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--primary)]">{status.title}</p>
                <span className="text-xs text-[var(--neutral)]">{items.length}</span>
              </div>

              <div className="space-y-2">
                {items.length === 0 ? (
                  <p className="text-xs text-[var(--neutral)]">Sin leads en este estado.</p>
                ) : (
                  items.map((lead) => (
                    <article key={lead.id} className="rounded-lg border border-slate-200 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-900">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-[var(--primary)]">{lead.name}</p>
                        <StatusBadge status={lead.status} />
                      </div>
                      <div className="mt-1">
                        <PriorityBadge priority={lead.priority} />
                      </div>
                      <p className="mt-1 truncate text-xs text-[var(--neutral)]">{lead.service}</p>
                      <p className="mt-1 text-xs font-medium text-[var(--primary)]">
                        {formatCOP(lead.priceMin)} - {formatCOP(lead.priceMax)}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
