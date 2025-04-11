import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Subastas de Maquinaria Premium",
      subtitle: "Accede a equipos de clase mundial verificados por expertos",
      image: "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1600",
      icon: "fa-gavel"
    },
    {
      title: "Equipos Mineros Especializados",
      subtitle: "Excavadoras, camiones y equipos de movimiento de tierra",
      image: "https://images.pexels.com/photos/2086795/pexels-photo-2086795.jpeg?auto=compress&cs=tinysrgb&w=1600",
      icon: "fa-truck-monster"
    },
    {
      title: "Valoraciones Certificadas",
      subtitle: "Precios justos y transparentes con documentación completa",
      image: "https://images.pexels.com/photos/259984/pexels-photo-259984.jpeg?auto=compress&cs=tinysrgb&w=1600",
      icon: "fa-certificate"
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
    { value: "15+", label: "Años de experiencia", icon: "fa-history" },
    { value: "2,000+", label: "Máquinas en catálogo", icon: "fa-tools" },
    { value: "99%", label: "Clientes satisfechos", icon: "fa-smile" }
  ];
  
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
      
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center relative z-10">
          <div className="container mx-auto px-4 py-16 md:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
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
                        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                          <i className={`fas ${slide.icon} text-white mr-2`}></i>
                          <span className="text-white font-medium">Global Bids Premium</span>
                        </div>
                        
                        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight whitespace-pre-line">
                          {slide.title}
                        </h1>
                        
                        <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl">
                          {slide.subtitle}
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                          <motion.a 
                            href="#catalogo" 
                            className="bg-white text-primary px-8 py-4 rounded-full font-bold transition-all duration-300 text-center shadow-lg flex items-center"
                            whileHover={{ scale: 1.05, backgroundColor: "#fff", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <i className="fas fa-search mr-2"></i>
                            Explorar Catálogo
                          </motion.a>
                          <motion.a 
                            href="#contacto" 
                            className="border-2 border-white bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 text-center flex items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <i className="fas fa-envelope mr-2"></i>
                            Contáctanos
                          </motion.a>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
                
                {/* Carousel Controls */}
                <div className="mt-16 flex items-center">
                  <div className="flex space-x-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? 'bg-white w-10' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                        onClick={() => handleDotClick(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <div className="ml-auto flex space-x-2">
                    <motion.button
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Previous slide"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </motion.button>
                    <motion.button
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Next slide"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </motion.button>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 hidden lg:block">
                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <h3 className="text-white font-bold text-2xl mb-6">Próximas Subastas</h3>
                  
                  {[1, 2, 3].map((_, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white/10 rounded-xl p-4 mb-4 hover:bg-white/20 transition-colors cursor-pointer"
                      whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-medium text-white text-lg">Subasta {index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                        <span className="bg-primary/50 text-white text-xs py-1 px-2 rounded-lg">
                          {index === 0 ? 'En 2 días' : index === 1 ? 'En 1 semana' : 'En 2 semanas'}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm mb-2">{index === 0 ? 'Maquinaria Minera' : index === 1 ? 'Equipos Forestales' : 'Camiones y Transporte'}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs">
                          <i className="fas fa-map-marker-alt mr-1"></i>
                          {index === 0 ? 'Antofagasta, Chile' : index === 1 ? 'Santiago, Chile' : 'Lima, Perú'}
                        </span>
                        <span className="text-white/80 text-xs">
                          <i className="fas fa-tag mr-1"></i>
                          {index === 0 ? '25' : index === 1 ? '42' : '38'} lotes
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  
                  <motion.a
                    href="#catalogo"
                    className="block text-center text-white py-3 rounded-xl border border-white/30 hover:bg-white/10 transition-colors mt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Ver todas las subastas
                    <i className="fas fa-chevron-right ml-2 text-xs"></i>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="relative z-10 mt-auto">
          <div className="container mx-auto px-4 pb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index + 0.5 }}
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 text-white">
                      <i className={`fas ${stat.icon} text-xl`}></i>
                    </div>
                    <div>
                      <div className="text-white font-bold text-2xl">{stat.value}</div>
                      <div className="text-white/80 text-sm">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
