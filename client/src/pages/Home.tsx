import { AboutSection } from "@/components/home/AboutSection";
import { ActionCTA } from "@/components/home/ActionCTA";
import { ActivosSection } from "@/components/home/ActivosSection";
import { BrandsSection } from "@/components/home/BrandsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { EventosSection } from "@/components/home/EventosSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SoporteSection } from "@/components/home/SoporteSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TechSection } from "@/components/home/TechSection";
import { CatalogSection } from "@/components/catalog/CatalogSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ActivosSection />
      <BrandsSection />
      <EventosSection />
      <TechSection />
      <StatsSection />
      <CatalogSection />
      <SoporteSection />
      <ActionCTA />
      <ContactSection />
    </>
  );
}
