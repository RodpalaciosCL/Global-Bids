import { AboutSection } from "@/components/home/AboutSection";
import { ActionCTA } from "@/components/home/ActionCTA";
import { BrandsSection } from "@/components/home/BrandsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SoporteSection } from "@/components/home/SoporteSection";

import { TimelineSection } from "@/components/home/TimelineSection";
import { CatalogSection } from "@/components/catalog/CatalogSection";
import { AuctionsIframe } from "@/components/auctions/AuctionsIframe";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <ServicesSection />
      <BrandsSection />

      <CatalogSection />
      <AuctionsIframe />
      <SoporteSection />
      <ActionCTA />
      <ContactSection />
    </>
  );
}
