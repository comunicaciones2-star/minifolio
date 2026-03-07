export const homeContent = {
  hero: {
    badge: "Estudio digital para marcas en crecimiento",
    headline:
      "Diseno de marca y soluciones digitales para empresas que quieren crecer con una presencia mas solida, moderna y estrategica.",
    subheadline:
      "Combino branding, desarrollo web y herramientas digitales para construir experiencias que ayudan a las empresas a comunicar mejor, verse mejor y funcionar mejor.",
    ctas: {
      primary: { label: "Ver proyectos", href: "/portafolio" },
      secondary: { label: "Cotizar proyecto", href: "/cotizador" },
    },
    stats: [
      { label: "Proyectos ejecutados", value: "120+" },
      { label: "Sectores atendidos", value: "14" },
      { label: "Enfoque", value: "Branding + Web" },
    ],
  },
  problem: {
    title: "Muchas empresas tienen buenos productos, pero una presencia digital debil.",
    text:
      "Hoy no basta con estar en internet. Las empresas necesitan una identidad clara, una experiencia digital moderna y una comunicacion que genere confianza.",
  },
  value: {
    title: "Diseno con vision estrategica y construccion digital.",
    text:
      "Mi trabajo no se limita a crear piezas visuales. Ayudo a construir marcas y soluciones digitales que conectan mejor con el mercado, mejoran la presencia online y aportan claridad al negocio.",
  },
  services: {
    title: "Servicios",
    items: [
      {
        title: "Branding estrategico",
        text: "Definicion de posicionamiento, narrativa y direccion visual para marcas mas solidas.",
      },
      {
        title: "Sitios web y landing pages",
        text: "Experiencias web modernas, rapidas y orientadas a conversion.",
      },
      {
        title: "Soluciones digitales",
        text: "Herramientas y flujos digitales utiles para mejorar procesos y servicio.",
      },
      {
        title: "Diseno publicitario y corporativo",
        text: "Piezas para comunicacion comercial y material institucional coherente.",
      },
    ],
  },
  projects: {
    title: "Proyectos destacados",
    text:
      "Una seleccion de trabajos donde estrategia, diseno y desarrollo se integran para construir resultados mas solidos.",
    items: [
      {
        name: "Replanteamiento de identidad para firma profesional",
        category: "Branding estrategico",
      },
      {
        name: "Landing comercial para captacion B2B",
        category: "Web y conversion",
      },
      {
        name: "Sistema visual y comunicacion para empresa industrial",
        category: "Identidad corporativa",
      },
    ],
  },
  process: {
    title: "Proceso de trabajo",
    steps: [
      { title: "Diagnostico", text: "Analisis de contexto, mercado y estado actual de marca." },
      { title: "Estrategia", text: "Definicion de direccion, objetivos y enfoque de comunicacion." },
      { title: "Diseno y desarrollo", text: "Construccion visual y digital con criterio de negocio." },
      { title: "Implementacion", text: "Puesta en marcha con entregables listos para operar." },
    ],
  },
  digital: {
    title: "Mas que diseno: soluciones digitales utiles",
    text:
      "Ademas de trabajar en branding, desarrollo sitios y herramientas digitales que ayudan a las empresas a mejorar procesos, presentar mejor su oferta y facilitar la interaccion con sus clientes.",
    items: [
      "Cotizadores web para servicios",
      "Landing pages de captacion",
      "Sistemas de formularios y seguimiento",
      "Micro herramientas para procesos internos",
    ],
  },
  quote: {
    title: "Quieres una estimacion para tu proyecto?",
    text:
      "Usa el cotizador para tener una referencia inicial de inversion segun el tipo de empresa, alcance del proyecto y tiempos de entrega.",
    cta: { label: "Calcular inversion del proyecto", href: "/cotizador" },
  },
  about: {
    title: "Jhon Fragozo",
    subtitle: "Diseno de marca y soluciones digitales",
    text:
      "Trabajo en la interseccion entre branding, desarrollo web y herramientas digitales. Mi enfoque combina estrategia, diseno y construccion funcional para ayudar a empresas a proyectar una presencia mas profesional, moderna y competitiva.",
  },
  finalCta: {
    title: "Construyamos una solucion mas solida para tu marca",
    text:
      "Si tu empresa necesita mejorar su identidad, su sitio web o desarrollar una herramienta digital util, podemos trabajar en una solucion estrategica y bien construida.",
    actions: {
      primary: { label: "Solicitar cotizacion", href: "/contacto" },
      whatsapp: { label: "Hablar por WhatsApp", href: "https://wa.me/573043195028" },
    },
  },
} as const;
