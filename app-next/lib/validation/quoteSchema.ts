import { z } from "zod";

export const quoteSchema = z.object({
  companyType: z.enum(["startup", "pyme", "enterprise"]),
  sector: z.enum([
    "tech",
    "health",
    "legal_finance",
    "retail",
    "construction_industry",
    "education",
    "hospitality",
    "agro_energy",
    "government",
    "other",
  ]),
  service: z.enum(["branding", "identity", "campaign", "print"]),
  deliverables: z.array(z.string()).min(1, "Selecciona al menos un entregable."),
  piecesCount: z.coerce.number().min(1, "Ingresa mínimo 1 pieza.").max(500, "Máximo 500 piezas."),
  urgency: z.enum(["normal", "priority", "express"]),
  extras: z.array(z.string()).default([]),
  leadName: z.string().min(2, "Ingresa tu nombre."),
  leadCompany: z.string().min(2, "Ingresa tu empresa."),
  leadContact: z
    .string()
    .min(5, "Ingresa WhatsApp o email.")
    .refine((value) => /@|\+?\d{7,}/.test(value), "Usa email o teléfono válido."),
  budgetTarget: z.string().optional(),
  notes: z.string().max(500, "Máximo 500 caracteres.").optional(),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

export const defaultQuoteValues: QuoteFormValues = {
  companyType: "startup",
  sector: "other",
  service: "branding",
  deliverables: [],
  piecesCount: 1,
  urgency: "normal",
  extras: [],
  leadName: "",
  leadCompany: "",
  leadContact: "",
  budgetTarget: "",
  notes: "",
};
