import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BenefitsSection } from "@/components/home/benefits-section";
import { CTASection } from "@/components/home/cta-section";
import { FeaturesHighlight } from "@/components/home/features-highlight";
import { HeroSection } from "@/components/home/hero-section";
import { PartnersSection } from "@/components/home/partners-section";
import { RecentContent } from "@/components/home/recent-content";
import { ServicesSection } from "@/components/home/services-section";
import { StakeholdersSection } from "@/components/home/stakeholders-section";
import { StatsSection } from "@/components/home/stats-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <HeroSection />
      <PartnersSection />
      <ServicesSection />
      <FeaturesHighlight />
      <StakeholdersSection />
      <BenefitsSection />
      <TestimonialsSection />
      <RecentContent />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
