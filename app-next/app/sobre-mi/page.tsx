import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/lib/content/aboutContent";

export default function SobreMiPage() {
  return (
    <main>
      <Section className="pt-20 md:pt-24">
        <Card className="rounded-xl">
          <div className="space-y-5">
            <Badge>{aboutContent.badge}</Badge>
            <h1 className="text-h2 font-heading font-bold text-brand-primary">{aboutContent.title}</h1>
            <p className="max-w-3xl text-body text-brand-neutral">
              {aboutContent.description}
            </p>
          </div>
        </Card>
      </Section>
    </main>
  );
}
