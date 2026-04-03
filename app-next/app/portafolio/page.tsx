import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Portafolio",
  description: "Proyectos de branding e identidad visual desarrollados para empresas en Colombia y Latinoamérica.",
  alternates: { canonical: "/portafolio" },
  openGraph: { url: "/portafolio", title: "Portafolio | Jhon Fragozo" },
};
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { portfolioContent } from "@/lib/content/portfolioContent";

const projects = portfolioContent.projects ?? [];

export default function PortafolioPage() {
  return (
    <main>
      <Section className="pb-16 pt-20 md:pt-24">
        <div className="space-y-5">
          <Badge>{portfolioContent.badge}</Badge>
          <h1 className="text-h1 font-heading font-bold text-brand-primary">{portfolioContent.title}</h1>
          <p className="max-w-3xl text-body-lg text-brand-neutral">
            {portfolioContent.description}
          </p>
        </div>
      </Section>

      <Section className="bg-slate-50 pt-0 dark:bg-slate-900">
        <SectionTitle
          title={portfolioContent.sectionTitle}
          description={portfolioContent.sectionDescription}
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
