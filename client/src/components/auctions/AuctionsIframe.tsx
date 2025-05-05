import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRegistration } from '@/contexts/RegistrationContext';

export function AuctionsIframe() {
  const { t } = useLanguage();
  const { openForm } = useRegistration();
  const [visibleItems, setVisibleItems] = useState(3);
  
  // Datos de las subastas
  const auctionItems = [
    {
      id: 1,
      title: "Dighton Spring Auction - Day 1",
      date: "05-09-2025",
      location: "Dighton, Massachusetts, United States, 02715"
    },
    {
      id: 2,
      title: "Dighton Spring Auction - Day 2",
      date: "05-10-2025",
      location: "Dighton, Massachusetts, United States, 02715"
    },
    {
      id: 3,
      title: "Eastern Panhandle WV Contractors Auction",
      date: "05-17-2025",
      location: "Martinsburg, West Virginia, United States, 24405"
    },
    {
      id: 4,
      title: "Heavy Equipment Online Auction",
      date: "05-20-2025",
      location: "Online Only"
    },
    {
      id: 5,
      title: "Mining Equipment Auction",
      date: "05-24-2025",
      location: "Denver, Colorado, United States, 80014"
    },
    {
      id: 6,
      title: "Construction Equipment Liquidation",
      date: "05-30-2025",
      location: "Houston, Texas, United States, 77001"
    }
  ];
  
  // Función para mostrar más elementos
  const showMoreItems = () => {
    setVisibleItems(prev => Math.min(prev + 3, auctionItems.length));
  };
  
  // Función para simular ver los detalles de una subasta
  const viewAuctionDetails = (id: number) => {
    console.log(`Viewing details for auction ${id}`);
    // Aquí podrías navegar a una página de detalles o abrir un modal
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
            <div className="p-6">
              {/* Contenido personalizado que simula la página de subastas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {auctionItems.slice(0, visibleItems).map((auction) => (
                  <div key={auction.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="h-48 overflow-hidden bg-gray-200 flex items-center justify-center">
                      <img 
                        src={`/auction-${auction.id}.svg`} 
                        alt={auction.title} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-2">{auction.title}</h4>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1 mb-1">
                          <i className="fas fa-calendar-alt text-primary"></i>
                          <span>Auction Date: {auction.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <i className="fas fa-map-marker-alt text-primary"></i>
                          <span>{auction.location}</span>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-1 gap-2">
                        <button 
                          onClick={() => viewAuctionDetails(auction.id)}
                          className="bg-blue-900 hover:bg-blue-800 text-white text-center py-2 rounded text-sm font-medium"
                        >
                          {t('auctions.auctionDetails')}
                        </button>
                        <button 
                          onClick={openForm}
                          className="bg-primary hover:bg-primary/90 text-white text-center py-2 rounded text-sm font-medium"
                        >
                          {t('auctions.register')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {visibleItems < auctionItems.length && (
                <div className="mt-6 text-center">
                  <button 
                    onClick={showMoreItems}
                    className="inline-flex items-center gap-2 bg-blue-800/40 hover:bg-blue-800/60 text-white py-3 px-6 rounded-full transition-colors"
                  >
                    <i className="fas fa-plus"></i>
                    {t('auctions.viewMore')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}