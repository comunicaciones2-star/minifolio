"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// --- Animation variants ---------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const floatCard = (delay = 0): any => ({
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, delay },
  },
});

// --- Sub-components -------------------------------------------------------

function EyebrowPill() {
  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      initial="hidden"
      animate="show"
      className="inline-flex items-center gap-2 px-3 py-1.5 mb-6
        rounded-full border border-blue-800/50 bg-blue-950/40
        backdrop-blur-sm"
    >
      <span className="relative flex h-[7px] w-[7px]">
        <span className="absolute inline-flex h-full w-full animate-ping
          rounded-full bg-blue-400 opacity-60" />
        <span className="relative inline-flex h-[7px] w-[7px]
          rounded-full bg-blue-500" />
      </span>
      <span className="font-mono text-[11px] font-medium tracking-[0.08em]
        uppercase text-blue-400">
        Diseño estratégico · B2B
      </span>
    </motion.div>
  );
}

function Headline() {
  return (
    <motion.h1
      variants={fadeUp}
      custom={0.1}
      initial="hidden"
      animate="show"
      className="font-display text-[clamp(38px,5.5vw,68px)] font-extrabold
        leading-[1.04] tracking-[-0.04em] text-white mb-5"
    >
      Marcas que
      <br />
      <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-300
        bg-clip-text text-transparent">
        convierten
      </span>
      <br />
      visitantes.
    </motion.h1>
  );
}

function Subheadline() {
  return (
    <motion.p
      variants={fadeUp}
      custom={0.2}
      initial="hidden"
      animate="show"
      className="font-sans text-[17px] leading-[1.7] text-white/55
        max-w-[400px] mb-8"
    >
      Estrategia, diseño y tecnología integradas para que tu marca
      consiga más clientes, genere confianza y cierre de forma sostenida.
    </motion.p>
  );
}

function CTAs() {
  return (
    <motion.div
      variants={fadeUp}
      custom={0.3}
      initial="hidden"
      animate="show"
      className="flex items-center gap-3 flex-wrap mb-8"
    >
      <a
        href="/cotizador"
        className="group inline-flex items-center gap-2 px-5 py-3
          rounded-lg bg-blue-600 hover:bg-blue-500
          text-white text-[15px] font-semibold
          transition-all duration-200 hover:-translate-y-px
          hover:shadow-[0_8px_28px_rgba(37,99,235,0.4)]
          active:scale-[0.98]"
      >
        Calcular inversión del proyecto
        <svg
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          width="15" height="15" viewBox="0 0 15 15" fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 7.5h9M8 3.5l4 4-4 4"
            stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </a>

      <a
        href="#proyectos"
        className="group inline-flex items-center gap-1.5 px-2 py-3
          text-white/55 hover:text-white/90
          text-[14px] font-medium transition-colors duration-150"
      >
        Ver proyectos
        <svg
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
            stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </a>
    </motion.div>
  );
}

function TrustStrip() {
  const items = [
    "+30 proyectos entregados",
    "5 años de experiencia",
    "Enfoque B2B",
  ];
  return (
    <motion.div
      variants={fadeUp}
      custom={0.4}
      initial="hidden"
      animate="show"
      className="flex items-center gap-5 flex-wrap"
    >
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2">
          <div className="flex h-[14px] w-[14px] shrink-0 items-center
            justify-center rounded-full
            border border-blue-800/60 bg-blue-950/50">
            <svg width="7" height="5" viewBox="0 0 7 5" fill="none" aria-hidden="true">
              <path
                d="M1 2.5l1.5 1.5L6 1"
                stroke="#60A5FA" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-sans text-[12px] text-white/40">{item}</span>
        </div>
      ))}
    </motion.div>
  );
}

// --- Floating cards -------------------------------------------------------

