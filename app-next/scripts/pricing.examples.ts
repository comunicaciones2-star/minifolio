import { calculateQuote } from "../lib/pricing/calculateQuote";
import type { QuoteFormValues } from "../lib/validation/quoteSchema";

const examples: QuoteFormValues[] = [
  {
    companyType: "startup",
    sector: "tech",
    service: "branding",
    deliverables: ["brand-audit", "positioning"],
    piecesCount: 8,
    urgency: "normal",
    extras: ["extra-round"],
    leadName: "Camila",
    leadCompany: "Nova Labs",
    leadContact: "camila@novalabs.co",
    budgetTarget: "3.500.000",
    notes: "Lanzamiento en Q2",
  },
  {
    companyType: "pyme",
    sector: "retail",
    service: "campaign",
    deliverables: ["campaign-concept", "ad-set", "reporting"],
    piecesCount: 20,
    urgency: "priority",
    extras: ["priority-support"],
    leadName: "Andrés",
    leadCompany: "Merca Plus",
    leadContact: "+573001112233",
    budgetTarget: "5.000.000",
    notes: "Campaña de temporada",
  },
  {
    companyType: "enterprise",
    sector: "legal_finance",
    service: "identity",
    deliverables: ["logo-system", "visual-kit", "stationery"],
    piecesCount: 35,
    urgency: "express",
    extras: ["brand-guideline-plus", "priority-support"],
    leadName: "Sofía",
    leadCompany: "Lex Capital",
    leadContact: "sofia@lexcapital.com",
    budgetTarget: "12.000.000",
    notes: "Rebranding completo",
  },
];

examples.forEach((item, index) => {
  const result = calculateQuote(item);
  console.log(`Ejemplo ${index + 1}:`, {
    min: result.min,
    max: result.max,
    service: item.service,
    companyType: item.companyType,
  });
});
