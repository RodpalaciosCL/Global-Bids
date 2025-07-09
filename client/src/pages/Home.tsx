import { useEffect } from "react";
import { useLocation } from "wouter";
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
  const [location] = useLocation();

  useEffect(() => {
    // Extrae la parte tras el '#'
    const [, hash] = location.split("#");
    if (hash) {
      // Dale al navegador un tick para montar contenido
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          // Scroll suave y nativo con offset correcto
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 80;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight + 10;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);

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
      <section id="soporte">
        <SoporteSection />
      </section>
      <section id="marketplace">
        <CatalogSection />
      </section>
      <section id="contacto">
        <ContactSection />
      </section>
    </>
  );
}
