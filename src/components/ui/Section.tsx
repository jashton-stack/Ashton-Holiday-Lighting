import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Tone = 'dark' | 'light' | 'transparent';

export function Section({
  tone = 'light',
  className,
  children,
  id,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const toneClass =
    tone === 'dark' ? 'surface-dark'
    : tone === 'light' ? 'surface-light'
    : '';
  return (
    <section id={id} className={cn('section', toneClass, className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionEyebrow({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <p className={cn('eyebrow mb-4', tone === 'dark' ? 'text-warmth' : 'text-warmth-dark')}>
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn('text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tightish', className)}>
      {children}
    </h2>
  );
}

export function SectionLead({
  children,
  className,
  tone = 'light',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <p
      className={cn(
        'mt-4 text-lg md:text-xl max-w-2xl',
        tone === 'dark' ? 'text-textdark/75' : 'text-muted',
        className,
      )}
    >
      {children}
    </p>
  );
}
