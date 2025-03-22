import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`bg-primary text-white shadow-lg sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-3'
      }`}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-2 md:mb-0">
          <Link href="/">
            <div className="text-secondary font-heading font-bold text-2xl mr-2 cursor-pointer">MacBid</div>
          </Link>
          <div className="text-sm text-gray-300">Subastas de Maquinaria Profesional</div>
        </div>
        
        {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>
        
        {/* Menu */}
        <nav 
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0`}
        >
          <a href="#inicio" className="px-4 py-2 hover:text-secondary transition duration-200 font-medium">Inicio</a>
          <a href="#nosotros" className="px-4 py-2 hover:text-secondary transition duration-200 font-medium">Quiénes Somos</a>
          <a href="#catalogo" className="px-4 py-2 hover:text-secondary transition duration-200 font-medium">Catálogo</a>
          <a href="#destacados" className="px-4 py-2 hover:text-secondary transition duration-200 font-medium">Destacados</a>
          <a href="#contacto" className="px-4 py-2 hover:text-secondary transition duration-200 font-medium">Contacto</a>
          
          <motion.a 
            href="https://subastas-externas.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="ml-0 md:ml-4 mt-3 md:mt-0 bg-secondary hover:bg-secondary-dark text-primary px-5 py-2 rounded-lg font-semibold transition duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Ir a Remates</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </motion.a>
        </nav>
      </div>
    </header>
  );
}
