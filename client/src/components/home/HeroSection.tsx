import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';

export function HeroSection() {
  return (
    <section id="inicio" className="relative bg-primary overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <img 
          src="https://images.unsplash.com/photo-1533582437341-eac7a0e8f0ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="" 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="container mx-auto px-4 py-16 md:py-28 relative z-10">
        <motion.div 
          className="max-w-2xl text-white"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.h1 
            className="font-heading text-4xl md:text-5xl font-bold mb-4 leading-tight"
            variants={slideUp}
          >
            Encuentra la <span className="text-secondary">maquinaria perfecta</span> para tu próximo proyecto
          </motion.h1>
          <motion.p 
            className="text-lg mb-8 text-gray-200"
            variants={slideUp}
          >
            Más de 2,000 unidades de maquinaria pesada en subasta. Excavadoras, camiones, cargadores y más, verificados por expertos.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
            variants={slideUp}
          >
            <motion.a 
              href="#catalogo" 
              className="bg-secondary hover:bg-secondary-dark text-primary px-6 py-3 rounded-lg font-semibold transition duration-300 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Catálogo
            </motion.a>
            <motion.a 
              href="#nosotros" 
              className="border border-white hover:bg-white hover:text-primary px-6 py-3 rounded-lg font-semibold transition duration-300 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Conócenos
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-accent to-transparent"></div>
    </section>
  );
}
