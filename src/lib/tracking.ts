declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer: unknown[];
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const GOOGLE_ADS_ID = 'AW-11038716571';
// Conversion labels are sent client-side (not secret). The real lead label is
// hardcoded as the default so the conversion fires on deploy without a Netlify
// env step; VITE_GADS_LEAD_LABEL still overrides it if set. Phone label stays
// env-only (no-op) until that conversion action is created in Google Ads.
const LEAD_LABEL =
  (import.meta.env.VITE_GADS_LEAD_LABEL as string | undefined) || 'iXlRCIjp-7QcEJvl1Y8p';
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
