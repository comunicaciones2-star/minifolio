export type PortfolioProject = {
  name: string;
  summary: string;
};

export type PortfolioContent = {
  badge: string;
  title: string;
  description: string;
  sectionTitle: string;
  sectionDescription: string;
  projects: PortfolioProject[];
};

export const portfolioContent: PortfolioContent = {
  badge: "Portafolio",
  title: "Casos de marca con enfoque estratégico",
  description:
    "Proyectos desarrollados para mejorar posicionamiento, consistencia visual y percepción de valor en el mercado.",
  sectionTitle: "Proyectos representativos",
  sectionDescription:
    "Cada caso combina diagnóstico estratégico, dirección visual y criterios de implementación orientados a resultados.",
  projects: [
    {
      name: "Rediseño de marca para firma legal",
      summary: "Reestructuración visual y verbal para transmitir solidez, claridad y especialización.",
    },
    {
      name: "Campaña digital para retail",
      summary: "Sistema de piezas para pauta y conversión con enfoque en diferenciación competitiva.",
    },
    {
      name: "Sistema visual para startup tech",
      summary: "Arquitectura de marca escalable para producto digital, comunicación y crecimiento.",
    },
    {
      name: "Identidad y material corporativo para pyme",
      summary: "Desarrollo integral de identidad con lineamientos de implementación en entornos reales.",
    },
  ],
};
