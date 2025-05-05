import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useRoute } from 'wouter';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Machinery, typeLabels, conditionLabels } from '@/types/machinery';
import { useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { ImageGallery } from '@/components/machinery/ImageGallery';

export default function MachineryDetail() {
  // Extract the ID from the URL
  const [, params] = useRoute('/machinery/:id');
  const machineryId = params?.id ? parseInt(params.id) : null;
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
      <div className="container mx-auto px-4 py-4">
        {/* Navegación simple */}
        <div className="flex items-center text-sm mb-4">
          <a href="/" className="text-gray-500 hover:text-primary">Inicio</a>
          <span className="mx-2 text-gray-400">/</span>
          <a href="/#catalogo" className="text-gray-500 hover:text-primary">Catálogo</a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-primary font-medium truncate">{machinery.name}</span>
        </div>
        
        {/* Sección de información de cabecera */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          {/* Etiqueta de tipo */}
          <div className="inline-block bg-gray-100 text-primary font-medium px-3 py-1 rounded text-sm mb-2">
            {typeLabels[machinery.type as keyof typeof typeLabels]}
          </div>
          
          {/* Título y datos básicos */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{machinery.name}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <i className="fas fa-calendar-alt mr-2"></i>
              <span>{machinery.year}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-tag mr-2"></i>
              <span>{machinery.brand}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-tachometer-alt mr-2"></i>
              <span>
                {machinery.hours ? `${machinery.hours.toLocaleString()} hrs` : 
                machinery.kilometers ? `${machinery.kilometers.toLocaleString()} km` : 'N/A'}
              </span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-2"></i>
              <span>{conditionLabels[machinery.condition as keyof typeof conditionLabels]}</span>
            </div>
          </div>
          
          {/* Galería de fotos */}
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            {machinery.gallery && machinery.gallery.length > 0 ? (
              <ImageGallery 
                images={[machinery.image, ...(machinery.gallery || [])]} 
                alt={machinery.name} 
              />
            ) : (
              <ImageGallery 
                images={[machinery.image]} 
                alt={machinery.name} 
              />
            )}
          </div>
          
          {/* Contenido principal en 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Columna izquierda - Descripción y especificaciones */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Descripción</h2>
                <p className="text-gray-700">
                  {machinery.description || `${machinery.name} en ${conditionLabels[machinery.condition as keyof typeof conditionLabels].toLowerCase()} estado de funcionamiento. Con su potente motor y estructura robusta, esta máquina es ideal para proyectos de construcción, minería o forestales que requieren equipos confiables y de alto rendimiento.`}
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Especificaciones</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Información General</h3>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 text-gray-600">Marca:</td>
                          <td className="py-2 text-right font-medium">{machinery.brand}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 text-gray-600">Modelo:</td>
                          <td className="py-2 text-right font-medium">{machinery.name.split(' ').slice(1).join(' ')}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 text-gray-600">Año:</td>
                          <td className="py-2 text-right font-medium">{machinery.year}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-600">Condición:</td>
                          <td className="py-2 text-right font-medium">{conditionLabels[machinery.condition as keyof typeof conditionLabels]}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Uso y Rendimiento</h3>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 text-gray-600">Horas de uso:</td>
                          <td className="py-2 text-right font-medium">{machinery.hours ? `${machinery.hours.toLocaleString()} hrs` : 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 text-gray-600">Kilometraje:</td>
                          <td className="py-2 text-right font-medium">{machinery.kilometers ? `${machinery.kilometers.toLocaleString()} km` : 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 text-gray-600">Potencia:</td>
                          <td className="py-2 text-right font-medium">375 HP</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-600">Capacidad:</td>
                          <td className="py-2 text-right font-medium">{
                            machinery.type === 'manlift' ? '500 lbs' :
                            machinery.type === 'excavator' ? '2.1 m³' : 
                            machinery.type === 'loader' ? '3.5 m³' : 
                            machinery.type === 'truck' ? '20 ton' : 'N/A'
                          }</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Características Adicionales</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {generateFeatures(machinery.type as string).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="text-yellow-500 mr-2">
                        <i className="fas fa-check text-xs"></i>
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Columna derecha - Precio y acciones */}
            <div className="space-y-5">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Precio</h3>
                <div className="flex items-baseline">
                  <div className="text-3xl font-bold text-primary">${machinery.price.toLocaleString()}</div>
                  <p className="text-gray-500 text-sm ml-2">
                    {machinery.auctionDate && !machinery.isSold ? 'Precio de apertura' : 'Precio final'}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 my-4 pt-4">
                  <h4 className="font-medium text-gray-900 mb-1">Fecha de subasta</h4>
                  <p className="text-gray-600 text-sm">
                    {machinery.auctionDate ? 
                      new Date(machinery.auctionDate).toLocaleDateString('es-ES', {
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric'
                      }) : 
                      'Venta directa (sin subasta)'}
                  </p>
                </div>
                
                <div className="mt-4 space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary-dark text-white py-2.5" size="lg">
                    <i className="fas fa-shopping-cart mr-2"></i>
                    Comprar ahora
                  </Button>
                  <Button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5" size="lg">
                    <i className="fas fa-phone-alt mr-2"></i>
                    Contactar consultor
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Información de Contacto</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-user-tie text-gray-500 mr-3 w-5"></i>
                    <span className="text-sm">Juan Pérez - Especialista en {typeLabels[machinery.type as keyof typeof typeLabels]}</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-phone-alt text-gray-500 mr-3 w-5"></i>
                    <span className="text-sm">+56 9 8765 4321</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-envelope text-gray-500 mr-3 w-5"></i>
                    <span className="text-sm">ventas@globalbids.com</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-yellow-200 p-4 rounded-lg bg-yellow-50">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <i className="fas fa-shield-alt text-yellow-500 mr-2"></i> 
                  Garantía Global Bids
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-start">
                    <i className="fas fa-check text-yellow-500 text-xs mt-1 mr-2"></i>
                    <span>Inspección técnica certificada</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-yellow-500 text-xs mt-1 mr-2"></i>
                    <span>Historial de mantenimiento verificado</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-yellow-500 text-xs mt-1 mr-2"></i>
                    <span>Garantía de 30 días en componentes principales</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Botón de volver al catálogo */}
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <a href="/#catalogo">
                <i className="fas fa-arrow-left mr-2"></i>
                Volver al catálogo
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorState() {
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
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">Máquina no encontrada</h1>
          <p className="text-gray-600 mb-8">
            No pudimos encontrar la máquina que estás buscando. Puede que haya sido vendida o retirada de nuestra base de datos.
          </p>
          <Button asChild>
            <a href="/#catalogo">
              <i className="fas fa-arrow-left mr-2"></i>
              Volver al catálogo
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
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