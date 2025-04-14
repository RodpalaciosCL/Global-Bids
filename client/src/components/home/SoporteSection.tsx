import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useIsMobile } from '@/hooks/use-mobile';

export function SoporteSection() {
  const isMobile = useIsMobile();

  const supportCategories = [
    {
      title: "Servicio al Cliente",
      description: "Soporte personalizado para todas sus consultas sobre nuestros servicios",
      icon: "fa-headset",
      color: "bg-blue-500"
    },
    {
      title: "Asistencia Técnica",
      description: "Asesoramiento especializado para maquinaria y equipos industriales",
      icon: "fa-tools",
      color: "bg-green-500"
    },
    {
      title: "Ayuda con Subasta",
      description: "Guía completa para participar eficientemente en nuestros eventos",
      icon: "fa-gavel",
      color: "bg-primary"
    },
    {
      title: "Documentación",
      description: "Acceso a toda la documentación técnica y legal de los activos",
      icon: "fa-file-alt",
      color: "bg-purple-500"
    }
  ];

  const faqs = [
    {
      question: "¿Cómo puedo participar en una subasta?",
      answer: "Para participar en nuestras subastas, debe registrarse en nuestro sitio web, completar el formulario de verificación y realizar un depósito de garantía. Una vez verificado, podrá acceder a todos nuestros eventos y realizar ofertas."
    },
    {
      question: "¿Qué documentación recibo al adquirir un activo?",
      answer: "Al adquirir un activo en Global Bids, recibirá toda la documentación legal y técnica del equipo, incluyendo facturas, certificados de propiedad, informes técnicos, manuales de operación y mantenimiento, y un informe de inspección detallado."
    },
    {
      question: "¿Ofrecen financiamiento para las compras?",
      answer: "Sí, contamos con alianzas estratégicas con entidades financieras que pueden ofrecer opciones de financiamiento para sus adquisiciones. Nuestro equipo puede guiarlo en el proceso de solicitud y aprobación."
    },
    {
      question: "¿Cómo se coordina el transporte de los equipos adquiridos?",
      answer: "Global Bids ofrece servicios logísticos completos que incluyen desmontaje, carga, transporte nacional e internacional, y entrega en su ubicación. También puede utilizar su propio servicio de transporte si lo prefiere."
    }
  ];

  return (
    <section id="soporte" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Soporte y Ayuda</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos comprometidos con brindarle el mejor servicio y respaldo en todas sus operaciones
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {supportCategories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              custom={index * 0.1}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-white mb-4`}>
                <i className={`fas ${category.icon}`}></i>
              </div>
              <h3 className="font-bold text-xl mb-3">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <motion.a
                href="#contacto"
                className="text-primary font-medium flex items-center text-sm hover:underline"
                whileHover={{ x: 5 }}
              >
                Solicitar ayuda
                <i className="fas fa-chevron-right ml-2 text-xs"></i>
              </motion.a>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Preguntas Frecuentes</h3>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-xl p-5 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-1">
                      Q
                    </span>
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 pl-8">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.a
              href="#contacto"
              className="mt-6 inline-flex items-center text-primary font-medium hover:underline"
              whileHover={{ x: 5 }}
            >
              Ver todas las preguntas frecuentes
              <i className="fas fa-arrow-right ml-2 text-xs"></i>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                <i className="fas fa-comments"></i>
              </div>
              <h3 className="text-2xl font-bold">Contáctenos Directamente</h3>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-primary mr-4 mt-1">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Teléfono de Contacto</h4>
                  <p className="text-gray-600">+56 2 2123 4567</p>
                  <p className="text-sm text-gray-500">Lunes a Viernes 9:00 - 18:00</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-primary mr-4 mt-1">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Correo Electrónico</h4>
                  <p className="text-gray-600">auctions@theglobalbid.com</p>
                  <p className="text-sm text-gray-500">Respuesta en menos de 24 horas</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-primary mr-4 mt-1">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Oficina Central</h4>
                  <p className="text-gray-600">Luis Carrera 1263 oficina 301, Vitacura</p>
                  <p className="text-sm text-gray-500">Santiago, Chile</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-lg mb-4">Horario de Atención</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lunes - Viernes</span>
                  <span className="font-medium">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sábado</span>
                  <span className="font-medium">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domingo</span>
                  <span className="font-medium text-gray-500">Cerrado</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-info-circle text-primary mr-2"></i>
                  <span>Soporte de emergencia disponible 24/7 para clientes premium</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center bg-primary/5 rounded-2xl p-8 border border-primary/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-4">
            <i className="fas fa-headset text-2xl"></i>
          </div>
          <h3 className="text-2xl font-bold mb-2">¿Necesita ayuda personalizada?</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Nuestro equipo de expertos está listo para brindarle asesoramiento técnico especializado y resolver 
            todas sus consultas sobre nuestros servicios y productos.
          </p>
          <motion.a
            href="#contacto"
            className="bg-primary text-white px-8 py-4 rounded-full font-bold inline-flex items-center shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-phone-alt mr-2"></i>
            Contactar con soporte
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}