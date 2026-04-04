import { cn } from '@/lib/utils/cn';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

// Dimensiones que coinciden con viewBox="0 0 254 32" del SVG.
const W = 254;
const H = 32;

// NEXT_PUBLIC_BASE_PATH se inyecta en .env.production → '/minifolio'.
// En dev es '' (no se setea), lo que coincide con basePath: '' en next.config.ts.
// Usar <img> directamente evita que next/image omita el basePath en el export estático.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Logo({ className = '', variant = 'light' }: LogoProps) {
  if (variant === 'dark') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`${BASE}/logo/logo-white.svg`}
        alt="Logo Jhon Fragozo"
        width={W}
        height={H}
        className={cn('w-auto', className)}
      />
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE}/logo/Logo-black.svg`}
        alt="Logo Jhon Fragozo"
        width={W}
        height={H}
        className={cn('w-auto dark:hidden', className)}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE}/logo/logo-white.svg`}
        alt="Logo Jhon Fragozo"
        width={W}
        height={H}
        className={cn('hidden w-auto dark:block', className)}
      />
    </>
  );
}
