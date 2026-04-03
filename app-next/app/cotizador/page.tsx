import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Cotizador",
  description: "Calcula en minutos la inversión de tu proyecto de branding, identidad visual o diseño web.",
  alternates: { canonical: "/cotizador" },
  openGraph: { url: "/cotizador", title: "Cotizador | Jhon Fragozo" },
};
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
            title="Cuéntanos qué necesitas y recibe una estimación para tu proyecto"
            description="Desde piezas para redes hasta identidad de marca o desarrollo web. Te ayudamos a estimar tu proyecto de forma clara y sin compromiso."
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
