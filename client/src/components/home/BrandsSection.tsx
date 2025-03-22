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
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="50" fill="currentColor" className="text-primary">
          <path d="M2.25 2.25h19.5v19.5H2.25z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <text x="12" y="14" textAnchor="middle" className="text-primary font-bold" style={{ fontSize: '6px' }}>KOMATSU</text>
        </svg>
      )
    },
    {
      name: 'Caterpillar',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="50" fill="currentColor" className="text-primary">
          <path d="M2.25 2.25h19.5v19.5H2.25z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <text x="12" y="14" textAnchor="middle" className="text-primary font-bold" style={{ fontSize: '6px' }}>CAT</text>
        </svg>
      )
    },
    {
      name: 'Finning',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="50" fill="currentColor" className="text-primary">
          <path d="M2.25 2.25h19.5v19.5H2.25z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <text x="12" y="14" textAnchor="middle" className="text-primary font-bold" style={{ fontSize: '6px' }}>FINNING</text>
        </svg>
      )
    },
    {
      name: 'Volvo',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="50" fill="currentColor" className="text-primary">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 8v8" stroke="currentColor" strokeWidth="1.5"/>
          <text x="12" y="14" textAnchor="middle" className="text-primary font-bold" style={{ fontSize: '6px' }}>VOLVO</text>
        </svg>
      )
    },
    {
      name: 'Liebherr',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="50" fill="currentColor" className="text-primary">
          <path d="M2.25 2.25h19.5v19.5H2.25z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <text x="12" y="14" textAnchor="middle" className="text-primary font-bold" style={{ fontSize: '6px' }}>LIEBHERR</text>
        </svg>
      )
    }
  ];

  return (
    <section className="py-12 bg-gray-100" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <h3 className="font-heading text-2xl font-bold text-primary">Trabajamos con las mejores marcas</h3>
          <div className="w-16 h-1 bg-secondary mx-auto mt-3"></div>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {brands.map((brand, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {brand.logo}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}