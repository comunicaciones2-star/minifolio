import {
  companyLabels,
  sectorLabels,
  serviceLabels,
  urgencyLabels,
  deliverablesByService,
  globalExtras,
} from "@/lib/pricing/pricingConfig";
import { formatCOP } from "@/lib/utils/money";
import type { QuoteFormValues } from "@/lib/validation/quoteSchema";

const LEAD_HISTORY_KEY = "minifolio:leads:v1";

export type StoredLead = {
  id: string;
  createdAt: string;
  quoteMin: number;
  quoteMax: number;
  data: QuoteFormValues;
};

type LeadHistoryPayload = {
  version: 1;
  leads: StoredLead[];
};

const readPayload = (): LeadHistoryPayload | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(LEAD_HISTORY_KEY);
  if (!raw) {
    return { version: 1, leads: [] };
  }

  try {
    const parsed = JSON.parse(raw) as LeadHistoryPayload;
    if (parsed.version !== 1 || !Array.isArray(parsed.leads)) {
      return { version: 1, leads: [] };
    }
    return parsed;
  } catch {
    return { version: 1, leads: [] };
  }
};

const writePayload = (payload: LeadHistoryPayload) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(LEAD_HISTORY_KEY, JSON.stringify(payload));
};

export const saveLeadToHistory = (data: QuoteFormValues, quote: { min: number; max: number }) => {
  const payload = readPayload();
  if (!payload) {
    return;
  }

  const newLead: StoredLead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    quoteMin: quote.min,
    quoteMax: quote.max,
    data,
  };

  payload.leads.unshift(newLead);
  const trimmed = payload.leads.slice(0, 200);
  writePayload({ version: 1, leads: trimmed });
};

export const getLeadHistory = (): StoredLead[] => {
  return readPayload()?.leads ?? [];
};

export const clearLeadHistory = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(LEAD_HISTORY_KEY);
};

const escapeCsv = (value: string | number) => {
  const stringValue = String(value ?? "");
  const escaped = stringValue.replace(/"/g, '""');
  return `"${escaped}"`;
};

export const buildLeadHistoryCsv = (leads: StoredLead[]) => {
  const headers = [
    "fecha",
    "nombre",
    "empresa",
    "contacto",
    "tipo_empresa",
    "sector",
    "servicio",
    "entregables",
    "piezas",
    "urgencia",
    "extras",
    "presupuesto_objetivo",
    "rango_min_cop",
    "rango_max_cop",
    "rango_legible",
    "notas",
  ];

  const rows = leads.map((lead) => {
    const serviceDeliverables = deliverablesByService[lead.data.service]
      .filter((item) => lead.data.deliverables.includes(item.id))
      .map((item) => item.label)
      .join(" | ");

    const extras = globalExtras
      .filter((item) => lead.data.extras.includes(item.id))
      .map((item) => item.label)
      .join(" | ");

    return [
      lead.createdAt,
      lead.data.leadName,
      lead.data.leadCompany,
      lead.data.leadContact,
      companyLabels[lead.data.companyType],
      sectorLabels[lead.data.sector],
      serviceLabels[lead.data.service],
      serviceDeliverables,
      lead.data.piecesCount,
      urgencyLabels[lead.data.urgency],
      extras,
      lead.data.budgetTarget ?? "",
      lead.quoteMin,
      lead.quoteMax,
      `${formatCOP(lead.quoteMin)} - ${formatCOP(lead.quoteMax)}`,
      lead.data.notes ?? "",
    ].map(escapeCsv);
  });

  return [headers.map(escapeCsv).join(","), ...rows.map((row) => row.join(","))].join("\n");
};
