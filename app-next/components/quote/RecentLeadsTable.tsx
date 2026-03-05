"use client";

import { formatCOP } from "@/lib/utils/money";
import type { StoredLead } from "@/lib/storage/leadHistory";

type RecentLeadsTableProps = {
  leads: StoredLead[];
  onClearHistory: () => void;
};

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

export function RecentLeadsTable({ leads, onClearHistory }: RecentLeadsTableProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="recent-leads-title">
      <div className="mb-3 flex items-center justify-between">
        <h3 id="recent-leads-title" className="text-lg font-semibold text-slate-900">
          Últimos leads guardados
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">Mostrando {Math.min(leads.length, 5)}</span>
          <button
            type="button"
            onClick={onClearHistory}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Limpiar historial
          </button>
        </div>
      </div>

      {leads.length === 0 ? (
        <p className="text-sm text-slate-600">Aún no hay leads guardados en este navegador.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm" aria-label="Tabla de últimos leads">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-2 py-2 font-medium">Fecha</th>
                <th className="px-2 py-2 font-medium">Nombre</th>
                <th className="px-2 py-2 font-medium">Empresa</th>
                <th className="px-2 py-2 font-medium">Contacto</th>
                <th className="px-2 py-2 font-medium">Rango</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="border-b border-slate-100 text-slate-700 last:border-b-0">
                  <td className="px-2 py-2">{formatDate(lead.createdAt)}</td>
                  <td className="px-2 py-2">{lead.data.leadName}</td>
                  <td className="px-2 py-2">{lead.data.leadCompany}</td>
                  <td className="px-2 py-2">{lead.data.leadContact}</td>
                  <td className="px-2 py-2 font-medium text-slate-900">
                    {formatCOP(lead.quoteMin)} - {formatCOP(lead.quoteMax)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
