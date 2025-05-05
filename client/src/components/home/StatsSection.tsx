import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { fadeIn, staggerContainer, scaleIn } from '@/lib/animations';

interface StatItem {
  icon?: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export function StatsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const stats: StatItem[] = [
    { icon: 'fa-gavel', prefix: '+', value: 2800, label: 'Remates' },
    { icon: 'fa-globe', value: 75, label: 'países' },
    { icon: 'fa-dollar-sign', prefix: 'USD ', value: 450, label: 'Ventas en los últimos 24 meses', suffix: 'M' },
    { icon: 'fa-users', value: 950300, label: 'Clientes pre-validados en todo el mundo' }
  ];
  
  return (
    <section className="py-16 bg-primary text-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Nuestros Números</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">Dejamos que los resultados hablen por nosotros. Estos son algunos de nuestros logros a lo largo de nuestra trayectoria.</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isVisible={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface StatCardProps {
  stat: StatItem;
  index: number;
  isVisible: boolean;
}

function StatCard({ stat, index, isVisible }: StatCardProps) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const end = stat.value;
    const duration = 2000; // ms
    const incrementTime = Math.floor(duration / end) < 10 ? 10 : Math.floor(duration / end);
    
    // Faster increment for larger numbers
    const increment = end > 1000 ? Math.ceil(end / 100) : 1;
    
    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [isVisible, stat.value]);
  
  return (
    <motion.div 
      className="text-center bg-primary-light p-6 rounded-lg transition-all duration-300 hover:transform hover:scale-105"
      variants={scaleIn}
    >
      {stat.icon && (
        <div className="text-secondary text-4xl mb-2">
          <i className={`fas ${stat.icon}`}></i>
        </div>
      )}
      <div className="flex justify-center items-center mb-2">
        {stat.prefix && <span className="text-2xl font-bold mr-1">{stat.prefix}</span>}
        <div className="text-4xl font-bold">{count.toLocaleString()}</div>
        {stat.suffix && <span className="text-xl font-bold ml-1">{stat.suffix}</span>}
      </div>
      <div className="uppercase tracking-wider text-sm text-gray-300">{stat.label}</div>
    </motion.div>
  );
}
