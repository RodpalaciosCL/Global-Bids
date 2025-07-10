import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos de idiomas disponibles
type Language = 'es' | 'en';

// Estructura del contexto
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Creación del contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones
const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navegación
    'nav.home': 'Inicio',
    'nav.about': 'Nosotros',
    'nav.services': 'Servicios',
    'nav.catalog': 'Marketplace',
    'nav.auctions': 'Subastas',
    'nav.contact': 'Contacto',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Registrarse',
    'nav.support': 'Soporte',
    'nav.homeDesc': 'Página principal',
    'nav.aboutDesc': 'Sobre nosotros',
    'nav.catalogDesc': 'Equipos disponibles',
    'nav.auctionsDesc': 'Eventos y subastas',
    'nav.servicesDesc': 'Eventos exclusivos',
    'nav.supportDesc': 'Ayuda y contacto',
    'nav.contactDesc': 'Formulario de contacto',
    'nav.language': 'Idioma',
    'nav.logoTagline': 'Marketplace y Subastas',
    'nav.mainMenu': 'Menú Principal',
    'nav.siteNavigation': 'Navegación del sitio',
    
    // Hero Section
    'hero.title': 'Marketplace  y \nSubastas  de  Activos \npara todo el mundo',
    'hero.subtitle': 'Compra o subasta los mejores activos del mundo, de manera segura, intuitiva y rentable',
    'hero.explore': 'Explorar Catálogo',
    'hero.exploreAuctions': 'Explorar Subastas',
    'hero.contact': 'Contáctanos',
    'hero.auctions': 'Próximas Subastas',
    'hero.register': 'Regístrate aquí',
    'hero.lots': 'lotes',
    'hero.viewAll': 'Ver todas las subastas',
    'hero.day': 'En 1 día',
    'hero.week': 'En 1 semana',
    'hero.twoWeeks': 'En 2 semanas',
    'hero.miningEquipment': 'Activos Mineros',
    'hero.forestryEquipment': 'Activos Forestales',
    'hero.trucksTransport': 'Camiones y Transporte',
    'hero.partsTools': 'Repuestos y Partes',
    'hero.industrialEquipment': 'Equipos Industriales',
    'hero.specialLots': 'Lotes Especiales',
    'hero.findByCategory': 'Encuentra por categoría',
    
    // Auction Register Section
    'auctions.exclusiveEvents': 'EVENTOS EXCLUSIVOS',
    'auctions.title': 'Subastas de activos con oportunidades únicas',
    'auctions.description': 'Regístrese ahora para acceder a nuestras subastas exclusivas de maquinaria, repuestos, herramientas y lotes especiales. Sea el primero en recibir notificaciones sobre nuevos eventos.',
    'auctions.heavyMachinery': 'Maquinaria Pesada',
    'auctions.heavyMachineryDesc': 'Excavadoras, cargadores, camiones y más activos para minería y construcción.',
    'auctions.partsTools': 'Repuestos y Herramientas',
    'auctions.partsToolsDesc': 'Componentes originales, herramientas especializadas y accesorios para activos.',
    'auctions.specialLots': 'Lotes Especiales',
    'auctions.specialLotsDesc': 'Lotes completos de activos, flotas y elementos de proyectos completos.',
    'auctions.registerNow': 'Registrarse Ahora',
    'auctions.moreInfo': 'Más Información',
    'auctions.upcomingEvents': 'Próximos Eventos',
    'auctions.exclusiveAccess': 'ACCESO EXCLUSIVO',
    'auctions.day': 'DÍA',
    'auctions.week': 'SEM',
    'auctions.month': 'MES',
    'auctions.miningAssets': 'Subasta de Activos Mineros',
    'auctions.forestryAssets': 'Subasta de Activos Forestales',
    'auctions.industrialParts': 'Subasta de Repuestos Industriales',
    'auctions.openForRegistration': 'Abierto para registro',
    'auctions.comingSoon': 'Próximamente',
    'auctions.virtual': 'Virtual',
    'auctions.register': 'REGISTRARSE',
    'auctions.notify': 'Notificarme',
    'auctions.preRegister': 'Pre-registro',
    'auctions.liveAuctions': 'EVENTOS EN VIVO',
    'auctions.upcomingAuctions': 'Próximos Eventos de Subastas',
    'auctions.exploreAuctions': 'Explore nuestros eventos exclusivos con maquinaria pesada y equipamiento industrial de las mejores marcas',
    'auctions.auctionDetails': 'DETALLES DEL EVENTO',
    'auctions.viewMore': 'Ver más eventos',
    
    // Servicios
    'services.title': 'Nuestros Servicios',
    'services.subtitle': 'Soluciones integrales para la industria',
    'services.auctions.title': 'Subastas',
    'services.auctions.description': 'Accede a nuestra plataforma de subastas para activos verificados',
    'services.valuation.title': 'Tasaciones',
    'services.valuation.description': 'Valoraciones precisas de activos por expertos en la industria',
    'services.logistics.title': 'Logística',
    'services.logistics.description': 'Soluciones de transporte y entrega en todo el mundo',
    
    // Sobre Nosotros
    'about.title': 'Quiénes',
    'about.titleHighlight': 'Somos',
    'about.subtitle': 'Líderes en remates industriales en Latinoamérica',
    'about.description': 'Global Bids es líder en subastas y valoración de maquinaria pesada, chatarra, herramientas y repuestos en Latinoamérica, especializados en equipos y lotes para diversos sectores e industrias,',
    'about.descriptionHighlight': 'tanto en Chile, como en el resto del mundo',
    'about.history': 'Una Historia de Excelencia',
    'about.experience': 'Años de experiencia',
    'about.clients': 'Clientes satisfechos',
    'about.machines': 'Máquinas en catálogo',
    'about.machinesSold': 'Maquinarias vendidas',
    'about.countriesCovered': 'Países cubiertos',
    'about.ctaTitle': 'Abrimos el Mercado Latinoamericano',
    'about.ctaDescription': 'Global Bids ofrece soluciones de venta y subasta de equipos, piezas, partes y otros activos con respaldo y experiencia comprobada, en donde estamos presentes desde el momento en que se analizan exhaustivamente los activos, hasta cuando se traspasan a cliente final, junto con toda su documentación y trazabilidad correspondiente.',
    'about.profitability': 'Rentabilidad',
    'about.profitabilityDesc': 'Maximizamos el valor de sus activos mediante nuestra extensa red global de compradores y expertos en valoración.',
    'about.speed': 'Rapidez',
    'about.speedDesc': 'Procesos optimizados y eficientes que garantizan transacciones ágiles y una rotación efectiva de sus activos.',
    'about.transparency': 'Transparencia',
    'about.transparencyDesc': 'Información completa y detallada en cada operación, con documentación certificada y procesos auditables.',
    
    // Eventos
    'events.title': 'Nuestros Eventos',
    'events.subtitle': 'Participe en nuestras exclusivas subastas y remates de activos premium verificados por expertos',
    'events.featured': 'DESTACADO',
    'events.lots': 'lotes',
    'events.registered': 'inscritos',
    'events.capacity': 'Capacidad de inscripción',
    'events.details': 'Ver detalles',
    'events.register': 'Inscribirse',
    'events.liveTitle': 'Eventos Premium con Transmisión en Vivo',
    'events.liveDescription': 'Global Bids ofrece una experiencia única con subastas transmitidas en tiempo real. Contamos con tecnología avanzada que incluye transmisión en 4K, drones para visualización completa de activos y sistemas de puja en tiempo real con interfaz intuitiva.',
    'events.globalAccess': 'Acceso Global',
    'events.globalAccessDesc': 'Participe desde cualquier lugar del mundo en nuestros eventos',
    'events.security': 'Seguridad Garantizada',
    'events.securityDesc': 'Transacciones seguras con blockchain y protección al comprador',
    'events.calendar': 'Ver calendario completo',
    'events.demo': 'Ver demo en vivo',
    'events.participation': '¿Buscas participar en nuestros eventos o tienes activos para subastar?',
    'events.contactUs': 'Contáctanos ahora',
    
    // Contacto
    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Estamos aquí para ayudarte',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar mensaje',
    'contact.sending': 'Enviando...',
    'contact.successTitle': 'Mensaje enviado',
    'contact.successMsg': 'Gracias por contactarnos. Te responderemos a la brevedad.',
    'contact.errorTitle': 'Error al enviar mensaje',
    'contact.errorMsg': 'Por favor intenta nuevamente más tarde. Si el problema persiste, contáctanos directamente al +56994275157.',
    'contact.phone': 'Teléfono',
    'contact.emailLabel': 'Email',
    
    // Registro
    'registration.title': 'Inscríbete en nuestra plataforma',
    'registration.description': 'Regístrate para recibir notificaciones sobre subastas',
    'registration.button': 'Registrate en nuestra plataforma de remates',
    'registration.firstName': 'Nombre',
    'registration.lastName': 'Apellido',
    'registration.email': 'Email',
    'registration.phone': 'Teléfono',
    'registration.interested': 'Interesado en',
    'registration.excavators': 'Excavadoras',
    'registration.loaders': 'Cargadores',
    'registration.trucks': 'Camiones',
    'registration.generators': 'Generadores',
    'registration.cranes': 'Grúas',
    'registration.backhoes': 'Retroexcavadoras',
    'registration.register': 'Registrarme',
    'registration.terms': 'Al registrarte, aceptas nuestra Política de Privacidad y Términos de Servicio.',
    'registration.successTitle': 'Registro enviado',
    'registration.successMsg': 'Gracias por registrarte. Te contactaremos pronto.',
    'registration.errorTitle': 'Error',
    'registration.errorMsg': 'Hubo un problema al enviar tu registro. Por favor intenta nuevamente.',
    
    // Catálogo
    'catalog.title': 'Marketplace',
    'catalog.subtitle': 'Explora nuestra amplia selección de maquinaria industrial, chatarra, herramientas y repuestos disponibles para remate. Utiliza los filtros para encontrar exactamente lo que necesitas.',
    'catalog.filter': 'Filtrar por',
    'catalog.search': 'Buscar por palabra clave',
    'catalog.type': 'Tipo de Equipo',
    'catalog.brand': 'Marca',
    'catalog.year': 'Año',
    'catalog.price': 'Precio',
    'catalog.priceRange': 'Rango de Precio',
    'catalog.condition': 'Condición',
    'catalog.equipmentFamily': 'Familia de equipos',
    'catalog.applyFilters': 'Aplicar Filtros',
    'catalog.clearFilters': 'Limpiar Filtros',
    'catalog.sortBy': 'Ordenar por',
    'catalog.newest': 'Más recientes',
    'catalog.priceAsc': 'Precio: menor a mayor',
    'catalog.priceDesc': 'Precio: mayor a menor',
    'catalog.results': 'resultados',
    'catalog.noResults': 'No se encontraron resultados',
    'catalog.tryAgain': 'Intenta con otros criterios de búsqueda',
    'catalog.viewDetails': 'Ver Detalles',
    'catalog.hours': 'Horas',
    'catalog.kilometers': 'Kilómetros',
    'catalog.save': 'Guardar',
    'catalog.viewMore': 'Ver más',
    
    // Método 360
    'method.title': 'Método 360',
    'method.subtitle': '- Framework Operacional',
    'method.description': 'Nuestro proceso integral garantiza transparencia y eficiencia en cada etapa del ciclo de subasta',
    'method.step1.title': 'Activos a rematar',
    'method.step1.desc': 'Identificación y catalogación de activos para la subasta',
    'method.step2.title': 'Material gráfico en terreno',
    'method.step2.desc': 'Documentación fotográfica profesional de cada activo',
    'method.step3.title': 'Plataforma',
    'method.step3.desc': 'Publicación en nuestra plataforma digital especializada',
    'method.step4.title': 'Marketing',
    'method.step4.desc': '950k clientes globales reciben alertas personalizadas',
    'method.step5.title': 'Evento Remate Presencial y online',
    'method.step5.desc': 'Subastas híbridas con participación internacional',
    'method.step6.title': 'Comprador paga el lote adjudicado',
    'method.step6.desc': 'Proceso de pago seguro con múltiples opciones',
    'method.step7.title': 'Pago a consignatario',
    'method.step7.desc': 'Transferencia rápida y segura al vendedor',
    'method.step8.title': 'Certificado de pago para liberar carga',
    'method.step8.desc': 'Documentación oficial para el retiro del activo',
    'method.step9.title': 'Logística de retiro y despacho',
    'method.step9.desc': 'Coordinación de transporte y entrega',
    'method.step10.title': 'Entrega en destino',
    'method.step10.desc': 'Confirmación de recepción y satisfacción del cliente',
    
    // Detalle de maquinaria
    'detail.back': 'Volver al catálogo',
    'detail.price': 'Precio',
    'detail.brand': 'Marca',
    'detail.year': 'Año',
    'detail.type': 'Tipo',
    'detail.hours': 'Horas',
    'detail.kilometers': 'Kilómetros',
    'detail.condition': 'Condición',
    'detail.specs': 'Especificaciones',
    'detail.description': 'Descripción',
    'detail.contact': 'Contactar vendedor',
    'detail.loading': 'Cargando...',
    'detail.error': 'Error al cargar la información',
    
    // Featured
    'featured.title': 'Remates Destacados',
    'featured.description': 'Conoce algunos de nuestros remates más exitosos y las maquinarias que hemos vendido para nuestros clientes.',
    'featured.viewAll': 'Ver Todas las Maquinarias',
    'featured.sold': 'Vendido',
    'featured.available': 'Disponible',
    'featured.auctionPrice': 'Precio de remate',
    
    // Soporte
    'support.title': 'Soporte y Ayuda',
    'support.subtitle': 'Estamos comprometidos con brindarle el mejor servicio y respaldo en todas sus operaciones',
    'support.customerService': 'Servicio al Cliente',
    'support.customerServiceDesc': 'Soporte personalizado para todas sus consultas sobre nuestros servicios',
    'support.technicalAssistance': 'Asistencia Técnica',
    'support.technicalAssistanceDesc': 'Asesoramiento especializado para maquinaria y equipos industriales',
    'support.auctionHelp': 'Ayuda con Subasta',
    'support.auctionHelpDesc': 'Guía completa para participar eficientemente en nuestros eventos',
    'support.documentation': 'Documentación',
    'support.documentationDesc': 'Acceso a toda la documentación técnica y legal de los activos',
    'support.requestHelp': 'Solicitar ayuda',
    'support.contactUs': 'Contáctenos Directamente',
    'support.phone': 'Teléfono de Contacto',
    'support.workingHours': 'Lunes a Viernes 9:00 - 18:00',
    'support.email': 'Correo Electrónico',
    'support.responseTime': 'Respuesta en menos de 24 horas',
    'support.office': 'Oficina Central',
    'support.emergency': 'Soporte de emergencia disponible 24/7 para clientes premium',
    
    // Footer
    'footer.company': 'Compañía',
    'footer.services': 'Servicios',
    'footer.newsletter': 'Recibe alertas de subastas',
    'footer.subscribeBtn': 'Suscribirse',
    'footer.emailPlaceholder': 'Tu correo electrónico',
    'footer.acceptComm': 'Acepto recibir comunicaciones comerciales',
    'footer.copyright': '© Global Bids',
    'footer.developedBy': 'Desarrollado por',
    
    // Condiciones
    'condition.excellent': 'Excelente',
    'condition.good': 'Bueno',
    'condition.fair': 'Regular',
    'condition.repair': 'Necesita reparación',
    
    // Tipos de maquinaria
    'type.excavator': 'Excavadora',
    'type.truck': 'Camión',
    'type.loader': 'Cargador',
    'type.generator': 'Generador',
    'type.crane': 'Grúa',
    'type.backhoe': 'Retroexcavadora',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.catalog': 'Marketplace',
    'nav.auctions': 'Auctions',
    'nav.contact': 'Contact',
    
    // About section text (primera imagen)
    'about.leadingText': 'Global Bids is a leader in auctions and valuation of heavy machinery, scrap, tools and spare parts in Latin America, specializing in equipment and lots for various sectors and industries, both in Chile and the rest of the world.',
    'nav.login': 'Log In',
    'nav.register': 'Register',
    'nav.support': 'Support',
    'nav.homeDesc': 'Main page',
    'nav.aboutDesc': 'About us',
    'nav.catalogDesc': 'Available equipment',
    'nav.auctionsDesc': 'Events and auctions',
    'nav.servicesDesc': 'Exclusive events',
    'nav.supportDesc': 'Help and contact',
    'nav.contactDesc': 'Contact form',
    'nav.language': 'Language',
    'nav.logoTagline': 'Marketplace & Auctions',
    'nav.mainMenu': 'Main Menu',
    'nav.siteNavigation': 'Site navigation',
    
    // Hero Section
    'hero.title': 'Marketplace  and \nAsset  Auctions \nfor the entire world',
    'hero.subtitle': 'Buy or auction the best assets in the world, safely, intuitively and profitably',
    'hero.explore': 'Explore Catalog',
    'hero.exploreAuctions': 'Explore Auctions',
    'hero.contact': 'Contact Us',
    'hero.auctions': 'Upcoming Auctions',
    'hero.register': 'Register here',
    'hero.lots': 'lots',
    'hero.viewAll': 'View all auctions',
    'hero.day': 'In 1 day',
    'hero.week': 'In 1 week',
    'hero.twoWeeks': 'In 2 weeks',
    'hero.miningEquipment': 'Mining Equipment',
    'hero.forestryEquipment': 'Forestry Equipment',
    'hero.trucksTransport': 'Trucks and Transport',
    'hero.partsTools': 'Parts and Components',
    'hero.industrialEquipment': 'Industrial Equipment',
    'hero.specialLots': 'Special Lots',
    'hero.findByCategory': 'Find by category',
    
    // Auction Register Section
    'auctions.exclusiveEvents': 'EXCLUSIVE EVENTS',
    'auctions.title': 'Asset auctions with unique opportunities',
    'auctions.description': 'Register now to access our exclusive auctions of machinery, parts, tools and special lots. Be the first to receive notifications about new events.',
    'auctions.heavyMachinery': 'Heavy Machinery',
    'auctions.heavyMachineryDesc': 'Excavators, loaders, trucks and more assets for mining and construction.',
    'auctions.partsTools': 'Parts & Tools',
    'auctions.partsToolsDesc': 'Original components, specialized tools and accessories for assets.',
    'auctions.specialLots': 'Special Lots',
    'auctions.specialLotsDesc': 'Complete lots of assets, fleets and elements from complete projects.',
    'auctions.registerNow': 'Register Now',
    'auctions.moreInfo': 'More Information',
    'auctions.upcomingEvents': 'Upcoming Events',
    'auctions.exclusiveAccess': 'EXCLUSIVE ACCESS',
    'auctions.day': 'DAY',
    'auctions.week': 'WEEK',
    'auctions.month': 'MONTH',
    'auctions.miningAssets': 'Mining Assets Auction',
    'auctions.forestryAssets': 'Forestry Assets Auction',
    'auctions.industrialParts': 'Industrial Parts Auction',
    'auctions.openForRegistration': 'Open for registration',
    'auctions.comingSoon': 'Coming soon',
    'auctions.virtual': 'Virtual',
    'auctions.register': 'Register',
    'auctions.notify': 'Notify me',
    'auctions.preRegister': 'Pre-register',
    'auctions.liveAuctions': 'LIVE AUCTIONS',
    'auctions.upcomingAuctions': 'Upcoming Auctions',
    'auctions.exploreAuctions': 'Explore our exclusive events with heavy machinery and industrial equipment from the best brands',
    'auctions.auctionDetails': 'AUCTION DETAILS',
    'auctions.viewMore': 'View more events',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive solutions for the industry',
    'services.auctions.title': 'Auctions',
    'services.auctions.description': 'Access our auction platform for verified assets',
    'services.valuation.title': 'Valuations',
    'services.valuation.description': 'Precise asset valuations by industry experts',
    'services.logistics.title': 'Logistics',
    'services.logistics.description': 'Transport and delivery solutions worldwide',
    
    // About Us
    'about.title': 'Who We',
    'about.titleHighlight': 'Are',
    'about.subtitle': 'Leaders in industrial auctions in Latin America',
    'about.history': 'A History of Excellence',
    'about.description': 'Global Bids is a leader in auctions and valuation of heavy machinery, scrap, tools, and spare parts in Latin America, specialized in equipment and lots for various sectors and industries,',
    'about.descriptionHighlight': 'both in Chile and the rest of the world',
    'about.experience': 'Years of experience',
    'about.clients': 'Satisfied clients',
    'about.machines': 'Machines in catalog',
    'about.machinesSold': 'Machines sold',
    'about.countriesCovered': 'Countries covered',
    'about.ctaTitle': 'Opening the Latin American Market',
    'about.ctaDescription': 'Global Bids offers sales and auction solutions for equipment, parts, and other assets with proven expertise and backing, where we are present from the moment the assets are thoroughly analyzed, until they are transferred to the final customer, along with all their corresponding documentation and traceability.',
    'about.profitability': 'Profitability',
    'about.profitabilityDesc': 'We maximize the value of your assets through our extensive global network of buyers and valuation experts.',
    'about.speed': 'Speed',
    'about.speedDesc': 'Optimized, efficient processes that guarantee agile transactions and effective asset turnover.',
    'about.transparency': 'Transparency',
    'about.transparencyDesc': 'Complete and detailed information in each operation, with certified documentation and auditable processes.',
    
    // Events
    'events.title': 'Our Events',
    'events.subtitle': 'Participate in our exclusive auctions and sales of premium assets verified by experts',
    'events.featured': 'FEATURED',
    'events.lots': 'lots',
    'events.registered': 'registered',
    'events.capacity': 'Registration capacity',
    'events.details': 'View details',
    'events.register': 'Register',
    'events.liveTitle': 'Premium Events with Live Streaming',
    'events.liveDescription': 'Global Bids offers a unique experience with real-time streamed auctions. We have advanced technology including 4K streaming, drones for complete asset visualization, and real-time bidding systems with an intuitive interface.',
    'events.globalAccess': 'Global Access',
    'events.globalAccessDesc': 'Participate from anywhere in the world in our events',
    'events.security': 'Guaranteed Security',
    'events.securityDesc': 'Secure transactions with blockchain and buyer protection',
    'events.calendar': 'View complete calendar',
    'events.demo': 'View live demo',
    'events.participation': 'Looking to participate in our events or have assets to auction?',
    'events.contactUs': 'Contact us now',
    
    // Featured
    'featured.title': 'Featured Auctions',
    'featured.description': 'Discover some of our most successful auctions and the machinery we have sold for our clients.',
    'featured.viewAll': 'View All Machinery',
    'featured.sold': 'Sold',
    'featured.available': 'Available',
    'featured.auctionPrice': 'Auction price',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We\'re here to help you',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send message',
    'contact.sending': 'Sending...',
    'contact.successTitle': 'Message sent',
    'contact.successMsg': 'Thank you for contacting us. We will respond shortly.',
    'contact.errorTitle': 'Error sending message',
    'contact.errorMsg': 'Please try again later. If the problem persists, contact us directly at +56994275157.',
    'contact.phone': 'Phone',
    'contact.emailLabel': 'Email',
    
    // Registration
    'registration.title': 'Register on our platform',
    'registration.description': 'Sign up to receive auction notifications',
    'registration.button': 'Register on our auction platform',
    'registration.firstName': 'First Name',
    'registration.lastName': 'Last Name',
    'registration.email': 'Email',
    'registration.phone': 'Phone',
    'registration.interested': 'Interested in',
    'registration.excavators': 'Excavators',
    'registration.loaders': 'Loaders',
    'registration.trucks': 'Trucks',
    'registration.generators': 'Generators',
    'registration.cranes': 'Cranes',
    'registration.backhoes': 'Backhoes',
    'registration.register': 'Register',
    'registration.terms': 'By registering, you accept our Privacy Policy and Terms of Service.',
    'registration.successTitle': 'Registration sent',
    'registration.successMsg': 'Thank you for registering. We will contact you soon.',
    'registration.errorTitle': 'Error',
    'registration.errorMsg': 'There was a problem submitting your registration. Please try again.',
    
    // Catalog
    'catalog.title': 'Marketplace',
    'catalog.subtitle': 'Explore our wide selection of industrial machinery, scrap, tools, and spare parts available for sale. Use the filters to find exactly what you need.',
    'catalog.filter': 'Filter by',
    'catalog.search': 'Search by keyword',
    'catalog.type': 'Equipment Type',
    'catalog.brand': 'Brand',
    'catalog.year': 'Year',
    'catalog.price': 'Price',
    'catalog.priceRange': 'Price Range',
    'catalog.condition': 'Condition',
    'catalog.equipmentFamily': 'Equipment Family',
    'catalog.applyFilters': 'Apply Filters',
    'catalog.clearFilters': 'Clear Filters',
    'catalog.sortBy': 'Sort by',
    'catalog.newest': 'Newest',
    'catalog.priceAsc': 'Price: low to high',
    'catalog.priceDesc': 'Price: high to low',
    'catalog.results': 'results',
    'catalog.noResults': 'No results found',
    'catalog.tryAgain': 'Try with other search criteria',
    'catalog.viewDetails': 'View Details',
    'catalog.hours': 'Hours',
    'catalog.kilometers': 'Kilometers',
    'catalog.save': 'Save',
    'catalog.viewMore': 'View more',
    
    // Method 360
    'method.title': 'Method 360',
    'method.subtitle': '- Operational Framework',
    'method.description': 'Our comprehensive process guarantees transparency and efficiency at every stage of the auction cycle',
    'method.step1.title': 'Assets for auction',
    'method.step1.desc': 'Identification and cataloging of assets for auction',
    'method.step2.title': 'On-site graphic material',
    'method.step2.desc': 'Professional photographic documentation of each asset',
    'method.step3.title': 'Platform',
    'method.step3.desc': 'Publication on our specialized digital platform',
    'method.step4.title': 'Marketing',
    'method.step4.desc': '950k global clients receive personalized alerts',
    'method.step5.title': 'In-person and online auction event',
    'method.step5.desc': 'Hybrid auctions with international participation',
    'method.step6.title': 'Buyer pays for awarded lot',
    'method.step6.desc': 'Secure payment process with multiple options',
    'method.step7.title': 'Payment to consignor',
    'method.step7.desc': 'Fast and secure transfer to seller',
    'method.step8.title': 'Payment certificate to release cargo',
    'method.step8.desc': 'Official documentation for asset withdrawal',
    'method.step9.title': 'Logistics for pickup and dispatch',
    'method.step9.desc': 'Coordination of transport and delivery',
    'method.step10.title': 'Delivery at destination',
    'method.step10.desc': 'Confirmation of receipt and customer satisfaction',
    
    // Machinery details
    'detail.back': 'Back to catalog',
    'detail.price': 'Price',
    'detail.brand': 'Brand',
    'detail.year': 'Year',
    'detail.type': 'Type',
    'detail.hours': 'Hours',
    'detail.kilometers': 'Kilometers',
    'detail.condition': 'Condition',
    'detail.specs': 'Specifications',
    'detail.description': 'Description',
    'detail.contact': 'Contact seller',
    'detail.loading': 'Loading...',
    'detail.error': 'Error loading information',
    
    // Soporte
    'support.title': 'Support and Help',
    'support.subtitle': 'We are committed to providing you with the best service and support in all your operations',
    'support.customerService': 'Customer Service',
    'support.customerServiceDesc': 'Personalized support for all your inquiries about our services',
    'support.technicalAssistance': 'Technical Assistance',
    'support.technicalAssistanceDesc': 'Specialized advice for machinery and industrial equipment',
    'support.auctionHelp': 'Auction Help',
    'support.auctionHelpDesc': 'Complete guide to efficiently participate in our events',
    'support.documentation': 'Documentation',
    'support.documentationDesc': 'Access to all technical and legal documentation of the assets',
    'support.requestHelp': 'Request help',
    'support.contactUs': 'Contact Us Directly',
    'support.phone': 'Contact Phone',
    'support.workingHours': 'Monday to Friday 9:00 - 18:00',
    'support.email': 'Email',
    'support.responseTime': 'Response in less than 24 hours',
    'support.office': 'Main Office',
    'support.emergency': 'Emergency support available 24/7 for premium clients',
    
    // Footer
    'footer.company': 'Company',
    'footer.services': 'Services',
    'footer.newsletter': 'Receive auction alerts',
    'footer.subscribeBtn': 'Subscribe',
    'footer.emailPlaceholder': 'Your email',
    'footer.acceptComm': 'I agree to receive commercial communications',
    'footer.copyright': '© Global Bids',
    'footer.developedBy': 'Developed by',
    
    // Conditions
    'condition.excellent': 'Excellent',
    'condition.good': 'Good',
    'condition.fair': 'Fair',
    'condition.repair': 'Needs repair',
    
    // Machinery types
    'type.excavator': 'Excavator',
    'type.truck': 'Truck',
    'type.loader': 'Loader',
    'type.generator': 'Generator',
    'type.crane': 'Crane',
    'type.backhoe': 'Backhoe',
  }
};

// Proveedor del contexto
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Estado para el idioma actual
  const [language, setLanguage] = useState<Language>('es');

  // Recuperar el idioma guardado al cargar
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Guardar el idioma cuando cambia
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Función para traducir
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Valor del contexto
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook para usar el contexto
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}