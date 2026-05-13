import { Section, SectionEyebrow, SectionHeading, SectionLead } from '../ui/Section';

const FEATURES: { label: string; us: boolean; them: boolean }[] = [
  { label: 'CREE LEDs rated for 50,000 hours',         us: true,  them: false },
  { label: 'Patented LightLock fasteners',             us: true,  them: false },
  { label: 'Gold-bonded wires (corrosion resistant)',  us: true,  them: false },
  { label: 'Engineered + assembled in the USA',        us: true,  them: false },
  { label: 'Lights face out — classic outline look',   us: true,  them: false },
  { label: '16M colors, schedulable, zone-controllable', us: true, them: true },
  { label: '5-year warranty (certified dealer install)', us: true, them: false },
];

function Check() {
  return (
    <span aria-label="Yes" className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-warmth/15 text-warmth-dark font-bold">
      ✓
    </span>
  );
}
function Dash() {
  return (
    <span aria-label="Not included" className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/[0.05] text-muted">
      —
    </span>
  );
}

export function Comparison() {
  return (
    <Section tone="light">
      <div className="max-w-2xl">
        <SectionEyebrow>Why EverLights</SectionEyebrow>
        <SectionHeading>Not all permanent lighting is built the same.</SectionHeading>
        <SectionLead>
          Here's what separates EverLights from generic competitors and DIY-grade
          systems sold online.
        </SectionLead>
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-black/10 bg-white">
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 px-6 py-4 border-b border-black/10 text-xs uppercase tracking-eyebrow text-muted">
          <span>Feature</span>
          <span className="text-center font-bold text-ink">EverLights (us)</span>
          <span className="text-center">Generic competitor</span>
        </div>
        <ul className="divide-y divide-black/[0.07]">
          {FEATURES.map((f) => (
            <li
              key={f.label}
              className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 px-6 py-4 items-center"
            >
              <span className="text-sm md:text-base">{f.label}</span>
              <span className="flex justify-center">{f.us ? <Check /> : <Dash />}</span>
              <span className="flex justify-center">{f.them ? <Check /> : <Dash />}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
