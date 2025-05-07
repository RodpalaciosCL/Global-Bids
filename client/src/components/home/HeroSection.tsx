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
    { value: "+2800", label: "Remates", icon: "fa-gavel" },
    { value: "75", label: "países", icon: "fa-globe" },
    { value: "USD 450M", label: "Ventas en los últimos 24 meses", icon: "fa-dollar-sign" },
    { value: "950,300", label: "Clientes pre-validados", icon: "fa-users" }
  ];

  const openRegistration = () => {
    openRegistrationForm();
  };
  
  return (
    <section id="inicio" className="relative overflow-hidden bg-white min-h-screen">
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
      
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center relative z-10 pt-14 md:pt-0">
          <div className="container mx-auto px-4 py-8 md:py-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
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
                        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full mb-3 md:mb-6">
                          <i className={`fas ${slide.icon} text-white mr-2`}></i>
                          <span className="text-white font-medium text-xs sm:text-sm md:text-base">Global Bids</span>
                        </div>
                        
                        <h1 className="font-heading text-xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-6 leading-tight">
                          {slide.title}
                        </h1>
                        
                        <p className="text-xs sm:text-sm md:text-xl lg:text-2xl mb-4 md:mb-8 text-white/90 max-w-2xl">
                          {slide.subtitle}
                        </p>
                        
                        <div className="flex items-center mb-6 sm:mb-8 md:mb-16">
                          <motion.a 
                            href="#subastas" 
                            className="bg-white text-primary px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full font-bold transition-all duration-300 text-center shadow-xl flex items-center text-xs sm:text-sm md:text-base"
                            whileHover={{ scale: 1.05, backgroundColor: "#fff", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <i className="fas fa-gavel mr-2"></i>
                            {t('hero.exploreAuctions')}
                          </motion.a>
                        </div>
                        
                        {/* Categorías integradas directamente bajo el botón */}
                        <div className="mb-6 sm:mb-8">
                          <div className="text-white/80 text-xs sm:text-sm mb-2 font-medium">{t('hero.findByCategory')}:</div>
                          <div className="flex flex-wrap gap-2 sm:gap-4 max-w-2xl">
                            <a href="#catalogo" className="flex items-center text-white hover:text-white/80 transition-colors text-xs sm:text-sm group">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center mr-1 sm:mr-2 group-hover:bg-primary/40 transition-colors">
                                <i className="fas fa-truck-monster text-white text-xs"></i>
                              </div>
                              <span>Activos Minería</span>
                            </a>
                            
                            <a href="#catalogo" className="flex items-center text-white hover:text-white/80 transition-colors text-xs sm:text-sm group">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center mr-1 sm:mr-2 group-hover:bg-primary/40 transition-colors">
                                <i className="fas fa-tree text-white text-xs"></i>
                              </div>
                              <span>Activos Forestales</span>
                            </a>
                            
                            <a href="#catalogo" className="flex items-center text-white hover:text-white/80 transition-colors text-xs sm:text-sm group">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center mr-1 sm:mr-2 group-hover:bg-primary/40 transition-colors">
                                <i className="fas fa-truck text-white text-xs"></i>
                              </div>
                              <span>Camiones</span>
                            </a>
                            
                            <a href="#catalogo" className="flex items-center text-white hover:text-white/80 transition-colors text-xs sm:text-sm group">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center mr-1 sm:mr-2 group-hover:bg-primary/40 transition-colors">
                                <i className="fas fa-tools text-white text-xs"></i>
                              </div>
                              <span>Repuestos</span>
                            </a>
                            
                            <a href="#catalogo" className="flex items-center text-white hover:text-white/80 transition-colors text-xs sm:text-sm group">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center mr-1 sm:mr-2 group-hover:bg-primary/40 transition-colors">
                                <i className="fas fa-industry text-white text-xs"></i>
                              </div>
                              <span>Industrial</span>
                            </a>
                            
                            <a href="#catalogo" className="flex items-center text-white hover:text-white/80 transition-colors text-xs sm:text-sm group">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center mr-1 sm:mr-2 group-hover:bg-primary/40 transition-colors">
                                <i className="fas fa-recycle text-white text-xs"></i>
                              </div>
                              <span>Chatarra</span>
                            </a>
                            
                            <a href="#catalogo" className="flex items-center text-white hover:text-white/80 transition-colors text-xs sm:text-sm group">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center mr-1 sm:mr-2 group-hover:bg-primary/40 transition-colors">
                                <i className="fas fa-bolt text-white text-xs"></i>
                              </div>
                              <span>Generadores</span>
                            </a>
                            
                            <a href="#catalogo" className="flex items-center text-white hover:text-white/80 transition-colors text-xs sm:text-sm group">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center mr-1 sm:mr-2 group-hover:bg-primary/40 transition-colors">
                                <i className="fas fa-ellipsis-h text-white text-xs"></i>
                              </div>
                              <span>Y mucho más</span>
                            </a>
                          </div>
                        </div>
                        
                        {/* Stats para móviles */}
                        <div className="md:hidden mb-6">
                          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 shadow-lg">
                            <div className="grid grid-cols-2 gap-2">
                              {stats.map((stat, index) => (
                                <motion.div 
                                  key={index}
                                  className="text-center p-1"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                                >
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1">
                                    <i className={`fas ${stat.icon} text-white text-xs`}></i>
                                  </div>
                                  <div className="text-white text-sm font-bold">{stat.value}</div>
                                  <div className="text-white/70 text-xs">{stat.label}</div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="hidden md:block">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl">
                  <div className="grid grid-cols-4 gap-3">
                    {stats.map((stat, index) => (
                      <motion.div 
                        key={index}
                        className="text-center p-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      >
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <i className={`fas ${stat.icon} text-white text-lg`}></i>
                        </div>
                        <div className="text-white text-lg font-bold">{stat.value}</div>
                        <div className="text-white/70 text-xs">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}