import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Este hook actualiza el atributo lang del documento HTML
 * en base al idioma seleccionado en el contexto
 */
export function useHtmlLang(): void {
  const { language } = useLanguage();
  
  useEffect(() => {
    // Actualizar el atributo lang del documento HTML
    document.documentElement.lang = language;
    
    // También podemos actualizar el título según el idioma
    document.title = language === 'es' 
      ? 'Global Bids - Marketplace y Subastas de Maquinaria Pesada'
      : 'Global Bids - Heavy Machinery Auctions & Marketplace';
      
  }, [language]);
}