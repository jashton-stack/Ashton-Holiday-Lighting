import { ButtonLink } from '../ui/Button';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink text-textdark">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(245,182,66,0.18),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(61,217,214,0.10),transparent_55%)]" />
      </div>
      <div className="relative container-x py-24 lg:py-32 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tightish max-w-3xl mx-auto text-balance">
          Ready to stop hanging Christmas lights?
        </h2>
        <p className="mt-5 text-lg md:text-xl text-textdark/75 max-w-2xl mx-auto">
          Free quote in 24 hours. No high-pressure sales. Just a fair price for a permanent solution.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3">
          <ButtonLink to="/contact" variant="primary" className="text-base px-8 py-4">
            Get Your Free Quote →
          </ButtonLink>
          <p className="text-xs text-textdark/50">Serving the Omaha metro within 25 miles.</p>
        </div>
      </div>
    </section>
  );
}
