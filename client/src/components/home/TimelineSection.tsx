import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function TimelineSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const timelineEvents = [
    {
      id: 1,
      year: 'Fase 1',
      title: 'North Country Auction',
      description: 'Fundación de North Country Auction, empresa americana experta en subastas con amplia experiencia en el sector industrial.',
      icon: 'fa-building'
    },
    {
      id: 2,
      year: 'Fase 2',
      title: 'Asociación con Prelco Auctions',
      description: 'Formación de una alianza estratégica con Grupo Prelco, expertos con más de 20 años en el sector minero latinoamericano.',
      icon: 'fa-handshake'
    },
    {
      id: 3,
      year: 'Fase 3',
      title: 'Nace Global Bids',
      description: 'Surge Global Bids como resultado del Joint-Venture, combinando experiencia en subastas y conocimiento del mercado latinoamericano.',
      icon: 'fa-globe'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-blue-600/10 px-4 py-2 rounded-full mb-4">
            <span className="text-blue-600 font-semibold">Nuestra Historia</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-5">Nuestra Evolución</h2>
          <div className="w-24 h-1.5 bg-blue-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Descubre la historia detrás de Global Bids y cómo hemos evolucionado para convertirnos en líderes del mercado.
          </p>
        </motion.div>

        {/* Timeline moderna */}
        <div className="relative max-w-5xl mx-auto">
          {/* Línea de conexión */}
          <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 transform md:-translate-x-1/2"></div>
          
          {/* Eventos de la línea de tiempo */}
          <div className="space-y-12 md:space-y-24 relative">
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
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative transform hover:-translate-y-1">
                    {/* Indicador de fase (visible solo en desktop) */}
                    <span className={`hidden md:block absolute top-6 text-sm font-bold bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full 
                      ${index % 2 === 0 ? 'right-6' : 'left-6'}`}>
                      {event.year}
                    </span>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 mt-4">{event.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Punto central con ícono (visible solo en desktop) */}
                <div className="hidden md:flex w-2/12 justify-center items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg z-20 border-4 border-white">
                    <i className={`fas ${event.icon} text-white`}></i>
                  </div>
                </div>

                {/* Espacio para mantener simetría (solo en desktop) */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>

          {/* Punto final */}
          <motion.div 
            className="absolute bottom-0 left-0 md:left-1/2 transform md:-translate-x-1/2 translate-y-1/2 z-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, delay: timelineEvents.length * 0.3 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
              <i className="fas fa-check text-white text-xl"></i>
            </div>
          </motion.div>
        </div>

        {/* Mensaje final */}
        <motion.div 
          className="text-center mt-24 max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: timelineEvents.length * 0.3 + 0.4 }}
        >
          <h3 className="text-xl font-bold text-blue-600 mb-3">Hoy en Global Bids</h3>
          <p className="text-lg text-gray-700 mb-4">
            Conectamos la oferta sudamericana con la demanda global, a través de nuestra plataforma digital, con presencia en más de 12 países y con una base de cerca de 1 millón de compradores activos.
          </p>
          <div className="inline-block bg-blue-500/10 px-6 py-3 rounded-full">
            <span className="text-lg text-blue-600 font-bold">
              Chile - USA - Worldwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}