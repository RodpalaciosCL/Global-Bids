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
        
        <div className="mb-4 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center text-gray-600">
              <i className="fas fa-tag mr-2"></i>
              <span>{displayBrand || 'N/A'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <i className="fas fa-calendar-alt mr-2"></i>
              <span>{displayYear || 'N/A'}</span>
            </div>
            {displayKilometers && (
              <div className="flex items-center text-gray-600">
                <i className="fas fa-road mr-2"></i>
                <span>{displayKilometers.toLocaleString()} km</span>
              </div>
            )}
            {displayHours && (
              <div className="flex items-center text-gray-600">
                <i className="fas fa-clock mr-2"></i>
                <span>{displayHours} hrs</span>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <i className="fas fa-check-circle mr-2"></i>
              <span>{conditionLabels[condition][language]}</span>
            </div>
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
