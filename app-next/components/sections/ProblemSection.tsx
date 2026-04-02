import { homeContent } from "@/lib/content/homeContent";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/sections/Reveal";

export function ProblemSection() {
  return (
    <Section className="bg-slate-50 dark:bg-surface-section" id="problema">
      <Reveal>
        <SectionTitle
          subtitle="Problema del mercado"
          title={homeContent.problem.title}
          description={homeContent.problem.text}
          align="center"
          className="mx-auto"
        />
      </Reveal>
    </Section>
  );
}
