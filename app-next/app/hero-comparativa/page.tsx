import { HeroVariantCorporate } from "@/components/sections/HeroVariantCorporate";
import { HeroVariantEditorial } from "@/components/sections/HeroVariantEditorial";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export default function HeroComparativaPage() {
  return (
    <main>
      <Section className="pb-8 pt-16 md:pt-20" narrow>
        <div className="space-y-4 text-center">
          <Badge>Comparativa visual</Badge>
          <h1 className="text-h2 font-heading font-bold text-brand-primary">Variantes de Hero para estudio digital moderno</h1>
          <p className="mx-auto max-w-2xl text-body text-brand-neutral">
            Mismo copy, misma estructura y mismo branding. Cambia solo el lenguaje visual para evaluar que direccion comunica mejor.
          </p>
        </div>
      </Section>

      <div className="space-y-10 pb-20">
        <section aria-label="Variante A">
          <div className="mx-auto mb-4 max-w-content px-6 md:px-10">
            <p className="text-small font-semibold uppercase tracking-wide text-brand-accent">A) Sobria, estrategica y corporativa</p>
          </div>
          <HeroVariantCorporate />
        </section>

        <section aria-label="Variante B">
          <div className="mx-auto mb-4 max-w-content px-6 md:px-10">
            <p className="text-small font-semibold uppercase tracking-wide text-brand-accent">B) Editorial, moderna y de mayor impacto visual</p>
          </div>
          <HeroVariantEditorial />
        </section>
      </div>
    </main>
  );
}
