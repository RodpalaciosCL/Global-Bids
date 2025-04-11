import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useIsMobile } from '@/hooks/use-mobile';

export function ActivosSection() {
  const isMobile = useIsMobile();

  const assetCategories = [
    { 
      title: "Equipos de Construcción", 
      description: "Maquinaria pesada para construcción de alta calidad", 
      icon: "fa-truck-pickup",
      image: "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    { 
      title: "Equipos Mineros", 
      description: "Maquinaria especializada para operaciones mineras", 
      icon: "fa-hard-hat",
      image: "https://images.pexels.com/photos/2102645/pexels-photo-2102645.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    { 
      title: "Generadores", 
      description: "Soluciones de generación eléctrica para cualquier escala", 
      icon: "fa-bolt",
      image: "https://images.pexels.com/photos/3856395/pexels-photo-3856395.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    { 
      title: "12 Online", 
      description: "Acceso a activos con disponibilidad inmediata", 
      icon: "fa-globe",
      image: "https://images.pexels.com/photos/1181281/pexels-photo-1181281.jpeg?auto=compress&cs=tinysrgb&w=1600"
    }
  ];

  return (
    <section id="activos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Activos Disponibles</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Abrimos el mercado latinoamericano para equipos, piezas, partes y otros activos de alta calidad
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {assetCategories.map((category, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              custom={index * 0.1}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="h-48 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 bg-primary rounded-lg text-white">
                      <i className={`fas ${category.icon}`}></i>
                    </div>
                    <h3 className="text-white font-bold text-xl">{category.title}</h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">{category.description}</p>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      <i className="fas fa-tag mr-1"></i> {Math.floor(Math.random() * 50) + 10} en stock
                    </span>
                  </div>
                  
                  <motion.a
                    href="#catalogo"
                    className="text-primary font-medium flex items-center hover:underline"
                    whileHover={{ x: 5 }}
                  >
                    Ver detalles
                    <i className="fas fa-arrow-right ml-2 text-xs"></i>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Todos nuestros activos incluyen precios en CLP y USD, con validación y certificación de calidad
          </p>
          <motion.a
            href="#catalogo"
            className="bg-primary text-white px-8 py-4 rounded-full font-bold inline-flex items-center shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-search mr-2"></i>
            Ver todos los activos
          </motion.a>
        </motion.div>

        <div className="bg-white p-6 rounded-xl shadow-md mt-16">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full text-primary mr-4">
              <i className="fas fa-lightbulb text-xl"></i>
            </div>
            <h3 className="font-bold text-xl">¿Por qué elegir Global Bids?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="font-bold text-lg mb-2 flex items-center">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span> 
                Rentabilidad
              </div>
              <p className="text-gray-600">Mejores precios del mercado con garantía de calidad en todos nuestros activos</p>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="font-bold text-lg mb-2 flex items-center">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span> 
                Rapidez
              </div>
              <p className="text-gray-600">Procesos ágiles y eficientes para adquirir los activos que necesita en menor tiempo</p>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="font-bold text-lg mb-2 flex items-center">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">3</span> 
                Transparencia
              </div>
              <p className="text-gray-600">Información completa y detallada de cada activo con documentación certificada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}