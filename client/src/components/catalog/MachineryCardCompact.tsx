import { Link } from 'wouter';
import { Machinery } from '@/types/machinery';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface MachineryCardCompactProps {
  item: Machinery;
  index: number;
}

export function MachineryCardCompact({ item, index }: MachineryCardCompactProps) {
  const { convertPrice, formatPrice } = useCurrency();
  const { 
    id, name, price, type, brand, year, hours, 
    kilometers, condition, description, image 
  } = item;
  
  const displayPrice = convertPrice(price);
  
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
          src={image} 
          alt={name} 
          className="w-full h-44 object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/400x280?text=Imagen+no+disponible';
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
        
        {/* Price & Actions */}
        <div className="flex justify-between items-center">
          <div className="bg-amber-300 text-gray-900 font-bold px-2 py-1 rounded text-sm">
            ${price.toLocaleString()}
          </div>
          
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