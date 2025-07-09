import { useEffect } from "react";
import { useLocation } from "wouter";

export function ScrollToHash() {
  const [location] = useLocation();
  
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    
    // Dale tiempo a que React pinte la sección
    setTimeout(() => {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // offset para header fijo de 80px
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  }, [location]);
  
  return null;
}