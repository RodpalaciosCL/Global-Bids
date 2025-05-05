import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/lib/animations';
import { useRegistration } from '@/contexts/RegistrationContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function AuctionRegisterSection() {
  const { openForm } = useRegistration();
  const { t } = useLanguage();

  return (
    <section className="relative py-16 overflow-hidden bg-gray-900" id="subastas">
      {/* Fondo sólido en lugar de imágenes */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-900 to-gray-800"></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-block mb-6 rounded-full px-4 py-1.5 bg-primary/30 backdrop-blur-md text-white text-sm font-medium"
          >
            {t('auctions.exclusiveEvents')}
          </motion.div>

          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t('auctions.title')}
          </motion.h2>

          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 px-1"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('auctions.description')}
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                <i className="fas fa-truck-monster text-xl"></i>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">
                {t('auctions.heavyMachinery')}
              </h3>
              <p className="text-gray-300 text-sm">
                {t('auctions.heavyMachineryDesc')}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                <i className="fas fa-tools text-xl"></i>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">
                {t('auctions.partsTools')}
              </h3>
              <p className="text-gray-300 text-sm">
                {t('auctions.partsToolsDesc')}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                <i className="fas fa-box-open text-xl"></i>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">
                {t('auctions.specialLots')}
              </h3>
              <p className="text-gray-300 text-sm">
                {t('auctions.specialLotsDesc')}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row justify-center gap-3 md:gap-4"
          >
            <button
              onClick={openForm}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary-dark text-white text-sm sm:text-base font-bold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 flex items-center justify-center"
            >
              <i className="fas fa-user-plus mr-2"></i>
              {t('auctions.registerNow')}
            </button>
            
            <a 
              href="#contacto"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-sm sm:text-base font-medium rounded-lg border border-white/30 transition duration-300 flex items-center justify-center"
            >
              <i className="fas fa-info-circle mr-2"></i>
              {t('auctions.moreInfo')}
            </a>
          </motion.div>
        </div>

        <motion.div 
          className="max-w-4xl mx-auto mt-10 md:mt-16 bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-wrap items-center mb-4 sm:mb-6 gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center text-white mr-2 sm:mr-4">
              <i className="fas fa-calendar-alt text-sm sm:text-base"></i>
            </div>
            <h3 className="text-base sm:text-xl font-bold text-white">
              {t('auctions.upcomingEvents')}
            </h3>
            <div className="ml-auto">
              <span className="bg-primary/80 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                {t('auctions.exclusiveAccess')}
              </span>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            <div className="py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-blue-900 text-white rounded-lg p-3 text-center w-16 h-16 flex flex-col items-center justify-center">
                <div className="text-xs sm:text-sm font-bold">EN</div>
                <div className="text-lg sm:text-xl font-bold">1 {t('auctions.day')}</div>
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-white text-sm sm:text-base">
                  {t('auctions.miningAssets')}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">Santiago, Chile</p>
              </div>
              <div className="flex flex-wrap mt-2 md:mt-0 items-center">
                <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full">
                  {t('auctions.openForRegistration')}
                </span>
                <a 
                  href="#subastas"
                  onClick={openForm}
                  className="mt-2 md:mt-0 md:ml-4 bg-primary/80 hover:bg-primary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors inline-flex items-center"
                >
                  <i className="fas fa-user-plus mr-1"></i>
                  {t('auctions.register')}
                </a>
              </div>
            </div>
            
            <div className="py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-blue-900 text-white rounded-lg p-3 text-center w-16 h-16 flex flex-col items-center justify-center">
                <div className="text-xs sm:text-sm font-bold">EN</div>
                <div className="text-lg sm:text-xl font-bold">2 {t('auctions.week')}</div>
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-white text-sm sm:text-base">
                  {t('auctions.forestryAssets')}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">Concepción, Chile</p>
              </div>
              <div className="flex flex-wrap mt-2 md:mt-0 items-center">
                <span className="bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full">
                  {t('auctions.comingSoon')}
                </span>
                <a 
                  href="#subastas"
                  onClick={openForm}
                  className="mt-2 md:mt-0 md:ml-4 bg-primary/80 hover:bg-primary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors inline-flex items-center"
                >
                  <i className="fas fa-bell mr-1"></i>
                  {t('auctions.notify')}
                </a>
              </div>
            </div>
            
            <div className="py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-blue-900 text-white rounded-lg p-3 text-center w-16 h-16 flex flex-col items-center justify-center">
                <div className="text-xs sm:text-sm font-bold">EN</div>
                <div className="text-lg sm:text-xl font-bold">1 {t('auctions.month')}</div>
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-white text-sm sm:text-base">
                  {t('auctions.industrialParts')}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">Online (Virtual)</p>
              </div>
              <div className="flex flex-wrap mt-2 md:mt-0 items-center">
                <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full">
                  {t('auctions.virtual')}
                </span>
                <a 
                  href="#subastas"
                  onClick={openForm}
                  className="mt-2 md:mt-0 md:ml-4 bg-primary/80 hover:bg-primary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors inline-flex items-center"
                >
                  <i className="fas fa-laptop mr-1"></i>
                  {t('auctions.preRegister')}
                </a>
              </div>
            </div>
          </div>
          
          {/* Eliminamos el botón "Ver todos los eventos" según la solicitud */}
        </motion.div>
      </div>
    </section>
  );
}