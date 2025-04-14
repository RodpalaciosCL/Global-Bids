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
      title: "Enlaces Legales",
      links: [
        { label: "Términos y Condiciones", href: "#" },
        { label: "Política de Privacidad", href: "#" },
        { label: "Soporte", href: "#contacto" },
        { label: "Cookies", href: "#" }
      ]
    }
  ];
  
  // Oficinas
  const offices = [
    { city: "Casa Matriz", region: "Luis Carrera 1263 oficina 301, Vitacura, Chile", icon: "fa-map-marker-alt" },
    { city: "Centro Operaciones Norte", region: "Sierra Gorda, Antofagasta, Chile", icon: "fa-map-marker-alt" },
    { city: "Massachusetts Office", region: "Boston, Massachusetts, USA", icon: "fa-map-marker-alt" }
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
    <footer className="pt-10 pb-6 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 relative">
      {/* Elementos decorativos */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-6">
        {/* Grid principal de contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Logo, descripción y redes sociales */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center mb-3">
              <img 
                src="https://images.proxibid.com/AuctionImages/11639/global%20bids.jpg" 
                alt="Global Bids Logo" 
                className="h-10 mr-3 rounded-lg" 
              />
              <div>
                <div className="text-white font-heading font-bold text-xl">Global Bids</div>
                <div className="text-gray-400 text-xs">Subastas de Maquinaria</div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm">
              Líderes en remates de maquinaria pesada para sectores minero, forestal e industrial.
            </p>
            
            <div className="flex gap-2 mt-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* Formulario de suscripción */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-white font-medium text-base mb-3">Recibe alertas de subastas</h3>
              <div className="flex">
                <input 
                  type="email" 
                  className="flex-grow px-3 py-2 rounded-l-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none text-sm"
                  placeholder="Tu correo electrónico" 
                />
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-lg transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-paper-plane text-sm"></i>
                </button>
              </div>
              <div className="mt-2 flex items-center">
                <input type="checkbox" className="rounded bg-white/10 border-white/10 text-primary focus:ring-primary/50 mr-2" />
                <span className="text-gray-300 text-xs">Acepto recibir comunicaciones comerciales</span>
              </div>
            </div>
          </div>
          
          {/* Enlaces rápidos */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-4">
              {footerLinks.map((category, index) => (
                <div key={index}>
                  <h3 className="text-white font-medium text-sm mb-3">{category.title}</h3>
                  <ul className="space-y-1.5">
                    {category.links.slice(0, 4).map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Separador */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"></div>
        
        {/* Oficinas y copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex gap-x-6 gap-y-2 flex-wrap justify-center mb-4 md:mb-0">
            {offices.map((office, index) => (
              <div key={index} className="flex items-center text-gray-400">
                <i className={`fas ${office.icon} text-primary/80 mr-1.5`}></i>
                <span className="text-xs">{office.city}, {office.region}</span>
              </div>
            ))}
            <div className="flex items-center text-gray-400">
              <i className="fas fa-phone-alt text-primary/80 mr-1.5"></i>
              <span className="text-xs">+56 2 2756 9900</span>
            </div>
            <div className="flex items-center text-gray-400">
              <i className="fas fa-envelope text-primary/80 mr-1.5"></i>
              <span className="text-xs">auctions@theglobalbid.com</span>
            </div>
          </div>
          
          <div className="text-gray-400 text-xs flex items-center gap-2">
            <span>&copy; {currentYear} Global Bids</span>
            <span>|</span>
            <span>
              Developed by 
              <a 
                href="http://prelco.tech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-white transition-colors ml-1"
              >
                Prelco Technologies
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
