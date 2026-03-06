import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Sora } from "next/font/google";
import { Container } from "@/components/ui/Container";
import { PrimaryLink } from "@/components/ui/Buttons";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Jhon Fragozo | Brand Designer",
  description: "Sitio oficial con servicios, portafolio y cotizador para empresas en Colombia.",
};

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-mi", label: "Sobre mi" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/cotizador", label: "Cotizador" },
  { href: "/contacto", label: "Contacto" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${sora.variable}`}>
        <div id="app-shell" className="min-h-screen bg-[var(--base)] text-[var(--primary)]">
          <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
            <Container className="flex items-center justify-between py-4">
              <Link href="/" className="font-heading text-lg font-bold tracking-tight text-brand-primary">
                Jhon Fragozo
              </Link>
              <nav className="hidden items-center gap-6 md:flex">
                {navLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="text-small font-semibold text-brand-neutral transition hover:text-brand-accent">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <PrimaryLink href="/cotizador" className="px-4 py-2">
                Cotizar
              </PrimaryLink>
            </Container>
          </header>
          {children}
          <footer className="mt-16 bg-brand-primary py-10 text-brand-white">
            <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-heading text-xl font-bold text-brand-white">Jhon Fragozo</p>
                <p className="mt-1 text-small text-slate-200">Brand Designer | Branding estrategico para empresas</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-small">
                <Link href="/portafolio" className="text-slate-200 transition hover:text-brand-white">Portafolio</Link>
                <Link href="/contacto" className="text-slate-200 transition hover:text-brand-white">Contacto</Link>
                <a href="https://wa.me/573043195028" target="_blank" rel="noreferrer" className="text-slate-200 transition hover:text-brand-white">WhatsApp</a>
              </div>
            </Container>
          </footer>
        </div>
      </body>
    </html>
  );
}
