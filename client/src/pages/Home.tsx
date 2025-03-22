import { AboutSection } from "@/components/home/AboutSection";
import { ActionCTA } from "@/components/home/ActionCTA";
import { ContactSection } from "@/components/home/ContactSection";
import { FeaturedAuctions } from "@/components/home/FeaturedAuctions";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CatalogSection } from "@/components/catalog/CatalogSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <FeaturedAuctions />
      <CatalogSection />
      <ActionCTA />
      <ContactSection />
    </>
  );
}
