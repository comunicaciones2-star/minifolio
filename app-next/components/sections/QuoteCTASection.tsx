import { homeContent } from "@/lib/content/homeContent";
import { PrimaryLink } from "@/components/ui/Buttons";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/sections/Reveal";

export function QuoteCTASection() {
  return (
    <Section className="bg-brand-primary" id="cotizador-cta">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-small font-semibold uppercase tracking-wide text-[#D0F759]">Cotizador</p>
        <h2 className="mt-4 text-h2 font-heading font-bold text-brand-white">{homeContent.quote.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-body text-slate-200">{homeContent.quote.text}</p>
        <div className="mt-7 flex justify-center">
          <PrimaryLink href={homeContent.quote.cta.href} className="bg-brand-white text-brand-primary hover:bg-slate-100">
            {homeContent.quote.cta.label}
          </PrimaryLink>
        </div>
      </Reveal>
    </Section>
  );
}
