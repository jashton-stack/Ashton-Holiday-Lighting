import { useState } from 'react';
import { cn } from '../../lib/cn';

export type AccordionItem = {
  q: string;
  a: string;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-black/10 rounded-2xl bg-white border border-black/5">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left hover:bg-black/[0.02] focus:outline-none focus-visible:bg-black/[0.03]"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-base md:text-lg pr-4">{item.q}</span>
              <span
                aria-hidden="true"
                className={cn(
                  'shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full border border-black/15 text-base font-bold transition-transform',
                  isOpen && 'rotate-45',
                )}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 -mt-1 text-muted leading-relaxed max-w-3xl">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
