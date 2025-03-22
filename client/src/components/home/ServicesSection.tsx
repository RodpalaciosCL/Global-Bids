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
      color: 'from-blue-500 to-blue-600',
      title: 'Subastas de Equipos',
      subtitle: 'Gestión especializada de remates',
      description: 'Organizamos y gestionamos subastas especializadas de equipos mineros, forestales e industriales, alcanzando una audiencia global de compradores calificados para maximizar el valor de sus activos.'
    },
    {
      icon: 'fa-database',
      color: 'from-green-500 to-green-600',
      title: 'Gestión de Obsoletos',
      subtitle: 'Optimización de inventarios',
      description: 'Servicio integral para la gestión eficiente de inventarios obsoletos. Incluye identificación, catalogación y comercialización, ayudando a recuperar valor de equipos en desuso.'
    },
    {
      icon: 'fa-search',
      color: 'from-purple-500 to-purple-600',
      title: 'Marketing Digital',
      subtitle: 'Estrategias personalizadas',
      description: 'Desarrollamos campañas especializadas para el sector de maquinaria pesada, conectando vendedores con compradores específicos y satisfaciendo necesidades 1:1 en tiempo récord.'
    },
    {
      icon: 'fa-calculator',
      color: 'from-red-500 to-red-600',
      title: 'Tasación de Activos',
      subtitle: 'Valoración especializada',
      description: 'Equipo especializado en tasación de equipos y activos mineros, forestales e industriales, utilizando metodologías avanzadas y conocimiento profundo del mercado internacional.'
    },
    {
      icon: 'fa-truck',
      color: 'from-orange-500 to-orange-600',
      title: 'Logística Internacional',
      subtitle: 'Transporte especializado',
      description: 'Soluciones logísticas integrales para el transporte nacional e internacional de equipos pesados. Manejamos toda la documentación, permisos y seguros necesarios.'
    },
    {
      icon: 'fa-camera',
      color: 'from-cyan-500 to-cyan-600',
      title: 'Fotografía Industrial',
      subtitle: 'Documentación profesional',
      description: 'Servicio de fotografía y videografía avanzada, incluyendo tecnología de realidad virtual, para crear experiencias inmersivas que potencian las ventas de maquinaria.'
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-white relative" ref={sectionRef}>
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 -z-10 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 -z-10 rounded-tr-full"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="inline-block bg-secondary/10 px-6 py-2 rounded-full mb-4">
            <span className="text-primary font-semibold">Soluciones Especializadas</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-primary">Nuestros Servicios</h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            Ofrecemos soluciones integrales para la gestión y comercialización de activos de maquinaria minera, forestal e industrial, adaptadas a las necesidades específicas de cada cliente.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              variants={slideUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Gradient background for icon */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 text-white transform transition-transform group-hover:scale-110 duration-300`}>
                <i className={`fas ${service.icon} text-2xl`}></i>
              </div>
              
              <h3 className="font-heading font-bold text-2xl mb-3 text-primary group-hover:text-secondary transition-colors duration-300">{service.title}</h3>
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-4 font-medium">{service.subtitle}</p>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <a href="#" className="inline-flex items-center text-secondary font-medium group-hover:text-primary transition-colors duration-300">
                  Más información
                  <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-2 transition-transform duration-300"></i>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Extra CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a href="#contacto" className="inline-flex items-center px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors duration-300">
            <span>Consultar por servicios personalizados</span>
            <i className="fas fa-chevron-right ml-2"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}