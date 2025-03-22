import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useRoute } from 'wouter';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Machinery, typeLabels, conditionLabels } from '@/types/machinery';
import { useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';

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
    <div className="py-8 md:py-16 bg-accent min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div 
          className="mb-6 md:mb-10 flex items-center text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <a href="/" className="text-gray-500 hover:text-primary">Inicio</a>
          <span className="mx-2 text-gray-400">/</span>
          <a href="/#catalogo" className="text-gray-500 hover:text-primary">Catálogo</a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-primary font-medium truncate">{machinery.name}</span>
        </motion.div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Banner with status */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {machinery.isSold && (
              <div className="absolute top-4 right-4 z-20 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                VENDIDO
              </div>
            )}
            {machinery.auctionDate && !machinery.isSold && (
              <div className="absolute top-4 right-4 z-20 bg-primary text-white px-4 py-2 rounded-full font-bold text-sm">
                SUBASTA: {new Date(machinery.auctionDate).toLocaleDateString('es-ES', {day: '2-digit', month: 'short', year: 'numeric'})}
              </div>
            )}
            <div className="w-full h-64 md:h-96 relative">
              <img 
                src={machinery.image || 'https://images.pexels.com/photos/1882537/pexels-photo-1882537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                alt={machinery.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-10">
                <div className="inline-block bg-secondary text-primary font-bold px-3 py-1 rounded text-sm mb-3">
                  {typeLabels[machinery.type as keyof typeof typeLabels]}
                </div>
                <h1 className="text-white text-2xl md:text-4xl font-bold mb-2 font-heading">{machinery.name}</h1>
                <div className="flex flex-wrap gap-4 text-white/90 text-sm">
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
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-10">
            <motion.div 
              className="md:col-span-2"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={slideUp} className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-heading">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">
                  {machinery.description || `${machinery.name} en ${conditionLabels[machinery.condition as keyof typeof conditionLabels].toLowerCase()} estado de funcionamiento. Con su potente motor y estructura robusta, esta máquina es ideal para proyectos de construcción, minería o forestales que requieren equipos confiables y de alto rendimiento.`}
                </p>
              </motion.div>
              
              <motion.div variants={slideUp}>
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-heading">Especificaciones</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-3">Información General</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Marca:</span>
                        <span className="font-medium">{machinery.brand}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Modelo:</span>
                        <span className="font-medium">{machinery.name.split(' ').slice(1).join(' ')}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Año:</span>
                        <span className="font-medium">{machinery.year}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Condición:</span>
                        <span className="font-medium">{conditionLabels[machinery.condition as keyof typeof conditionLabels]}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-3">Uso y Rendimiento</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Horas de uso:</span>
                        <span className="font-medium">{machinery.hours ? `${machinery.hours.toLocaleString()} hrs` : 'N/A'}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Kilometraje:</span>
                        <span className="font-medium">{machinery.kilometers ? `${machinery.kilometers.toLocaleString()} km` : 'N/A'}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Potencia:</span>
                        <span className="font-medium">375 HP</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Capacidad:</span>
                        <span className="font-medium">{machinery.type === 'excavator' ? '2.1 m³' : 
                         machinery.type === 'loader' ? '3.5 m³' : 
                         machinery.type === 'truck' ? '20 ton' : 'N/A'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={slideUp} className="mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-heading">Características Adicionales</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {generateFeatures(machinery.type as string).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-secondary/10 p-1.5 rounded-full mr-3 flex-shrink-0">
                        <i className="fas fa-check text-secondary text-xs"></i>
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            {/* Pricing and call to action */}
            <motion.div 
              className="md:border-l md:pl-6 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                <h3 className="text-lg font-semibold text-primary mb-2">Precio</h3>
                <div className="flex items-center">
                  <div className="text-3xl font-bold text-primary">${machinery.price.toLocaleString()}</div>
                  {machinery.isSold && (
                    <div className="ml-3 px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded">VENDIDO</div>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  {machinery.auctionDate && !machinery.isSold ? 'Precio de apertura' : 'Precio final'}
                </p>
                
                <div className="border-t border-gray-200 my-4 pt-4">
                  <h4 className="text-sm font-medium text-primary mb-2">Fecha de subasta</h4>
                  <p className="text-gray-700">
                    {machinery.auctionDate ? 
                      new Date(machinery.auctionDate).toLocaleDateString('es-ES', {
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric'
                      }) : 
                      'Venta directa (sin subasta)'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary-dark text-white py-3" size="lg">
                  <i className="fas fa-gavel mr-2"></i>
                  {machinery.isSold ? 'Ver opciones similares' : 'Participa en la subasta'}
                </Button>
                <Button className="w-full bg-white border border-gray-300 text-primary hover:bg-gray-50 py-3" size="lg">
                  <i className="fas fa-phone-alt mr-2"></i>
                  Contactar consultor
                </Button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <h3 className="font-medium text-primary mb-3">Información de Contacto</h3>
                <ul className="space-y-3">
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
                    <span className="text-sm">ventas@macbid.com</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-secondary/20 p-4 rounded-lg bg-secondary/5">
                <h3 className="font-medium text-primary mb-2 flex items-center">
                  <i className="fas fa-shield-alt text-secondary mr-2"></i> 
                  Garantía MacBid
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Todos nuestros equipos pasan por un proceso de inspección y verificación exhaustivo.
                </p>
                <ul className="space-y-1">
                  <li className="flex items-start text-xs text-gray-600">
                    <i className="fas fa-check text-secondary text-xs mt-1 mr-2"></i>
                    <span>Inspección técnica certificada</span>
                  </li>
                  <li className="flex items-start text-xs text-gray-600">
                    <i className="fas fa-check text-secondary text-xs mt-1 mr-2"></i>
                    <span>Historial de mantenimiento verificado</span>
                  </li>
                  <li className="flex items-start text-xs text-gray-600">
                    <i className="fas fa-check text-secondary text-xs mt-1 mr-2"></i>
                    <span>Garantía de 30 días en componentes principales</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Related machines - we would implement this in a real app */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 font-heading text-center">Maquinaria Similar</h2>
          <div className="text-center mb-10">
            <p className="text-gray-600">
              Estas unidades similares podrían interesarte:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <img 
                    src={`https://images.pexels.com/photos/27176${i+80}/pexels-photo-27176${i+80}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} 
                    alt="Similar machinery" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-primary text-white font-bold px-3 py-1 m-2 rounded text-sm">
                    {typeLabels[machinery.type as keyof typeof typeLabels]}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-primary">{machinery.brand} {i+325}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">{machinery.year - i}</span>
                    <span className="font-bold text-xl text-primary">${(machinery.price * (0.8 + i*0.1)).toLocaleString()}</span>
                  </div>
                  <a 
                    href="#" 
                    className="mt-4 block text-center bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 rounded transition duration-300"
                  >
                    Ver detalles
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="mt-4">
              <a href="/#catalogo">
                <i className="fas fa-arrow-left mr-2"></i>
                Volver al catálogo
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="py-8 md:py-16 bg-accent min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-10">
          <Skeleton className="h-6 w-64" />
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="w-full h-64 md:h-96">
            <Skeleton className="w-full h-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-10">
            <div className="md:col-span-2 space-y-8">
              <div>
                <Skeleton className="h-8 w-40 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              
              <div>
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Skeleton className="h-60 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-40 w-full" />
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

// Helper function to generate features based on machinery type
function generateFeatures(type: string) {
  const commonFeatures = [
    "Documentación completa y al día",
    "Mantenimiento preventivo reciente",
    "Sistema hidráulico en excelente estado"
  ];
  
  const typeSpecificFeatures: Record<string, string[]> = {
    excavator: [
      "Brazo extendido para mayor alcance",
      "Sistema de control por joystick",
      "Cabina con aire acondicionado",
      "Múltiples cucharones disponibles"
    ],
    loader: [
      "Dirección articulada",
      "Sistema de pesaje integrado",
      "Cuchara multiuso",
      "Tracción en las 4 ruedas"
    ],
    truck: [
      "Motor diésel de alto rendimiento",
      "Transmisión automática",
      "Sistema de frenos ABS",
      "Suspensión reforzada"
    ],
    crane: [
      "Capacidad de elevación de 20 toneladas",
      "Pluma telescópica",
      "Sistema de seguridad antivuelco",
      "Estabilizadores hidráulicos"
    ],
    generator: [
      "Bajo nivel de ruido",
      "Panel de control digital",
      "Tanque de combustible de alta capacidad",
      "Sistema de arranque automático"
    ],
    backhoe: [
      "Brazo retroexcavador versátil",
      "Pala cargadora frontal",
      "Estabilizadores telescópicos",
      "Cabina ROPS certificada"
    ]
  };
  
  const specificFeatures = typeSpecificFeatures[type] || [];
  return [...specificFeatures, ...commonFeatures];
}