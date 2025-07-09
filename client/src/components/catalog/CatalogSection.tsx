import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { fadeIn, staggerContainer, slideUp } from "@/lib/animations";
import { MachineryCard } from "./MachineryCard";
import { MachineryCardCompact } from "./MachineryCardCompact";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Machinery,
  MachineryFilters,
  MachineryType,
  MachineryCondition,
} from "@/types/machinery";
import { CurrencySelector } from "@/components/ui/CurrencySelector";
import { useLanguage } from "@/contexts/LanguageContext";

export function CatalogSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { t, language } = useLanguage();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<MachineryFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("price-asc");
  const [limit] = useState(12);

  const [refreshKey, setRefreshKey] = useState(Date.now());

  // Build query URL with parameters
  const buildQueryUrl = () => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.type) params.append('type', filters.type);
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.year) params.append('year', filters.year);
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
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
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  // Define and type the result properly
  interface MachineryResponse {
    items: Machinery[];
    totalPages: number;
  }
  
  const machinery = machineryData ? (machineryData as MachineryResponse).items || [] : [];
  const totalPages = machineryData ? (machineryData as MachineryResponse).totalPages || 1 : 1;

  // Apply filters handler
  const handleApplyFilters = () => {
    setCurrentPage(1);
    refetch();
  };

  // Handle input change for search and price range
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "search") {
      setFilters((prev) => ({ ...prev, search: value }));
    } else if (id === "price-min") {
      setFilters((prev) => ({
        ...prev,
        minPrice: value ? parseInt(value) : undefined,
      }));
    } else if (id === "price-max") {
      setFilters((prev) => ({
        ...prev,
        maxPrice: value ? parseInt(value) : undefined,
      }));
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
    <section id="catalogo" className="py-20 bg-accent" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-primary">
            {t('catalog.title')}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600">
            {t('catalog.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="catalog-wrapper"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Filters */}
          <motion.div
            className="filters mb-8 p-6 bg-white rounded-lg shadow-md"
            variants={slideUp}
          >
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
                    <option value="excavator">{language === 'es' ? 'Excavadora' : 'Excavator'}</option>
                    <option value="truck">{language === 'es' ? 'Camión' : 'Truck'}</option>
                    <option value="loader">{language === 'es' ? 'Cargador' : 'Loader'}</option>
                    <option value="generator">{language === 'es' ? 'Generador' : 'Generator'}</option>
                    <option value="crane">{language === 'es' ? 'Grúa' : 'Crane'}</option>
                    <option value="backhoe">{language === 'es' ? 'Retroexcavadora' : 'Backhoe'}</option>
                    <option value="bulldozer">{language === 'es' ? 'Bulldozer' : 'Bulldozer'}</option>
                    <option value="manlift">{language === 'es' ? 'Plataforma Elevadora' : 'Manlift'}</option>
                    <option value="forklift">{language === 'es' ? 'Montacargas' : 'Forklift'}</option>
                    <option value="telehandler">{language === 'es' ? 'Manipulador Telescópico' : 'Telehandler'}</option>
                    <option value="compactor">{language === 'es' ? 'Compactador' : 'Compactor'}</option>
                    <option value="grader">{language === 'es' ? 'Motoniveladora' : 'Grader'}</option>
                    <option value="scraper">{language === 'es' ? 'Mototraílla' : 'Scraper'}</option>
                    <option value="skidsteer">{language === 'es' ? 'Minicargador' : 'Skid Steer'}</option>
                    <option value="dumper">{language === 'es' ? 'Volquete' : 'Dumper'}</option>
                    <option value="mixer">{language === 'es' ? 'Mezcladora de Concreto' : 'Concrete Mixer'}</option>
                    <option value="paver">{language === 'es' ? 'Pavimentadora' : 'Paver'}</option>
                    <option value="trencher">{language === 'es' ? 'Zanjadora' : 'Trencher'}</option>
                    <option value="welder">{language === 'es' ? 'Soldadora' : 'Welder'}</option>
                    <option value="lightTower">{language === 'es' ? 'Torre de Iluminación' : 'Light Tower'}</option>
                    <option value="pump">{language === 'es' ? 'Bomba' : 'Pump'}</option>
                    <option value="compressor">{language === 'es' ? 'Compresor' : 'Compressor'}</option>
                    <option value="trailer">{language === 'es' ? 'Remolque' : 'Trailer'}</option>
                    <option value="attachment">{language === 'es' ? 'Implemento/Accesorio' : 'Attachment'}</option>
                  </select>
                </div>
                
                {/* Price range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'es' ? 'Rango de Precio' : 'Price Range'}
                  </label>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="number"
                      id="price-min"
                      placeholder={language === 'es' ? "Mínimo" : "Minimum"}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                      onChange={handleInputChange}
                      value={filters.minPrice || ""}
                    />
                    <span className="text-gray-500">{language === 'es' ? "a" : "to"}</span>
                    <input
                      type="number"
                      id="price-max"
                      placeholder={language === 'es' ? "Máximo" : "Maximum"}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                      onChange={handleInputChange}
                      value={filters.maxPrice || ""}
                    />
                  </div>
                  <div className="flex justify-end">
                    <CurrencySelector />
                  </div>
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
              <div className="grid md:grid-cols-4 gap-4">
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
                    <option value="excavator">{language === 'es' ? 'Excavadora' : 'Excavator'}</option>
                    <option value="truck">{language === 'es' ? 'Camión' : 'Truck'}</option>
                    <option value="loader">{language === 'es' ? 'Cargador' : 'Loader'}</option>
                    <option value="generator">{language === 'es' ? 'Generador' : 'Generator'}</option>
                    <option value="crane">{language === 'es' ? 'Grúa' : 'Crane'}</option>
                    <option value="backhoe">{language === 'es' ? 'Retroexcavadora' : 'Backhoe'}</option>
                    <option value="bulldozer">{language === 'es' ? 'Bulldozer' : 'Bulldozer'}</option>
                    <option value="manlift">{language === 'es' ? 'Plataforma Elevadora' : 'Manlift'}</option>
                    <option value="forklift">{language === 'es' ? 'Montacargas' : 'Forklift'}</option>
                    <option value="telehandler">{language === 'es' ? 'Manipulador Telescópico' : 'Telehandler'}</option>
                    <option value="compactor">{language === 'es' ? 'Compactador' : 'Compactor'}</option>
                    <option value="grader">{language === 'es' ? 'Motoniveladora' : 'Grader'}</option>
                    <option value="scraper">{language === 'es' ? 'Mototraílla' : 'Scraper'}</option>
                    <option value="skidsteer">{language === 'es' ? 'Minicargador' : 'Skid Steer'}</option>
                    <option value="dumper">{language === 'es' ? 'Volquete' : 'Dumper'}</option>
                    <option value="mixer">{language === 'es' ? 'Mezcladora de Concreto' : 'Concrete Mixer'}</option>
                    <option value="paver">{language === 'es' ? 'Pavimentadora' : 'Paver'}</option>
                    <option value="trencher">{language === 'es' ? 'Zanjadora' : 'Trencher'}</option>
                    <option value="welder">{language === 'es' ? 'Soldadora' : 'Welder'}</option>
                    <option value="lightTower">{language === 'es' ? 'Torre de Iluminación' : 'Light Tower'}</option>
                    <option value="pump">{language === 'es' ? 'Bomba' : 'Pump'}</option>
                    <option value="compressor">{language === 'es' ? 'Compresor' : 'Compressor'}</option>
                    <option value="trailer">{language === 'es' ? 'Remolque' : 'Trailer'}</option>
                    <option value="attachment">{language === 'es' ? 'Implemento/Accesorio' : 'Attachment'}</option>
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
                
                {/* Price range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'es' ? 'Rango de Precio' : 'Price Range'}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      id="price-min"
                      placeholder={language === 'es' ? "Mínimo" : "Minimum"}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                      onChange={handleInputChange}
                      value={filters.minPrice || ""}
                    />
                    <span className="text-gray-500">{language === 'es' ? "a" : "to"}</span>
                    <input
                      type="number"
                      id="price-max"
                      placeholder={language === 'es' ? "Máximo" : "Maximum"}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                      onChange={handleInputChange}
                      value={filters.maxPrice || ""}
                    />
                  </div>
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
          </motion.div>

          {/* Results info */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mb-6"
            variants={slideUp}
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
                <option value="price-asc">{language === 'es' ? 'Precio: menor a mayor' : 'Price: low to high'}</option>
                <option value="price-desc">{language === 'es' ? 'Precio: mayor a menor' : 'Price: high to low'}</option>
                <option value="year-desc">{language === 'es' ? 'Año: más reciente' : 'Year: newest'}</option>
                <option value="year-asc">{language === 'es' ? 'Año: más antiguo' : 'Year: oldest'}</option>
              </select>
            </div>
          </motion.div>

          {/* Catalog grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            variants={staggerContainer}
          >
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
              machinery.slice(0, 6).map((item: Machinery, index: number) => (
                <MachineryCardCompact key={item.id} item={item} index={index} />
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
          </motion.div>

          {/* Sin paginación por solicitud del cliente */}
        </motion.div>
      </div>
    </section>
  );
}
