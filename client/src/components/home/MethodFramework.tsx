import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  FileText, Camera, Monitor, Users, Video, CreditCard, 
  FileCheck, Truck, MapPin
} from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  index: number;
  isInView: boolean;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface StepData {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  row: number;
  col: number;
}

export function MethodFramework() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const steps: StepData[] = [
    // Primera fila
    { 
      icon: <FileText size={20} className="text-gray-600" />, 
      titleKey: 'method.step1.title',
      descriptionKey: 'method.step1.desc',
      row: 1,
      col: 1
    },
    { 
      icon: <Camera size={20} className="text-gray-600" />, 
      titleKey: 'method.step2.title',
      descriptionKey: 'method.step2.desc',
      row: 1,
      col: 2
    },
    { 
      icon: <Monitor size={20} className="text-gray-600" />, 
      titleKey: 'method.step3.title',
      descriptionKey: 'method.step3.desc',
      row: 1,
      col: 3
    },
    { 
      icon: <Users size={20} className="text-gray-600" />, 
      titleKey: 'method.step4.title',
      descriptionKey: 'method.step4.desc',
      row: 1,
      col: 4
    },
    
    // Segunda fila
    { 
      icon: <Video size={20} className="text-gray-600" />, 
      titleKey: 'method.step5.title',
      descriptionKey: 'method.step5.desc',
      row: 2,
      col: 1
    },
    { 
      icon: <FileText size={20} className="text-gray-600" />, 
      titleKey: 'method.step6.title',
      descriptionKey: 'method.step6.desc',
      row: 2,
      col: 2
    },
    { 
      icon: <CreditCard size={20} className="text-gray-600" />, 
      titleKey: 'method.step7.title',
      descriptionKey: 'method.step7.desc',
      row: 2,
      col: 3
    },
    
    // Tercera fila
    { 
      icon: <FileCheck size={20} className="text-gray-600" />, 
      titleKey: 'method.step8.title',
      descriptionKey: 'method.step8.desc',
      row: 3,
      col: 1
    },
    { 
      icon: <Truck size={20} className="text-gray-600" />, 
      titleKey: 'method.step9.title',
      descriptionKey: 'method.step9.desc',
      row: 3,
      col: 2
    },
    { 
      icon: <MapPin size={20} className="text-gray-600" />, 
      titleKey: 'method.step10.title',
      descriptionKey: 'method.step10.desc',
      row: 3,
      col: 3
    }
  ];

  // Agrupar los pasos por fila
  const firstRow = steps.filter(step => step.row === 1);
  const secondRow = steps.filter(step => step.row === 2);
  const thirdRow = steps.filter(step => step.row === 3);
  
  return (
    <section className="py-16 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            {t('method.title')} <span className="text-primary">{t('method.subtitle')}</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            {t('method.description')}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Primera fila */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 md:gap-8 mb-20 relative">
            {firstRow.map((step, index) => (
              <Step 
                key={`row1-${index}`}
                icon={step.icon}
                titleKey={step.titleKey}
                descriptionKey={step.descriptionKey}
                index={index}
                isInView={isInView}
                isActive={activeStep === index}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              />
            ))}
            
            {/* Línea conectora horizontal primera fila */}
            <motion.div 
              className="absolute bottom-[-40px] left-[10%] right-[10%] h-0.5 hidden md:block"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ backgroundColor: '#FFC832', transformOrigin: 'center' }}
            />
            
            {/* Líneas verticales hacia la segunda fila */}
            <motion.div 
              className="absolute h-10 w-0.5 bottom-[-40px] left-[25%] hidden md:block"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{ backgroundColor: '#FFC832', transformOrigin: 'top' }}
            />
            <motion.div 
              className="absolute h-10 w-0.5 bottom-[-40px] left-[50%] hidden md:block"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              style={{ backgroundColor: '#FFC832', transformOrigin: 'top' }}
            />
            <motion.div 
              className="absolute h-10 w-0.5 bottom-[-40px] left-[75%] hidden md:block"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              style={{ backgroundColor: '#FFC832', transformOrigin: 'top' }}
            />
          </div>
          
          {/* Segunda fila */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 md:gap-8 mb-20 relative">
            {secondRow.map((step, index) => (
              <Step 
                key={`row2-${index}`}
                icon={step.icon}
                titleKey={step.titleKey}
                descriptionKey={step.descriptionKey}
                index={index + 4}
                isInView={isInView}
                isActive={activeStep === index + 4}
                onMouseEnter={() => setActiveStep(index + 4)}
                onMouseLeave={() => setActiveStep(null)}
              />
            ))}
            
            {/* Línea conectora horizontal segunda fila */}
            <motion.div 
              className="absolute bottom-[-40px] left-[16.5%] right-[16.5%] h-0.5 hidden md:block"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              style={{ backgroundColor: '#FFC832', transformOrigin: 'center' }}
            />
            
            {/* Líneas verticales hacia la tercera fila */}
            <motion.div 
              className="absolute h-10 w-0.5 bottom-[-40px] left-[16.5%] hidden md:block"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              style={{ backgroundColor: '#FFC832', transformOrigin: 'top' }}
            />
            <motion.div 
              className="absolute h-10 w-0.5 bottom-[-40px] left-[50%] hidden md:block"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              style={{ backgroundColor: '#FFC832', transformOrigin: 'top' }}
            />
            <motion.div 
              className="absolute h-10 w-0.5 bottom-[-40px] left-[83.5%] hidden md:block"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.5, delay: 2 }}
              style={{ backgroundColor: '#FFC832', transformOrigin: 'top' }}
            />
          </div>
          
          {/* Tercera fila */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 md:gap-8 relative">
            {thirdRow.map((step, index) => (
              <Step 
                key={`row3-${index}`}
                icon={step.icon}
                titleKey={step.titleKey}
                descriptionKey={step.descriptionKey}
                index={index + 7}
                isInView={isInView}
                isActive={activeStep === index + 7}
                onMouseEnter={() => setActiveStep(index + 7)}
                onMouseLeave={() => setActiveStep(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ 
  icon, 
  titleKey, 
  descriptionKey, 
  index, 
  isInView, 
  isActive,
  onMouseEnter,
  onMouseLeave
}: StepProps) {
  const { t } = useLanguage();
  
  // Calcular retraso basado en el índice para la animación escalonada
  const delay = index * 0.15;
  
  return (
    <motion.div
      className="flex flex-col items-center text-center relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="relative flex items-center justify-center mb-4 cursor-pointer"
        animate={isActive ? { y: -4 } : { y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Círculo exterior con borde */}
        <motion.div 
          className="absolute inset-0 w-[60px] h-[60px] rounded-full border-[1px] border-gray-300"
          animate={isActive ? { scale: 1.1, borderColor: "#FFC832" } : { scale: 1, borderColor: "#d1d5db" }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Círculo intermedio con sombra */}
        <motion.div 
          className="absolute w-[48px] h-[48px] rounded-full bg-gray-100 shadow-sm"
          animate={isActive ? { backgroundColor: "#FFF8E0" } : { backgroundColor: "#f3f4f6" }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Círculo interior con icono */}
        <div className="relative w-[60px] h-[60px] flex items-center justify-center">
          <motion.div 
            className="relative z-20"
            animate={isActive ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
        </div>
      </motion.div>
      
      <motion.h3 
        className="text-sm font-semibold mb-1 text-gray-800"
        animate={isActive ? { color: "#FFC832" } : { color: "#1F2937" }}
        transition={{ duration: 0.3 }}
      >
        {t(titleKey)}
      </motion.h3>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute -bottom-16 left-0 right-0 mx-auto z-20 w-[180px] bg-white shadow-md rounded-md p-2 text-xs text-gray-700 border border-gray-100"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {t(descriptionKey)}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-100"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}