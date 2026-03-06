import { Suspense } from "react";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { EmbedModeFlag } from "@/components/layout/EmbedModeFlag";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function CotizadorPage() {
  return (
    <>
      <EmbedModeFlag />
      <main id="cotizador-app">
        <Section className="pb-20 pt-16 md:pt-20">
          <SectionTitle
            subtitle="Cotizador"
            title="Cotiza tu proyecto de diseno y branding"
            description="Completa estos pasos para obtener una estimacion aproximada en pesos colombianos segun el tipo de organizacion, sector, alcance y tiempos de entrega."
          />
          <div className="mt-10">
            <Suspense fallback={<p className="text-body text-brand-neutral">Cargando cotizador...</p>}>
              <QuoteWizard />
            </Suspense>
          </div>
        </Section>
      </main>
    </>
  );
}
