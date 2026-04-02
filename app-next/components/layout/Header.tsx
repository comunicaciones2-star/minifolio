import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PrimaryLink } from "@/components/ui/Buttons";
import Logo from "@/components/layout/Logo";
import { Navigation } from "@/components/layout/Navigation";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { routes } from "@/lib/constants/routes";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/[0.07] dark:bg-surface-base/95">
      <Container className="flex items-center gap-4 py-3 md:py-4">
        <Link href={routes.home} aria-label="Ir al inicio" className="shrink-0">
          <Logo className="h-10 w-auto" variant="light" />
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <Navigation />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <PrimaryLink
            href={routes.quote}
            className="
              hidden md:inline-flex
              px-5 py-2.5
              rounded-xl
              bg-blue-600 text-white
              font-medium
              shadow-sm

              transition-all duration-200 ease-out

              hover:bg-blue-700
              hover:shadow-lg
              hover:scale-[1.02]

              active:scale-[0.98]
              active:shadow-md

              focus:outline-none
              focus:ring-2
              focus:ring-blue-400
              focus:ring-offset-2
            "
          >
            Cotizar proyecto
          </PrimaryLink>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
