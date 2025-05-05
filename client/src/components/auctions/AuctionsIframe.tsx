import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRegistration } from '@/contexts/RegistrationContext';

export function AuctionsIframe() {
  const { t } = useLanguage();
  const { openForm } = useRegistration();
  
  // Datos de las subastas (podría venir de una API)
  const auctionItems = [
    {
      id: 1,
      title: "Dighton Spring Auction - Day 1",
      image: "https://northcountry.auctiontechs.com/_uploads/photos/95-1/thumb_142949_1599234300.jpg",
      date: "05-09-2025",
      location: "Dighton, Massachusetts, United States, 02715"
    },
    {
      id: 2,
      title: "Dighton Spring Auction - Day 2",
      image: "https://northcountry.auctiontechs.com/_uploads/photos/95-2/thumb_142949_1599234400.jpg",
      date: "05-10-2025",
      location: "Dighton, Massachusetts, United States, 02715"
    },
    {
      id: 3,
      title: "Eastern Panhandle WV Contractors Auction",
      image: "https://northcountry.auctiontechs.com/_uploads/photos/95-3/thumb_142950_1599234500.jpg",
      date: "05-17-2025",
      location: "Martinsburg, West Virginia, United States, 24405"
    }
  ];
  
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
                {auctionItems.map((auction) => (
                  <div key={auction.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={auction.image} 
                        alt={auction.title} 
                        className="w-full h-full object-cover"
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
                        <a 
                          href={`https://northcountry.auctiontechs.com/auctions/detail/${auction.id}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-900 hover:bg-blue-800 text-white text-center py-2 rounded text-sm font-medium"
                        >
                          AUCTION DETAILS
                        </a>
                        <button 
                          onClick={openForm}
                          className="bg-primary hover:bg-primary/90 text-white text-center py-2 rounded text-sm font-medium"
                        >
                          REGISTER
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <a 
                  href="https://northcountry.auctiontechs.com/auctions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-800/40 hover:bg-blue-800/60 text-white py-3 px-6 rounded-full transition-colors"
                >
                  <i className="fas fa-external-link-alt"></i>
                  {t('hero.viewAll')}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}