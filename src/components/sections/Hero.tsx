import { ButtonLink } from '../ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink text-textdark">
      {/* Backdrop image placeholder — replace with /public/images/hero-dusk-house.jpg */}
      <div className="absolute inset-0">
        {/* PLACEHOLDER: Dusk shot of an installed home with permanent lighting on, warm
            color tones, slight ambient glow. Aspect ratio 16:9 or wider, ~2400px wide.
            Save to /public/images/hero-dusk-house.jpg and uncomment the <img>. */}
        {/*
        <img
          src="/images/hero-dusk-house.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        */}
        {/* Procedural fallback so the layout looks complete before the real photo lands */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,#3a1f0e_0%,#1a0d06_45%,#000_85%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_92%,rgba(245,182,66,0.28)_0%,transparent_45%)]" />
        <div
          aria-hidden
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[8%] rounded-full blur-3xl opacity-60 bg-warmth/40"
        />
        {/* Top vignette for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink/95" />
      </div>

      <div className="relative container-x flex flex-col items-center text-center pt-40 pb-28 lg:pt-48 lg:pb-32 min-h-screen justify-center">
        <p className="eyebrow text-warmth animate-fade-up" style={{ animationDelay: '60ms' }}>
          {`Omaha's Certified EverLights Dealer`}
        </p>

        <h1
          className="mt-6 text-[42px] leading-[1.05] sm:text-5xl lg:text-7xl font-extrabold tracking-tightish max-w-4xl text-balance animate-fade-up"
          style={{ animationDelay: '160ms' }}
        >
          Permanent outdoor lighting.{' '}
          <span className="block sm:inline">Installed once.</span>{' '}
          <span className="animate-color-cycle inline-block">Controlled forever.</span>
        </h1>

        <p
          className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-textdark/80 leading-relaxed animate-fade-up"
          style={{ animationDelay: '260ms' }}
        >
          App-controlled, weather-proof, 16 million colors. Engineered in the USA.
          Installed by a certified dealer in Omaha.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 animate-fade-up" style={{ animationDelay: '380ms' }}>
          <ButtonLink to="/contact" variant="primary">
            Get Your Free Quote →
          </ButtonLink>
          <p className="text-xs sm:text-sm text-textdark/55 mt-2">
            Free design consultation · Written quote in 24 hours · No pressure
          </p>
        </div>
      </div>

      {/* subtle scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-textdark/40 text-xs uppercase tracking-eyebrow hidden md:block">
        Scroll
      </div>
    </section>
  );
}
