import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Card({
  tone = 'light',
  className,
  children,
}: {
  tone?: 'light' | 'dark';
  className?: string;
  children: ReactNode;
}) {
  const base =
    tone === 'dark'
      ? 'bg-ink-surface border border-white/10 text-textdark'
      : 'bg-white border border-black/5 text-bone-text';
  return (
    <div className={cn('rounded-2xl p-6 md:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]', base, className)}>
      {children}
    </div>
  );
}
