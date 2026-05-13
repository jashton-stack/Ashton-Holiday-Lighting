/**
 * Shared handler for quote-form submissions.
 *
 * Same code path runs in:
 *   - Production: netlify/functions/submit-quote.ts (Netlify Function)
 *   - Dev:        a Vite middleware mounted at /.netlify/functions/submit-quote
 *
 * Architecture: validates the payload, then forwards it to a GoHighLevel
 * Inbound Webhook. The GHL workflow on the other end of that webhook is
 * responsible for creating the contact and texting Josiah — that automation
 * is configured in the GHL UI, not in this code.
 */

export type QuotePayload = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address?: string;
  footage?: string;
  stories?: string;
  timing?: string;
  notes?: string;
  source?: string;
  /** Honeypot — bots fill any visible field. We hide it via CSS; a value here = spam. */
  website?: string;
};

export type HandleQuoteResult =
  | { ok: true; forwarded: boolean; note?: string }
  | { ok: false; status: number; error: string };

const REQUIRED: Array<keyof QuotePayload> = ['firstName', 'lastName', 'phone', 'email', 'address'];

export async function handleQuote(input: unknown): Promise<HandleQuoteResult> {
  if (!input || typeof input !== 'object') {
    return { ok: false, status: 400, error: 'Request body must be JSON.' };
  }
  const body = input as QuotePayload;

  // Honeypot — silently succeed so bots don't learn.
  if (body.website && body.website.trim() !== '') {
    return { ok: true, forwarded: false, note: 'rejected (honeypot)' };
  }

  const missing = REQUIRED.filter((k) => {
    const v = body[k];
    return !v || String(v).trim() === '';
  });
  if (missing.length > 0) {
    return { ok: false, status: 400, error: `Missing required fields: ${missing.join(', ')}.` };
  }

  if (!isValidEmail(body.email)) {
    return { ok: false, status: 400, error: "That email doesn't look right. Mind checking it?" };
  }
  if (!isValidPhone(body.phone)) {
    return { ok: false, status: 400, error: 'Phone number should have at least 10 digits.' };
  }

  const webhookUrl = process.env.GHL_INBOUND_WEBHOOK_URL;
  if (!webhookUrl) {
    // Dev convenience: log and succeed so the form is testable without a real webhook.
    // In production, set GHL_INBOUND_WEBHOOK_URL — Netlify will use it automatically.
    console.warn(
      '[submit-quote] GHL_INBOUND_WEBHOOK_URL not set — payload logged but NOT forwarded.\n',
      JSON.stringify(redactForLog(body), null, 2),
    );
    return { ok: true, forwarded: false, note: 'webhook url not configured' };
  }

  const payload = buildOutboundPayload(body);

  let res: Response;
  try {
    res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('[submit-quote] network error reaching GHL:', err);
    return {
      ok: false,
      status: 502,
      error: "We couldn't reach our lead system. Please call or email us — sorry for the trouble.",
    };
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('[submit-quote] GHL webhook returned non-2xx:', res.status, text.slice(0, 500));
    return {
      ok: false,
      status: 502,
      error: "We couldn't save your request. Please call or email us — sorry for the trouble.",
    };
  }

  return { ok: true, forwarded: true };
}

function buildOutboundPayload(body: QuotePayload) {
  // Exclude honeypot before forwarding. Flatten + add timestamp/source for GHL.
  // GHL Inbound Webhooks key by exact field name, so keep these stable.
  return {
    firstName: trim(body.firstName),
    lastName: trim(body.lastName),
    fullName: `${trim(body.firstName)} ${trim(body.lastName)}`.trim(),
    phone: trim(body.phone),
    email: trim(body.email),
    address: trim(body.address),
    footage: trim(body.footage),
    stories: trim(body.stories),
    timing: trim(body.timing),
    notes: trim(body.notes),
    source: body.source || 'quote_request',
    submittedAt: new Date().toISOString(),
  };
}

function trim(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function isValidEmail(s?: string): boolean {
  if (!s) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());
}

function isValidPhone(s?: string): boolean {
  if (!s) return false;
  return s.replace(/\D/g, '').length >= 10;
}

function redactForLog(body: QuotePayload) {
  // Logs may end up in shared monitoring. Keep PII partial for debugging only.
  const mask = (s?: string) => (s ? `${s.slice(0, 2)}…(${s.length})` : '');
  return {
    firstName: body.firstName,
    lastName: body.lastName,
    phone: mask(body.phone),
    email: mask(body.email),
    address: mask(body.address),
    footage: body.footage,
    stories: body.stories,
    timing: body.timing,
    notesPresent: !!body.notes,
    source: body.source,
  };
}
