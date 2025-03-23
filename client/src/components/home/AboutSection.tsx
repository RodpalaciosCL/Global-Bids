import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => setVideoLoaded(true), 1000);
    return () => clearTimeout(timeout);
  }, []);
  
  const expertiseAreas = [
    {
      title: "Experiencia",
      value: "15+",
      subtitle: "años en el mercado",
      icon: "fa-medal"
    },
    {
      title: "Activos",
      value: "1,500+",
      subtitle: "maquinarias vendidas",
      icon: "fa-truck-monster"
    },
    {
      title: "Cobertura",
      value: "12",
      subtitle: "países en Latinoamérica",
      icon: "fa-globe-americas"
    },
    {
      title: "Clientes",
      value: "98%",
      subtitle: "de satisfacción",
      icon: "fa-users"
    }
  ];
  
  const habilidadesEspeciales = [
    "Tasaciones certificadas conforme a estándares internacionales",
    "Evaluación detallada del estado mecánico de cada activo",
    "Documentación fotográfica profesional de cada equipo",
    "Informes completos de historial de servicio y mantenimiento",
    "Verificación de números de serie y autenticidad",
    "Evaluación de cumplimiento normativo y certificaciones",
    "Análisis de valor de mercado actualizado por región",
    "Proyección de vida útil remanente"
  ];
  
  const sectoresEspecializados = [
    "Maquinaria de excavación y movimiento de tierra",
    "Equipos de construcción civil e industrial",
    "Maquinaria forestal y procesamiento de madera",
    "Camiones y vehículos de transporte industrial",
    "Equipos de generación eléctrica y energía",
    "Maquinaria minera subterránea y a cielo abierto",
    "Grúas y equipos de elevación industrial",
    "Equipos de pavimentación y asfalto"
  ];
  
  const ventajasCompetitivas = [
    {
      title: "Presencia Internacional",
      description: "Oficinas propias en 5 países garantizando alcance global real",
      icon: "fa-globe-americas"
    },
    {
      title: "Especialización por Sectores",
      description: "Expertos dedicados exclusivamente a cada tipo de maquinaria",
      icon: "fa-cogs"
    },
    {
      title: "Certificación ISO 9001",
      description: "Procesos estandarizados y auditados internacionalmente",
      icon: "fa-certificate"
    },
    {
      title: "Financiamiento Propio",
      description: "Opciones de financiamiento directo para compradores calificados",
      icon: "fa-hand-holding-usd"
    },
    {
      title: "Garantía Post-Venta",
      description: "Respaldo técnico y garantías extendidas disponibles",
      icon: "fa-shield-alt"
    },
    {
      title: "Equipo Multidisciplinario",
      description: "Profesionales de ingeniería, mecánica, finanzas y derecho",
      icon: "fa-users-cog"
    }
  ];
  
  return (
    <section id="nosotros" className="min-h-screen pt-16 pb-20 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Video Background Banner */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-primary/70 z-10"></div>
        {videoLoaded && (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="https://cdn.pixabay.com/vimeo/328371236/mining-24536.mp4?width=1280&hash=e21c55bc5c41b09aab2c8957cb7691a8af1b7c4f" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
        )}
        
        <div className="relative z-20 pt-16 pb-20 h-full flex flex-col justify-center">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="inline-block bg-white/10 rounded-full backdrop-blur-sm px-6 py-2 mb-6">
                <span className="text-white font-medium text-sm">Expertos en Maquinaria Industrial desde 2010</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">Quiénes Somos</h2>
              <div className="w-28 h-1.5 bg-secondary mx-auto mb-8"></div>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8">
                Con más de <span className="font-bold">15 años de experiencia</span>, nos hemos consolidado como líderes en el mercado de subastas y valoración de maquinaria pesada en Latinoamérica, especializándonos en equipos para los sectores <span className="font-bold">minero, forestal e industrial</span>.
              </p>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                Nuestro compromiso es ofrecer un servicio integral, transparente y altamente profesional, marcando la diferencia en cada operación que realizamos.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="container mx-auto px-4 mt-[500px] mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {expertiseAreas.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <i className={`fas ${stat.icon} text-2xl`}></i>
              </div>
              <div className="text-5xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm mb-2">{stat.subtitle}</div>
              <div className="font-medium text-gray-800 text-lg">{stat.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Detailed Company Info */}
      <div className="container mx-auto px-4 mb-20">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <motion.div 
              className="p-6 md:p-10 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary border-b border-gray-100 pb-4">
                Nuestra Historia
              </h3>
              
              <div className="space-y-4 text-gray-600">
                <p className="text-base md:text-lg leading-relaxed">
                  <span className="font-semibold text-primary">MacBid</span> nació en 2010 como una respuesta a la necesidad del mercado latinoamericano de contar con un servicio profesional y transparente para la valoración y comercialización de maquinaria pesada.
                </p>
                
                <p className="text-base md:text-lg leading-relaxed">
                  Lo que comenzó como una pequeña empresa familiar en Santiago de Chile, rápidamente se expandió por toda la región gracias a nuestro enfoque en la <span className="font-semibold">especialización técnica</span>, el <span className="font-semibold">servicio personalizado</span> y la <span className="font-semibold">transparencia</span> en cada operación.
                </p>
                
                <p className="text-base md:text-lg leading-relaxed">
                  Hoy, con presencia en más de 12 países y un equipo de más de 120 profesionales especializados, nos hemos consolidado como el referente regional en subastas de maquinaria industrial, atendiendo tanto a grandes corporaciones como a pequeños empresarios.
                </p>
              </div>
              
              <div className="pt-4">
                <h4 className="font-bold text-xl text-primary mb-4">Áreas de Especialización</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {sectoresEspecializados.map((sector, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                    >
                      <i className="fas fa-check-circle text-secondary"></i>
                      <span className="text-gray-700 text-sm">{sector}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="p-6 md:p-10 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary border-b border-gray-100 pb-4">
                Nuestras Capacidades
              </h3>
              
              <div className="space-y-4 text-gray-600">
                <p className="text-base md:text-lg leading-relaxed">
                  En MacBid contamos con un equipo multidisciplinario de profesionales altamente cualificados, incluyendo <span className="font-semibold">ingenieros mecánicos</span>, <span className="font-semibold">tasadores certificados</span>, <span className="font-semibold">especialistas en comercio internacional</span> y <span className="font-semibold">expertos en logística</span>.
                </p>
                
                <p className="text-base md:text-lg leading-relaxed">
                  Nuestros procesos de valoración combinan el análisis técnico exhaustivo con un profundo conocimiento del mercado global, permitiéndonos ofrecer tanto a compradores como vendedores la certeza de que cada transacción se realiza al valor justo de mercado.
                </p>
              </div>
              
              <div className="pt-4">
                <h4 className="font-bold text-xl text-primary mb-4">Capacidades Técnicas</h4>
                <div className="grid grid-cols-1 gap-3">
                  {habilidadesEspeciales.map((habilidad, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                    >
                      <span className="text-primary bg-primary/10 p-1 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <i className="fas fa-check text-xs"></i>
                      </span>
                      <span className="text-gray-700 text-sm">{habilidad}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Competitive Advantages */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-heading text-3xl md:text-4xl font-bold mb-5 text-primary">
            ¿Por qué Elegir MacBid?
          </h3>
          <div className="w-24 h-1.5 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed">
            Nuestro enfoque integral y especializado nos diferencia en el mercado, ofreciendo ventajas únicas que garantizan resultados excepcionales en cada operación.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ventajasCompetitivas.map((ventaja, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg h-full flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5 text-primary">
                <i className={`fas ${ventaja.icon} text-xl`}></i>
              </div>
              <h4 className="text-xl font-bold text-primary mb-3">{ventaja.title}</h4>
              <p className="text-gray-600 text-sm flex-grow">{ventaja.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Locations */}
      <div className="container mx-auto px-4 mb-10">
        <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-primary">
                Presencia Internacional
              </h3>
              <p className="text-gray-600">
                Operamos en ubicaciones estratégicas para atender eficientemente todos los mercados de Latinoamérica
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <motion.div 
                className="bg-white rounded-lg p-4 shadow-md text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="w-10 h-10 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-map-marker-alt text-primary"></i>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">Boston, USA</h4>
                <p className="text-gray-600 text-sm">Oficina Central Internacional</p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg p-4 shadow-md text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="w-10 h-10 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-map-marker-alt text-primary"></i>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">Antofagasta La Negra</h4>
                <p className="text-gray-600 text-sm">Centro Operativo Minero</p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg p-4 shadow-md text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="w-10 h-10 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-map-marker-alt text-primary"></i>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">Sierra Gorda</h4>
                <p className="text-gray-600 text-sm">Centro de Evaluación Técnica</p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg p-4 shadow-md text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="w-10 h-10 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-map-marker-alt text-primary"></i>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">Vitacura, Santiago</h4>
                <p className="text-gray-600 text-sm">Oficina Comercial Principal</p>
              </motion.div>
            </div>
            
            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a href="#contacto" className="inline-flex items-center justify-center bg-primary text-white py-3 px-6 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-md">
                <i className="fas fa-envelope mr-2"></i>
                Contáctanos
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
