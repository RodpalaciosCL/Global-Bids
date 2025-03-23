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
      logo: 'https://1000marcas.net/wp-content/uploads/2020/11/Komatsu-Logo.png',
      className: 'bg-white'
    },
    {
      name: 'Caterpillar',
      logo: 'https://1000marcas.net/wp-content/uploads/2020/03/Logo-Caterpillar.png',
      className: 'bg-[#FFCC01] bg-opacity-5'
    },
    {
      name: 'Liebherr',
      logo: 'https://1000marcas.net/wp-content/uploads/2021/05/Liebherr-logo.png',
      className: 'bg-white'
    },
    {
      name: 'Volvo',
      logo: 'https://cdn.worldvectorlogo.com/logos/volvo-3.svg',
      className: 'bg-[#003057] bg-opacity-5'
    },
    {
      name: 'Sandvik',
      logo: 'https://cdn.worldvectorlogo.com/logos/sandvik-1.svg',
      className: 'bg-white'
    }
  ];

  return (
    <section className="py-24 relative bg-gray-50" ref={sectionRef} id="marcas">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Las Principales Marcas <span className="text-primary">del Mercado</span>
          </h3>
          <div className="w-24 h-1.5 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Contamos con experiencia certificada en las principales marcas de maquinaria industrial, minera y forestal.
          </p>
        </motion.div>
        
        {/* Logos carousel/grid */}
        <motion.div 
          className="relative z-10 px-6 py-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {brands.map((brand, index) => (
              <motion.div 
                key={index}
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 + 0.2
                }}
                whileHover={{ 
                  scale: 1.05,
                  filter: 'brightness(1.1)',
                  transition: { duration: 0.2 }
                }}
              >
                <div className={`rounded-xl p-6 h-32 flex items-center justify-center w-full transition-all duration-300 relative group overflow-hidden shadow-sm hover:shadow-lg ${brand.className}`}>
                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-0"></div>
                  
                  {/* Logo */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`} 
                      className="max-h-20 max-w-[80%] object-contain filter"
                    />
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Experience statement */}
        <motion.div
          className="mt-10 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-gray-700 text-lg font-medium italic">
            "Más de 15 años de experiencia trabajando con los principales fabricantes de maquinaria pesada"
          </p>
        </motion.div>
      </div>
    </section>
  );
}