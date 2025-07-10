import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, slideUp } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");

  /* ───────────────────────── Locations ───────────────────────── */
  const locations =
    language === "es"
      ? [
          { name: "Centro Logístico", address: "La Negra, Antofagasta, Chile" },
          {
            name: "Casa Matriz",
            address: "Luis Carrera 1263 of 301, Vitacura, Chile",
          },
          {
            name: "Centro Operaciones Norte",
            address: "Sierra Gorda, Antofagasta, Chile",
          },
          {
            name: "Oficina Massachusetts",
            address: "Dighton, Massachusetts, USA",
          },
        ]
      : [
          { name: "Logistics Center", address: "La Negra, Antofagasta, Chile" },
          {
            name: "Headquarters",
            address: "Luis Carrera 1263 office 301, Vitacura, Chile",
          },
          {
            name: "Northern Ops Center",
            address: "Sierra Gorda, Antofagasta, Chile",
          },
          {
            name: "Massachusetts Office",
            address: "Dighton, Massachusetts, USA",
          },
        ];

  /* ───────────────────── Submit handler (FIX) ─────────────────── */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget; // ← guarda referencia segura
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          subject: "Contacto desde web",
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Server error");

      setMessageText(
        language === "es"
          ? "¡Gracias por contactarnos! Te responderemos pronto."
          : "Thank you for contacting us! We will respond soon.",
      );
    } catch (err) {
      console.error(err);
      setMessageText(
        language === "es"
          ? "Hubo un problema al enviar tu mensaje. Intenta nuevamente."
          : "There was a problem sending your message. Please try again.",
      );
    } finally {
      setShowMessage(true);
      setIsSubmitting(false);
      form.reset(); // ← usa la referencia
      setTimeout(() => setShowMessage(false), 10000);
    }
  };

  /* ─────────────────────────── Render ─────────────────────────── */
  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-16 bg-primary text-white relative"
    >
      {/* Overlay + modal */}
      {showMessage && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-40"
            onClick={() => setShowMessage(false)}
          ></div>
          <div className="fixed z-50 inset-0 flex items-center justify-center">
            <div className="bg-white text-gray-800 w-full max-w-md p-6 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-center">
                {language === "es" ? "Mensaje enviado" : "Message Sent"}
              </h3>
              <p className="mb-6 text-center">{messageText}</p>
              <button
                onClick={() => setShowMessage(false)}
                className="w-full bg-secondary hover:bg-secondary-dark text-primary font-semibold py-3 rounded-lg transition"
              >
                {language === "es" ? "Cerrar" : "Close"}
              </button>
            </div>
          </div>
        </>
      )}

      <div className="container mx-auto px-4">
        {/* Título */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            {t("contact.title")}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6" />
          <p className="max-w-3xl mx-auto">{t("contact.subtitle")}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* ── Locations ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {locations.map((loc, i) => (
              <motion.div key={i} variants={slideUp} className="flex">
                <div className="text-secondary text-xl mt-1 mr-4">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div>
                  <h4 className="font-medium text-lg">{loc.name}</h4>
                  <p className="text-gray-300">{loc.address}</p>
                </div>
              </motion.div>
            ))}

            {/* Teléfono */}
            <motion.div variants={slideUp} className="flex">
              <div className="text-secondary text-xl mt-1 mr-4">
                <i className="fas fa-phone-alt" />
              </div>
              <div>
                <h4 className="font-medium text-lg">{t("contact.phone")}</h4>
                <p className="text-gray-300">+56 2 2756 9900</p>
              </div>
            </motion.div>

            {/* Correo */}
            <motion.div variants={slideUp} className="flex">
              <div className="text-secondary text-xl mt-1 mr-4">
                <i className="fas fa-envelope" />
              </div>
              <div>
                <h4 className="font-medium text-lg">
                  {t("contact.emailLabel")}
                </h4>
                <p className="text-gray-300">contacto@theglobalbid.com</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Formulario ── */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate="visible"
            className="bg-white p-6 rounded-lg shadow-lg text-gray-800"
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder={t("contact.name")}
                required
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-secondary"
              />
              <input
                type="email"
                name="email"
                placeholder={t("contact.email")}
                required
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-secondary"
              />
              <input
                name="phone"
                placeholder={t("contact.phone")}
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-secondary"
              />
              <textarea
                name="message"
                rows={5}
                placeholder={t("contact.message")}
                required
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-secondary-dark text-primary font-semibold py-4 rounded-lg transition flex items-center justify-center"
              >
                <i className="fas fa-paper-plane mr-2" />
                {isSubmitting
                  ? language === "es"
                    ? "Enviando…"
                    : "Sending…"
                  : t("contact.send")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
