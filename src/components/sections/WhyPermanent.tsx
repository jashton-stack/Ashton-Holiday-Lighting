import { Section, SectionEyebrow, SectionHeading, SectionLead } from '../ui/Section';

type Pillar = { title: string; body: string };

const PILLARS: Pillar[] = [
  {
    title: 'Install Once',
    body:
      '30 years of climbing ladders ends today. Installed in one day, controlled forever from your phone.',
  },
  {
    title: 'Every Holiday, Every Game Day',
    body:
      '16 million colors, schedulable. Halloween orange, Christmas red and green, Husker red, daily accent.',
  },
  {
    title: 'Engineered to Last',
    body:
      'CREE LEDs rated for 50,000 hours. Gold-bonded wires. Aluminum track. Built in the U.S.',
  },
];

export function WhyPermanent() {
  return (
    <Section tone="light">
      <div className="max-w-2xl">
        <SectionEyebrow>Why permanent EverLights</SectionEyebrow>
        <SectionHeading>Built to outlast every holiday you'll celebrate in this home.</SectionHeading>
        <SectionLead>
          One install. Every season covered. The product, the install, and the
          warranty are all engineered for the long term.
        </SectionLead>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
        {PILLARS.map((p, i) => (
          <div
            key={p.title}
            className="rounded-2xl border border-black/5 bg-white p-8 hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-ink text-warmth font-bold text-sm"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-bold">{p.title}</h3>
            </div>
            <p className="mt-4 text-muted leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
