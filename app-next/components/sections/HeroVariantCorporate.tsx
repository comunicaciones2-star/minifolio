import { homeContent } from "@/lib/content/homeContent";
import { Badge } from "@/components/ui/Badge";
import { PrimaryLink, SecondaryLink } from "@/components/ui/Buttons";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/sections/Reveal";

export function HeroVariantCorporate() {
  const { hero } = homeContent;

  return (
    <Section className="relative overflow-hidden border-b border-slate-200 bg-white pb-16 pt-20 md:pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-brand-accent/50 via-brand-accent/20 to-transparent" />
        <div className="absolute right-10 top-14 h-40 w-40 rounded-full bg-brand-accent/10 blur-3xl" />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal className="space-y-6 lg:col-span-8">
          <Badge>{hero.badge}</Badge>
          <h1 className="text-h1 font-heading font-bold tracking-tight text-brand-primary">{hero.headline}</h1>
          <p className="max-w-3xl text-body-lg text-brand-neutral">{hero.subheadline}</p>
          <div className="flex flex-wrap gap-3">
            <PrimaryLink href={hero.ctas.primary.href}>{hero.ctas.primary.label}</PrimaryLink>
            <SecondaryLink href={hero.ctas.secondary.href}>{hero.ctas.secondary.label}</SecondaryLink>
          </div>
        </Reveal>

        <Reveal className="grid gap-3 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1" delay={0.08}>
          {hero.stats.map((stat) => (
            <article key={stat.label} className="rounded-md border border-slate-200 bg-brand-white p-4 shadow-soft">
              <p className="text-small font-semibold uppercase tracking-wide text-brand-accent">{stat.label}</p>
              <p className="mt-2 text-h3 font-heading font-semibold text-brand-primary">{stat.value}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
