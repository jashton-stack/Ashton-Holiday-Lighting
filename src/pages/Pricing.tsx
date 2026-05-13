import { Section, SectionEyebrow, SectionHeading, SectionLead } from '../components/ui/Section';
import { PricingTable } from '../components/ui/PricingTable';
import { ButtonLink } from '../components/ui/Button';
import { SITE } from '../lib/site';

const AFFECTS = [
  { title: 'Linear footage', body: "The single biggest driver. Bigger roofline = more material, more LEDs, more time." },
  { title: 'Peaks and gables', body: 'Every peak is a cut, a corner, and a careful run. Complex rooflines take longer.' },
  { title: 'Height', body: 'Two-story homes and tall gables may require lifts or extension ladders.' },
  { title: 'Power supply location', body: 'Long runs may need multiple controllers to balance current properly.' },
  { title: 'Custom requests', body: 'Zone control, multiple controllers, accent runs around windows or trees.' },
];

const INCLUDED = [
  'Free in-home design consultation',
  'Custom-sized EverLights system',
  'Professional installation',
  'App setup and walkthrough',
  '5-year product warranty',
  '1-year labor warranty',
  'All cleanup',
];

export default function Pricing() {
  return (
    <div className="pt-24 lg:pt-28">
      {/* Top: heading + table */}
      <Section tone="light">
        <div className="max-w-3xl">
          <SectionEyebrow>Pricing</SectionEyebrow>
          <SectionHeading>
            Transparent pricing. Free quote in 24 hours.
          </SectionHeading>
          <SectionLead>
            We don't hide our pricing behind a phone call. Most Omaha homes land in
            one of these tiers — final pricing is custom-quoted after a free
            consultation.
          </SectionLead>
        </div>
        <div className="mt-12">
          <PricingTable tone="light" />
        </div>
      </Section>

      {/* What affects your final price */}
      <Section tone="light" className="bg-white">
        <div className="max-w-2xl">
          <SectionEyebrow>Final pricing</SectionEyebrow>
          <SectionHeading>What affects your final price</SectionHeading>
          <SectionLead>
            Five things move the number up or down. We'll walk through them with you
            on your consultation.
          </SectionLead>
        </div>
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AFFECTS.map((a) => (
            <li key={a.title} className="rounded-2xl border border-black/5 bg-bone p-6">
              <h3 className="text-lg font-bold">{a.title}</h3>
              <p className="mt-2 text-muted">{a.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* What's always included */}
      <Section tone="light">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionEyebrow>Always included</SectionEyebrow>
            <SectionHeading>What's always included</SectionHeading>
            <SectionLead>
              No add-on charges for the basics. Every quote includes everything below
              by default.
            </SectionLead>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl bg-white border border-black/5 px-4 py-3"
              >
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-warmth/15 text-warmth-dark font-bold text-sm shrink-0"
                >
                  ✓
                </span>
                <span className="text-bone-text font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Why we're priced where we are */}
      <Section tone="dark">
        <div className="max-w-3xl">
          <SectionEyebrow tone="dark">Why we're priced where we are</SectionEyebrow>
          <SectionHeading className="text-textdark">
            Not the cheapest in Omaha. Built to last longer than the cheapest.
          </SectionHeading>
        </div>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-textdark/85">
          We're a certified EverLights dealer with {SITE.yearsExperience} years
          of permanent lighting installs and {SITE.homesLit} Nebraska homes lit.
          EverLights is one of the most premium permanent lighting systems on
          the market — CREE LEDs, gold-bonded wires, aluminum track, engineered
          in the U.S. — and we back every install with a 5-year warranty because
          they're built to last 5+ years. If price is the only factor for you,
          we're probably not the right fit, and we'll tell you that upfront. If
          you want it done right the first time, get a free quote.
        </p>
        <div className="mt-10">
          <ButtonLink to="/contact" variant="primary">
            Get Your Free Quote →
          </ButtonLink>
        </div>
      </Section>
    </div>
  );
}
