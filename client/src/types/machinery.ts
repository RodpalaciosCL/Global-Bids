export interface Machinery {
  id: number;
  name: string;
  price: number;
  type: MachineryType;
  brand: string;
  year: number;
  hours: number | null;
  kilometers: number | null;
  condition: MachineryCondition;
  description: string;
  image: string;
  gallery?: string[];
  isSold: boolean;
  auctionDate?: string;
  priority?: number; // Para dar prioridad en los listados
}

export type MachineryType = 
  | 'excavator'      // Excavadora
  | 'truck'          // Camión
  | 'loader'         // Cargador frontal
  | 'generator'      // Generador
  | 'crane'          // Grúa
  | 'backhoe'        // Retroexcavadora
  | 'manlift'        // Plataforma Elevadora
  | 'heater'         // Calentador
  | 'bulldozer'      // Bulldozer
  | 'compactor'      // Compactador
  | 'driller'        // Perforadora
  | 'grader'         // Motoniveladora
  | 'scraper'        // Mototraílla
  | 'skidsteer'      // Minicargador
  | 'telehandler'    // Manipulador telescópico
  | 'dumper'         // Volquete
  | 'forklift'       // Montacargas
  | 'mixer'          // Mezcladora de concreto
  | 'paver'          // Pavimentadora
  | 'trencher'       // Zanjadora
  | 'welder'         // Soldadora
  | 'lightTower'     // Torre de Iluminación
  | 'pump'           // Bomba
  | 'compressor'     // Compresor
  | 'trailer'        // Remolque
  | 'attachment';    // Implemento/Accesorio

export type MachineryCondition = 
  | 'nuevo' 
  | 'usado';

export interface MachineryFilters {
  search?: string;
  type?: MachineryType;
  brand?: string;
  year?: number | string;
  minPrice?: number;
  maxPrice?: number;
  condition?: MachineryCondition;
}

export const typeLabels: Record<MachineryType, Record<'es' | 'en', string>> = {
  excavator: { es: 'Excavadora', en: 'Excavator' },
  truck: { es: 'Camión', en: 'Truck' },
  loader: { es: 'Cargador', en: 'Loader' },
  generator: { es: 'Generador', en: 'Generator' },
  crane: { es: 'Grúa', en: 'Crane' },
  backhoe: { es: 'Retroexcavadora', en: 'Backhoe' },
  manlift: { es: 'Plataforma Elevadora', en: 'Manlift' },
  heater: { es: 'Calentador', en: 'Heater' },
  bulldozer: { es: 'Bulldozer', en: 'Bulldozer' },
  compactor: { es: 'Compactador', en: 'Compactor' },
  driller: { es: 'Perforadora', en: 'Driller' },
  grader: { es: 'Motoniveladora', en: 'Grader' },
  scraper: { es: 'Mototraílla', en: 'Scraper' },
  skidsteer: { es: 'Minicargador', en: 'Skid Steer' },
  telehandler: { es: 'Manipulador Telescópico', en: 'Telehandler' },
  dumper: { es: 'Volquete', en: 'Dumper' },
  forklift: { es: 'Montacargas', en: 'Forklift' },
  mixer: { es: 'Mezcladora de Concreto', en: 'Concrete Mixer' },
  paver: { es: 'Pavimentadora', en: 'Paver' },
  trencher: { es: 'Zanjadora', en: 'Trencher' },
  welder: { es: 'Soldadora', en: 'Welder' },
  lightTower: { es: 'Torre de Iluminación', en: 'Light Tower' },
  pump: { es: 'Bomba', en: 'Pump' },
  compressor: { es: 'Compresor', en: 'Compressor' },
  trailer: { es: 'Remolque', en: 'Trailer' },
  attachment: { es: 'Implemento/Accesorio', en: 'Attachment' }
};

export const conditionLabels: Record<MachineryCondition, Record<'es' | 'en', string>> = {
  nuevo: { es: 'Nuevo', en: 'New' },
  usado: { es: 'Usado', en: 'Used' }
};
