import { companyLabels, sectorLabels, serviceLabels } from "@/lib/pricing/pricingConfig";
import { formatCOP } from "@/lib/utils/money";
import type { QuoteFormValues } from "@/lib/validation/quoteSchema";

const WHATSAPP_NUMBER = "573043195028";

export const buildQuoteWhatsappUrl = (values: QuoteFormValues, quote: { min: number; max: number }) => {
  const lines = [
    "Hola Jhon, acabo de usar el cotizador de tu sitio web.",
    "",
    `Perfil corporativo: ${companyLabels[values.companyType]}`,
    `Sector: ${sectorLabels[values.sector]}`,
    `Servicio: ${serviceLabels[values.service]}`,
    "",
    "Rango estimado:",
    `${formatCOP(quote.min)} - ${formatCOP(quote.max)} COP`,
    `Presupuesto aproximado: ${formatCOP(values.budgetValue)}`,
    "",
    "Me gustaría recibir una cotización personalizada para este proyecto.",
  ];

  const message = lines.join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
