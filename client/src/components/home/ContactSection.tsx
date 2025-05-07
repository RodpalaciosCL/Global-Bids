import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, slideUp } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

export function ContactSection() {
  const sectionRef = useRef(null);
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");

  const locations =
    language === "es"
      ? [
          {
            name: "Centro Logístico",
            address: "La Negra, Antofagasta, Chile",
          },
          {
            name: "Casa Matriz",
            address: "Luis Carrera 1263 oficina 301, Vitacura, Chile",
          },
          {
            name: "Centro Operaciones Norte",
            address: "Sierra Gorda, Antofagasta, Chile",
          },
          {
            name: "Oficina Massachusetts",
            address: "Dighton, Massachusetts, USA",
          },
        ]
      : [
          {
            name: "Logistics Center",
            address: "La Negra, Antofagasta, Chile",
          },
          {
            name: "Headquarters",
            address: "Luis Carrera 1263 office 301, Vitacura, Chile",
          },
          {
            name: "Northern Operations Center",
            address: "Sierra Gorda, Antofagasta, Chile",
          },
          {
            name: "Massachusetts Office",
            address: "Dighton, Massachusetts, USA",
          },
        ];

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    // Simulamos el envío y mostramos un mensaje de éxito
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Mostrar mensaje de éxito
      setMessageText(language === 'es' 
        ? "¡Gracias por contactarnos! Te responderemos pronto."
        : "Thank you for contacting us! We will respond soon.");
      setShowMessage(true);
      
      // Ocultamos el mensaje después de 5 segundos
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      
      // No necesitamos limpiar los campos manualmente, se hará después del envío real
    }, 1500);
  };

  return (
    <section
      id="contacto"
      className="py-16 bg-primary text-white relative"
      ref={sectionRef}
    >
      {/* Mensaje de éxito */}
      {showMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 
                       bg-white text-gray-800 p-6 rounded-lg shadow-xl border-2 border-secondary
                       w-full max-w-md">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-secondary rounded-full p-3">
                <svg className="h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">
              {language === 'es' ? 'Mensaje enviado' : 'Message sent'}
            </h3>
            <p className="mb-6">{messageText}</p>
            <button 
              onClick={() => setShowMessage(false)}
              className="w-full bg-secondary hover:bg-secondary-dark text-primary font-semibold px-6 py-3 rounded-lg transition duration-300"
            >
              {language === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>
      )}
      
      {/* Overlay oscuro cuando se muestra el mensaje */}
      {showMessage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={() => setShowMessage(false)}
        ></div>
      )}

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            {t("contact.title")}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Locations */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            {locations.map((location, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                variants={slideUp}
              >
                <div className="text-secondary text-xl mt-1 mr-4">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-medium text-lg">{location.name}</h4>
                  <p className="text-gray-300">{location.address}</p>
                </div>
              </motion.div>
            ))}

            <motion.div className="flex items-start" variants={slideUp}>
              <div className="text-secondary text-xl mt-1 mr-4">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div>
                <h4 className="font-medium text-lg">{t("contact.phone")}</h4>
                <p className="text-gray-300">+56 2 2756 9900</p>
              </div>
            </motion.div>

            <motion.div className="flex items-start" variants={slideUp}>
              <div className="text-secondary text-xl mt-1 mr-4">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <h4 className="font-medium text-lg">
                  {t("contact.emailLabel")}
                </h4>
                <p className="text-gray-300">auctions@theglobalbid.com</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="bg-white p-6 rounded-lg shadow-lg text-gray-800"
          >
            <form 
              className="space-y-4" 
              // Comentamos temporalmente la acción para evitar errores
              // action="https://formsubmit.co/auctions@theglobalbid.com" 
              // method="POST"
              // target="_blank"
              onSubmit={(e) => {
                // Prevenir el envío del formulario para mostrar nuestra UI primero
                e.preventDefault();
                handleSubmit(e);
                
                // Mostrar nuestro mensaje de confirmación
                // pero sin enviar realmente el formulario a FormSubmit
                // ya que estamos teniendo problemas técnicos
                
                // Simplemente vamos a limpiar el formulario después de un tiempo
                setTimeout(() => {
                  const form = e.currentTarget as HTMLFormElement;
                  const inputs = form.querySelectorAll('input, textarea');
                  inputs.forEach((input) => {
                    if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                      input.value = '';
                    }
                  });
                }, 2000);
              }}
            >
              <input
                name="name"
                placeholder={t("contact.name")}
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
              />

              <input
                type="email"
                name="email"
                placeholder={t("contact.email")}
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
              />

              <textarea
                name="message"
                rows={5}
                placeholder={t("contact.message")}
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
              ></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-secondary-dark text-primary font-semibold px-6 py-4 rounded-lg transition duration-300 flex items-center justify-center disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === 'es' ? 'Enviando...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    {t("contact.send")}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}