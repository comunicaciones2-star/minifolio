import { homeContent } from "@/lib/content/homeContent";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/sections/Reveal";

export function DigitalSolutionsSection() {
  return (
    <Section id="soluciones-digitales">
      <Reveal>
        <SectionTitle
          subtitle="Soluciones digitales"
          title={homeContent.digital.title}
          description={homeContent.digital.text}
        />
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {homeContent.digital.items.map((item, index) => (
          <Reveal key={item} delay={index * 0.06}>
            <Card className="h-full p-5">
              <p className="text-body font-medium text-brand-primary">{item}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
