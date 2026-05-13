import { Section, SectionEyebrow, SectionHeading, SectionLead } from '../ui/Section';
import { ButtonLink } from '../ui/Button';

const STEPS = [
  { title: 'Free consultation', body: 'In-home or virtual, 30 minutes.' },
  { title: 'Custom design + quote', body: 'Within 24 hours of your consultation.' },
  { title: 'Install day', body: 'Typically completed in one day.' },
  { title: 'Lights live forever', body: "App setup, walkthrough, you're in control." },
];

export function HowItWorks() {
  return (
    <Section tone="light" className="bg-white">
      <div className="max-w-2xl">
        <SectionEyebrow>How it works</SectionEyebrow>
        <SectionHeading>From first call to lights on — usually under two weeks.</SectionHeading>
        <SectionLead>
          A simple, straightforward process. No high-pressure sales, no surprise fees,
          no extended timelines.
        </SectionLead>
      </div>

      <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative">
            <div className="rounded-2xl border border-black/5 bg-bone p-7 h-full">
              <div className="text-4xl font-extrabold text-warmth-dark tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </div>
            {i < STEPS.length - 1 && (
              <div
                aria-hidden
                className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-black/15"
              />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-12 flex justify-center">
        <ButtonLink to="/install" variant="on-light">
          See the full install process →
        </ButtonLink>
      </div>
    </Section>
  );
}
