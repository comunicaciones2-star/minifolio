import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PrimaryLink } from "@/components/ui/Buttons";
import Logo from "@/components/layout/Logo";
import { Navigation } from "@/components/layout/Navigation";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ctaCopy } from "@/lib/constants/cta";
import { routes } from "@/lib/constants/routes";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/[0.07] dark:bg-surface-base/95">
      <Container className="flex items-center gap-4 py-3 md:py-4">
        <Link href={routes.home} aria-label="Ir al inicio" className="flex shrink-0 items-center">
          <Logo className="h-7 md:h-8" variant="light" />
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <Navigation />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href={routes.dashboard}
            className="hidden rounded-md px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-slate-400/75 transition-colors hover:text-slate-600 dark:text-white/30 dark:hover:text-white/60 lg:inline-flex"
            aria-label="Abrir dashboard"
          >
            Panel
          </Link>
          <ThemeToggle />
          <PrimaryLink
            href={routes.quote}
            className="hidden md:inline-flex"
          >
            {ctaCopy.primary}
          </PrimaryLink>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
