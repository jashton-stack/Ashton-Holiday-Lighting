import { Section, SectionEyebrow, SectionHeading, SectionLead } from '../components/ui/Section';
import { ButtonLink } from '../components/ui/Button';
import { PhoneLink } from '../components/ui/PhoneLink';
import { SITE } from '../lib/site';

export default function About() {
  return (
    <div className="pt-24 lg:pt-28">
      {/* Top intro */}
      <Section tone="light">
        <div className="max-w-3xl">
          <SectionEyebrow>About</SectionEyebrow>
          <SectionHeading>
            {SITE.homesLit} Nebraska homes lit. One at a time. Done right.
          </SectionHeading>
          <SectionLead>
            {`I'm ${SITE.ownerFirstName} — owner and installer of Ashton Holiday
             Lighting. I've spent the last ${SITE.yearsExperience} years installing
             permanent lighting on homes across Nebraska, and I run every job
             personally.`}
          </SectionLead>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            <Stat value={SITE.homesLit} label="Nebraska homes lit" />
            <Stat value={`${SITE.yearsExperience} yrs`} label="Lighting installs" />
            <Stat value="5/5" label="Google rating" />
          </div>
        </div>
      </Section>

      {/* Story */}
      <Section tone="light" className="bg-white">
        <div className="max-w-3xl">
          <SectionEyebrow>The story</SectionEyebrow>
          <SectionHeading>Why I started Ashton Holiday Lighting</SectionHeading>
        </div>
        <div className="mt-10 max-w-3xl space-y-6 text-lg leading-relaxed text-bone-text/90">
          <p>
            I got into lighting because I was tired of watching homeowners spend
            every November on a ladder. The first time I saw a permanent system
            up close, I knew this was the right product to build a business
            around — install it once, and you're set for every holiday and every
            game day for the next decade.
          </p>
          <p>
            {`After two years of installing permanent lighting across Nebraska — ${SITE.homesLit} homes
             later — I knew I wanted to build this business around the best
             system on the market. I'd seen up close which systems hold up and
             which start failing after a couple winters. EverLights doesn't cut
             corners: CREE LEDs, gold-bonded wires, aluminum track, engineered
             in the U.S. So I went through certification, and EverLights is what
             I install today.`}
          </p>
          <p>
            My mission is simple: serve Omaha and the surrounding metro
            hands-on, with a premium product, done right the first time. No
            high-pressure sales. No vanishing after the install. You have my
            direct number forever.
          </p>
        </div>
      </Section>

      {/* Background */}
      <Section tone="light">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <SectionEyebrow>Background</SectionEyebrow>
            <SectionHeading>Before lighting</SectionHeading>
            <SectionLead>
              Building things, working with my hands, and obsessing over how
              things are made has been the through-line my whole career.
            </SectionLead>
          </div>
          <div className="lg:col-span-3 space-y-4">
            <BackgroundCard
              role="Professional Carpenter"
              years="4 years"
              detail="Built custom cabinetry at Moyer Cabinets, and built scenic sets and theatrical installations at Heartland Scenic Studio — both in Omaha. Learned how to measure twice, cut clean, and stand behind work that's going to be seen up close."
            />
            <BackgroundCard
              role="Welder"
              years="2 years"
              detail="Two years of welding work that translated directly to the patience and precision a permanent install demands — anything that goes on a roof needs to be done once and done right."
            />
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <SectionEyebrow tone="dark">Get in touch</SectionEyebrow>
          <SectionHeading className="text-textdark">
            Want to talk about your home?
          </SectionHeading>
          <p className="mt-5 text-textdark/75 text-lg max-w-xl">
            Reach out — I'll come out for a free consultation, measure your
            roofline, and send a written quote within 24 hours.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink to="/contact" variant="primary">
            Get your free quote →
          </ButtonLink>
          <PhoneLink className="btn-secondary">
            Call {SITE.phone}
          </PhoneLink>
        </div>
      </Section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-extrabold tracking-tightish text-bone-text">{value}</div>
      <div className="text-xs uppercase tracking-eyebrow text-muted mt-1">{label}</div>
    </div>
  );
}

function BackgroundCard({ role, years, detail }: { role: string; years: string; detail: string }) {
  return (
    <div className="rounded-2xl bg-white border border-black/5 p-6 md:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg md:text-xl font-bold">{role}</h3>
        <span className="text-sm font-semibold text-warmth-dark">{years}</span>
      </div>
      <p className="mt-3 text-muted leading-relaxed">{detail}</p>
    </div>
  );
}
