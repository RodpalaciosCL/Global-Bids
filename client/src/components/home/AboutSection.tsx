import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const expertiseAreas = [
    {
      title: "Experiencia",
      value: "15+",
      subtitle: "años en el mercado",
      icon: "fa-medal"
    },
    {
      title: "Activos",
      value: "1,500+",
      subtitle: "maquinarias vendidas",
      icon: "fa-truck-monster"
    },
    {
      title: "Cobertura",
      value: "12",
      subtitle: "países en Latinoamérica",
      icon: "fa-globe-americas"
    },
    {
      title: "Clientes",
      value: "98%",
      subtitle: "de satisfacción",
      icon: "fa-users"
    }
  ];
  
  const serviciosList = [
    {
      title: "Valoración de Activos",
      description: "Valoraciones precisas por expertos certificados en maquinaria pesada industrial",
      icon: "fa-balance-scale"
    },
    {
      title: "Red Global",
      description: "Compradores internacionales que maximizan el valor de venta de sus activos",
      icon: "fa-globe-americas"
    },
    {
      title: "Documentación Completa",
      description: "Manejo transparente y detallado de toda la documentación de cada activo",
      icon: "fa-file-alt"
    },
    {
      title: "Logística Integral",
      description: "Servicios de transporte nacional e internacional para su maquinaria",
      icon: "fa-truck"
    }
  ];
  
  return (
    <section id="nosotros" className="min-h-screen py-16 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Decorative elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] bg-secondary opacity-5 rounded-full blur-3xl"></div>
      
      {/* Section Header */}
      <div className="container mx-auto px-4 mb-12">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-primary/10 rounded-full px-4 py-2 mb-4">
            <span className="text-primary font-medium text-sm">Conoce Nuestro Equipo</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-5 text-primary">Quiénes Somos</h2>
          <div className="w-28 h-1.5 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed">
            Líderes en subastas y valoración de maquinaria pesada en Latinoamérica, especializados en equipos para los sectores <span className="font-medium text-primary">minero, forestal e industrial</span>.
          </p>
        </motion.div>
      </div>
      
      {/* Main Photo Banner */}
      <motion.div 
        className="relative w-full h-[400px] mb-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-primary/60 z-10"></div>
        <img 
          src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1600" 
          alt="Equipo MacBid" 
          className="w-full h-full object-cover object-center" 
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <h3 className="text-white font-bold text-3xl md:text-4xl mb-4 font-heading">Nuestro Compromiso</h3>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              Con más de <span className="font-bold">15 años de experiencia</span>, entendemos que cada pieza de maquinaria representa una inversión significativa que debe ser valorada con precisión y comercializada de manera eficiente.
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Section */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {expertiseAreas.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <i className={`fas ${stat.icon} text-xl`}></i>
              </div>
              <div className="text-4xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm mb-1">{stat.subtitle}</div>
              <div className="font-medium text-gray-800">{stat.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Services Grid */}
      <div className="container mx-auto px-4 mb-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-primary">Especialistas en Maquinaria Industrial</h3>
          <p className="max-w-3xl mx-auto text-gray-600">
            Nuestro equipo multidisciplinario incluye ingenieros, mecánicos y expertos en valoración, garantizando un proceso transparente y profesional.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviciosList.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-md h-full flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.15 * index }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <i className={`fas ${service.icon} text-xl`}></i>
              </div>
              <h4 className="text-xl font-bold text-primary mb-3">{service.title}</h4>
              <p className="text-gray-600 text-sm flex-grow">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Team Info */}
      <div className="container mx-auto px-4">
        <div className="bg-primary/5 rounded-2xl p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/2760250/pexels-photo-2760250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Equipo de expertos en maquinaria" 
                  className="w-full h-auto" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white font-bold text-2xl">Nuestros Especialistas</h3>
                  <p className="text-white/80">Equipo dedicado a la excelencia</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary">
                ¿Por qué confiar en nosotros?
              </h3>
              
              <p className="text-gray-600">
                En MacBid entendemos que cada decisión de compra o venta de maquinaria representa una inversión significativa. Por eso ofrecemos:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary bg-primary/10 p-1 rounded mr-3 flex-shrink-0">
                    <i className="fas fa-check"></i>
                  </span>
                  <div>
                    <span className="font-medium text-gray-800">Evaluaciones precisas</span>
                    <p className="text-sm text-gray-600">Valoración exacta basada en el estado real y mercado actual</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary bg-primary/10 p-1 rounded mr-3 flex-shrink-0">
                    <i className="fas fa-check"></i>
                  </span>
                  <div>
                    <span className="font-medium text-gray-800">Proceso transparente</span>
                    <p className="text-sm text-gray-600">Documentación clara y comunicación constante en cada etapa</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary bg-primary/10 p-1 rounded mr-3 flex-shrink-0">
                    <i className="fas fa-check"></i>
                  </span>
                  <div>
                    <span className="font-medium text-gray-800">Alcance global</span>
                    <p className="text-sm text-gray-600">Acceso a compradores internacionales maximizando el retorno</p>
                  </div>
                </li>
              </ul>
              
              <div className="flex">
                <a href="#catalogo" className="flex items-center font-medium text-primary hover:underline group">
                  Ver nuestro catálogo
                  <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
