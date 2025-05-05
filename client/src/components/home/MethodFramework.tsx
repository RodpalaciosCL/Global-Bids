import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  FileText, Camera, Monitor, Users, Video, Wallet, CreditCard, 
  FileCheck, Truck, MapPin
} from 'lucide-react';

interface StepProps {
  iconComponent: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  index: number;
  isInView: boolean;
  isActive: boolean;
  onClick: () => void;
}

interface StepData {
  iconComponent: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
}

export function MethodFramework() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const handleStepClick = (index: number) => {
    setActiveStep(activeStep === index ? null : index);
  };
  
  const steps: StepData[] = [
    { 
      iconComponent: <FileText className="w-6 h-6 text-primary" />, 
      titleKey: 'method.step1.title',
      descriptionKey: 'method.step1.desc'
    },
    { 
      iconComponent: <Camera className="w-6 h-6 text-primary" />, 
      titleKey: 'method.step2.title',
      descriptionKey: 'method.step2.desc'
    },
    { 
      iconComponent: <Monitor className="w-6 h-6 text-primary" />, 
      titleKey: 'method.step3.title',
      descriptionKey: 'method.step3.desc'
    },
    { 
      iconComponent: <Users className="w-6 h-6 text-primary" />, 
      titleKey: 'method.step4.title',
      descriptionKey: 'method.step4.desc'
    },
    { 
      iconComponent: <Video className="w-6 h-6 text-primary" />, 
      titleKey: 'method.step5.title',
      descriptionKey: 'method.step5.desc'
    },
    { 
      iconComponent: <Wallet className="w-6 h-6 text-primary" />, 
      titleKey: 'method.step6.title',
      descriptionKey: 'method.step6.desc'
    },
    { 
      iconComponent: <CreditCard className="w-6 h-6 text-primary" />, 
      titleKey: 'method.step7.title',
      descriptionKey: 'method.step7.desc'
    },
    { 
      iconComponent: <FileCheck className="w-6 h-6 text-primary" />, 
      titleKey: 'method.step8.title',
      descriptionKey: 'method.step8.desc'
    },
    { 
      iconComponent: <Truck className="w-6 h-6 text-primary" />, 
      titleKey: 'method.step9.title',
      descriptionKey: 'method.step9.desc'
    },
    { 
      iconComponent: <MapPin className="w-6 h-6 text-primary" />, 
      titleKey: 'method.step10.title',
      descriptionKey: 'method.step10.desc'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Divide los pasos en tres filas
  const firstRow = steps.slice(0, 4);
  const secondRow = steps.slice(4, 7);
  const thirdRow = steps.slice(7, 10);
  
  // Función para crear las líneas SVG conectoras
  const renderConnectorLines = () => (
    <svg className="absolute inset-0 w-full h-full z-0 hidden md:block" 
      style={{ top: '70px' }} 
      viewBox="0 0 1200 500" 
      preserveAspectRatio="none">
      {/* Primera fila a segunda fila */}
      <motion.path 
        d="M 150,100 L 150,200 L 300,200" 
        fill="transparent" 
        stroke="#FFC832" 
        strokeWidth="2" 
        strokeDasharray="5,5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path 
        d="M 400,100 L 400,150 L 600,200" 
        fill="transparent" 
        stroke="#FFC832" 
        strokeWidth="2" 
        strokeDasharray="5,5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      />
      <motion.path 
        d="M 900,100 L 900,150 L 600,200" 
        fill="transparent" 
        stroke="#FFC832" 
        strokeWidth="2" 
        strokeDasharray="5,5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      />
      
      {/* Segunda fila a tercera fila */}
      <motion.path 
        d="M 300,250 L 300,300 L 150,350" 
        fill="transparent" 
        stroke="#FFC832" 
        strokeWidth="2" 
        strokeDasharray="5,5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      <motion.path 
        d="M 600,250 L 600,300 L 600,350" 
        fill="transparent" 
        stroke="#FFC832" 
        strokeWidth="2" 
        strokeDasharray="5,5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      />
      <motion.path 
        d="M 900,250 L 900,300 L 1050,350" 
        fill="transparent" 
        stroke="#FFC832" 
        strokeWidth="2" 
        strokeDasharray="5,5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </svg>
  );
  
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden" ref={sectionRef}>
      <div 
        className="absolute inset-0 z-0 opacity-5" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23FFC832\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: 'auto'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            {t('method.title')} <span className="text-primary">{t('method.subtitle')}</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            {t('method.description')}
          </p>
        </motion.div>

        <div className="relative">
          {renderConnectorLines()}
          
          {/* Primera fila */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {firstRow.map((step, index) => (
              <Step 
                key={index} 
                iconComponent={step.iconComponent} 
                titleKey={step.titleKey} 
                descriptionKey={step.descriptionKey} 
                index={index}
                isInView={isInView}
                isActive={activeStep === index}
                onClick={() => handleStepClick(index)}
              />
            ))}
          </motion.div>
          
          {/* Segunda fila */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 md:mx-20"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {secondRow.map((step, index) => (
              <Step 
                key={index + 4} 
                iconComponent={step.iconComponent} 
                titleKey={step.titleKey} 
                descriptionKey={step.descriptionKey} 
                index={index + 4}
                isInView={isInView}
                isActive={activeStep === index + 4}
                onClick={() => handleStepClick(index + 4)}
              />
            ))}
          </motion.div>
          
          {/* Tercera fila */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:mx-10"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {thirdRow.map((step, index) => (
              <Step 
                key={index + 7} 
                iconComponent={step.iconComponent} 
                titleKey={step.titleKey} 
                descriptionKey={step.descriptionKey} 
                index={index + 7}
                isInView={isInView}
                isActive={activeStep === index + 7}
                onClick={() => handleStepClick(index + 7)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Step({ 
  iconComponent, 
  titleKey, 
  descriptionKey, 
  index, 
  isInView, 
  isActive, 
  onClick 
}: StepProps) {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  
  // Calcular retraso basado en el índice para la animación escalonada
  const delay = index * 0.1;
  
  return (
    <motion.div
      className="flex flex-col items-center relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.div
        className={`relative w-[60px] h-[60px] flex items-center justify-center rounded-full mb-4 cursor-pointer transition-all duration-300 ${isActive ? 'bg-primary shadow-xl' : 'bg-white shadow-md border-2 border-primary/30'}`}
        whileHover={{ 
          scale: 1.15, 
          boxShadow: "0 10px 25px rgba(255, 200, 50, 0.5)",
          backgroundColor: isActive ? "#FFC832" : "#fff"
        }}
        whileTap={{ scale: 0.95 }}
        animate={isHovered ? { y: -5 } : { y: 0 }}
      >
        <div className={`transition-colors duration-300 ${isActive ? 'text-white' : ''}`}>
          {iconComponent}
        </div>
        
        <motion.div
          className="absolute -inset-3 rounded-full border-2 border-primary/80"
          initial={{ scale: 0, opacity: 0 }}
          animate={isActive ? { scale: 1.1, opacity: 1 } : isHovered ? { scale: 1.05, opacity: 0.7 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          className="absolute -inset-1 rounded-full bg-primary/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={isActive || isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      
      <motion.h3 
        className={`text-sm font-bold text-center mb-1 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-800'}`}
        animate={isHovered ? { color: "#FFC832" } : {}}
        transition={{ duration: 0.3 }}
      >
        {t(titleKey)}
      </motion.h3>
      
      <AnimatePresence>
        {(isActive || isHovered) && (
          <motion.div
            className="text-xs md:text-sm text-center text-gray-600 max-w-[200px] bg-white p-3 rounded-lg shadow-lg absolute -bottom-24 left-0 right-0 mx-auto z-20 border border-gray-100"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {t(descriptionKey)}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}