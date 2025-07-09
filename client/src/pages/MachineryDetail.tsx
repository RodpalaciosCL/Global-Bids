import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useRoute, Link } from 'wouter';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Machinery } from '@shared/schema';
import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { ImageGallery } from '@/components/machinery/ImageGallery';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MachineryDetail() {
  // Extract the ID from the URL
  const [, params] = useRoute('/machinery/:id');
  const machineryId = params?.id ? parseInt(params.id) : null;
  const [activeTab, setActiveTab] = useState('specs');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
  
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  if (isError || !machinery) {
    return <ErrorState />;
  }
  
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto p-2">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-xs mb-1">
          <Link href="/" className="text-gray-500 hover:text-primary">{t('nav.home')}</Link>
          <span className="mx-1 text-gray-400">/</span>
          <Link href="/marketplace" className="text-gray-500 hover:text-primary">{t('nav.catalog')}</Link>
          <span className="mx-1 text-gray-400">/</span>
          <span className="text-gray-700 truncate">{machinery.name}</span>
        </div>
        
        {/* Back to catalog button */}
        <div className="flex mb-4 mt-2">
          <Link href="/marketplace" className="text-gray-600 hover:text-primary flex items-center text-sm font-medium">
            <i className="fas fa-arrow-left mr-2"></i>
            {language === 'es' ? 'Volver al catálogo' : 'Back to catalog'}
          </Link>
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
                    {machinery.type}
                  </span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                    <i className="fas fa-check-circle mr-0.5"></i>
                    {language === 'es' ? 'Disponible' : 'Available'}
                  </span>
                </div>
                
                {/* Title and Main Details */}
                <h1 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{machinery.name}</h1>
                
                <div className="flex flex-wrap gap-2 mb-2 border-b border-gray-200 pb-2">
                  <div className="flex items-center">
                    <i className="fas fa-calendar-alt mr-1 text-gray-500 text-sm"></i>
                    <span className="text-gray-900 text-sm">{machinery.year}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-tachometer-alt mr-1 text-gray-500 text-sm"></i>
                    <span className="text-gray-900 text-sm">{machinery.hours} hrs</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-tag mr-1 text-gray-500 text-sm"></i>
                    <span className="text-gray-900 font-bold text-sm">${machinery.price.toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Main Image Gallery */}
                <div 
                  className="w-full h-[450px] border border-gray-200 rounded-lg overflow-hidden mb-1 cursor-pointer" 
                  onClick={() => setSelectedImage(selectedImage ? null : machinery.image)}
                >
                  <img 
                    src={selectedImage || machinery.image} 
                    alt={machinery.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              {/* Image Thumbnails - Full width */}
              <div className="px-3 w-full">
                <div className="flex gap-2 overflow-x-auto pb-3 w-full">
                  <div 
                    className={`${selectedImage === machinery.image || !selectedImage ? 'border-2 border-primary' : 'border border-gray-200'} rounded overflow-hidden flex-shrink-0 cursor-pointer`}
                    onClick={() => setSelectedImage(machinery.image)}
                  >
                    <img
                      src={machinery.image}
                      alt={`${machinery.name} - Thumbnail 1`}
                      className="w-20 h-16 object-cover"
                    />
                  </div>
                  
                  {machinery.gallery && machinery.gallery.map((img, index) => (
                    <div 
                      key={index} 
                      className={`${selectedImage === img ? 'border-2 border-primary' : 'border border-gray-200'} rounded overflow-hidden flex-shrink-0 cursor-pointer`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`${machinery.name} - Thumbnail ${index + 2}`}
                        className="w-20 h-16 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Pricing and Details */}
            <div className="bg-gray-50 p-3">
              {/* Price Information */}
              <div className="bg-white p-3 rounded-lg shadow-sm mb-3">
                <h2 className="text-base font-bold text-gray-900 mb-1">{t('detail.price')}</h2>
                <div className="text-2xl font-bold text-primary mb-1">${machinery.price.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mb-2">{language === 'en' ? 'Final price (taxes included)' : 'Precio final (impuestos incluidos)'}</p>
                
                <div className="border-t border-gray-100 pt-2">
                  <h3 className="text-xs font-medium text-gray-700 mb-0.5">{language === 'en' ? 'Offer type' : 'Tipo de oferta'}</h3>
                  <p className="text-xs text-gray-600">
                    <i className="fas fa-tag mr-1 text-gray-400"></i>
                    {language === 'en' ? 'Direct sale (no auction)' : 'Venta directa (sin subasta)'}
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="grid gap-2 mb-3">
                <Button className="bg-primary hover:bg-primary/90 w-full py-2 h-auto text-sm">
                  <i className="fas fa-shopping-cart mr-1"></i>
                  {language === 'en' ? 'Buy now' : 'Comprar ahora'}
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
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`flex-1 py-1.5 text-center font-medium text-sm ${
                      activeTab === 'specs' 
                        ? 'text-primary border-b-2 border-primary' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {t('detail.specs')}
                  </button>
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`flex-1 py-1.5 text-center font-medium text-sm ${
                      activeTab === 'description' 
                        ? 'text-primary border-b-2 border-primary' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
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
                          <td className="py-1 text-gray-900 font-medium">{machinery.brand}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1 text-gray-600">{language === 'en' ? 'Model' : 'Modelo'}:</td>
                          <td className="py-1 text-gray-900 font-medium">{machinery.name}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1 text-gray-600">{t('detail.year')}:</td>
                          <td className="py-1 text-gray-900 font-medium">{machinery.year}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1 text-gray-600">{t('detail.hours')}:</td>
                          <td className="py-1 text-gray-900 font-medium">{machinery.hours} hrs</td>
                        </tr>
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
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {machinery.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal para vista ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" 
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full p-2">
            <img 
              src={selectedImage} 
              alt={machinery.name} 
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button 
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ErrorState() {
  const { language, t } = useLanguage();
  
  return (
    <div className="py-16 bg-accent min-h-screen">
      <div className="container mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-2xl mx-auto"
        >
          <div className="text-red-500 text-5xl mb-6">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            {language === 'en' ? 'Machine not found' : 'Máquina no encontrada'}
          </h1>
          <p className="text-gray-600 mb-8">
            {language === 'en' 
              ? 'We could not find the machine you are looking for. It may have been sold or removed from our database.'
              : 'No pudimos encontrar la máquina que estás buscando. Puede que haya sido vendida o retirada de nuestra base de datos.'}
          </p>
          <Button asChild>
            <Link href="/marketplace">
              <i className="fas fa-arrow-left mr-2"></i>
              {t('detail.back')}
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  const { t } = useLanguage();
  return (
    <div className="bg-accent h-screen flex flex-col overflow-y-auto">
      <div className="flex-grow container mx-auto px-4 py-4 md:py-6">
        <div className="mb-6 md:mb-10 flex items-center">
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-4 mx-2 rounded" />
          <Skeleton className="h-6 w-24 rounded" />
          <Skeleton className="h-6 w-4 mx-2 rounded" />
          <Skeleton className="h-6 w-36 rounded" />
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Banner skeleton */}
          <div className="w-full h-64 md:h-96 bg-gray-200 animate-pulse relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-10 space-y-3 w-full">
              <Skeleton className="h-6 w-24 rounded" />
              <Skeleton className="h-10 w-3/4 rounded" />
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-5 w-24 rounded" />
                <Skeleton className="h-5 w-28 rounded" />
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-5 w-24 rounded" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-10">
            <div className="md:col-span-2 space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-8 w-40 rounded" />
                <Skeleton className="h-4 w-full rounded mb-1" />
                <Skeleton className="h-4 w-full rounded mb-1" />
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-8 w-40 rounded" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    <Skeleton className="h-6 w-40 rounded" />
                    <Skeleton className="h-4 w-full rounded mb-2" />
                    <Skeleton className="h-4 w-full rounded mb-2" />
                    <Skeleton className="h-4 w-full rounded mb-2" />
                    <Skeleton className="h-4 w-full rounded" />
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    <Skeleton className="h-6 w-40 rounded" />
                    <Skeleton className="h-4 w-full rounded mb-2" />
                    <Skeleton className="h-4 w-full rounded mb-2" />
                    <Skeleton className="h-4 w-full rounded mb-2" />
                    <Skeleton className="h-4 w-full rounded" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-lg space-y-4">
                <Skeleton className="h-7 w-24 rounded" />
                <Skeleton className="h-10 w-40 rounded" />
                <Skeleton className="h-4 w-full rounded mb-2" />
                <Skeleton className="h-4 w-full rounded" />
              </div>
              
              <div className="space-y-3">
                <Skeleton className="h-12 w-full rounded" />
                <Skeleton className="h-12 w-full rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to generate features based on machinery type
function generateFeatures(type: string): string[] {
  const commonFeatures = [
    'Documentación completa y al día',
    'Mantenimiento preventivo reciente',
    'Sistema hidráulico en excelente estado'
  ];
  
  const typeSpecificFeatures: Record<string, string[]> = {
    excavator: [
      'Brazo extendido para mayor alcance',
      'Sistema de control preciso',
      'Cabina climatizada con visibilidad 360°',
      'Motor de alta eficiencia energética'
    ],
    truck: [
      'Suspensión reforzada para cargas pesadas',
      'Caja de cambios automática',
      'Sistema de frenos ABS',
      'Aire acondicionado en cabina'
    ],
    loader: [
      'Cuchara de alta resistencia',
      'Articulación central reforzada',
      'Sistema de nivelación automática',
      'Cabina ROPS/FOPS certificada'
    ],
    generator: [
      'Panel de control digital',
      'Consumo eficiente de combustible',
      'Sistema de arranque automático',
      'Aislamiento acústico premium'
    ],
    crane: [
      'Sistema anti-balanceo de cargas',
      'Controles remotos inalámbricos',
      'Sensores de peso y estabilidad',
      'Alcance vertical extendido'
    ],
    backhoe: [
      'Retroexcavadora y cargadora frontal',
      'Estabilizadores hidráulicos',
      'Múltiples implementos disponibles',
      'Tracción 4x4 para todo terreno'
    ],
    manlift: [
      'Sistema de nivelación automática',
      'Controles proporcionales precisos',
      'Rotación de 360° de la plataforma',
      'Sensor anti-colisión incluido'
    ]
  };
  
  const specificFeatures = typeSpecificFeatures[type] || [];
  return [...commonFeatures, ...specificFeatures];
}