import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';

export function AuctionsIframe() {
  const { t } = useLanguage();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Función para manipular el iframe después de que se cargue
  useEffect(() => {
    const iframe = iframeRef.current;
    
    if (iframe) {
      iframe.onload = function() {
        try {
          // Intento de acceder al iframe y manipular su contenido después de cargar
          if (iframe.contentDocument) {
            // Intentar ocultar elementos no deseados y ajustar el iframe para mostrar solo las máquinas
            const style = iframe.contentDocument.createElement('style');
            style.textContent = `
              /* Ocultar elementos innecesarios */
              header, 
              .main-header, 
              .navbar, 
              .page-header, 
              .banner, 
              .top-section,
              footer,
              .footer,
              #footer,
              body > div > div:last-child,
              body > footer,
              [class*="footer"],
              [class*="copyright"] { 
                display: none !important; 
              }
              
              /* Ajustes generales */
              body {
                padding-top: 0 !important;
                margin-top: 0 !important;
                padding-bottom: 0 !important;
                margin-bottom: 0 !important;
                overflow: hidden !important;
              }
              
              /* Ajustar contenedor principal */
              .auction-listing-container {
                padding-top: 0 !important;
                padding-bottom: 0 !important;
                margin-bottom: 0 !important;
              }
              
              /* Eliminar espacio inferior */
              .auction-listing {
                margin-bottom: 0 !important;
              }
              
              /* Título de Auctions y tabs */
              h1, h1 + div {
                display: none !important;
              }
              
              /* Ajustar margen superior de los elementos de subasta */
              .auction-catalog {
                margin-top: 10px !important;
              }
            `;
            iframe.contentDocument.head.appendChild(style);
            
            // Intentar observar cambios en el DOM para mantener el footer oculto
            const observer = new MutationObserver(function(mutations) {
              const footer = iframe.contentDocument?.querySelector('footer') || 
                             iframe.contentDocument?.querySelector('[class*="footer"]') || 
                             iframe.contentDocument?.querySelector('#footer');
              
              if (footer) {
                footer.style.display = 'none';
              }
            });
            
            observer.observe(iframe.contentDocument.body, {
              childList: true,
              subtree: true
            });
          }
        } catch (e) {
          console.log('No se pudo acceder al contenido del iframe debido a la política de seguridad del navegador');
        }
      };
    }
  }, []);
  
  return (
    <section className="py-12 bg-gray-900" id="subastas">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-block mb-4 rounded-full px-4 py-1.5 bg-primary/30 backdrop-blur-md text-white text-sm font-medium"
          >
            {t('auctions.liveAuctions')}
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t('auctions.upcomingAuctions')}
          </motion.h2>

          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('auctions.exploreAuctions')}
          </motion.p>
        </div>
        
        <motion.div 
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-3 border border-white/10 shadow-lg overflow-hidden max-w-5xl mx-auto"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-slate-100/5 backdrop-blur-sm p-4 flex items-center gap-3 rounded-t-2xl">
            <i className="fas fa-gavel text-white"></i>
            <h3 className="text-xl font-medium text-white">
              {t('auctions.upcomingEvents')}
            </h3>
          </div>
          
          <div className="rounded-b-2xl overflow-hidden bg-blue-900">
            <div className="relative w-full h-[600px] overflow-hidden">
              <iframe 
                ref={iframeRef}
                src="https://northcountry.auctiontechs.com/auction-catalog" 
                className="w-full h-full"
                style={{ 
                  border: 'none',
                  position: 'absolute',
                  top: -80, /* Desplazamiento negativo para ocultar la cabecera */
                  left: 0,
                  width: '100%',
                  height: 'calc(100% + 80px)' /* Compensar por el desplazamiento */
                }}
                title="North Country Auctions"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                scrolling="no"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}