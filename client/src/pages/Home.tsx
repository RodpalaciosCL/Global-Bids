import { useEffect } from "react";
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
  useEffect(() => {
    // Check if there's a hash in the URL and scroll to that section
    const hash = window.location.hash;
    if (hash) {
      // Wait a bit for the page to render
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <ServicesSection />
      <BrandsSection />
      <CatalogSection />
      <AuctionsIframe />
      <ActionCTA />
      <SoporteSection />
      <ContactSection />
    </>
  );
}
