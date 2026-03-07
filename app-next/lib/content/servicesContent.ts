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
    "Cada servicio esta estructurado para aportar claridad estrategica, coherencia visual y mejor desempeno comercial.",
  sectionTitle: "Bloques de trabajo adaptados a tu negocio",
  sectionDescription:
    "Selecciona la combinacion de servicios segun etapa de marca, necesidades de comunicacion y objetivos de ventas.",
  items: [
    {
      title: "Branding estrategico",
      description:
        "Definimos la posicion de tu marca para que conecte con clientes correctos y respalde objetivos comerciales.",
    },
    {
      title: "Identidad visual",
      description:
        "Construimos un sistema visual consistente y reconocible para todos tus puntos de contacto.",
    },
    {
      title: "Diseno publicitario",
      description:
        "Creamos piezas orientadas a campanas con foco en claridad del mensaje y conversion.",
    },
    {
      title: "Diseno corporativo e impresion",
      description:
        "Estandarizamos materiales corporativos para fortalecer presencia y confianza de marca.",
    },
  ],
};
