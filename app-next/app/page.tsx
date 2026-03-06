import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PrimaryLink, SecondaryLink } from "@/components/ui/Buttons";

export default function HomePage() {
  return (
    <main>
      <Section className="pb-16 pt-20 md:pt-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="space-y-6 lg:col-span-7">
            <Badge>Brand Designer en Colombia</Badge>
            <h1 className="text-h1 font-heading font-bold text-brand-primary">
              Diseno estrategico de marca para empresas que quieren diferenciarse
            </h1>
            <p className="max-w-2xl text-body-lg text-brand-neutral">
              Construyo identidades visuales solidas para organizaciones que necesitan comunicar mejor su valor y aumentar su posicionamiento.
            </p>
            <div className="flex flex-wrap gap-3">
              <PrimaryLink href="/cotizador">Cotizar proyecto</PrimaryLink>
              <SecondaryLink href="/portafolio">Ver portafolio</SecondaryLink>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
            {[
              "Estrategia de marca",
              "Identidad visual",
              "Diseno publicitario",
              "Material corporativo",
            ].map((item) => (
              <Card key={item} hoverable className="p-5">
                <h2 className="text-small font-semibold text-brand-primary">{item}</h2>
                <p className="mt-2 text-small text-brand-neutral">Soluciones orientadas a resultados comerciales y posicionamiento.</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionTitle
          subtitle="Servicios"
          title="Sistema de servicios orientado a negocio"
          description="Cada bloque de servicio se define con alcance claro, valor tangible y entregables pensados para empresas en crecimiento."
          align="center"
        />
      </Section>
    </main>
  );
}
