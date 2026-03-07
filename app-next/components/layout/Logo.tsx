import Link from "next/link";
import { brand } from "@/lib/constants/brand";
import { routes } from "@/lib/constants/routes";

export function Logo() {
  return (
    <Link href={routes.home} className="font-heading text-lg font-bold tracking-tight text-brand-primary">
      {brand.name}
    </Link>
  );
}
