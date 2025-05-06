import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { RegistrationForm } from './RegistrationForm';
import { useLanguage } from '@/contexts/LanguageContext';

export function ActionCTA() {
  return (
    <section className="py-16 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1541783273000-f5c4d4fa9ee5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="" 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
        >
          <motion.h2 
            className="font-heading text-3xl md:text-4xl font-bold mb-4"
            variants={slideUp}
          >
            ¿Listo para participar en nuestros eventos?
          </motion.h2>
          <motion.p 
            className="text-gray-300 mb-8"
            variants={slideUp}
          >
            Accede a nuestra plataforma de remates en vivo para pujar por la maquinaria que necesitas a precios competitivos. Regístrate gratis hoy mismo.
          </motion.p>
          <RegistrationForm />
        </motion.div>
      </div>
    </section>
  );
}
