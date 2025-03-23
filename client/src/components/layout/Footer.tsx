import { Link } from 'wouter';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Enlaces rápidos organizados por categoría
  const footerLinks = [
    {
      title: "Compañía",
      links: [
        { label: "Inicio", href: "#inicio" },
        { label: "Quiénes Somos", href: "#nosotros" },
        { label: "Servicios", href: "#servicios" },
        { label: "Trabaja con Nosotros", href: "#" },
        { label: "Blog", href: "#" }
      ]
    },
    {
      title: "Servicios",
      links: [
        { label: "Subastas", href: "#catalogo" },
        { label: "Tasaciones", href: "#" },
        { label: "Consignación", href: "#" },
        { label: "Transporte", href: "#" },
        { label: "Financiamiento", href: "#" }
      ]
    },
    {
      title: "Ayuda",
      links: [
        { label: "Preguntas Frecuentes", href: "#" },
        { label: "Términos y Condiciones", href: "#" },
        { label: "Política de Privacidad", href: "#" },
        { label: "Soporte", href: "#contacto" },
        { label: "Cookies", href: "#" }
      ]
    }
  ];
  
  // Oficinas
  const offices = [
    { city: "La Negra", region: "Antofagasta, Chile", icon: "fa-map-marker-alt" },
    { city: "Sierra Gorda", region: "Antofagasta, Chile", icon: "fa-map-marker-alt" },
    { city: "Vitacura", region: "Santiago, Chile", icon: "fa-map-marker-alt" },
    { city: "Boston", region: "Massachusetts, USA", icon: "fa-map-marker-alt" }
  ];
  
  // Redes sociales
  const socialLinks = [
    { icon: "fab fa-facebook-f", href: "#", label: "Facebook" },
    { icon: "fab fa-twitter", href: "#", label: "Twitter" },
    { icon: "fab fa-instagram", href: "#", label: "Instagram" },
    { icon: "fab fa-linkedin-in", href: "#", label: "LinkedIn" },
    { icon: "fab fa-youtube", href: "#", label: "YouTube" }
  ];
  
  return (
    <footer className="pt-16 pb-8 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 relative">
      {/* Elementos decorativos */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
      
      {/* Logo y descripción con el formulario de suscripción */}
      <div className="container mx-auto px-6 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center mb-6">
              <div className="bg-white rounded-lg h-12 w-12 flex items-center justify-center shadow-lg mr-3">
                <span className="text-primary font-bold text-2xl">M</span>
              </div>
              <div>
                <div className="text-white font-heading font-bold text-2xl">MacBid</div>
                <div className="text-gray-400 text-xs">Subastas de Maquinaria Profesional</div>
              </div>
            </div>
            
            <p className="text-gray-300 max-w-md">
              Somos líderes en remates de maquinaria pesada para los sectores minero, forestal e industrial, 
              ofreciendo un servicio profesional y transparente para compradores y vendedores en toda Latinoamérica.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl">
              <h3 className="text-white font-bold text-xl mb-6">Recibe alertas de nuevas subastas</h3>
              <p className="text-gray-300 mb-6">
                Suscríbete para recibir notificaciones sobre nuevos lotes, próximas subastas y ofertas especiales.
              </p>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Nombre</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent" 
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent" 
                      placeholder="Tu correo electrónico"
                    />
                  </div>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="rounded bg-white/10 border-white/10 text-primary focus:ring-primary/50" />
                    <span className="ml-2 text-gray-300 text-sm">Acepto recibir comunicaciones comerciales</span>
                  </label>
                </div>
                <div>
                  <motion.button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <i className="fas fa-bell mr-2"></i>
                    Suscribirme a Alertas
                  </motion.button>
                </div>
                <p className="text-gray-400 text-xs text-center">
                  Al suscribirte, aceptas nuestra <a href="#" className="text-primary">política de privacidad</a> y 
                  nuestros <a href="#" className="text-primary">términos de servicio</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Separador con efecto */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-10"></div>
      </div>
      
      {/* Enlaces y oficinas */}
      <div className="container mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {footerLinks.map((category, index) => (
            <div key={index}>
              <h3 className="text-white font-bold text-lg mb-5 border-b border-gray-700 pb-2">{category.title}</h3>
              <ul className="space-y-3">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group">
                      <i className="fas fa-chevron-right text-xs mr-2 text-primary/70 group-hover:translate-x-1 transition-transform"></i>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h3 className="text-white font-bold text-lg mb-5 border-b border-gray-700 pb-2">Nuestras Oficinas</h3>
            <ul className="space-y-4">
              {offices.map((office, index) => (
                <li key={index} className="flex items-start">
                  <div className="mt-1 mr-3 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <i className={`fas ${office.icon} text-primary/90 text-xs`}></i>
                  </div>
                  <div>
                    <div className="text-white font-medium">{office.city}</div>
                    <div className="text-gray-400 text-sm">{office.region}</div>
                  </div>
                </li>
              ))}
              <li className="flex items-start pt-4">
                <div className="mt-1 mr-3 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone-alt text-primary/90 text-xs"></i>
                </div>
                <div>
                  <div className="text-white font-medium">Contáctanos</div>
                  <div className="text-gray-400 text-sm">+56 2 2756 9900</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Créditos y copyright */}
      <div className="container mx-auto px-6">
        <div className="pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0 flex flex-col md:flex-row items-center">
            <span>&copy; {currentYear} MacBid. Todos los derechos reservados.</span>
            <span className="hidden md:block mx-2">|</span>
            <span>
              Developed by <a 
                href="http://prelco.tech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-white transition-colors"
              >
                Prelco Technologies
              </a>
            </span>
          </div>
          
          <div className="flex items-center">
            <div className="mr-4 text-xs text-gray-500">
              <i className="fas fa-shield-alt mr-1 text-primary/80"></i> SSL Seguro
            </div>
            <img src="https://via.placeholder.com/120x30?text=Payment+Methods" alt="Métodos de pago" className="h-6 opacity-70" />
          </div>
        </div>
      </div>
    </footer>
  );
}
