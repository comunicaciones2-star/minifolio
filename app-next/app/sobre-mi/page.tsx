import type { Metadata } from "next";
import Image from "next/image";
import { assetPath } from "@/lib/utils/assetPath";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/lib/content/aboutContent";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Soy Jhon Fragozo, Brand Designer. Acompaño a empresas y emprendedores con identidad clara, coherente y lista para escalar.",
  alternates: { canonical: "/sobre-mi" },
  openGraph: {
    url: "/sobre-mi",
    title: "Sobre mí | Jhon Fragozo",
    images: [{ url: "/images/og/og-default.jpg", width: 1200, height: 630 }],
  },
};

export default function SobreMiPage() {
  return (
    <main>
      <Section className="pt-20 md:pt-24">
        <Card className="rounded-xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">

            {/* Foto de perfil */}
            <div className="shrink-0 mx-auto md:mx-0">
              <div className="relative h-56 w-56 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 md:h-64 md:w-64">
                <Image
                  src={assetPath("/images/profile/jhon-fragozo.jpg")}
                  alt="Jhon Fragozo — Brand Designer"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 224px, 256px"
                />
              </div>
            </div>

            {/* Texto */}
            <div className="space-y-5">
              <Badge>{aboutContent.badge}</Badge>
              <h1 className="text-h2 font-heading font-bold text-brand-primary">{aboutContent.title}</h1>
              <p className="max-w-2xl text-body text-brand-neutral">
                {aboutContent.description}
              </p>
            </div>

          </div>
        </Card>
      </Section>
    </main>
  );
}
