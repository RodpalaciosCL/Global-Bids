import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { fadeIn, staggerContainer, slideUp } from '@/lib/animations';
import { Machinery } from '@/types/machinery';
import { useQuery } from '@tanstack/react-query';

export function FeaturedAuctions() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const { data: featuredItems, isLoading } = useQuery({
    queryKey: ['/api/machinery/featured'],
    staleTime: 300000 // 5 minutes
  });
  
  return (
    <section id="destacados" className="py-16 bg-accent-light" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-primary">Remates Destacados</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600">Conoce algunos de nuestros remates más exitosos y las maquinarias que hemos vendido para nuestros clientes.</p>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="featured-slider grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg p-4 h-96">
                  <div className="animate-pulse">
                    <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/3 mt-4"></div>
                  </div>
                </div>
              ))
            ) : (
              featuredItems?.map((item: Machinery, index: number) => (
                <FeaturedItemCard key={item.id} item={item} delay={index * 0.1} />
              ))
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a 
            href="#catalogo" 
            className="inline-block bg-primary hover:bg-primary-light text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
          >
            Ver Todas las Maquinarias
          </a>
        </motion.div>
      </div>
    </section>
  );
}

interface FeaturedItemCardProps {
  item: Machinery;
  delay: number;
}

function FeaturedItemCard({ item, delay }: FeaturedItemCardProps) {
  return (
    <motion.div 
      className="featured-item bg-white rounded-lg overflow-hidden shadow-lg machinery-card"
      variants={slideUp}
      transition={{ delay }}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transform hover:scale-110 transition duration-300" 
        />
        <div className="absolute top-0 right-0 bg-secondary text-primary font-bold px-3 py-1 m-2 rounded text-sm">
          {item.isSold ? 'Vendido' : 'Disponible'}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-xl mb-2 text-primary">{item.name}</h3>
        <div className="flex items-center text-gray-500 mb-2">
          <i className="fas fa-calendar-alt mr-2"></i>
          <span>{item.auctionDate}</span>
        </div>
        <div className="text-gray-600 mb-4">{item.description}</div>
        <div className="font-bold text-lg text-primary">Precio de remate: ${item.price.toLocaleString()}</div>
      </div>
    </motion.div>
  );
}