function CardMain() {
  return (
    <motion.div
      variants={floatCard(0.5)}
      initial="hidden"
      animate="show"
      style={{ "--float-dur": "7s" } as React.CSSProperties}
      className="absolute top-0 left-4 w-[270px]
        rounded-xl border border-blue-900/40
        bg-gray-900/90 backdrop-blur-xl p-5
        shadow-[0_24px_48px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.04)]
        animate-float-a"
    >
      <p className="mb-3 font-mono text-[10px] font-semibold
        tracking-[0.08em] uppercase text-blue-400">
        Arquitectura de marca
      </p>
      <p className="mb-4 font-display text-[13px] font-semibold
        leading-snug text-white/90">
        Sistema visual y narrativa estratégica
      </p>

      {[
        { label: "Identidad visual", pct: 68 },
        { label: "Comunicación B2B", pct: 45 },
      ].map(({ label, pct }) => (
        <div key={label} className="mb-3 last:mb-0">
          <div className="mb-1.5 h-[3px] overflow-hidden
            rounded-full bg-blue-900/30">
            <div
              className="h-full rounded-full
                bg-gradient-to-r from-blue-600 to-blue-400"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-[10px] text-white/35">{label}</span>
            <span className="font-sans text-[10px] text-white/35">{pct}%</span>
          </div>
        </div>
      ))}

      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { val: "3×", key: "Conversión" },
          { val: "92%", key: "Satisfacción" },
        ].map(({ val, key }) => (
          <div
            key={key}
            className="rounded-lg border border-blue-900/40
              bg-blue-950/30 px-3 py-2"
          >
            <p className="font-display text-[17px] font-bold
              leading-none text-blue-400 mb-1">
              {val}
            </p>
            <p className="font-sans text-[9px] uppercase
              tracking-[0.06em] text-white/30">
              {key}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CardSecondary() {
  return (
    <motion.div
      variants={floatCard(0.65)}
      initial="hidden"
      animate="show"
      className="absolute top-[170px] right-0 w-[195px]
        rounded-xl border border-blue-900/35
        bg-gray-900/90 backdrop-blur-xl p-4
        shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]
        animate-float-b"
    >
      <div className="mb-3 inline-flex items-center gap-1.5
        rounded-full border border-green-800/40 bg-green-950/30
        px-2 py-0.5">
        <span className="relative flex h-[5px] w-[5px]">
          <span className="absolute inline-flex h-full w-full animate-ping
            rounded-full bg-green-400 opacity-60" />
          <span className="relative inline-flex h-[5px] w-[5px]
            rounded-full bg-green-500" />
        </span>
        <span className="font-sans text-[9px] font-medium text-white/50">
          Proyecto activo
        </span>
      </div>

      <p className="font-display text-[12px] font-semibold
        leading-snug text-white/90 mb-3">
        Landing page B2B<br />captación de leads
      </p>

      <div className="flex items-center gap-2">
        <div className="flex">
          {["JF", "CL", "+2"].map((initials, i) => (
            <div
              key={initials}
              className="flex h-5 w-5 items-center justify-center
                rounded-full border-2 border-gray-900
                bg-blue-700 font-sans text-[7px] font-semibold text-white"
              style={{ marginLeft: i === 0 ? 0 : -6 }}
            >
              {initials}
            </div>
          ))}
        </div>
        <span className="font-sans text-[10px] text-white/35">
          En producción
        </span>
      </div>
    </motion.div>
  );
}

function CardTertiary() {
  return (
    <motion.div
      variants={floatCard(0.8)}
      initial="hidden"
      animate="show"
      className="absolute bottom-10 left-10 w-[172px]
        rounded-xl border border-blue-900/35
        bg-gray-900/90 backdrop-blur-xl px-4 py-3
        shadow-[0_16px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.04)]
        animate-float-c"
    >
      <p className="mb-1.5 font-mono text-[9px] font-semibold
        tracking-[0.08em] uppercase text-blue-400">
        Entrega
      </p>
      <p className="font-display text-[11px] font-semibold
        leading-snug text-white/90 mb-2.5">
        Sistema visual<br />empresa industrial
      </p>
      <div className="h-[3px] w-full overflow-hidden
        rounded-full bg-blue-900/25">
        <div className="h-full w-full rounded-full
          bg-gradient-to-r from-blue-600 to-blue-400" />
      </div>
      <p className="mt-1.5 font-sans text-[9px]
        font-medium text-green-400/70">
        Completado · Entregado
      </p>
    </motion.div>
  );
}

// --- Right panel ----------------------------------------------------------

function HeroVisual() {
  return (
    <div className="relative hidden lg:block h-[400px]">
      <div className="pointer-events-none absolute inset-0 flex
        items-center justify-center">
        <div className="h-[260px] w-[260px] rounded-full
          bg-blue-600/10 blur-[72px]" />
      </div>
      <CardMain />
      <CardSecondary />
      <CardTertiary />
    </div>
  );
}

// --- Background -----------------------------------------------------------

function HeroBackground({ scrollY }: { scrollY: MotionValue<number> }) {
  return (
    <>
      <motion.div
        style={{ y: scrollY }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute right-0 top-0 h-[520px] w-[55%]
          bg-[radial-gradient(ellipse_60%_60%_at_80%_30%,rgba(37,99,235,0.18)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[40%]
          bg-[radial-gradient(ellipse_50%_70%_at_20%_80%,rgba(37,99,235,0.07)_0%,transparent_65%)]" />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.055) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(37,99,235,0.055) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 85% 75% at 55% 45%,black 25%,transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 55% 45%,black 25%,transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute bottom-0 left-0
        right-0 h-24
        bg-gradient-to-t from-[#020617] to-transparent"
        aria-hidden="true"
      />
    </>
  );
}

// --- Main export ----------------------------------------------------------

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const meshY = useTransform(scrollY, [0, 500], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#020617] min-h-[88vh]
        flex flex-col justify-center"
    >
      <HeroBackground scrollY={meshY} />

      <div className="relative z-10 mx-auto w-full max-w-6xl
        px-6 md:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16
          items-center">

          <div>
            <EyebrowPill />
            <Headline />
            <Subheadline />
            <CTAs />
            <TrustStrip />
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
