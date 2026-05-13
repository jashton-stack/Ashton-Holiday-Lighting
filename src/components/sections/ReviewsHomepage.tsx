import { Section, SectionEyebrow, SectionHeading, SectionLead } from '../ui/Section';
import { REVIEWS } from '../../data/reviews';
import { ReviewCard } from '../ui/ReviewCard';
import { SITE } from '../../lib/site';

export function ReviewsHomepage() {
  const homepageReviews = REVIEWS.slice(0, 3);
  return (
    <Section tone="light">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          <SectionEyebrow>What Omaha homeowners say</SectionEyebrow>
          <SectionHeading>Real reviews from real Omaha homes.</SectionHeading>
          <SectionLead>
            Verified Google reviews from neighbors we've installed for.
          </SectionLead>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-warmth tracking-wide text-lg">★★★★★</span>
          <span className="text-sm font-semibold">5.0 on Google</span>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8">
        {homepageReviews.map((r) => (
          <ReviewCard key={r.name} review={r} />
        ))}
      </div>

      <div className="mt-10">
        <a
          href={SITE.googleBusinessUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-bone-text hover:text-warmth-dark underline-offset-4 hover:underline"
        >
          Read more reviews on Google →
        </a>
      </div>
    </Section>
  );
}
