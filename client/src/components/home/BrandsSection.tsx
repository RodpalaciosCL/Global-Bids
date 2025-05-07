import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';

export function BrandsSection() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { language } = useLanguage();
  const controls = useAnimation();
  
  // Añadimos las nuevas marcas que proporcionaste
  const brands = [
    {
      name: 'Komatsu',
      logo: 'https://1000marcas.net/wp-content/uploads/2020/11/Komatsu-Logo.png',
      className: 'bg-white'
    },
    {
      name: 'Caterpillar',
      logo: 'https://1000marcas.net/wp-content/uploads/2020/03/Logo-Caterpillar.png',
      className: 'bg-white'
    },
    {
      name: 'Liebherr',
      logo: 'https://1000marcas.net/wp-content/uploads/2021/05/Liebherr-logo.png',
      className: 'bg-white'
    },
    {
      name: 'Volvo',
      logo: 'https://cdn.worldvectorlogo.com/logos/volvo-3.svg',
      className: 'bg-white'
    },
    {
      name: 'Sandvik',
      logo: 'https://cdn.worldvectorlogo.com/logos/sandvik-1.svg',
      className: 'bg-white'
    },
    {
      name: 'John Deere',
      logo: 'https://brandlogos.net/wp-content/uploads/2022/10/john_deere-logo_brandlogos.net_xbq4y.png',
      className: 'bg-white'
    },
    {
      name: 'New Holland',
      logo: 'https://brandlogos.net/wp-content/uploads/2024/04/new_holland_agriculture-logo_brandlogos.net_qstwy.png',
      className: 'bg-white'
    },
    {
      name: 'Hitachi',
      logo: 'https://brandlogos.net/wp-content/uploads/2013/03/hitachi-ltd-vector-logo.png',
      className: 'bg-white'
    },
    {
      name: 'Doosan',
      logo: 'https://brandlogos.net/wp-content/uploads/2022/06/doosan-logo_brandlogos.net_6dbqu.png',
      className: 'bg-white'
    },
    {
      name: 'JCB',
      logo: 'https://lirp.cdn-website.com/a9bec056/dms3rep/multi/opt/3dd8fe4a-9577-48f0-b28e-291a662e4e44_500_139-1920w.png',
      className: 'bg-white'
    }
  ];

  // Efecto para animar el carrusel
  useEffect(() => {
    if (isInView) {
      // Iniciamos la animación automática cuando el componente está en vista
      const startAnimating = async () => {
        // Esperamos a que los logos aparezcan primero
        await controls.start({ opacity: 1, y: 0 });
        // Luego iniciamos el carrusel - ajustado para más logos
        controls.start({
          x: [0, -2200], // Desplazamiento horizontal ajustado para 10 logos
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35, // Velocidad ligeramente más lenta para mejor visualización
              ease: "linear",
            }
          }
        });
      };
      
      startAnimating();
    }
  }, [isInView, controls]);

  return (
    <section className="py-20 bg-white border-t border-b border-gray-100" ref={sectionRef} id="marcas">
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'es' 
              ? <>Las Principales Marcas <span className="text-primary">del Mercado</span></>
              : <>Main <span className="text-primary">Market Brands</span></>
            }
          </h3>
          <div className="w-24 h-1.5 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            {language === 'es'
              ? 'Vasta experiencia certificando y validando equipos de las mejores marcas del mundo, para los mercados y clientes más exigentes de las industrias que operamos.'
              : 'Extensive experience certifying and validating equipment from the best brands in the world, for the most demanding markets and clients in the industries we operate in.'}
          </p>
        </motion.div>
        
        {/* Carrusel de logos automático */}
        <div className="overflow-hidden relative max-w-5xl mx-auto" ref={carouselRef}>
          <motion.div 
            className="flex items-center space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
          >
            {/* Primera instancia de logos */}
            {brands.map((brand, index) => (
              <motion.div 
                key={`first-${index}`}
                className="flex-shrink-0"
                whileHover={{ 
                  scale: 1.05,
                  filter: 'brightness(1.1)',
                  transition: { duration: 0.2 }
                }}
              >
                <div className="bg-white border border-gray-200 rounded-lg p-5 h-28 w-44 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md">
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`} 
                    className="max-h-16 max-w-[85%] object-contain"
                  />
                </div>
              </motion.div>
            ))}
            
            {/* Segunda instancia para crear un loop continuo */}
            {brands.map((brand, index) => (
              <motion.div 
                key={`second-${index}`}
                className="flex-shrink-0"
                whileHover={{ 
                  scale: 1.05,
                  filter: 'brightness(1.1)',
                  transition: { duration: 0.2 }
                }}
              >
                <div className="bg-white border border-gray-200 rounded-lg p-5 h-28 w-44 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md">
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`} 
                    className="max-h-16 max-w-[85%] object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Experience statement */}
        <motion.div
          className="mt-10 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-gray-700 text-lg font-medium italic">
            {language === 'es'
              ? '"Más de 15 años de experiencia trabajando con los principales fabricantes de maquinaria pesada"'
              : '"More than 15 years of experience working with the main heavy machinery manufacturers"'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}