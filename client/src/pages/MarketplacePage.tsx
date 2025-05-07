import { CatalogSection } from "@/components/catalog/CatalogSection";
import { useEffect } from "react";

export default function MarketplacePage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="pt-16">
      <CatalogSection />
    </div>
  );
}