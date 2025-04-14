import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <motion.button
        onClick={() => setLanguage('es')}
        className={`w-8 h-6 rounded overflow-hidden flex items-center justify-center ${
          language === 'es' ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Español"
      >
        <span className="sr-only">Español</span>
        <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-es" viewBox="0 0 640 480">
          <path fill="#AA151B" d="M0 0h640v480H0z"/>
          <path fill="#F1BF00" d="M0 120h640v240H0z"/>
        </svg>
      </motion.button>
      
      <motion.button
        onClick={() => setLanguage('en')}
        className={`w-8 h-6 rounded overflow-hidden flex items-center justify-center ${
          language === 'en' ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="English"
      >
        <span className="sr-only">English</span>
        <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb" viewBox="0 0 640 480">
          <path fill="#012169" d="M0 0h640v480H0z"/>
          <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"/>
          <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"/>
          <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"/>
          <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"/>
        </svg>
      </motion.button>
    </div>
  );
}