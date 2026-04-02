export type ServiceItem = {
  title: string;
  description: string;
};

export type ServicesContent = {
  badge: string;
  title: string;
  description: string;
  sectionTitle: string;
  sectionDescription: string;
  items: ServiceItem[];
};

export const servicesContent: ServicesContent = {
  badge: "Servicios",
  title: "Sistema de servicios para crecimiento de marca",
  description:
    "Cada servicio está estructurado para aportar claridad estratégica, coherencia visual y mejor desempeño comercial.",
  sectionTitle: "Bloques de trabajo adaptados a tu negocio",
  sectionDescription:
    "Selecciona la combinación de servicios según etapa de marca, necesidades de comunicación y objetivos de ventas.",
  items: [
    {
      title: "Branding estratégico",
      description:
        "Definimos la posición de tu marca para que conecte con clientes correctos y respalde objetivos comerciales.",
    },
    {
      title: "Identidad visual",
      description:
        "Construimos un sistema visual consistente y reconocible para todos tus puntos de contacto.",
    },
    {
      title: "Diseño publicitario",
      description:
        "Creamos piezas orientadas a campañas con foco en claridad del mensaje y conversión.",
    },
    {
      title: "Diseño corporativo e impresión",
      description:
        "Estandarizamos materiales corporativos para fortalecer presencia y confianza de marca.",
    },
  ],
};
