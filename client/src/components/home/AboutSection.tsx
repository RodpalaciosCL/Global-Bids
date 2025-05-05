import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { t, language } = useLanguage();
  
  // Contenido de la historia
  const historiaContent = {
    title: "",
    subtitle: "",
    description: language === 'es' ? [
      "Global Bids es líder en subastas y valoración de maquinaria pesada, chatarra, herramientas y repuestos en Latinoamérica, especializados en equipos y lotes para diversos sectores e industrias, tanto en Chile, como en el resto del mundo.",
      "En Global Bids contamos con acceso a más de 950,000 clientes internacionales a través de nuestras plataformas online, lo que nos permite conectar la oferta sudamericana con la demanda global de manera digital, segmentada y transparente.",
      "Nuestro enfoque garantiza el mejor valor para los consignatarios al encontrar compradores en mercados donde estos activos tienen alta demanda."
    ] : [
      "Global Bids is a leader in auctions and valuation of heavy machinery, scrap, tools, and spare parts in Latin America, specialized in equipment and lots for various sectors and industries, both in Chile and the rest of the world.",
      "At Global Bids, we have access to more than 950,000 international clients through our online platforms, which allows us to connect South American supply with global demand in a digital, segmented, and transparent way.",
      "Our approach guarantees the best value for consignors by finding buyers in markets where these assets are in high demand."
    ],
    image: "https://images.pexels.com/photos/3757226/pexels-photo-3757226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    icon: "fa-history"
  };
  
  // Estadísticas clave
  const keyStats = [
    {
      value: "15+",
      label: t('about.experience'),
      icon: "fa-clock"
    },
    {
      value: "1,500+",
      label: t('about.machinesSold'),
      icon: "fa-truck-monster"
    },
    {
      value: "12",
      label: t('about.countriesCovered'),
      icon: "fa-globe-americas"
    },
    {
      value: "98%",
      label: t('about.clients'),
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
        
        {/* Se eliminó el botón de Historia */}
        
        {/* Contenido principal - Historia de excelencia */}
        <div className="flex-grow">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center h-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Imagen con overlay */}
            <div className="h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl relative order-1 lg:order-none">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/70 mix-blend-multiply z-10"></div>
              <img 
                src={historiaContent.image}
                alt={historiaContent.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center mr-3">
                    <i className={`fas ${historiaContent.icon} text-white`}></i>
                  </div>
                  <div className="text-white/80 text-sm">{historiaContent.subtitle}</div>
                </div>
                <h3 className="text-white text-3xl font-bold mb-2">{historiaContent.title}</h3>
              </div>
            </div>
            
            {/* Contenido textual */}
            <div className="space-y-6 p-2">
              <div className="p-6 md:p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
                <div className="space-y-4">
                  {historiaContent.description.map((paragraph, idx) => (
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
                
                {/* Se eliminó el botón "Conoce nuestra historia" */}
              </div>
              
              {/* Se eliminaron las estadísticas ya que aparecen en la sección hero */}
            </div>
          </motion.div>
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
              {t('about.ctaTitle')}
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              {t('about.ctaDescription')}
            </p>
          </div>
          
          {/* Botón con países */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 font-bold text-white">
              {t('about.worldPresence')}
            </div>
          </div>
          
          {/* Sección de Modelo 360 */}
          <div className="mb-12">
            <h3 className="text-center text-3xl font-bold mb-3">{t('about.model360')}</h3>
            <p className="text-center text-white/80 mb-10 max-w-3xl mx-auto">
              {t('about.model360Desc')}
            </p>
            
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/10 shadow-2xl relative overflow-hidden">
              {/* Elementos decorativos de fondo */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
              
              {/* Fase 1: Preparación */}
              <div className="relative z-10 mb-16">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-white text-xl font-semibold bg-primary/20 px-6 py-2 rounded-full inline-block backdrop-blur-sm">{t('about.phase1')}</h4>
                  <div className="h-0.5 bg-gradient-to-r from-primary/60 to-transparent flex-grow mx-4"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="relative group">
                    <div className="bg-white/10 hover:bg-white/15 transition-all duration-300 rounded-xl p-6 border border-white/10 h-full flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1">
                      <div className="bg-gradient-to-br from-primary/20 to-primary/40 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform">
                        <i className="fas fa-clipboard-list text-white text-2xl"></i>
                      </div>
                      <h5 className="text-white font-bold mb-2">{t('about.assets')}</h5>
                      <p className="text-white/70 text-sm">{t('about.assetsDesc')}</p>
                    </div>
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-white/60 hidden md:block">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="bg-white/10 hover:bg-white/15 transition-all duration-300 rounded-xl p-6 border border-white/10 h-full flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1">
                      <div className="bg-gradient-to-br from-primary/20 to-primary/40 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform">
                        <i className="fas fa-camera text-white text-2xl"></i>
                      </div>
                      <h5 className="text-white font-bold mb-2">{t('about.material')}</h5>
                      <p className="text-white/70 text-sm">{t('about.materialDesc')}</p>
                    </div>
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-white/60 hidden md:block">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="bg-white/10 hover:bg-white/15 transition-all duration-300 rounded-xl p-6 border border-white/10 h-full flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1">
                      <div className="bg-gradient-to-br from-primary/20 to-primary/40 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform">
                        <i className="fas fa-desktop text-white text-2xl"></i>
                      </div>
                      <h5 className="text-white font-bold mb-2">{t('about.platform')}</h5>
                      <p className="text-white/70 text-sm">{t('about.platformDesc')}</p>
                    </div>
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-white/60 hidden md:block">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="bg-white/10 hover:bg-white/15 transition-all duration-300 rounded-xl p-6 border border-white/10 h-full flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1">
                      <div className="bg-gradient-to-br from-primary/20 to-primary/40 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform">
                        <i className="fas fa-bullhorn text-white text-2xl"></i>
                      </div>
                      <h5 className="text-white font-bold mb-2">{t('about.marketing')}</h5>
                      <p className="text-white/70 text-sm">{t('about.marketingDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Conector entre fases */}
              <div className="flex justify-center mb-16">
                <div className="h-16 border-l-2 border-primary/30 relative">
                  <div className="absolute h-6 w-6 rounded-full bg-primary/30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <i className="fas fa-chevron-down text-white text-sm"></i>
                  </div>
                </div>
              </div>
              
              {/* Fase 2: Transacción */}
              <div className="relative z-10 mb-16">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-white text-xl font-semibold bg-primary/20 px-6 py-2 rounded-full inline-block backdrop-blur-sm">Fase 2: Transacción</h4>
                  <div className="h-0.5 bg-gradient-to-r from-primary/60 to-transparent flex-grow mx-4"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="relative group">
                    <div className="bg-white/10 hover:bg-white/15 transition-all duration-300 rounded-xl p-6 border border-white/10 h-full flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1">
                      <div className="bg-gradient-to-br from-primary/20 to-primary/40 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform">
                        <i className="fas fa-video text-white text-2xl"></i>
                      </div>
                      <h5 className="text-white font-bold mb-2">{t('about.event')}</h5>
                      <p className="text-white/70 text-sm">Realización del evento con participación presencial y virtual simultánea</p>
                    </div>
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-white/60 hidden md:block">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="bg-white/10 hover:bg-white/15 transition-all duration-300 rounded-xl p-6 border border-white/10 h-full flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1">
                      <div className="bg-gradient-to-br from-primary/20 to-primary/40 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform">
                        <i className="fas fa-gavel text-white text-2xl"></i>
                      </div>
                      <h5 className="text-white font-bold mb-2">{t('about.buyerPays')}</h5>
                      <p className="text-white/70 text-sm">Proceso de pago seguro para el comprador con múltiples opciones</p>
                    </div>
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-white/60 hidden md:block">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="bg-white/10 hover:bg-white/15 transition-all duration-300 rounded-xl p-6 border border-white/10 h-full flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1">
                      <div className="bg-gradient-to-br from-primary/20 to-primary/40 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform">
                        <i className="fas fa-hand-holding-usd text-white text-2xl"></i>
                      </div>
                      <h5 className="text-white font-bold mb-2">{t('about.payment')}</h5>
                      <p className="text-white/70 text-sm">Transferencia rápida y segura de fondos al consignatario del activo</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Conector entre fases */}
              <div className="flex justify-center mb-16">
                <div className="h-16 border-l-2 border-primary/30 relative">
                  <div className="absolute h-6 w-6 rounded-full bg-primary/30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <i className="fas fa-chevron-down text-white text-sm"></i>
                  </div>
                </div>
              </div>
              
              {/* Fase 3: Logística */}
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-white text-xl font-semibold bg-primary/20 px-6 py-2 rounded-full inline-block backdrop-blur-sm">Fase 3: Logística</h4>
                  <div className="h-0.5 bg-gradient-to-r from-primary/60 to-transparent flex-grow mx-4"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="relative group">
                    <div className="bg-white/10 hover:bg-white/15 transition-all duration-300 rounded-xl p-6 border border-white/10 h-full flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1">
                      <div className="bg-gradient-to-br from-primary/20 to-primary/40 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform">
                        <i className="fas fa-file-invoice text-white text-2xl"></i>
                      </div>
                      <h5 className="text-white font-bold mb-2">{t('about.certificate')}</h5>
                      <p className="text-white/70 text-sm">Emisión de documentación certificada para autorizar el retiro del activo</p>
                    </div>
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-white/60 hidden md:block">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="bg-white/10 hover:bg-white/15 transition-all duration-300 rounded-xl p-6 border border-white/10 h-full flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1">
                      <div className="bg-gradient-to-br from-primary/20 to-primary/40 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform">
                        <i className="fas fa-truck text-white text-2xl"></i>
                      </div>
                      <h5 className="text-white font-bold mb-2">{t('about.logistics')}</h5>
                      <p className="text-white/70 text-sm">Coordinación de transporte especializado nacional e internacional</p>
                    </div>
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-white/60 hidden md:block">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="bg-white/10 hover:bg-white/15 transition-all duration-300 rounded-xl p-6 border border-white/10 h-full flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1">
                      <div className="bg-gradient-to-br from-primary/20 to-primary/40 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform">
                        <i className="fas fa-map-marker-alt text-white text-2xl"></i>
                      </div>
                      <h5 className="text-white font-bold mb-2">{t('about.delivery')}</h5>
                      <p className="text-white/70 text-sm">Entrega verificada en la ubicación designada por el comprador</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
