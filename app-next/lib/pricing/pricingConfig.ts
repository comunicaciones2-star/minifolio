export type CompanyType = "startup" | "pyme" | "enterprise";
export type ServiceType = "branding" | "identity" | "campaign" | "print";
export type SectorType =
  | "tech"
  | "health"
  | "legal_finance"
  | "retail"
  | "construction_industry"
  | "education"
  | "hospitality"
  | "agro_energy"
  | "government"
  | "other";
export type UrgencyType = "normal" | "priority" | "express";

export type PriceRange = {
  min: number;
  max: number;
};

export type DeliverableItem = {
  id: string;
  label: string;
  minAdd: number;
  maxAdd: number;
};

export type ExtraItem = {
  id: string;
  label: string;
  minAdd: number;
  maxAdd: number;
};

export const companyLabels: Record<CompanyType, string> = {
  startup: "Startup",
  pyme: "Pyme",
  enterprise: "Enterprise",
};

export const serviceLabels: Record<ServiceType, string> = {
  branding: "Branding estratégico",
  identity: "Identidad visual",
  campaign: "Campañas",
  print: "Impresión",
};

export const sectorLabels: Record<SectorType, string> = {
  tech: "Tecnología",
  health: "Salud",
  legal_finance: "Legal y finanzas",
  retail: "Retail",
  construction_industry: "Construcción e industria",
  education: "Educación",
  hospitality: "Hospitalidad",
  agro_energy: "Agro y energía",
  government: "Gobierno",
  other: "Otro",
};

export const urgencyLabels: Record<UrgencyType, string> = {
  normal: "Normal",
  priority: "Prioritario",
  express: "Express",
};

export const baseRanges: Record<ServiceType, Record<CompanyType, PriceRange>> = {
  branding: {
    startup: { min: 1_500_000, max: 3_000_000 },
    pyme: { min: 3_000_000, max: 6_000_000 },
    enterprise: { min: 6_000_000, max: 15_000_000 },
  },
  identity: {
    startup: { min: 800_000, max: 1_800_000 },
    pyme: { min: 1_800_000, max: 3_500_000 },
    enterprise: { min: 3_500_000, max: 7_000_000 },
  },
  campaign: {
    startup: { min: 300_000, max: 900_000 },
    pyme: { min: 900_000, max: 2_000_000 },
    enterprise: { min: 2_000_000, max: 5_000_000 },
  },
  print: {
    startup: { min: 200_000, max: 700_000 },
    pyme: { min: 700_000, max: 1_800_000 },
    enterprise: { min: 1_800_000, max: 4_000_000 },
  },
};

export const sectorMultipliers: Record<SectorType, number> = {
  tech: 1.1,
  health: 1.2,
  legal_finance: 1.25,
  retail: 1.1,
  construction_industry: 1.15,
  education: 1.05,
  hospitality: 1,
  agro_energy: 1.15,
  government: 1.25,
  other: 1,
};

export const urgencyMultipliers: Record<UrgencyType, number> = {
  normal: 1,
  priority: 1.2,
  express: 1.4,
};

export const serviceCaps: Record<ServiceType, PriceRange> = {
  branding: { min: 1_200_000, max: 30_000_000 },
  identity: { min: 700_000, max: 15_000_000 },
  campaign: { min: 250_000, max: 12_000_000 },
  print: { min: 180_000, max: 10_000_000 },
};

export const complexityTiers = [
  { min: 1, max: 5, multiplier: 1 },
  { min: 6, max: 15, multiplier: 1.1 },
  { min: 16, max: 30, multiplier: 1.2 },
  { min: 31, max: Number.POSITIVE_INFINITY, multiplier: 1.35 },
];

export const deliverablesByService: Record<ServiceType, DeliverableItem[]> = {
  branding: [
    { id: "brand-audit", label: "Auditoría de marca", minAdd: 300_000, maxAdd: 600_000 },
    { id: "naming", label: "Naming", minAdd: 500_000, maxAdd: 1_200_000 },
    { id: "positioning", label: "Posicionamiento", minAdd: 400_000, maxAdd: 900_000 },
    { id: "brand-book", label: "Brand book", minAdd: 700_000, maxAdd: 1_600_000 },
  ],
  identity: [
    { id: "logo-system", label: "Sistema de logo", minAdd: 350_000, maxAdd: 900_000 },
    { id: "visual-kit", label: "Kit visual", minAdd: 250_000, maxAdd: 650_000 },
    { id: "social-pack", label: "Pack redes", minAdd: 200_000, maxAdd: 500_000 },
    { id: "stationery", label: "Papelería corporativa", minAdd: 180_000, maxAdd: 450_000 },
  ],
  campaign: [
    { id: "campaign-concept", label: "Concepto creativo", minAdd: 200_000, maxAdd: 600_000 },
    { id: "copywriting", label: "Copywriting", minAdd: 160_000, maxAdd: 450_000 },
    { id: "ad-set", label: "Set de anuncios", minAdd: 250_000, maxAdd: 700_000 },
    { id: "reporting", label: "Reporte de campaña", minAdd: 120_000, maxAdd: 350_000 },
  ],
  print: [
    { id: "brochure", label: "Brochure", minAdd: 180_000, maxAdd: 520_000 },
    { id: "catalog", label: "Catálogo", minAdd: 260_000, maxAdd: 800_000 },
    { id: "packaging", label: "Empaques", minAdd: 300_000, maxAdd: 900_000 },
    { id: "point-of-sale", label: "Material POP", minAdd: 140_000, maxAdd: 420_000 },
  ],
};

export const globalExtras: ExtraItem[] = [
  { id: "brand-guideline-plus", label: "Guía extendida", minAdd: 250_000, maxAdd: 650_000 },
  { id: "extra-round", label: "Ronda extra de cambios", minAdd: 180_000, maxAdd: 420_000 },
  { id: "priority-support", label: "Soporte de lanzamiento", minAdd: 200_000, maxAdd: 500_000 },
];
