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
  | 'excavator' 
  | 'truck' 
  | 'loader' 
  | 'generator' 
  | 'crane'
  | 'backhoe'
  | 'manlift'
  | 'heater';

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
  heater: 'Calentador'
};

export const conditionLabels: Record<MachineryCondition, string> = {
  excellent: 'Excelente',
  good: 'Buen estado',
  fair: 'Regular',
  repair: 'Para reparar'
};
