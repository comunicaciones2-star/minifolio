import Link from "next/link";
import { mainNavigation } from "@/lib/constants/navigation";

export function Navigation() {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      {mainNavigation.map((item) => (
        <Link key={item.href} href={item.href} className="text-small font-semibold text-brand-neutral transition hover:text-brand-accent">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
