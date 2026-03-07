import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { servicesContent } from "@/lib/content/servicesContent";

const services = servicesContent.items ?? [];

export default function ServiciosPage() {
  return (
    <main>
      <Section className="pb-16 pt-20 md:pt-24">
        <div className="space-y-5">
          <Badge>{servicesContent.badge}</Badge>
          <h1 className="text-h1 font-heading font-bold text-brand-primary">{servicesContent.title}</h1>
          <p className="max-w-3xl text-body-lg text-brand-neutral">
            {servicesContent.description}
          </p>
        </div>
      </Section>

      <Section className="bg-slate-50 pt-0">
        <SectionTitle
          title={servicesContent.sectionTitle}
          description={servicesContent.sectionDescription}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title} hoverable className="p-5 md:p-6">
              <h2 className="text-body-lg font-semibold text-brand-primary">{service.title}</h2>
              <p className="mt-2 text-body text-brand-neutral">{service.description}</p>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
