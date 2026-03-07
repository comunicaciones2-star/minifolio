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

  return (
    <Section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-brand-accent/10 blur-3xl" />
        <div className="absolute right-8 top-20 h-64 w-64 rounded-full bg-brand-accent/10 blur-3xl" />
        <div className="absolute bottom-8 right-24 h-56 w-56 rounded-full bg-[#D0F759]/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.08),transparent_34%),radial-gradient(circle_at_88%_72%,rgba(208,247,89,0.08),transparent_30%)]" />
      </div>

      <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="space-y-7 lg:col-span-7">
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.02 }}>
            <Badge className="border-[#D0F759]/40 bg-[#D0F759]/20 text-brand-primary">
              Estrategia digital para marcas en crecimiento
            </Badge>
          </motion.div>

          <motion.h1
            className="text-h1 font-heading font-bold tracking-tight text-brand-primary"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.08 }}
          >
            {heading}
          </motion.h1>

          <motion.p
            className="max-w-3xl text-body-lg text-brand-neutral"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.14 }}
          >
            {subheading}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            <PrimaryLink href={hero.ctas.primary.href}>{hero.ctas.primary.label}</PrimaryLink>
            <SecondaryLink href={hero.ctas.secondary.href}>{hero.ctas.secondary.label}</SecondaryLink>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.26 }}
          >
            <span className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-small font-medium text-brand-neutral shadow-soft">
              120+ proyectos desarrollados
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-small font-medium text-brand-neutral shadow-soft">
              14 sectores atendidos
            </span>
          </motion.div>
        </div>

        <div className="relative min-h-[430px] lg:col-span-5">
          <motion.article
            className="group absolute left-0 right-8 top-8 rounded-xl border border-slate-200 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            animate={{ y: [0, -4, 0] }}
          >
            <p className="text-small font-semibold uppercase tracking-wide text-brand-accent">Proyecto digital</p>
            <h3 className="mt-2 text-h3 font-heading font-semibold text-brand-primary">Arquitectura de marca y experiencia web</h3>
            <div className="mt-5 space-y-3">
              <div className="h-2.5 rounded-full bg-slate-100">
                <div className="h-full w-[82%] rounded-full bg-brand-accent" />
              </div>
              <div className="h-2.5 rounded-full bg-slate-100">
                <div className="h-full w-[64%] rounded-full bg-[#D0F759]" />
              </div>
              <div className="h-2.5 rounded-full bg-slate-100">
                <div className="h-full w-[74%] rounded-full bg-slate-300" />
              </div>
            </div>
          </motion.article>

          <motion.article
            className="absolute right-0 top-0 w-56 rounded-xl border border-slate-200 bg-white p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            initial={{ opacity: 0, x: 12, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            animate={{ y: [0, -6, 0] }}
          >
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-brand-neutral">
              Branding
            </span>
            <p className="mt-3 text-small text-brand-neutral">Sistema visual con lineamientos para implementacion multicanal.</p>
          </motion.article>

          <motion.article
            className="absolute bottom-0 left-6 w-60 rounded-xl border border-slate-200 bg-white p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            initial={{ opacity: 0, x: -10, y: 14 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            animate={{ y: [0, -5, 0] }}
          >
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-brand-neutral">Web</span>
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-brand-neutral">Digital Systems</span>
            </div>
            <p className="mt-3 text-small text-brand-neutral">Landing orientada a conversion con flujo de cotizacion integrado.</p>
          </motion.article>

          <motion.div
            className="pointer-events-none absolute -bottom-6 right-4 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs font-semibold text-brand-accent"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.34 }}
          >
            Digital Systems
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
