import { Section, SectionEyebrow, SectionHeading, SectionLead } from '../components/ui/Section';
import { ButtonLink } from '../components/ui/Button';
import { ReviewCard } from '../components/ui/ReviewCard';
import { REVIEWS } from '../data/reviews';
import { SITE } from '../lib/site';

export default function Install() {
  return (
    <>
      <div className="pt-24 lg:pt-28">
        <Section tone="light">
          <div className="max-w-3xl">
            <SectionEyebrow>How it works</SectionEyebrow>
            <SectionHeading>
              Quality installs. Real warranty. Lights you'll actually use all year.
            </SectionHeading>
            <SectionLead>
              {`I've personally installed permanent lighting on ${SITE.homesLit} homes
               across Nebraska — here's what that experience gets you.`}
            </SectionLead>
          </div>

          <div className="mt-12 max-w-3xl space-y-6 text-lg leading-relaxed text-bone-text/90">
            <p>
              Every install is custom-fit to your home. I measure your roofline,
              cut the aluminum track to match each run, and tuck it cleanly under
              your eaves so the system disappears during the day. Wires get routed
              out of sight. Cleanup is part of the job — when I leave, the only
              thing different about your house is that it can light up at sunset.
              That attention to detail is the difference between a lighting system
              that looks crisp for years and one that starts looking sloppy after
              the first storm.
            </p>
            <p>
              Every install comes with a 5-year product warranty and a 1-year
              labor warranty, and you'll have my direct number for anything that
              comes up. The EverLights system itself is what makes this fun all
              year — 16 million colors, schedulable from your phone, with zone
              control so the front of the house can do one thing while the side
              does another. Halloween orange. Christmas red and green. Husker red
              on game day. Red, white, and blue for July 4th. Birthdays,
              anniversaries, daily accent — once you're installed, you're
              controlling all of it from the app on the couch.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink to="/contact" variant="primary">
              Get a free quote
            </ButtonLink>
            <ButtonLink to="/pricing" variant="secondary" className="border-black/15 text-bone-text hover:bg-black/[0.04]">
              See pricing
            </ButtonLink>
          </div>
        </Section>

        <Section tone="light" className="bg-white">
          <div className="max-w-2xl">
            <SectionEyebrow>Invisible by day</SectionEyebrow>
            <SectionHeading>You won't see it until sunset.</SectionHeading>
            <SectionLead>
              Color-matched aluminum track tucks tight against the underside of
              your soffit. From the street, the system disappears completely
              during the day.
            </SectionLead>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6 lg:gap-10">
            <figure>
              <div className="overflow-hidden rounded-2xl border border-black/10 bg-ink/90">
                <img
                  src="/images/install-day-stone.jpg"
                  alt="Daytime view of an Ashton Holiday Lighting install on a stone-and-timber home. The aluminum track is tucked along the white soffit edge and reads as clean trim — the lighting system is invisible from this distance."
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  width={1075}
                  height={1800}
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted">
                From a normal viewing distance, the track tucks tight under the
                soffit and reads as clean trim. The system disappears.
              </figcaption>
            </figure>

            <figure>
              <div className="overflow-hidden rounded-2xl border border-black/10 bg-ink/90">
                <img
                  src="/images/install-day-soffit.jpg"
                  alt="Close-up of a single LED module sitting flush against a color-matched soffit, with aluminum track running cleanly along the soffit edge."
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  width={1800}
                  height={2400}
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted">
                Up close, you can see one of the individual LED modules — the
                track is color-matched to your soffit so it reads as trim, not
                hardware.
              </figcaption>
            </figure>
          </div>
        </Section>

        <Section tone="light">
          <div className="max-w-2xl">
            <SectionEyebrow>What homeowners say</SectionEyebrow>
            <SectionHeading>On-time. Detailed. Done right.</SectionHeading>
            <SectionLead>
              Verified Google reviews from neighbors we've installed for.
            </SectionLead>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8">
            {REVIEWS.slice(0, 3).map((r) => (
              <ReviewCard key={r.name} review={r} />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
