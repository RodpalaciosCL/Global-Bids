import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Estamos usando un video para esta sección
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => setVideoLoaded(true), 1000);
    return () => clearTimeout(timeout);
  }, []);
  
  // Estadísticas clave
  const keyStats = [
    {
      value: "15+",
      label: "Años de experiencia",
      description: "En el mercado de maquinaria pesada",
      icon: "fa-clock"
    },
    {
      value: "1,500+",
      label: "Maquinarias vendidas",
      description: "Exitosamente en los últimos 5 años",
      icon: "fa-truck-monster"
    },
    {
      value: "12",
      label: "Países cubiertos",
      description: "Con presencia en Latinoamérica",
      icon: "fa-globe-americas"
    },
    {
      value: "98%",
      label: "Clientes satisfechos",
      description: "Recomiendan nuestros servicios",
      icon: "fa-smile"
    }
  ];
  
  // Habilidades especiales
  const expertise = [
    {
      title: "Tasaciones Profesionales",
      details: [
        "Certificaciones internacionales de evaluación",
        "Análisis de mercado detallado por región",
        "Documentación completa de estado y valor",
        "Proyección de depreciación y vida útil"
      ],
      icon: "fa-balance-scale"
    },
    {
      title: "Inspección Técnica",
      details: [
        "Diagnóstico mecánico exhaustivo",
        "Verificación de componentes electrónicos",
        "Pruebas de rendimiento y eficiencia",
        "Detección de desgaste y reparaciones previas"
      ],
      icon: "fa-tools"
    },
    {
      title: "Documentación Legal",
      details: [
        "Verificación de procedencia y propiedad",
        "Validación de números de serie",
        "Cumplimiento normativo y regulatorio",
        "Trámites de transferencia completos"
      ],
      icon: "fa-file-contract"
    }
  ];
  
  // Timeline de historia de la empresa
  const historyTimeline = [
    {
      year: "2010",
      title: "Fundación",
      description: "Inicio de operaciones en Santiago con un equipo de 5 profesionales especialistas en maquinaria minera"
    },
    {
      year: "2013",
      title: "Expansión Regional",
      description: "Apertura de oficinas en Antofagasta para atender mejor al sector minero del norte de Chile"
    },
    {
      year: "2015",
      title: "Internacionalización",
      description: "Expansión a Perú y Colombia, con la primera subasta internacional realizada con éxito"
    },
    {
      year: "2018",
      title: "Innovación Digital",
      description: "Lanzamiento de la primera plataforma de subastas online especializada en maquinaria pesada"
    },
    {
      year: "2022",
      title: "Alcance Global",
      description: "Establecimiento de oficina central en Boston para coordinar operaciones globales"
    }
  ];
  
  // Logos de clientes y marcas
  const brandLogos = [
    { name: "Komatsu", icon: "fa-k" },
    { name: "Caterpillar", icon: "fa-cat" },
    { name: "Finning", icon: "fa-f" },
    { name: "Volvo", icon: "fa-v" },
    { name: "Liebherr", icon: "fa-l" }
  ];
  
  return (
    <section id="nosotros" className="pt-24 pb-20 bg-white/80 relative overflow-hidden" ref={sectionRef}>
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-full h-72 bg-gradient-to-b from-gray-50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-72 bg-gradient-to-t from-gray-50 to-transparent"></div>
      <div className="absolute -right-64 top-64 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -left-64 top-96 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      
      {/* Encabezado de sección */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-primary/10 text-primary inline-block mb-4">
            Nuestra Empresa
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-5 text-gray-900">
            Quiénes <span className="text-primary">Somos</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
            MacBid es líder en subastas y valoración de maquinaria pesada en Latinoamérica, especializados en equipos para los sectores <span className="font-medium text-gray-800">minero, forestal e industrial</span>.
          </p>
        </motion.div>
        
        {/* Video y descripción principal */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-20">
          <motion.div 
            className="lg:col-span-3 rounded-3xl overflow-hidden shadow-xl relative h-[450px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/70 z-10 mix-blend-multiply"></div>
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
            <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-white text-3xl font-bold font-heading mb-4">Nuestra Misión</h3>
                <p className="text-white/90 text-lg max-w-2xl">
                  Proporcionar un servicio integral de valoración y comercialización de maquinaria pesada que garantice transparencia, valor justo y satisfacción para todas las partes involucradas.
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="p-8 flex-grow">
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                Una Historia de Excelencia
              </h3>
              <div className="space-y-5 text-gray-600">
                <p>
                  <span className="font-semibold text-primary">MacBid</span> nació en 2010 como respuesta a la necesidad del mercado latinoamericano de contar con un servicio profesional para la valoración y comercialización de maquinaria pesada.
                </p>
                <p>
                  Lo que comenzó como una pequeña empresa familiar en Santiago de Chile, rápidamente se expandió por toda la región gracias a nuestro enfoque en la <span className="font-semibold text-gray-800">especialización técnica</span>, el <span className="font-semibold text-gray-800">servicio personalizado</span> y la <span className="font-semibold text-gray-800">transparencia</span>.
                </p>
                <p>
                  Hoy contamos con un equipo de más de 120 profesionales especializados y nos hemos consolidado como el referente regional en subastas de maquinaria industrial.
                </p>
              </div>
            </div>
            <div className="bg-primary/5 p-6 flex justify-between">
              {brandLogos.map((brand, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 0.7, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-1">
                    <i className={`fas ${brand.icon} text-primary`}></i>
                  </div>
                  <span className="text-gray-700 text-xs">{brand.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Historia timeline */}
        <motion.div 
          className="mb-24 relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold font-heading text-gray-900 mb-5">
              Nuestra Trayectoria
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Un recorrido de crecimiento continuo y expansión estratégica para atender mejor a nuestros clientes.
            </p>
          </div>
          
          <div className="absolute left-1/2 top-[4.5rem] bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-8 relative">
            {historyTimeline.map((item, index) => (
              <motion.div 
                key={index}
                className={`md:flex items-center gap-8 ${index % 2 === 0 ? 'md:text-right flex-row-reverse' : 'text-left'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.2 }}
              >
                <div className="md:w-1/2 mb-4 md:mb-0">
                  <div className={`bg-white p-6 rounded-2xl shadow-md border border-gray-100 ${index % 2 === 0 ? 'mr-0 ml-auto md:ml-0' : 'ml-0'}`}>
                    <div className="text-lg font-bold text-primary mb-1">{item.title}</div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold z-10 mx-auto md:mx-0">
                  {item.year}
                </div>
                <div className="md:w-1/2 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Estadísticas */}
        <div className="mb-24">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {keyStats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="p-8 text-center border-b md:border-b-0 md:border-r border-white/20 last:border-0"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-5">
                    <i className={`fas ${stat.icon} text-white text-2xl`}></i>
                  </div>
                  <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white font-medium mb-1">{stat.label}</div>
                  <div className="text-white/70 text-sm">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Áreas de experticia */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold font-heading text-gray-900 mb-5">
              Nuestras Áreas de Experticia
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Contamos con especialistas en cada fase del proceso de valoración y comercialización de maquinaria.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map((area, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.15 * index }}
              >
                <div className="bg-primary/5 p-6 flex items-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                    <i className={`fas ${area.icon} text-primary text-2xl`}></i>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">{area.title}</h4>
                </div>
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    {area.details.map((detail, detailIndex) => (
                      <motion.li 
                        key={detailIndex} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.3, delay: 0.1 * detailIndex + 0.3 * index }}
                      >
                        <span className="text-primary mt-1 mr-3 flex-shrink-0">
                          <i className="fas fa-check-circle"></i>
                        </span>
                        <span className="text-gray-700">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <motion.div 
          className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
            ¿Interesado en nuestros servicios?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Nuestro equipo está listo para asistirte con cualquier consulta sobre valoración de maquinaria, 
            próximas subastas o procedimientos de compra-venta.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a 
              href="#catalogo" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="fas fa-search mr-2"></i>
              Explorar Catálogo
            </motion.a>
            <motion.a 
              href="#contacto" 
              className="bg-white hover:bg-gray-50 text-primary border border-primary px-8 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center shadow-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="fas fa-envelope mr-2"></i>
              Contactar a un Especialista
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
