import { motion } from 'framer-motion';
import { slideUp } from '@/lib/animations';
import { Machinery, typeLabels, conditionLabels } from '@/types/machinery';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ReactNode } from 'react';

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
    'mezcladora': { es: 'Mezcladora', en: 'Concrete Mixer' },
    'rodillo': { es: 'Rodillo', en: 'Roller' },
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
  
  // PRECISE CLASSIFICATION - Title has priority
  const titleWords = name.toLowerCase();
  
  // Spanish titles FIRST (highest priority)
  if (titleWords.includes('camión tolva')) {
    specs.correctType = 'camion-tolva';
  }
  else if (titleWords.includes('camión')) {
    specs.correctType = 'camion';
  }
  else if (titleWords.includes('tractor') && !titleWords.includes('camión')) {
    specs.correctType = 'tractor'; // Real tractors like John Deere
  }
  // Excavators - HIGHEST PRIORITY  
  else if (titleWords.includes('excavator')) {
    specs.correctType = 'excavadora';
  }
  // Concrete Mixer Trucks
  else if (titleWords.includes('concrete mixer')) {
    specs.correctType = 'mezcladora';
  }
  // Rollers
  else if (titleWords.includes('roller')) {
    specs.correctType = 'rodillo';
  }
  // Crawler Dumpers (oruga tolva)
  else if (titleWords.includes('crawler dumper') || titleWords.includes('crawler dump')) {
    specs.correctType = 'tolva';
  }
  // English truck types - multiple types
  else if (titleWords.includes('sleeper tractor')) {
    specs.correctType = 'camion'; // These are trucks, not tractors
  }
  // Vehicles
  else if (titleWords.includes('cherokee') || titleWords.includes('explorer') || 
           titleWords.includes('peugeot') || titleWords.includes('landtrek')) {
    specs.correctType = 'camioneta';
  }
  // Loaders
  else if (titleWords.includes('self loader')) {
    specs.correctType = 'camion'; // Self loaders are trucks
  }
  else if (titleWords.includes('loader') || titleWords.includes('wheel loader')) {
    specs.correctType = 'cargador';
  }
  // Motor Graders  
  else if (titleWords.includes('motor grader') || titleWords.includes('grader')) {
    specs.correctType = 'motoniveladora';
  }
  // Water Trucks
  else if (titleWords.includes('water truck')) {
    specs.correctType = 'camion';
  }
  // Dump Trucks vs Dump Trailers
  else if (titleWords.includes('dump truck')) {
    specs.correctType = 'camion-tolva';
  } 
  else if (titleWords.includes('dump trailer') || titleWords.includes('tri-axle dump trailer')) {
    specs.correctType = 'tolva';
  }
  // Haul Trucks
  else if (titleWords.includes('haul truck') || titleWords.includes('articulated haul truck')) {
    specs.correctType = 'camion-tolva';
  }
  // Rock Trucks  
  else if (titleWords.includes('rock truck') || titleWords.includes('rigid rock truck')) {
    specs.correctType = 'camion-tolva';
  }
  // Other equipment
  else if (titleWords.includes('bulldozer') || titleWords.includes('dozer')) {
    specs.correctType = 'bulldozer';
  }
  else if (titleWords.includes('crane')) {
    specs.correctType = 'grua';
  }
  else if (titleWords.includes('telehandler')) {
    specs.correctType = 'manipulador-telescopico';
  }
  else if (titleWords.includes('compressor')) {
    specs.correctType = 'compresor';
  }
  else if (titleWords.includes('golf cart')) {
    specs.correctType = 'vehiculo-golf';
  }
  else if (titleWords.includes('lowbed trailer')) {
    specs.correctType = 'remolque';
  }
  else if (titleWords.includes('trailer') && !titleWords.includes('dump')) {
    specs.correctType = 'remolque';
  }
  else if (titleWords.includes('bus')) {
    specs.correctType = 'autobus';
  }
  // Generic trucks
  else if (titleWords.includes('truck')) {
    specs.correctType = 'camion';
  }
  // Parts only in description
  else if (nameAndDesc.includes('ripper tooth') || nameAndDesc.includes('rake attachment')) {
    specs.correctType = 'repuesto';
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
  const displayType = realSpecs.correctType || type;
  
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
        
        {/* Specs - Marca: Kms: Horas: formato simplificado */}
        <div className="text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-4">
            <span><strong>{language === 'es' ? 'Marca:' : 'Brand:'}</strong> {displayBrand || 'N/A'}</span>
            <span><strong>{language === 'es' ? 'Kms:' : 'Kms:'}</strong> {displayKilometers ? displayKilometers.toLocaleString() : 'N/A'}</span>
            <span><strong>{language === 'es' ? 'Horas:' : 'Hours:'}</strong> {displayHours || 'N/A'}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="flex justify-between items-center">
          <button className="text-primary hover:text-secondary font-medium transition">
            <i className="far fa-heart mr-1"></i> {language === 'es' ? 'Guardar' : 'Save'}
          </button>
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
