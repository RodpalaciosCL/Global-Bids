import { motion } from 'framer-motion';
import { slideUp } from '@/lib/animations';
import { Machinery, typeLabels, conditionLabels } from '@/types/machinery';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ReactNode } from 'react';

// Function to get type label in correct language
function getTypeLabel(type: string, language: string): string {
  const typeLabels: Record<string, { es: string; en: string }> = {
    // Database types (English keys) - these are the actual database values
    'excavator': { es: 'Excavadora', en: 'Excavator' },
    'loader': { es: 'Cargador', en: 'Loader' },
    'dump-truck': { es: 'Camión Tolva', en: 'Dump Truck' },
    'dozer': { es: 'Bulldozer', en: 'Bulldozer' },
    'grader': { es: 'Motoniveladora', en: 'Motor Grader' },
    'parts': { es: 'Repuestos', en: 'Parts' },
    'truck': { es: 'Camión', en: 'Truck' },
    'machinery': { es: 'Maquinaria', en: 'Machinery' },
    'telehandler': { es: 'Manipulador Telescópico', en: 'Telehandler' },
    'bus': { es: 'Autobús', en: 'Bus' },
    'roller': { es: 'Rodillo', en: 'Roller' },
    'golf-cart': { es: 'Carrito Golf', en: 'Golf Cart' },
    'trailer': { es: 'Remolque', en: 'Trailer' },
    'vehicle': { es: 'Vehículo', en: 'Vehicle' },
    'dumper': { es: 'Volquete', en: 'Dumper' },
    'compressor': { es: 'Compresor', en: 'Compressor' },
    'drill': { es: 'Perforadora', en: 'Drill' },
    'mixer': { es: 'Mezcladora', en: 'Concrete Mixer' },
    'tractor': { es: 'Tractor', en: 'Tractor' },
    'skidsteer': { es: 'Minicargador', en: 'Skidsteer' },
    'crane': { es: 'Grúa', en: 'Crane' }
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

interface MachineryCardProps {
  item: Machinery;
  index: number;
}

export function MachineryCard({ item, index }: MachineryCardProps) {
  const { convertPrice, formatPrice } = useCurrency();
  const { language, t } = useLanguage();
  const { 
    id, name, price, type, brand, year, hours, 
    kilometers, condition, description, image, isSold 
  } = item;
  
  const displayPrice = convertPrice(price);

  // Extract real specs from description
  const realSpecs = extractSpecsFromDescription(description, name);
  
  // Use extracted data or fallback to original data
  const displayYear = realSpecs.realYear || year;
  const displayBrand = realSpecs.realBrand || brand;
  const displayKilometers = realSpecs.kilometers || kilometers;
  const displayHours = realSpecs.hours || hours;
  // ALWAYS use database type - it's already correct
  const displayType = type;
  
  return (
    <motion.div 
      className="machinery-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      variants={slideUp}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <img 
          src={image || 'https://images.pexels.com/photos/2760242/pexels-photo-2760242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
          alt={name} 
          className="w-full h-64 object-cover" 
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/2760242/pexels-photo-2760242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
          }}
        />
        <div className="absolute top-3 left-3 bg-primary text-white font-bold px-2 py-1 rounded-md text-xs">
          {getTypeLabel(displayType, language)}
        </div>
        {isSold && (
          <div className="absolute top-3 right-3 bg-red-600 text-white font-bold px-2 py-1 rounded-md text-xs">
            {language === 'es' ? 'VENDIDO' : 'SOLD'}
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="mb-2">
          <h3 className="font-heading font-bold text-lg text-primary">{name}</h3>
        </div>
        
        {/* Solo mostrar specs si tienen valores reales */}
        
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="flex justify-end items-center">
          <a 
            href={`/machinery/${id}`} 
            className="inline-block bg-primary hover:bg-primary-light text-white font-medium px-4 py-2 rounded transition duration-300"
          >
            {language === 'es' ? 'Ver más' : 'View more'}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
