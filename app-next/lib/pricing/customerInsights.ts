import type { ServiceType, UrgencyType } from "@/lib/pricing/pricingConfig";

const benefitsByService: Record<ServiceType, string[]> = {
  branding: [
    "Diagnóstico inicial de la marca",
    "Dirección estratégica de identidad",
    "Diseño profesional de logo",
    "Sistema básico de colores y tipografía",
    "Versiones del logo para distintos usos",
  ],
  identity: [
    "Diseño de logo profesional",
    "Paleta de colores corporativa",
    "Tipografía estratégica",
    "Aplicaciones clave para redes y piezas comerciales",
    "Guía básica de implementación visual",
  ],
  campaign: [
    "Concepto creativo para campañas",
    "Piezas visuales para redes y pauta",
    "Mensajes orientados a resultados comerciales",
    "Adaptaciones para distintos formatos",
    "Lineamientos de coherencia de marca en campaña",
  ],
  print: [
    "Diseño corporativo para material impreso",
    "Piezas listas para imprenta profesional",
    "Coherencia visual entre marca y documentos",
    "Versiones adaptadas para usos internos y comerciales",
    "Refuerzo de percepción profesional de tu empresa",
  ],
};

const timelineByUrgency: Record<UrgencyType, string> = {
  normal: "2 a 4 semanas",
  priority: "1 a 2 semanas",
  express: "3 a 5 días",
};

export const getCustomerBenefits = (service: ServiceType) => {
  return benefitsByService[service];
};

export const getTimelineByUrgency = (urgency: UrgencyType) => {
  return timelineByUrgency[urgency];
};
