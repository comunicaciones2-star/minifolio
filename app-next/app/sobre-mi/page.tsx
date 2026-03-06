import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export default function SobreMiPage() {
  return (
    <main>
      <Section className="pt-20 md:pt-24">
        <Card className="rounded-xl">
          <div className="space-y-5">
            <Badge>Sobre mi</Badge>
            <h1 className="text-h2 font-heading font-bold text-brand-primary">Diseno de marca con criterio estrategico y enfoque comercial</h1>
            <p className="max-w-3xl text-body text-brand-neutral">
              Soy Jhon Fragozo, Brand Designer. Acompano a empresas y emprendedores que necesitan una identidad clara, coherente y lista para escalar.
              Mi enfoque combina estrategia comercial, diseno visual y ejecucion orientada a conversion.
            </p>
          </div>
        </Card>
      </Section>
    </main>
  );
}
