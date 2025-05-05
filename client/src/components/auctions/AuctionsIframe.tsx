import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';

export function AuctionsIframe() {
  const { t, language } = useLanguage();
  
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
            {language === 'es' ? 'SUBASTAS EN VIVO' : 'LIVE AUCTIONS'}
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {language === 'es' 
              ? 'North Country Auction' 
              : 'North Country Auction'}
          </motion.h2>

          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {language === 'es'
              ? 'Explore las subastas en vivo de nuestro socio North Country Auction. Vea equipos, herramientas y activos disponibles para remate.'
              : 'Explore live auctions from our partner North Country Auction. View equipment, tools and assets available for auction.'}
          </motion.p>
        </div>
        
        <motion.div 
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-4 border border-white/10 shadow-lg overflow-hidden"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="aspect-video w-full rounded-2xl overflow-hidden">
            <iframe 
              src="https://northcountry.auctiontechs.com/" 
              className="w-full h-full"
              style={{ border: 'none' }}
              title="North Country Auction"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-8 text-center"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a 
            href="https://northcountry.auctiontechs.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-full transition-colors"
          >
            <i className="fas fa-external-link-alt mr-2"></i>
            {language === 'es' ? 'Abrir en nueva ventana' : 'Open in new window'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}