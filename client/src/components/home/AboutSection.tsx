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
                <h3 className="text-white text-3xl font-bold mb-2">{historiaContent.title}</h3>
              </div>
            </div>
            
            {/* Contenido con íconos visuales */}
            <div className="space-y-6 p-2">
              <div className="p-8 md:p-10 bg-white rounded-3xl shadow-lg border border-gray-100">
                {/* Texto introductorio */}
                <motion.p 
                  className="text-gray-600 leading-relaxed text-center mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {historiaContent.description[0]}
                </motion.p>
                
                {/* Grid de íconos con conceptos */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-4">
                  {/* Liderazgo en subastas */}
                  <motion.div 
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                      <i className="fas fa-crown text-xl"></i>
                    </div>
                    <p className="text-sm font-medium text-gray-700">Líderes en subastas de maquinaria en Latinoamérica</p>
                  </motion.div>
                  
                  {/* Presencia Global */}
                  <motion.div 
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                      <i className="fas fa-globe-americas text-xl"></i>
                    </div>
                    <p className="text-sm font-medium text-gray-700">Presencia global en Chile y el mundo</p>
                  </motion.div>
                  
                  {/* Red de clientes */}
                  <motion.div 
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                      <i className="fas fa-users text-xl"></i>
                    </div>
                    <p className="text-sm font-medium text-gray-700">Red de casi 1 millón de clientes internacionales</p>
                  </motion.div>
                  
                  {/* Plataforma digital */}
                  <motion.div 
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                      <i className="fas fa-laptop text-xl"></i>
                    </div>
                    <p className="text-sm font-medium text-gray-700">Plataforma digital transparente y segmentada</p>
                  </motion.div>
                  
                  {/* Conexión oferta-demanda */}
                  <motion.div 
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                      <i className="fas fa-exchange-alt text-xl"></i>
                    </div>
                    <p className="text-sm font-medium text-gray-700">Conexión entre oferta sudamericana y demanda global</p>
                  </motion.div>
                  
                  {/* Mejor valor */}
                  <motion.div 
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                      <i className="fas fa-chart-line text-xl"></i>
                    </div>
                    <p className="text-sm font-medium text-gray-700">Mejor valor para consignatarios en mercados de alta demanda</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Modelo 360 - Nuevo gráfico de proceso */}
        <motion.div 
          className="mt-16 md:mt-24 p-10 md:p-16 bg-gray-50 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Elementos decorativos */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
                Modelo <span className="text-primary">360</span>
              </h3>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Nuestro proceso integral de subasta que garantiza transparencia y eficiencia en cada etapa
              </p>
            </div>
            
            {/* Primera Línea del Modelo 360 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 relative">
              {/* Línea conectora superior */}
              <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-primary/30 z-0"></div>
              
              {/* Activos a rematar */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-md relative z-10 text-center"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-green-50 rounded-full">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-700">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </motion.div>
                </div>
                <h4 className="font-semibold text-lg mb-1 text-gray-800">Activos a rematar</h4>
                <p className="text-sm text-gray-600">Inventario y tasación de equipos</p>
              </motion.div>
              
              {/* Material gráfico en terreno */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-md relative z-10 text-center"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-blue-50 rounded-full">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-700">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                      <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                  </motion.div>
                </div>
                <h4 className="font-semibold text-lg mb-1 text-gray-800">Material gráfico en terreno</h4>
                <p className="text-sm text-gray-600">Fotografías y videos detallados</p>
              </motion.div>
              
              {/* Plataforma */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-md relative z-10 text-center"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-gray-50 rounded-full">
                  <motion.div
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-gray-700">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </motion.div>
                </div>
                <h4 className="font-semibold text-lg mb-1 text-gray-800">Plataforma</h4>
                <p className="text-sm text-gray-600">Sistema digital de subastas</p>
              </motion.div>
              
              {/* Marketing */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-md relative z-10 text-center"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-teal-50 rounded-full">
                  <motion.div
                    whileHover={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-teal-700">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </motion.div>
                </div>
                <h4 className="font-semibold text-lg mb-1 text-gray-800">Marketing</h4>
                <p className="text-sm text-gray-600">950k clientes globales</p>
              </motion.div>
            </div>
            
            {/* Segunda Línea del Modelo 360 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 relative">
              {/* Línea conectora media */}
              <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-0.5 bg-primary/30 z-0"></div>
              
              {/* Evento Remate */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-md relative z-10 text-center"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-cyan-50 rounded-full">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.7 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-cyan-700">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </motion.div>
                </div>
                <h4 className="font-semibold text-lg mb-1 text-gray-800">Evento Remate</h4>
                <p className="text-sm text-gray-600">Presencial y online</p>
              </motion.div>
              
              {/* Comprador paga el lote */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-md relative z-10 text-center"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-amber-50 rounded-full">
                  <motion.div
                    whileHover={{ 
                      y: [0, -3, 3, -3, 0],
                      scale: 1.05
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-amber-700">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </motion.div>
                </div>
                <h4 className="font-semibold text-lg mb-1 text-gray-800">Comprador paga el lote</h4>
                <p className="text-sm text-gray-600">Adjudicación oficial</p>
              </motion.div>
              
              {/* Pago a consignatario */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-md relative z-10 text-center"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-emerald-50 rounded-full">
                  <motion.div
                    whileHover={{ 
                      scale: [1, 1.15, 1]
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-emerald-700">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="M12 1v3M12 20v3M1 12h3M20 12h3M4 8l2 2M4 16l2-2M18 8l-2 2M18 16l-2-2"></path>
                    </svg>
                  </motion.div>
                </div>
                <h4 className="font-semibold text-lg mb-1 text-gray-800">Pago a consignatario</h4>
                <p className="text-sm text-gray-600">Transferencia segura y rápida</p>
              </motion.div>
            </div>
            
            {/* Tercera Línea del Modelo 360 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 relative">
              {/* Línea conectora inferior */}
              <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-0.5 bg-primary/30 z-0"></div>
              
              {/* Certificado de pago */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-md relative z-10 text-center"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-indigo-50 rounded-full">
                  <motion.div
                    whileHover={{ 
                      rotateZ: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-indigo-700">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <path d="M14 2v6h6"></path>
                      <path d="M9 15h6"></path>
                      <path d="M9 11h6"></path>
                    </svg>
                  </motion.div>
                </div>
                <h4 className="font-semibold text-lg mb-1 text-gray-800">Certificado de pago</h4>
                <p className="text-sm text-gray-600">Para liberar carga</p>
              </motion.div>
              
              {/* Logística de retiro */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-md relative z-10 text-center"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-orange-50 rounded-full">
                  <motion.div
                    whileHover={{ 
                      x: [0, 5, -5, 5, 0]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-orange-700">
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                  </motion.div>
                </div>
                <h4 className="font-semibold text-lg mb-1 text-gray-800">Logística de retiro</h4>
                <p className="text-sm text-gray-600">Y despacho</p>
              </motion.div>
              
              {/* Entrega en destino */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-md relative z-10 text-center"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-red-50 rounded-full">
                  <motion.div
                    whileHover={{ 
                      scale: [1, 1.2, 1.2, 1, 1]
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-red-700">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </motion.div>
                </div>
                <h4 className="font-semibold text-lg mb-1 text-gray-800">Entrega en destino</h4>
                <p className="text-sm text-gray-600">Asistencia hasta el final</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

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
