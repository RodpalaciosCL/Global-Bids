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
      <div className="container mx-auto px-4 py-2">
        {/* Navegación simple */}
        <div className="flex items-center text-xs py-2">
          <a href="/" className="text-gray-500 hover:text-primary">Inicio</a>
          <span className="mx-2 text-gray-400">/</span>
          <a href="/#catalogo" className="text-gray-500 hover:text-primary">Catálogo</a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700 truncate">{machinery.name}</span>
        </div>
        
        {/* Info de plataforma */}
        <div className="text-sm text-gray-600 mt-2">
          Plataforma Elevadora
        </div>
        
        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-900 mt-1 mb-3">{machinery.name}</h1>
        
        {/* Datos básicos en línea con íconos */}
        <div className="flex items-center border-b border-gray-200 pb-4 mb-4 gap-x-8">
          <div className="flex items-center">
            <i className="fas fa-calendar-alt mr-2 text-gray-600"></i>
            <span className="text-gray-900">{machinery.year}</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-tachometer-alt mr-2 text-gray-600"></i>
            <span className="text-gray-900">{machinery.hours} hrs</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2 text-gray-600"></i>
            <span className="text-gray-900">Buen estado</span>
          </div>
        </div>
        
        {/* Contenido principal en dos columnas */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Panel izquierdo: galería y botones */}
          <div className="md:w-3/5 flex flex-col">
            {/* Galería de fotos - ocupa el espacio superior */}
            <div className="border border-gray-200 rounded-md overflow-hidden flex-1 mb-2">
              {machinery.gallery && machinery.gallery.length > 0 ? (
                <ImageGallery 
                  images={[machinery.image, ...(machinery.gallery || [])]} 
                  alt={machinery.name} 
                  fullHeight={true}
                />
              ) : (
                <ImageGallery 
                  images={[machinery.image]} 
                  alt={machinery.name} 
                  fullHeight={true}
                />
              )}
            </div>
            
            {/* Botones de acción - ocupan el espacio inferior */}
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white py-1.5 rounded-sm h-10 text-sm" size="default">
                <i className="fas fa-shopping-cart mr-2"></i>
                Comprar ahora
              </Button>
              <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-1.5 rounded-sm h-10 text-sm" variant="outline" size="default">
                <i className="fas fa-phone-alt mr-2"></i>
                Contactar consultor
              </Button>
            </div>
          </div>
          
          {/* Columna derecha: detalles y precio */}
          <div className="md:w-2/5">
            {/* Panel de precio */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Precio</h3>
              <div className="mb-1">
                <div className="text-2xl font-bold text-gray-900">${machinery.price.toLocaleString()}</div>
                <p className="text-gray-500 text-sm">
                  Precio final
                </p>
              </div>
              
              <div className="mt-3">
                <h4 className="font-medium text-gray-700 text-sm mb-1">Fecha de subasta</h4>
                <p className="text-gray-600 text-sm">
                  Venta directa (sin subasta)
                </p>
              </div>
            </div>
            
            {/* Tabs de especificaciones y descripción */}
            <div>
              <div className="flex border-b">
                <div className="px-4 py-2 text-center border-b-2 border-primary font-medium text-primary">
                  Datos técnicos
                </div>
                <div className="px-4 py-2 text-center text-gray-500">
                  Descripción
                </div>
              </div>
              
              <div className="py-2">
                <div className="flex justify-between py-1.5 border-b">
                  <span className="text-gray-600">Marca:</span>
                  <span className="font-medium">JLG</span>
                </div>
                <div className="flex justify-between py-1.5 border-b">
                  <span className="text-gray-600">Modelo:</span>
                  <span className="font-medium">600aj Manlift</span>
                </div>
                <div className="flex justify-between py-1.5 border-b">
                  <span className="text-gray-600">Año:</span>
                  <span className="font-medium">2016</span>
                </div>
                <div className="flex justify-between py-1.5 border-b">
                  <span className="text-gray-600">Horas:</span>
                  <span className="font-medium">326 hrs</span>
                </div>
                <div className="flex justify-between py-1.5 border-b">
                  <span className="text-gray-600">Condición:</span>
                  <span className="font-medium">Buen estado</span>
                </div>
                <div className="flex justify-between py-1.5 border-b">
                  <span className="text-gray-600">Potencia:</span>
                  <span className="font-medium">375 HP</span>
                </div>
                <div className="flex justify-between py-1.5 border-b">
                  <span className="text-gray-600">Capacidad:</span>
                  <span className="font-medium">500 lbs</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-600">Alcance:</span>
                  <span className="font-medium">60 ft</span>
                </div>
              </div>
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