import { Section, SectionEyebrow, SectionHeading, SectionLead } from '../components/ui/Section';
import { REVIEWS } from '../data/reviews';
import { ReviewCard } from '../components/ui/ReviewCard';
import { SITE } from '../lib/site';

export default function Reviews() {
  return (
    <div className="pt-24 lg:pt-28">
      <Section tone="light">
        <SectionEyebrow>Reviews</SectionEyebrow>
        <SectionHeading>5.0 ★★★★★ — Verified Google Reviews</SectionHeading>
        <SectionLead>
          What Omaha-area homeowners have said after their permanent lighting install.
        </SectionLead>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.name} review={r} />
          ))}
        </div>

        <div className="mt-12">
          <a
            href={SITE.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold underline-offset-4 hover:underline"
          >
            Want to see the latest? Read all our reviews on Google →
          </a>
        </div>
      </Section>
    </div>
  );
}
