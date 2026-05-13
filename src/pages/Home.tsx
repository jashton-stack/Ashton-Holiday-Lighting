import { Hero } from '../components/sections/Hero';
import { TrustBar } from '../components/sections/TrustBar';
import { WhyPermanent } from '../components/sections/WhyPermanent';
import { HowItWorks } from '../components/sections/HowItWorks';
import { PricingSection } from '../components/sections/PricingSection';
import { ReviewsHomepage } from '../components/sections/ReviewsHomepage';
import { Gallery } from '../components/sections/Gallery';
import { Comparison } from '../components/sections/Comparison';
import { FinalCTA } from '../components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Gallery />
      <TrustBar />
      <WhyPermanent />
      <HowItWorks />
      <PricingSection />
      <ReviewsHomepage />
      <Comparison />
      <FinalCTA />
    </>
  );
}
