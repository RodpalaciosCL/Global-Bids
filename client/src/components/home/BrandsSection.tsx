import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeIn, staggerContainer } from '@/lib/animations';

export function BrandsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const brands = [
    {
      name: 'Komatsu',
      description: 'Líder mundial en equipos de construcción y minería',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 60" width="150" height="60" className="text-gray-800">
          <rect width="150" height="60" fill="transparent"/>
          <text x="75" y="35" textAnchor="middle" className="text-gray-800 font-bold" style={{ fontSize: '24px' }}>KOMATSU</text>
        </svg>
      )
    },
    {
      name: 'Caterpillar',
      description: 'Fabricante líder de equipos para construcción y minería',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 60" width="150" height="60" className="text-yellow-600">
          <rect width="150" height="60" fill="transparent"/>
          <text x="75" y="35" textAnchor="middle" className="text-yellow-600 font-black" style={{ fontSize: '28px' }}>CAT</text>
        </svg>
      )
    },
    {
      name: 'Finning',
      description: 'Distribuidor de equipos Caterpillar más grande del mundo',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 60" width="150" height="60" className="text-gray-800">
          <rect width="150" height="60" fill="transparent"/>
          <text x="75" y="35" textAnchor="middle" className="text-gray-800 font-bold" style={{ fontSize: '24px' }}>FINNING</text>
        </svg>
      )
    },
    {
      name: 'Volvo',
      description: 'Soluciones innovadoras para equipos de construcción',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 60" width="150" height="60" className="text-blue-800">
          <rect width="150" height="60" fill="transparent"/>
          <circle cx="75" cy="30" r="25" fill="transparent" stroke="currentColor" strokeWidth="3"/>
          <path d="M58 30h34" stroke="currentColor" strokeWidth="3"/>
          <text x="75" y="35" textAnchor="middle" className="text-blue-800 font-bold" style={{ fontSize: '16px' }}>VOLVO</text>
        </svg>
      )
    },
    {
      name: 'Liebherr',
      description: 'Tecnología avanzada en maquinaria industrial y minera',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 60" width="150" height="60" className="text-gray-800">
          <rect width="150" height="60" fill="transparent"/>
          <text x="75" y="35" textAnchor="middle" className="text-gray-800 font-bold" style={{ fontSize: '22px' }}>LIEBHERR</text>
        </svg>
      )
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center mb-16"
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
                scale: 1.08,
                transition: { duration: 0.2 }
              }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 w-full h-32 flex flex-col items-center justify-center border border-gray-100">
                <div className="grayscale group-hover:grayscale-0 transition-all duration-500">
                  {brand.logo}
                </div>
                <span className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{brand.name}</span>
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