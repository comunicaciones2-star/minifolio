export const routes = {
  home: "/",
  about: "/sobre-mi",
  services: "/servicios",
  portfolio: "/portafolio",
  quote: "/cotizador",
  contact: "/contacto",
  heroComparison: "/hero-comparativa",
} as const;

export type RouteValue = (typeof routes)[keyof typeof routes];
