import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { openRegistrationForm } from './RegistrationForm';
import { useLanguage } from '@/contexts/LanguageContext';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, language } = useLanguage();
  
  const slides = [
    {
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      image: "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1600",
      icon: "fa-gavel"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };
  
  const stats = [
    { value: "15+", label: t('about.experience'), icon: "fa-history" },
    { value: "2,000+", label: t('about.machines'), icon: "fa-tools" },
    { value: "99%", label: t('about.clients'), icon: "fa-smile" }
  ];

  const openRegistration = () => {
    openRegistrationForm();
  };
  
  return (
    <section id="inicio" className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 z-10"></div>
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
      
      <div className="min-h-[80vh] md:min-h-screen flex flex-col">
        <div className="flex-grow flex items-center relative z-10 pt-14 md:pt-0">
          <div className="container mx-auto px-3 sm:px-4 py-6 md:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 md:gap-8 items-center">
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  {slides.map((slide, index) => (
                    index === currentSlide && (
                      <motion.div 
                        key={index}
                        className="text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full mb-4 md:mb-6">
                          <i className={`fas ${slide.icon} text-white mr-2`}></i>
                          <span className="text-white font-medium text-sm md:text-base">Global Bids</span>
                        </div>
                        
                        <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 leading-tight">
                          {slide.title}
                        </h1>
                        
                        <p className="text-sm sm:text-base md:text-xl lg:text-2xl mb-4 md:mb-8 text-white/90 max-w-2xl">
                          {slide.subtitle}
                        </p>
                        
                        <div className="flex flex-wrap gap-3 md:gap-4">
                          <motion.a 
                            href="#catalogo" 
                            className="bg-white text-primary px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full font-bold transition-all duration-300 text-center shadow-lg flex items-center text-sm sm:text-base"
                            whileHover={{ scale: 1.05, backgroundColor: "#fff", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <i className="fas fa-search mr-2"></i>
                            {t('hero.explore')}
                          </motion.a>
                          <motion.a 
                            href="#contacto" 
                            className="border-2 border-white bg-transparent hover:bg-white/10 text-white px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full font-bold transition-all duration-300 text-center flex items-center text-sm sm:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <i className="fas fa-envelope mr-2"></i>
                            {t('hero.contact')}
                          </motion.a>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
                
                {/* Carousel Controls */}
                <div className="mt-8 md:mt-16 flex items-center">
                  <div className="flex space-x-1 sm:space-x-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? 'bg-white w-8 sm:w-10' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                        onClick={() => handleDotClick(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <div className="ml-auto flex space-x-1 sm:space-x-2">
                    <motion.button
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Previous slide"
                    >
                      <i className="fas fa-chevron-left text-xs sm:text-base"></i>
                    </motion.button>
                    <motion.button
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Next slide"
                    >
                      <i className="fas fa-chevron-right text-xs sm:text-base"></i>
                    </motion.button>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 hidden lg:block">
                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 w-full"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                    <i className="fas fa-gavel mr-2"></i>
                    {t('hero.auctions')}
                  </h3>
                  
                  <div className="rounded-2xl overflow-hidden aspect-video bg-black/20">
                    <div className="w-full h-full p-4 bg-gradient-to-br from-blue-900 to-blue-950 flex flex-col justify-center items-center">
                      <div className="text-lg font-bold text-white mb-2">{t('auctions.upcomingEvents')}</div>
                      <div className="bg-white/10 rounded-lg p-3 mb-3 w-full">
                        <div className="text-white font-medium">{t('auctions.miningAssets')}</div>
                        <div className="text-sm text-gray-300 mt-1">15 {t('hero.day')}</div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-primary-200">45 {t('hero.lots')}</span>
                          <button 
                            onClick={openRegistration}
                            className="text-xs bg-primary hover:bg-primary/90 px-3 py-1 rounded-full text-white"
                          >
                            {t('hero.register')}
                          </button>
                        </div>
                      </div>
                      
                      <a 
                        href="https://northcountry.auctiontechs.com/auctions" 
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mt-2 flex items-center"
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        {t('hero.viewAll')}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}