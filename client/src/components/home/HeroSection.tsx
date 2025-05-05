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
      image: "https://images.pexels.com/photos/188679/pexels-photo-188679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Imagen original como solicitada
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-primary/70 to-primary/40 z-10"></div>
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
      
      <div className="min-h-[80vh] flex flex-col">
        <div className="flex-grow flex items-center relative z-10 pt-14 md:pt-0">
          <div className="container mx-auto px-3 sm:px-4 py-6 md:py-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 items-center">
              <div className="w-full">
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
                            href="#subastas" 
                            className="bg-white text-primary px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full font-bold transition-all duration-300 text-center shadow-lg flex items-center text-sm sm:text-base"
                            whileHover={{ scale: 1.05, backgroundColor: "#fff", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <i className="fas fa-gavel mr-2"></i>
                            {t('hero.exploreAuctions')}
                          </motion.a>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="hidden md:block">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl">
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div 
                        key={index}
                        className="text-center p-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      >
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <i className={`fas ${stat.icon} text-white text-xl`}></i>
                        </div>
                        <div className="text-white text-2xl font-bold">{stat.value}</div>
                        <div className="text-white/70 text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Franja de categorías horizontal en la parte inferior */}
        <div className="mt-auto relative z-10">
          <div className="py-3 bg-black/40 backdrop-blur-sm w-full">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
                <div className="text-white/60 text-xs mr-2 hidden md:block">{t('hero.findByCategory')}:</div>
                <motion.a 
                  href="#catalogo" 
                  className="px-3 py-1.5 bg-black/20 hover:bg-primary/40 text-white rounded-md text-center transition-all text-xs flex items-center border border-white/10"
                  whileHover={{ y: -2 }}
                >
                  <i className="fas fa-truck-monster text-white text-xs mr-2"></i>
                  {t('hero.miningEquipment')}
                </motion.a>
                
                <motion.a 
                  href="#catalogo" 
                  className="px-3 py-1.5 bg-black/20 hover:bg-primary/40 text-white rounded-md text-center transition-all text-xs flex items-center border border-white/10"
                  whileHover={{ y: -2 }}
                >
                  <i className="fas fa-tree text-white text-xs mr-2"></i>
                  {t('hero.forestryEquipment')}
                </motion.a>
                
                <motion.a 
                  href="#catalogo" 
                  className="px-3 py-1.5 bg-black/20 hover:bg-primary/40 text-white rounded-md text-center transition-all text-xs flex items-center border border-white/10"
                  whileHover={{ y: -2 }}
                >
                  <i className="fas fa-truck text-white text-xs mr-2"></i>
                  {t('hero.trucksTransport')}
                </motion.a>
                
                <motion.a 
                  href="#catalogo" 
                  className="px-3 py-1.5 bg-black/20 hover:bg-primary/40 text-white rounded-md text-center transition-all text-xs flex items-center border border-white/10"
                  whileHover={{ y: -2 }}
                >
                  <i className="fas fa-tools text-white text-xs mr-2"></i>
                  {t('hero.partsTools')}
                </motion.a>
                
                <motion.a 
                  href="#catalogo" 
                  className="px-3 py-1.5 bg-black/20 hover:bg-primary/40 text-white rounded-md text-center transition-all text-xs flex items-center border border-white/10 hidden md:flex"
                  whileHover={{ y: -2 }}
                >
                  <i className="fas fa-industry text-white text-xs mr-2"></i>
                  {t('hero.industrialEquipment')}
                </motion.a>
                
                <motion.a 
                  href="#catalogo" 
                  className="px-3 py-1.5 bg-black/20 hover:bg-primary/40 text-white rounded-md text-center transition-all text-xs flex items-center border border-white/10 hidden md:flex"
                  whileHover={{ y: -2 }}
                >
                  <i className="fas fa-cubes text-white text-xs mr-2"></i>
                  {t('hero.specialLots')}
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}