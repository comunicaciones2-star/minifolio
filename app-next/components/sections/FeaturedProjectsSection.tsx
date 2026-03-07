import { homeContent } from "@/lib/content/homeContent";
import { Card } from "@/components/ui/Card";
import { PrimaryLink } from "@/components/ui/Buttons";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/sections/Reveal";

export function FeaturedProjectsSection() {
  return (
    <Section id="proyectos">
      <Reveal>
        <SectionTitle
          subtitle="Proyectos"
          title={homeContent.projects.title}
          description={homeContent.projects.text}
        />
      </Reveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {homeContent.projects.items.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.06}>
            <Card hoverable className="h-full p-6">
              <p className="text-small font-semibold uppercase tracking-wide text-brand-accent">{project.category}</p>
              <h3 className="mt-3 text-h3 font-heading font-semibold text-brand-primary">{project.name}</h3>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8" delay={0.1}>
        <PrimaryLink href="/portafolio">Ver proyectos completos</PrimaryLink>
      </Reveal>
    </Section>
  );
}
