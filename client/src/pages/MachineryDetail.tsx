import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useRoute, Link, useLocation } from 'wouter';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Machinery } from '@shared/schema';
import { useEffect, useState, useCallback } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useLanguage } from '@/contexts/LanguageContext';

// Function to get type label in correct language
function getTypeLabel(type: string, language: string): string {
  const typeLabels: Record<string, { es: string; en: string }> = {
    'vehiculo-golf': { es: 'Vehículo de Golf', en: 'Golf Cart' },
    'repuesto': { es: 'Repuesto', en: 'Spare Part' },
    'implemento': { es: 'Implemento', en: 'Attachment' },
    'camioneta': { es: 'Camioneta', en: 'Pickup Truck' },
    'tractor': { es: 'Tractor', en: 'Tractor' },
    'excavadora': { es: 'Excavadora', en: 'Excavator' },
    'bulldozer': { es: 'Bulldozer', en: 'Bulldozer' },
    'motoniveladora': { es: 'Motoniveladora', en: 'Motor Grader' },
    'cargador': { es: 'Cargador', en: 'Wheel Loader' },
    'camion': { es: 'Camión', en: 'Truck' },
    'camion-tolva': { es: 'Camión Tolva', en: 'Dump Truck' },
    'tolva': { es: 'Tolva', en: 'Dump Trailer' },
    'grua': { es: 'Grúa', en: 'Crane' },
    'autobus': { es: 'Autobús', en: 'Bus' },
    'remolque': { es: 'Remolque', en: 'Trailer' },
    'perforadora': { es: 'Perforadora', en: 'Drill' },
    'manipulador-telescopico': { es: 'Manipulador Telescópico', en: 'Telehandler' },
    'compresor': { es: 'Compresor', en: 'Compressor' },
    'mezcladora': { es: 'Mezcladora', en: 'Concrete Mixer' },
    'rodillo': { es: 'Rodillo', en: 'Roller' },
    // Fallback to original types
    'excavator': { es: 'Excavadora', en: 'Excavator' },
    'truck': { es: 'Camión', en: 'Truck' },
    'loader': { es: 'Cargador', en: 'Loader' },
    'machinery': { es: 'Maquinaria', en: 'Machinery' }
  };
  
  return typeLabels[type]?.[language] || type.charAt(0).toUpperCase() + type.slice(1);
}

