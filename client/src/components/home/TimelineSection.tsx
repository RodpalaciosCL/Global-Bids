import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function TimelineSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { t, language } = useLanguage();
  
  const getTimelineEvents = () => [
    {
      id: 1,
      year: 'FASE 1',
      title: 'North Country Auction',
      description: language === 'es' 
        ? 'Fundación de North Country Auction, empresa americana experta en subastas con amplia experiencia en el sector industrial.'
        : 'Founding of North Country Auction, an American company expert in auctions with extensive experience in the industrial sector.',
      icon: 'fa-building'
    },
    {
      id: 2,
      year: 'FASE 2',
      title: 'Global Bids USA',
      description: language === 'es'
        ? 'Empresa de subastas y logística norteamericana con larga trayectoria y especialización de logística para maquinaria en todo el mundo.'
        : 'American auction and logistics company with extensive experience specializing in machinery logistics worldwide.',
      icon: 'fa-truck'
    },
    {
      id: 3,
      year: 'FASE 3',
      title: language === 'es' ? 'Asociación con Prelco Auctions' : 'Partnership with Prelco Auctions',
      description: language === 'es'
        ? 'Formación de una alianza estratégica con Grupo Prelco, expertos con más de 20 años en el sector minero latinoamericano.'
        : 'Formation of a strategic alliance with Grupo Prelco, experts with more than 20 years in the Latin American mining sector.',
      icon: 'fa-handshake'
    },
    {
      id: 4,
      year: 'FASE 4',
      title: language === 'es' ? 'Nace Global Bids' : 'Global Bids is Born',
      description: language === 'es'
        ? 'Surge Global Bids como resultado del Joint Venture, combinando experiencia en subastas y conocimiento del mercado latinoamericano.'
        : 'Global Bids emerges as a result of the Joint Venture, combining auction experience and knowledge of the Latin American market.',
      icon: 'fa-globe'
    }
  ];
  
  const timelineEvents = getTimelineEvents();

  return (
    <section ref={sectionRef} className="py-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-blue-600/10 px-4 py-2 rounded-full mb-3">
            <span className="text-blue-600 font-semibold">{language === 'es' ? 'Nuestra Historia' : 'Our History'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">{language === 'es' ? 'Nuestra Evolución' : 'Our Evolution'}</h2>
          <div className="w-24 h-1.5 bg-blue-500 mx-auto mb-4"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            {language === 'es' 
              ? 'Descubre la historia detrás de Global Bids y cómo hemos evolucionado para convertirnos en líderes del mercado.'
              : 'Discover the story behind Global Bids and how we have evolved to become market leaders.'}
          </p>
        </motion.div>

        {/* Timeline moderna */}
        <div className="relative max-w-5xl mx-auto">
          {/* Línea de conexión */}
          <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 transform md:-translate-x-1/2"></div>
          
          {/* Eventos de la línea de tiempo */}
          <div className="space-y-12 md:space-y-24 relative pb-16">
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                className={`flex flex-col md:flex-row items-start relative z-10 ${
                  index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: index * 0.3 }}
              >
                {/* Marcador de tiempo y punto de conexión (visible en móvil) */}
                <div className="md:hidden flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md mr-4">
                    <i className={`fas ${event.icon} text-white text-sm`}></i>
                  </div>
                  <span className="font-semibold text-blue-600">{event.year}</span>
                </div>

                {/* Contenido principal */}
                <div className={`w-full md:w-5/12 ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                }`}>
                  <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative transform hover:-translate-y-1">
                    {/* Indicador de fase (visible solo en desktop) */}
                    <span className={`hidden md:block absolute top-4 text-xs font-bold bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full 
                      ${index % 2 === 0 ? 'right-4' : 'left-4'}`}>
                      {event.year}
                    </span>
                    
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 mt-3">{event.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Punto central con ícono (visible solo en desktop) */}
                <div className="hidden md:flex w-2/12 justify-center items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg z-20 border-2 border-white">
                    <i className={`fas ${event.icon} text-white text-sm`}></i>
                  </div>
                </div>

                {/* Espacio para mantener simetría (solo en desktop) */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mensaje final con el estado actual */}
        <motion.div 
          className="text-center mt-32 max-w-3xl mx-auto bg-white p-5 rounded-xl shadow-lg border border-gray-100 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: timelineEvents.length * 0.3 + 0.4 }}
        >
          {/* Ícono superior */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
              <i className="fas fa-check text-white text-lg"></i>
            </div>
          </div>
          
          <div className="pt-8">
            <h3 className="text-xl font-bold text-blue-600 mb-3">{language === 'es' ? 'Hoy en Global Bids' : 'Global Bids Today'}</h3>
            <p className="text-base text-gray-700 mb-4">
              {language === 'es' 
                ? 'Conectamos la oferta nacional con la demanda global, a través de nuestra plataforma digital, con presencia en más de 12 países y con una base de cerca de 1 millón de compradores activos.'
                : 'We connect national supply with global demand through our digital platform, with presence in more than 12 countries and a base of nearly 1 million active buyers.'}
            </p>
            <div className="inline-block bg-blue-500/10 px-5 py-2 rounded-full">
              <span className="text-base text-blue-600 font-bold">
                Chile - USA - Worldwide
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}