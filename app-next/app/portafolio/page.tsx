import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

const projects = [
  {
    name: "Rediseño de marca para firma legal",
    summary: "Reestructuracion visual y verbal para transmitir solidez, claridad y especializacion.",
  },
  {
    name: "Campana digital para retail",
    summary: "Sistema de piezas para pauta y conversion con enfoque en diferenciacion competitiva.",
  },
  {
    name: "Sistema visual para startup tech",
    summary: "Arquitectura de marca escalable para producto digital, comunicacion y crecimiento.",
  },
  {
    name: "Identidad y material corporativo para pyme",
    summary: "Desarrollo integral de identidad con lineamientos de implementacion en entornos reales.",
  },
];

export default function PortafolioPage() {
  return (
    <main>
      <Section className="pb-16 pt-20 md:pt-24">
        <div className="space-y-5">
          <Badge>Portafolio</Badge>
          <h1 className="text-h1 font-heading font-bold text-brand-primary">Casos de marca con enfoque estrategico</h1>
          <p className="max-w-3xl text-body-lg text-brand-neutral">
            Proyectos desarrollados para mejorar posicionamiento, consistencia visual y percepcion de valor en el mercado.
          </p>
        </div>
      </Section>

      <Section className="bg-slate-50 pt-0">
        <SectionTitle
          title="Proyectos representativos"
          description="Cada caso combina diagnostico estrategico, direccion visual y criterios de implementacion orientados a resultados."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.name} hoverable className="p-5 md:p-6">
              <h2 className="text-body-lg font-semibold text-brand-primary">{project.name}</h2>
              <p className="mt-2 text-body text-brand-neutral">{project.summary}</p>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
