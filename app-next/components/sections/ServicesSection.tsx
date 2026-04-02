"use client";
import { homeContent } from "@/lib/content/homeContent";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/sections/Reveal";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";

export function ServicesSection() {
  return (
    <Section className="relative overflow-hidden bg-slate-50 dark:bg-surface-section" id="servicios">
      {/* Fondo decorativo sutil — atenuado en dark para no invadir texto */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-brand-accent/10 blur-3xl dark:opacity-25" />
        <div className="absolute right-0 top-32 h-56 w-56 rounded-full bg-[#D0F759]/10 blur-3xl dark:opacity-20" />
      </div>

      <Reveal>
        <div className="mb-14 flex flex-col items-center gap-5">
          <Badge className="border-[#D0F759]/40 bg-[#D0F759]/20 text-brand-primary text-xs font-semibold tracking-wide px-4 py-1.5">
            Servicios
          </Badge>
          <h2 className="max-w-[16ch] text-[clamp(2.1rem,4vw,3.2rem)] font-heading font-bold leading-[1.08] tracking-tight text-brand-primary text-center">
            {homeContent.services.title}
          </h2>
          {/* Si quieres un subtítulo más largo, puedes agregarlo aquí */}
        </div>
      </Reveal>

      <div className="mx-auto grid max-w-content gap-8 md:grid-cols-2 lg:gap-12">
        {homeContent.services.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.07}>
            <motion.article
              className="group relative flex h-full flex-col justify-between rounded-xl border border-slate-200/80 bg-white/95 p-8 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-card focus-within:shadow-card dark:border-white/[0.07] dark:bg-surface-card dark:hover:border-white/[0.14] dark:hover:bg-surface-elevated"
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.55, delay: 0.1 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, boxShadow: "0 24px 60px -18px rgba(37,99,235,0.10)" }}
              style={{ willChange: "transform" }}
            >
              {/* Icono decorativo placeholder, puedes reemplazar por SVG si tienes uno */}
              <div className="mb-4 flex items-center justify-start">
                <span className="inline-block h-9 w-9 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center">
                  <svg width="22" height="22" fill="none" viewBox="0 0 22 22" className="mx-auto"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="2" opacity="0.18"/><path d="M7 11.5l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
              <h3 className="text-h3 font-heading font-semibold text-brand-primary mb-2">
                {item.title}
              </h3>
              <p className="mb-0 text-body-lg text-brand-neutral/90">
                {item.text}
              </p>
              {/* Badge de categoría si aplica en el futuro */}
              {/* <Badge className="mt-5">Categoría</Badge> */}
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
