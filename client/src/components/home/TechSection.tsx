import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useIsMobile } from '@/hooks/use-mobile';

export function TechSection() {
  const isMobile = useIsMobile();

  const techFeatures = [
    {
      title: "Inteligencia Artificial",
      description: "Sistemas de predicción de mantenimiento y valoración automática de activos",
      icon: "fa-brain",
      color: "bg-blue-600"
    },
    {
      title: "Análisis de Datos",
      description: "Reportes detallados y control de gestión para optimizar sus operaciones",
      icon: "fa-chart-line",
      color: "bg-indigo-600"
    },
    {
      title: "Escaneo 3D",
      description: "Visualización completa de maquinaria con tecnología de última generación",
      icon: "fa-cube",
      color: "bg-purple-600"
    },
    {
      title: "Drones y Relevamiento",
      description: "Captura aérea de datos para inventarios y análisis de condiciones",
      icon: "fa-drone",
      color: "bg-green-600"
    }
  ];

  return (
    <section id="tech" className="py-20 relative overflow-hidden">
      {/* Fondo sólido con color sutil */}
      <div className="absolute inset-0 z-0 bg-gray-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideUp}
        >
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <i className="fas fa-rocket mr-2"></i>
            <span className="font-medium">Innovación Tecnológica</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Tecnología e Inteligencia Artificial</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Impulsamos la transformación digital en la industria de maquinaria y activos industriales
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {techFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              custom={index * 0.1}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg text-white flex items-center justify-center mb-4`}>
                <i className={`fas ${feature.icon} text-xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-6">Plataforma Digital Avanzada</h3>
            <p className="text-lg text-gray-600 mb-6">
              Mediante nuestra plataforma de última generación ofrecemos una experiencia única para gestionar sus activos, con las siguientes capacidades:
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-lg text-primary mr-4 mt-1">
                  <i className="fas fa-check"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Reportes en Tiempo Real</h4>
                  <p className="text-gray-600">Control total de gestión con analítica avanzada y reportes personalizados</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-lg text-primary mr-4 mt-1">
                  <i className="fas fa-check"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Valoración Predictiva</h4>
                  <p className="text-gray-600">Modelos de IA para predecir el valor de mercado de sus activos con alta precisión</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-lg text-primary mr-4 mt-1">
                  <i className="fas fa-check"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Inspección Digital</h4>
                  <p className="text-gray-600">Documentación digital completa con escaneo 3D y capturas en alta resolución</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-lg text-primary mr-4 mt-1">
                  <i className="fas fa-check"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Seguridad Avanzada</h4>
                  <p className="text-gray-600">Blockchain y encriptación para garantizar la integridad de datos y transacciones</p>
                </div>
              </div>
            </div>

            <motion.a
              href="#contacto"
              className="mt-8 inline-flex items-center bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-rocket mr-2"></i>
              Solicitar Demo Tecnológica
            </motion.a>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Reemplazado video con imagen estática */}
              <div className="bg-gray-700 h-[300px] flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <i className="fas fa-drone text-4xl mb-4"></i>
                  <h4 className="text-xl font-bold">Tecnología de Drones</h4>
                  <p className="mt-2 text-gray-300">Captura aérea avanzada con drones especializados</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h4 className="font-bold text-xl mb-2">Relevamiento con Drones</h4>
                  <p className="text-white/80 text-sm">Captura aérea avanzada de activos industriales</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-200 max-w-xs z-10">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">
                  <i className="fas fa-chart-pie text-sm"></i>
                </div>
                <h5 className="font-bold">Análisis de Datos en Tiempo Real</h5>
              </div>
              <p className="text-gray-600 text-sm">Nuestra IA procesa más de 1,000 variables para optimizar sus operaciones</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}