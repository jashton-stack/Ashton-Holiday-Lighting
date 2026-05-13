import { Section, SectionHeading, SectionLead } from '../components/ui/Section';
import { ButtonLink } from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="pt-24 lg:pt-28">
      <Section tone="light">
        <p className="eyebrow text-warmth-dark mb-3">404</p>
        <SectionHeading>This page didn't make it on the truck.</SectionHeading>
        <SectionLead>
          The page you're looking for doesn't exist, but everything you need to get a
          quote is one click away.
        </SectionLead>
        <div className="mt-10 flex gap-3">
          <ButtonLink to="/" variant="on-light">Back to home</ButtonLink>
          <ButtonLink to="/contact" variant="primary">Get a free quote</ButtonLink>
        </div>
      </Section>
    </div>
  );
}
