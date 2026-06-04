import { useState, type FormEvent } from 'react';
import { Section, SectionEyebrow, SectionHeading, SectionLead } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { PhoneLink } from '../components/ui/PhoneLink';
import { SITE } from '../lib/site';
import { trackLeadSubmit } from '../lib/tracking';
import { trackLead } from '../lib/fbq';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    (payload as Record<string, unknown>).source = 'quote_request';

    try {
      const res = await fetch('/.netlify/functions/submit-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res
        .json()
        .catch(() => ({ ok: false, error: `Server returned ${res.status}.` }))) as {
        ok: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || `Server returned ${res.status}.`);
      }
      // Confirmed server-side success only — fires the Google Ads lead conversion
      // and the Meta Pixel Lead event.
      trackLeadSubmit();
      trackLead();
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong sending your request. Please call or email us directly.",
      );
    }
  }

  return (
    <div className="pt-24 lg:pt-28">
      <Section tone="light">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <SectionEyebrow>Get a quote</SectionEyebrow>
            <SectionHeading>Get your free quote</SectionHeading>
            <SectionLead>
              Tell us about your home. We'll respond within 24 hours with next steps
              and a written quote.
            </SectionLead>

            <div className="mt-10 space-y-5 text-sm">
              <div>
                <p className="eyebrow text-muted mb-1">Phone</p>
                <PhoneLink className="text-bone-text font-semibold text-lg hover:text-warmth-dark">
                  {SITE.phone}
                </PhoneLink>
              </div>
              <div>
                <p className="eyebrow text-muted mb-1">Email</p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-bone-text font-semibold hover:text-warmth-dark break-all"
                >
                  {SITE.email}
                </a>
              </div>
              <div>
                <p className="eyebrow text-muted mb-1">Service area</p>
                <p className="text-bone-text font-medium">{SITE.serviceArea}</p>
                <p className="text-muted">{SITE.cities.join(' · ')}</p>
              </div>
              <p className="text-xs text-muted">We respond within 24 hours during business days.</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            {status === 'success' ? (
              <div className="rounded-2xl bg-white border border-black/5 p-8">
                <h3 className="text-2xl font-bold">Quote request sent.</h3>
                <p className="mt-3 text-muted">
                  Thanks — we'll be in touch within 24 hours with your written quote
                  and next steps.
                </p>
              </div>
            ) : (
              <form
                className="rounded-2xl bg-white border border-black/5 p-6 md:p-8 space-y-5"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Honeypot — invisible to humans, bots fill every field. */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] w-px h-px overflow-hidden"
                >
                  <label>
                    Website
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First name" name="firstName" required />
                  <Field label="Last name" name="lastName" required />
                  <Field label="Phone" name="phone" type="tel" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <Field
                  label="Property address (street + city)"
                  name="address"
                  required
                  placeholder="123 Maple St, Omaha"
                />
                <div>
                  <SelectField
                    label="Approximate linear footage"
                    name="footage"
                    options={[
                      { value: '', label: 'Not sure — measure for me' },
                      { value: '100', label: '~100 ft' },
                      { value: '150', label: '~150 ft' },
                      { value: '200', label: '~200 ft' },
                      { value: '250', label: '~250 ft' },
                    ]}
                  />
                  <p className="-mt-3 text-xs text-muted">
                    Don't know? Leave this on "Not sure" — we'll measure for you.
                  </p>
                </div>

                <RadioGroup
                  label="Number of stories"
                  name="stories"
                  options={['1', '2', '3+']}
                />
                <RadioGroup
                  label="When are you hoping to install?"
                  name="timing"
                  options={['1–3 weeks', '1–3 months', '3–6 months', 'Just exploring']}
                />

                <TextArea label="Anything else?" name="notes" rows={4} />

                <Button type="submit" variant="primary" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : 'Send My Quote Request'}
                </Button>
                {status === 'error' && (
                  <p className="text-sm text-red-600">{error ?? 'Something went wrong.'}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-eyebrow text-muted mb-1.5">
        {label}{required && <span aria-hidden className="text-warmth-dark"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-base text-bone-text placeholder:text-muted/70 focus:border-warmth focus:ring-2 focus:ring-warmth/30 focus:outline-none"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-eyebrow text-muted mb-1.5">
        {label}{required && <span aria-hidden className="text-warmth-dark"> *</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-base text-bone-text focus:border-warmth focus:ring-2 focus:ring-warmth/30 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

function TextArea({
  label,
  name,
  rows = 3,
}: { label: string; name: string; rows?: number }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-eyebrow text-muted mb-1.5">
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-base text-bone-text focus:border-warmth focus:ring-2 focus:ring-warmth/30 focus:outline-none"
      />
    </label>
  );
}

function RadioGroup({
  label,
  name,
  options,
}: { label: string; name: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="block text-xs font-semibold uppercase tracking-eyebrow text-muted mb-2">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt} className="cursor-pointer">
            <input type="radio" name={name} value={opt} className="peer sr-only" />
            <span className="inline-flex items-center rounded-full border border-black/15 bg-white px-4 py-2 text-sm text-bone-text peer-checked:bg-ink peer-checked:text-textdark peer-checked:border-ink hover:border-black/30">
              {opt}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
