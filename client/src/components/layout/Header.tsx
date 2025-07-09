import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
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
  const [location] = useLocation();

  useEffect(() => {
    // Set active section based on current route
    if (location === '/marketplace') {
      setActiveSection('catalogo');
      return;
    }
    
    // If we're on the home page, detect sections by scroll
    if (location === '/') {
      const handleScroll = () => {
        // Update scrolled state
        setScrolled(window.scrollY > 50);
        
        // Update active section based on scroll position
        const sections = [
          'inicio', 
          'nosotros', 
          'servicios',
          'subastas',
          'catalogo',
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
    } else {
      // For other routes, set to 'inicio' as default
      setActiveSection('inicio');
    }
  }, [location]);
  


  const hashRoutes = [
    { href: "/#inicio", label: t("nav.home"), icon: "fa-home", id: "inicio" },
    { href: "/#nosotros", label: t("nav.about"), icon: "fa-users", id: "nosotros" },
    { href: "/#servicios", label: t("nav.services"), icon: "fa-wrench", id: "servicios" },
    { href: "/#subastas", label: t("nav.auctions"), icon: "fa-gavel", id: "subastas" },
  ];
  
  return (
    <header 
      className={`bg-primary text-white sticky top-0 z-40 transition-all duration-300 shadow-lg ${
        scrolled ? 'py-1 md:py-2' : 'py-2 md:py-3'
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
              <div className="relative mr-2 sm:mr-3">
                <div className="bg-white p-1 rounded-lg shadow-md">
                  <img 
                    src="https://images.proxibid.com/AuctionImages/11639/global%20bids.jpg" 
                    alt="Global Bids Logo" 
                    className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                  />
                </div>
              </div>
              <div>
                <div className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight">Global Bids</div>
                <div className="text-xs text-white/90 font-medium hidden xs:block">
                  {t('nav.logoTagline')}
                </div>
              </div>
            </motion.div>
          </Link>
          
          {/* Mobile menu toggle */}
          <motion.button 
            className="md:hidden w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-white`}></i>
          </motion.button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center">
              {/* Hash routes usando enlaces normales */}
              {hashRoutes.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    // Siempre usar navegación estándar del navegador para enlaces hash
                    // No prevenir el comportamiento por defecto
                  }}
                  className={`relative px-4 py-2 mx-1 font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap ${
                    activeSection === item.id 
                      ? 'bg-white text-primary rounded-md' 
                      : 'text-white hover:bg-white/10 rounded-md'
                  }`}
                >
                  <i className={`fas ${item.icon} mr-2 ${
                    activeSection === item.id ? 'text-primary' : 'text-white/80'
                  }`}></i>
                  <span>{item.label}</span>
                </a>
              ))}
              
              {/* Marketplace como hash route también */}
              <a
                href="/#catalogo"
                onClick={(e) => {
                  // Usar navegación estándar del navegador
                }}
                className={`relative px-4 py-2 mx-1 font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap ${
                  activeSection === 'catalogo' 
                    ? 'bg-white text-primary rounded-md' 
                    : 'text-white hover:bg-white/10 rounded-md'
                }`}
              >
                <i className={`fas fa-th-large mr-2 ${
                  activeSection === 'catalogo' ? 'text-primary' : 'text-white/80'
                }`}></i>
                <span>{t('nav.catalog')}</span>
              </a>
              
              {/* Resto de hash routes - forzar navegación a home */}
              <a
                href="/#soporte"
                onClick={(e) => {
                  // Usar navegación estándar del navegador
                }}
                className={`relative px-4 py-2 mx-1 font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap ${
                  activeSection === 'soporte' 
                    ? 'bg-white text-primary rounded-md' 
                    : 'text-white hover:bg-white/10 rounded-md'
                }`}
              >
                <i className={`fas fa-headset mr-2 ${
                  activeSection === 'soporte' ? 'text-primary' : 'text-white/80'
                }`}></i>
                <span>{t('nav.support')}</span>
              </a>
              
              <a
                href="/#contacto"
                onClick={(e) => {
                  // Usar navegación estándar del navegador
                }}
                className={`relative px-4 py-2 mx-1 font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap ${
                  activeSection === 'contacto' 
                    ? 'bg-white text-primary rounded-md' 
                    : 'text-white hover:bg-white/10 rounded-md'
                }`}
              >
                <i className={`fas fa-envelope mr-2 ${
                  activeSection === 'contacto' ? 'text-primary' : 'text-white/80'
                }`}></i>
                <span>{t('nav.contact')}</span>
              </a>
            </nav>
            
            <div className="pl-2 border-l border-white/20">
              <LanguageSelector />
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col">
                <div className="bg-primary text-white p-4">
                  <div className="font-heading font-bold text-xl tracking-tight mb-1">{t('nav.mainMenu')}</div>
                  <div className="text-xs text-white/80">
                    {t('nav.siteNavigation')}
                  </div>
                </div>
                
                {/* Hash routes for mobile usando enlaces normales */}
                {hashRoutes.map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      // Usar navegación estándar del navegador
                    }}
                    className={`px-5 py-4 transition flex items-center w-full ${
                      activeSection === item.id
                        ? 'bg-primary/10 text-primary font-medium border-l-4 border-primary'
                        : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                      activeSection === item.id 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-gray-100 text-gray-500'
                    }`}>
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">
                        {item.id === 'inicio' ? t('nav.homeDesc') : 
                         item.id === 'nosotros' ? t('nav.aboutDesc') :
                         item.id === 'servicios' ? t('nav.servicesDesc') :
                         item.id === 'subastas' ? t('nav.auctionsDesc') : ''}
                      </div>
                    </div>
                  </a>
                ))}
                
                {/* Solo Marketplace usa Link */}
                <Link href="/marketplace">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-5 py-4 transition flex items-center w-full ${
                      activeSection === 'catalogo'
                        ? 'bg-primary/10 text-primary font-medium border-l-4 border-primary'
                        : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                      activeSection === 'catalogo'
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-gray-100 text-gray-500'
                    }`}>
                      <i className="fas fa-th-large"></i>
                    </div>
                    <div>
                      <div className="font-medium">{t('nav.catalog')}</div>
                      <div className="text-xs text-gray-500">{t('nav.catalogDesc')}</div>
                    </div>
                  </button>
                </Link>
                
                {/* Resto de hash routes */}
                <a
                  href="/#soporte"
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    // Usar navegación estándar del navegador
                  }}
                  className={`px-5 py-4 transition flex items-center w-full ${
                    activeSection === 'soporte'
                      ? 'bg-primary/10 text-primary font-medium border-l-4 border-primary'
                      : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                    activeSection === 'soporte'
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-gray-100 text-gray-500'
                  }`}>
                    <i className="fas fa-headset"></i>
                  </div>
                  <div>
                    <div className="font-medium">{t('nav.support')}</div>
                    <div className="text-xs text-gray-500">{t('nav.supportDesc')}</div>
                  </div>
                </a>
                
                <a
                  href="/#contacto"
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    // Usar navegación estándar del navegador
                  }}
                  className={`px-5 py-4 transition flex items-center w-full ${
                    activeSection === 'contacto'
                      ? 'bg-primary/10 text-primary font-medium border-l-4 border-primary'
                      : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                    activeSection === 'contacto'
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-gray-100 text-gray-500'
                  }`}>
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <div className="font-medium">{t('nav.contact')}</div>
                    <div className="text-xs text-gray-500">{t('nav.contactDesc')}</div>
                  </div>
                </a>
                
                <div className="px-5 py-4 flex justify-between items-center bg-gray-50 mt-2">
                  <div className="text-sm text-gray-500">{t('nav.language')}:</div>
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
