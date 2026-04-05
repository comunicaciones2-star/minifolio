import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0F172A",
          accent: "#2563EB",
          neutral: "#334155",
          muted: "#64748b",
          white: "#FFFFFF",
        },
        surface: {
          base:     "#020617",
          section:  "#0B1220",
          card:     "#111827",
          elevated: "#1f2937",
        },
      },
      borderRadius: {
        sm: "10px",
        md: "14px",
        lg: "20px",
        xl: "28px",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(15, 23, 42, 0.08)",
        card: "0 12px 30px rgba(15, 23, 42, 0.10)",
      },
      maxWidth: {
        content: "1200px",
        narrow: "880px",
      },
      fontFamily: {
        heading: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-sora)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter: "-0.02em",
        tight: "-0.015em",
        snug: "-0.01em",
        normal: "0em",
        wide: "0.02em",
        wider: "0.06em",
        widest: "0.1em",
      },
      fontSize: {
        // Escala editorial premium — Vercel/Stripe style
        h1: ["clamp(2rem, 4vw, 3.75rem)",  { lineHeight: "1.1",  letterSpacing: "-0.02em",  fontWeight: "600" }],
        h2: ["clamp(1.625rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "600" }],
        h3: ["clamp(1.25rem, 2vw, 1.75rem)",  { lineHeight: "1.25", letterSpacing: "-0.01em",  fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75", fontWeight: "400" }],
        body:      ["1rem",     { lineHeight: "1.7",  fontWeight: "400" }],
        small:     ["0.875rem", { lineHeight: "1.6",  fontWeight: "500" }],
        caption:   ["0.75rem",  { lineHeight: "1.5",  letterSpacing: "0.01em", fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};

export default config;
