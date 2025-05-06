import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useIsMobile } from '@/hooks/use-mobile';
import { openRegistrationForm } from './RegistrationForm';
import { useLanguage } from '@/contexts/LanguageContext';

export function EventosSection() {
  const isMobile = useIsMobile();
  const { language } = useLanguage();

  const events = language === 'es' ? [
    {
      title: "Subasta Premium - Maquinaria Minera",
      date: "25 de Mayo, 2025",
      location: "Santiago, Chile",
      image: "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1600",
      items: 42,
      registeredUsers: 215,
      isHighlighted: true
    },
    {
      title: "Remate Equipos Forestales",
      date: "12 de Junio, 2025",
      location: "Concepción, Chile",
      image: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1600",
      items: 36,
      registeredUsers: 178,
      isHighlighted: false
    },
    {
      title: "Subasta Online Internacional",
      date: "30 de Junio, 2025",
      location: "Evento Virtual",
      image: "https://images.pexels.com/photos/9660/business-money-pink-coins.jpg?auto=compress&cs=tinysrgb&w=1600",
      items: 85,
      registeredUsers: 342,
      isHighlighted: false
    }
  ] : [
    {
      title: "Premium Auction - Mining Machinery",
      date: "May 25, 2025",
      location: "Santiago, Chile",
      image: "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1600",
      items: 42,
      registeredUsers: 215,
      isHighlighted: true
    },
    {
      title: "Forestry Equipment Auction",
      date: "June 12, 2025",
      location: "Concepción, Chile",
      image: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1600",
      items: 36,
      registeredUsers: 178,
      isHighlighted: false
    },
    {
      title: "International Online Auction",
      date: "June 30, 2025",
      location: "Virtual Event",
      image: "https://images.pexels.com/photos/9660/business-money-pink-coins.jpg?auto=compress&cs=tinysrgb&w=1600",
      items: 85,
      registeredUsers: 342,
      isHighlighted: false
    }
  ];

  return (
    <section id="eventos" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            {language === 'es' ? 'Nuestros Eventos' : 'Our Events'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'es'
              ? 'Participe en nuestras exclusivas subastas y remates de activos premium verificados por expertos'
              : 'Participate in our exclusive auctions of premium assets verified by experts'}
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {events.map((event, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl overflow-hidden shadow-lg ${
                event.isHighlighted 
                  ? 'bg-primary/5 border-2 border-primary/20 ring-2 ring-primary/10 ring-offset-2'
                  : 'bg-white border border-gray-100'
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              custom={index * 0.1}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="h-48 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover" 
                />
                {event.isHighlighted && (
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-20">
                    {language === 'es' ? 'DESTACADO' : 'FEATURED'}
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="text-sm">
                    <div className="font-bold">{event.date}</div>
                    <div className="text-gray-500">{event.location}</div>
                  </div>
                </div>
                
                <h3 className="font-bold text-xl mb-3">{event.title}</h3>
                
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <i className="fas fa-box mr-1"></i>
                    <span>{event.items} {language === 'es' ? 'lotes' : 'lots'}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-users mr-1"></i>
                    <span>{event.registeredUsers} {language === 'es' ? 'inscritos' : 'registered'}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">
                      {language === 'es' ? 'Capacidad de inscripción' : 'Registration capacity'}
                    </span>
                    <span className="text-primary font-bold">{Math.floor((event.registeredUsers / 500) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{width: `${Math.floor((event.registeredUsers / 500) * 100)}%`}}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <motion.a
                    href="#contacto"
                    className="text-primary font-medium text-sm hover:underline flex items-center"
                    whileHover={{ x: 3 }}
                  >
                    {language === 'es' ? 'Ver detalles' : 'View details'}
                    <i className="fas fa-arrow-right ml-1 text-xs"></i>
                  </motion.a>
                  
                  <motion.button
                    onClick={openRegistrationForm}
                    className={`py-2 px-4 rounded-full text-white text-sm font-bold flex items-center ${
                      event.isHighlighted ? 'bg-primary' : 'bg-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-user-plus mr-1"></i>
                    {language === 'es' ? 'Inscribirse' : 'Register'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                  <i className="fas fa-video"></i>
                </div>
                <h3 className="text-2xl font-bold">
                  {language === 'es' ? 'Eventos Premium con Transmisión en Vivo' : 'Premium Live Streaming Events'}
                </h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                {language === 'es' 
                  ? 'Global Bids ofrece una experiencia única con subastas transmitidas en tiempo real. Contamos con tecnología avanzada que incluye transmisión en 4K, drones para visualización completa de activos y sistemas de puja en tiempo real con interfaz intuitiva.'
                  : 'Global Bids offers a unique experience with real-time streamed auctions. We have advanced technology that includes 4K streaming, drones for complete asset visualization, and real-time bidding systems with an intuitive interface.'}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-globe text-primary mr-2"></i>
                    <span className="font-bold">
                      {language === 'es' ? 'Acceso Global' : 'Global Access'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {language === 'es'
                      ? 'Participe desde cualquier lugar del mundo en nuestros eventos'
                      : 'Participate from anywhere in the world in our events'}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-shield-alt text-primary mr-2"></i>
                    <span className="font-bold">
                      {language === 'es' ? 'Seguridad Garantizada' : 'Guaranteed Security'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {language === 'es'
                      ? 'Transacciones seguras con blockchain y protección al comprador'
                      : 'Secure transactions with blockchain and buyer protection'}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <motion.a
                  href="#catalogo"
                  className="bg-primary text-white px-6 py-3 rounded-full font-bold flex items-center shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-calendar-plus mr-2"></i>
                  {language === 'es' ? 'Ver calendario completo' : 'View full calendar'}
                </motion.a>
                
                <motion.a
                  href="https://www.globalbids.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-6 py-3 rounded-full font-bold flex items-center shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-play mr-2"></i>
                  {language === 'es' ? 'Ver demo en vivo' : 'Watch live demo'}
                </motion.a>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <motion.div
                    className="bg-white/20 backdrop-blur-md w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center">
                      <i className="fas fa-play text-primary text-xl"></i>
                    </div>
                  </motion.div>
                </div>
                <img 
                  src="https://images.pexels.com/photos/6169012/pexels-photo-6169012.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Streaming Event"
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
                  <p className="text-white font-medium">
                    {language === 'es'
                      ? 'Construcción de infraestructura industrial - Último remate'
                      : 'Industrial infrastructure construction - Latest auction'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg text-gray-600 mb-6">
            {language === 'es'
              ? '¿Buscas participar en nuestros eventos o tienes activos para subastar?'
              : 'Looking to participate in our events or have assets to auction?'}
          </p>
          <motion.a
            href="#contacto"
            className="bg-primary text-white px-8 py-4 rounded-full font-bold inline-flex items-center shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-handshake mr-2"></i>
            {language === 'es' ? 'Contáctanos ahora' : 'Contact us now'}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}