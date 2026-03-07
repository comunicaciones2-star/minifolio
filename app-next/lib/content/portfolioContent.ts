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
  title: "Casos de marca con enfoque estrategico",
  description:
    "Proyectos desarrollados para mejorar posicionamiento, consistencia visual y percepcion de valor en el mercado.",
  sectionTitle: "Proyectos representativos",
  sectionDescription:
    "Cada caso combina diagnostico estrategico, direccion visual y criterios de implementacion orientados a resultados.",
  projects: [
    {
      name: "Rediseno de marca para firma legal",
      summary: "Reestructuracion visual y verbal para transmitir solidez, claridad y especializacion.",
    },
    {
      name: "Campana digital para retail",
      summary: "Sistema de piezas para pauta y conversion con enfoque en diferenciacion competitiva.",
    },
    {
      name: "Sistema visual para startup tech",
      summary: "Arquitectura de marca escalable para producto digital, comunicacion y crecimiento.",
    },
    {
      name: "Identidad y material corporativo para pyme",
      summary: "Desarrollo integral de identidad con lineamientos de implementacion en entornos reales.",
    },
  ],
};
