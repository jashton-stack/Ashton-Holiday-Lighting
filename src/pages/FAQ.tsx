import { Section, SectionEyebrow, SectionHeading, SectionLead } from '../components/ui/Section';
import { Accordion, type AccordionItem } from '../components/ui/Accordion';
import { ButtonLink } from '../components/ui/Button';

const FAQS: AccordionItem[] = [
  { q: 'How long does installation take?',
    a: 'Generally 1–2 days for homes depending on size and complexity. Commercial buildings are more custom and can take more time.' },
  { q: 'What if my home has gables, dormers, or two stories?',
    a: "All handled. Multi-story homes and complex rooflines are covered in your free consultation — we'll give you an exact quote based on your specific home." },
  { q: 'Are the lights really invisible during the day?',
    a: "Yes. We use color-matched aluminum track that tucks under your eaves. From the street, you won't see anything until they come on at sunset." },
  { q: 'Can I control different sections of the house separately?',
    a: 'Yes. Zone control is built in — light up just the front for game day, or split your colors between sections.' },
  { q: "What's the warranty?",
    a: '5-year product warranty on the EverLights system + 1-year labor warranty on our install. You have my direct number for anything that comes up.' },
  { q: 'What does it cost?',
    a: 'Most Omaha homes land between $3,199 (small home) and $7,949 (two-story with gables). Larger or commercial properties are custom-quoted. Final pricing depends on linear footage, peaks, gables, height, and complexity — we send a written quote within 24 hours of your free consultation.' },
  { q: 'How is EverLights different from Trimlight or JellyFish?',
    a: 'EverLights uses CREE LEDs and gold-bonded wires, with the lights facing out for a classic, clean outline look. All three are quality systems — we install EverLights because we believe it has the best long-term reliability.' },
  { q: 'Can I use them for things other than Christmas?',
    a: "Yes — that's the point. Halloween orange, July 4th red/white/blue, Husker red, Easter pastels, daily accent lighting, birthdays, anniversaries. 16 million colors, schedulable." },
  { q: 'Do they affect my electric bill?',
    a: 'Negligibly. EverLights uses ultra-efficient LEDs. Running them every night still costs less than $5–10/month for most homes.' },
  { q: 'What happens if a light goes out?',
    a: "Individual LED modules are field-replaceable under warranty. I'll come out and swap it for free during the warranty period." },
  { q: 'Do you install on commercial buildings?',
    a: "Yes. Commercial installs are custom-quoted. Reach out and we'll discuss your project." },
  { q: "What's your service area?",
    a: 'Omaha metro within 25 miles — Omaha, Council Bluffs, Bellevue, Papillion, La Vista, Gretna, Bennington, and surrounding. Farther out by case-by-case arrangement.' },
];

export default function FAQ() {
  return (
    <div className="pt-24 lg:pt-28">
      <Section tone="light">
        <div className="max-w-2xl">
          <SectionEyebrow>Frequently asked</SectionEyebrow>
          <SectionHeading>Questions, answered.</SectionHeading>
          <SectionLead>
            Don't see your question here?{' '}
            <span className="text-bone-text">Reach out and we'll answer it personally.</span>
          </SectionLead>
        </div>
        <div className="mt-12 max-w-4xl">
          <Accordion items={FAQS} />
        </div>
        <div className="mt-12">
          <ButtonLink to="/contact" variant="primary">Get your free quote</ButtonLink>
        </div>
      </Section>
    </div>
  );
}
