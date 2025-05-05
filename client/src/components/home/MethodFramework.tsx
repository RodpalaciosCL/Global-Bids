import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  FileText, Camera, Monitor, Users, Video, 
  FileCheck, Truck, MapPin, CreditCard
} from 'lucide-react';

interface ProcessStepProps {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  index: number;
  isInView: boolean;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MethodFramework() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const firstRowSteps = [
    { 
      icon: <FileText size={24} className="text-gray-700" />, 
      titleKey: 'method.step1.title',
      descriptionKey: 'method.step1.desc'
    },
    { 
      icon: <Camera size={24} className="text-gray-700" />, 
      titleKey: 'method.step2.title',
      descriptionKey: 'method.step2.desc'
    },
    { 
      icon: <Monitor size={24} className="text-gray-700" />, 
      titleKey: 'method.step3.title',
      descriptionKey: 'method.step3.desc'
    },
    { 
      icon: <Users size={24} className="text-gray-700" />, 
      titleKey: 'method.step4.title',
      descriptionKey: 'method.step4.desc'
    }
  ];
  
  const secondRowSteps = [
    { 
      icon: <Video size={24} className="text-gray-700" />, 
      titleKey: 'method.step5.title',
      descriptionKey: 'method.step5.desc'
    },
    { 
      icon: <CreditCard size={24} className="text-gray-700" />, 
      titleKey: 'method.step6.title',
      descriptionKey: 'method.step6.desc'
    },
    { 
      icon: <FileText size={24} className="text-gray-700" />, 
      titleKey: 'method.step7.title',
      descriptionKey: 'method.step7.desc'
    }
  ];
  
  const thirdRowSteps = [
    { 
      icon: <FileCheck size={24} className="text-gray-700" />, 
      titleKey: 'method.step8.title',
      descriptionKey: 'method.step8.desc'
    },
    { 
      icon: <Truck size={24} className="text-gray-700" />, 
      titleKey: 'method.step9.title',
      descriptionKey: 'method.step9.desc'
    },
    { 
      icon: <MapPin size={24} className="text-gray-700" />, 
      titleKey: 'method.step10.title',
      descriptionKey: 'method.step10.desc'
    }
  ];
  
  return (
    <section id="metodo" className="py-12 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            {t('method.title')} <span className="text-primary">{t('method.subtitle')}</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            {t('method.description')}
          </p>
        </motion.div>
        
        {/* Proceso completo con un diseño similar a la imagen de referencia */}
        <div className="max-w-4xl mx-auto">
          {/* Primera fila */}
          <div className="relative mb-14">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {firstRowSteps.map((step, idx) => (
                <ProcessStep
                  key={`step-1-${idx}`}
                  icon={step.icon}
                  titleKey={step.titleKey}
                  descriptionKey={step.descriptionKey}
                  index={idx}
                  isInView={isInView}
                  isActive={activeStep === idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                />
              ))}
            </div>
            
            {/* Línea horizontal conectora en primera fila */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden md:block absolute left-[12%] right-[12%] h-[2px] bg-yellow-400 bottom-[-25px]"
              style={{ transformOrigin: 'center' }}
            />
          </div>
          
          {/* Segunda fila */}
          <div className="relative mb-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {secondRowSteps.map((step, idx) => (
                <ProcessStep
                  key={`step-2-${idx}`}
                  icon={step.icon}
                  titleKey={step.titleKey}
                  descriptionKey={step.descriptionKey}
                  index={idx + 4}
                  isInView={isInView}
                  isActive={activeStep === (idx + 4)}
                  onMouseEnter={() => setActiveStep(idx + 4)}
                  onMouseLeave={() => setActiveStep(null)}
                />
              ))}
            </div>
            
