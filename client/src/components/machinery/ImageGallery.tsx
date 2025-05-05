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
      {/* Vista principal con imagen grande - altura reducida */}
      <div className="relative">
        <div className="relative bg-gray-100 h-[240px] overflow-hidden">
          <img 
            src={imageList[currentIndex]} 
            alt={`${alt} - Imagen ${currentIndex + 1}`} 
            className="w-full h-full object-contain"
            style={{ maxHeight: '240px', margin: '0 auto', objectFit: 'cover', objectPosition: 'center' }}
          />
          
          {/* Controles laterales más pequeños */}
          <button 
            className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/20 text-white hover:bg-black/40 flex items-center justify-center focus:outline-none transition-colors"
            onClick={handlePrev}
          >
            <i className="fas fa-chevron-left text-xs"></i>
          </button>
          <button 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/20 text-white hover:bg-black/40 flex items-center justify-center focus:outline-none transition-colors"
            onClick={handleNext}
          >
            <i className="fas fa-chevron-right text-xs"></i>
          </button>
          
          {/* Contador de imágenes */}
          <div className="absolute bottom-1 right-1 bg-black/50 px-1.5 py-0.5 rounded text-white text-xs font-medium">
            {currentIndex + 1} / {imageList.length}
          </div>
          
          {/* Botón para expandir */}
          <button 
            className="absolute top-1 right-1 h-6 w-6 rounded bg-black/50 text-white hover:bg-black/70 flex items-center justify-center focus:outline-none transition-colors"
            onClick={toggleFullscreen}
          >
            <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-xs`}></i>
          </button>
        </div>
      </div>
      
      {/* Miniaturas en fila simple - más pequeñas */}
      <div className="bg-gray-800 py-1 overflow-x-auto">
        <div className="flex px-1 space-x-0.5">
          {imageList.map((image, index) => (
            <div 
              key={index}
              className={`relative flex-shrink-0 cursor-pointer transition-opacity ${index === currentIndex ? 'opacity-100 outline outline-1 outline-white' : 'opacity-60 hover:opacity-90'}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img 
                src={image} 
                alt={`${alt} - Miniatura ${index + 1}`} 
                className="h-10 w-14 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal de pantalla completa */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="absolute inset-0 flex flex-col">
            <div className="flex justify-end px-4 py-2">
              <button 
                className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center focus:outline-none transition-colors"
                onClick={toggleFullscreen}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="flex-grow relative">
              <img 
                src={imageList[currentIndex]} 
                alt={`${alt} - Pantalla completa`} 
                className="absolute inset-0 w-full h-full object-contain"
              />
              
              <div className="absolute inset-0 flex justify-between items-center">
                <button 
                  className="h-12 w-12 ml-4 rounded-full bg-black/30 text-white hover:bg-black/50 flex items-center justify-center focus:outline-none transition-colors"
                  onClick={handlePrev}
                >
                  <i className="fas fa-chevron-left text-xl"></i>
                </button>
                <button 
                  className="h-12 w-12 mr-4 rounded-full bg-black/30 text-white hover:bg-black/50 flex items-center justify-center focus:outline-none transition-colors"
                  onClick={handleNext}
                >
                  <i className="fas fa-chevron-right text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="py-3 flex justify-center">
              <div className="bg-white/10 px-4 py-1 rounded-full text-white text-sm">
                {currentIndex + 1} / {imageList.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}