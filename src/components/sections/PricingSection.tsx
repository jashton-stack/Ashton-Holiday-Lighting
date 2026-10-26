import { Section, SectionEyebrow, SectionHeading, SectionLead } from '../ui/Section';
import { PricingTable } from '../ui/PricingTable';
import { ButtonLink } from '../ui/Button';
import { GOVEE_PRICING_TIERS, GOVEE_PRICING_NOTE } from '../../lib/site';

export function PricingSection() {
  return (
    <Section tone="dark" id="pricing">
      <div className="max-w-2xl">
        <SectionEyebrow tone="dark">Pricing</SectionEyebrow>
        <SectionHeading className="text-textdark">Transparent pricing. No surprises.</SectionHeading>
        <SectionLead tone="dark">
          Premium permanent lighting, installed by a certified dealer. Here's where most
          Omaha homes land:
        </SectionLead>
      </div>

      <h3 className="mt-12 text-textdark text-2xl md:text-3xl font-bold tracking-tightish">EverLights</h3>
      <div className="mt-6">
        <PricingTable tone="dark" showDisclaimer={false} />
      </div>

      <h3 className="mt-14 text-textdark text-2xl md:text-3xl font-bold tracking-tightish">Govee</h3>
      <div className="mt-6">
        <PricingTable tone="dark" tiers={GOVEE_PRICING_TIERS} note={GOVEE_PRICING_NOTE} />
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <ButtonLink to="/contact" variant="primary">
          Get Your Custom Quote →
        </ButtonLink>
        <ButtonLink to="/pricing" variant="secondary">
          See what affects your price
        </ButtonLink>
      </div>
    </Section>
  );
}
