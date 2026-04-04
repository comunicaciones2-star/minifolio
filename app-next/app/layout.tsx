import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteContent } from "@/lib/content/siteContent";
import { brand } from "@/lib/constants/brand";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sora = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const BASE_URL = "https://comunicaciones2-star.github.io/minifolio";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: brand.name,
  jobTitle: brand.title,
  description: "Brand Designer especializado en branding estratégico, identidad visual y diseño web para empresas en Colombia.",
  url: BASE_URL,
  email: "hola@jhonfragozo.com",
  telephone: "+573043195028",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CO",
  },
  sameAs: [brand.whatsappUrl],
  knowsAbout: ["Branding", "Identidad Visual", "Diseño Gráfico", "Diseño Web", "Estrategia de Marca"],
};

export const metadata: Metadata = {
  title: {
    default: siteContent.metadata.title,
    template: `%s | ${brand.name}`,
  },
  description: siteContent.metadata.description,
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: BASE_URL,
    siteName: brand.name,
    title: siteContent.metadata.title,
    description: siteContent.metadata.description,
  },
  twitter: {
    card: "summary",
    title: siteContent.metadata.title,
    description: siteContent.metadata.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        ) : null}
      </head>
      <body className={`${inter.variable} ${sora.variable}`}>
        <div id="app-shell" className="min-h-screen bg-[var(--base)] text-[var(--primary)] transition-colors duration-300">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
