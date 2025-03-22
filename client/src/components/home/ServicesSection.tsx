import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeIn, staggerContainer, slideUp } from '@/lib/animations';

export function ServicesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const services = [
    {
      icon: 'fa-gavel',
      title: 'Subastas de Equipos',
      subtitle: 'Gestión especializada de remates',
      description: 'Organizamos y gestionamos subastas especializadas de equipos mineros, alcanzando una audiencia global de compradores calificados.'
    },
    {
      icon: 'fa-database',
      title: 'Gestión de Obsoletos',
      subtitle: 'Optimización de inventarios',
      description: 'Servicio integral para la gestión eficiente de inventarios obsoletos. Incluye identificación, catalogación y comercialización.'
    },
    {
      icon: 'fa-search',
      title: 'Marketing Digital',
      subtitle: 'Estrategias personalizadas',
      description: 'Desarrollamos movimientos especializados para vender, conectar y satisfacer necesidades 1:1 en tiempo récord.'
    },
    {
      icon: 'fa-calculator',
      title: 'Tasación de Activos',
      subtitle: 'Valoración especializada',
      description: 'Equipo especializado en tasación de equipos y activos mineros utilizando metodologías avanzadas.'
    },
    {
      icon: 'fa-truck',
      title: 'Logística Internacional',
      subtitle: 'Transporte especializado',
      description: 'Soluciones logísticas integrales para el transporte nacional e internacional de equipos mineros.'
    },
    {
      icon: 'fa-camera',
      title: 'Fotografía Industrial',
      subtitle: 'Documentación profesional',
      description: 'Servicio de fotografía avanzada, videos y realidad virtual para inmersión y experiencia de venta.'
    }
  ];

  return (
    <section id="servicios" className="py-16 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-primary">Nuestros Servicios</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600">
            Soluciones integrales para la gestión y comercialización de activos de maquinaria
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-accent p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              variants={slideUp}
              whileHover={{ y: -5 }}
            >
              <div className="text-primary text-3xl mb-4">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-2 text-primary">{service.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{service.subtitle}</p>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}