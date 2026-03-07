import { homeContent } from "@/lib/content/homeContent";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/sections/Reveal";

export function AboutCredentialsSection() {
  return (
    <Section id="sobre-mi-home">
      <Reveal>
        <Card className="border-brand-accent/20 bg-gradient-to-br from-white to-blue-50">
          <p className="text-small font-semibold uppercase tracking-wide text-brand-accent">Sobre mi</p>
          <h2 className="mt-3 text-h2 font-heading font-bold text-brand-primary">{homeContent.about.title}</h2>
          <p className="mt-1 text-body-lg text-brand-neutral">{homeContent.about.subtitle}</p>
          <p className="mt-5 max-w-4xl text-body text-brand-neutral">{homeContent.about.text}</p>
        </Card>
      </Reveal>
    </Section>
  );
}
