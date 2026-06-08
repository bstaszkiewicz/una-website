import { useLenis } from '@/hooks/useLenis';
import Navigation from '@/sections/Navigation';
import HeroSection from '@/sections/HeroSection';
import WhyNowSection from '@/sections/WhyNowSection';
import OfferingsSection from '@/sections/OfferingsSection';
import BenefitsSection from '@/sections/BenefitsSection';
import AudienceSection from '@/sections/AudienceSection';
import PartnersSection from '@/sections/PartnersSection';
import MediaSection from '@/sections/MediaSection';
import SocialSection from '@/sections/SocialSection';
import CTABanner from '@/sections/CTABanner';
import ClosingSection from '@/sections/ClosingSection';
import Footer from '@/sections/Footer';

export default function App() {
  useLenis();

  return (
    <div className="relative">
      <Navigation />
      <HeroSection />
      <WhyNowSection />
      <OfferingsSection />
      <BenefitsSection />
      <AudienceSection />
      <PartnersSection />
      <MediaSection />
      <SocialSection />
      <CTABanner />
      <ClosingSection />
      <Footer />
    </div>
  );
}
