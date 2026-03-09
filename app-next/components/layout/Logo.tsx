import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = '', variant = 'light' }: LogoProps) {
  return (
    <Image
      src={variant === 'dark' ? '/logo/logo-white.svg' : '/logo/Logo-black.svg'}
      alt="Logo"
      width={140}
      height={40}
      className={className}
      priority
    />
  );
}
