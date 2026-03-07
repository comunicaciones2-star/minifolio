import { homeContent } from "@/lib/content/homeContent";
import { Badge } from "@/components/ui/Badge";
import { PrimaryLink, SecondaryLink } from "@/components/ui/Buttons";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/sections/Reveal";

export function HeroVariantEditorial() {
  const { hero } = homeContent;

  return (
    <Section className="relative overflow-hidden bg-brand-primary pb-16 pt-20 md:pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(37,99,235,0.35),transparent_40%),radial-gradient(circle_at_90%_15%,rgba(208,247,89,0.16),transparent_35%)]" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-slate-300/30 to-transparent" />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal className="space-y-6 lg:col-span-8">
          <Badge className="border-[#D0F759]/40 bg-[#D0F759]/15 text-[#D0F759]">{hero.badge}</Badge>
          <h1 className="text-h1 font-heading font-bold tracking-tight text-brand-white">
            <span className="text-brand-white">{hero.headline.split("soluciones digitales")[0]}</span>
            <span className="text-transparent [text-shadow:0_0_0_#D0F759]">soluciones digitales</span>
            <span className="text-brand-white">{hero.headline.split("soluciones digitales")[1] ?? ""}</span>
          </h1>
          <p className="max-w-3xl text-body-lg text-slate-200">{hero.subheadline}</p>
          <div className="flex flex-wrap gap-3">
            <PrimaryLink href={hero.ctas.primary.href} className="bg-brand-white text-brand-primary hover:bg-slate-100">
              {hero.ctas.primary.label}
            </PrimaryLink>
            <SecondaryLink href={hero.ctas.secondary.href} className="border-slate-400/60 bg-transparent text-brand-white hover:bg-slate-900/50">
              {hero.ctas.secondary.label}
            </SecondaryLink>
          </div>
        </Reveal>

        <Reveal className="grid gap-3 sm:grid-cols-3 lg:col-span-4" delay={0.08}>
          {hero.stats.map((stat) => (
            <article key={stat.label} className="rounded-md border border-slate-500/40 bg-slate-900/35 p-4 backdrop-blur">
              <p className="text-small font-semibold uppercase tracking-wide text-slate-300">{stat.label}</p>
              <p className="mt-2 text-h3 font-heading font-semibold text-brand-white">{stat.value}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
