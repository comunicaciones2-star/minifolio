import Link from "next/link";
import { Container } from "@/components/ui/Container";
import Logo from "@/components/layout/Logo";
import { footerNavigation } from "@/lib/constants/navigation";
import { siteContent } from "@/lib/content/siteContent";

export function Footer() {
  return (
    <footer className="mt-16 bg-brand-primary py-10 text-brand-white">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo className="h-10 w-auto mb-2" variant="dark" />
          <p className="mt-1 text-small text-slate-200">{siteContent.footer.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-small">
          {footerNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-slate-200 transition hover:text-brand-white">
              {item.label}
            </Link>
          ))}
          <a href={brand.whatsappUrl} target="_blank" rel="noreferrer" className="text-slate-200 transition hover:text-brand-white">
            WhatsApp
          </a>
        </div>
      </Container>
    </footer>
  );
}
