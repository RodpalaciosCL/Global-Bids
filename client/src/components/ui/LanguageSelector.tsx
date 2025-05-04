import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-gray-100 p-1 rounded-full shadow-sm">
      <motion.button
        onClick={() => setLanguage('es')}
        className={`flex items-center justify-center relative ${
          language === 'es' ? 'z-10' : 'opacity-80 hover:opacity-100'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Español"
      >
        {language === 'es' && (
          <motion.div 
            className="absolute inset-0 bg-primary rounded-full" 
            layoutId="langIndicator"
            initial={false}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          />
        )}
        <div className="relative z-10 px-2 sm:px-3 py-1 sm:py-1.5 flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-sm" viewBox="0 0 640 480">
            <path fill="#AA151B" d="M0 0h640v480H0z"/>
            <path fill="#F1BF00" d="M0 120h640v240H0z"/>
          </svg>
          <span className={`text-xs sm:text-sm font-medium ${language === 'es' ? 'text-white' : 'text-gray-700'}`}>ES</span>
        </div>
      </motion.button>
      
      <motion.button
        onClick={() => setLanguage('en')}
        className={`flex items-center justify-center relative ${
          language === 'en' ? 'z-10' : 'opacity-80 hover:opacity-100'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="English"
      >
        {language === 'en' && (
          <motion.div 
            className="absolute inset-0 bg-primary rounded-full" 
            layoutId="langIndicator"
            initial={false}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          />
        )}
        <div className="relative z-10 px-2 sm:px-3 py-1 sm:py-1.5 flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-sm" viewBox="0 0 640 480">
            <path fill="#012169" d="M0 0h640v480H0z"/>
            <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"/>
            <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"/>
            <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"/>
            <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"/>
          </svg>
          <span className={`text-xs sm:text-sm font-medium ${language === 'en' ? 'text-white' : 'text-gray-700'}`}>EN</span>
        </div>
      </motion.button>
    </div>
  );
}