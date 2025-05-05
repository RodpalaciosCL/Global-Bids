import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRegistration } from '@/contexts/RegistrationContext';

export function AuctionsIframe() {
  const { t } = useLanguage();
  const { openForm } = useRegistration();
  const [visibleItems, setVisibleItems] = useState(3);
  interface AuctionItem {
    id: number;
    title: string;
    date: string;
    location: string;
    imageUrl?: string;
  }
  
  const [auctionData, setAuctionData] = useState<AuctionItem[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Datos de respaldo por si no carga el iframe
  const fallbackItems: AuctionItem[] = [
    {
      id: 1,
      title: "Dighton Spring Auction - Day 1",
      date: "05-09-2025",
      location: "Dighton, Massachusetts, United States, 02715",
      imageUrl: undefined
    },
    {
      id: 2,
      title: "Dighton Spring Auction - Day 2",
      date: "05-10-2025",
      location: "Dighton, Massachusetts, United States, 02715",
      imageUrl: undefined
    },
    {
      id: 3,
      title: "Eastern Panhandle WV Contractors Auction",
      date: "05-17-2025",
      location: "Martinsburg, West Virginia, United States, 24405",
      imageUrl: undefined
    },
    {
      id: 4,
      title: "Heavy Equipment Online Auction",
      date: "05-20-2025",
      location: "Online Only",
      imageUrl: undefined
    },
    {
      id: 5,
      title: "Mining Equipment Auction",
      date: "05-24-2025",
      location: "Denver, Colorado, United States, 80014",
      imageUrl: undefined
    },
    {
      id: 6,
      title: "Construction Equipment Liquidation",
      date: "05-30-2025",
      location: "Houston, Texas, United States, 77001",
      imageUrl: undefined
    }
  ];
  
  // Intentar extraer datos del iframe cuando carga
  useEffect(() => {
    const iframe = iframeRef.current;
    
    if (iframe) {
      iframe.onload = function() {
        try {
          if (iframe.contentDocument) {
            // Intentar varias estrategias para encontrar las tarjetas de subasta
            const doc = iframe.contentDocument;
            console.log("Iframe document loaded");
            
            // Búsqueda general (cualquier elemento que pueda contener una subasta)
            const auctionElements = doc.querySelectorAll('.MuiPaper-root') || 
                                   doc.querySelectorAll('.MuiCard-root') || 
                                   doc.querySelectorAll('.auction-item') ||
                                   doc.querySelectorAll('.card') ||
                                   doc.querySelectorAll('div[role="listitem"]') ||
                                   doc.querySelectorAll('article') ||
                                   doc.querySelectorAll('li');
                                   
            console.log("Found potential auction elements:", auctionElements?.length);
            
            if (auctionElements && auctionElements.length > 0) {
              const extractedData = Array.from(auctionElements)
                .slice(0, 10) // Tomar más elementos de los que necesitamos para filtrar después
                .map((element, index) => {
                  // Buscar texto que parezca un título dentro de este elemento
                  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6, .title, [class*="title"], [class*="name"]');
                  const dateElements = element.querySelectorAll('.date, [class*="date"], time, [datetime]');
                  const locationElements = element.querySelectorAll('.location, [class*="location"], address');
                  const images = element.querySelectorAll('img');
                  
                  let title = '';
                  if (headings && headings.length > 0) {
                    title = headings[0].textContent?.trim() || '';
                  } else {
                    // Buscar texto que parezca un título (primera línea de texto prominente)
                    const allText = element.textContent || '';
                    title = allText.split('\n').map(t => t.trim()).filter(t => t.length > 10)[0] || '';
                  }
                  
                  let date = '';
                  if (dateElements && dateElements.length > 0) {
                    date = dateElements[0].textContent?.trim() || '';
                  }
                  
                  let location = '';
                  if (locationElements && locationElements.length > 0) {
                    location = locationElements[0].textContent?.trim() || '';
                  }
                  
                  let imageUrl = '';
                  if (images && images.length > 0) {
                    imageUrl = images[0].src || '';
                  }
                  
                  return {
                    id: index + 1,
                    title: title || fallbackItems[index % fallbackItems.length].title,
                    date: date || fallbackItems[index % fallbackItems.length].date,
                    location: location || fallbackItems[index % fallbackItems.length].location,
                    imageUrl
                  };
                })
                .filter(item => item.title && item.title.length > 5) // Filtrar elementos sin título
                .slice(0, 6); // Tomar sólo los primeros 6
              
              setAuctionData(extractedData);
              console.log('Datos extraídos del iframe:', extractedData);
            } else {
              console.log('No se encontraron tarjetas de subasta en el iframe');
              setAuctionData(fallbackItems);
            }
          }
        } catch (e) {
          console.log('Error al acceder al contenido del iframe:', e);
          setAuctionData(fallbackItems);
        }
      };
    }
  }, []);
  
  // Usar datos de respaldo si no hay datos del iframe
  const auctionItems = auctionData.length > 0 ? auctionData : fallbackItems;
  
  // Función para mostrar más elementos
  const showMoreItems = () => {
    setVisibleItems(prev => Math.min(prev + 3, auctionItems.length));
  };
  
  // Función para ver los detalles de una subasta
  const viewAuctionDetails = (id: number) => {
    console.log(`Viewing details for auction ${id}`);
    // Podríamos abrir un modal o navegar a una página de detalles
    window.open(`https://northcountry.auctiontechs.com/auctions`, '_blank');
  };
  
  return (
    <section className="py-12 bg-gray-900" id="subastas">
      {/* iframe oculto para cargar datos */}
      <iframe 
        ref={iframeRef}
        src="https://northcountry.auctiontechs.com/auctions"
        style={{ display: 'none' }}
        title="Hidden source frame"
      />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Próximos Eventos de Subastas
          </motion.h2>

          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Explore nuestros eventos exclusivos con maquinaria pesada y equipamiento industrial de las mejores marcas
          </motion.p>
        </div>
        
        <motion.div 
          className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden max-w-5xl mx-auto"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-slate-100/5 backdrop-blur-sm p-4 flex items-center gap-3">
            <h3 className="text-xl font-medium text-white">
              Próximos Eventos
            </h3>
          </div>
          
          <div className="overflow-hidden bg-blue-950">
            <div className="p-6">
              {/* Contenido personalizado que simula la página de subastas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {auctionItems.slice(0, visibleItems).map((auction) => (
                  <div key={auction.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="h-36 overflow-hidden bg-gray-100 flex items-center justify-center relative">
                      {/* Si tenemos una URL de imagen, la mostramos */}
                      {auction.imageUrl && (
                        <img 
                          src={auction.imageUrl} 
                          alt={auction.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Si falla la carga, ocultamos la imagen
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-2">{auction.title}</h4>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1 mb-1">
                          <i className="fas fa-calendar-alt text-primary"></i>
                          <span>{auction.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <i className="fas fa-map-marker-alt text-primary"></i>
                          <span>{auction.location}</span>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-1 gap-2">
                        <button 
                          onClick={() => viewAuctionDetails(auction.id)}
                          className="bg-blue-900 hover:bg-blue-800 text-white text-center py-2 rounded text-sm font-medium"
                        >
                          DETALLES DEL EVENTO
                        </button>
                        <button 
                          onClick={openForm}
                          className="bg-gray-900 hover:bg-gray-800 text-white text-center py-2 rounded text-sm font-medium"
                        >
                          REGISTRARSE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Botón "Ver todas las subastas" */}
              <div className="mt-6 text-center">
                <button 
                  onClick={() => window.open('https://northcountry.auctiontechs.com/auctions', '_blank')}
                  className="inline-flex items-center gap-2 text-white py-2 px-4 transition-colors text-sm"
                >
                  <i className="fas fa-external-link-alt"></i>
                  Ver todas las subastas
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}