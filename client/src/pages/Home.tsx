import { AboutSection } from "@/components/home/AboutSection";

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
      <section id="inicio">
        <HeroSection />
      </section>
      <section id="nosotros">
        <AboutSection />
        <TimelineSection />
      </section>
      <section id="servicios">
        <ServicesSection />
        <BrandsSection />
      </section>
      <section id="subastas">
        <AuctionsIframe />
      </section>
      <section id="catalogo">
        <CatalogSection />
      </section>
      <section id="soporte">
        <SoporteSection />
      </section>
      <section id="contacto">
        <ContactSection />
      </section>
    </>
  );
}
