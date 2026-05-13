import { useEffect, useRef, useState } from 'react';
import { SectionEyebrow, SectionHeading, SectionLead } from '../ui/Section';
import { cn } from '../../lib/cn';
import { GALLERY, type GalleryPhoto, type GalleryCategory } from '../../data/gallery';

/**
 * Two horizontally-scrolling carousels (Residential, Commercial). Each slide
 * has a uniform 3:2 aspect ratio and is sized to fill most of the viewport
 * (capped at 1100px on large screens). Native CSS scroll-snap handles the
 * snapping; swipe works on touch, wheel/trackpad horizontal scroll works on
 * laptops, and the prev/next buttons cover desktop mouse users.
 */
export function Gallery() {
  return (
    <section className="surface-darker-card py-20 lg:py-28 overflow-hidden">
      <div className="container-x">
        <SectionEyebrow tone="dark">Gallery</SectionEyebrow>
        <SectionHeading className="text-textdark">
          What EverLights looks like, installed.
        </SectionHeading>
        <SectionLead tone="dark">
          Real examples of EverLights — on homes and on commercial buildings.
        </SectionLead>
      </div>

      <CarouselGroup category="residential" title="Residential" className="mt-14 lg:mt-16" />
      <CarouselGroup category="commercial"  title="Commercial"  className="mt-16 lg:mt-20" />
    </section>
  );
}

function CarouselGroup({
  category,
  title,
  className,
}: {
  category: GalleryCategory;
  title: string;
  className?: string;
}) {
  const photos = GALLERY.filter((p) => p.category === category);
  if (photos.length === 0) return null;

  return (
    <div className={className}>
      <div className="container-x">
        <h3 className="text-textdark text-2xl md:text-3xl font-bold tracking-tightish">
          {title}
        </h3>
      </div>
      <ScrollCarousel photos={photos} categoryLabel={title} />
    </div>
  );
}

function ScrollCarousel({
  photos,
  categoryLabel,
}: {
  photos: GalleryPhoto[];
  categoryLabel: string;
}) {
  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Recompute prev/next availability when the scroller scrolls or resizes.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [photos.length]);

  function scrollByOneSlide(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const firstSlide = el.querySelector<HTMLLIElement>('li');
    const slideWidth = firstSlide?.clientWidth ?? el.clientWidth * 0.85;
    el.scrollBy({ left: direction * (slideWidth + 16), behavior: 'smooth' });
  }

  return (
    <div className="relative mt-6 group">
      <ul
        ref={scrollerRef}
        className={cn(
          'flex gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth',
          'scrollbar-hidden',
          // Inner horizontal padding so the first/last slides have breathing room
          // matching the container gutter.
          'px-6 lg:px-8',
        )}
        // scroll-padding so snapping leaves the same gutter on the leading edge
        style={{ scrollPaddingInline: '1.5rem' }}
      >
        {photos.map((p, i) => (
          <li
            key={`${p.src}`}
            className="shrink-0 snap-start"
            style={{ width: 'min(85vw, 1100px)' }}
          >
            <figure
              className="relative overflow-hidden rounded-2xl bg-ink shadow-[0_18px_60px_-20px_rgba(0,0,0,0.7)]"
              style={{ aspectRatio: '3 / 2' }}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </figure>
          </li>
        ))}
      </ul>

      <NavButton
        dir="prev"
        onClick={() => scrollByOneSlide(-1)}
        disabled={!canPrev}
        label={`Previous ${categoryLabel} photo`}
      />
      <NavButton
        dir="next"
        onClick={() => scrollByOneSlide(1)}
        disabled={!canNext}
        label={`Next ${categoryLabel} photo`}
      />
    </div>
  );
}

function NavButton({
  dir,
  onClick,
  disabled,
  label,
}: {
  dir: 'prev' | 'next';
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'hidden md:flex absolute top-1/2 -translate-y-1/2 z-10',
        'w-12 h-12 rounded-full bg-white/95 text-ink shadow-xl',
        'items-center justify-center text-2xl font-bold leading-none pb-1',
        'transition-all duration-200',
        'hover:bg-white hover:scale-105',
        'disabled:opacity-0 disabled:pointer-events-none',
        'opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
        dir === 'prev' ? 'left-3 lg:left-6' : 'right-3 lg:right-6',
      )}
    >
      {dir === 'prev' ? '‹' : '›'}
    </button>
  );
}
