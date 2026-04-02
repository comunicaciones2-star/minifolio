import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  narrow?: boolean;
  id?: string;
};

export function Section({ children, className, containerClassName, narrow = false, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-24 md:py-32 dark:border-b dark:border-white/5 dark:bg-[#0B1220]", className)}>
      <Container className={containerClassName} narrow={narrow}>
        {children}
      </Container>
    </section>
  );
}
