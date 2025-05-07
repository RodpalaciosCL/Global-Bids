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
  | 'excellent' 
  | 'good' 
  | 'fair' 
  | 'repair';

export interface MachineryFilters {
  search?: string;
  type?: MachineryType;
  brand?: string;
  year?: number | string;
  minPrice?: number;
  maxPrice?: number;
  condition?: MachineryCondition;
}

export const typeLabels: Record<MachineryType, string> = {
  excavator: 'Excavadora',
  truck: 'Camión',
  loader: 'Cargador',
  generator: 'Generador',
  crane: 'Grúa',
  backhoe: 'Retroexcavadora',
  manlift: 'Plataforma Elevadora',
  heater: 'Calentador',
  bulldozer: 'Bulldozer',
  compactor: 'Compactador',
  driller: 'Perforadora',
  grader: 'Motoniveladora',
  scraper: 'Mototraílla',
  skidsteer: 'Minicargador',
  telehandler: 'Manipulador Telescópico',
  dumper: 'Volquete',
  forklift: 'Montacargas',
  mixer: 'Mezcladora de Concreto',
  paver: 'Pavimentadora',
  trencher: 'Zanjadora',
  welder: 'Soldadora',
  lightTower: 'Torre de Iluminación',
  pump: 'Bomba',
  compressor: 'Compresor',
  trailer: 'Remolque',
  attachment: 'Implemento/Accesorio'
};

export const conditionLabels: Record<MachineryCondition, string> = {
  excellent: 'Excelente',
  good: 'Buen estado',
  fair: 'Regular',
  repair: 'Para reparar'
};
