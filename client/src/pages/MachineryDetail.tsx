import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useRoute, Link, useLocation } from 'wouter';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Machinery } from '@/types/schema';
import { useEffect, useState, useCallback } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRegistration } from '@/contexts/RegistrationContext';

// Translation function for machinery names
function translateMachineryName(englishName: string, language: string): string {
  if (language === 'en') return englishName;
  
  // Common translations for equipment names
  const translations: Record<string, string> = {
    // Excavators
    'Mini Excavator': 'Mini Excavadora',
    'Excavator': 'Excavadora',
    'Compact Excavator': 'Excavadora Compacta',
    'Wheel Excavator': 'Excavadora de Ruedas',
    
    // Trucks
    'Dump Truck': 'Camión Tolva',
    'Water Truck': 'Camión Cisterna',
    'Haul Truck': 'Camión de Volteo',
    'Rock Truck': 'Camión Minero',
    'Articulated Haul Truck': 'Camión Articulado de Volteo',
    'Rigid Rock Truck': 'Camión Rígido Minero',
    'Concrete Mixer Truck': 'Camión Mezclador',
    'Self Loader Truck': 'Camión Autocargador',
    'Sleeper Tractor': 'Tractocamión',
    'Fuel Truck': 'Camión Combustible',
    
    // Loaders
    'Wheel Loader': 'Cargador Frontal',
    'Loader': 'Cargador',
    'Self Loader': 'Autocargador',
    'Track Loader': 'Cargador de Orugas',
    
    // Other equipment
    'Motor Grader': 'Motoniveladora',
    'Bulldozer': 'Bulldozer',
    'Dozer': 'Bulldozer',
    'Crane': 'Grúa',
    'Roller': 'Rodillo',
    'Compressor': 'Compresor',
    'Telehandler': 'Manipulador Telescópico',
    'Golf Cart': 'Carrito de Golf',
    'Concrete Mixer': 'Mezcladora de Concreto',
    'Crawler Dumper': 'Volquete de Orugas',
    'Dump Trailer': 'Remolque Tolva',
    'Lowbed Trailer': 'Remolque Cama Baja',
    'Trailer': 'Remolque',
    'Bus': 'Autobús',
    
    // Vehicles
    'Pickup Truck': 'Camioneta',
    'Pickup': 'Camioneta',
    'Cherokee': 'Cherokee',
    'Explorer': 'Explorer',
    'Peugeot': 'Peugeot',
    'Landtrek': 'Landtrek',
    'Armored Car': 'Vehículo Blindado',
    'Mini Golf Cart': 'Mini Carrito de Golf',
    
    // Spare parts / Attachments
    'Ripper Tooth': 'Diente Desgarrador',
    'Rake Attachment': 'Implemento de Rastrillo',
    'New Ir': 'Nuevo',
    'Attachment': 'Implemento',
    'Spare Part': 'Repuesto',
    
    // Common words
    'Unused': 'Sin Usar',
    'Used': 'Usado',
    'With': 'con',
    'Engine': 'Motor',
    'Kubota Engine': 'Motor Kubota',
    'Briggs & Stratton': 'Briggs & Stratton',
    'Diesel': 'Diésel',
    'Gasoline': 'Gasolina',
    'Manual': 'Manual',
    'Automatic': 'Automático',
  };
  
  let translatedName = englishName;
  
  // Handle specific patterns first
  translatedName = translatedName.replace(/New Ir(\d+) Mini Golf Cart/gi, 'Nuevo Irgc$1 Mini Carrito de Golf');
  translatedName = translatedName.replace(/New Ir Ripper Tooth/gi, 'Nuevo Diente Desgarrador Ir');
  translatedName = translatedName.replace(/New Ir Rake Attachment/gi, 'Nuevo Implemento de Rastrillo Ir');
  
  // Apply translations
  Object.entries(translations).forEach(([english, spanish]) => {
    const regex = new RegExp(`\\b${english}\\b`, 'gi');
    translatedName = translatedName.replace(regex, spanish);
  });
  
  return translatedName;
}

