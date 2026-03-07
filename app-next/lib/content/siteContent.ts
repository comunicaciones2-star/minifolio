import { brand } from "@/lib/constants/brand";

export const siteContent = {
  metadata: {
    title: `${brand.name} | ${brand.title}`,
    description: "Sitio oficial con servicios, portafolio y cotizador para empresas en Colombia.",
  },
  footer: {
    subtitle: `${brand.title} | ${brand.tagline}`,
  },
} as const;
