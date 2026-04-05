import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/utils/assetPath";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SecondaryLink } from "@/components/ui/Buttons";
import { portfolioContent } from "@/lib/content/portfolioContent";
import { brand } from "@/lib/constants/brand";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return portfolioContent.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioContent.projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/portafolio/${slug}` },
    openGraph: { url: `/portafolio/${slug}`, title: `${project.name} | ${brand.name}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolioContent.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main>
      <div className="dark:bg-[#0B1220]">
        <Container>

          {/* ── Encabezado ─────────────────────────────────────────────── */}
          <div className="pt-20 pb-8 md:pt-24">
            <Link
              href="/portafolio"
              className="mb-6 inline-flex items-center gap-1.5 text-small text-brand-neutral hover:text-[var(--secondary)] transition-colors"
            >
              ← Volver al portafolio
            </Link>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{project.sector}</Badge>
                <span className="text-small text-slate-500">{project.year}</span>
              </div>
              <h1 className="text-h1 font-heading font-bold text-brand-primary">{project.name}</h1>
              <p className="max-w-2xl text-body-lg text-brand-neutral">{project.summary}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 px-2.5 py-0.5 text-caption text-brand-neutral dark:border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Hero banner ────────────────────────────────────────────── */}
          <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 md:h-80 lg:h-96">
            <Image
              src={assetPath(project.heroBanner)}
              alt={project.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>

          {/* ── Contenido ──────────────────────────────────────────────── */}
          <div className="grid gap-6 py-10 lg:grid-cols-3 pb-20">

            {/* Columna principal */}
            <div className="space-y-6 lg:col-span-2">
              <Card className="p-6 md:p-8">
                <h2 className="text-h3 font-heading font-semibold text-brand-primary">El desafío</h2>
                <p className="mt-4 text-body leading-relaxed text-brand-neutral">{project.challenge}</p>
              </Card>

              <Card className="p-6 md:p-8">
                <h2 className="text-h3 font-heading font-semibold text-brand-primary">La solución</h2>
                <p className="mt-4 text-body leading-relaxed text-brand-neutral">{project.solution}</p>
              </Card>

              {project.solutionImage && (
                <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 md:h-80">
                  <Image
                    src={assetPath(project.solutionImage)}
                    alt={`${project.name} — detalle de la solución`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                </div>
              )}

              <Card className="p-6 md:p-8">
                <h2 className="text-h3 font-heading font-semibold text-brand-primary">Resultados</h2>
                <ul className="mt-4 space-y-3">
                  {project.results.map((result) => (
                    <li key={result} className="flex items-start gap-3 text-body text-brand-neutral">
                      <span className="mt-1 shrink-0 text-[var(--secondary)]" aria-hidden>✔</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <Card className="p-5">
                <h3 className="text-small font-semibold uppercase tracking-wider text-slate-500">
                  Entregables
                </h3>
                <ul className="mt-4 space-y-2">
                  {project.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-small text-brand-neutral">
                      <span className="mt-0.5 shrink-0 text-[var(--secondary)]" aria-hidden>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-5">
                <h3 className="text-small font-semibold uppercase tracking-wider text-slate-500">
                  ¿Tienes un proyecto similar?
                </h3>
                <p className="mt-3 text-small text-brand-neutral">
                  Cuéntame tu objetivo y te propongo una ruta de diseño clara, con alcance definido.
                </p>
                <SecondaryLink href="/cotizador" className="mt-4 block text-center px-4 py-2">
                  Calcular inversión
                </SecondaryLink>
              </Card>
            </aside>

          </div>
        </Container>
      </div>
    </main>
  );
}
