const BADGES = [
  'Certified EverLights Dealer',
  '50+ Nebraska Homes Lit',
  'Engineered in the USA',
  '5-Year Warranty',
];

export function TrustBar() {
  return (
    <section className="bg-ink-surface text-textdark border-y border-white/[0.06]">
      <div className="container-x py-6 lg:py-7 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center md:text-left">
        {BADGES.map((b) => (
          <div key={b} className="flex items-center justify-center md:justify-start gap-3">
            <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-warmth" />
            <span className="text-xs sm:text-sm font-medium text-textdark/85">{b}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
