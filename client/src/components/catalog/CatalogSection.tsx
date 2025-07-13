import { useRef, useState, useEffect } from "react";
import { MachineryCard } from "./MachineryCard";
import { MachineryCardCompact } from "./MachineryCardCompact";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Machinery,
  MachineryFilters,
  MachineryType,
  MachineryCondition,
} from "@shared/schema";
import { CurrencySelector } from "@/components/ui/CurrencySelector";
import { useLanguage } from "@/contexts/LanguageContext";

// Translation functions for machinery names and types
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
  
  // Apply translations
  Object.entries(translations).forEach(([english, spanish]) => {
    const regex = new RegExp(`\\b${english}\\b`, 'gi');
    translatedName = translatedName.replace(regex, spanish);
  });
  
  return translatedName;
}

// Function to map Spanish filter values to English database values
function mapFilterToDbValue(filterValue: string): string {
  const mapping: Record<string, string> = {
    'excavadora': 'excavator',
    'camion': 'truck', 
    'camion-tolva': 'truck', // Will filter by title containing "dump truck"
    'tolva': 'truck', // Will filter by title containing "dump trailer"
    'cargador': 'loader',
    'camioneta': 'truck', // Will filter by title containing specific vehicle names
    'tractor': 'tractor',
    'bulldozer': 'bulldozer',
    'motoniveladora': 'machinery', // Will filter by title containing "motor grader"
    'grua': 'crane',
    'rodillo': 'machinery', // Will filter by title containing "roller"
    'autobus': 'truck', // Will filter by title containing "bus"
    'remolque': 'truck', // Will filter by title containing "trailer"
    'perforadora': 'machinery',
    'manipulador-telescopico': 'machinery', // Will filter by title containing "telehandler"
    'compresor': 'machinery', // Will filter by title containing "compressor"
    'mezcladora': 'truck', // Will filter by title containing "concrete mixer"
    'vehiculo-golf': 'machinery', // Will filter by title containing "golf cart"
    'repuesto': 'machinery',
    'implemento': 'machinery'
  };
  
  return mapping[filterValue] || filterValue;
}

// Intelligent classification function (same as in card components)
function getCorrectType(name: string, description: string): string {
  const titleWords = name.toLowerCase();
  
  // ABSOLUTE PRIORITY: Title keywords are FINAL authority
  
  // Spanish titles FIRST (highest priority)
  if (titleWords.includes('camión tolva')) {
    return 'camion-tolva';
  }
  if (titleWords.includes('camión')) {
    return 'camion';
  }
  if (titleWords.includes('tractor') && !titleWords.includes('camión')) {
    return 'tractor'; // Real tractors like John Deere
  }
  
  // Excavators - HIGHEST PRIORITY  
  if (titleWords.includes('excavator')) {
    return 'excavadora';
  }
  
  // Concrete Mixer Trucks
  if (titleWords.includes('concrete mixer')) {
    return 'mezcladora';
  }
  
  // Rollers
  if (titleWords.includes('roller')) {
    return 'rodillo';
  }
  
  // Crawler Dumpers (oruga tolva)
  if (titleWords.includes('crawler dumper') || titleWords.includes('crawler dump')) {
    return 'tolva';
  }
  
  // English truck types - must be explicit and different types
  if (titleWords.includes('sleeper tractor')) {
    return 'camion'; // These are trucks, not tractors
  }
  
  // Vehicles - Cherokee, Explorer, etc.
  if (titleWords.includes('cherokee') || titleWords.includes('explorer') || 
      titleWords.includes('peugeot') || titleWords.includes('landtrek') ||
      titleWords.includes('armored car')) {
    return 'camioneta';
  }
  
  // Loaders including Self Loader
  if (titleWords.includes('self loader')) {
    return 'camion'; // Self loaders are trucks
  }
  if (titleWords.includes('loader') || titleWords.includes('wheel loader')) {
    return 'cargador';
  }
  
  // Motor Graders  
  if (titleWords.includes('motor grader') || titleWords.includes('grader')) {
    return 'motoniveladora';
  }
  
  // Water Trucks - specific type
  if (titleWords.includes('water truck')) {
    return 'camion';
  }
  
  // Dump Trucks vs Dump Trailers
  if (titleWords.includes('dump truck')) {
    return 'camion-tolva';
  } else if (titleWords.includes('dump trailer') || titleWords.includes('tri-axle dump trailer')) {
    return 'tolva';
  }
  
  // Haul Trucks (special category)
  if (titleWords.includes('haul truck') || titleWords.includes('articulated haul truck')) {
    return 'camion-tolva';
  }
  
  // Rock Trucks  
  if (titleWords.includes('rock truck') || titleWords.includes('rigid rock truck')) {
    return 'camion-tolva';
  }
  
  // Other specific equipment
  if (titleWords.includes('bulldozer') || titleWords.includes('dozer')) {
    return 'bulldozer';
  }
  
  if (titleWords.includes('crane')) {
    return 'grua';
  }
  
  if (titleWords.includes('telehandler')) {
    return 'manipulador-telescopico';
  }
  
  if (titleWords.includes('compressor')) {
    return 'compresor';
  }
  
  if (titleWords.includes('golf cart')) {
    return 'vehiculo-golf';
  }
  
  // Lowbed Trailer
  if (titleWords.includes('lowbed trailer')) {
    return 'remolque';
  }
  
  if (titleWords.includes('trailer') && !titleWords.includes('dump')) {
    return 'remolque';
  }
  
  if (titleWords.includes('bus')) {
    return 'autobus';
  }
  
  // Generic trucks
  if (titleWords.includes('truck')) {
    return 'camion';
  }
  
  // Only check description for very specific parts/attachments
  const nameAndDesc = (name + ' ' + description).toLowerCase();
  if (nameAndDesc.includes('ripper tooth') || nameAndDesc.includes('rake attachment')) {
    return 'repuesto';
  }
  
  // Fallback to original type
  return 'machinery';
}

