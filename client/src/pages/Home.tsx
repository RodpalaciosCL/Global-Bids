import { AboutSection } from "@/components/home/AboutSection";
import { ActionCTA } from "@/components/home/ActionCTA";
import { BrandsSection } from "@/components/home/BrandsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { FeaturedAuctions } from "@/components/home/FeaturedAuctions";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CatalogSection } from "@/components/catalog/CatalogSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BrandsSection />
      <StatsSection />
      <FeaturedAuctions />
      <CatalogSection />
      <ActionCTA />
      <ContactSection />
    </>
  );
}
