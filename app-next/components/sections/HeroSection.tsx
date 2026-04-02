"use client";

import { motion } from "framer-motion";
import { homeContent } from "@/lib/content/homeContent";
import { Badge } from "@/components/ui/Badge";
import { PrimaryLink, SecondaryLink } from "@/components/ui/Buttons";
import { Section } from "@/components/ui/Section";

export function HeroSection() {
  const { hero } = homeContent;

  const heading =
    "Diseno de marca y soluciones digitales para empresas que quieren crecer con una presencia mas solida, moderna y estrategica.";
  const subheading =
    "Combino branding, diseno web y herramientas digitales para construir marcas claras, sistemas visuales consistentes y experiencias digitales orientadas a negocio.";

  const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -90px 0px" },
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
  };

  const floatLoop = {
    duration: 6.8,
    repeat: Number.POSITIVE_INFINITY,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
  };

  return (
    <Section className="relative overflow-hidden py-16 dark:bg-[#020617] md:py-24">
      {/* Fondos decorativos: solo en md+ */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute -left-28 top-2 h-80 w-80 rounded-full bg-brand-accent/12 blur-3xl dark:bg-brand-accent/10" />
        <div className="absolute right-0 top-12 h-72 w-72 rounded-full bg-brand-accent/12 blur-3xl dark:bg-brand-accent/10" />
        <div className="absolute bottom-0 right-16 h-64 w-64 rounded-full bg-[#D0F759]/20 blur-3xl dark:bg-[#D0F759]/6" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_13%_18%,rgba(37,99,235,0.1),transparent_36%),radial-gradient(circle_at_84%_68%,rgba(208,247,89,0.1),transparent_34%)] dark:opacity-15" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),rgba(255,255,255,0))] dark:opacity-0" />
      </div>

      <div className="relative grid gap-8 md:gap-10 lg:grid-cols-12 lg:items-center xl:gap-12">
        <div className="space-y-6 lg:col-span-7">
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.02 }}>
            <Badge className="border-[#D0F759]/40 bg-[#D0F759]/20 text-brand-primary">
              Estrategia digital para marcas en crecimiento
            </Badge>
          </motion.div>

          <motion.h1
            className="max-w-[14.5ch] text-[clamp(2.1rem,4vw,3.6rem)] font-heading font-bold leading-[1.05] tracking-[-0.02em] text-brand-primary dark:text-white/90"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.08 }}
          >
            {heading}
          </motion.h1>

          <motion.p
            className="max-w-[58ch] text-body-lg leading-relaxed text-brand-neutral dark:text-white/70"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.14 }}
          >
            {subheading}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 pt-1"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            <PrimaryLink href={hero.ctas.primary.href} className="px-7 py-3.5 shadow-lg shadow-blue-500/20">
              {hero.ctas.primary.label}
            </PrimaryLink>
            <SecondaryLink href={hero.ctas.secondary.href} className="px-6 py-3.5">
              {hero.ctas.secondary.label}
            </SecondaryLink>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.26 }}
          >
            <span className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-small font-medium text-brand-neutral shadow-soft dark:border-white/[0.10] dark:bg-surface-card dark:text-white/60">
              120+ proyectos desarrollados
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-small font-medium text-brand-neutral shadow-soft dark:border-white/[0.10] dark:bg-surface-card dark:text-white/60">
              14 sectores atendidos
            </span>
          </motion.div>
        </div>

        {/* Lado visual derecho: solo 1 card principal en mobile, composición completa en md+ */}
        <div className="relative min-h-[320px] md:min-h-[460px] lg:col-span-5 flex items-end md:block mt-6 md:mt-0">
          {/* Card principal SIEMPRE visible */}
          <motion.article
            className="group mx-auto md:absolute md:left-2 md:right-10 md:top-10 z-20 w-full max-w-xs rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.18)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_75px_-28px_rgba(15,23,42,0.46)] md:max-w-none md:p-7 md:shadow-[0_28px_70px_-26px_rgba(15,23,42,0.38)] dark:border-white/[0.10] dark:bg-surface-card dark:shadow-[0_18px_50px_-20px_rgba(2,6,23,0.9)]"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            animate={{ y: [0, -5, 0] }}
            style={{ willChange: "transform" }}
          >
            <p className="text-small font-semibold uppercase tracking-wide text-brand-accent">Proyecto digital</p>
            <h3 className="mt-2 text-h3 font-heading font-semibold text-brand-primary">Arquitectura de marca y experiencia web</h3>
            <div className="mt-6 space-y-3">
              <div className="h-2.5 rounded-full bg-slate-100 dark:bg-surface-elevated">
                <div className="h-full w-[82%] rounded-full bg-brand-accent" />
              </div>
              <div className="h-2.5 rounded-full bg-slate-100 dark:bg-surface-elevated">
                <div className="h-full w-[64%] rounded-full bg-[#D0F759]" />
              </div>
              <div className="h-2.5 rounded-full bg-slate-100 dark:bg-surface-elevated">
                <div className="h-full w-[74%] rounded-full bg-slate-300 dark:bg-white/25" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-brand-neutral/80">
              <span className="inline-flex h-2 w-2 rounded-full bg-brand-accent" />
              Sistema modular listo para escalar
            </div>
          </motion.article>

          {/* Cards y decorativos secundarios: solo en md+ */}
          <div className="hidden md:block">
            <motion.article
              className="absolute right-0 top-0 z-30 w-56 rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.4)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.5)] dark:border-white/[0.10] dark:bg-surface-card"
              initial={{ opacity: 0, x: 12, y: 16 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              animate={{ y: [0, -6, 0] }}
              style={{ willChange: "transform" }}
            >
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-brand-neutral dark:border-white/[0.10] dark:bg-surface-card dark:text-white/60">
                Branding
              </span>
              <p className="mt-3 text-small text-brand-neutral">Sistema visual con lineamientos para implementacion multicanal.</p>
            </motion.article>

            <motion.article
              className="absolute bottom-1 left-8 z-10 w-60 rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.38)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-28px_rgba(15,23,42,0.48)] dark:border-white/[0.10] dark:bg-surface-card"
              initial={{ opacity: 0, x: -10, y: 14 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              animate={{ y: [0, -4, 0] }}
              style={{ willChange: "transform" }}
            >
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-brand-neutral dark:border-white/[0.10] dark:bg-surface-card dark:text-white/60">Web</span>
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-brand-neutral dark:border-white/[0.10] dark:bg-surface-card dark:text-white/60">Digital Systems</span>
              </div>
              <p className="mt-3 text-small text-brand-neutral">Landing orientada a conversion con flujo de cotizacion integrado.</p>
            </motion.article>

            <motion.div
              className="pointer-events-none absolute -right-2 bottom-14 z-30 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs font-semibold text-brand-accent shadow-[0_10px_25px_-12px_rgba(37,99,235,0.55)]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.34 }}
              animate={{ y: [0, -4, 0] }}
              style={{ willChange: "transform" }}
            >
              Digital Systems
            </motion.div>

            <motion.div
              className="pointer-events-none absolute left-0 top-6 z-30 rounded-full border border-slate-200 bg-white/95 px-3 py-1 text-xs font-semibold text-brand-neutral shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)] dark:border-white/[0.10] dark:bg-surface-card dark:text-white/60"
              initial={{ opacity: 0, scale: 0.94, x: -6 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: 0.24 }}
              animate={{ y: [0, -3, 0] }}
              style={{ willChange: "transform" }}
            >
              Estrategia + ejecucion
            </motion.div>

            <motion.div
              className="pointer-events-none absolute -right-10 top-24 h-36 w-36 rounded-full bg-brand-accent/10 blur-2xl"
              animate={{ y: [0, -6, 0] }}
              transition={floatLoop}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
