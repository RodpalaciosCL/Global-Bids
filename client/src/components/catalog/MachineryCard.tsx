import { motion } from 'framer-motion';
import { slideUp } from '@/lib/animations';
import { Machinery, typeLabels, conditionLabels } from '@/types/machinery';
import { useCurrency } from '@/contexts/CurrencyContext';

interface MachineryCardProps {
  item: Machinery;
  index: number;
}

export function MachineryCard({ item, index }: MachineryCardProps) {
  const { convertPrice, formatPrice } = useCurrency();
  const { 
    id, name, price, type, brand, year, hours, 
    kilometers, condition, description, image, isSold 
  } = item;
  
  const displayPrice = convertPrice(price);
  
  return (
    <motion.div 
      className="machinery-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      variants={slideUp}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover" 
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading font-bold text-lg text-primary line-clamp-2">{name}</h3>
          <div className="bg-secondary text-primary font-bold px-2 py-1 rounded text-sm ml-2 flex-shrink-0">
            {formatPrice(displayPrice)}
          </div>
        </div>
        
        <div className="mb-4 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center text-gray-600">
              <i className="fas fa-calendar-alt mr-2"></i>
              <span>{year}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <i className="fas fa-tachometer-alt mr-2"></i>
              <span>
                {hours ? `${hours.toLocaleString()} hrs` : 
                 kilometers ? `${kilometers.toLocaleString()} km` : 'N/A'}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <i className="fas fa-tag mr-2"></i>
              <span>{brand}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <i className="fas fa-check-circle mr-2"></i>
              <span>{conditionLabels[condition]}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="flex justify-between items-center">
          <button className="text-primary hover:text-secondary font-medium transition">
            <i className="far fa-heart mr-1"></i> Guardar
          </button>
          <a 
            href={`/machinery/${id}`} 
            className="inline-block bg-primary hover:bg-primary-light text-white font-medium px-4 py-2 rounded transition duration-300"
          >
            Ver más
          </a>
        </div>
      </div>
    </motion.div>
  );
}
