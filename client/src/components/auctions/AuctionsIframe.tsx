import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { openRegistrationForm } from '@/components/home/RegistrationForm';

// Subastas dinámicas basadas en las imágenes reales proporcionadas
const AUCTION_DATA = [
  {
    id: 1,
    title: "DAY 1 - DIGHTON SPRING AUCTION",
    date: "05-09-2025 09:00:00 AM EDT",
    type: "Webcast Auction",
    location: "1892 County St, Dighton, Massachusetts, United States, 02715",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction-admin/1917/85594361742569925.jpg",
    url: "https://northcountry.auctiontechs.com/auctions/detail/id/16290/",
  },
  {
    id: 2,
    title: "DAY 2 - DIGHTON SPRING AUCTION",
    date: "05-10-2025 09:00:00 AM EDT",
    type: "Webcast Auction",
    location: "1892 County St, Dighton, Massachusetts, United States, 02715",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction-admin/1918/13082973631742570022.jpg",
    url: "https://northcountry.auctiontechs.com/auctions/detail/id/16291/",
  },
  {
    id: 3,
    title: "GRAND OPENING OF EASTERN PANHANDLE WV CONTRACTORS AUCTION",
    date: "05-14-2025 09:00:00 AM EDT",
    type: "Webcast Auction",
    location: "743 W King St, Martinsburg, West Virginia, United States, 25401",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction-admin/2061/18243931761744910961.jpg",
    url: "https://northcountry.auctiontechs.com/auctions/detail/id/16292/",
  },
  {
    id: 4,
    title: "SPRING HEAVY EQUIPMENT & TRUCK AUCTION",
    date: "05-16-2025 09:00:00 AM EDT",
    type: "Webcast Auction",
    location: "1001 Integrity Dr, Walpole, New Hampshire, United States, 03608",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction-admin/2060/6526074331742569850.JPG",
    url: "https://northcountry.auctiontechs.com/auctions/detail/id/16293/",
  }
];

export function AuctionsIframe() {
  const { t, language } = useLanguage();
  
  // Función para abrir el formulario de registro directamente
  const openForm = () => {
    try {
      console.log("Intentando abrir el formulario de registro...");
      // Llamar directamente sin timeout para evitar problemas de sincronización
      openRegistrationForm();
    } catch (error) {
      console.error("Error al abrir el formulario:", error);
      // Intento alternativo en caso de error
      const event = new CustomEvent('openRegistrationForm');
      document.dispatchEvent(event);
    }
  };
  
  return (
    <section className="py-16 bg-gray-900" id="subastas">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t('auctions.upcomingAuctions')}
          </motion.h2>

          <motion.p 
            className="text-sm sm:text-base text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('auctions.exploreAuctions')}
          </motion.p>
        </div>
        
        {/* Grid de 2 columnas centrado perfectamente */}
        <motion.div 
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Botón Subastas Nacionales */}
          <motion.div
            className="group relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 text-center flex flex-col h-full">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <i className="fas fa-flag text-lg text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {language === 'es' ? 'Subastas Nacionales' : 'National Auctions'}
              </h3>
              <p className="text-white/90 mb-4 text-xs leading-relaxed flex-grow">
                {language === 'es' 
                  ? 'Participa en subastas de maquinaria pesada en Chile y América Latina'
                  : 'Participate in heavy machinery auctions in Chile and Latin America'
                }
              </p>
              <button 
                onClick={() => {
                  console.log('Subastas Nacionales clicked');
                }}
                className="w-full bg-white text-primary font-bold py-2.5 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center group-hover:shadow-lg text-sm mt-auto"
              >
                <i className="fas fa-gavel mr-2"></i>
                {language === 'es' ? 'Ver Subastas' : 'View Auctions'}
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </div>
          </motion.div>

          {/* Botón Subastas Internacionales */}
          <motion.div
            className="group relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 text-center flex flex-col h-full">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <i className="fas fa-globe text-lg text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {language === 'es' ? 'Subastas Internacionales' : 'International Auctions'}
              </h3>
              <p className="text-white/90 mb-4 text-xs leading-relaxed flex-grow">
                {language === 'es' 
                  ? 'Accede a subastas globales de equipos especializados y maquinaria internacional'
                  : 'Access global auctions for specialized equipment and international machinery'
                }
              </p>
              <button 
                onClick={() => {
                  console.log('Subastas Internacionales clicked');
                }}
                className="w-full bg-white text-primary font-bold py-2.5 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center group-hover:shadow-lg text-sm mt-auto"
              >
                <i className="fas fa-globe-americas mr-2"></i>
                {language === 'es' ? 'Ver Subastas' : 'View Auctions'}
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </div>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}