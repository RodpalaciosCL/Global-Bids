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

  const spaRoutes = [
    { href: "/marketplace", label: t("nav.catalog"), icon: "fa-th-large" },
    { href: "/#soporte", label: t("nav.support"), icon: "fa-headset", id: "soporte" },
    { href: "/#contacto", label: t("nav.contact"), icon: "fa-envelope", id: "contacto" },
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
              {/* Hash routes */}
              {hashRoutes.map(item => (
                <Link key={item.href} href={item.href}>
                  <button className={`relative px-4 py-2 mx-1 font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap ${
                    activeSection === item.id 
                      ? 'bg-white text-primary rounded-md' 
                      : 'text-white hover:bg-white/10 rounded-md'
                  }`}>
                    <i className={`fas ${item.icon} mr-2 ${
                      activeSection === item.id ? 'text-primary' : 'text-white/80'
                    }`}></i>
                    <span>{item.label}</span>
                  </button>
                </Link>
              ))}
              
              {/* SPA routes */}
              {spaRoutes.map(item => (
                <Link key={item.href} href={item.href}>
                  <button className={`relative px-4 py-2 mx-1 font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap ${
                    (item.href === '/marketplace' && activeSection === 'catalogo') || 
                    (item.id && activeSection === item.id)
                      ? 'bg-white text-primary rounded-md' 
                      : 'text-white hover:bg-white/10 rounded-md'
                  }`}>
                    <i className={`fas ${item.icon} mr-2 ${
                      (item.href === '/marketplace' && activeSection === 'catalogo') || 
                      (item.id && activeSection === item.id) ? 'text-primary' : 'text-white/80'
                    }`}></i>
                    <span>{item.label}</span>
                  </button>
                </Link>
              ))}
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
                
                {/* Hash routes for mobile */}
                {hashRoutes.map(item => (
                  <Link key={item.href} href={item.href}>
                    <button
                      onClick={() => setIsMenuOpen(false)}
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
                    </button>
                  </Link>
                ))}
                
                {/* SPA routes for mobile */}
                {spaRoutes.map(item => (
                  <Link key={item.href} href={item.href}>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-5 py-4 transition flex items-center w-full ${
                        (item.href === '/marketplace' && activeSection === 'catalogo') || 
                        (item.id && activeSection === item.id)
                          ? 'bg-primary/10 text-primary font-medium border-l-4 border-primary'
                          : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        (item.href === '/marketplace' && activeSection === 'catalogo') || 
                        (item.id && activeSection === item.id)
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-gray-100 text-gray-500'
                      }`}>
                        <i className={`fas ${item.icon}`}></i>
                      </div>
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500">
                          {item.href === '/marketplace' ? t('nav.catalogDesc') :
                           item.id === 'soporte' ? t('nav.supportDesc') :
                           item.id === 'contacto' ? t('nav.contactDesc') : ''}
                        </div>
                      </div>
                    </button>
                  </Link>
                ))}
                
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
