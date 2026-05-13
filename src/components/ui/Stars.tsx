export function Stars({ rating = 5, className }: { rating?: number; className?: string }) {
  return (
    <div className={className} aria-label={`${rating} out of 5 stars`}>
      <span className="text-warmth tracking-wide select-none" aria-hidden="true">
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
      </span>
    </div>
  );
}
