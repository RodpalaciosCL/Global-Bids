import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function AboutSection() {
  const sectionRef = useRef(null);
  const numbersRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const numbersInView = useInView(numbersRef, { once: true, amount: 0.3 });
  const { t, language } = useLanguage();
  
  // Estados para los contadores
  const [experienceCount, setExperienceCount] = useState(0);
  const [machinesCount, setMachinesCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);
  
  // Lógica para el conteo animado cuando la sección es visible
  useEffect(() => {
    if (numbersInView) {
      // Para el contador de años de experiencia (15+)
      const experienceDuration = 1500; // 1.5 segundos
      const experienceTarget = 15;
      let experienceStartTime: number | null = null;
      
      const animateExperience = (timestamp: number) => {
        if (!experienceStartTime) experienceStartTime = timestamp;
        const elapsedTime = timestamp - experienceStartTime;
        const progress = Math.min(elapsedTime / experienceDuration, 1);
        const currentCount = Math.floor(progress * experienceTarget);
        
        setExperienceCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animateExperience);
        }
      };
      
      // Para el contador de maquinarias (1,500+)
      const machinesDuration = 2000; // 2 segundos
      const machinesTarget = 1500;
      let machinesStartTime: number | null = null;
      
      const animateMachines = (timestamp: number) => {
        if (!machinesStartTime) machinesStartTime = timestamp;
        const elapsedTime = timestamp - machinesStartTime;
        const progress = Math.min(elapsedTime / machinesDuration, 1);
        const currentCount = Math.floor(progress * machinesTarget);
        
        setMachinesCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animateMachines);
        }
      };
      
      // Para el contador de países (12)
      const countriesDuration = 1000; // 1 segundo
      const countriesTarget = 12;
      let countriesStartTime: number | null = null;
      
      const animateCountries = (timestamp: number) => {
        if (!countriesStartTime) countriesStartTime = timestamp;
        const elapsedTime = timestamp - countriesStartTime;
        const progress = Math.min(elapsedTime / countriesDuration, 1);
        const currentCount = Math.floor(progress * countriesTarget);
        
        setCountriesCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animateCountries);
        }
      };
      
      // Para el contador de satisfacción (98%)
      const satisfactionDuration = 1800; // 1.8 segundos
      const satisfactionTarget = 98;
      let satisfactionStartTime: number | null = null;
      
      const animateSatisfaction = (timestamp: number) => {
        if (!satisfactionStartTime) satisfactionStartTime = timestamp;
        const elapsedTime = timestamp - satisfactionStartTime;
        const progress = Math.min(elapsedTime / satisfactionDuration, 1);
        const currentCount = Math.floor(progress * satisfactionTarget);
        
        setSatisfactionCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animateSatisfaction);
        }
      };
      
      // Iniciar todas las animaciones
      requestAnimationFrame(animateExperience);
      requestAnimationFrame(animateMachines);
      requestAnimationFrame(animateCountries);
      requestAnimationFrame(animateSatisfaction);
    }
  }, [numbersInView]);
  
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
        
        {/* Nuestros Números - Nueva sección */}
        <motion.div 
          ref={numbersRef}
          className="mt-16 md:mt-24 p-10 md:p-16 bg-gray-900 rounded-3xl shadow-xl text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Fondo con efecto de gradiente */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"></div>
          
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">
                Nuestros Números
              </h3>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <p className="text-white/80 max-w-2xl mx-auto text-lg">
                Dejamos que los resultados hablen por nosotros. Estos son algunos de nuestros logros a lo largo de nuestra trayectoria.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
              {/* Años de experiencia */}
              <motion.div 
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_30px_rgba(255,200,50,0.4)] transition-all duration-300"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <i className="fas fa-clock text-gray-900 text-2xl"></i>
                </motion.div>
                <div className="text-5xl font-bold text-white mb-2 flex items-center justify-center">
                  <span className="counter-value">{experienceCount}</span>
                  <span className="text-primary ml-1">+</span>
                </div>
                <div className="uppercase text-xs tracking-widest text-white/70">AÑOS DE EXPERIENCIA</div>
              </motion.div>
              
              {/* Maquinarias vendidas */}
              <motion.div 
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_30px_rgba(255,200,50,0.4)] transition-all duration-300"
                  whileHover={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <i className="fas fa-truck-monster text-gray-900 text-2xl"></i>
                </motion.div>
                <div className="text-5xl font-bold text-white mb-2 flex items-center justify-center">
                  <span className="counter-value">{machinesCount.toLocaleString()}</span>
                  <span className="text-primary ml-1">+</span>
                </div>
                <div className="uppercase text-xs tracking-widest text-white/70">MAQUINARIAS VENDIDAS</div>
              </motion.div>
              
              {/* Países cubiertos */}
              <motion.div 
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_30px_rgba(255,200,50,0.4)] transition-all duration-300"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 5 }}
                >
                  <i className="fas fa-globe-americas text-gray-900 text-2xl"></i>
                </motion.div>
                <div className="text-5xl font-bold text-white mb-2">
                  <span className="counter-value">{countriesCount}</span>
                </div>
                <div className="uppercase text-xs tracking-widest text-white/70">PAÍSES CUBIERTOS</div>
              </motion.div>
              
              {/* Clientes satisfechos */}
              <motion.div 
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_30px_rgba(255,200,50,0.4)] transition-all duration-300"
                  whileHover={{ 
                    rotate: [0, 5, -5, 5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <i className="fas fa-smile text-gray-900 text-2xl"></i>
                </motion.div>
                <div className="text-5xl font-bold text-white mb-2 flex items-center justify-center">
                  <span className="counter-value">{satisfactionCount}</span>
                  <span className="text-primary ml-1">%</span>
                </div>
                <div className="uppercase text-xs tracking-widest text-white/70">CLIENTES SATISFECHOS</div>
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
