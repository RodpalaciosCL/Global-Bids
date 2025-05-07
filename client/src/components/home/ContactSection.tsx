import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, slideUp } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import emailjs from 'emailjs-com';

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

  // Inicializar EmailJS - no es necesario hacerlo, ya que lo pasamos como 4to parámetro en emailjs.send

  // Manejar el envío del formulario y enviar los datos usando EmailJS
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formElement = e.currentTarget as HTMLFormElement;
    
    // Usar EmailJS para enviar el correo directamente desde el navegador
    emailjs.sendForm(
      'service_nk3ijyi', // EMAILJS_SERVICE_ID
      'template_kq93c3o', // EMAILJS_TEMPLATE_ID
      formElement,
      'BmzpAL5qsxXCk9eoI' // EMAILJS_USER_ID
    )
    .then((result) => {
      console.log('EmailJS resultado exitoso:', result.text);
      setIsSubmitting(false);
      
      // Mostrar mensaje de éxito
      setMessageText(language === 'es' 
        ? "¡Gracias por contactarnos! Te responderemos pronto."
        : "Thank you for contacting us! We will respond soon.");
      
      setShowMessage(true);
      
      // Ocultamos el mensaje después de 10 segundos
      setTimeout(() => {
        setShowMessage(false);
      }, 10000);
      
      // También almacenar en la base de datos
      const formData = new FormData(formElement);
      const contactData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        subject: "Contacto desde web",
        message: formData.get('message') as string
      };
      
      // Enviar al endpoint del servidor para guardar en BD
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      })
      .then(response => response.json())
      .then(data => console.log('Contacto guardado en BD:', data))
      .catch(error => console.error('Error guardando contacto en BD:', error));
      
      // Limpiar el formulario
      formElement.reset();
    })
    .catch((error) => {
      console.error('Error con EmailJS:', error);
      setIsSubmitting(false);
      
      // Mostrar mensaje de error
      setMessageText(language === 'es' 
        ? "Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente."
        : "There was a problem sending your message. Please try again.");
      
      setShowMessage(true);
      
      // Ocultar después de 10 segundos
      setTimeout(() => {
        setShowMessage(false);
      }, 10000);
    });
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
              onSubmit={handleSubmit}
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

              {/* Campos ocultos para FormSubmit */}
              {/* Redirección al mismo sitio pero con un hash para evitar problemas */}
              <input type="hidden" name="_next" value="https://a6481a0e-1b17-48e5-925f-133729b45681-00-1ypwsu92tle9.worf.replit.dev/#contacto" />
              <input type="hidden" name="_subject" value={`Nuevo mensaje de contacto - Global Bids`} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              {/* Agregamos el campo para el correo real de destino */}
              <input type="hidden" name="_cc" value="auctions@theglobalbid.com" />
              
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary-dark text-primary font-semibold px-6 py-4 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                {t("contact.send")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}