import { Link } from 'wouter';
import { Machinery } from '@/types/machinery';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface MachineryCardCompactProps {
  item: Machinery;
  index: number;
}

export function MachineryCardCompact({ item, index }: MachineryCardCompactProps) {
  const { 
    id, name, type, brand, year, hours, 
    kilometers, condition, description, image 
  } = item;
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      {/* Type Badge */}
      <div className="relative">
        <img 
          src={image.replace('https://auctiontechupload.s3.amazonaws.com/216/auction/2187/', '/api/images/')} 
          alt={name} 
          className="w-full h-44 object-cover"
          onError={(e) => {
            console.log('Error loading image:', image);
            e.currentTarget.src = `https://placehold.co/400x280/1a1a1a/ffffff?text=${encodeURIComponent(name.substring(0, 20))}`;
          }}
        />
        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{name}</h3>
        
        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-1 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <i className="far fa-calendar-alt mr-1.5"></i>
            <span>{year}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <i className="fas fa-tachometer-alt mr-1.5"></i>
            <span>
              {hours ? `${hours} hrs` : kilometers ? `${kilometers} km` : 'N/A'}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <i className="fas fa-tag mr-1.5"></i>
            <span>{brand}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <i className="fas fa-check-circle mr-1.5"></i>
            <span>{condition === 'excellent' ? 'Excelente' : 
                   condition === 'good' ? 'Buen estado' : 
                   condition === 'fair' ? 'Estado regular' : 
                   'Requiere reparación'}</span>
          </div>
        </div>
        
        {/* Description (truncated) */}
        <p className="text-sm text-gray-700 line-clamp-3 mb-3">
          {description}
        </p>
        
        {/* Actions */}
        <div className="flex justify-end items-center">
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="far fa-heart"></i> Guardar
            </Button>
            <Button 
              asChild
              variant="default"
              size="sm"
              className="bg-gray-900 hover:bg-gray-800"
            >
              <Link href={`/machinery/${id}`}>
                Ver más
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}