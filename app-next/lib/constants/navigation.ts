import { routes } from "@/lib/constants/routes";

export type NavigationItem = {
  href: string;
  label: string;
};

export const mainNavigation: NavigationItem[] = [
  { href: routes.home, label: "Inicio" },
  { href: routes.about, label: "Sobre mi" },
  { href: routes.services, label: "Servicios" },
  { href: routes.portfolio, label: "Portafolio" },
  { href: routes.quote, label: "Cotizador" },
  { href: routes.contact, label: "Contacto" },
];

export const footerNavigation: NavigationItem[] = [
  { href: routes.portfolio, label: "Portafolio" },
  { href: routes.contact, label: "Contacto" },
];
