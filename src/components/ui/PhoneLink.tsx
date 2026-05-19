import type { ReactNode } from 'react';
import { SITE } from '../../lib/site';
import { trackPhoneClick } from '../../lib/tracking';

/**
 * Anchor to the business phone number that fires the Google Ads phone-call
 * conversion on every click. Use this instead of a raw <a href="tel:..."> so
 * call conversions are tracked consistently everywhere.
 */
export function PhoneLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={SITE.phoneHref}
      className={className}
      onClick={() => trackPhoneClick()}
    >
      {children}
    </a>
  );
}
