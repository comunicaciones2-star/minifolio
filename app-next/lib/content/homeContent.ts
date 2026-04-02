import { ctaCopy, ctaLinks } from "@/lib/constants/cta";

export const homeContent = {
  hero: {
    badge: "Estudio digital para marcas en crecimiento",
    headline:
      "Diseño de marca y soluciones digitales para empresas que quieren crecer con una presencia más sólida, moderna y estratégica.",
    subheadline:
      "Combino branding, desarrollo web y herramientas digitales para construir experiencias que ayudan a las empresas a comunicar mejor, verse mejor y funcionar mejor.",
    ctas: {
      primary: { label: ctaCopy.primary, href: ctaLinks.primary },
      secondary: { label: ctaCopy.secondary, href: ctaLinks.secondary },
    },
    stats: [
      { label: "Proyectos ejecutados", value: "120+" },
      { label: "Sectores atendidos", value: "14" },
      { label: "Enfoque", value: "Branding + Web" },
    ],
  },
  problem: {
    title: "Muchas empresas tienen buenos productos, pero una presencia digital débil.",
    text:
      "Hoy no basta con estar en internet. Las empresas necesitan una identidad clara, una experiencia digital moderna y una comunicación que genere confianza.",
  },
  value: {
    title: "Diseño con visión estratégica y construcción digital.",
    text:
      "Mi trabajo no se limita a crear piezas visuales. Ayudo a construir marcas y soluciones digitales que conectan mejor con el mercado, mejoran la presencia online y aportan claridad al negocio.",
  },
  services: {
    title: "Servicios",
    items: [
      {
        title: "Branding estratégico",
        text: "Definición de posicionamiento, narrativa y dirección visual para marcas más sólidas.",
      },
      {
        title: "Sitios web y landing pages",
        text: "Experiencias web modernas, rápidas y orientadas a conversión.",
      },
      {
        title: "Soluciones digitales",
        text: "Herramientas y flujos digitales útiles para mejorar procesos y servicio.",
      },
      {
        title: "Diseño publicitario y corporativo",
        text: "Piezas para comunicación comercial y material institucional coherente.",
      },
    ],
  },
  projects: {
    title: "Proyectos destacados",
    text:
      "Una selección de trabajos donde estrategia, diseño y desarrollo se integran para construir resultados más sólidos.",
    items: [
      {
        name: "Replanteamiento de identidad para firma profesional",
        category: "Branding estratégico",
      },
      {
        name: "Landing comercial para captación B2B",
        category: "Web y conversión",
      },
      {
        name: "Sistema visual y comunicación para empresa industrial",
        category: "Identidad corporativa",
      },
    ],
  },
  process: {
    title: "Proceso de trabajo",
    steps: [
      { title: "Diagnóstico", text: "Análisis de contexto, mercado y estado actual de marca." },
      { title: "Estrategia", text: "Definición de dirección, objetivos y enfoque de comunicación." },
      { title: "Diseño y desarrollo", text: "Construcción visual y digital con criterio de negocio." },
      { title: "Implementación", text: "Puesta en marcha con entregables listos para operar." },
    ],
  },
  digital: {
    title: "Más que diseño: soluciones digitales útiles",
    text:
      "Además de trabajar en branding, desarrollo sitios y herramientas digitales que ayudan a las empresas a mejorar procesos, presentar mejor su oferta y facilitar la interacción con sus clientes.",
    items: [
      "Cotizadores web para servicios",
      "Landing pages de captación",
      "Sistemas de formularios y seguimiento",
      "Micro herramientas para procesos internos",
    ],
  },
  quote: {
    title: "¿Quieres una estimación para tu proyecto?",
    text:
      "Usa el cotizador para tener una referencia inicial de inversión según el tipo de empresa, alcance del proyecto y tiempos de entrega.",
    cta: { label: ctaCopy.primary, href: ctaLinks.primary },
  },
  about: {
    title: "Jhon Fragozo",
    subtitle: "Diseño de marca y soluciones digitales",
    text:
      "Trabajo en la intersección entre branding, desarrollo web y herramientas digitales. Mi enfoque combina estrategia, diseño y construcción funcional para ayudar a empresas a proyectar una presencia más profesional, moderna y competitiva.",
  },
  finalCta: {
    title: "Construyamos una solución más sólida para tu marca",
    text:
      "Si tu empresa necesita mejorar su identidad, su sitio web o desarrollar una herramienta digital útil, podemos trabajar en una solución estratégica y bien construida.",
    actions: {
      primary: { label: ctaCopy.onboardingFinal, href: ctaLinks.onboardingFinal },
      whatsapp: { label: "Hablar por WhatsApp", href: "https://wa.me/573043195028" },
    },
  },
} as const;
