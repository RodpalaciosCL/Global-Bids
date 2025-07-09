import { Link } from 'wouter';
import { Machinery } from '@/types/machinery';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Function to extract real data from descriptions
function extractSpecsFromDescription(description: string, name: string) {
  const specs = {
    realYear: null as number | null,
    kilometers: null as number | null,
    hours: null as number | null,
    realBrand: '',
    model: ''
  };

  // Extract year from description or name
  const yearMatch = description.match(/(\d{4})/g) || name.match(/(\d{4})/g);
  if (yearMatch) {
    // Get the year that makes sense (between 1990-2030)
    const years = yearMatch.map(y => parseInt(y)).filter(y => y >= 1990 && y <= 2030);
    if (years.length > 0) {
      specs.realYear = Math.max(...years); // Take the most recent year
    }
  }

  // Extract kilometers - look for patterns like "87220 Km", "1000 km", etc.
  const kmMatch = description.match(/(\d+(?:,\d+)*)\s*(?:km|Km|KM|kilometers?)/i);
  if (kmMatch) {
    specs.kilometers = parseInt(kmMatch[1].replace(/,/g, ''));
  }

  // Extract hours - look for patterns like "100 hrs", "1500 hours", etc.
  const hoursMatch = description.match(/(\d+(?:,\d+)*)\s*(?:hrs?|hours?)/i);
  if (hoursMatch) {
    specs.hours = parseInt(hoursMatch[1].replace(/,/g, ''));
  }

  // Extract brand from name (first word usually)
  const nameWords = name.split(' ');
  if (nameWords.length > 0) {
    specs.realBrand = nameWords[0];
  }

  // Extract model (everything after brand and year)
  const brandAndYear = `${specs.realBrand}${specs.realYear ? ` ${specs.realYear}` : ''}`;
  specs.model = name.replace(brandAndYear, '').trim();

  return specs;
}

interface MachineryCardCompactProps {
  item: Machinery;
  index: number;
}

export function MachineryCardCompact({ item, index }: MachineryCardCompactProps) {
  const { 
    id, name, type, brand, year, hours, 
    kilometers, condition, description, image 
  } = item;

  // Extract real specs from description
  const realSpecs = extractSpecsFromDescription(description, name);
  
  // Use extracted data or fallback to original data
  const displayYear = realSpecs.realYear || year;
  const displayBrand = realSpecs.realBrand || brand;
  const displayKilometers = realSpecs.kilometers || kilometers;
  const displayHours = realSpecs.hours || hours;
  
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
        
        {/* Specs Grid - Marca, Modelo, Año, Kms, Horas */}
        <div className="grid grid-cols-2 gap-1 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <i className="fas fa-tag mr-1.5"></i>
            <span>{displayBrand}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <i className="fas fa-cog mr-1.5"></i>
            <span className="truncate">{realSpecs.model || type}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <i className="far fa-calendar-alt mr-1.5"></i>
            <span>{displayYear || 'N/A'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <i className="fas fa-road mr-1.5"></i>
            <span>{displayKilometers ? `${displayKilometers.toLocaleString()} km` : 'N/A'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 col-span-2">
            <i className="fas fa-clock mr-1.5"></i>
            <span>{displayHours ? `${displayHours} hrs` : 'N/A'}</span>
          </div>
        </div>
        
        {/* Key specifications */}
        <div className="text-sm text-gray-700 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <i className="fas fa-map-marker-alt text-gray-400"></i>
            <span>{description.includes('Located in') ? 
              description.split('Located in ')[1].split('.')[0] : 
              'Chile'}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-info-circle text-gray-400"></i>
            <span className="line-clamp-2">
              {description.split(' - ')[1]?.split('.')[0] || 
               'Authentic auction item from International Global Bids And Prelco Auctions'}
            </span>
          </div>
        </div>
        
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