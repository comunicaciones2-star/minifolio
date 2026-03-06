import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

const services = [
  {
    title: "Branding estrategico",
    description: "Definimos la posicion de tu marca para que conecte con clientes correctos y respalde objetivos comerciales.",
  },
  {
    title: "Identidad visual",
    description: "Construimos un sistema visual consistente y reconocible para todos tus puntos de contacto.",
  },
  {
    title: "Diseno publicitario",
    description: "Creamos piezas orientadas a campanas con foco en claridad del mensaje y conversion.",
  },
  {
    title: "Diseno corporativo e impresion",
    description: "Estandarizamos materiales corporativos para fortalecer presencia y confianza de marca.",
  },
];

export default function ServiciosPage() {
  return (
    <main>
      <Section className="pb-16 pt-20 md:pt-24">
        <div className="space-y-5">
          <Badge>Servicios</Badge>
          <h1 className="text-h1 font-heading font-bold text-brand-primary">Sistema de servicios para crecimiento de marca</h1>
          <p className="max-w-3xl text-body-lg text-brand-neutral">
            Cada servicio esta estructurado para aportar claridad estrategica, coherencia visual y mejor desempeno comercial.
          </p>
        </div>
      </Section>

      <Section className="bg-slate-50 pt-0">
        <SectionTitle
          title="Bloques de trabajo adaptados a tu negocio"
          description="Selecciona la combinacion de servicios segun etapa de marca, necesidades de comunicacion y objetivos de ventas."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title} hoverable className="p-5 md:p-6">
              <h2 className="text-body-lg font-semibold text-brand-primary">{service.title}</h2>
              <p className="mt-2 text-body text-brand-neutral">{service.description}</p>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
