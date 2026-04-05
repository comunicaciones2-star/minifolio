"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from "framer-motion";

// --- Variantes ---------------------------------------------------------------
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay },
  }),
};

const cardCls =
  "rounded-2xl border border-white/[0.08] bg-[#0c1322]/95 " +
  "shadow-[0_20px_48px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.04)] " +
  "backdrop-blur-xl";

// --- Eyebrow -----------------------------------------------------------------
function EyebrowPill() {
  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      initial="hidden"
      animate="show"
      className="mb-6 inline-flex items-center gap-2 rounded-full
        border border-blue-800/50 bg-blue-950/40 px-3 py-1.5
        backdrop-blur-sm"
    >
      <span className="relative flex h-[7px] w-[7px]">
        <span className="absolute inline-flex h-full w-full animate-ping
          rounded-full bg-blue-400 opacity-60" />
        <span className="relative inline-flex h-[7px] w-[7px]
          rounded-full bg-blue-500" />
      </span>
      <span className="font-mono text-[11px] font-medium
        tracking-[0.08em] uppercase text-blue-400">
        Diseño estratégico · B2B
      </span>
    </motion.div>
  );
}

// --- Headline ----------------------------------------------------------------
function Headline() {
  return (
    <motion.h1
      variants={fadeUp}
      custom={0.1}
      initial="hidden"
      animate="show"
      className="mb-5 font-display
        text-[clamp(40px,5.5vw,68px)]
        font-extrabold leading-[1.04] tracking-[-0.04em] text-white"
    >
      Marcas que
      <br />
      <span className="bg-gradient-to-r from-blue-400 via-blue-500
        to-blue-300 bg-clip-text text-transparent">
        convierten
      </span>
      <br />
      visitantes.
    </motion.h1>
  );
}

// --- Subtítulo ---------------------------------------------------------------
function Subheadline() {
  return (
    <motion.p
      variants={fadeUp}
      custom={0.2}
      initial="hidden"
      animate="show"
      className="mb-8 max-w-[400px] font-sans text-[17px]
        leading-[1.7] text-white/55"
    >
      Estrategia, diseño y tecnología integradas para que tu marca
      consiga más clientes, genere confianza y cierre de forma sostenida.
    </motion.p>
  );
}

// --- CTAs --------------------------------------------------------------------
function CTAs() {
  return (
    <motion.div
      variants={fadeUp}
      custom={0.3}
      initial="hidden"
      animate="show"
      className="flex flex-wrap items-center gap-3"
    >
      <a
        href="/cotizador"
        className="group inline-flex items-center gap-2 rounded-lg
          bg-blue-600 px-5 py-3 text-[15px] font-semibold text-white
          transition-all duration-200
          hover:-translate-y-px hover:bg-blue-500
          hover:shadow-[0_8px_28px_rgba(37,99,235,0.45)]
          active:scale-[0.98]"
      >
        Calcular inversión del proyecto
        <svg
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          width="15" height="15" viewBox="0 0 15 15" fill="none"
          aria-hidden="true"
        >
          <path d="M3 7.5h9M8 3.5l4 4-4 4"
            stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      <a
        href="#proyectos"
        className="group inline-flex items-center gap-2 rounded-lg
          border border-white/20 bg-white/5
          px-5 py-3 text-[15px] font-semibold text-white/80
          transition-all duration-200
          hover:border-white/35 hover:bg-white/10 hover:text-white
          active:scale-[0.98]"
      >
        Ver proyectos
        <svg
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          aria-hidden="true"
        >
          <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
            stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </motion.div>
  );
}

// --- Trust strip — pills -----------------------------------------------------
function TrustStrip() {
  const items = [
    "+30 proyectos entregados",
    "15 años de experiencia",
    "Enfoque estratégico",
  ];
  return (
    <motion.div
      variants={fadeUp}
      custom={0.4}
      initial="hidden"
      animate="show"
      className="mt-5 flex flex-wrap gap-2"
    >
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-1.5 rounded-full
            border border-white/10 bg-white/5
            px-3 py-1 font-sans text-[12px] font-medium text-white/55"
        >
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
            <path d="M1 4l2.5 2.5L9 1"
              stroke="#60A5FA" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {item}
        </span>
      ))}
    </motion.div>
  );
}

// --- Carrusel de proyectos ---------------------------------------------------

const FEATURED_PROJECTS = [
  {
    label: "PROYECTO · BRANDING",
    title: "Sistema de marca para empresa de tecnología IoT",
    sector: "Tecnología / IoT",
    tags: ["Branding", "Identidad visual", "Estrategia", "Web"],
    img: "/images/portfolio/remti-thumb.jpg",
    href: "/portafolio/remti-remote-iot/",
  },
  {
    label: "PROYECTO · CAMPAÑA",
    title: "Estrategia digital 360° para clínica odontológica",
    sector: "Salud / Odontología",
    tags: ["Campaña", "Redes sociales", "Impreso", "Estrategia"],
    img: "/images/portfolio/omb-thumb.jpg",
    href: "/portafolio/odontologia-marlon-becerra/",
  },
  {
    label: "PROYECTO · BRANDING",
    title: "Manual de identidad para agencia de marketing digital",
    sector: "Marketing / Entretenimiento digital",
    tags: ["Branding", "Manual de marca", "Identidad visual", "Marketing digital"],
    img: "/images/portfolio/roza-agency-thumb.jpg",
    href: "/portafolio/roza-agency/",
  },
];

function HeroVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % FEATURED_PROJECTS.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const current = FEATURED_PROJECTS[active];
  const next = FEATURED_PROJECTS[(active + 1) % FEATURED_PROJECTS.length];

  return (
    <motion.div
      variants={fadeUp}
      custom={0.45}
      initial="hidden"
      animate="show"
      className="relative hidden lg:flex flex-col gap-4"
    >
      {/* Glow de fondo */}
      <div
        className="pointer-events-none absolute -inset-8
          flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[300px] w-[300px] rounded-full
          bg-blue-600/10 blur-[90px]" />
      </div>

      {/* Cards con fade entre slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="flex gap-3 items-stretch"
        >
          {/* Card principal — 65% */}
          <a
            href={current.href}
            className={`${cardCls} flex-[3] min-w-0 overflow-hidden flex flex-col
              group transition-shadow duration-200
              hover:shadow-[0_24px_56px_rgba(0,0,0,0.7),0_0_0_1px_rgba(96,165,250,0.15)]`}
          >
            <div className="relative h-[158px] w-full shrink-0 overflow-hidden">
              <Image
                src={current.img}
                alt={current.title}
                fill
                sizes="(min-width: 1024px) 260px"
                className="object-cover transition-transform duration-500
                  group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t
                from-[#0c1322]/70 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col flex-1 p-4">
              <p className="mb-1.5 font-mono text-[10px] font-semibold
                tracking-[0.08em] uppercase text-blue-400">
                {current.label}
              </p>
              <p className="mb-1.5 font-display text-[13.5px] font-semibold
                leading-snug text-white/90 flex-1">
                {current.title}
              </p>
              <p className="mb-3 font-sans text-[11px] text-white/40">
                {current.sector}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {current.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-blue-900/60
                      bg-blue-950/50 px-2 py-0.5
                      font-sans text-[10px] font-medium text-blue-300/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>

          {/* Card secundaria — 35% */}
          <div className={`${cardCls} flex-[2] min-w-0 overflow-hidden flex flex-col`}>
            <div className="relative h-[110px] w-full shrink-0 overflow-hidden">
              <Image
                src={next.img}
                alt={next.title}
                fill
                sizes="(min-width: 1024px) 170px"
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t
                from-[#0c1322]/80 via-[#0c1322]/20 to-transparent" />
            </div>
            <div className="flex flex-col flex-1 p-3">
              <p className="mb-1 font-mono text-[9px] font-semibold
                tracking-[0.08em] uppercase text-blue-400/80">
                Siguiente
              </p>
              <p className="mb-1.5 font-display text-[13px] font-semibold
                leading-snug text-white/80 flex-1">
                {next.tags[0]}
              </p>
              <p className="font-sans text-[10px] text-white/35 leading-snug">
                {next.sector}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots de navegación */}
      <div className="flex items-center gap-2 pl-0.5">
        {FEATURED_PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Proyecto ${i + 1}`}
            className={`h-[5px] rounded-full transition-all duration-300 ${
              i === active
                ? "w-5 bg-blue-400"
                : "w-[5px] bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// --- Fondo -------------------------------------------------------------------
function HeroBackground({ scrollY }: { scrollY: MotionValue<number> }) {
  return (
    <>
      <motion.div
        style={{ y: scrollY }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute right-[-5%] top-[-10%] h-[700px] w-[65%] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse 65% 60% at 70% 35%," +
              "rgba(37,99,235,0.28) 0%," +
              "rgba(37,99,235,0.08) 55%," +
              "transparent 75%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] h-[420px] w-[45%] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 25% 80%," +
              "rgba(37,99,235,0.13) 0%," +
              "transparent 70%)",
          }}
        />
        <div
          className="absolute left-0 right-0 top-[28%] h-[1px]"
          style={{
            background:
              "linear-gradient(90deg," +
              "transparent 0%," +
              "rgba(37,99,235,0.18) 30%," +
              "rgba(96,165,250,0.22) 55%," +
              "transparent 100%)",
          }}
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.09) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(37,99,235,0.09) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 62% 40%," +
            "black 20%,transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 62% 40%," +
            "black 20%,transparent 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0
          left-0 right-0 h-28
          bg-gradient-to-t from-[#020617] to-transparent"
        aria-hidden="true"
      />
    </>
  );
}

// --- Componente principal ----------------------------------------------------
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const meshY = useTransform(scrollY, [0, 500], [0, -55]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#020617]
        flex min-h-[88vh] flex-col justify-center"
    >
      <HeroBackground scrollY={meshY} />

      <div className="relative z-10 mx-auto w-full max-w-6xl
        px-6 md:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 items-center
          gap-12 lg:grid-cols-2 lg:gap-8">

          {/* Izquierda — copy */}
          <div>
            <EyebrowPill />
            <Headline />
            <Subheadline />
            <CTAs />
            <TrustStrip />
          </div>

          {/* Derecha — cards */}
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
