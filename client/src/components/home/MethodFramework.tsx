import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface StepProps {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  index: number;
  isInView: boolean;
}

interface StepData {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

export function MethodFramework() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const steps: StepData[] = [
    { 
      icon: '📋', 
      titleKey: 'method.step1.title',
      descriptionKey: 'method.step1.desc'
    },
    { 
      icon: '📷', 
      titleKey: 'method.step2.title',
      descriptionKey: 'method.step2.desc'
    },
    { 
      icon: '💻', 
      titleKey: 'method.step3.title',
      descriptionKey: 'method.step3.desc'
    },
    { 
      icon: '👨‍💼', 
      titleKey: 'method.step4.title',
      descriptionKey: 'method.step4.desc'
    },
    { 
      icon: '🎥', 
      titleKey: 'method.step5.title',
      descriptionKey: 'method.step5.desc'
    },
    { 
      icon: '💰', 
      titleKey: 'method.step6.title',
      descriptionKey: 'method.step6.desc'
    },
    { 
      icon: '💵', 
      titleKey: 'method.step7.title',
      descriptionKey: 'method.step7.desc'
    },
    { 
      icon: '📝', 
      titleKey: 'method.step8.title',
      descriptionKey: 'method.step8.desc'
    },
    { 
      icon: '🚚', 
      titleKey: 'method.step9.title',
      descriptionKey: 'method.step9.desc'
    },
    { 
      icon: '🎯', 
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
  
  return (
    <section className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
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
          {/* Líneas conectoras */}
          <div className="absolute top-[70px] left-[12%] right-[12%] h-0.5 bg-primary/30 hidden md:block"></div>
          <div className="absolute top-[220px] left-[20%] right-[20%] h-0.5 bg-primary/30 hidden md:block"></div>
          <div className="absolute top-[370px] left-[15%] right-[15%] h-0.5 bg-primary/30 hidden md:block"></div>
          
          {/* Primera fila */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {firstRow.map((step, index) => (
              <Step 
                key={index} 
                icon={step.icon} 
                titleKey={step.titleKey} 
                descriptionKey={step.descriptionKey} 
                index={index}
                isInView={isInView}
              />
            ))}
          </motion.div>
          
          {/* Segunda fila */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 md:mx-20"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {secondRow.map((step, index) => (
              <Step 
                key={index + 4} 
                icon={step.icon} 
                titleKey={step.titleKey} 
                descriptionKey={step.descriptionKey} 
                index={index + 4}
                isInView={isInView}
              />
            ))}
          </motion.div>
          
          {/* Tercera fila */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:mx-10"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {thirdRow.map((step, index) => (
              <Step 
                key={index + 7} 
                icon={step.icon} 
                titleKey={step.titleKey} 
                descriptionKey={step.descriptionKey} 
                index={index + 7}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Step({ icon, titleKey, descriptionKey, index, isInView }: StepProps) {
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
    >
      <motion.div
        className="relative w-16 h-16 flex items-center justify-center bg-white shadow-lg rounded-full mb-4 border-2 border-primary/20"
        whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(255, 200, 50, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        animate={isHovered ? { y: -5 } : { y: 0 }}
      >
        <span className="text-2xl">{icon}</span>
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/50"
          initial={{ scale: 0, opacity: 0 }}
          animate={isHovered ? { scale: 1.1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      <motion.h3 
        className="text-base font-bold text-center mb-1 text-gray-800"
        animate={isHovered ? { color: "#FFC832" } : { color: "#1F2937" }}
        transition={{ duration: 0.3 }}
      >
        {t(titleKey)}
      </motion.h3>
      
      <motion.div
        className="text-sm text-center text-gray-600 max-w-[200px] bg-white p-2 rounded-lg shadow-md opacity-0 absolute -bottom-20 left-0 right-0 mx-auto"
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        {t(descriptionKey)}
      </motion.div>
    </motion.div>
  );
}