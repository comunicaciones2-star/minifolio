import { formatCOP } from "@/lib/utils/money";
import {
  companyLabels,
  sectorLabels,
  serviceLabels,
  urgencyLabels,
  type DeliverableItem,
  type ExtraItem,
} from "@/lib/pricing/pricingConfig";
import type { QuoteFormValues } from "@/lib/validation/quoteSchema";

type BuildMessageInput = {
  values: QuoteFormValues;
  result: { min: number; max: number };
  serviceDeliverables: DeliverableItem[];
  extrasCatalog: ExtraItem[];
};

export const buildWhatsappMessage = ({
  values,
  result,
  serviceDeliverables,
  extrasCatalog,
}: BuildMessageInput) => {
  const deliverableLabels = serviceDeliverables
    .filter((item) => values.deliverables.includes(item.id))
    .map((item) => item.label)
    .join(", ");

  const extraLabels = extrasCatalog
    .filter((item) => values.extras.includes(item.id))
    .map((item) => item.label)
    .join(", ");

  const message = [
    "Hola, quiero solicitar una cotización personalizada.",
    "",
    `Empresa: ${values.leadCompany}`,
    `Nombre: ${values.leadName}`,
    `Contacto: ${values.leadContact}`,
    `Tipo empresa: ${companyLabels[values.companyType]}`,
    `Sector: ${sectorLabels[values.sector]}`,
    `Servicio: ${serviceLabels[values.service]}`,
    `Entregables: ${deliverableLabels || "N/A"}`,
    `Piezas/aplicaciones: ${values.piecesCount}`,
    `Urgencia: ${urgencyLabels[values.urgency]}`,
    `Extras: ${extraLabels || "N/A"}`,
    `Rango estimado: ${formatCOP(result.min)} - ${formatCOP(result.max)}`,
    values.budgetTarget ? `Presupuesto objetivo: ${values.budgetTarget}` : "",
    values.notes ? `Notas: ${values.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    message,
    url: `https://wa.me/?text=${encodeURIComponent(message)}`,
  };
};
