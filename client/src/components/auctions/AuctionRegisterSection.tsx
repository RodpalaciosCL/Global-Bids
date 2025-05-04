import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/lib/animations';
import { useRegistration } from '@/contexts/RegistrationContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function AuctionRegisterSection() {
  const { openForm } = useRegistration();
  const { language } = useLanguage();

  // Imagenes de fondo para el carrusel
  const bgImages = [
    'https://images.pexels.com/photos/4312212/pexels-photo-4312212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4513940/pexels-photo-4513940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1238864/pexels-photo-1238864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  return (
    <section className="relative py-20 overflow-hidden" id="subastas">
      {/* Slide de imágenes en el fondo */}
      <div className="absolute inset-0 w-full h-full">
        {bgImages.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full z-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
            }}
            transition={{ 
              duration: 15, 
              times: [0, 0.3, 0.7, 1],
              delay: index * 5,
              repeat: Infinity,
              repeatDelay: (bgImages.length - 1) * 5
            }}
          >
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
              style={{ backgroundImage: `url(${img})` }}
            />
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-10"></div>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-block mb-6 rounded-full px-4 py-1.5 bg-primary/30 backdrop-blur-md text-white text-sm font-medium"
          >
            {language === 'es' ? 'EVENTOS EXCLUSIVOS' : 'EXCLUSIVE EVENTS'}
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {language === 'es' 
              ? 'Subastas de equipos con oportunidades únicas' 
              : 'Equipment auctions with unique opportunities'}
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-300 mb-8"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {language === 'es'
              ? 'Regístrese ahora para acceder a nuestras subastas exclusivas de maquinaria, repuestos, herramientas y lotes especiales. Sea el primero en recibir notificaciones sobre nuevos eventos.'
              : 'Register now to access our exclusive auctions of machinery, parts, tools and special lots. Be the first to receive notifications about new events.'}
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                <i className="fas fa-truck-monster text-xl"></i>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">
                {language === 'es' ? 'Maquinaria Pesada' : 'Heavy Machinery'}
              </h3>
              <p className="text-gray-300 text-sm">
                {language === 'es' 
                  ? 'Excavadoras, cargadores, camiones y más equipos para minería y construcción.'
                  : 'Excavators, loaders, trucks and more equipment for mining and construction.'}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                <i className="fas fa-tools text-xl"></i>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">
                {language === 'es' ? 'Repuestos y Herramientas' : 'Parts & Tools'}
              </h3>
              <p className="text-gray-300 text-sm">
                {language === 'es'
                  ? 'Componentes originales, herramientas especializadas y accesorios para equipos.'
                  : 'Original components, specialized tools and accessories for equipment.'}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                <i className="fas fa-box-open text-xl"></i>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">
                {language === 'es' ? 'Lotes Especiales' : 'Special Lots'}
              </h3>
              <p className="text-gray-300 text-sm">
                {language === 'es'
                  ? 'Lotes completos de equipamiento, flotas y activos de proyectos completos.'
                  : 'Complete lots of equipment, fleets and assets from complete projects.'}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <button
              onClick={openForm}
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 flex items-center justify-center"
            >
              <i className="fas fa-user-plus mr-2"></i>
              {language === 'es' ? 'Registrarse Ahora' : 'Register Now'}
            </button>
            
            <a 
              href="#contacto"
              className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-medium rounded-lg border border-white/30 transition duration-300 flex items-center justify-center"
            >
              <i className="fas fa-info-circle mr-2"></i>
              {language === 'es' ? 'Más Información' : 'More Information'}
            </a>
          </motion.div>
        </div>

        <motion.div 
          className="max-w-4xl mx-auto mt-16 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/20"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-white mr-4">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h3 className="text-xl font-bold text-white">
              {language === 'es' ? 'Próximos Eventos' : 'Upcoming Events'}
            </h3>
            <div className="ml-auto">
              <span className="bg-primary/80 text-white text-xs font-bold px-3 py-1 rounded-full">
                {language === 'es' ? 'ACCESO EXCLUSIVO' : 'EXCLUSIVE ACCESS'}
              </span>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            <div className="py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-primary/20 text-white rounded-lg p-3 text-center">
                <div className="text-xl font-bold">15</div>
                <div className="text-xs">MAYO</div>
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-white">
                  {language === 'es' ? 'Subasta de Maquinaria Minera' : 'Mining Machinery Auction'}
                </h4>
                <p className="text-gray-400 text-sm">Santiago, Chile</p>
              </div>
              <div className="flex items-center">
                <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full">
                  {language === 'es' ? 'Abierto para registro' : 'Open for registration'}
                </span>
                <a 
                  href="#subastas"
                  onClick={openForm}
                  className="ml-4 bg-primary/80 hover:bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center"
                >
                  <i className="fas fa-user-plus mr-1"></i>
                  {language === 'es' ? 'Registrar' : 'Register'}
                </a>
              </div>
            </div>
            
            <div className="py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-primary/20 text-white rounded-lg p-3 text-center">
                <div className="text-xl font-bold">28</div>
                <div className="text-xs">MAYO</div>
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-white">
                  {language === 'es' ? 'Subasta de Equipos Forestales' : 'Forestry Equipment Auction'}
                </h4>
                <p className="text-gray-400 text-sm">Concepción, Chile</p>
              </div>
              <div className="flex items-center">
                <span className="bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full">
                  {language === 'es' ? 'Próximamente' : 'Coming soon'}
                </span>
                <a 
                  href="#subastas"
                  onClick={openForm}
                  className="ml-4 bg-primary/80 hover:bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center"
                >
                  <i className="fas fa-bell mr-1"></i>
                  {language === 'es' ? 'Notificarme' : 'Notify me'}
                </a>
              </div>
            </div>
            
            <div className="py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-primary/20 text-white rounded-lg p-3 text-center">
                <div className="text-xl font-bold">10</div>
                <div className="text-xs">JUNIO</div>
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-white">
                  {language === 'es' ? 'Subasta de Repuestos Industriales' : 'Industrial Parts Auction'}
                </h4>
                <p className="text-gray-400 text-sm">Online (Virtual)</p>
              </div>
              <div className="flex items-center">
                <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full">
                  {language === 'es' ? 'Virtual' : 'Virtual'}
                </span>
                <a 
                  href="#subastas"
                  onClick={openForm}
                  className="ml-4 bg-primary/80 hover:bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center"
                >
                  <i className="fas fa-laptop mr-1"></i>
                  {language === 'es' ? 'Pre-registro' : 'Pre-register'}
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm mb-4">
              {language === 'es' 
                ? 'Regístrese para acceder al calendario completo de subastas y eventos.'
                : 'Register to access the complete calendar of auctions and events.'}
            </p>
            <a
              href="#subastas"
              onClick={openForm}
              className="inline-flex items-center text-primary-light hover:text-white font-medium transition-colors"
            >
              {language === 'es' ? 'Ver todos los eventos' : 'View all events'}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}