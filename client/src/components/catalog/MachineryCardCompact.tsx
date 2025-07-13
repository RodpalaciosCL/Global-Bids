import { Link, useLocation } from 'wouter';
import { Machinery } from '@/types/machinery';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

// Function to get type label in correct language
function getTypeLabel(type: string, language: string): string {
  const typeLabels: Record<string, { es: string; en: string }> = {
    'vehiculo-golf': { es: 'Vehículo de Golf', en: 'Golf Cart' },
    'repuesto': { es: 'Repuesto', en: 'Spare Part' },
    'implemento': { es: 'Implemento', en: 'Attachment' },
    'camioneta': { es: 'Camioneta', en: 'Pickup Truck' },
    'tractor': { es: 'Tractor', en: 'Tractor' },
    'excavadora': { es: 'Excavadora', en: 'Excavator' },
    'bulldozer': { es: 'Bulldozer', en: 'Bulldozer' },
    'motoniveladora': { es: 'Motoniveladora', en: 'Motor Grader' },
    'cargador': { es: 'Cargador', en: 'Wheel Loader' },
    'camion': { es: 'Camión', en: 'Truck' },
    'camion-tolva': { es: 'Camión Tolva', en: 'Dump Truck' },
    'tolva': { es: 'Tolva', en: 'Dump Trailer' },
    'mezcladora': { es: 'Mezcladora', en: 'Concrete Mixer' },
    'rodillo': { es: 'Rodillo', en: 'Roller' },
    'grua': { es: 'Grúa', en: 'Crane' },
    'autobus': { es: 'Autobús', en: 'Bus' },
    'remolque': { es: 'Remolque', en: 'Trailer' },
    'perforadora': { es: 'Perforadora', en: 'Drill' },
    'manipulador-telescopico': { es: 'Manipulador Telescópico', en: 'Telehandler' },
    'compresor': { es: 'Compresor', en: 'Compressor' },
    // Fallback to original types
    'excavator': { es: 'Excavadora', en: 'Excavator' },
    'truck': { es: 'Camión', en: 'Truck' },
    'loader': { es: 'Cargador', en: 'Loader' },
    'machinery': { es: 'Maquinaria', en: 'Machinery' }
  };
  
  return typeLabels[type]?.[language] || type.charAt(0).toUpperCase() + type.slice(1);
}

