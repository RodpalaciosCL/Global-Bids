import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  FileText, Camera, Monitor, Users, Video, 
  FileCheck, Truck, MapPin, CreditCard
} from 'lucide-react';

export function MethodFramework() {
  const { t } = useLanguage();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  return (
    <section id="metodo" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {t('method.title')} - {t('method.subtitle')}
          </h2>
          <div className="mx-auto w-24 h-1 bg-primary mb-5"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('method.description')}
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Primera fila */}
          <div className="flex justify-between mb-20 relative">
            <div className="flex flex-col items-center text-center" onMouseEnter={() => setHoveredItem(0)} onMouseLeave={() => setHoveredItem(null)}>
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mb-3">
                <FileText className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">{t('method.step1.title')}</h3>
              {hoveredItem === 0 && (
                <div className="absolute top-20 w-40 text-xs p-2 bg-white shadow-md border z-10 rounded-md">
                  {t('method.step1.desc')}
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center text-center" onMouseEnter={() => setHoveredItem(1)} onMouseLeave={() => setHoveredItem(null)}>
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mb-3">
                <Camera className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">{t('method.step2.title')}</h3>
              {hoveredItem === 1 && (
                <div className="absolute top-20 w-40 text-xs p-2 bg-white shadow-md border z-10 rounded-md">
                  {t('method.step2.desc')}
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center text-center" onMouseEnter={() => setHoveredItem(2)} onMouseLeave={() => setHoveredItem(null)}>
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mb-3">
                <Monitor className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">{t('method.step3.title')}</h3>
              {hoveredItem === 2 && (
                <div className="absolute top-20 w-40 text-xs p-2 bg-white shadow-md border z-10 rounded-md">
                  {t('method.step3.desc')}
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center text-center" onMouseEnter={() => setHoveredItem(3)} onMouseLeave={() => setHoveredItem(null)}>
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mb-3">
                <Users className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">{t('method.step4.title')}</h3>
              {hoveredItem === 3 && (
                <div className="absolute top-20 w-40 text-xs p-2 bg-white shadow-md border z-10 rounded-md">
                  {t('method.step4.desc')}
                </div>
              )}
            </div>
            
            {/* Línea conectora horizontal */}
            <div className="absolute left-[10%] right-[10%] h-px bg-yellow-400" style={{ top: '30px' }}></div>
          </div>
          
          {/* Segunda fila */}
          <div className="flex justify-between mb-20 relative">
            <div className="flex flex-col items-center text-center" onMouseEnter={() => setHoveredItem(4)} onMouseLeave={() => setHoveredItem(null)}>
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mb-3">
                <Video className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">{t('method.step5.title')}</h3>
              {hoveredItem === 4 && (
                <div className="absolute top-20 w-48 text-xs p-2 bg-white shadow-md border z-10 rounded-md">
                  {t('method.step5.desc')}
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center text-center" onMouseEnter={() => setHoveredItem(5)} onMouseLeave={() => setHoveredItem(null)}>
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mb-3">
                <CreditCard className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">{t('method.step6.title')}</h3>
              {hoveredItem === 5 && (
                <div className="absolute top-20 w-48 text-xs p-2 bg-white shadow-md border z-10 rounded-md">
                  {t('method.step6.desc')}
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center text-center" onMouseEnter={() => setHoveredItem(6)} onMouseLeave={() => setHoveredItem(null)}>
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mb-3">
                <FileText className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">{t('method.step7.title')}</h3>
              {hoveredItem === 6 && (
                <div className="absolute top-20 w-48 text-xs p-2 bg-white shadow-md border z-10 rounded-md">
                  {t('method.step7.desc')}
                </div>
              )}
            </div>
            
            {/* Línea conectora horizontal */}
            <div className="absolute left-[15%] right-[15%] h-px bg-yellow-400" style={{ top: '30px' }}></div>
          </div>
          
          {/* Tercera fila */}
          <div className="flex justify-between relative">
            <div className="flex flex-col items-center text-center" onMouseEnter={() => setHoveredItem(7)} onMouseLeave={() => setHoveredItem(null)}>
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mb-3">
                <FileCheck className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">{t('method.step8.title')}</h3>
              {hoveredItem === 7 && (
                <div className="absolute top-20 w-48 text-xs p-2 bg-white shadow-md border z-10 rounded-md">
                  {t('method.step8.desc')}
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center text-center" onMouseEnter={() => setHoveredItem(8)} onMouseLeave={() => setHoveredItem(null)}>
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mb-3">
                <Truck className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">{t('method.step9.title')}</h3>
              {hoveredItem === 8 && (
                <div className="absolute top-20 w-48 text-xs p-2 bg-white shadow-md border z-10 rounded-md">
                  {t('method.step9.desc')}
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center text-center" onMouseEnter={() => setHoveredItem(9)} onMouseLeave={() => setHoveredItem(null)}>
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mb-3">
                <MapPin className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">{t('method.step10.title')}</h3>
              {hoveredItem === 9 && (
                <div className="absolute top-20 w-48 text-xs p-2 bg-white shadow-md border z-10 rounded-md">
                  {t('method.step10.desc')}
                </div>
              )}
            </div>
            
            {/* Línea conectora horizontal para la última fila - entre los iconos */}
            <div className="absolute left-[22%] w-[25%] h-px bg-yellow-400" style={{ top: '30px' }}></div>
            <div className="absolute right-[22%] w-[25%] h-px bg-yellow-400" style={{ top: '30px' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}