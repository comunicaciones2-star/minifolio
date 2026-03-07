import { homeContent } from "@/lib/content/homeContent";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/sections/Reveal";

export function ServicesSection() {
  return (
    <Section className="bg-slate-50" id="servicios">
      <Reveal>
        <SectionTitle subtitle="Servicios" title={homeContent.services.title} align="center" className="mx-auto" />
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {homeContent.services.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05}>
            <Card hoverable className="h-full p-6">
              <h3 className="text-h3 font-heading font-semibold text-brand-primary">{item.title}</h3>
              <p className="mt-3 text-body text-brand-neutral">{item.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
