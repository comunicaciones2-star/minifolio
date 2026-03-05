"use client";

import { useState } from "react";
import {
  companyLabels,
  sectorLabels,
  serviceLabels,
  urgencyLabels,
  deliverablesByService,
  globalExtras,
  type ServiceType,
} from "@/lib/pricing/pricingConfig";
import type { QuoteFormValues } from "@/lib/validation/quoteSchema";

type SummaryCardProps = {
  values: QuoteFormValues;
};

export function SummaryCard({ values }: SummaryCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const deliverables = deliverablesByService[values.service as ServiceType]
    .filter((item) => values.deliverables.includes(item.id))
    .map((item) => item.label);

  const extras = globalExtras.filter((item) => values.extras.includes(item.id)).map((item) => item.label);

  return (
    <aside className="sticky top-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <button
        type="button"
        className="flex w-full items-center justify-between text-left md:hidden"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-sm font-semibold text-slate-900">Resumen</span>
        <span className="text-xs text-slate-500">{isOpen ? "Ocultar" : "Ver"}</span>
      </button>
      <div className={`${isOpen ? "block" : "hidden"} mt-3 space-y-3 md:mt-0 md:block`}>
        <h3 className="hidden text-sm font-semibold text-slate-900 md:block">Resumen</h3>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-slate-500">Empresa</dt>
            <dd className="font-medium text-slate-800">{companyLabels[values.companyType]}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Sector</dt>
            <dd className="font-medium text-slate-800">{sectorLabels[values.sector]}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Servicio</dt>
            <dd className="font-medium text-slate-800">{serviceLabels[values.service]}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Entregables</dt>
            <dd className="font-medium text-slate-800">{deliverables.join(", ") || "Sin seleccionar"}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Piezas</dt>
            <dd className="font-medium text-slate-800">{values.piecesCount}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Urgencia</dt>
            <dd className="font-medium text-slate-800">{urgencyLabels[values.urgency]}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Extras</dt>
            <dd className="font-medium text-slate-800">{extras.join(", ") || "Sin extras"}</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}
