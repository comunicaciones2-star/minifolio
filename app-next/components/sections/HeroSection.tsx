"use client";

import { motion } from "framer-motion";
import { homeContent } from "@/lib/content/homeContent";
import { PrimaryLink, SecondaryLink } from "@/components/ui/Buttons";

// Ease curva premium — misma que usa Vercel/Linear en sus transiciones
const EASE = [0.22, 1, 0.36, 1] as const;

// Animación de entrada para el contenido izquierdo (above the fold → usa animate, no whileInView)
function fadeIn(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.56, delay, ease: EASE },
  };
}

// Wrapper de float continuo (loop) separado del entry animation
function FloatWrap({
  children,
  offset,
  duration,
}: {
  children: React.ReactNode;
  offset: number;
  duration: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -offset, 0] }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const { hero } = homeContent;

  const heading =
    "Diseno de marca y soluciones digitales para empresas que quieren crecer con una presencia mas solida, moderna y estrategica.";
  const subheading =
    "Combino branding, diseno web y herramientas digitales para construir marcas claras, sistemas visuales consistentes y experiencias digitales orientadas a negocio.";

  const proofChips = ["120+ proyectos desarrollados", "14 sectores atendidos"];

  const progressBars = [
    { label: "Branding",  pct: "82%", bar: "bg-blue-500" },
    { label: "Web",       pct: "64%", bar: "bg-[#D0F759]" },
    { label: "Sistemas",  pct: "74%", bar: "bg-white/30" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#020617]" id="hero">

      {/* ── Capa 1: grid texture (producto SaaS signature) ──────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Capa 2: glows — posicionados DETRÁS del contenido (z-0) ─── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        {/* Blob azul principal — foco en zona superior-centro */}
        <div className="absolute -top-48 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
        {/* Blob verde-lima — acento en esquina derecha */}
        <div className="absolute right-0 top-16 h-[380px] w-[380px] rounded-full bg-[#D0F759]/10 blur-[100px]" />
      </div>

      {/* ── Capa 3: viñeta radial central (dirige la mirada al título) ─ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(37,99,235,0.07),transparent)]"
      />

      {/* ── Capa 4: fade-out inferior — transición suave a la siguiente sección ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-28 bg-gradient-to-t from-[#020617] to-transparent"
      />

      {/* ── Contenido ─────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-16 sm:py-24 sm:px-6 lg:py-32 lg:px-8">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-14">

          {/* ── Columna izquierda ─ Contenido ──────────────────────────── */}
          <div className="max-w-xl space-y-6 lg:max-w-none">

            {/* Badge monochrome premium */}
            <motion.div {...fadeIn(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs font-medium tracking-wide text-white/60 backdrop-blur-sm">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Estrategia digital para marcas en crecimiento
              </span>
            </motion.div>

            {/* Título — contraste máximo, jerarquía clara */}
            <motion.h1
              className="text-3xl font-heading font-bold leading-tight tracking-[-0.025em] text-white sm:text-4xl lg:text-6xl"
              {...fadeIn(0.07)}
            >
              {heading}
            </motion.h1>

            {/* Descripción */}
            <motion.p
              className="text-base leading-relaxed text-white/70 sm:text-lg"
              {...fadeIn(0.14)}
            >
              {subheading}
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center" {...fadeIn(0.21)}>
              <PrimaryLink href={hero.ctas.primary.href} className="w-full sm:w-auto">
                {hero.ctas.primary.label}
              </PrimaryLink>
              <SecondaryLink href={hero.ctas.secondary.href} className="w-full sm:w-auto">
                {hero.ctas.secondary.label}
              </SecondaryLink>
            </motion.div>

            {/* Social proof chips con icono — ocultos en mobile para reducir ruido visual */}
            <motion.div className="hidden flex-wrap items-center gap-2.5 sm:flex" {...fadeIn(0.28)}>
              {proofChips.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/55"
                >
                  <svg
                    aria-hidden
                    className="shrink-0 text-blue-400"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M2 5l2.5 2.5 3.5-4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Columna derecha ─ Visual flotante (solo desktop) ────────── */}
          <div className="hidden lg:relative lg:block lg:overflow-visible">
            {/* Glow difuso local detrás de las cards */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-blue-600/[0.06] blur-2xl"
            />

            {/* Card secundaria superior-derecha — solo lg+, puramente decorativa */}
            <motion.div
              className="pointer-events-none absolute -right-4 -top-6 z-30 hidden w-48 rounded-xl border border-white/[0.07] bg-[#0d1526] p-4 opacity-80 shadow-[0_20px_50px_-18px_rgba(2,6,23,0.85)] lg:block"
              initial={{ opacity: 0, x: 12, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
            >
              <FloatWrap offset={7} duration={6.2}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">Servicio</p>
                <p className="mt-1.5 text-sm font-semibold text-white/80">Branding</p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/45">
                  Sistema visual multicanal con lineamientos claros.
                </p>
              </FloatWrap>
            </motion.div>

            {/* Card principal */}
            <motion.div
              className="relative z-20 rounded-2xl border border-white/[0.08] bg-[#111827] p-6 shadow-[0_28px_65px_-22px_rgba(2,6,23,0.95)] md:p-7"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              <FloatWrap offset={6} duration={7}>
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-400">
                    Proyecto digital
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-[10px] font-semibold text-green-400">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Activo
                  </span>
                </div>

                <h3 className="mt-3 text-[1.05rem] font-heading font-semibold leading-snug text-white">
                  Arquitectura de marca y experiencia web
                </h3>

                {/* Progress bars con label y porcentaje */}
                <div className="mt-5 space-y-3.5">
                  {progressBars.map(({ label, pct, bar }) => (
                    <div key={label}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[11px] font-medium text-white/45">{label}</span>
                        <span className="text-[11px] font-medium text-white/35">{pct}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                        <div className={`h-full rounded-full ${bar}`} style={{ width: pct }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4">
                  <span aria-hidden className="inline-flex h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span className="text-[11px] font-medium text-white/40">Sistema modular listo para escalar</span>
                </div>
              </FloatWrap>
            </motion.div>

            {/* Card terciaria inferior — solo lg+, puramente decorativa, sin sangrar a la izquierda */}
            <motion.div
              className="pointer-events-none absolute -bottom-6 left-4 z-30 hidden w-52 rounded-xl border border-white/[0.07] bg-[#0d1526] p-4 opacity-75 shadow-[0_20px_50px_-18px_rgba(2,6,23,0.85)] lg:block"
              initial={{ opacity: 0, x: -12, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.32, ease: EASE }}
            >
              <FloatWrap offset={5} duration={6.8}>
                <div className="flex flex-wrap gap-1.5">
                  {["Web", "Digital Systems"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 text-[10px] font-semibold text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-white/45">
                  Landing con flujo de cotizacion integrado.
                </p>
              </FloatWrap>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
