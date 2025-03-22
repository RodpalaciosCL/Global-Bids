import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-secondary font-heading font-bold text-2xl mb-4">MacBid</div>
            <p className="text-gray-400 mb-4">
              Somos líderes en remates de maquinaria pesada, ofreciendo un servicio profesional y transparente para compradores y vendedores.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-gray-400 hover:text-white transition">Inicio</a></li>
              <li><a href="#nosotros" className="text-gray-400 hover:text-white transition">Quiénes Somos</a></li>
              <li><a href="#servicios" className="text-gray-400 hover:text-white transition">Servicios</a></li>
              <li><a href="#catalogo" className="text-gray-400 hover:text-white transition">Catálogo</a></li>
              <li><a href="#destacados" className="text-gray-400 hover:text-white transition">Remates Destacados</a></li>
              <li><a href="#contacto" className="text-gray-400 hover:text-white transition">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Oficinas</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-secondary mt-1 mr-2"></i>
                <span className="text-gray-400">La Negra, Antofagasta, Chile</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-secondary mt-1 mr-2"></i>
                <span className="text-gray-400">Sierra Gorda, Antofagasta, Chile</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-secondary mt-1 mr-2"></i>
                <span className="text-gray-400">Los Abedules 3082, Vitacura, Santiago, Chile</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-secondary mt-1 mr-2"></i>
                <span className="text-gray-400">Boston, Massachusetts, USA</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt text-secondary mt-1 mr-2"></i>
                <span className="text-gray-400">+56 2 2756 9900</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope text-secondary mt-1 mr-2"></i>
                <span className="text-gray-400">contacto@macbid.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Suscríbete</h3>
            <p className="text-gray-400 mb-4">Recibe notificaciones sobre nuevos remates y ofertas especiales.</p>
            <form className="mb-4">
              <div className="flex">
                <input type="email" placeholder="Tu correo electrónico" className="w-full px-4 py-2 rounded-l-lg focus:outline-none text-gray-800" />
                <button type="submit" className="bg-secondary hover:bg-secondary-dark text-primary px-4 py-2 rounded-r-lg transition duration-300">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
            <p className="text-gray-400 text-sm">Al suscribirte, aceptas nuestra política de privacidad.</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} MacBid. Todos los derechos reservados.
            <div className="mt-2">
              Developed by <a href="http://prelco.tech" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white transition">Prelco Technologies</a>
            </div>
          </div>
          <div className="flex space-x-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition">Términos y Condiciones</a>
            <a href="#" className="hover:text-white transition">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
