import { SupportHero } from "@/components/support/SupportHero";
import { SupportStats } from "@/components/support/SupportStats";
import { FAQSection } from "@/components/support/FAQSection";

export default function SupportPage() {
  return (
    <main className="flex-1">
      <SupportHero />
      <SupportStats />
      <FAQSection />
    </main>
  );
}
