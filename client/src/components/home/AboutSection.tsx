import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, staggerContainer } from '@/lib/animations';

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const benefitsList = [
    "Valoraciones precisas por expertos certificados en maquinaria",
    "Red global de compradores que maximizan el valor de venta",
    "Documentación completa y transparente de cada activo",
    "Logística integral para transporte nacional e internacional",
    "Proceso de subasta claro, seguro y eficiente"
  ];
  
  return (
    <section id="nosotros" className="py-24 bg-accent relative overflow-hidden" ref={sectionRef}>
      {/* Decorative element */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={slideUp}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-primary">Quiénes Somos</h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto mb-8"></div>
          <p className="max-w-4xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed px-2">
            Con más de <span className="font-semibold text-primary">15 años de experiencia</span>, nos hemos consolidado como líderes en el mercado de subastas y valoración de maquinaria pesada en Latinoamérica, especializándonos en equipos para los sectores <span className="font-semibold text-primary">minero, forestal e industrial</span>.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-xl translate-x-4 translate-y-4"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1563665877939-87e78b4b1ed0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Equipo de expertos en maquinaria" 
                className="w-full h-auto" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white font-heading font-bold text-3xl">Nuestros Expertos</h3>
                <p className="text-gray-100 text-lg">Especialistas certificados en valoración de activos</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h3 
              className="font-heading text-3xl font-bold mb-6 text-primary"
              variants={slideUp}
            >
              Especialistas en Maquinaria Industrial
            </motion.h3>
            
            <motion.div className="space-y-4" variants={slideUp}>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                En MacBid entendemos la complejidad del mercado de maquinaria pesada para sectores <span className="font-semibold">mineros, forestales e industriales</span>, donde cada equipo representa una inversión significativa que debe ser valorada con precisión.
              </p>
              
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Nuestro equipo multidisciplinario incluye ingenieros, mecánicos, expertos en valoración y especialistas en cada tipo de maquinaria, garantizando un proceso transparente y profesional.
              </p>
            </motion.div>
            
            <motion.div variants={slideUp} className="bg-white p-5 md:p-6 rounded-xl shadow-lg border-l-4 border-secondary">
              <h4 className="font-bold text-lg md:text-xl mb-4 text-primary">¿Por qué elegir nuestros servicios?</h4>
              
              <motion.ul 
                className="space-y-3 md:space-y-4"
                variants={staggerContainer}
              >
                {benefitsList.map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    variants={slideUp}
                  >
                    <i className="fas fa-check-circle text-secondary text-base md:text-lg mt-1 mr-2 md:mr-3 flex-shrink-0"></i>
                    <span className="text-gray-700 text-sm md:text-base">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
