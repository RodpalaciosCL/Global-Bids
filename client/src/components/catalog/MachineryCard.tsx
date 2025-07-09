import { motion } from 'framer-motion';
import { slideUp } from '@/lib/animations';
import { Machinery, typeLabels, conditionLabels } from '@/types/machinery';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ReactNode } from 'react';

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
          {typeLabels[type][language]}
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
            <span><strong>Marca:</strong> {displayBrand || 'N/A'}</span>
            <span><strong>Kms:</strong> {displayKilometers ? displayKilometers.toLocaleString() : 'N/A'}</span>
            <span><strong>Horas:</strong> {displayHours || 'N/A'}</span>
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
