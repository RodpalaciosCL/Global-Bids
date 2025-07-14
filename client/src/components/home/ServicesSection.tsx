import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeIn, staggerContainer, slideUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';

export function ServicesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { language } = useLanguage();
  
  const getServices = () => [
    {
      icon: 'fa-gavel',
      color: 'from-blue-500 to-blue-600',
      title: language === 'es' ? 'Subastas de Equipos' : 'Equipment Auctions',
      subtitle: language === 'es' ? 'Gestión especializada de remates' : 'Specialized auction management',
      description: language === 'es'
        ? 'Organizamos y gestionamos subastas especializadas de equipos mineros, forestales e industriales, alcanzando una audiencia global de compradores calificados para maximizar el valor de sus activos.'
        : 'We organize and manage specialized auctions of mining, forestry and industrial equipment, reaching a global audience of qualified buyers to maximize the value of your assets.'
    },
    {
      icon: 'fa-database',
      color: 'from-green-500 to-green-600',
      title: language === 'es' ? 'Gestión de Obsoletos' : 'Obsolete Management',
      subtitle: language === 'es' ? 'Tecnología de punta' : 'Cutting-edge technology',
      description: language === 'es'
        ? 'Pioneros en tecnología de punta para detección, inspección, visualización y contabilización de assets y equipos con AI y Visión Computacional.'
        : 'Pioneers in cutting-edge technology for detection, inspection, visualization and accounting of assets and equipment with AI and Computer Vision.'
    },
    {
      icon: 'fa-search',
      color: 'from-purple-500 to-purple-600',
      title: 'Marketing Intelligence',
      subtitle: language === 'es' ? 'Estrategias 1:1 personalizadas' : 'Personalized 1:1 strategies',
      description: language === 'es'
        ? 'Desarrollamos campañas especializadas para el sector de maquinaria pesada, conectando vendedores con compradores específicos y satisfaciendo necesidades 1:1 en tiempo récord.'
        : 'We develop specialized campaigns for the heavy machinery sector, connecting sellers with specific buyers and satisfying 1:1 needs in record time.'
    },
    {
      icon: 'fa-calculator',
      color: 'from-red-500 to-red-600',
      title: language === 'es' ? 'Tasación de Activos' : 'Asset Valuation',
      subtitle: language === 'es' ? 'Valoración especializada' : 'Specialized valuation',
      description: language === 'es'
        ? 'Equipo especializado en tasación de equipos y activos mineros, forestales e industriales, utilizando metodologías avanzadas y conocimiento profundo del mercado internacional.'
        : 'Specialized team in the valuation of mining, forestry and industrial equipment and assets, using advanced methodologies and deep knowledge of the international market.'
    },
    {
      icon: 'fa-truck',
      color: 'from-orange-500 to-orange-600',
      title: language === 'es' ? 'Apoyo Logístico' : 'Logistic Support',
      subtitle: language === 'es' ? 'Soporte en transporte' : 'Transport support',
      description: language === 'es'
        ? 'Brindamos apoyo en servicios logísticos para el transporte nacional e internacional de equipos pesados, facilitando la documentación, permisos y seguros necesarios.'
        : 'We provide support in logistics services for national and international transportation of heavy equipment, facilitating documentation, permits and necessary insurance.'
    },
    {
      icon: 'fa-camera',
      color: 'from-cyan-500 to-cyan-600',
      title: language === 'es' ? 'Documentación Visual' : 'Visual Documentation',
      subtitle: language === 'es' ? 'Tecnología avanzada' : 'Advanced technology',
      description: language === 'es'
        ? 'Servicio de fotografía 360, videos interactivos, modelos 3D y acceso remoto al asset, entre otras soluciones que potencian la visibilidad y ventas de equipos.'
        : '360 photography service, interactive videos, 3D models and remote access to the asset, among other solutions that enhance the visibility and sales of equipment.'
    }
  ];
  
  const services = getServices();

  return (
    <section id="servicios" className="py-16 lg:py-0 bg-white relative" ref={sectionRef}>

      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-0"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="inline-block bg-secondary/10 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
            <span className="text-primary font-semibold text-xs sm:text-sm md:text-base">
              {language === 'es' ? 'Soluciones Especializadas' : 'Specialized Solutions'}
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-primary">
            {language === 'es' ? 'Nuestros Servicios' : 'Our Services'}
          </h2>
          <div className="w-12 sm:w-16 md:w-24 h-1 md:h-1.5 bg-secondary mx-auto mb-4 sm:mb-6 md:mb-8"></div>
          <p className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
            {language === 'es' 
              ? 'Ofrecemos soluciones integrales para la gestión y comercialización de activos de maquinaria minera, forestal e industrial.'
              : 'We offer comprehensive solutions for the management and commercialization of mining, forestry and industrial machinery assets.'}
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
              className="bg-white p-4 sm:p-5 md:p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              variants={slideUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Gradient background for icon */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 sm:mb-4 md:mb-6 text-white transform transition-transform group-hover:scale-110 duration-300`}>
                <i className={`fas ${service.icon} text-lg sm:text-xl md:text-2xl`}></i>
              </div>
              
              <h3 className="font-heading font-bold text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 md:mb-3 text-primary group-hover:text-secondary transition-colors duration-300">{service.title}</h3>
              <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mb-2 sm:mb-3 md:mb-4 font-medium">{service.subtitle}</p>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Se eliminó el botón de "Consultar por servicios personalizados" */}
      </div>
    </section>
  );
}