import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BenefitsSection } from "@/components/home/benefits-section";
import { CTASection } from "@/components/home/cta-section";
import { FeaturesHighlight } from "@/components/home/features-highlight";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <HeroSection />
      <FeaturesHighlight />
      <BenefitsSection />
      <CTASection />

      <Footer />
    </div>
  );
}
