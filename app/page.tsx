
import PublicHeader from "@/components/layout/public-header";
import PublicFooter from "@/components/layout/public-footer";

import HeroSection from "@/features/home/components/hero-section";
import StatsSection from "@/features/home/components/stats-section";
import ProcessSection from "@/features/home/components/process-section";
import FeaturesSection from "@/features/home/components/features-section";
import CTASection from "@/features/home/components/cta-section";

export default function HomePage() {
  return (
    <>
      <PublicHeader />

      <main>
        <HeroSection />
        <StatsSection />
        <ProcessSection />
        <FeaturesSection />
        <CTASection />
      </main>

      <PublicFooter />
    </>
  );
}
