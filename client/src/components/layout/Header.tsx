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
      setActiveSection('marketplace');
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
          
          {/* Desktop Menu - Properly centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <nav className="flex items-center space-x-1">
              {/* Hash links */}
              <a href="/#inicio" className="relative px-3 py-2 font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap text-white hover:bg-white/10 rounded-md">
                <i className="fas fa-home mr-2 text-white/80"></i>
                <span>{t('nav.home')}</span>
              </a>
              <a href="/#nosotros" className="relative px-3 py-2 font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap text-white hover:bg-white/10 rounded-md">
                <i className="fas fa-users mr-2 text-white/80"></i>
                <span>{t('nav.about')}</span>
              </a>
              <a href="/#servicios" className="relative px-3 py-2 font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap text-white hover:bg-white/10 rounded-md">
                <i className="fas fa-wrench mr-2 text-white/80"></i>
                <span>{t('nav.services')}</span>
              </a>
              <a href="/#subastas" className="relative px-3 py-2 font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap text-white hover:bg-white/10 rounded-md">
                <i className="fas fa-gavel mr-2 text-white/80"></i>
                <span>{t('nav.auctions')}</span>
              </a>
              <a href="/#soporte" className="relative px-3 py-2 font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap text-white hover:bg-white/10 rounded-md">
                <i className="fas fa-headset mr-2 text-white/80"></i>
                <span>{t('nav.support')}</span>
              </a>
              <a href="/#contacto" className="relative px-3 py-2 font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap text-white hover:bg-white/10 rounded-md">
                <i className="fas fa-envelope mr-2 text-white/80"></i>
                <span>{t('nav.contact')}</span>
              </a>

              {/* Separador visual bien posicionado */}
              <div className="text-white/30 mx-3">|</div>

              {/* Marketplace con animación de parpadeo */}
              <a href="/#marketplace" className="relative px-3 py-2 font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap text-white hover:bg-white/10 rounded-md font-semibold marketplace-pulse">
                <i className="fas fa-th-large mr-2 text-white/80"></i>
                <span>{t('nav.catalog')}</span>
              </a>
            </nav>
          </div>

          {/* Right Side: Language Selector - More space from center */}
          <div className="hidden md:flex items-center ml-6">
            <LanguageSelector />
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
                
                {/* Mobile hash links - Pure hash links */}
                <a href="/#inicio" 
                   onClick={() => setIsMenuOpen(false)} 
                   className="px-5 py-4 transition flex items-center w-full text-gray-700 hover:bg-gray-50 border-l-4 border-transparent">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-gray-100 text-gray-500">
                    <i className="fas fa-home"></i>
                  </div>
                  <div>
                    <div className="font-medium">{t('nav.home')}</div>
                    <div className="text-xs text-gray-500">{t('nav.homeDesc')}</div>
                  </div>
                </a>
                
                <a href="/#nosotros" 
                   onClick={() => setIsMenuOpen(false)} 
                   className="px-5 py-4 transition flex items-center w-full text-gray-700 hover:bg-gray-50 border-l-4 border-transparent">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-gray-100 text-gray-500">
                    <i className="fas fa-users"></i>
                  </div>
                  <div>
                    <div className="font-medium">{t('nav.about')}</div>
                    <div className="text-xs text-gray-500">{t('nav.aboutDesc')}</div>
                  </div>
                </a>
                
                <a href="/#servicios" 
                   onClick={() => setIsMenuOpen(false)} 
                   className="px-5 py-4 transition flex items-center w-full text-gray-700 hover:bg-gray-50 border-l-4 border-transparent">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-gray-100 text-gray-500">
                    <i className="fas fa-wrench"></i>
                  </div>
                  <div>
                    <div className="font-medium">{t('nav.services')}</div>
                    <div className="text-xs text-gray-500">{t('nav.servicesDesc')}</div>
                  </div>
                </a>
                
                <a href="/#subastas" 
                   onClick={() => setIsMenuOpen(false)} 
                   className="px-5 py-4 transition flex items-center w-full text-gray-700 hover:bg-gray-50 border-l-4 border-transparent">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-gray-100 text-gray-500">
                    <i className="fas fa-gavel"></i>
                  </div>
                  <div>
                    <div className="font-medium">{t('nav.auctions')}</div>
                    <div className="text-xs text-gray-500">{t('nav.auctionsDesc')}</div>
                  </div>
                </a>
                
                <a href="/#soporte" 
                   onClick={() => setIsMenuOpen(false)} 
                   className="px-5 py-4 transition flex items-center w-full text-gray-700 hover:bg-gray-50 border-l-4 border-transparent">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-gray-100 text-gray-500">
                    <i className="fas fa-headset"></i>
                  </div>
                  <div>
                    <div className="font-medium">{t('nav.support')}</div>
                    <div className="text-xs text-gray-500">{t('nav.supportDesc')}</div>
                  </div>
                </a>
                
                <a href="/#contacto" 
                   onClick={() => setIsMenuOpen(false)} 
                   className="px-5 py-4 transition flex items-center w-full text-gray-700 hover:bg-gray-50 border-l-4 border-transparent">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-gray-100 text-gray-500">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <div className="font-medium">{t('nav.contact')}</div>
                    <div className="text-xs text-gray-500">{t('nav.contactDesc')}</div>
                  </div>
                </a>

                {/* Separador en móvil */}
                <div className="px-5 py-2 flex items-center">
                  <div className="w-full h-px bg-gray-200"></div>
                  <div className="px-3 text-xs text-gray-400 whitespace-nowrap">MARKETPLACE</div>
                  <div className="w-full h-px bg-gray-200"></div>
                </div>

                {/* Hash link for mobile con destaque */}
                <a href="/#marketplace" 
                   onClick={() => setIsMenuOpen(false)} 
                   className="px-5 py-4 transition flex items-center w-full text-gray-900 hover:bg-gray-50 border-l-4 border-transparent font-semibold marketplace-pulse">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-primary/10 text-primary">
                    <i className="fas fa-th-large"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t('nav.catalog')}</div>
                    <div className="text-xs text-gray-600">{t('nav.catalogDesc')}</div>
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
