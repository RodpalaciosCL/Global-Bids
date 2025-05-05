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
    <div className="bg-white">
      <div className="container mx-auto px-4 pb-2">
        {/* Navegación simple */}
        <div className="flex items-center text-xs py-1">
          <a href="/" className="text-gray-500 hover:text-primary">Inicio</a>
          <span className="mx-1 text-gray-400">/</span>
          <a href="/#catalogo" className="text-gray-500 hover:text-primary">Catálogo</a>
          <span className="mx-1 text-gray-400">/</span>
          <span className="text-primary font-medium truncate">{machinery.name}</span>
        </div>
        
        {/* Layout principal - todo en una sola fila */}
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Columna izquierda: categoría, título y galería */}
          <div className="md:w-3/5">
            <div className="inline-block bg-gray-100 text-primary font-medium px-2 py-0.5 rounded text-xs">
              {typeLabels[machinery.type as keyof typeof typeLabels]}
            </div>
            
            <h1 className="text-xl font-bold text-gray-900 mt-1 mb-2">{machinery.name}</h1>
            
            {/* Atributos básicos en línea - solo para móvil */}
            <div className="md:hidden flex flex-wrap gap-x-4 gap-y-0 text-sm text-gray-600 mb-2">
              <div className="flex items-center">
                <i className="fas fa-calendar-alt mr-1 text-gray-500"></i>
                <span>{machinery.year}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-tachometer-alt mr-1 text-gray-500"></i>
                <span>{machinery.hours ? `${machinery.hours.toLocaleString()} hrs` : 'N/A'}</span>
              </div>
            </div>
            
            {/* Galería de fotos más compacta */}
            <div className="border border-gray-200 rounded overflow-hidden mb-2">
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
            
            {/* Botones de acción */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white py-1.5 rounded-sm text-sm" size="default">
                <i className="fas fa-shopping-cart mr-2"></i>
                Comprar ahora
              </Button>
              <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-1.5 rounded-sm text-sm" variant="outline" size="default">
                <i className="fas fa-phone-alt mr-2"></i>
                Contactar consultor
              </Button>
            </div>
            
            {/* Volver al catálogo - versión móvil */}
            <div className="md:hidden text-center">
              <Button asChild variant="outline" size="sm" className="text-xs py-1 h-7">
                <a href="/#catalogo">
                  <i className="fas fa-arrow-left mr-1"></i>
                  Volver al catálogo
                </a>
              </Button>
            </div>
          </div>
          
          {/* Columna derecha: información de precio y especificaciones */}
          <div className="md:w-2/5 md:flex md:flex-col">
            {/* Panel superior - precio y detalles básicos */}
            <div className="flex flex-col md:flex-row mt-2 md:mt-0 gap-2">
              {/* Panel de precio */}
              <div className="md:w-1/2 bg-gray-50 p-3 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">Precio</h3>
                <div className="flex items-baseline">
                  <div className="text-2xl font-bold text-gray-900">${machinery.price.toLocaleString()}</div>
                  <p className="text-gray-500 text-xs ml-1">Precio final</p>
                </div>
                
                <div className="border-t border-gray-200 my-1 pt-1">
                  <h4 className="font-medium text-gray-700 text-xs">Fecha de subasta</h4>
                  <p className="text-gray-600 text-xs">
                    {machinery.auctionDate ? 
                      new Date(machinery.auctionDate).toLocaleDateString('es-ES', {
                        day: 'numeric', 
                        month: 'long'
                      }) : 
                      'Venta directa (sin subasta)'}
                  </p>
                </div>
              </div>
              
              {/* Información básica en columna para desktop */}
              <div className="hidden md:block md:w-1/2">
                <div className="bg-gray-50 p-3 rounded-lg shadow-sm h-full">
                  <h3 className="font-medium text-gray-900 text-sm mb-1">Información básica</h3>
                  <table className="w-full text-xs">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-1 text-gray-600">Marca:</td>
                        <td className="py-1 text-right font-medium">{machinery.brand}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-1 text-gray-600">Año:</td>
                        <td className="py-1 text-right font-medium">{machinery.year}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-1 text-gray-600">Horas:</td>
                        <td className="py-1 text-right font-medium">{machinery.hours ? `${machinery.hours.toLocaleString()} hrs` : 'N/A'}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-600">Condición:</td>
                        <td className="py-1 text-right font-medium">{conditionLabels[machinery.condition as keyof typeof conditionLabels]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Descripción y especificaciones completas */}
            <div className="flex flex-col md:flex-row mt-2 gap-2">
              {/* Descripción */}
              <div className="md:w-1/2 bg-gray-50 p-3 rounded-lg shadow-sm">
                <h3 className="font-medium text-gray-900 text-sm mb-1">Descripción</h3>
                <p className="text-gray-700 text-xs leading-tight line-clamp-6">
                  {machinery.description || `SN 0300221374, Meter Reads 326 Hours! Diesel Powered, 4x4, 500lbs Capacity, 60ft Max Reach, 39ft Outreach, Fleet Maintained, Good Rubber All Around.`}
                </p>
              </div>
              
              {/* Especificaciones */}
              <div className="md:w-1/2 bg-gray-50 p-3 rounded-lg shadow-sm">
                <h3 className="font-medium text-gray-900 text-sm mb-1">Especificaciones</h3>
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-1 text-gray-600">Marca:</td>
                      <td className="py-1 text-right font-medium">JLG</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-1 text-gray-600">Modelo:</td>
                      <td className="py-1 text-right font-medium">600aj Manlift</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-1 text-gray-600">Horas:</td>
                      <td className="py-1 text-right font-medium">326 hrs</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-1 text-gray-600">Potencia:</td>
                      <td className="py-1 text-right font-medium">375 HP</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-1 text-gray-600">Capacidad:</td>
                      <td className="py-1 text-right font-medium">500 lbs</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-gray-600">Alcance:</td>
                      <td className="py-1 text-right font-medium">60 ft</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Botón volver en desktop */}
            <div className="hidden md:block mt-2">
              <Button asChild variant="outline" size="sm" className="text-xs w-full py-1 h-7">
                <a href="/#catalogo">
                  <i className="fas fa-arrow-left mr-1"></i>
                  Volver al catálogo
                </a>
              </Button>
            </div>
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