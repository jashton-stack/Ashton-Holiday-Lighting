import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Full-viewport hero with a looping background video.
 *
 * Drop the assets into /public:
 *   - /hero.mp4         primary H.264 video (1920×1080)
 *   - /hero2.mp4        fallback source
 *   - /hero-poster.jpg  first frame, shown until the video can play
 *
 * Accessibility: respects prefers-reduced-motion (shows poster image
 * instead of autoplaying video), and the video is aria-hidden so screen
 * readers go straight to the headline.
 */
export function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden text-white bg-[#0B1F35] min-h-screen [min-height:100dvh]"
    >
      {/* Background media — fills viewport on every aspect ratio. */}
      {reduceMotion ? (
        <img
          src="/hero-poster.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <video
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
          <source src="/hero2.mp4" type="video/mp4" />
        </video>
      )}

      {/* Navy gradient overlay for headline legibility (55% top → 85% bottom). */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(11,31,53,0.55) 0%, rgba(11,31,53,0.85) 100%)',
        }}
      />

      {/* Content layer. Vertically centered; left-aligned on desktop,
          centered on mobile. */}
      <div className="relative z-10 flex min-h-screen [min-height:100dvh] items-center">
        <div className="container-x w-full">
          <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
            <p
              className="text-xs sm:text-sm font-semibold uppercase tracking-eyebrow text-[#FFE39A]/90"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              Omaha's Certified EverLights Dealer
            </p>

            <h1
              id="hero-heading"
              className="mt-5 text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tightish text-balance"
              style={{ textShadow: '0 2px 18px rgba(0,0,0,0.55)' }}
            >
              Permanent outdoor lighting. Installed once.{' '}
              <span className="text-[#FFE39A]">Controlled forever.</span>
            </h1>

            <p
              className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              App-controlled, weather-proof, 16 million colors. Engineered in
              the USA. Installed by a certified dealer in Omaha.
            </p>

            <div className="mt-10 flex flex-col items-center lg:items-start gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full px-10 py-5 text-base md:text-lg font-bold transition-colors duration-200 bg-[#00B8D9] text-[#0B1F35] hover:bg-[#00A0BD] active:bg-[#008CA8] shadow-[0_14px_44px_-12px_rgba(0,184,217,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00B8D9]"
              >
                Get Your Free Quote →
              </Link>
              <p
                className="mt-1 text-xs sm:text-sm text-white/65"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
              >
                Free design consultation · Written quote in 24 hours · No pressure
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
