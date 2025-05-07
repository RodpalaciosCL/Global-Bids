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
    <section className="py-20 bg-gray-900" id="subastas">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
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
          className="bg-white rounded-3xl overflow-hidden max-w-5xl mx-auto shadow-2xl"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Contenido de las subastas sin pestañas */}
          <div className="p-6">
            <div className="space-y-6">
              {AUCTION_DATA.map((auction) => (
                <div key={auction.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/5">
                      <div className="h-32 rounded-md overflow-hidden">
                        <img 
                          src={auction.image} 
                          alt={auction.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Si la imagen no carga, usar una imagen por defecto
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "/pexels-ywanphoto-188679.jpg";
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-4/5">
                      <h3 className="text-lg font-bold text-gray-800">{auction.title}</h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p><span className="inline-block w-5 h-5 mr-2 text-gray-400"><i className="fas fa-calendar"></i></span> {auction.date}</p>
                        <p><span className="inline-block w-5 h-5 mr-2 text-gray-400"><i className="fas fa-tag"></i></span> {auction.type}</p>
                        <p><span className="inline-block w-5 h-5 mr-2 text-gray-400"><i className="fas fa-map-marker-alt"></i></span> {auction.location}</p>
                      </div>
                      <button 
                        onClick={openForm}
                        className="mt-3 px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary-dark transition-colors"
                      >
                        {t('auctions.auctionDetails')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer con link a más subastas */}
          <div className="bg-gray-100 px-6 py-4 text-center">
            <button 
              onClick={openForm}
              className="text-primary hover:text-primary-dark font-medium inline-flex items-center transition-colors"
            >
              {t('auctions.register')}
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}