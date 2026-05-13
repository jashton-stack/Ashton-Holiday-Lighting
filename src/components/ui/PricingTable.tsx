import { PRICING_TIERS, PRICING_DISCLAIMER } from '../../lib/site';
import { cn } from '../../lib/cn';

export function PricingTable({ tone = 'dark' }: { tone?: 'light' | 'dark' }) {
  const isDark = tone === 'dark';
  return (
    <div className="w-full">
      <div className={cn(
        'overflow-hidden rounded-2xl border',
        isDark ? 'border-white/10 bg-ink-surface' : 'border-black/10 bg-white',
      )}>
        <div className={cn(
          'hidden md:grid grid-cols-[1.4fr_1fr_1fr] gap-4 px-6 py-4 text-xs uppercase tracking-eyebrow',
          isDark ? 'text-textdark/55 border-b border-white/10' : 'text-muted border-b border-black/10',
        )}>
          <span>Home size</span>
          <span>Linear feet</span>
          <span className="text-right md:text-right">Starting price</span>
        </div>
        <ul className={cn('divide-y', isDark ? 'divide-white/10' : 'divide-black/10')}>
          {PRICING_TIERS.map((tier) => (
            <li
              key={tier.size}
              className={cn(
                'grid md:grid-cols-[1.4fr_1fr_1fr] gap-2 md:gap-4 px-6 py-5 items-baseline',
                tier.highlight && (isDark ? 'bg-warmth/[0.06]' : 'bg-warmth/[0.10]'),
              )}
            >
              <div>
                <div className="font-semibold flex items-center gap-3">
                  {tier.size}
                  {tier.highlight && (
                    <span className="inline-block text-[10px] uppercase tracking-eyebrow font-bold text-ink bg-warmth rounded-full px-2 py-0.5">
                      Most common
                    </span>
                  )}
                </div>
                <div className={cn('md:hidden text-sm mt-1', isDark ? 'text-textdark/60' : 'text-muted')}>
                  {tier.footage}
                </div>
              </div>
              <div className={cn('hidden md:block', isDark ? 'text-textdark/75' : 'text-muted')}>
                {tier.footage}
              </div>
              <div className="md:text-right font-semibold text-base md:text-lg">{tier.price}</div>
            </li>
          ))}
        </ul>
      </div>
      <p className={cn(
        'mt-5 text-sm leading-relaxed max-w-3xl',
        isDark ? 'text-textdark/70' : 'text-muted',
      )}>
        <em>{PRICING_DISCLAIMER}</em>
      </p>
    </div>
  );
}