export function CatalogSection() {
  const catalogStartRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<MachineryFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [limit] = useState(40); // 40 lotes por página

  const [refreshKey] = useState(Date.now());



  // Build query URL with parameters (removed price filters)
  const buildQueryUrl = () => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.type) params.append('type', filters.type);
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.year) params.append('year', filters.year);
    if (filters.condition) params.append('condition', filters.condition);
    params.append('sort', sortOrder);
    params.append('page', currentPage.toString());
    params.append('limit', limit.toString());

    
    return `/api/machinery?${params.toString()}`;
  };

  // Query for machinery with filters
  const {
    data: machineryData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['machinery', buildQueryUrl(), refreshKey],
    queryFn: async () => {
      const url = buildQueryUrl();
      console.log('Fetching from:', url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Received data:', data);
      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  // Define and type the result properly
  interface MachineryResponse {
    items: Machinery[];
    total: number;
    totalPages: number;
  }
  
  // Apply intelligent classification, translations and client-side filtering
  let machinery = (machineryData?.items || []).map(item => ({
    ...item,
    correctType: getCorrectType(item.name, item.description),
    translatedName: translateMachineryName(item.name, language)
  }));
  
  // Apply client-side type filter based on intelligent classification
  if (filters.type) {
    machinery = machinery.filter(item => {
      // Direct match with intelligent classification
      if (item.correctType === filters.type) return true;
      
      // Special filtering for specific Spanish categories that need title analysis
      const titleLower = item.name.toLowerCase();
      
      switch (filters.type) {
        case 'camion-tolva':
          return titleLower.includes('dump truck') || titleLower.includes('haul truck') || titleLower.includes('rock truck');
        case 'tolva':
          return titleLower.includes('dump trailer') || titleLower.includes('dumper');
        case 'motoniveladora':
          return titleLower.includes('motor grader') || titleLower.includes('grader');
        case 'rodillo':
          return titleLower.includes('roller');
        case 'camioneta':
          return titleLower.includes('cherokee') || titleLower.includes('explorer') || 
                 titleLower.includes('peugeot') || titleLower.includes('pickup') ||
                 titleLower.includes('landtrek');
        case 'autobus':
          return titleLower.includes('bus');
        case 'remolque':
          return titleLower.includes('trailer');
        case 'compresor':
          return titleLower.includes('compressor');
        case 'manipulador-telescopico':
          return titleLower.includes('telehandler');
        case 'vehiculo-golf':
          return titleLower.includes('golf cart');
        case 'mezcladora':
          return titleLower.includes('concrete mixer');
        case 'repuesto':
          return titleLower.includes('attachment') || titleLower.includes('tooth') || titleLower.includes('rake');
        default:
          return item.type === filters.type;
      }
    });
  }
  
  const totalPages = machineryData?.totalPages || 1;

  // Debug logs - only show important info
  if (machinery?.length > 0) {
    console.log(`✅ Loaded ${machinery.length} machinery items successfully`);
  }

  // Apply filters handler
  const handleApplyFilters = () => {
    setCurrentPage(1);
    refetch();
  };

  // Handle page change with instant scroll to marketplace top
  const handlePageChange = (newPage: number) => {
    // Instant scroll to avoid any visual flash or bounce
    const marketplaceSection = document.getElementById('marketplace');
    if (marketplaceSection) {
      // Instant scroll without animation
      marketplaceSection.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    // Then change page
    setCurrentPage(newPage);
  };

  // Handle input change for search only (removed price filters)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "search") {
      setFilters((prev) => ({ ...prev, search: value }));
    }
  };

  // Handle select change for dropdown filters
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (id === "sort-by") {
      setSortOrder(value);
      return;
    }

    // Handle equipment family filters (both mobile and desktop)
    if (id === "type-filter-mobile" || id === "type-filter-desktop") {
      setFilters((prev) => ({
        ...prev,
        type: (value as MachineryType) || undefined,
      }));
      return;
    }

    if (id === "condition-filter-desktop") {
      setFilters((prev) => ({
        ...prev,
        condition: (value as MachineryCondition) || undefined,
      }));
      return;
    }

    const filterKey = id.split("-")[0];
    if (filterKey === "type") {
      setFilters((prev) => ({
        ...prev,
        type: (value as MachineryType) || undefined,
      }));
    } else if (filterKey === "brand") {
      setFilters((prev) => ({ ...prev, brand: value || undefined }));
    } else if (filterKey === "year") {
      setFilters((prev) => ({ ...prev, year: value || undefined }));
    } else if (filterKey === "condition") {
      setFilters((prev) => ({
        ...prev,
        condition: (value as MachineryCondition) || undefined,
      }));
    }
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageNumbers.push(i);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pageNumbers.push("...");
    }
  }

  return (
    <section id="marketplace" className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-primary">
            {t('catalog.title')}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600">
            {t('catalog.subtitle')}
          </p>
        </div>

        <div className="catalog-wrapper">
          {/* Filters */}
          <div className="filters mb-8 p-6 bg-white rounded-lg shadow-md">
            {/* Mobile view */}
            <div className="md:hidden">
              {/* Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('catalog.search')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                    placeholder={language === 'es' ? "Buscar por palabra clave..." : "Search by keyword..."}
                    onChange={handleInputChange}
                    value={filters.search || ""}
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                {/* Equipment Family filter */}
                <div>
                  <label
                    htmlFor="type-filter-mobile"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {language === 'es' ? 'Familia de equipos' : 'Equipment Family'}
                  </label>
                  <select
                    id="type-filter-mobile"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                    onChange={handleSelectChange}
                    value={filters.type || ""}
                  >
                    <option value="">{language === 'es' ? 'Todas las familias' : 'All families'}</option>
                    <option value="excavadora">{language === 'es' ? 'Excavadora' : 'Excavator'}</option>
                    <option value="camion">{language === 'es' ? 'Camión' : 'Truck'}</option>
                    <option value="camion-tolva">{language === 'es' ? 'Camión Tolva' : 'Dump Truck'}</option>
                    <option value="tolva">{language === 'es' ? 'Tolva' : 'Dump Trailer'}</option>
                    <option value="cargador">{language === 'es' ? 'Cargador' : 'Loader'}</option>
                    <option value="camioneta">{language === 'es' ? 'Camioneta' : 'Pickup Truck'}</option>
                    <option value="tractor">{language === 'es' ? 'Tractor' : 'Tractor'}</option>
                    <option value="bulldozer">{language === 'es' ? 'Bulldozer' : 'Bulldozer'}</option>
                    <option value="motoniveladora">{language === 'es' ? 'Motoniveladora' : 'Motor Grader'}</option>
                    <option value="grua">{language === 'es' ? 'Grúa' : 'Crane'}</option>
                    <option value="autobus">{language === 'es' ? 'Autobús' : 'Bus'}</option>
                    <option value="remolque">{language === 'es' ? 'Remolque' : 'Trailer'}</option>
                    <option value="perforadora">{language === 'es' ? 'Perforadora' : 'Drill'}</option>
                    <option value="manipulador-telescopico">{language === 'es' ? 'Manipulador Telescópico' : 'Telehandler'}</option>
                    <option value="compresor">{language === 'es' ? 'Compresor' : 'Compressor'}</option>
                    <option value="mezcladora">{language === 'es' ? 'Mezcladora' : 'Concrete Mixer'}</option>
                    <option value="rodillo">{language === 'es' ? 'Rodillo' : 'Roller'}</option>
                    <option value="vehiculo-golf">{language === 'es' ? 'Vehículo de Golf' : 'Golf Cart'}</option>
                    <option value="repuesto">{language === 'es' ? 'Repuesto' : 'Spare Part'}</option>
                    <option value="implemento">{language === 'es' ? 'Implemento' : 'Attachment'}</option>
                  </select>
                </div>
                

                


                {/* Filter button */}
                <button
                  className="w-full bg-primary hover:bg-primary-light text-white font-semibold px-4 py-3 rounded-lg transition duration-300 mt-2"
                  onClick={handleApplyFilters}
                >
                  <i className="fas fa-filter mr-2"></i>{language === 'es' ? 'Aplicar Filtros' : 'Apply Filters'}
                </button>
              </div>
            </div>
            
            {/* Desktop view */}
            <div className="hidden md:block">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('catalog.search')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="search"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                      placeholder={language === 'es' ? "Buscar por palabra clave..." : "Search by keyword..."}
                      onChange={handleInputChange}
                      value={filters.search || ""}
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400">
                      <i className="fas fa-search"></i>
                    </div>
                  </div>
                </div>

                {/* Equipment Family filter */}
                <div>
                  <label
                    htmlFor="type-filter-desktop"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {language === 'es' ? 'Familia de equipos' : 'Equipment Family'}
                  </label>
                  <select
                    id="type-filter-desktop"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                    onChange={handleSelectChange}
                    value={filters.type || ""}
                  >
                    <option value="">{language === 'es' ? 'Todas las familias' : 'All families'}</option>
                    <option value="excavadora">{language === 'es' ? 'Excavadora' : 'Excavator'}</option>
                    <option value="camion">{language === 'es' ? 'Camión' : 'Truck'}</option>
                    <option value="camion-tolva">{language === 'es' ? 'Camión Tolva' : 'Dump Truck'}</option>
                    <option value="tolva">{language === 'es' ? 'Tolva' : 'Dump Trailer'}</option>
                    <option value="cargador">{language === 'es' ? 'Cargador' : 'Loader'}</option>
                    <option value="camioneta">{language === 'es' ? 'Camioneta' : 'Pickup Truck'}</option>
                    <option value="tractor">{language === 'es' ? 'Tractor' : 'Tractor'}</option>
                    <option value="bulldozer">{language === 'es' ? 'Bulldozer' : 'Bulldozer'}</option>
                    <option value="motoniveladora">{language === 'es' ? 'Motoniveladora' : 'Motor Grader'}</option>
                    <option value="grua">{language === 'es' ? 'Grúa' : 'Crane'}</option>
                    <option value="autobus">{language === 'es' ? 'Autobús' : 'Bus'}</option>
                    <option value="remolque">{language === 'es' ? 'Remolque' : 'Trailer'}</option>
                    <option value="perforadora">{language === 'es' ? 'Perforadora' : 'Drill'}</option>
                    <option value="manipulador-telescopico">{language === 'es' ? 'Manipulador Telescópico' : 'Telehandler'}</option>
                    <option value="compresor">{language === 'es' ? 'Compresor' : 'Compressor'}</option>
                    <option value="mezcladora">{language === 'es' ? 'Mezcladora' : 'Concrete Mixer'}</option>
                    <option value="rodillo">{language === 'es' ? 'Rodillo' : 'Roller'}</option>
                    <option value="vehiculo-golf">{language === 'es' ? 'Vehículo de Golf' : 'Golf Cart'}</option>
                    <option value="repuesto">{language === 'es' ? 'Repuesto' : 'Spare Part'}</option>
                    <option value="implemento">{language === 'es' ? 'Implemento' : 'Attachment'}</option>
                  </select>
                </div>

                {/* Condition filter */}
                <div>
                  <label
                    htmlFor="condition-filter-desktop"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {language === 'es' ? 'Condición' : 'Condition'}
                  </label>
                  <select
                    id="condition-filter-desktop"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                    onChange={handleSelectChange}
                    value={filters.condition || ""}
                  >
                    <option value="">{language === 'es' ? 'Todas las condiciones' : 'All conditions'}</option>
                    <option value="excellent">{language === 'es' ? 'Excelente' : 'Excellent'}</option>
                    <option value="good">{language === 'es' ? 'Bueno' : 'Good'}</option>
                    <option value="fair">{language === 'es' ? 'Regular' : 'Fair'}</option>
                    <option value="repair">{language === 'es' ? 'Para reparar' : 'For repair'}</option>
                  </select>
                </div>
                

              </div>
              


              <div className="mt-4 flex justify-end">
                {/* Filter button */}
                <button
                  className="bg-primary hover:bg-primary-light text-white font-semibold px-4 py-2 rounded-lg transition duration-300 w-full md:w-auto"
                  onClick={handleApplyFilters}
                >
                  <i className="fas fa-filter mr-2"></i>{language === 'es' ? 'Aplicar Filtros' : 'Apply Filters'}
                </button>
              </div>
            </div>
          </div>

          {/* Results info - Scroll anchor point */}
          <div
            ref={catalogStartRef}
            className="flex flex-col md:flex-row justify-between items-center mb-6"
          >
            <div className="text-gray-600 mb-3 md:mb-0">
              {language === 'es' ? 'Mostrando' : 'Showing'}{" "}
              <span className="font-semibold">{machinery.length}</span>{" "}
              {language === 'es' ? 'resultados' : 'results'}
            </div>
            <div className="flex items-center">
              <label htmlFor="sort-by" className="mr-2 text-gray-600">
                {language === 'es' ? 'Ordenar por:' : 'Sort by:'}
              </label>
              <select
                id="sort-by"
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                onChange={handleSelectChange}
                value={sortOrder}
              >
                <option value="name-asc">{language === 'es' ? 'Nombre: A-Z' : 'Name: A-Z'}</option>
                <option value="name-desc">{language === 'es' ? 'Nombre: Z-A' : 'Name: Z-A'}</option>
                <option value="condition-desc">{language === 'es' ? 'Condición: mejor primero' : 'Condition: best first'}</option>
              </select>
            </div>
          </div>

          {/* Catalog grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md p-4 h-96"
                >
                  <div className="animate-pulse">
                    <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="flex justify-between mt-4">
                      <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                      <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : machinery.length > 0 ? (
              machinery.map((item: Machinery & { translatedName: string }, index: number) => (
                <MachineryCardCompact key={item.id} item={{ ...item, name: item.translatedName }} index={index} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <i className="fas fa-search text-gray-400 text-5xl mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-600">
                  {language === 'es' ? 'No se encontraron resultados' : 'No results found'}
                </h3>
                <p className="text-gray-500 mt-2">
                  {language === 'es' ? 'Intenta con otros filtros de búsqueda' : 'Try with different search filters'}
                </p>
              </div>
            )}
          </div>

          {/* Paginación normal con números */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              {/* Botón anterior */}
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    handlePageChange(currentPage - 1);
                  }
                }}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                ‹
              </button>

              {/* Números de página */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === pageNumber
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              {/* Botón siguiente */}
              <button
                onClick={() => {
                  if (currentPage < totalPages) {
                    handlePageChange(currentPage + 1);
                  }
                }}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
