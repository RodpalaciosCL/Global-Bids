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
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Nuestra Evolución</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Descubre la historia detrás de Global Bids y cómo hemos evolucionado para convertirnos en líderes del mercado.
          </p>
        </motion.div>

        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded-full"></div>

          {/* Eventos de la línea de tiempo */}
          <div className="space-y-16 relative">
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative z-10`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Contenido - izquierda o derecha dependiendo del índice */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className={`text-sm text-primary font-semibold mb-2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      {event.year}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>

                {/* Punto central con ícono */}
                <div className="w-2/12 flex justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg z-20">
                    <i className={`fas ${event.icon} text-white`}></i>
                  </div>
                </div>

                {/* Espacio para mantener simetría */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>

          {/* Punto final */}
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, delay: timelineEvents.length * 0.2 }}
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-check text-white text-xl"></i>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: timelineEvents.length * 0.2 + 0.3 }}
        >
          <p className="text-lg font-medium text-gray-700">
            Hoy Global Bids conecta la oferta sudamericana con la demanda global a través de nuestra plataforma digital.
          </p>
          <p className="text-lg text-primary font-bold mt-2">
            Acceso a más de 950,000 clientes internacionales a nivel global
          </p>
        </motion.div>
      </div>
    </section>
  );
}