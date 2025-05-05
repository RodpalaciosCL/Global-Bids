import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Asegurarse de que haya al menos una imagen
  const imageList = images.length > 0 ? images : ['https://via.placeholder.com/800x600?text=No+hay+imagen+disponible'];
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };
  
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Imagen principal */}
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="relative bg-gray-100 h-64 md:h-[450px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentIndex}
              src={imageList[currentIndex]} 
              alt={`${alt} - Imagen ${currentIndex + 1}`} 
              className="w-full h-full object-contain"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          
          {/* Controles de navegación */}
          <div className="absolute inset-0 flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 ml-2" 
              onClick={handlePrev}
            >
              <i className="fas fa-chevron-left"></i>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 mr-2" 
              onClick={handleNext}
            >
              <i className="fas fa-chevron-right"></i>
            </Button>
          </div>

          {/* Contador de imágenes */}
          <div className="absolute bottom-3 right-3 bg-black/60 px-3 py-1 rounded text-white text-sm font-medium">
            {currentIndex + 1} / {imageList.length}
          </div>
          
          {/* Botón para expandir */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/30 text-white hover:bg-black/50" 
            onClick={toggleFullscreen}
          >
            <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
          </Button>
        </div>
      </div>
      
      {/* Miniaturas de la galería */}
      <div className="bg-gray-800 p-3 rounded-b-lg overflow-x-auto">
        <div className="flex space-x-2 pb-1">
          {imageList.map((image, index) => (
            <div 
              key={index}
              className={`relative flex-shrink-0 cursor-pointer transition duration-200 ${index === currentIndex ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img 
                src={image} 
                alt={`${alt} - Miniatura ${index + 1}`} 
                className="h-16 w-20 object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal de pantalla completa */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="absolute inset-0 flex flex-col">
            <div className="flex justify-end p-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20" 
                onClick={toggleFullscreen}
              >
                <i className="fas fa-times"></i>
              </Button>
            </div>
            
            <div className="flex-grow relative">
              <img 
                src={imageList[currentIndex]} 
                alt={`${alt} - Pantalla completa`} 
                className="absolute inset-0 w-full h-full object-contain"
              />
              
              <div className="absolute inset-0 flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-14 w-14 rounded-full bg-black/30 text-white hover:bg-black/50 ml-4" 
                  onClick={handlePrev}
                >
                  <i className="fas fa-chevron-left text-xl"></i>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-14 w-14 rounded-full bg-black/30 text-white hover:bg-black/50 mr-4" 
                  onClick={handleNext}
                >
                  <i className="fas fa-chevron-right text-xl"></i>
                </Button>
              </div>
            </div>
            
            <div className="p-4 flex justify-center">
              <div className="bg-white/10 px-4 py-2 rounded-full text-white">
                {currentIndex + 1} / {imageList.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}