"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cardIn = (delay = 0): any => ({
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, delay },
  },
});

// --- Estilo compartido de card -----------------------------------------------
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

// --- Panel visual — composición fiel al hero original ------------------------
//
//  Referencia visual:
//  ┌──────────────────────────────────┐  ← CardMain (full-width del panel)
//  │ PROYECTO DIGITAL                 │
//  │ Arquitectura de marca…           │┌────────────┐
//  │ Branding ████████████████ 82%    ││ SERVICIO   │ ← CardService (superpuesta
//  │ Web      ████████████     64%    ││ Branding   │   arriba-derecha)
//  │ Sistemas ██████████████   74%    │└────────────┘
//  │ [Web] [Digital Systems]          │
//  │ Landing con flujo de cotización  │
//  └──────────────────────────────────┘
//       ┌──────────────────┐
//       │ ENTREGA          │  ← CardDelivered (debajo, ligeramente superpuesta)
//       │ Sistema visual…  │
//       │ Completado ──────│
//       └──────────────────┘

function HeroVisual() {
  const bars = [
    { label: "Branding", pct: 82, from: "#2563EB", to: "#60A5FA" },
    { label: "Web",      pct: 64, from: "#1D4ED8", to: "#38BDF8" },
    { label: "Sistemas", pct: 74, from: "#1E40AF", to: "#3B82F6" },
  ];

  return (
    <motion.div
      variants={fadeUp}
      custom={0.45}
      initial="hidden"
      animate="show"
      className="relative hidden lg:block"
      style={{ paddingBottom: "88px" }}
    >
      {/* Glow detrás */}
      <div
        className="pointer-events-none absolute inset-0
          flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[300px] w-[300px] rounded-full
          bg-blue-600/10 blur-[80px]" />
      </div>

      {/* CardMain — flujo normal, ocupa todo el ancho */}
      <motion.div
        variants={cardIn(0.5)}
        initial="hidden"
        animate="show"
        className={`${cardCls} relative z-10 w-full p-5`}
      >
        <p className="mb-1 font-mono text-[10px] font-semibold
          tracking-[0.08em] uppercase text-blue-400">
          Proyecto digital
        </p>
        <p className="mb-4 font-display text-[15px] font-semibold
          leading-snug text-white/90">
          Arquitectura de marca y experiencia web
        </p>

        {bars.map(({ label, pct, from, to }) => (
          <div key={label} className="mb-3 last:mb-0">
            <div className="mb-1 h-[3px] w-full overflow-hidden
              rounded-full bg-white/[0.07]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, ${from}, ${to})`,
                }}
              />
            </div>
            <div className="flex justify-between">
              <span className="font-sans text-[11px] text-white/40">{label}</span>
              <span className="font-sans text-[11px] text-white/40">{pct}%</span>
            </div>
          </div>
        ))}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {["Web", "Digital Systems"].map((tag) => (
            <span key={tag}
              className="rounded-full border border-blue-900/60
                bg-blue-950/50 px-2.5 py-0.5
                font-sans text-[10px] font-medium text-blue-300/80">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-2 font-sans text-[11px] leading-snug text-white/35">
          Landing con flujo de cotización integrado.
        </p>
      </motion.div>

      {/* CardService — superpuesta arriba-derecha, encima de CardMain */}
      <motion.div
        variants={cardIn(0.65)}
        initial="hidden"
        animate="show"
        className={`${cardCls} absolute right-[-16px] top-[-16px] z-20 w-[185px] p-4`}
      >
        <p className="mb-0.5 font-mono text-[10px] font-semibold
          tracking-[0.08em] uppercase text-blue-400">
          Servicio
        </p>
        <p className="mb-1 font-display text-[14px] font-semibold
          leading-snug text-white/90">
          Branding
        </p>
        <p className="font-sans text-[12px] leading-relaxed text-white/40">
          Sistema visual multicanal con lineamientos claros.
        </p>
      </motion.div>

      {/* CardDelivered — superpuesta abajo, sobresale del contenedor */}
      <motion.div
        variants={cardIn(0.8)}
        initial="hidden"
        animate="show"
        className={`${cardCls} absolute bottom-0 left-8 z-20 w-[220px] px-4 py-3.5`}
      >
        <p className="mb-0.5 font-mono text-[10px] font-semibold
          tracking-[0.08em] uppercase text-blue-400">
          Entrega
        </p>
        <p className="mb-2.5 font-display text-[13px] font-semibold
          leading-snug text-white/90">
          Sistema visual<br />empresa industrial
        </p>
        <div className="h-[3px] w-full overflow-hidden
          rounded-full bg-white/[0.07]">
          <div className="h-full w-full rounded-full
            bg-gradient-to-r from-blue-600 to-blue-400" />
        </div>
        <p className="mt-1.5 font-sans text-[10px] font-medium text-green-400/80">
          Completado · Entregado
        </p>
      </motion.div>
    </motion.div>
  );
}

// --- Fondo -------------------------------------------------------------------
function HeroBackground({
  scrollY,
}: {
  scrollY: MotionValue<number>;
}) {
  return (
    <>
      <motion.div
        style={{ y: scrollY }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Orbe azul principal */}
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
        {/* Orbe secundario izquierda */}
        <div
          className="absolute bottom-[-10%] left-[-5%] h-[420px] w-[45%] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 25% 80%," +
              "rgba(37,99,235,0.13) 0%," +
              "transparent 70%)",
          }}
        />
        {/* Streak horizontal sutil */}
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

      {/* Grid de líneas */}
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

      {/* Fade inferior */}
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

          {/* Derecha — visual */}
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
