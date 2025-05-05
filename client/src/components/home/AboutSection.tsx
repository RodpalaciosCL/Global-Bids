import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeIn, slideUp } from '@/lib/animations';

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState('historia');
  const { t } = useLanguage();
  
  // Manejar el cambio de tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  // Contenido de los tabs
  const tabContent = {
    historia: {
      title: "Una Historia de Excelencia",
      subtitle: "",
      description: [
        "Global Bids nace de un Joint-Venture entre North Country Auction, empresa Americana experta en subastas, y Grupo Prelco, quienes han estado en el rubro de minería más de 20 años.",
        "En Global Bids contamos con acceso a más de 950,000 clientes internacionales a través de nuestras plataformas online, lo que nos permite conectar la oferta sudamericana con la demanda global de manera digital, segmentada y transparente.",
        "Nuestro enfoque garantiza el mejor valor para los consignatarios al encontrar compradores en mercados donde estos activos tienen alta demanda."
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
              {t('about.title')} <span className="text-primary">{t('about.titleHighlight')}</span>
            </h2>
            <div className="w-28 h-1.5 bg-primary mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
              {t('about.description')} <span className="font-medium text-gray-800">{t('about.descriptionHighlight')}</span>.
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
          className="mt-16 md:mt-24 p-8 md:p-10 bg-gradient-to-br from-primary to-primary/80 rounded-3xl shadow-xl text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Abrimos el Mercado Latinoamericano
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Global Bids ofrece soluciones premium para equipos, piezas, partes y otros activos con respaldo y experiencia comprobada.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <div className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="font-bold text-xl mb-2">Rentabilidad</h4>
              <p className="text-white/70 text-sm">
                Maximizamos el valor de sus activos mediante nuestra extensa red global de compradores y expertos en valoración.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <div className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="font-bold text-xl mb-2">Rapidez</h4>
              <p className="text-white/70 text-sm">
                Procesos optimizados y eficientes que garantizan transacciones ágiles y una rotación efectiva de sus activos.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <div className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="font-bold text-xl mb-2">Transparencia</h4>
              <p className="text-white/70 text-sm">
                Información completa y detallada en cada operación, con documentación certificada y procesos auditables.
              </p>
            </div>
          </div>
          
          {/* Se eliminaron los botones de acción a petición del cliente */}
        </motion.div>
      </div>
    </section>
  );
}
