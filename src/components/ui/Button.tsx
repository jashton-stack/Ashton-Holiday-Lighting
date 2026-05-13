import { Link } from 'react-router-dom';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'on-light';

type ButtonBaseProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

function variantClass(variant: Variant): string {
  switch (variant) {
    case 'secondary': return 'btn-secondary';
    case 'on-light': return 'btn-on-light';
    case 'primary':
    default: return 'btn-primary';
  }
}

export function ButtonLink({
  to,
  variant = 'primary',
  className,
  children,
  ...rest
}: ButtonBaseProps & { to: string } & Omit<ComponentProps<typeof Link>, 'to' | 'className' | 'children'>) {
  return (
    <Link to={to} className={cn(variantClass(variant), className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...rest
}: ButtonBaseProps & Omit<ComponentProps<'button'>, 'className' | 'children'>) {
  return (
    <button className={cn(variantClass(variant), className)} {...rest}>
      {children}
    </button>
  );
}