// Function to extract real data from descriptions
function extractSpecsFromDescription(description: string, name: string) {
  const specs = {
    realYear: null as number | null,
    kilometers: null as number | null,
    hours: null as number | null,
    realBrand: '',
    model: '',
    correctType: '' as string
  };

  // Extract year from NAME first (more reliable) - look for 4-digit year at the beginning
  const nameYearMatch = name.match(/^(\d{4})\s+/);
  if (nameYearMatch) {
    const year = parseInt(nameYearMatch[1]);
    if (year >= 1990 && year <= 2030) {
      specs.realYear = year;
    }
  }

  // If no year in name, try description
  if (!specs.realYear) {
    const descYearMatch = description.match(/(\d{4})/g);
    if (descYearMatch) {
      const years = descYearMatch.map(y => parseInt(y)).filter(y => y >= 1990 && y <= 2030);
      if (years.length > 0) {
        specs.realYear = Math.max(...years);
      }
    }
  }

  // Extract kilometers - look for patterns like "86.026 Km", "87,220 Km", "1000 km", "93,770 Miles", etc.
  const kmMatch = description.match(/(\d+(?:[.,]\d+)*)\s*(?:km|Km|KM|kilometers?)/i);
  const milesMatch = description.match(/(\d+(?:[.,]\d+)*)\s*(?:miles?|Miles?|MILES?)/i);
  
  if (kmMatch) {
    const km = parseInt(kmMatch[1].replace(/[.,]/g, ''));
    if (km > 0) {
      specs.kilometers = km;
    }
  } else if (milesMatch) {
    // Convert miles to kilometers (1 mile = 1.60934 km)
    const miles = parseInt(milesMatch[1].replace(/[.,]/g, ''));
    if (miles > 0) {
      specs.kilometers = Math.round(miles * 1.60934);
    }
  }

  // Extract hours - look for patterns like "100 hrs", "1500 hours", etc.
  const hoursMatch = description.match(/(\d+(?:,\d+)*)\s*(?:hrs?|hours?)/i);
  if (hoursMatch) {
    const hrs = parseInt(hoursMatch[1].replace(/,/g, ''));
    if (hrs > 0) {
      specs.hours = hrs;
    }
  }

  // Extract brand from name - if starts with year, take the word after year
  if (nameYearMatch) {
    const afterYear = name.replace(nameYearMatch[0], '').trim();
    const brandMatch = afterYear.split(' ')[0];
    specs.realBrand = brandMatch || '';
  } else {
    // Otherwise take first word
    specs.realBrand = name.split(' ')[0] || '';
  }

  // Extract model (everything after brand and year)
  let model = name;
  if (specs.realYear) {
    model = model.replace(specs.realYear.toString(), '').trim();
  }
  if (specs.realBrand) {
    model = model.replace(specs.realBrand, '').trim();
  }
  specs.model = model;

  // Advanced classification based on title, description and visual analysis
  const nameAndDesc = (name + ' ' + description).toLowerCase();
  
  // Precise classification system
  if (nameAndDesc.includes('golf cart') || nameAndDesc.includes('carrito de golf')) {
    specs.correctType = 'vehiculo-golf';
  } else if (nameAndDesc.includes('ripper tooth') || nameAndDesc.includes('diente') || nameAndDesc.includes('teeth')) {
    specs.correctType = 'repuesto';
  } else if (nameAndDesc.includes('rake attachment') || nameAndDesc.includes('implemento') || nameAndDesc.includes('attachment')) {
    specs.correctType = 'implemento';
  } else if (nameAndDesc.includes('ford explorer') || nameAndDesc.includes('jeep cherokee') || nameAndDesc.includes('peugeot') || nameAndDesc.includes('landtrek')) {
    specs.correctType = 'camioneta';
  } else if (nameAndDesc.includes('john deere') && (nameAndDesc.includes('tractor') || nameAndDesc.includes('6105e'))) {
    specs.correctType = 'tractor';
  } else if (nameAndDesc.includes('excavator') || nameAndDesc.includes('excavadora')) {
    specs.correctType = 'excavadora';
  } else if (nameAndDesc.includes('dozer') || nameAndDesc.includes('bulldozer')) {
    specs.correctType = 'bulldozer';
  } else if (nameAndDesc.includes('motor grader') || nameAndDesc.includes('motoniveladora')) {
    specs.correctType = 'motoniveladora';
  } else if (nameAndDesc.includes('wheel loader') || nameAndDesc.includes('cargador')) {
    specs.correctType = 'cargador';
  } else if (nameAndDesc.includes('water truck') || nameAndDesc.includes('camion agua')) {
    specs.correctType = 'camion';
  } else if (nameAndDesc.includes('dump truck') || nameAndDesc.includes('volquete') || nameAndDesc.includes('tri-axle')) {
    specs.correctType = 'volquete';
  } else if (nameAndDesc.includes('sleeper tractor') || nameAndDesc.includes('tractor sleeper')) {
    specs.correctType = 'tractor';
  } else if (nameAndDesc.includes('mobile crane') || nameAndDesc.includes('grua movil')) {
    specs.correctType = 'grua';
  } else if (nameAndDesc.includes('bus') || nameAndDesc.includes('autobus')) {
    specs.correctType = 'autobus';
  } else if (nameAndDesc.includes('fuel truck') || nameAndDesc.includes('camion combustible')) {
    specs.correctType = 'camion';
  } else if (nameAndDesc.includes('trailer') || nameAndDesc.includes('remolque')) {
    specs.correctType = 'remolque';
  } else if (nameAndDesc.includes('vertical drill') || nameAndDesc.includes('perforadora')) {
    specs.correctType = 'perforadora';
  } else if (nameAndDesc.includes('telehandler') || nameAndDesc.includes('manipulador')) {
    specs.correctType = 'manipulador-telescopico';
  } else if (nameAndDesc.includes('compressor') || nameAndDesc.includes('compresor')) {
    specs.correctType = 'compresor';
  } else if (nameAndDesc.includes('concrete mixer') || nameAndDesc.includes('mezcladora')) {
    specs.correctType = 'mezcladora';
  } else if (nameAndDesc.includes('roller') || nameAndDesc.includes('rodillo')) {
    specs.correctType = 'rodillo';
  }

  return specs;
}

