import { Link, useLocation } from 'wouter';
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

  // Extract year from NAME first (more reliable) - look for 4-digit year at the beginning
  const nameYearMatch = name.match(/^(\d{4})\s+/);
  if (nameYearMatch) {
    const year = parseInt(nameYearMatch[1]);
    if (year >= 1990 && year <= 2030) {
      specs.realYear = year;
    }
  }

  // If no year in name, try description
  if (!specs.realYear) {
    const descYearMatch = description.match(/(\d{4})/g);
    if (descYearMatch) {
      const years = descYearMatch.map(y => parseInt(y)).filter(y => y >= 1990 && y <= 2030);
      if (years.length > 0) {
        specs.realYear = Math.max(...years);
      }
    }
  }

  // Extract kilometers - look for patterns like "87220 Km", "1000 km", "93,770 Miles", etc.
  const kmMatch = description.match(/(\d+(?:,\d+)*)\s*(?:km|Km|KM|kilometers?)/i);
  const milesMatch = description.match(/(\d+(?:,\d+)*)\s*(?:miles?|Miles?|MILES?)/i);
  
  if (kmMatch) {
    const km = parseInt(kmMatch[1].replace(/,/g, ''));
    if (km > 0) {
      specs.kilometers = km;
    }
  } else if (milesMatch) {
    // Convert miles to kilometers (1 mile = 1.60934 km)
    const miles = parseInt(milesMatch[1].replace(/,/g, ''));
    if (miles > 0) {
      specs.kilometers = Math.round(miles * 1.60934);
    }
  }

  // Extract hours - look for patterns like "100 hrs", "1500 hours", etc.
  const hoursMatch = description.match(/(\d+(?:,\d+)*)\s*(?:hrs?|hours?)/i);
  if (hoursMatch) {
    const hrs = parseInt(hoursMatch[1].replace(/,/g, ''));
    if (hrs > 0) {
      specs.hours = hrs;
    }
  }

  // Extract brand from name - if starts with year, take the word after year
  if (nameYearMatch) {
    const afterYear = name.replace(nameYearMatch[0], '').trim();
    const brandMatch = afterYear.split(' ')[0];
    specs.realBrand = brandMatch || '';
  } else {
    // Otherwise take first word
    specs.realBrand = name.split(' ')[0] || '';
  }

  // Extract model (everything after brand and year)
  let model = name;
  if (specs.realYear) {
    model = model.replace(specs.realYear.toString(), '').trim();
  }
  if (specs.realBrand) {
    model = model.replace(specs.realBrand, '').trim();
  }
  specs.model = model;

  return specs;
}

interface MachineryCardCompactProps {
  item: Machinery;
  index: number;
}

export function MachineryCardCompact({ item, index }: MachineryCardCompactProps) {
  const [, setLocation] = useLocation();
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
        
        {/* Specs - Marca, Kms, Horas (formato móvil) */}
        <div className="flex flex-wrap gap-3 mb-3 text-sm">
          <div className="flex items-center text-gray-600">
            <i className="fas fa-industry mr-1"></i>
            <span>{displayBrand || 'N/A'}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <i className="fas fa-road mr-1"></i>
            <span>{displayKilometers ? `${displayKilometers.toLocaleString()} km` : 'N/A'}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <i className="fas fa-clock mr-1"></i>
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
              variant="default"
              size="sm"
              className="bg-gray-900 hover:bg-gray-800"
              onClick={() => setLocation(`/machinery/${id}`)}
            >
              Ver más
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}