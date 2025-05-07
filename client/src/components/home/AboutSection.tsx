import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
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
    image: "https://www.cbnme.com/wp-content/uploads/2023/06/Ritchie-Bros.-Jebel-Ali-Yard_June-2023.jpg",
    icon: "fa-history"
  };
  

  
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
              Global Bids es líder en subastas y valoración de maquinaria pesada, chatarra, herramientas y repuestos en Latinoamérica, especializados en equipos y lotes para diversos sectores e industrias, <span className="font-medium text-gray-800">tanto en Chile, como en el resto del mundo</span>.
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
                <h3 className="text-white text-3xl font-bold mb-2">{historiaContent.title}</h3>
              </div>
            </div>
            
            {/* Contenido con íconos visuales */}
            <div className="space-y-6 p-2">
              <div className="p-8 md:p-10 bg-white rounded-3xl shadow-lg border border-gray-100">
                {/* Se eliminó el texto introductorio a petición del cliente */}
                
                {/* Grid de íconos con conceptos */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-2 mb-4">
                  {/* Liderazgo en subastas */}
                  <motion.div 
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <i className="fas fa-crown text-2xl"></i>
                    </div>
                  </motion.div>
                  
                  {/* Presencia Global */}
                  <motion.div 
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <i className="fas fa-globe-americas text-2xl"></i>
                    </div>
                  </motion.div>
                  
                  {/* Red de clientes */}
                  <motion.div 
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <i className="fas fa-users text-2xl"></i>
                    </div>
                  </motion.div>
                  
                  {/* Plataforma digital */}
                  <motion.div 
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <i className="fas fa-laptop text-2xl"></i>
                    </div>
                  </motion.div>
                  
                  {/* Conexión oferta-demanda */}
                  <motion.div 
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <i className="fas fa-exchange-alt text-2xl"></i>
                    </div>
                  </motion.div>
                  
                  {/* Mejor valor */}
                  <motion.div 
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <i className="fas fa-chart-line text-2xl"></i>
                    </div>
                  </motion.div>
                </div>
              </div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <div className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="font-bold text-xl mb-2">{t('about.profitability')}</h4>
              <p className="text-white/70 text-sm">
                {t('about.profitabilityDesc')}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <div className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="font-bold text-xl mb-2">{t('about.speed')}</h4>
              <p className="text-white/70 text-sm">
                {t('about.speedDesc')}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <div className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="font-bold text-xl mb-2">{t('about.transparency')}</h4>
              <p className="text-white/70 text-sm">
                {t('about.transparencyDesc')}
              </p>
            </div>
          </div>
          
          {/* Se eliminaron los botones de acción a petición del cliente */}
        </motion.div>
      </div>
    </section>
  );
}