export default function MachineryDetail() {
  // Extract the ID from the URL
  const [, params] = useRoute('/machinery/:id');
  const [, setLocation] = useLocation();
  const machineryId = params?.id ? parseInt(params.id) : null;
  const [activeTab, setActiveTab] = useState('specs');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language, t } = useLanguage();
  
  // Scroll to top on page load - smooth scroll to prevent jarring movement
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [machineryId]);

  // Fetch the machinery data
  const { data: machinery, isLoading, isError } = useQuery<Machinery>({
    queryKey: [`/api/machinery/${machineryId}`],
    enabled: !!machineryId
  });

  // Navigation functions
  const goToNextImage = useCallback(() => {
    if (machinery?.gallery && machinery.gallery.length > 1) {
      const nextIndex = currentImageIndex < machinery.gallery.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(machinery.gallery[nextIndex]);
    }
  }, [currentImageIndex, machinery?.gallery]);

  const goToPrevImage = useCallback(() => {
    if (machinery?.gallery && machinery.gallery.length > 1) {
      const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : machinery.gallery.length - 1;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(machinery.gallery[prevIndex]);
    }
  }, [currentImageIndex, machinery?.gallery]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevImage();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToPrevImage, goToNextImage]);

  // Update selected image when machinery changes
  useEffect(() => {
    if (machinery?.gallery && machinery.gallery.length > 0) {
      setSelectedImage(machinery.gallery[0]);
      setCurrentImageIndex(0);
    }
  }, [machinery]);
  
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  if (isError || !machinery) {
    return <ErrorState />;
  }

  // Extract real specs from description
  const realSpecs = extractSpecsFromDescription(machinery.description, machinery.name);
  
  // Use extracted data or fallback to original data
  const displayYear = realSpecs.realYear || machinery.year;
  const displayBrand = realSpecs.realBrand || machinery.brand;
  const displayKilometers = realSpecs.kilometers || machinery.kilometers;
  const displayHours = realSpecs.hours || machinery.hours;
  const displayType = realSpecs.correctType || machinery.type;
  
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto p-2">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-xs mb-1">
          <Link href="/" className="text-gray-500 hover:text-primary">{t('nav.home')}</Link>
          <span className="mx-1 text-gray-400">/</span>
          <Link href="/#marketplace" className="text-gray-500 hover:text-primary">{t('nav.catalog')}</Link>
          <span className="mx-1 text-gray-400">/</span>
          <span className="text-gray-700 truncate">{machinery.name}</span>
        </div>
        
        {/* Back to catalog button */}
        <div className="flex mb-4 mt-2">
          <button 
            onClick={() => {
              setLocation('/');
              setTimeout(() => {
                window.location.hash = '#marketplace';
              }, 100);
            }}
            className="text-gray-600 hover:text-primary flex items-center text-sm font-medium"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            {language === 'es' ? 'Volver al catálogo' : 'Back to catalog'}
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-2">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Left Column - Gallery and Basic Info */}
            <div className="lg:col-span-2">
              <div className="p-3">
                {/* Equipment Type & Status */}
                <div className="flex flex-wrap justify-between items-center mb-1">
                  <span className="text-xs text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                    {getTypeLabel(displayType, language)}
                  </span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                    <i className="fas fa-check-circle mr-0.5"></i>
                    {language === 'es' ? 'Disponible' : 'Available'}
                  </span>
                </div>
                
                {/* Title and Main Details */}
                <h1 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{machinery.name}</h1>
                
                <div className="flex flex-wrap gap-3 mb-2 border-b border-gray-200 pb-2">
                  <div className="flex items-center">
                    <i className="fas fa-industry mr-1 text-gray-500 text-sm"></i>
                    <span className="text-gray-900 text-sm">{displayBrand || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-road mr-1 text-gray-500 text-sm"></i>
                    <span className="text-gray-900 text-sm">
                      {displayKilometers ? `${displayKilometers.toLocaleString()} km` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock mr-1 text-gray-500 text-sm"></i>
                    <span className="text-gray-900 text-sm">
                      {displayHours ? `${displayHours} hrs` : 'N/A'}
                    </span>
                  </div>
                </div>
                
                {/* Main Image Gallery */}
                <div className="relative w-full h-[450px] border border-gray-200 rounded-lg overflow-hidden mb-1">
                  <img 
                    src={(selectedImage || machinery.image).replace('https://auctiontechupload.s3.amazonaws.com/216/auction/2187/', '/api/images/')}
                    alt={machinery.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      console.log('Error loading image:', selectedImage || machinery.image);
                      e.currentTarget.src = `https://placehold.co/600x450/1a1a1a/ffffff?text=${encodeURIComponent(machinery.name.substring(0, 30))}`;
                    }}
                  />
                  
                  {/* Image Counter */}
                  {machinery.gallery && machinery.gallery.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {currentImageIndex + 1}/{machinery.gallery.length}
                    </div>
                  )}
                  
                  {/* Navigation arrows on image */}
                  {machinery.gallery && machinery.gallery.length > 1 && (
                    <>
                      <button 
                        onClick={goToPrevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full p-2 shadow-lg transition-all"
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      <button 
                        onClick={goToNextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full p-2 shadow-lg transition-all"
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Image Thumbnails - Full width scrollable */}
              <div className="px-3 w-full">
                {machinery.gallery && machinery.gallery.length > 1 && (
                  <div className="w-full">
                    <div className="text-center text-sm text-gray-600 mb-2">
                      {language === 'es' ? 'Navegue con las flechas del teclado o haga clic en las miniaturas' : 'Navigate with arrow keys or click thumbnails'}
                    </div>
                    
                    {/* Thumbnails */}
                    <div className="flex gap-2 overflow-x-auto pb-3 w-full">
                      {machinery.gallery.map((img, index) => (
                        <div 
                          key={index} 
                          className={`${currentImageIndex === index ? 'border-2 border-primary ring-2 ring-primary/20' : 'border border-gray-200'} rounded overflow-hidden flex-shrink-0 cursor-pointer transition-all hover:border-primary/50`}
                          onClick={() => {
                            setCurrentImageIndex(index);
                            setSelectedImage(img);
                          }}
                        >
                          <img
                            src={img.replace('https://auctiontechupload.s3.amazonaws.com/216/auction/2187/', '/api/images/')}
                            alt={`${machinery.name} - Imagen ${index + 1}`}
                            className="w-20 h-16 object-cover"
                            onError={(e) => {
                              console.log('Error loading thumbnail:', img);
                              e.currentTarget.src = `https://placehold.co/80x64/1a1a1a/ffffff?text=${index + 1}`;
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Pricing and Details */}
            <div className="bg-gray-50 p-3">
              {/* Auction Information */}
              <div className="bg-white p-3 rounded-lg shadow-sm mb-3">
                <h2 className="text-base font-bold text-gray-900 mb-2">{language === 'en' ? 'Auction Information' : 'Información de Subasta'}</h2>
                
                <div className="space-y-2">
                  <div>
                    <h3 className="text-xs font-medium text-gray-700 mb-0.5">{language === 'en' ? 'Auction date' : 'Fecha de subasta'}</h3>
                    <p className="text-sm text-gray-800 font-medium">
                      <i className="fas fa-calendar mr-1 text-gray-400"></i>
                      {language === 'en' ? 'July 15, 2025' : '15 de julio, 2025'}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-medium text-gray-700 mb-0.5">{language === 'en' ? 'Auction house' : 'Casa de subastas'}</h3>
                    <p className="text-sm text-gray-800">North Country Auctions</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-medium text-gray-700 mb-0.5">{language === 'en' ? 'Location' : 'Ubicación'}</h3>
                    <p className="text-sm text-gray-800">Chile</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="grid gap-2 mb-3">
                <Button className="bg-primary hover:bg-primary/90 w-full py-2 h-auto text-sm">
                  <i className="fas fa-gavel mr-1"></i>
                  {language === 'en' ? 'Register for auction' : 'Registrarse para subasta'}
                </Button>
                <Button variant="outline" className="border-gray-300 w-full py-2 h-auto text-sm">
                  <i className="fas fa-phone-alt mr-1"></i>
                  {language === 'en' ? 'Contact consultant' : 'Contactar consultor'}
                </Button>
                <Button asChild variant="ghost" className="text-gray-500 text-sm py-1">
                  <Link href="/marketplace">
                    <i className="fas fa-arrow-left mr-1"></i>
                    {t('detail.back')}
                  </Link>
                </Button>
              </div>
              
              {/* Tabs for Specs and Description */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="flex border-b">
                  <button 
                    className={`flex-1 py-2 px-2 text-sm font-medium ${activeTab === 'specs' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('specs')}
                  >
                    {t('detail.specs')}
                  </button>
                  <button 
                    className={`flex-1 py-2 px-2 text-sm font-medium ${activeTab === 'description' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('description')}
                  >
                    {t('detail.description')}
                  </button>
                </div>
                
                {activeTab === 'specs' && (
                  <div className="p-2">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-1 text-gray-600">{t('detail.brand')}:</td>
                          <td className="py-1 text-gray-900 font-medium">{displayBrand || 'N/A'}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1 text-gray-600">{language === 'en' ? 'Model' : 'Modelo'}:</td>
                          <td className="py-1 text-gray-900 font-medium">{realSpecs.model || machinery.name}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1 text-gray-600">{t('detail.year')}:</td>
                          <td className="py-1 text-gray-900 font-medium">{displayYear || 'N/A'}</td>
                        </tr>
                        {displayKilometers && (
                          <tr className="border-b">
                            <td className="py-1 text-gray-600">{language === 'en' ? 'Kilometers' : 'Kilómetros'}:</td>
                            <td className="py-1 text-gray-900 font-medium">{displayKilometers.toLocaleString()} km</td>
                          </tr>
                        )}
                        {displayHours && (
                          <tr className="border-b">
                            <td className="py-1 text-gray-600">{t('detail.hours')}:</td>
                            <td className="py-1 text-gray-900 font-medium">{displayHours} hrs</td>
                          </tr>
                        )}
                        <tr className="border-b">
                          <td className="py-1 text-gray-600">{t('detail.condition')}:</td>
                          <td className="py-1 text-gray-900 font-medium">
                            {machinery.condition === 'excellent' 
                              ? (language === 'en' ? 'Excellent' : 'Excelente')
                              : machinery.condition === 'good'
                              ? (language === 'en' ? 'Good' : 'Bueno')
                              : machinery.condition === 'fair'
                              ? (language === 'en' ? 'Fair' : 'Regular')
                              : machinery.condition}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-600">{language === 'en' ? 'Type' : 'Tipo'}:</td>
                          <td className="py-1 text-gray-900 font-medium">{machinery.type}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                
                {activeTab === 'description' && (
                  <div className="p-2">
                    <div className="space-y-3">
                      {/* Location */}
                      {machinery.description.includes('Located in') && (
                        <div className="flex items-start gap-2">
                          <i className="fas fa-map-marker-alt text-primary mt-1"></i>
                          <div>
                            <p className="font-medium text-gray-900">Ubicación</p>
                            <p className="text-sm text-gray-600">
                              {machinery.description.split('Located in ')[1].split('.')[0]}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Equipment Details */}
                      <div className="flex items-start gap-2">
                        <i className="fas fa-cogs text-primary mt-1"></i>
                        <div>
                          <p className="font-medium text-gray-900">Detalles del Equipo</p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {machinery.description.split(' - ')[1]?.split('. Located')[0] || 
                             machinery.description.split(' - ')[1] || 
                             machinery.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Auction Info */}
                      <div className="flex items-start gap-2">
                        <i className="fas fa-gavel text-primary mt-1"></i>
                        <div>
                          <p className="font-medium text-gray-900">Información de Subasta</p>
                          <p className="text-sm text-gray-600">
                            Artículo auténtico de subasta de International Global Bids And Prelco Auctions
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Fecha de subasta: 15 de julio, 2025
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="h-96 w-full" />
          </div>
          <div>
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Error state component
function ErrorState() {
  const { language, t } = useLanguage();
  
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        {language === 'en' ? 'Equipment not found' : 'Equipo no encontrado'}
      </h1>
      <p className="text-gray-600 mb-4">
        {language === 'en' 
          ? 'The equipment you are looking for does not exist or has been removed.'
          : 'El equipo que buscas no existe o ha sido eliminado.'}
      </p>
      <Link href="/marketplace">
        <Button>{language === 'en' ? 'Back to catalog' : 'Volver al catálogo'}</Button>
      </Link>
    </div>
  );
}