// Function to translate and format technical descriptions according to info.md instructions
function translateAndFormatDescription(descText: string, language: string): string {
  if (language === 'en') {
    // If requesting English, translate Spanish description to English
    if (descText.includes('Detalles del Equipo:')) {
      return translateSpanishToEnglish(descText);
    }
    return descText;
  }
  
  // Translation mappings based on info.md instructions
  const translations: Record<string, string> = {
    // Location and identification
    'Located In': 'Ubicación',
    'VIN#': 'VIN',
    'Vin#': 'VIN',
    'Meter Reads': 'Kilometraje',
    'Miles': 'Millas',
    'Hours': 'Horas',
    'Km': 'km',
    
    // Engine and power
    'Engine Model': 'Modelo del Motor',
    'Power Type': 'Tipo de Motor',
    'Internal Combustion Engine': 'Motor de Combustión Interna',
    'Displacement': 'Cilindrada',
    'Maximum Power': 'Potencia Máxima',
    'Horsepower': 'Caballos de Fuerza',
    'HP': 'HP',
    'GTDI': 'GTDI',
    'EcoBoost': 'EcoBoost',
    'Eco Boost Powered': 'con tecnología EcoBoost',
    
    // Transmission and fuel
    'Automatic Transmission': 'Transmisión Automática',
    'Fuel Type': 'Tipo de Combustible',
    'fuel Type': 'Tipo de Combustible',
    'Diesel': 'Diésel',
    'Fuel Consumption': 'Consumo de Combustible',
    'Fuel Capacity': 'Capacidad de Combustible',
    'Level': 'Nivel',
    
    // Vehicle characteristics
    'Passenger': 'Pasajeros',
    'All Wheel Disc Brakes': 'Frenos de disco en todas las ruedas',
    'Cloth Interior': 'Tapizado de tela',
    'Cruise Control': 'Control de crucero',
    'Heat/AC': 'Calefacción/AC',
    'Rear Climate Controls': 'Controles de clima traseros',
    'Super Clean Inside And Out': 'Súper limpio por dentro y por fuera',
    
    // Construction equipment
    'Bucket Capacity': 'Capacidad del Cucharón',
    'Length*width*height': 'Dimensiones',
    'Track Width': 'Ancho de Oruga',
    'Maximum Excavation Depth': 'Profundidad Máxima de Excavación',
    'Maximum Unloading Height': 'Altura Máxima de Descarga',
    
    // Units - keep as is but mention for reference
    'up To 9mm': 'hasta 9mm'
  };
  
  // Clean and parse the description
  let description = descText.trim();
  
  // Remove redundant "Located In" at the end if it repeats
  description = description.replace(/\.\s*Located In[^.]*\.\s*$/, '.');
  
  // Split into parts and process
  const parts: string[] = [];
  
  // Extract location
  const locationMatch = description.match(/Located In ([^.,]+(?:, [^.,]+)*)/i);
  if (locationMatch) {
    parts.push(`Ubicación: ${locationMatch[1]}`);
  }
  
  // Extract VIN
  const vinMatch = description.match(/Vin#?\s*([a-zA-Z0-9]+)/i);
  if (vinMatch) {
    parts.push(`VIN: ${vinMatch[1].toLowerCase()}`);
  }
  
  // Extract kilometrage/mileage
  const kmMatch = description.match(/(?:Meter Reads\s*)?(\d+(?:[.,]\d+)*)\s*Km/i);
  if (kmMatch) {
    const km = kmMatch[1].replace(/[.,]/g, ',');
    parts.push(`Kilometraje: ${km} km`);
  }
  
  // Extract miles
  const milesMatch = description.match(/(\d+(?:[.,]\d+)*)\s*miles/i);
  if (milesMatch) {
    const miles = milesMatch[1].replace(/[.,]/g, ',');
    parts.push(`Millas: ${miles} millas`);
  }
  
  // Extract hours
  const hoursMatch = description.match(/(\d+(?:[.,]\d+)*)\s*(?:hrs?|hours)/i);
  if (hoursMatch) {
    const hours = hoursMatch[1].replace(/[.,]/g, ',');
    parts.push(`Horas de Uso: ${hours} horas`);
  }
  
  // Extract engine model
  const engineMatch = description.match(/Engine Model:\s*([^,]+)/i);
  if (engineMatch) {
    parts.push(`Modelo del Motor: ${engineMatch[1].trim()}`);
  }
  
  // Extract engine displacement (for cars like "2.3l GTDI")
  const engineSizeMatch = description.match(/(\d+\.\d+l)\s*([^,]*(?:GTDI|EcoBoost)[^,]*)/i);
  if (engineSizeMatch) {
    let engineDesc = engineSizeMatch[2].trim();
    if (engineDesc.toLowerCase().includes('eco boost')) {
      engineDesc = engineDesc.replace(/eco boost powered/gi, 'con tecnología EcoBoost');
    }
    parts.push(`Motor: ${engineSizeMatch[1]} ${engineDesc}`);
  }
  
  // Extract power type
  const powerTypeMatch = description.match(/Power Type:\s*([^,]+)/i);
  if (powerTypeMatch) {
    let powerType = powerTypeMatch[1].trim();
    powerType = powerType.replace(/Internal Combustion Engine/i, 'Motor de Combustión Interna');
    parts.push(`Tipo de Motor: ${powerType}`);
  }
  
  // Extract displacement
  const displMatch = description.match(/Displacement \(l\):\s*([^,]+)/i);
  if (displMatch) {
    parts.push(`Cilindrada: ${displMatch[1].trim()} l`);
  }
  
  // Extract maximum power
  const maxPowerMatch = description.match(/Maximum Power \(kw\/rpm\):\s*([^,]+)/i);
  if (maxPowerMatch) {
    parts.push(`Potencia Máxima: ${maxPowerMatch[1].trim()} kw/rpm`);
  }
  
  // Extract horsepower
  const hpMatch = description.match(/(?:Horsepower \(hp\):\s*(\d+)|(\d+)\s*Hp)/i);
  if (hpMatch) {
    const hp = hpMatch[1] || hpMatch[2];
    parts.push(`Caballos de Fuerza: ${hp} HP`);
  }
  
  // Extract fuel type
  const fuelMatch = description.match(/fuel Type:\s*([^,]+)/i);
  if (fuelMatch) {
    let fuelType = fuelMatch[1].trim();
    fuelType = fuelType.replace(/Diesel/i, 'Diésel');
    parts.push(`Tipo de Combustible: ${fuelType}`);
  }
  
  // Extract fuel consumption
  const consumptionMatch = description.match(/Fuel Consumption \(g\/kwh\):\s*([^,]+)/i);
  if (consumptionMatch) {
    parts.push(`Consumo de Combustible: ${consumptionMatch[1].trim()} g/kwh`);
  }
  
  // Extract fuel capacity
  const capacityMatch = description.match(/Fuel Capacity \(l\):\s*([^,]+)/i);
  if (capacityMatch) {
    parts.push(`Capacidad de Combustible: ${capacityMatch[1].trim()}`);
  }
  
  // Extract transmission
  const transMatch = description.match(/Automatic Transmission/i);
  if (transMatch) {
    parts.push(`Transmisión: Automática`);
  }
  
  // Extract level information
  const levelMatch = description.match(/Level\s*([^,]+)/i);
  if (levelMatch) {
    let level = levelMatch[1].trim();
    level = level.replace(/up To (\d+mm)/i, 'hasta $1');
    parts.push(`Nivel: ${level}`);
  }
  
  // Extract passenger capacity
  const passengerMatch = description.match(/(\d+)\s*Passenger/i);
  if (passengerMatch) {
    parts.push(`Capacidad de Pasajeros: ${passengerMatch[1]} pasajeros`);
  }
  
  // Extract bucket capacity
  const bucketMatch = description.match(/Bucket Capacity \(m\s*³\):\s*([^,]+)/i);
  if (bucketMatch) {
    parts.push(`Capacidad del Cucharón: ${bucketMatch[1].trim()} m³`);
  }
  
  // Extract dimensions
  const dimMatch = description.match(/Length\*width\*height \(mm\):\s*(\d+)\s*\*\s*(\d+)\s*\*\s*(\d+)/i);
  if (dimMatch) {
    const [, length, width, height] = dimMatch;
    parts.push(`Dimensiones: ${length} × ${width} × ${height} mm (Largo × Ancho × Alto)`);
  }
  
  // Extract track width
  const trackMatch = description.match(/Track Width \(mm\):\s*(\d+)/i);
  if (trackMatch) {
    parts.push(`Ancho de Oruga: ${trackMatch[1]} mm`);
  }
  
  // Extract excavation depth
  const depthMatch = description.match(/Maximum Excavation Depth \(mm\):\s*(\d+)/i);
  if (depthMatch) {
    const depth = parseInt(depthMatch[1]).toLocaleString();
    parts.push(`Profundidad Máxima de Excavación: ${depth} mm`);
  }
  
  // Extract unloading height
  const heightMatch = description.match(/Maximum Unloading Height\(mm\):\s*(\d+)/i);
  if (heightMatch) {
    const height = parseInt(heightMatch[1]).toLocaleString();
    parts.push(`Altura Máxima de Descarga: ${height} mm`);
  }
  
  // Extract vehicle features
  const features: string[] = [];
  if (description.match(/All Wheel Disc Brakes/i)) {
    features.push('Frenos de disco en todas las ruedas');
  }
  if (description.match(/Cloth Interior/i)) {
    features.push('Tapizado de tela');
  }
  if (description.match(/Cruise Control/i)) {
    features.push('Control de crucero');
  }
  if (description.match(/Heat\/AC/i)) {
    features.push('Calefacción/AC');
  }
  if (description.match(/Rear Climate Controls/i)) {
    features.push('Controles de clima traseros');
  }
  
  if (features.length > 0) {
    parts.push(`Características: ${features.join(', ')}`);
  }
  
  // Extract condition
  if (description.match(/Super Clean Inside And Out/i)) {
    parts.push(`Estado: Súper limpio por dentro y por fuera`);
  }
  
  // If we have formatted parts, return them with header
  if (parts.length > 0) {
    return `Detalles del Equipo:\n\n${parts.join('\n')}`;
  }
  
  // If no specific patterns found, do basic translation
  let translated = description;
  Object.entries(translations).forEach(([english, spanish]) => {
    const regex = new RegExp(english, 'gi');
    translated = translated.replace(regex, spanish);
  });
  
  return translated;
}

// Function to translate Spanish descriptions to English
function translateSpanishToEnglish(spanishDescription: string): string {
  const spanishToEnglish: Record<string, string> = {
    'Detalles del Equipo:': 'Equipment Details:',
    'Ubicación:': 'Location:',
    'Año:': 'Year:',
    'Número de Serie:': 'Serial Number:',
    'VIN:': 'VIN:',
    'Lectura del Medidor:': 'Meter Reading:',
    'Kilometraje:': 'Mileage:',
    'Potencia:': 'Power:',
    'Motor:': 'Engine:',
    'Motor Diesel': 'Diesel Engine',
    'Motor a Gasolina': 'Gas Engine',
    'Motor Kubota Diesel': 'Kubota Diesel Engine',
    'Motor Diesel Caterpillar': 'Caterpillar Diesel Engine',
    'Transmisión:': 'Transmission:',
    'Automática': 'Automatic',
    'velocidades': 'speeds',
    'Tracción:': 'Drivetrain:',
    'Clima:': 'Climate:',
    'Calefacción/AC': 'Heat/AC',
    'Cabina:': 'Cabin:',
    'Vidrios completos': 'Full Glass',
    'Iluminación:': 'Lighting:',
    'Luces de trabajo': 'Work Lights',
    'Hidráulicos:': 'Hydraulics:',
    'Hidráulicos auxiliares': 'Auxiliary Hydraulics',
    'Balde:': 'Bucket:',
    'Balde de excavación': 'Digging Bucket',
    'Balde de descarga': 'Dump Bucket',
    'Balde de descarga lateral': 'Side Dump Bucket',
    'Ripper:': 'Ripper:',
    'Ripper incluido': 'Ripper Included',
    'Hoja:': 'Blade:',
    'Hoja incluida': 'Blade Included',
    'Tren de Rodaje:': 'Undercarriage:',
    'UC al': 'UC at',
    'Control:': 'Control:',
    'Control joystick': 'Joystick Control',
    'Capacidad:': 'Capacity:',
    'lbs': 'lbs',
    'Alcance:': 'Reach:',
    'pies máximo': 'ft max',
    'Neumáticos:': 'Tires:',
    'Neumáticos en buen estado': 'Good Tires',
    'Estado:': 'Condition:',
    'Máquina limpia': 'Clean Machine',
    'Operación:': 'Operation:',
    'Funciona y opera correctamente': 'Runs and Operates',
    'Disponibilidad:': 'Availability:',
    'Lista para trabajar': 'Ready for Work',
    'Estabilizadores:': 'Stabilizers:',
    'Estabilizadores duales': 'Dual Stabilizers',
    'Seguridad:': 'Safety:',
    'Sistema supresor de incendios': 'Fire Suppressant System',
    'Interior:': 'Interior:',
    'Asientos de cuero': 'Leather Seats',
    'Tecnología:': 'Technology:',
    'Sistema de navegación': 'Navigation System',
    'Comodidad:': 'Comfort:',
    'Asientos calefaccionados': 'Heated Seats',
    'Monitor de puntos ciegos': 'Blind Spot Monitor',
    'horas': 'hours',
    'km': 'km',
    'HP': 'HP',
    'Chile': 'Chile'
  };

  let englishDescription = spanishDescription;
  
  Object.entries(spanishToEnglish).forEach(([spanish, english]) => {
    const regex = new RegExp(spanish.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    englishDescription = englishDescription.replace(regex, english);
  });

  return englishDescription;
}

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
  
  // Precise classification system
  if (nameAndDesc.includes('golf cart') || nameAndDesc.includes('carrito de golf')) {
    specs.correctType = 'vehiculo-golf';
  } else if (nameAndDesc.includes('ripper tooth') || nameAndDesc.includes('diente') || nameAndDesc.includes('teeth')) {
    specs.correctType = 'repuesto';
  } else if (nameAndDesc.includes('rake attachment') || nameAndDesc.includes('implemento') || nameAndDesc.includes('attachment')) {
    specs.correctType = 'implemento';
  } else if (nameAndDesc.includes('ford explorer') || nameAndDesc.includes('jeep cherokee') || nameAndDesc.includes('peugeot') || nameAndDesc.includes('landtrek')) {
    specs.correctType = 'camioneta';
  } else if (nameAndDesc.includes('john deere') && (nameAndDesc.includes('tractor') || nameAndDesc.includes('6105e'))) {
    specs.correctType = 'tractor';
  } else if (nameAndDesc.includes('excavator') || nameAndDesc.includes('excavadora')) {
    specs.correctType = 'excavadora';
  } else if (nameAndDesc.includes('dozer') || nameAndDesc.includes('bulldozer')) {
    specs.correctType = 'bulldozer';
  } else if (nameAndDesc.includes('motor grader') || nameAndDesc.includes('motoniveladora')) {
    specs.correctType = 'motoniveladora';
  } else if (nameAndDesc.includes('wheel loader') || nameAndDesc.includes('cargador')) {
    specs.correctType = 'cargador';
  } else if (nameAndDesc.includes('water truck') || nameAndDesc.includes('camion agua')) {
    specs.correctType = 'camion';
  } else if (nameAndDesc.includes('dump truck') || nameAndDesc.includes('volquete') || nameAndDesc.includes('tri-axle')) {
    specs.correctType = 'camion-tolva';
  } else if (nameAndDesc.includes('sleeper tractor') || nameAndDesc.includes('tractor sleeper')) {
    specs.correctType = 'tractor';
  } else if (nameAndDesc.includes('mobile crane') || nameAndDesc.includes('grua movil')) {
    specs.correctType = 'grua';
  } else if (nameAndDesc.includes('bus') || nameAndDesc.includes('autobus')) {
    specs.correctType = 'autobus';
  } else if (nameAndDesc.includes('fuel truck') || nameAndDesc.includes('camion combustible')) {
    specs.correctType = 'camion';
  } else if (nameAndDesc.includes('trailer') || nameAndDesc.includes('remolque')) {
    specs.correctType = 'remolque';
  } else if (nameAndDesc.includes('vertical drill') || nameAndDesc.includes('perforadora')) {
    specs.correctType = 'perforadora';
  } else if (nameAndDesc.includes('telehandler') || nameAndDesc.includes('manipulador')) {
    specs.correctType = 'manipulador-telescopico';
  } else if (nameAndDesc.includes('compressor') || nameAndDesc.includes('compresor')) {
    specs.correctType = 'compresor';
  } else if (nameAndDesc.includes('concrete mixer') || nameAndDesc.includes('mezcladora')) {
    specs.correctType = 'mezcladora';
  } else if (nameAndDesc.includes('roller') || nameAndDesc.includes('rodillo')) {
    specs.correctType = 'rodillo';
  }

  return specs;
}

export default function MachineryDetail() {
  // Extract the ID from the URL
  const [, params] = useRoute('/machinery/:id');
  const [, setLocation] = useLocation();
  const machineryId = params?.id ? parseInt(params.id) : null;
  const [activeTab, setActiveTab] = useState('specs');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language, t } = useLanguage();
  const { openForm } = useRegistration();
  
  // Functions for button actions
  const handleOpenRegistration = () => {
    openForm();
  };
  
  const handleContactConsultant = () => {
    const phoneNumber = "56994275157";
    const message = language === 'es' 
      ? `Hola, estoy interesado en el lote "${translatedName}" de la subasta del 15 de julio. ¿Podrían darme más información?`
      : `Hello, I'm interested in the lot "${translatedName}" from the July 15 auction. Could you give me more information?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  // Scroll to top on page load - smooth scroll to prevent jarring movement
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [machineryId]);

  // Fetch the machinery data
  const { data: machinery, isLoading, isError } = useQuery<Machinery>({
    queryKey: [`/api/machinery/${machineryId}`],
    enabled: !!machineryId
  });

  // Navigation functions
  const goToNextImage = useCallback(() => {
    if (machinery?.gallery && machinery.gallery.length > 1) {
      const nextIndex = currentImageIndex < machinery.gallery.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(machinery.gallery[nextIndex]);
    }
  }, [currentImageIndex, machinery?.gallery]);

  const goToPrevImage = useCallback(() => {
    if (machinery?.gallery && machinery.gallery.length > 1) {
      const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : machinery.gallery.length - 1;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(machinery.gallery[prevIndex]);
    }
  }, [currentImageIndex, machinery?.gallery]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevImage();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToPrevImage, goToNextImage]);

  // Update selected image when machinery changes
  useEffect(() => {
    if (machinery?.gallery && machinery.gallery.length > 0) {
      setSelectedImage(machinery.gallery[0]);
      setCurrentImageIndex(0);
    }
  }, [machinery]);
  
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  if (isError || !machinery) {
    return <ErrorState />;
  }

  // Extract real specs from description
  const realSpecs = extractSpecsFromDescription(machinery.description, machinery.name);
  
  // Translate machinery name
  const translatedName = translateMachineryName(machinery.name, language);
  
  // Use extracted data or fallback to original data
  const displayYear = realSpecs.realYear || machinery.year;
  const displayBrand = realSpecs.realBrand || machinery.brand;
  const displayKilometers = realSpecs.kilometers || machinery.kilometers;
  const displayHours = realSpecs.hours || machinery.hours;
  // ALWAYS use database type - it's already correct
  const displayType = machinery.type;
  
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto p-2">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-xs mb-1">
          <Link href="/" className="text-gray-500 hover:text-primary">{t('nav.home')}</Link>
          <span className="mx-1 text-gray-400">/</span>
          <Link href="/#marketplace" className="text-gray-500 hover:text-primary">{t('nav.catalog')}</Link>
          <span className="mx-1 text-gray-400">/</span>
          <span className="text-gray-700 truncate">{translatedName}</span>
        </div>
        
        {/* Back to catalog button */}
        <div className="flex mb-4 mt-2">
          <button 
            onClick={() => {
              setLocation('/');
              setTimeout(() => {
                window.location.hash = '#marketplace';
              }, 100);
            }}
            className="text-gray-600 hover:text-primary flex items-center text-sm font-medium"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            {language === 'es' ? 'Volver al catálogo' : 'Back to catalog'}
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-2">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Left Column - Gallery and Basic Info */}
            <div className="lg:col-span-2">
              <div className="p-3">
                {/* Equipment Type & Status */}
                <div className="flex flex-wrap justify-between items-center mb-1">
                  <span className="text-xs text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                    {getTypeLabel(displayType, language)}
                  </span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                    <i className="fas fa-check-circle mr-0.5"></i>
                    {language === 'es' ? 'Disponible' : 'Available'}
                  </span>
                </div>
                
                {/* Title and Main Details */}
                <h1 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{translatedName}</h1>
                
                {/* Información eliminada - los usuarios verán los detalles en la descripción */}
                
                {/* Main Image Gallery */}
                <div className="relative w-full h-[450px] border border-gray-200 rounded-lg overflow-hidden mb-1">
                  <img 
                    src={(selectedImage || machinery.image).replace('https://auctiontechupload.s3.amazonaws.com/216/auction/2187/', '/api/images/')}
                    alt={translatedName}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      console.log('Error loading image:', selectedImage || machinery.image);
                      e.currentTarget.src = `https://placehold.co/600x450/1a1a1a/ffffff?text=${encodeURIComponent(translatedName.substring(0, 30))}`;
                    }}
                  />
                  
                  {/* Image Counter */}
                  {machinery.gallery && machinery.gallery.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {currentImageIndex + 1}/{machinery.gallery.length}
                    </div>
                  )}
                  
                  {/* Navigation arrows on image */}
                  {machinery.gallery && machinery.gallery.length > 1 && (
                    <>
                      <button 
                        onClick={goToPrevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full p-2 shadow-lg transition-all"
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      <button 
                        onClick={goToNextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full p-2 shadow-lg transition-all"
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Image Thumbnails - Full width scrollable */}
              <div className="px-3 w-full">
                {machinery.gallery && machinery.gallery.length > 1 && (
                  <div className="w-full">
                    <div className="text-center text-sm text-gray-600 mb-2">
                      {language === 'es' ? 'Navegue con las flechas del teclado o haga clic en las miniaturas' : 'Navigate with arrow keys or click thumbnails'}
                    </div>
                    
                    {/* Thumbnails */}
                    <div className="flex gap-2 overflow-x-auto pb-3 w-full">
                      {machinery.gallery.map((img, index) => (
                        <div 
                          key={index} 
                          className={`${currentImageIndex === index ? 'border-2 border-primary ring-2 ring-primary/20' : 'border border-gray-200'} rounded overflow-hidden flex-shrink-0 cursor-pointer transition-all hover:border-primary/50`}
                          onClick={() => {
                            setCurrentImageIndex(index);
                            setSelectedImage(img);
                          }}
                        >
                          <img
                            src={img.replace('https://auctiontechupload.s3.amazonaws.com/216/auction/2187/', '/api/images/')}
                            alt={`${translatedName} - Imagen ${index + 1}`}
                            className="w-20 h-16 object-cover"
                            onError={(e) => {
                              console.log('Error loading thumbnail:', img);
                              e.currentTarget.src = `https://placehold.co/80x64/1a1a1a/ffffff?text=${index + 1}`;
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Pricing and Details */}
            <div className="bg-gray-50 p-3">
              {/* Auction Information */}
              <div className="bg-white p-3 rounded-lg shadow-sm mb-3">
                <h2 className="text-base font-bold text-gray-900 mb-2">{language === 'en' ? 'Auction Information' : 'Información de Subasta'}</h2>
                
                <div className="space-y-2">
                  <div>
                    <h3 className="text-xs font-medium text-gray-700 mb-0.5">{language === 'en' ? 'Auction date' : 'Fecha de subasta'}</h3>
                    <p className="text-sm text-gray-800 font-medium">
                      <i className="fas fa-calendar mr-1 text-gray-400"></i>
                      {language === 'en' ? 'July 15, 2025' : '15 de julio, 2025'}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-medium text-gray-700 mb-0.5">{language === 'en' ? 'Auction house' : 'Casa de subastas'}</h3>
                    <p className="text-sm text-gray-800">North Country Auctions</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-medium text-gray-700 mb-0.5">{language === 'en' ? 'Location' : 'Ubicación'}</h3>
                    <p className="text-sm text-gray-800">Chile</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="grid gap-2 mb-3">
                <Button 
                  className="bg-primary hover:bg-primary/90 w-full py-2 h-auto text-sm"
                  onClick={handleOpenRegistration}
                >
                  <i className="fas fa-gavel mr-1"></i>
                  {language === 'en' ? 'Register for auction' : 'Registrarse para subasta'}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-300 w-full py-2 h-auto text-sm"
                  onClick={handleContactConsultant}
                >
                  <i className="fas fa-phone-alt mr-1"></i>
                  {language === 'en' ? 'Contact consultant' : 'Contactar consultor'}
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-gray-500 text-sm py-1"
                  onClick={() => {
                    setLocation('/');
                    setTimeout(() => {
                      window.location.hash = '#marketplace';
                    }, 100);
                  }}
                >
                  <i className="fas fa-arrow-left mr-1"></i>
                  {t('detail.back')}
                </Button>
              </div>
              
              {/* Tabs for Specs and Description */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="flex border-b">
                  <button 
                    className={`flex-1 py-2 px-2 text-sm font-medium ${activeTab === 'specs' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('specs')}
                  >
                    {t('detail.specs')}
                  </button>
                  <button 
                    className={`flex-1 py-2 px-2 text-sm font-medium ${activeTab === 'description' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('description')}
                  >
                    {t('detail.description')}
                  </button>
                </div>
                
                {activeTab === 'specs' && (
                  <div className="p-2">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-1 text-gray-600">{t('detail.brand')}:</td>
                          <td className="py-1 text-gray-900 font-medium">{displayBrand || 'N/A'}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1 text-gray-600">{language === 'en' ? 'Model' : 'Modelo'}:</td>
                          <td className="py-1 text-gray-900 font-medium">{realSpecs.model || machinery.name}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1 text-gray-600">{t('detail.year')}:</td>
                          <td className="py-1 text-gray-900 font-medium">{displayYear || 'N/A'}</td>
                        </tr>
                        {displayKilometers && (
                          <tr className="border-b">
                            <td className="py-1 text-gray-600">{language === 'en' ? 'Kilometers' : 'Kilómetros'}:</td>
                            <td className="py-1 text-gray-900 font-medium">{displayKilometers.toLocaleString()} km</td>
                          </tr>
                        )}
                        {displayHours && (
                          <tr className="border-b">
                            <td className="py-1 text-gray-600">{t('detail.hours')}:</td>
                            <td className="py-1 text-gray-900 font-medium">{displayHours} hrs</td>
                          </tr>
                        )}
                        <tr className="border-b">
                          <td className="py-1 text-gray-600">{t('detail.condition')}:</td>
                          <td className="py-1 text-gray-900 font-medium">
                            {machinery.condition === 'excellent' 
                              ? (language === 'en' ? 'Excellent' : 'Excelente')
                              : machinery.condition === 'good'
                              ? (language === 'en' ? 'Good' : 'Bueno')
                              : machinery.condition === 'fair'
                              ? (language === 'en' ? 'Fair' : 'Regular')
                              : machinery.condition}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-600">{language === 'en' ? 'Type' : 'Tipo'}:</td>
                          <td className="py-1 text-gray-900 font-medium">{getTypeLabel(displayType, language)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                
                {activeTab === 'description' && (
                  <div className="p-2">
                    <div className="space-y-3">
                      {/* Translated Technical Description */}
                      <div className="flex items-start gap-2">
                        <i className="fas fa-cogs text-primary mt-1"></i>
                        <div className="w-full">
                          <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            {translateAndFormatDescription(machinery.description, language)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Auction Info */}
                      <div className="flex items-start gap-2">
                        <i className="fas fa-gavel text-primary mt-1"></i>
                        <div>
                          <p className="font-medium text-gray-900">
                            {language === 'es' ? 'Información de Subasta' : 'Auction Information'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {language === 'es' 
                              ? 'Equipos disponibles subasta 15 de julio'
                              : 'Equipment available July 15 auction'
                            }
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {language === 'es' 
                              ? 'Fecha de subasta: 15 de julio, 2025'
                              : 'Auction date: July 15, 2025'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="h-96 w-full" />
          </div>
          <div>
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Error state component
function ErrorState() {
  const { language, t } = useLanguage();
  
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        {language === 'en' ? 'Equipment not found' : 'Equipo no encontrado'}
      </h1>
      <p className="text-gray-600 mb-4">
        {language === 'en' 
          ? 'The equipment you are looking for does not exist or has been removed.'
          : 'El equipo que buscas no existe o ha sido eliminado.'}
      </p>
      <Link href="/marketplace">
        <Button>{language === 'en' ? 'Back to catalog' : 'Volver al catálogo'}</Button>
      </Link>
    </div>
  );
}