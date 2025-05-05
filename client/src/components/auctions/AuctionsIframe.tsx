import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRegistration } from '@/contexts/RegistrationContext';

export function AuctionsIframe() {
  const { t, language } = useLanguage();
  const { openForm } = useRegistration();
  
  // Función para registrarse en una subasta
  const handleRegister = () => {
    openForm();
  }
  
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
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-4 border border-white/10 shadow-lg overflow-hidden max-w-5xl mx-auto"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Contenedor con desplazamiento personalizado para mostrar subastas */}
          <div className="relative w-full h-[500px] md:h-[700px] rounded-2xl overflow-hidden">
            {/* Diseño personalizado que evita las franjas problemáticas */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950 rounded-2xl p-5"
            >
              <div className="w-full max-w-3xl bg-slate-800 rounded-lg p-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{t('auctions.miningAssets')}</h3>
                    <div className="bg-primary/20 text-white text-sm rounded-full px-3 py-1 inline-block mb-2">
                      15 {t('hero.day')}
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      {t('auctions.heavyMachineryDesc')}
                    </p>
                    <div className="flex gap-4 mt-3">
                      <button 
                        onClick={handleRegister}
                        className="bg-primary hover:bg-primary/90 transition text-white rounded-full px-5 py-2 text-sm font-medium"
                      >
                        {t('auctions.registerNow')}
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 transition text-white rounded-full px-5 py-2 text-sm font-medium">
                        {t('auctions.moreInfo')}
                      </button>
                    </div>
                  </div>
                  <div className="col-span-1 bg-blue-900/30 rounded-lg p-3 border border-blue-800/50">
                    <div className="text-sm text-white font-medium mb-2">{t('auctions.heavyMachinery')}</div>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex justify-between">
                        <span>CAT 336 {t('type.excavator')}</span>
                        <span>2019</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Komatsu WA500 {t('type.loader')}</span>
                        <span>2020</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Hitachi ZX490 {t('type.excavator')}</span>
                        <span>2018</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Volvo A60H {t('type.truck')}</span>
                        <span>2021</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="w-full max-w-3xl mt-6">
                <div className="text-lg font-medium text-white mb-3">{t('auctions.upcomingEvents')}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 hover:bg-white/10 transition rounded-lg p-4 cursor-pointer border border-white/10">
                    <div className="text-white font-bold">{t('auctions.forestryAssets')}</div>
                    <div className="text-sm text-gray-300">30 {t('hero.day')}</div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-primary-300">75 {t('hero.lots')}</span>
                      <span className="text-xs text-gray-400">{t('auctions.openForRegistration')}</span>
                    </div>
                  </div>
                  <div className="bg-white/5 hover:bg-white/10 transition rounded-lg p-4 cursor-pointer border border-white/10">
                    <div className="text-white font-bold">{t('auctions.industrialParts')}</div>
                    <div className="text-sm text-gray-300">45 {t('hero.day')}</div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-primary-300">120+ {t('hero.lots')}</span>
                      <span className="text-xs text-gray-400">{t('auctions.comingSoon')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <a 
                href="https://northcountry.auctiontechs.com/auctions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 bg-primary/90 hover:bg-primary transition text-white rounded-full px-8 py-3 text-sm font-medium"
              >
                {t('hero.viewAll')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}