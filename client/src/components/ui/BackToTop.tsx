import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const whatsappNumber = "+56994275157";
  const whatsappURL = `https://wa.me/${whatsappNumber}`;

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-5 right-5 flex flex-col items-end gap-3 z-40">
          {/* Botón de WhatsApp */}
          <motion.a
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={language === 'es' ? "Contáctanos vía WhatsApp" : "Contact us via WhatsApp"}
          >
            <i className="fab fa-whatsapp text-xl"></i>
          </motion.a>
          
          {/* Botón de volver arriba */}
          <motion.button
            onClick={scrollToTop}
            className="bg-secondary text-primary p-3 rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={language === 'es' ? "Volver arriba" : "Back to top"}
          >
            <i className="fas fa-arrow-up"></i>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
