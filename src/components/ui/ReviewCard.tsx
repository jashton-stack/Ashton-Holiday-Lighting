import type { Review } from '../../data/reviews';
import { Card } from './Card';
import { Stars } from './Stars';

export function ReviewCard({ review, tone = 'light' }: { review: Review; tone?: 'light' | 'dark' }) {
  return (
    <Card tone={tone} className="flex flex-col gap-4 h-full">
      <Stars rating={review.rating} />
      <p className={tone === 'dark' ? 'text-textdark/90 leading-relaxed' : 'text-bone-text/90 leading-relaxed'}>
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="font-semibold">{review.name}</span>
        <span
          className="inline-flex items-center gap-2 text-xs font-medium"
          aria-label="Source: Google Review"
        >
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-sm border border-black/10 text-[10px] font-bold">
            <span className="bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">G</span>
          </span>
          <span className={tone === 'dark' ? 'text-textdark/60' : 'text-muted'}>{review.source}</span>
        </span>
      </div>
    </Card>
  );
}
