import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { RegistrationForm } from './RegistrationForm';
import { useLanguage } from '@/contexts/LanguageContext';

export function ActionCTA() {
  const { language } = useLanguage();
  return (
    <section className="py-10 sm:py-16 bg-primary text-white relative overflow-hidden">
      {/* Fondo sólido con gradiente sutil */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary to-[#0B3146]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
        >
          <motion.h2 
            className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
            variants={slideUp}
          >
            {language === 'es' 
              ? '¿Listo para participar en nuestros eventos?' 
              : 'Ready to participate in our events?'}
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 px-2 sm:px-0"
            variants={slideUp}
          >
            {language === 'es'
              ? 'Accede a nuestra plataforma de remates en vivo para pujar por la maquinaria que necesitas a precios competitivos. Regístrate gratis hoy mismo.'
              : 'Access our live auction platform to bid on the machinery you need at competitive prices. Register for free today.'}
          </motion.p>
          <RegistrationForm />
        </motion.div>
      </div>
    </section>
  );
}
