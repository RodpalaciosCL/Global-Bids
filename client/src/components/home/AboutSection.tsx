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
          <div className="mb-8">
            <h3 className="text-center text-2xl font-bold mb-8">{t('about.model360')}</h3>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/20">
              {/* Primera fila - Proceso inicial */}
              <div className="grid grid-cols-7 gap-0 mb-8 items-center">
                <div className="text-center col-span-1">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <i className="fas fa-clipboard-list text-white text-xl"></i>
                  </div>
                  <div className="text-white text-sm font-medium">Activos a rematar</div>
                </div>
                
                <div className="flex justify-center items-center">
                  <i className="fas fa-long-arrow-alt-right text-white/60 text-xl"></i>
                </div>
                
                <div className="text-center col-span-1">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <i className="fas fa-camera text-white text-xl"></i>
                  </div>
                  <div className="text-white text-sm font-medium">Material gráfico en terreno</div>
                </div>
                
                <div className="flex justify-center items-center">
                  <i className="fas fa-long-arrow-alt-right text-white/60 text-xl"></i>
                </div>
                
                <div className="text-center col-span-1">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <i className="fas fa-desktop text-white text-xl"></i>
                  </div>
                  <div className="text-white text-sm font-medium">Plataforma</div>
                </div>
                
                <div className="flex justify-center items-center">
                  <i className="fas fa-long-arrow-alt-right text-white/60 text-xl"></i>
                </div>
                
                <div className="text-center col-span-1">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <i className="fas fa-bullhorn text-white text-xl"></i>
                  </div>
                  <div className="text-white text-sm font-medium">Marketing<br/>950k clientes globales</div>
                </div>
              </div>
              
              {/* Flecha conectora vertical */}
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center">
                  <div className="h-10 border-l-2 border-dashed border-white/40"></div>
                  <i className="fas fa-chevron-down text-white/60 -mt-1"></i>
                </div>
              </div>
              
              {/* Segunda fila - Proceso medio */}
              <div className="grid grid-cols-5 gap-0 mb-8 items-center">
                <div className="text-center col-span-1">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <i className="fas fa-video text-white text-xl"></i>
                  </div>
                  <div className="text-white text-sm font-medium">Evento Remate<br/>Presencial y online</div>
                </div>
                
                <div className="flex justify-center items-center">
                  <i className="fas fa-long-arrow-alt-right text-white/60 text-xl"></i>
                </div>
                
                <div className="text-center col-span-1">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <i className="fas fa-gavel text-white text-xl"></i>
                  </div>
                  <div className="text-white text-sm font-medium">Comprador paga el<br/>lote adjudicado</div>
                </div>
                
                <div className="flex justify-center items-center">
                  <i className="fas fa-long-arrow-alt-right text-white/60 text-xl"></i>
                </div>
                
                <div className="text-center col-span-1">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <i className="fas fa-hand-holding-usd text-white text-xl"></i>
                  </div>
                  <div className="text-white text-sm font-medium">Pago a consignatario</div>
                </div>
              </div>
              
              {/* Flecha conectora vertical */}
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center">
                  <div className="h-10 border-l-2 border-dashed border-white/40"></div>
                  <i className="fas fa-chevron-down text-white/60 -mt-1"></i>
                </div>
              </div>
              
              {/* Tercera fila - Proceso final */}
              <div className="grid grid-cols-5 gap-0 items-center">
                <div className="text-center col-span-1">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <i className="fas fa-file-invoice text-white text-xl"></i>
                  </div>
                  <div className="text-white text-sm font-medium">Certificado de pago<br/>para liberar carga</div>
                </div>
                
                <div className="flex justify-center items-center">
                  <i className="fas fa-long-arrow-alt-right text-white/60 text-xl"></i>
                </div>
                
                <div className="text-center col-span-1">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <i className="fas fa-truck text-white text-xl"></i>
                  </div>
                  <div className="text-white text-sm font-medium">Logística de retiro<br/>y despacho</div>
                </div>
                
                <div className="flex justify-center items-center">
                  <i className="fas fa-long-arrow-alt-right text-white/60 text-xl"></i>
                </div>
                
                <div className="text-center col-span-1">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <i className="fas fa-map-marker-alt text-white text-xl"></i>
                  </div>
                  <div className="text-white text-sm font-medium">Entrega en destino</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
