export type PortfolioTag =
  | "Branding"
  | "Naming"
  | "Identidad visual"
  | "Campaña"
  | "Web"
  | "Estrategia"
  | "Impreso"
  | "Packaging"
  | "Moda"
  | "Manual de marca"
  | "Marketing digital"
  | "Redes sociales"
  | "Educación"
  | "Salud mental";

export type PortfolioProject = {
  slug: string;
  name: string;
  summary: string;
  sector: string;
  year: string;
  tags: PortfolioTag[];
  challenge: string;
  solution: string;
  results: string[];
  deliverables: string[];
  /** Imagen de tarjeta en el listado — 800×500 px */
  thumbnail: string;
  /** Imagen hero en el case study — 1200×675 px */
  heroBanner: string;
  /** Imagen secundaria debajo de "La solución" — 800×500 px (opcional) */
  solutionImage?: string;
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
      slug: "felix-jose-bass-guitar",
      name: "Marca personal para músico profesional",
      summary:
        "Sistema de identidad construido sobre la figura del instrumento como símbolo de autoridad artística, con aplicaciones en tarjeta de presentación digital y papelería.",
      sector: "Música / Entretenimiento",
      year: "2022",
      tags: ["Branding", "Identidad visual", "Impreso"],
      challenge:
        "Félix José Fragozo es bajista y guitarrista profesional con participaciones en producciones de RCN, Caracol y proyectos con artistas reconocidos. Necesitaba una identidad que comunicara su autoridad artística y le permitiera posicionarse como empresario musical, sin un portafolio visual que lo respaldara.",
      solution:
        "Diseñé un sistema de marca donde la silueta completa de la guitarra funciona como contenedor del logotipo. Las iniciales FJ se integran en el cuerpo del instrumento generando una doble lectura. Se desarrollaron versiones en positivo y negativo, y una tarjeta de presentación digital con QR para redes y contacto.",
      results: [
        "Identidad que comunica autoridad artística desde el primer contacto",
        "Tarjeta de presentación digital con QR integrado a redes sociales",
        "Sistema aplicado en versión full color y monocromática",
      ],
      deliverables: [
        "Logotipo principal y variante con silueta de guitarra",
        "Versiones cromáticas (color, blanco y negro)",
        "Tarjeta de presentación digital con QR",
        "Archivos en AI y PNG para uso digital e impreso",
      ],
      thumbnail: "/images/portfolio/felix-jose-thumb.jpg",
      heroBanner: "/images/portfolio/felix-jose-hero.jpg",
      solutionImage: "/images/portfolio/felix-jose-solution.jpg",
    },
    {
      slug: "optica-gold-vision",
      name: "Identidad y material comercial para óptica",
      summary:
        "Desarrollo de marca con logotipo de acabado premium aplicado a volantes de salud visual, recibo de caja y piezas de comunicación interna — sistema coherente para punto de venta y captación de pacientes.",
      sector: "Salud / Retail óptico",
      year: "2022",
      tags: ["Branding", "Identidad visual", "Impreso", "Campaña"],
      challenge:
        "Óptica Gold Vision era un negocio en etapa inicial sin identidad visual ni materiales operativos. Necesitaban una marca que transmitiera confianza y premium en el sector salud visual, y un set de piezas funcionales para operar desde el primer día.",
      solution:
        "Diseñé el logotipo donde el ojo estilizado integra la letra G como pupila — doble lectura visual que vincula directamente el símbolo con el nombre. El acabado dorado en degradado comunica el posicionamiento premium. El sistema se extendió a volantes de campaña, recibo de caja operativo y piezas de comunicación interna.",
      results: [
        "Sistema de marca coherente aplicado en punto de venta desde el lanzamiento",
        "Volante de campaña de salud visual para captación activa de pacientes",
        "Recibo de caja funcional con identidad de marca integrada",
      ],
      deliverables: [
        "Logotipo en versión color (fondo oscuro y claro)",
        "Volante de campaña salud visual (9×13 cm)",
        "Volante-recibo de caja operativo",
        "Pieza de comunicación interna",
        "Tarjeta de presentación",
      ],
      thumbnail: "/images/portfolio/gold-vision-thumb.jpg",
      heroBanner: "/images/portfolio/gold-vision-hero.jpg",
      solutionImage: "/images/portfolio/gold-vision-solution.jpg",
    },
    {
      slug: "igloos-ice-granizados",
      name: "Naming e identidad para marca de granizados",
      summary:
        "Creación del nombre, logotipo y sistema visual para emprendimiento de granizados — personalidad juvenil y colorida aplicada a packaging en vaso con variantes de presentación para punto de venta.",
      sector: "Alimentos / Bebidas",
      year: "2022",
      tags: ["Branding", "Naming", "Identidad visual", "Packaging"],
      challenge:
        "El emprendimiento no tenía nombre ni identidad. Necesitaban diferenciarse en el mercado de granizados con una marca memorable que comunicara frescura, alegría y variedad, y que funcionara visualmente en el packaging del producto — el único punto de contacto con el cliente.",
      solution:
        "Desarrollé el nombre IGLOOS ICE, que evoca frío y un universo lúdico. El logotipo utiliza tipografía cursiva con gotas de agua integradas, sobre un arcoíris de colores que comunica la variedad de sabores. El símbolo funciona como sticker en vasos de 8, 16 y 24 oz.",
      results: [
        "Nombre y sistema visual creados desde cero para lanzamiento",
        "Logotipo adaptado a 3 tamaños de presentación del producto",
        "Identidad con alta recordación visual en punto de venta",
      ],
      deliverables: [
        "Naming de la marca",
        "Logotipo principal con símbolo y versiones",
        "Aplicación en packaging (vasos 8, 16 y 24 oz)",
        "Mockups de producto para comunicación digital",
        "Archivos en AI y PNG para impresión",
      ],
      thumbnail: "/images/portfolio/igloos-ice-thumb.jpg",
      heroBanner: "/images/portfolio/igloos-ice-hero.jpg",
      solutionImage: "/images/portfolio/igloos-ice-solution.jpg",
    },
    {
      slug: "onix-black",
      name: "Naming e identidad para marca de ropa urbana",
      summary:
        "Creación del nombre y sistema de marca para línea de ropa con estética urbana minimalista — logotipo tipográfico con etiqueta integrada como símbolo, aplicado a prendas en versión positivo y negativo para colecciones unisex.",
      sector: "Moda / Retail",
      year: "2023",
      tags: ["Branding", "Naming", "Identidad visual", "Moda"],
      challenge:
        "El emprendimiento de ropa necesitaba un nombre y una identidad que le permitieran competir en el segmento urbano con propuesta visual coherente. La marca debía funcionar directamente sobre la prenda como único punto de contacto con el consumidor.",
      solution:
        "Creé el nombre ONIX BLACK. El logotipo tipográfico fragmenta y recorta las letras generando estética urbana de alta identidad. El elemento diferenciador: la etiqueta de precio se integra como ícono de la marca — autorreferencial y coherente con el universo del retail de moda. El sistema funciona en positivo sobre blanco y negativo sobre negro.",
      results: [
        "Nombre e identidad creados desde cero para lanzamiento de colección",
        "Sistema visual que funciona en tres aplicaciones distintas de prenda",
        "Logotipo con actitud urbana y alta legibilidad en pequeño formato",
      ],
      deliverables: [
        "Naming de la marca",
        "Logotipo tipográfico con ícono de etiqueta integrada",
        "Versiones positivo y negativo",
        "Aplicación en mockups de camiseta (blanca y negra)",
        "Archivos en AI, SVG y PNG",
      ],
      thumbnail: "/images/portfolio/onix-black-thumb.jpg",
      heroBanner: "/images/portfolio/onix-black-hero.jpg",
      solutionImage: "/images/portfolio/onix-black-solution.jpg",
    },
    {
      slug: "remti-remote-iot",
      name: "Sistema de marca para empresa de tecnología IoT",
      summary:
        "Desarrollo completo de identidad corporativa para startup de tecnología — desde construcción geométrica del símbolo hasta manual de marca con paleta, tipografía y aplicaciones en vehículo corporativo, carné y medios digitales.",
      sector: "Tecnología / IoT",
      year: "2021",
      tags: ["Branding", "Identidad visual", "Estrategia", "Web"],
      challenge:
        "REMTI — Remote IoT Technology — era una startup sin identidad que buscaba posicionarse como referente en monitoreo remoto y recolección de datos industriales. Necesitaban una marca que comunicara innovación, confiabilidad y escalabilidad para atraer clientes corporativos.",
      solution:
        "Diseñé un símbolo que fusiona la letra R con ondas de señal WiFi: la R se convierte en antena transmisora comunicando control remoto y conectividad. La construcción geométrica documenta cada proporción. El sistema incluye paleta de 5 colores, tipografía Azonix y Montserrat, versiones cromáticas y aplicaciones en vehículo, carné y portada digital.",
      results: [
        "Sistema de marca documentado en manual completo con 7 módulos",
        "Concepto visual: monitoreo + señal + confiabilidad + R en un solo símbolo",
        "Aplicaciones en vehículo corporativo, carné, portada digital y material promocional",
        "Paleta de 5 colores con valores PANTONE, CMYK, RGB y HEX",
      ],
      deliverables: [
        "Logotipo principal y versiones horizontal / vertical",
        "Construcción geométrica del símbolo",
        "Paleta de colores oficial (5 tonos con valores técnicos)",
        "Sistema tipográfico (Azonix + Montserrat)",
        "Aplicación en vehículo corporativo y carné",
        "Manual de marca — 7 módulos",
      ],
      thumbnail: "/images/portfolio/remti-thumb.jpg",
      heroBanner: "/images/portfolio/remti-hero.jpg",
      solutionImage: "/images/portfolio/remti-solution.jpg",
    },
    {
      slug: "talu-cuidado-capilar",
      name: "Marca e identidad digital para distribuidora capilar",
      summary:
        "Desarrollo de identidad premium con símbolo dorado inspirado en el movimiento del cabello, aplicado a estrategia de contenidos para Instagram — carruseles educativos, piezas de producto y comunicación de marca para emprendimiento capilar.",
      sector: "Belleza / Cuidado capilar",
      year: "2022",
      tags: ["Branding", "Identidad visual", "Campaña", "Redes sociales"],
      challenge:
        "TALU era un emprendimiento de cuidado capilar sin identidad ni presencia digital. La propietaria contaba con experiencia y conocimiento de productos profesionales, pero no tenía marca ni sistema de comunicación que le permitiera diferenciarse y conectar con sus clientes en redes sociales.",
      solution:
        "Diseñé el logotipo donde la T integra dos mechones de cabello en movimiento — la letra se convierte en figura capilar generando doble lectura natural. El acabado dorado refuerza el posicionamiento premium. El sistema se extendió a estrategia de contenidos con carrusel de lanzamiento de 10 láminas, piezas de producto y comunicaciones de campaña.",
      results: [
        "Identidad premium con símbolo de doble lectura: T tipográfica y mechones de cabello",
        "Carrusel de lanzamiento de 10 láminas para Instagram",
        "Sistema de piezas para producto Maxybelt con identidad integrada",
      ],
      deliverables: [
        "Logotipo con versión dorada (3D) y plana monocromática",
        "Carrusel de lanzamiento Instagram (10 láminas)",
        "Piezas de producto (Shampoo y Tratamiento Botox)",
        "Tarjeta As de corazones — campaña aspiracional",
      ],
      thumbnail: "/images/portfolio/talu-thumb.jpg",
      heroBanner: "/images/portfolio/talu-hero.jpg",
      solutionImage: "/images/portfolio/talu-solution.jpg",
    },
    {
      slug: "roza-agency",
      name: "Manual de identidad corporativa para agencia de marketing digital",
      summary:
        "Desarrollo completo de sistema de marca para agencia de influencer marketing — logotipo con tipografía geométrica personalizada, manual de identidad avanzado, papelería corporativa y más de 15 aplicaciones en piezas promocionales.",
      sector: "Marketing / Entretenimiento digital",
      year: "2022",
      tags: ["Branding", "Identidad visual", "Manual de marca", "Marketing digital"],
      challenge:
        "ROZA Agency conecta artistas y marcas con audiencias digitales. Necesitaban una identidad que comunicara alegría, lujo e innovación para atraer clientes del espectro artístico y corporativo, con un manual que garantizara consistencia al escalar.",
      solution:
        "Diseñé el logotipo con tipografía geométrica personalizada. El verde neón (#CCFF33) sobre negro genera paleta de altísima recordación visual. El manual de 26 páginas documenta construcción, reducción mínima, zona de protección, tipografía, versiones cromáticas y más de 15 aplicaciones en papelería, merch y piezas exteriores.",
      results: [
        "Manual de identidad avanzado — 26 páginas con 6 módulos",
        "8 versiones cromáticas del logotipo documentadas",
        "Sistema de papelería completo: hoja membrete, sobre, tarjeta y carpeta",
        "15+ aplicaciones en piezas promocionales",
      ],
      deliverables: [
        "Logotipo principal y 8 versiones cromáticas",
        "Manual de identidad corporativa (26 páginas)",
        "Papelería corporativa completa",
        "Kit de merch (mug, termo, lapicero, agenda, lanyard, carné)",
        "Aplicaciones exteriores (billboard, citylight)",
        "Carrusel de lanzamiento digital",
      ],
      thumbnail: "/images/portfolio/roza-agency-thumb.jpg",
      heroBanner: "/images/portfolio/roza-agency-hero.jpg",
      solutionImage: "/images/portfolio/roza-agency-solution.jpg",
    },
    {
      slug: "cipe-international",
      name: "Campaña de comunicación y certificados para centro forense",
      summary:
        "Sistema de piezas promocionales para redes sociales e impreso de centro de formación en poligrafía — volantes de cursos internacionales, posts de convocatoria y certificados oficiales bajo norma ISO 17024 con aval ONAC para Colombia y Ecuador.",
      sector: "Educación / Seguridad forense",
      year: "2022",
      tags: ["Campaña", "Redes sociales", "Impreso", "Educación"],
      challenge:
        "CIPE International es un centro de formación en poligrafía forense con alcance binacional. Necesitaban comunicar múltiples cursos simultáneamente con piezas adaptadas a cada modalidad, precio y fecha, manteniendo credibilidad institucional y aval del Ministerio de Educación.",
      solution:
        "Desarrollé un sistema de piezas promocionales coherentes adaptadas por tipo de curso y mercado geográfico. Diseñé los certificados oficiales ISO 17024 con aval ONAC en dos propuestas para el Consejo Colombiano de Certificación ISCB. Todas las piezas incluyen QR de inscripción, resolución del MinEdu y datos de verificación.",
      results: [
        "Sistema de piezas para 6 tipos de curso en 2 países simultáneamente",
        "Certificados ISO 17024 en 2 propuestas de diseño con aval ONAC",
        "Piezas adaptadas por modalidad: presencial, virtual e híbrido",
      ],
      deliverables: [
        "Volantes promocionales por tipo de curso (6 variantes)",
        "Posts para redes sociales por convocatoria",
        "Certificado horizontal — propuesta institucional ISCB",
        "Certificado vertical — propuesta premium con sello dorado",
        "Adaptaciones para mercado Ecuador",
      ],
      thumbnail: "/images/portfolio/cipe-thumb.jpg",
      heroBanner: "/images/portfolio/cipe-hero.jpg",
    },
    {
      slug: "odontologia-marlon-becerra",
      name: "Estrategia digital 360° para clínica odontológica",
      summary:
        "Estrategia completa de comunicación para clínica odontológica referente en Bucaramanga — campaña 'Una lo cambia todo' en 4 plataformas simultáneas, hablador multicanal con QR individual por red social, y sistema de piezas que conectó el punto de venta físico con los canales digitales.",
      sector: "Salud / Odontología",
      year: "2021",
      tags: ["Campaña", "Redes sociales", "Impreso", "Estrategia"],
      challenge:
        "La clínica tenía presencia en redes pero sin estrategia ni identidad visual consistente. El contenido era mayormente estático, la frecuencia irregular y no existía conexión entre el punto de venta físico y los canales digitales.",
      solution:
        "Desarrollé la estrategia completa asumiendo los roles de diseñador, fotógrafo, community manager y asesor. Creé la campaña #UnaSonrisaLoCambiaTodo — donde la U de UNA forma una sonrisa — como eje narrativo. Diseñé el hablador 22×28 con QR individual por plataforma para convertir cada visita al consultorio en un seguidor digital.",
      results: [
        "Estrategia de contenido implementada en 4 plataformas simultáneamente",
        "Campaña #UnaSonrisaLoCambiaTodo ejecutada con piezas de video y feed",
        "Material POP con QR multicanal desplegado en el punto de venta",
        "Sistema de identidad visual consistente en todos los formatos",
      ],
      deliverables: [
        "Estrategia de redes sociales y calendario editorial",
        "Campaña #UnaSonrisaLoCambiaTodo (posts, videos, Stories)",
        "Carrusel antes/después — carillas en disilicato",
        "Posts de lanzamiento por canal (IG, FB, TikTok, YouTube)",
        "Hablador 22×28 cm con QR multicanal",
        "Póster vertical 40×80 cm",
        "Póster horizontal 80×60 cm",
        "Community management",
      ],
      thumbnail: "/images/portfolio/omb-thumb.jpg",
      heroBanner: "/images/portfolio/omb-hero.jpg",
    },
    {
      slug: "luz-yenny-mejia-psicoterapeuta",
      name: "Marca personal para psicoterapeuta independiente",
      summary:
        "Identidad para psicóloga especialista en terapia sistémica — símbolo que fusiona figura humana, flor y vínculo relacional, con paleta menta y rosa para transmitir calidez y bienestar emocional en consulta presencial e internacional virtual.",
      sector: "Salud / Bienestar mental",
      year: "2022",
      tags: ["Branding", "Identidad visual", "Salud mental"],
      challenge:
        "Luz Yenny Mejía es psicóloga especialista en terapia sistémica individual y familiar con pacientes en Colombia, USA y México. Necesitaba una identidad personal que generara confianza y cercanía sin caer en la frialdad clínica típica del sector salud.",
      solution:
        "Diseñé un símbolo con tres lecturas: figura humana de brazos abiertos (acogida), flor (crecimiento) y nudo de conexión (vínculo terapéutico). La paleta menta y rosa combina calma y empatía sin frialdad clínica. La tipografía script en el nombre genera cercanía personal sin perder profesionalismo.",
      results: [
        "Identidad que comunica calidez, confianza y profesionalismo simultáneamente",
        "Símbolo con triple lectura visual coherente con el enfoque sistémico",
        "Paleta psicológicamente acertada para el sector salud mental",
        "Marca funcional para consulta presencial y virtual internacional",
      ],
      deliverables: [
        "Logotipo con símbolo (figura + flor + vínculo)",
        "Versión completa nombre + símbolo",
        "Paleta de color menta y rosa con valores técnicos",
        "Archivos en AI, SVG y PNG para uso digital e impreso",
      ],
      thumbnail: "/images/portfolio/luz-yenny-thumb.jpg",
      heroBanner: "/images/portfolio/luz-yenny-hero.jpg",
    },
  ],
};
