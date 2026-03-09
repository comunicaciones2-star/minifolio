
import { Container } from "@/components/ui/Container";
import { PrimaryLink } from "@/components/ui/Buttons";
import Logo from "@/components/layout/Logo";
import { Navigation } from "@/components/layout/Navigation";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { routes } from "@/lib/constants/routes";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        {/* Logo siempre visible a la izquierda */}
        <Logo className="h-10 w-auto" variant="light" />
        {/* Navegación desktop */}
        <Navigation />
        {/* CTA Cotizar siempre visible en desktop, visible en mobile a la derecha */}
        <div className="flex items-center gap-2">
          <PrimaryLink href={routes.quote} className="hidden px-4 py-2 md:inline-flex">
            Cotizar
          </PrimaryLink>
          {/* Menú mobile: visible solo en mobile */}
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
