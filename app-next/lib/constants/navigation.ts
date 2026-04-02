import { routes } from "@/lib/constants/routes";

export type NavigationItem = {
  href: string;
  label: string;
};

export const mainNavigation: NavigationItem[] = [
  { href: routes.home, label: "Inicio" },
  { href: routes.about, label: "Sobre mí" },
  { href: routes.services, label: "Servicios" },
  { href: routes.portfolio, label: "Portafolio" },
  { href: routes.contact, label: "Contacto" },
];

export const footerNavigation: NavigationItem[] = [
  { href: routes.portfolio, label: "Portafolio" },
  { href: routes.contact, label: "Contacto" },
];
