import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRegistration } from '@/contexts/RegistrationContext';

export function AuctionsIframe() {
  const { t } = useLanguage();
  const { openForm } = useRegistration();
  
  // Apertura del formulario de registro
  const handleRegister = () => {
    openForm();
  };
  
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
        
        {/* Panel de próximas subastas */}
        <div className="h-hero"> 
          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-lg overflow-hidden max-w-lg md:max-w-md lg:max-w-lg xl:max-w-md mx-auto"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Cabecera con título e ícono */}
            <div className="flex items-center gap-2 p-4">
              <i className="fas fa-gavel text-white"></i>
              <h3 className="text-lg font-medium text-white">
                {t('auctions.upcomingEvents')}
              </h3>
            </div>
            
            {/* Contenido del panel de subastas */}
            <div className="bg-blue-900 p-6 rounded-b-2xl">
              <div className="text-center mb-6">
                <h3 className="text-xl font-medium text-white mb-3">{t('auctions.upcomingEvents')}</h3>
              </div>
              
              {/* Detalle de la subasta */}
              <div className="mx-auto max-w-xs">
                <div className="text-white text-left">
                  <div className="font-medium">{t('auctions.miningAssets')}</div>
                  <div className="text-sm mt-1">15 {t('hero.day')}</div>
                  <div className="text-sm mt-1">45 {t('hero.lots')}</div>
                </div>
                
                {/* Botón de registro */}
                <div className="mt-3 text-right">
                  <button 
                    onClick={handleRegister} 
                    className="bg-slate-800 hover:bg-slate-700 text-white text-sm py-1.5 px-4 rounded-full"
                  >
                    {t('auctions.register')}
                  </button>
                </div>
              </div>
              
              {/* Enlace para ver todas las subastas */}
              <div className="mt-6 flex justify-center">
                <a 
                  href="https://northcountry.auctiontechs.com/auctions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white text-sm hover:underline"
                >
                  <i className="fas fa-external-link-alt"></i>
                  {t('hero.viewAll')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}