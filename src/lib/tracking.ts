declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GOOGLE_ADS_ID = 'AW-11038716571';
const LEAD_LABEL = import.meta.env.VITE_GADS_LEAD_LABEL as string | undefined;
const PHONE_LABEL = import.meta.env.VITE_GADS_PHONE_LABEL as string | undefined;

function fireConversion(label: string | undefined): void {
  if (typeof window === 'undefined' || !window.gtag || !label) return;
  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    value: 1.0,
    currency: 'USD',
  });
}

export function trackLeadSubmit(): void { fireConversion(LEAD_LABEL); }
export function trackPhoneClick(): void { fireConversion(PHONE_LABEL); }
