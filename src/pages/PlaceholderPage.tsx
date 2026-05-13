import { Section, SectionEyebrow, SectionHeading, SectionLead } from '../components/ui/Section';
import { ButtonLink } from '../components/ui/Button';

export default function PlaceholderPage({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <>
      <div className="pt-24 lg:pt-28">
        <Section tone="light">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <SectionHeading>{title}</SectionHeading>
          <SectionLead>{lead}</SectionLead>
          <div className="mt-10">
            <ButtonLink to="/contact" variant="on-light">
              Get a free quote
            </ButtonLink>
          </div>
          <p className="mt-12 text-sm text-muted">
            This page is being built. Full content is on the way.
          </p>
        </Section>
      </div>
    </>
  );
}
