import { CatalogSection } from "@/components/catalog/CatalogSection";
import { useEffect } from "react";

export default function Marketplace() {
  useEffect(() => {
    // Scroll al inicio cuando se carga Marketplace
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <CatalogSection />
    </div>
  );
}