            {/* Línea horizontal conectora en segunda fila */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="hidden md:block absolute left-[16%] right-[16%] h-[2px] bg-yellow-400 bottom-[-25px]"
              style={{ transformOrigin: 'center' }}
            />
          </div>
          
          {/* Tercera fila */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {thirdRowSteps.map((step, idx) => (
                <ProcessStep
                  key={`step-3-${idx}`}
                  icon={step.icon}
                  titleKey={step.titleKey}
                  descriptionKey={step.descriptionKey}
                  index={idx + 7}
                  isInView={isInView}
                  isActive={activeStep === (idx + 7)}
                  onMouseEnter={() => setActiveStep(idx + 7)}
                  onMouseLeave={() => setActiveStep(null)}
                />
              ))}
            </div>
            
            {/* Líneas horizontales conectoras entre pasos */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              className="hidden md:block absolute left-[22%] w-[12%] h-[2px] bg-yellow-400 top-[30px]"
              style={{ transformOrigin: 'left' }}
            />
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="hidden md:block absolute left-[56%] w-[12%] h-[2px] bg-yellow-400 top-[30px]"
              style={{ transformOrigin: 'left' }}
            />
          </div>
          
          {/* Conectores verticales entre filas */}
          {/* De la primera a la segunda fila */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden md:block absolute h-[30px] w-[2px] bg-yellow-400"
            style={{ 
              transformOrigin: 'top',
              top: '145px',
              left: '25%'
            }}
          />
          
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden md:block absolute h-[30px] w-[2px] bg-yellow-400"
            style={{ 
              transformOrigin: 'top',
              top: '145px',
              left: '50%'
            }}
          />
          
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden md:block absolute h-[30px] w-[2px] bg-yellow-400"
            style={{ 
              transformOrigin: 'top',
              top: '145px',
              left: '75%'
            }}
          />
          
          {/* De la segunda a la tercera fila */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="hidden md:block absolute h-[30px] w-[2px] bg-yellow-400"
            style={{ 
              transformOrigin: 'top',
              top: '285px',
              left: '17%'
            }}
          />
          
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="hidden md:block absolute h-[30px] w-[2px] bg-yellow-400"
            style={{ 
              transformOrigin: 'top',
              top: '285px',
              left: '50%'
            }}
          />
          
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="hidden md:block absolute h-[30px] w-[2px] bg-yellow-400"
            style={{ 
              transformOrigin: 'top',
              top: '285px',
              left: '83%'
            }}
          />
          
          {/* Flechas de dirección (triángulos) */}
          <div className="hidden md:block absolute w-0 h-0 border-t-0 border-b-[6px] border-b-yellow-400 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent" style={{ top: '285px', left: '16.5%', transform: 'rotate(180deg)' }} />
          <div className="hidden md:block absolute w-0 h-0 border-t-0 border-b-[6px] border-b-yellow-400 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent" style={{ top: '285px', left: '49.5%', transform: 'rotate(180deg)' }} />
          <div className="hidden md:block absolute w-0 h-0 border-t-0 border-b-[6px] border-b-yellow-400 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent" style={{ top: '285px', left: '82.5%', transform: 'rotate(180deg)' }} />
          
          <div className="hidden md:block absolute w-0 h-0 border-t-0 border-b-[6px] border-b-yellow-400 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent" style={{ top: '145px', left: '24.5%', transform: 'rotate(180deg)' }} />
          <div className="hidden md:block absolute w-0 h-0 border-t-0 border-b-[6px] border-b-yellow-400 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent" style={{ top: '145px', left: '49.5%', transform: 'rotate(180deg)' }} />
          <div className="hidden md:block absolute w-0 h-0 border-t-0 border-b-[6px] border-b-yellow-400 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent" style={{ top: '145px', left: '74.5%', transform: 'rotate(180deg)' }} />
          
          <div className="hidden md:block absolute w-0 h-0 border-t-0 border-b-[6px] border-b-yellow-400 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent" style={{ top: '29px', left: '33.5%', transform: 'rotate(270deg)' }} />
          <div className="hidden md:block absolute w-0 h-0 border-t-0 border-b-[6px] border-b-yellow-400 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent" style={{ top: '29px', left: '67.5%', transform: 'rotate(270deg)' }} />
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ 
  icon, 
  titleKey, 
  descriptionKey, 
  index, 
  isInView, 
  isActive,
  onMouseEnter,
  onMouseLeave
}: ProcessStepProps) {
  const { t } = useLanguage();
  const delay = index * 0.1;
  
  return (
    <motion.div
      className="flex flex-col items-center relative z-10"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div 
        className={`w-[60px] h-[60px] flex items-center justify-center rounded-full 
                    ${isActive ? 'bg-yellow-50 border-yellow-400' : 'bg-gray-50 border-gray-200'} 
                    border p-1 shadow-sm mb-3 transition-colors duration-200`}
        whileHover={{ scale: 1.05 }}
      >
        <div className={`w-full h-full rounded-full flex items-center justify-center 
                         ${isActive ? 'bg-yellow-100' : 'bg-white'}`}>
          {icon}
        </div>
      </motion.div>
      
      <h3 className={`text-sm font-semibold ${isActive ? 'text-yellow-500' : 'text-gray-700'} text-center max-w-[120px] transition-colors duration-200`}>
        {t(titleKey)}
      </h3>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute -bottom-14 left-0 right-0 mx-auto z-20 w-[180px] bg-white shadow-sm rounded-md p-2 text-xs text-gray-600 border border-gray-100"
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