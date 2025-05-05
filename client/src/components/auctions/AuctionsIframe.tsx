import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';

// Subastas dinámicas basadas en la imagen compartida
const AUCTION_DATA = [
  {
    id: 1,
    title: "DAY 1 - DIGHTON SPRING AUCTION",
    date: "05-09-2025 09:00:00 AM EDT",
    type: "Webcast Auction",
    location: "1892 County St, Dighton, Massachusetts, United States, 02715",
    image: "/pexels-ywanphoto-188679.jpg",
    url: "https://northcountry.auctiontechs.com/auctions/detail/id/16290/",
  },
  {
    id: 2,
    title: "DAY 2 - DIGHTON SPRING AUCTION",
    date: "05-10-2025 09:00:00 AM EDT",
    type: "Webcast Auction",
    location: "1892 County St, Dighton, Massachusetts, United States, 02715",
    image: "/pexels-ywanphoto-188679.jpg",
    url: "https://northcountry.auctiontechs.com/auctions/detail/id/16291/",
  },
  {
    id: 3,
    title: "GRAND OPENING OF EASTERN PANHANDLE WV CONTRACTORS AUCTION",
    date: "05-14-2025 09:00:00 AM EDT",
    type: "Webcast Auction",
    location: "743 W King St, Martinsburg, West Virginia, United States, 25401",
    image: "/pexels-ywanphoto-188679.jpg",
    url: "https://northcountry.auctiontechs.com/auctions/detail/id/16292/",
  },
  {
    id: 4,
    title: "SPRING HEAVY EQUIPMENT & TRUCK AUCTION",
    date: "05-16-2025 09:00:00 AM EDT",
    type: "Webcast Auction",
    location: "1001 Integrity Dr, Walpole, New Hampshire, United States, 03608",
    image: "/pexels-ywanphoto-188679.jpg",
    url: "https://northcountry.auctiontechs.com/auctions/detail/id/16293/",
  }
];

export function AuctionsIframe() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('current');
  const [showIframe, setShowIframe] = useState(false);
  const [currentAuctionUrl, setCurrentAuctionUrl] = useState('');
  
  const handleAuctionDetails = (url: string) => {
    setCurrentAuctionUrl(url);
    setShowIframe(true);
  };
  
  const closeIframe = () => {
    setShowIframe(false);
  };
  
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
          {/* Pestañas de navegación */}
          <div className="flex border-b border-gray-200">
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'current' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('current')}
            >
              {language === 'es' ? 'Actuales' : 'Current'}
            </button>
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'past' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('past')}
            >
              {language === 'es' ? 'Pasadas' : 'Past'}
            </button>
          </div>
          
          {/* Contenido de las subastas */}
          <div className="p-6">
            {/* Mostrar subastas o iframe */}
            {!showIframe ? (
              <div className="space-y-6">
                {AUCTION_DATA.map((auction) => (
                  <div key={auction.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/5">
                        <img 
                          src={auction.image} 
                          alt={auction.title} 
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                      <div className="w-full md:w-4/5">
                        <h3 className="text-lg font-bold text-gray-800">{auction.title}</h3>
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          <p><span className="inline-block w-5 h-5 mr-2 text-gray-400"><i className="fas fa-calendar"></i></span> {auction.date}</p>
                          <p><span className="inline-block w-5 h-5 mr-2 text-gray-400"><i className="fas fa-tag"></i></span> {auction.type}</p>
                          <p><span className="inline-block w-5 h-5 mr-2 text-gray-400"><i className="fas fa-map-marker-alt"></i></span> {auction.location}</p>
                        </div>
                        <button 
                          onClick={() => handleAuctionDetails(auction.url)}
                          className="mt-3 px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary-dark transition-colors"
                        >
                          {language === 'es' ? 'DETALLES DE LA SUBASTA' : 'AUCTION DETAILS'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={closeIframe}
                  className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                >
                  <i className="fas fa-times text-gray-600"></i>
                </button>
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe 
                    src={currentAuctionUrl || "https://northcountry.auctiontechs.com/auctions"} 
                    className="w-full h-full border-0"
                    style={{ minHeight: '600px' }}
                    title="Auction Details"
                    scrolling="auto"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer con link a más subastas */}
          <div className="bg-gray-100 px-6 py-4 text-center">
            <a 
              href="https://northcountry.auctiontechs.com/auctions" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark font-medium inline-flex items-center transition-colors"
            >
              {language === 'es' ? 'Ver todas las subastas' : 'View all auctions'} 
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}