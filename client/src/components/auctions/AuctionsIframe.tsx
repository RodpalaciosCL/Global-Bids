import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';

export function AuctionsIframe() {
  return (
    <section className="py-12 bg-gray-900" id="subastas">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Próximos Eventos de Subastas
          </motion.h2>

          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Explore nuestros eventos exclusivos con maquinaria pesada y equipamiento industrial de las mejores marcas
          </motion.p>
        </div>
        
        <motion.div 
          className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden max-w-5xl mx-auto"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Iframe directo a la página de subastas */}
          <div className="relative pt-0 pb-[56.25%] h-0 overflow-hidden">
            <iframe 
              src="https://northcountry.auctiontechs.com/auctions" 
              className="absolute top-0 left-0 w-full h-full border-0" 
              style={{ minHeight: '600px' }}
              title="North Country Auctions"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}