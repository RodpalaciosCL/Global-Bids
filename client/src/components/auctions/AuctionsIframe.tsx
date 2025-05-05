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
            // Intentar ocultar elementos no deseados via CSS
            const style = iframe.contentDocument.createElement('style');
            style.textContent = `
              header, .main-header, .navbar, .page-header, .footer, .banner, .top-section { 
                display: none !important; 
              }
              body {
                padding-top: 0 !important;
                margin-top: 0 !important;
              }
              .auction-listing-container {
                padding-top: 0 !important;
              }
            `;
            iframe.contentDocument.head.appendChild(style);
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
                src="https://northcountry.auctiontechs.com/auctions" 
                className="w-full h-full"
                style={{ 
                  border: 'none',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
                title="North Country Auctions"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}