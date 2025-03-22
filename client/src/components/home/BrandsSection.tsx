import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeIn, staggerContainer } from '@/lib/animations';

export function BrandsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const brands = [
    {
      name: 'KOMATSU',
      description: 'Líder mundial en equipos de construcción y minería'
    },
    {
      name: 'CAT',
      description: 'Fabricante líder de equipos para construcción y minería'
    },
    {
      name: 'FINNING',
      description: 'Distribuidor de equipos Caterpillar más grande del mundo'
    },
    {
      name: 'VOLVO',
      description: 'Soluciones innovadoras para equipos de construcción'
    },
    {
      name: 'LIEBHERR',
      description: 'Tecnología avanzada en maquinaria industrial y minera'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-b border-gray-200" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="inline-block bg-primary/10 px-6 py-2 rounded-full mb-4">
            <span className="text-primary font-semibold">Alianzas Estratégicas</span>
          </div>
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Trabajamos con las Mejores Marcas</h3>
          <p className="max-w-2xl mx-auto text-gray-600">
            Nuestros especialistas están certificados y capacitados en las principales marcas de maquinaria industrial, minera y forestal.
          </p>
        </motion.div>
        
        {/* Logos with animation */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 items-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {brands.map((brand, index) => (
            <motion.div 
              key={index}
              className="flex items-center justify-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 w-full h-24 sm:h-32 flex flex-col items-center justify-center border border-gray-100">
                <span className="text-gray-800 font-bold text-lg sm:text-2xl">{brand.name}</span>
                <span className="text-xs text-gray-500 mt-2 hidden sm:block">{brand.description}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional context */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h4 className="text-primary font-bold text-xl mb-4">Experiencia certificada en múltiples marcas</h4>
          <p className="text-gray-600">
            Nuestro equipo cuenta con más de 15 años de experiencia trabajando con los principales fabricantes
            de maquinaria pesada. Esto nos permite ofrecer valoraciones precisas y un servicio integral
            para equipos de cualquier marca y modelo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}