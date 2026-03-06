import type { Config } from "tailwindcss";

const config: Config = {
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
          white: "#FFFFFF",
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
      },
      fontSize: {
        h1: ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.08", fontWeight: "700" }],
        h2: ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.12", fontWeight: "700" }],
        h3: ["clamp(1.5rem, 2.4vw, 2rem)", { lineHeight: "1.2", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.7", fontWeight: "400" }],
        small: ["0.875rem", { lineHeight: "1.6", fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};

export default config;
