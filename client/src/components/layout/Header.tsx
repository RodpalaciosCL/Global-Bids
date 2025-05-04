import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const { language, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = [
        'inicio', 
        'nosotros', 
        'catalogo',
        'subastas', 
        'soporte', 
        'contacto'
      ];
      const positions = sections.map(id => {
        const element = document.getElementById(id);
        if (!element) return { id, position: 0 };
        return { 
          id, 
          position: element.getBoundingClientRect().top 
        };
      });
      
      const activeSectionData = positions
        .filter(section => section.position <= 100)
        .sort((a, b) => b.position - a.position)[0];
        
      if (activeSectionData) {
        setActiveSection(activeSectionData.id);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const menuItems = [
    { href: '#inicio', label: 'Inicio', icon: 'fa-home' },
    { href: '#nosotros', label: 'Nosotros', icon: 'fa-users' },
    { href: '#catalogo', label: 'Marketplace', icon: 'fa-th-large' },
    { href: '#subastas', label: 'Subastas', icon: 'fa-gavel' },
    { href: '#soporte', label: 'Soporte', icon: 'fa-headset' },
    { href: '#contacto', label: 'Contacto', icon: 'fa-envelope' }
  ];
  
  return (
    <header 
      className={`backdrop-blur-md bg-white/90 text-gray-800 sticky top-0 z-40 transition-all duration-300 shadow-md ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo & Brand Name */}
          <Link href="/">
            <motion.div 
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative mr-3">
                <img 
                  src="https://images.proxibid.com/AuctionImages/11639/global%20bids.jpg" 
                  alt="Global Bids Logo" 
                  className="h-14 w-auto object-contain rounded-lg shadow-sm border-2 border-primary/20"
                />
              </div>
              <div>
                <div className="font-heading font-bold text-2xl text-primary tracking-tight">Global Bids</div>
                <div className="text-xs text-gray-600 -mt-1 font-medium">
                  {language === 'es' ? 'Subastas de Equipos' : 'Equipment Auctions'}
                </div>
              </div>
            </motion.div>
          </Link>
          
          {/* Mobile menu toggle */}
          <motion.button 
            className="md:hidden w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-gray-700`}></i>
          </motion.button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <nav className="flex items-center bg-gray-100 p-1 rounded-full">
              {menuItems.map((item) => (
                <a 
                  key={item.href}
                  href={item.href} 
                  className={`relative px-3 py-2 rounded-full font-medium transition-all duration-300 flex items-center ${
                    activeSection === item.href.substring(1) 
                      ? 'text-white' 
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {activeSection === item.href.substring(1) && (
                    <motion.div 
                      className="absolute inset-0 bg-primary rounded-full z-0"
                      layoutId="navIndicator"
                      initial={false}
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}
                  <i className={`fas ${item.icon} mr-2 z-10 relative ${
                    activeSection === item.href.substring(1) ? 'text-white' : 'text-primary'
                  }`}></i>
                  <span className="relative z-10">{item.label}</span>
                </a>
              ))}
            </nav>
            
            <LanguageSelector />
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col divide-y divide-gray-100">
                <div className="p-4 flex items-center justify-center">
                  <div className="relative mr-3">
                    <img 
                      src="https://images.proxibid.com/AuctionImages/11639/global%20bids.jpg" 
                      alt="Global Bids Logo" 
                      className="h-12 w-auto object-contain rounded-lg shadow-sm border-2 border-primary/20"
                    />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-xl text-primary tracking-tight">Global Bids</div>
                    <div className="text-xs text-gray-600 -mt-1 font-medium">
                      {language === 'es' ? 'Subastas de Equipos' : 'Equipment Auctions'}
                    </div>
                  </div>
                </div>
                <div className="h-px w-full bg-gray-100 mb-2"></div>
                {menuItems.map((item) => (
                  <a 
                    key={item.href}
                    href={item.href} 
                    className={`px-5 py-3 transition flex items-center ${
                      activeSection === item.href.substring(1)
                        ? 'bg-primary/5 text-primary font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className={`fas ${item.icon} w-6 mr-3 ${
                      activeSection === item.href.substring(1) ? 'text-primary' : 'text-gray-400'
                    }`}></i>
                    {item.label}
                    {activeSection === item.href.substring(1) && (
                      <div className="ml-auto w-1.5 h-6 bg-primary rounded-full"></div>
                    )}
                  </a>
                ))}
                <div className="px-5 py-4 flex justify-center border-t border-gray-100 mt-2">
                  <LanguageSelector />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
