import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { fadeIn, staggerContainer, slideUp } from '@/lib/animations';
import { MachineryCard } from './MachineryCard';
import { useQuery } from '@tanstack/react-query';
import { Machinery, MachineryFilters, MachineryType, MachineryCondition } from '@/types/machinery';

export function CatalogSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const [filters, setFilters] = useState<MachineryFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('price-asc');
  
  // Query for machinery with filters
  const { data: machineryData, isLoading, refetch } = useQuery({
    queryKey: ['/api/machinery', filters, currentPage, sortOrder],
    staleTime: 300000 // 5 minutes
  });
  
  const machinery = machineryData?.items || [];
  const totalPages = machineryData?.totalPages || 1;
  
  // Apply filters handler
  const handleApplyFilters = () => {
    setCurrentPage(1);
    refetch();
  };

  // Handle input change for search and price range
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    if (id === 'search') {
      setFilters(prev => ({ ...prev, search: value }));
    } else if (id === 'price-min') {
      setFilters(prev => ({ ...prev, minPrice: value ? parseInt(value) : undefined }));
    } else if (id === 'price-max') {
      setFilters(prev => ({ ...prev, maxPrice: value ? parseInt(value) : undefined }));
    }
  };

  // Handle select change for dropdown filters
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    if (id === 'sort-by') {
      setSortOrder(value);
      return;
    }
    
    const filterKey = id.split('-')[0];
    if (filterKey === 'type') {
      setFilters(prev => ({ ...prev, type: value as MachineryType || undefined }));
    } else if (filterKey === 'brand') {
      setFilters(prev => ({ ...prev, brand: value || undefined }));
    } else if (filterKey === 'year') {
      setFilters(prev => ({ ...prev, year: value || undefined }));
    } else if (filterKey === 'condition') {
      setFilters(prev => ({ ...prev, condition: value as MachineryCondition || undefined }));
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
      pageNumbers.push('...');
    }
  }
  
  return (
    <section id="catalogo" className="py-16 bg-accent" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-primary">Catálogo de Maquinarias</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600">Explora nuestra amplia selección de maquinaria pesada disponible para remate. Utiliza los filtros para encontrar exactamente lo que necesitas.</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Buscar por palabra clave</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="search" 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition" 
                    placeholder="Buscar maquinaria..."
                    onChange={handleInputChange}
                    value={filters.search || ''}
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </div>
              
              {/* Type filter */}
              <div>
                <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Maquinaria</label>
                <select 
                  id="type-filter" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                  onChange={handleSelectChange}
                  value={filters.type || ''}
                >
                  <option value="">Todos los tipos</option>
                  <option value="excavator">Excavadoras</option>
                  <option value="truck">Camiones</option>
                  <option value="loader">Cargadores</option>
                  <option value="generator">Generadores</option>
                  <option value="crane">Grúas</option>
                  <option value="backhoe">Retroexcavadoras</option>
                </select>
              </div>
              
              {/* Brand filter */}
              <div>
                <label htmlFor="brand-filter" className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                <select 
                  id="brand-filter" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                  onChange={handleSelectChange}
                  value={filters.brand || ''}
                >
                  <option value="">Todas las marcas</option>
                  <option value="caterpillar">Caterpillar</option>
                  <option value="volvo">Volvo</option>
                  <option value="komatsu">Komatsu</option>
                  <option value="john-deere">John Deere</option>
                  <option value="hitachi">Hitachi</option>
                  <option value="liebherr">Liebherr</option>
                </select>
              </div>
              
              {/* Year filter */}
              <div>
                <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-1">Año</label>
                <select 
                  id="year-filter" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                  onChange={handleSelectChange}
                  value={filters.year || ''}
                >
                  <option value="">Todos los años</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="older">2018 y anteriores</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
              {/* Price range */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rango de Precio</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="number" 
                    id="price-min" 
                    placeholder="Mínimo" 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                    onChange={handleInputChange}
                    value={filters.minPrice || ''}
                  />
                  <span className="text-gray-500">a</span>
                  <input 
                    type="number" 
                    id="price-max" 
                    placeholder="Máximo" 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                    onChange={handleInputChange}
                    value={filters.maxPrice || ''}
                  />
                </div>
              </div>
              
              {/* Condition filter */}
              <div>
                <label htmlFor="condition-filter" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select 
                  id="condition-filter" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                  onChange={handleSelectChange}
                  value={filters.condition || ''}
                >
                  <option value="">Todos</option>
                  <option value="excellent">Excelente</option>
                  <option value="good">Bueno</option>
                  <option value="fair">Regular</option>
                  <option value="repair">Para reparar</option>
                </select>
              </div>
              
              {/* Filter button */}
              <div className="lg:col-span-2 flex items-end">
                <button 
                  className="w-full bg-primary hover:bg-primary-light text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
                  onClick={handleApplyFilters}
                >
                  <i className="fas fa-filter mr-2"></i>Aplicar Filtros
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
              Mostrando <span className="font-semibold">{machinery.length}</span> resultados
            </div>
            <div className="flex items-center">
              <label htmlFor="sort-by" className="mr-2 text-gray-600">Ordenar por:</label>
              <select 
                id="sort-by" 
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                onChange={handleSelectChange}
                value={sortOrder}
              >
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="year-desc">Año: más reciente</option>
                <option value="year-asc">Año: más antiguo</option>
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
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md p-4 h-96">
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
              machinery.map((item: Machinery, index) => (
                <MachineryCard key={item.id} item={item} index={index} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <i className="fas fa-search text-gray-400 text-5xl mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-600">No se encontraron resultados</h3>
                <p className="text-gray-500 mt-2">Intenta con otros filtros de búsqueda</p>
              </div>
            )}
          </motion.div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div 
              className="mt-10 flex justify-center"
              variants={slideUp}
            >
              <nav className="inline-flex rounded-md shadow">
                <button 
                  className="px-4 py-2 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 text-gray-500 disabled:opacity-50"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                {pageNumbers.map((page, index) => (
                  typeof page === 'number' ? (
                    <button
                      key={index}
                      className={`px-4 py-2 ${
                        page === currentPage 
                          ? 'bg-primary text-white border border-primary' 
                          : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ) : (
                    <span key={index} className="px-4 py-2 bg-white border border-gray-300 text-gray-500">
                      {page}
                    </span>
                  )
                ))}
                
                <button 
                  className="px-4 py-2 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 text-gray-500 disabled:opacity-50"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </nav>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
