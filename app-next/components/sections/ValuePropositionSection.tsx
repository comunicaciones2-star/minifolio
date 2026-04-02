import { homeContent } from "@/lib/content/homeContent";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/sections/Reveal";

export function ValuePropositionSection() {
  return (
    <Section id="propuesta-valor">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
        <Reveal className="space-y-4 lg:col-span-7">
          <p className="text-small font-semibold uppercase tracking-wide text-brand-accent">Propuesta de valor</p>
          <h2 className="text-h2 font-heading font-bold text-brand-primary">{homeContent.value.title}</h2>
          <p className="max-w-3xl text-body text-brand-neutral">{homeContent.value.text}</p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={0.08}>
          <Card className="relative overflow-hidden border-brand-accent/20 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand-accent/10 blur-2xl dark:bg-brand-accent/20" />
            <p className="relative text-small font-semibold uppercase tracking-wide text-brand-accent">Enfoque</p>
            <p className="relative mt-3 text-h3 font-heading font-semibold text-brand-primary">Estrategia + Diseño + Tecnología</p>
            <p className="relative mt-3 text-body text-brand-neutral">
              Decisiones visuales y técnicas conectadas con objetivos de negocio, no solo estética.
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
