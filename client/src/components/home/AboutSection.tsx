import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, staggerContainer } from '@/lib/animations';

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  return (
    <section id="nosotros" className="py-16 bg-accent" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={slideUp}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-primary">Quiénes Somos</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600">Con más de 15 años de experiencia, nos hemos convertido en líderes del mercado de subastas de maquinaria pesada en Latinoamérica.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1563665877939-87e78b4b1ed0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Equipo de expertos en maquinaria" 
                className="w-full h-auto" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white font-heading font-bold text-2xl">Nuestros Expertos</h3>
                <p className="text-gray-200">Equipo certificado en evaluación de maquinaria</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h3 
              className="font-heading text-2xl font-bold mb-4 text-primary"
              variants={slideUp}
            >
              Expertos en Subastas de Maquinaria
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 mb-4"
              variants={slideUp}
            >
              En MacBid entendemos la complejidad del mercado de maquinaria pesada y ofrecemos un servicio profesional orientado a conseguir el mejor valor para compradores y vendedores.
            </motion.p>
            
            <motion.p 
              className="text-gray-600 mb-6"
              variants={slideUp}
            >
              Nuestro equipo de expertos evalúa meticulosamente cada equipo, proporcionando descripciones detalladas y transparentes que generan confianza en nuestros clientes.
            </motion.p>
            
            <motion.ul 
              className="space-y-3"
              variants={staggerContainer}
            >
              {[
                "Evaluación técnica profesional de cada máquina",
                "Documentación completa de historial y mantenimiento",
                "Fotografías de alta calidad y videos detallados",
                "Proceso de subasta transparente y competitivo"
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  variants={slideUp}
                >
                  <i className="fas fa-check-circle text-secondary mt-1 mr-3"></i>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
