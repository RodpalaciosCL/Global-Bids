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
      
      <div className="min-h-[70vh] md:min-h-[85vh] flex flex-col">
        <div className="flex-grow flex items-center relative z-10 pt-14 md:pt-0">
          <div className="container mx-auto px-3 sm:px-4 py-6 md:py-0">
            <div className="grid grid-cols-1 gap-3 md:gap-8 items-center">
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
                
                {/* Se han eliminado los controles de navegación del carrusel */}
              </div>
              
              {/* El recuadro de subastas se ha eliminado de esta sección */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}