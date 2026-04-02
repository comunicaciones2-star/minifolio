import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

// Dimensiones que coinciden exactamente con viewBox="0 0 254 32" del SVG.
// next/image usa estos valores para el aspect-ratio intrínseco del elemento.
// La altura visual real la controla el className (ej. h-7) vía CSS.
const W = 254;
const H = 32;

export default function Logo({ className = '', variant = 'light' }: LogoProps) {
  if (variant === 'dark') {
    return (
      <Image
        src="/logo/logo-white.svg"
        alt="Logo Jhon Fragozo"
        width={W}
        height={H}
        className={cn('w-auto', className)}
        priority
      />
    );
  }

  return (
    <>
      <Image
        src="/logo/Logo-black.svg"
        alt="Logo Jhon Fragozo"
        width={W}
        height={H}
        className={cn('w-auto dark:hidden', className)}
        priority
      />
      <Image
        src="/logo/logo-white.svg"
        alt="Logo Jhon Fragozo"
        width={W}
        height={H}
        className={cn('hidden w-auto dark:block', className)}
        priority
      />
    </>
  );
}
