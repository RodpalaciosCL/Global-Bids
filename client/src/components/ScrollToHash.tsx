import { useEffect } from "react";
import { useLocation } from "wouter";

export function ScrollToHash() {
  const [location] = useLocation();
  
  useEffect(() => {
    console.log("ScrollToHash triggered, location:", location);
    console.log("Current hash:", window.location.hash);
    
    const hash = window.location.hash;
    if (!hash) {
      // Si no hay hash y estamos en la raíz, scroll al top
      if (location === '/') {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    
    // Dale tiempo a que React pinte la sección
    setTimeout(() => {
      const id = hash.replace("#", "");
      console.log("Looking for element with id:", id);
      const el = document.getElementById(id);
      
      if (el) {
        console.log("Element found, scrolling to:", el);
        // offset para header fijo de 80px
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else {
        console.log("Element not found with id:", id);
        // Lista todos los elementos con ID para debug
        const allIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id);
        console.log("Available IDs on page:", allIds);
      }
    }, 100);
  }, [location]);
  
  return null;
}