import Hero from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ValuePropositionSection } from "@/components/sections/ValuePropositionSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { DigitalSolutionsSection } from "@/components/sections/DigitalSolutionsSection";
import { QuoteCTASection } from "@/components/sections/QuoteCTASection";
import { AboutCredentialsSection } from "@/components/sections/AboutCredentialsSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export function HomePageSections() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ValuePropositionSection />
      <ServicesSection />
      <FeaturedProjectsSection />
      <ProcessSection />
      <DigitalSolutionsSection />
      <QuoteCTASection />
      <AboutCredentialsSection />
      <FinalCTASection />
    </>
  );
}
