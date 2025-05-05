import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  FileText, Camera, Monitor, Users, Video, 
  FileCheck, Truck, MapPin, CreditCard
} from 'lucide-react';

export function MethodFramework() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  const firstRowItems = [
    {
      icon: <FileText className="w-6 h-6" />,
      titleKey: 'method.step1.title',
      descriptionKey: 'method.step1.desc',
      index: 0
    },
    {
      icon: <Camera className="w-6 h-6" />,
      titleKey: 'method.step2.title',
      descriptionKey: 'method.step2.desc',
      index: 1
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      titleKey: 'method.step3.title',
      descriptionKey: 'method.step3.desc',
      index: 2
    },
    {
      icon: <Users className="w-6 h-6" />,
      titleKey: 'method.step4.title',
      descriptionKey: 'method.step4.desc',
      index: 3
    }
  ];
  
  const secondRowItems = [
    {
      icon: <Video className="w-6 h-6" />,
      titleKey: 'method.step5.title',
      descriptionKey: 'method.step5.desc',
      index: 4
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      titleKey: 'method.step6.title',
      descriptionKey: 'method.step6.desc',
      index: 5
    },
    {
      icon: <FileText className="w-6 h-6" />,
      titleKey: 'method.step7.title',
      descriptionKey: 'method.step7.desc',
      index: 6
    }
  ];
  
  const thirdRowItems = [
    {
      icon: <FileCheck className="w-6 h-6" />,
      titleKey: 'method.step8.title',
      descriptionKey: 'method.step8.desc',
      index: 7
    },
    {
      icon: <Truck className="w-6 h-6" />,
      titleKey: 'method.step9.title',
      descriptionKey: 'method.step9.desc',
      index: 8
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      titleKey: 'method.step10.title',
      descriptionKey: 'method.step10.desc',
      index: 9
    }
  ];
  
  return (
    <section id="metodo" className="py-16 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {t('method.title')} - {t('method.subtitle')}
          </h2>
          <div className="mx-auto w-24 h-1 bg-primary mb-5"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('method.description')}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Primera fila */}
          <div className="grid grid-cols-4 gap-6 mb-12 relative">
            {firstRowItems.map((item, index) => (
              <div 
                key={`row1-${index}`} 
                className="flex flex-col items-center text-center"
                onMouseEnter={() => setHoveredItem(item.index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="mb-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mx-auto">
                    {item.icon}
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-gray-700">{t(item.titleKey)}</h3>
                  {hoveredItem === item.index && (
                    <div className="text-xs text-gray-500 mt-2">
                      {t(item.descriptionKey)}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
            
            {/* Línea horizontal conectora */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute left-[12%] right-[12%] h-[1px] bg-yellow-400 bottom-[-20px]"
              style={{ transformOrigin: 'center' }}
            />
          </div>
          
          {/* Segunda fila */}
          <div className="grid grid-cols-3 gap-6 mb-12 relative">
            {secondRowItems.map((item, index) => (
              <div 
                key={`row2-${index}`} 
                className="flex flex-col items-center text-center"
                onMouseEnter={() => setHoveredItem(item.index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  className="mb-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mx-auto">
                    {item.icon}
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-gray-700">{t(item.titleKey)}</h3>
                  {hoveredItem === item.index && (
                    <div className="text-xs text-gray-500 mt-2">
                      {t(item.descriptionKey)}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
            
            {/* Línea horizontal conectora */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="absolute left-[12%] right-[12%] h-[1px] bg-yellow-400 bottom-[-20px]"
              style={{ transformOrigin: 'center' }}
            />
          </div>
          
          {/* Tercera fila */}
          <div className="grid grid-cols-3 gap-6 relative">
            {thirdRowItems.map((item, index) => (
              <div 
                key={`row3-${index}`} 
                className="flex flex-col items-center text-center"
                onMouseEnter={() => setHoveredItem(item.index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.4 }}
                  className="mb-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mx-auto">
                    {item.icon}
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-gray-700">{t(item.titleKey)}</h3>
                  {hoveredItem === item.index && (
                    <div className="text-xs text-gray-500 mt-2">
                      {t(item.descriptionKey)}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
            
            {/* Línea horizontal conectora última fila - es un poco más corta */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="absolute left-[25%] right-[25%] h-[1px] bg-yellow-400 top-[35px]"
              style={{ transformOrigin: 'center' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}