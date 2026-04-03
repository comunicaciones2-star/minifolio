import { formatCOP } from "@/lib/utils/money";
import { StatusBadge, type LeadStatus } from "@/components/dashboard/StatusBadge";

export type DashboardLead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  service: string;
  priceMin: number;
  priceMax: number;
  score: number;
  status: LeadStatus;
  whatsappUrl: string;
};

type LeadsTableProps = {
  leads: DashboardLead[];
  onStatusChange: (leadId: string, status: LeadStatus) => void;
};

export function LeadsTable({ leads, onStatusChange }: LeadsTableProps) {
  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        No hay leads para este filtro.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Nombre</th>
            <th className="px-4 py-3 font-medium">Servicio</th>
            <th className="px-4 py-3 font-medium">Precio</th>
            <th className="px-4 py-3 font-medium">Score</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-slate-100 last:border-b-0 dark:border-slate-800">
              <td className="px-4 py-3 font-medium text-[var(--primary)]">{lead.name}</td>
              <td className="px-4 py-3 text-[var(--neutral)]">{lead.service}</td>
              <td className="px-4 py-3 font-medium text-[var(--primary)]">
                {formatCOP(lead.priceMin)} - {formatCOP(lead.priceMax)}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {lead.score}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <StatusBadge status={lead.status} />
                  <select
                    value={lead.status}
                    onChange={(event) => onStatusChange(lead.id, event.target.value as LeadStatus)}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <option value="new">Nuevo</option>
                    <option value="contacted">Contactado</option>
                    <option value="closed">Cerrado</option>
                  </select>
                </div>
              </td>
              <td className="px-4 py-3">
                <a
                  href={lead.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  WhatsApp
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
