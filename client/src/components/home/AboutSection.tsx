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
  
  // Timeline de la historia de Global Bids
  const timelineItems = language === 'es' ? [
    {
      phase: 'phase1',
      title: 'North Country Auction',
      description: 'Fundación de North Country Auction, empresa americana experta en subastas con amplia experiencia en el sector industrial.',
      year: ''
    },
    {
      phase: 'phase2',
      title: 'Global Bids USA',
      description: 'Empresa de subastas y logística norteamericana con larga trayectoria y especialización de logística para maquinaria en todo el mundo.',
      year: ''
    },
    {
      phase: 'phase3',
      title: 'Asociación con Prelco Auctions',
      description: 'Formación de una alianza estratégica con Grupo Prelco, expertos con más de 20 años en el sector minero latinoamericano.',
      year: ''
    },
    {
      phase: 'phase4',
      title: 'Nace Global Bids',
      description: 'Surge Global Bids como resultado del Joint Venture, combinando experiencia en subastas y conocimiento del mercado latinoamericano.',
      year: ''
    }
  ] : [
    {
      phase: 'phase1',
      title: 'North Country Auction',
      description: 'Foundation of North Country Auction, an American company expert in auctions with extensive experience in the industrial sector.',
      year: ''
    },
    {
      phase: 'phase2',
      title: 'Global Bids USA',
      description: 'American auction and logistics company with extensive experience and specialization in machinery logistics worldwide.',
      year: ''
    },
    {
      phase: 'phase3',
      title: 'Partnership with Prelco Auctions',
      description: 'Formation of a strategic alliance with Prelco Group, experts with over 20 years in the Latin American mining sector.',
      year: ''
    },
    {
      phase: 'phase4',
      title: 'Global Bids is Born',
      description: 'Global Bids emerges as a result of the Joint Venture, combining auction expertise and knowledge of the Latin American market.',
      year: ''
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
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                      <i className="fas fa-crown text-xl"></i>
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {language === 'es' 
                        ? 'Líderes en subastas de maquinaria en Latinoamérica'
                        : 'Leaders in machinery auctions in Latin America'}
                    </p>
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
                    <p className="text-sm font-medium text-gray-700">
                      {language === 'es'
                        ? 'Presencia global en Chile y el mundo'
                        : 'Global presence in Chile and worldwide'}
                    </p>
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
                    <p className="text-sm font-medium text-gray-700">
                      {language === 'es'
                        ? 'Red de casi 1 millón de clientes internacionales'
                        : 'Network of nearly 1 million international clients'}
                    </p>
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
                    <p className="text-sm font-medium text-gray-700">
                      {language === 'es'
                        ? 'Plataforma digital transparente y segmentada'
                        : 'Transparent and segmented digital platform'}
                    </p>
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
                    <p className="text-sm font-medium text-gray-700">
                      {language === 'es'
                        ? 'Conexión entre oferta sudamericana y demanda global'
                        : 'Connection between South American supply and global demand'}
                    </p>
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
                    <p className="text-sm font-medium text-gray-700">
                      {language === 'es'
                        ? 'Mejor valor para consignatarios en mercados de alta demanda'
                        : 'Best value for consignors in high-demand markets'}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Timeline de Historia */}
        <motion.div 
          className="my-16 md:my-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {language === 'es' ? 'Nuestra Historia' : 'Our History'}
            </h3>
            <div className="w-20 h-1.5 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'es' 
                ? 'Descubre cómo hemos evolucionado hasta convertirnos en líderes del mercado latinoamericano de subastas de maquinaria pesada.'
                : 'Discover how we have evolved to become leaders in the Latin American heavy machinery auction market.'}
            </p>
          </div>

          {/* Línea de Tiempo Vertical */}
          <div className="max-w-4xl mx-auto relative min-h-[600px]">
            {/* Línea central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30 z-0"></div>
            
            {/* Elementos de la línea de tiempo */}
            {timelineItems.map((item, index) => (
              <motion.div 
                key={item.phase}
                className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              >
                {/* Contenido */}
                <div className={`w-1/2 px-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-xs text-primary/80 font-semibold uppercase mb-1">
                      {language === 'es' ? 'Fase ' + (index + 1) : 'Phase ' + (index + 1)}
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
                
                {/* Indicador central */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary rounded-full border-4 border-white shadow-md z-10 flex items-center justify-center">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                
                {/* Espacio para el otro lado */}
                <div className="w-1/2"></div>
              </motion.div>
            ))}
            
            {/* Punto final */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-primary/80 rounded-full border-4 border-white shadow-md z-10 flex items-center justify-center">
              <span className="text-white font-bold">
                <i className="fas fa-check"></i>
              </span>
            </div>
            
            {/* Indicador "Hoy" */}
            <div className="text-center mt-6">
              <span className="inline-block bg-primary text-white px-6 py-2 rounded-full shadow-md font-medium">
                {language === 'es' ? 'Hoy en Global Bids' : 'Today at Global Bids'}
              </span>
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