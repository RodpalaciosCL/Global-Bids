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
    <section id="inicio" className="relative overflow-hidden bg-white h-screen">
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
      
      <div className="h-full flex flex-col">
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
                        
                        <div className="flex items-center mb-12 md:mb-16">
                          <motion.a 
                            href="#subastas" 
                            className="bg-white text-primary px-5 sm:px-6 md:px-8 py-3 md:py-4 rounded-full font-bold transition-all duration-300 text-center shadow-xl flex items-center text-sm sm:text-base"
                            whileHover={{ scale: 1.05, backgroundColor: "#fff", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <i className="fas fa-gavel mr-2"></i>
                            {t('hero.exploreAuctions')}
                          </motion.a>
                        </div>
                        
                        {/* Categorías integradas directamente bajo el botón */}
                        <div className="mb-8">
                          <div className="text-white/80 text-sm mb-2 font-medium">{t('hero.findByCategory')}:</div>
                          <div className="flex flex-wrap gap-4 max-w-2xl">
                            <a href="#catalogo" className="flex items-center text-white hover:text-white/80 transition-colors text-sm group">
                              <div className="w-8 h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center mr-2 group-hover:bg-primary/40 transition-colors">
                                <i className="fas fa-truck-monster text-white text-xs"></i>
                              </div>
                              <span>Activos Minería</span>
                            </a>
                            
                            <a href="#catalogo" className="flex items-center text-white hover:text-white/80 transition-colors text-sm group">
                              <div className="w-8 h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center mr-2 group-hover:bg-primary/40 transition-colors">
                                <i className="fas fa-tree text-white text-xs"></i>
                              </div>
                              <span>Activos Forestales</span>
                            </a>
                            
                            <a href="#catalogo" className="flex items-center text-white hover:text-white/80 transition-colors text-sm group">
                              <div className="w-8 h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center mr-2 group-hover:bg-primary/40 transition-colors">
                                <i className="fas fa-truck text-white text-xs"></i>
                              </div>
                              <span>Camiones y Transporte</span>
                            </a>
                            
                            <a href="#catalogo" className="flex items-center text-white hover:text-white/80 transition-colors text-sm group">
                              <div className="w-8 h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center mr-2 group-hover:bg-primary/40 transition-colors">
                                <i className="fas fa-tools text-white text-xs"></i>
                              </div>
                              <span>Repuestos y Partes</span>
                            </a>
                            
                            <a href="#catalogo" className="flex items-center text-white hover:text-white/80 transition-colors text-sm group">
                              <div className="w-8 h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center mr-2 group-hover:bg-primary/40 transition-colors">
                                <i className="fas fa-industry text-white text-xs"></i>
                              </div>
                              <span>Equipos Industriales</span>
                            </a>
                            
                            <a href="#catalogo" className="flex items-center text-white hover:text-white/80 transition-colors text-sm group">
                              <div className="w-8 h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center mr-2 group-hover:bg-primary/40 transition-colors">
                                <i className="fas fa-cubes text-white text-xs"></i>
                              </div>
                              <span>Lotes Especiales</span>
                            </a>
                          </div>
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
      </div>
    </section>
  );
}