// Function to extract real data from descriptions
function extractSpecsFromDescription(description: string, name: string) {
  const specs = {
    realYear: null as number | null,
    kilometers: null as number | null,
    hours: null as number | null,
    realBrand: '',
    model: '',
    correctType: '' as string
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

  // Extract kilometers - look for patterns like "86.026 Km", "87,220 Km", "1000 km", "93,770 Miles", etc.
  const kmMatch = description.match(/(\d+(?:[.,]\d+)*)\s*(?:km|Km|KM|kilometers?)/i);
  const milesMatch = description.match(/(\d+(?:[.,]\d+)*)\s*(?:miles?|Miles?|MILES?)/i);
  
  if (kmMatch) {
    const km = parseInt(kmMatch[1].replace(/[.,]/g, ''));
    if (km > 0) {
      specs.kilometers = km;
    }
  } else if (milesMatch) {
    // Convert miles to kilometers (1 mile = 1.60934 km)
    const miles = parseInt(milesMatch[1].replace(/[.,]/g, ''));
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

  // Advanced classification based on title, description and visual analysis
  const nameAndDesc = (name + ' ' + description).toLowerCase();
  const titleWords = name.toLowerCase();
  
  // ABSOLUTE PRIORITY: Title keywords are FINAL authority
  
  // Bus detection FIRST - highest priority for autobuses
  if (titleWords.includes('autobús') || titleWords.includes('autobus') || titleWords.includes(' bus')) {
    specs.correctType = 'autobus';
  }
  // Tolva detection - specific Spanish keywords and dump trailers
  else if (titleWords.includes('tolva') || titleWords.includes('dump trailer') || 
      titleWords.includes('tri-axle') || titleWords.includes('dumper')) {
    specs.correctType = 'tolva';
  }
  // Dump Trucks (different from tolvas - these are the truck chassis)
  else if (titleWords.includes('dump truck') || titleWords.includes('haul truck') || 
      titleWords.includes('rock truck') || titleWords.includes('articulated haul truck') ||
      titleWords.includes('rigid rock truck')) {
    specs.correctType = 'camion-tolva';
  }
  // Excavators - HIGHEST PRIORITY  
  else if (titleWords.includes('excavator')) {
    specs.correctType = 'excavadora';
  }
  // Loaders
  else if (titleWords.includes('loader') || titleWords.includes('wheel loader') || 
      titleWords.includes('track loader')) {
    specs.correctType = 'cargador';
  }
  // Motor Graders  
  else if (titleWords.includes('motor grader') || titleWords.includes('grader')) {
    specs.correctType = 'motoniveladora';
  }
  // Bulldozers
  else if (titleWords.includes('bulldozer') || titleWords.includes('dozer')) {
    specs.correctType = 'bulldozer';
  }
  // Cranes
  else if (titleWords.includes('crane') || titleWords.includes('grúa')) {
    specs.correctType = 'grua';
  }
  // Concrete Mixers
  else if (titleWords.includes('concrete mixer')) {
    specs.correctType = 'mezcladora';
  }
  // Rollers
  else if (titleWords.includes('roller')) {
    specs.correctType = 'rodillo';
  }
  // Telehandlers
  else if (titleWords.includes('telehandler')) {
    specs.correctType = 'manipulador-telescopico';
  }
  // Compressors
  else if (titleWords.includes('compressor')) {
    specs.correctType = 'compresor';
  }
  // Golf Carts
  else if (titleWords.includes('golf cart')) {
    specs.correctType = 'vehiculo-golf';
  }
  // Vehicles - Cherokee, Explorer, Pickup trucks, etc.
  else if (titleWords.includes('cherokee') || titleWords.includes('explorer') || 
      titleWords.includes('peugeot') || titleWords.includes('landtrek') ||
      titleWords.includes('pickup') || titleWords.includes('armored car')) {
    specs.correctType = 'camioneta';
  }
  // Tractors (agricultural/construction - not sleeper tractors)
  else if (titleWords.includes('tractor') && !titleWords.includes('sleeper')) {
    specs.correctType = 'tractor';
  }
  // Trailers (not dump trailers - those are tolvas)
  else if (titleWords.includes('trailer') && !titleWords.includes('dump')) {
    specs.correctType = 'remolque';
  }
  // Generic trucks (catch-all for other truck types)
  else if (titleWords.includes('truck') || titleWords.includes('camión') ||
      titleWords.includes('sleeper tractor')) {
    specs.correctType = 'camion';
  }
  // Parts and attachments
  else if (nameAndDesc.includes('ripper tooth') || nameAndDesc.includes('rake attachment') ||
      titleWords.includes('attachment') || titleWords.includes('tooth') || titleWords.includes('rake')) {
    specs.correctType = 'repuesto';
  }
  // Fallback to machinery for unidentified equipment
  else {
    specs.correctType = 'machinery';
  }

  return specs;
}

interface MachineryCardCompactProps {
  item: Machinery;
  index: number;
}

export function MachineryCardCompact({ item, index }: MachineryCardCompactProps) {
  const [, setLocation] = useLocation();
  const { language } = useLanguage();
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
  const displayType = realSpecs.correctType || type;
  
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
          {getTypeLabel(displayType, language)}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{name}</h3>
        
        {/* Specs - Marca: Kms: Horas: formato simplificado */}
        <div className="text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-4">
            <span><strong>{language === 'es' ? 'Marca:' : 'Brand:'}</strong> {displayBrand || 'N/A'}</span>
            <span><strong>{language === 'es' ? 'Kms:' : 'Kms:'}</strong> {displayKilometers ? displayKilometers.toLocaleString() : 'N/A'}</span>
            <span><strong>{language === 'es' ? 'Horas:' : 'Hours:'}</strong> {displayHours || 'N/A'}</span>
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
              variant="default"
              size="sm"
              className="bg-gray-900 hover:bg-gray-800"
              onClick={() => setLocation(`/machinery/${id}`)}
            >
              {language === 'es' ? 'Ver más' : 'View more'}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}