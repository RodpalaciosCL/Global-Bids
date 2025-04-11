import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useIsMobile } from '@/hooks/use-mobile';

export function PiezasPartesSection() {
  const isMobile = useIsMobile();

  const categories = [
    {
      title: "Partes para Excavadoras",
      image: "https://images.pexels.com/photos/614484/pexels-photo-614484.jpeg?auto=compress&cs=tinysrgb&w=1600",
      brands: ["Komatsu", "Caterpillar", "Hitachi"],
      itemCount: 128
    },
    {
      title: "Repuestos para Camiones",
      image: "https://images.pexels.com/photos/159751/book-address-book-learning-read-159751.jpeg?auto=compress&cs=tinysrgb&w=1600",
      brands: ["Volvo", "Scania", "Mercedes-Benz"],
      itemCount: 94
    },
    {
      title: "Componentes Hidráulicos",
      image: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1600",
      brands: ["Parker", "Bosch Rexroth", "Danfoss"],
      itemCount: 67
    }
  ];

  return (
    <section id="piezas-partes" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Piezas y Partes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Repuestos originales y alternativos de alta calidad para maquinaria pesada y equipos industriales
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="rounded-2xl bg-white shadow-lg overflow-hidden group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              custom={index * 0.1}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-white font-bold text-xl">{category.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.brands.map((brand, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded">
                      {brand}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">
                    <i className="fas fa-box-open mr-1"></i> {category.itemCount} items
                  </span>
                  <motion.a
                    href="#catalogo"
                    className="text-primary font-medium flex items-center hover:underline"
                    whileHover={{ x: 5 }}
                  >
                    Ver catálogo
                    <i className="fas fa-arrow-right ml-2 text-xs"></i>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Beneficios de nuestras piezas y partes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary text-white p-1 rounded-full flex-shrink-0 mt-1 mr-3">
                    <i className="fas fa-check text-xs"></i>
                  </div>
                  <span>Stock permanente con más de 5,000 referencias disponibles</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white p-1 rounded-full flex-shrink-0 mt-1 mr-3">
                    <i className="fas fa-check text-xs"></i>
                  </div>
                  <span>Garantía de calidad y autenticidad en todas nuestras piezas</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white p-1 rounded-full flex-shrink-0 mt-1 mr-3">
                    <i className="fas fa-check text-xs"></i>
                  </div>
                  <span>Precios en CLP y USD con facilidades de pago</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white p-1 rounded-full flex-shrink-0 mt-1 mr-3">
                    <i className="fas fa-check text-xs"></i>
                  </div>
                  <span>Despacho a todo Chile y Latinoamérica</span>
                </li>
              </ul>
              <motion.a
                href="#catalogo"
                className="mt-6 inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-medium shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-search mr-2"></i>
                Explorar el catálogo
              </motion.a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="text-primary text-4xl mb-2">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <h4 className="font-bold text-lg mb-1">Entrega Rápida</h4>
                <p className="text-gray-600 text-sm">Despacho en 24-48 horas a destinos principales</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="text-primary text-4xl mb-2">
                  <i className="fas fa-certificate"></i>
                </div>
                <h4 className="font-bold text-lg mb-1">Calidad Garantizada</h4>
                <p className="text-gray-600 text-sm">Piezas originales y homologadas de alta calidad</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="text-primary text-4xl mb-2">
                  <i className="fas fa-headset"></i>
                </div>
                <h4 className="font-bold text-lg mb-1">Soporte Técnico</h4>
                <p className="text-gray-600 text-sm">Asesoramiento especializado para cada pieza</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="text-primary text-4xl mb-2">
                  <i className="fas fa-user-shield"></i>
                </div>
                <h4 className="font-bold text-lg mb-1">Seguridad</h4>
                <p className="text-gray-600 text-sm">Transacciones seguras y protección al comprador</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}