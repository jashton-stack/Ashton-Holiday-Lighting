import { Section, SectionEyebrow, SectionHeading, SectionLead } from '../ui/Section';
import { PricingTable } from '../ui/PricingTable';
import { ButtonLink } from '../ui/Button';

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

      <div className="mt-12">
        <PricingTable tone="dark" />
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
