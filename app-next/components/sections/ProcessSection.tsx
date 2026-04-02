import { homeContent } from "@/lib/content/homeContent";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/sections/Reveal";

export function ProcessSection() {
  return (
    <Section className="bg-slate-50 dark:bg-slate-900" id="proceso">
      <Reveal>
        <SectionTitle subtitle="Proceso" title={homeContent.process.title} align="center" className="mx-auto" />
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {homeContent.process.steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.06}>
            <article className="rounded-md border border-slate-200 bg-brand-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-800">
              <p className="text-small font-semibold text-brand-accent">0{index + 1}</p>
              <h3 className="mt-3 text-h3 font-heading font-semibold text-brand-primary">{step.title}</h3>
              <p className="mt-2 text-body text-brand-neutral">{step.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
