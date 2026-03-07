import { Container } from "@/components/ui/Container";
import { PrimaryLink } from "@/components/ui/Buttons";
import { Logo } from "@/components/layout/Logo";
import { Navigation } from "@/components/layout/Navigation";
import { routes } from "@/lib/constants/routes";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Logo />
        <Navigation />
        <PrimaryLink href={routes.quote} className="px-4 py-2">
          Cotizar
        </PrimaryLink>
      </Container>
    </header>
  );
}
