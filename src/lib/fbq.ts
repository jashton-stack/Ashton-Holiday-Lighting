/**
 * Meta Pixel Lead event helper.
 *
 * Fires a `Lead` event with a generated eventID. The eventID is returned so
 * it can later be forwarded to Zapier / the Meta Conversions API for
 * server-side deduplication; it is unused for now.
 *
 * Window.fbq is declared in src/lib/tracking.ts alongside the gtag types.
 */
export function trackLead(): string {
  const eventID =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {}, { eventID });
  }

  return eventID;
}
