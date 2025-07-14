import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';

export function SoporteSection() {
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const supportCategories = [
    {
      title: t('support.customerService'),
      description: t('support.customerServiceDesc'),
      icon: "fa-headset",
      color: "bg-blue-500"
    },
    {
      title: t('support.technicalAssistance'),
      description: t('support.technicalAssistanceDesc'),
      icon: "fa-tools",
      color: "bg-green-500"
    },
    {
      title: t('support.auctionHelp'),
      description: t('support.auctionHelpDesc'),
      icon: "fa-gavel",
      color: "bg-primary"
    },
    {
      title: t('support.documentation'),
      description: t('support.documentationDesc'),
      icon: "fa-file-alt",
      color: "bg-purple-500"
    }
  ];

  return (
    <section id="soporte" className="py-16 lg:py-0 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">{t('support.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('support.subtitle')}
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {supportCategories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              custom={index * 0.1}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-white mb-4`}>
                <i className={`fas ${category.icon}`}></i>
              </div>
              <h3 className="font-bold text-xl mb-3">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <motion.a
                href="#contacto"
                className="text-primary font-medium flex items-center text-sm hover:underline"
                whileHover={{ x: 5 }}
              >
                {t('support.requestHelp')}
                <i className="fas fa-chevron-right ml-2 text-xs"></i>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Se eliminó la sección de "Contáctenos Directamente" */}
      </div>
    </section>
  );
}