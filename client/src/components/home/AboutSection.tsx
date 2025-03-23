import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { fadeIn, slideUp } from '@/lib/animations';

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState('historia');
  
  // Manejar el cambio de tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  // Logos de clientes y marcas
  const brandLogos = [
    { name: "Komatsu", letter: "K" },
    { name: "Caterpillar", letter: "C" },
    { name: "Finning", letter: "F" },
    { name: "Volvo", letter: "V" },
    { name: "Liebherr", letter: "L" }
  ];
  
  // Contenido de los tabs
  const tabContent = {
    historia: {
      title: "Una Historia de Excelencia",
      subtitle: "Nuestra trayectoria desde 2010",
      description: [
        "Global Bids nació en 2010 como respuesta a la necesidad del mercado latinoamericano de contar con un servicio profesional para la valoración y comercialización de maquinaria pesada.",
        "Lo que comenzó como una pequeña empresa familiar en Santiago de Chile, rápidamente se expandió por toda la región gracias a nuestro enfoque en la especialización técnica, el servicio personalizado y la transparencia.",
        "Hoy contamos con un equipo de más de 120 profesionales especializados y nos hemos consolidado como el referente regional en subastas de maquinaria industrial."
      ],
      cta: "Conoce nuestra historia",
      image: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600",
      icon: "fa-history"
    },
    mision: {
      title: "Nuestra Misión",
      subtitle: "Compromiso con la excelencia",
      description: [
        "Proporcionar un servicio integral de valoración y comercialización de maquinaria pesada que garantice transparencia, valor justo y satisfacción para todas las partes involucradas.",
        "Nos comprometemos a mantener los más altos estándares de profesionalismo en cada operación, aportando valor tanto a compradores como a vendedores.",
        "Trabajamos constantemente para innovar y mejorar nuestros procesos, incorporando nuevas tecnologías y metodologías que beneficien a nuestros clientes."
      ],
      cta: "Conoce nuestra misión",
      image: "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1600",
      icon: "fa-bullseye"
    },
    presencia: {
      title: "Presencia Internacional",
      subtitle: "Operaciones en 12 países",
      description: [
        "Actualmente, Global Bids tiene presencia en 12 países de Latinoamérica, con oficinas principales en Chile, Perú, Colombia, México y Estados Unidos.",
        "Nuestra sede central en Boston coordina las operaciones globales, mientras que nuestros centros operativos en Antofagasta, La Negra y Sierra Gorda atienden al sector minero chileno.",
        "La oficina de Vitacura en Santiago funciona como nuestro principal centro comercial y administrativo para la región sur."
      ],
      cta: "Ver nuestras sedes",
      image: "https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=1600",
      icon: "fa-globe-americas"
    },
    expertise: {
      title: "Áreas de Experticia",
      subtitle: "Especialistas en equipos industriales",
      description: [
        "Nuestro equipo multidisciplinario incluye ingenieros mecánicos, tasadores certificados, especialistas en comercio internacional y expertos en logística.",
        "Nos especializamos en maquinaria minera, forestal e industrial, cubriendo excavadoras, camiones, cargadores, equipos de generación eléctrica, grúas y más.",
        "Cada pieza de maquinaria es evaluada mediante un riguroso proceso que incluye inspección técnica, valoración de mercado y documentación completa."
      ],
      cta: "Conoce nuestros servicios",
      image: "https://images.pexels.com/photos/2760250/pexels-photo-2760250.jpeg?auto=compress&cs=tinysrgb&w=1600",
      icon: "fa-tools"
    }
  };
  
  // Estadísticas clave
  const keyStats = [
    {
      value: "15+",
      label: "Años de experiencia",
      icon: "fa-clock"
    },
    {
      value: "1,500+",
      label: "Maquinarias vendidas",
      icon: "fa-truck-monster"
    },
    {
      value: "12",
      label: "Países cubiertos",
      icon: "fa-globe-americas"
    },
    {
      value: "98%",
      label: "Clientes satisfechos",
      icon: "fa-smile"
    }
  ];
  
  return (
    <section id="nosotros" className="min-h-screen flex flex-col bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 z-0"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10 flex-grow flex flex-col">
        {/* Encabezado de sección con animación */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-5 text-gray-900">
              Quiénes <span className="text-primary">Somos</span>
            </h2>
            <div className="w-28 h-1.5 bg-primary mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
              Global Bids es líder en subastas y valoración de maquinaria pesada en Latinoamérica, especializados en equipos para los sectores <span className="font-medium text-gray-800">minero, forestal e industrial</span>.
            </p>
          </motion.div>
        </div>
        
        {/* Navegación por tabs con animación */}
        <div className="mb-10">
          <motion.div 
            className="flex flex-wrap justify-center gap-2 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {Object.entries(tabContent).map(([key, content], index) => (
              <motion.button
                key={key}
                className={`px-6 py-3 rounded-full font-medium text-sm md:text-base relative overflow-hidden ${
                  activeTab === key 
                    ? 'text-white shadow-md' 
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors'
                }`}
                onClick={() => handleTabChange(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === key && (
                  <motion.div
                    className="absolute inset-0 bg-primary"
                    layoutId="activeBg"
                    initial={false}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                <span className="relative z-10 flex items-center">
                  <i className={`fas ${content.icon} mr-2`}></i>
                  {content.title}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
        
        {/* Contenido principal con animación al cambiar tabs */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            {Object.entries(tabContent).map(([key, content]) => (
              activeTab === key && (
                <motion.div
                  key={key}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center h-full"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Imagen con overlay */}
                  <div className="h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl relative order-1 lg:order-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/70 mix-blend-multiply z-10"></div>
                    <img 
                      src={content.image}
                      alt={content.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center mr-3">
                          <i className={`fas ${content.icon} text-white`}></i>
                        </div>
                        <div className="text-white/80 text-sm">{content.subtitle}</div>
                      </div>
                      <h3 className="text-white text-3xl font-bold mb-2">{content.title}</h3>
                    </div>
                  </div>
                  
                  {/* Contenido textual */}
                  <div className="space-y-6 p-2">
                    <div className="p-6 md:p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
                      <div className="space-y-4">
                        {content.description.map((paragraph, idx) => (
                          <motion.p 
                            key={idx} 
                            className="text-gray-600 leading-relaxed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * idx }}
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-between items-center">
                        <motion.a
                          href="#contacto"
                          className="inline-flex items-center text-primary font-medium hover:underline group"
                          whileHover={{ x: 4 }}
                        >
                          {content.cta}
                          <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                        </motion.a>
                        
                        <div className="flex gap-1">
                          {brandLogos.map((brand, idx) => (
                            <motion.div
                              key={idx}
                              className="w-8 h-8 rounded-full bg-primary/10"
                              whileHover={{ scale: 1.1, backgroundColor: "rgba(219, 39, 119, 0.2)" }}
                            >
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Estadísticas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {keyStats.map((stat, idx) => (
                        <motion.div
                          key={idx}
                          className="bg-white p-4 rounded-2xl shadow-md text-center border border-gray-100"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.05 * idx + 0.4 }}
                          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                          <div className="w-10 h-10 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-2 text-primary">
                            <i className={`fas ${stat.icon}`}></i>
                          </div>
                          <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                          <div className="text-xs md:text-sm text-gray-500">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
        
        {/* CTA final */}
        <motion.div 
          className="mt-16 md:mt-24 p-8 md:p-10 bg-gradient-to-br from-primary to-primary/80 rounded-3xl shadow-xl text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Una Empresa con Respaldo y Experiencia
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Con 15 años de trayectoria, somos la mejor opción para la valoración y comercialización de maquinaria pesada en toda Latinoamérica.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a 
              href="#catalogo" 
              className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="fas fa-search mr-2"></i>
              Explorar Catálogo
            </motion.a>
            <motion.a 
              href="#contacto" 
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center"
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
