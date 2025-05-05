import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  FileText, Camera, Monitor, Users, Video, 
  FileCheck, Truck, MapPin, CreditCard
} from 'lucide-react';

export function MethodFramework() {
  const { t } = useLanguage();
  
  return (
    <section id="metodo" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {t('method.title')} - - {t('method.subtitle')}
          </h2>
          <div className="mx-auto w-24 h-1 bg-primary mb-5"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mb-16">
            {t('method.description')}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Primera fila */}
          <div className="grid grid-cols-4 gap-0 mb-20 relative">
            {/* Primer paso */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center z-10 mb-4">
                <FileText className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm text-gray-700 text-center">{t('method.step1.title')}</p>
            </div>
            
            {/* Segundo paso */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center z-10 mb-4">
                <Camera className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm text-gray-700 text-center">{t('method.step2.title')}</p>
            </div>
            
            {/* Tercer paso */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center z-10 mb-4">
                <Monitor className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm text-gray-700 text-center">{t('method.step3.title')}</p>
            </div>
            
            {/* Cuarto paso */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center z-10 mb-4">
                <Users className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm text-gray-700 text-center">{t('method.step4.title')}</p>
            </div>
            
            {/* Línea horizontal conectora completa */}
            <div className="absolute left-[5%] right-[5%] h-[1px] bg-yellow-400" style={{ top: '8px' }}></div>
          </div>
          
          {/* Segunda fila */}
          <div className="grid grid-cols-3 gap-0 mb-20 relative">
            {/* Quinto paso */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center z-10 mb-4">
                <Video className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm text-gray-700 text-center">{t('method.step5.title')}</p>
            </div>
            
            {/* Sexto paso */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center z-10 mb-4">
                <CreditCard className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm text-gray-700 text-center">{t('method.step6.title')}</p>
            </div>
            
            {/* Séptimo paso */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center z-10 mb-4">
                <FileText className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm text-gray-700 text-center">{t('method.step7.title')}</p>
            </div>
            
            {/* Línea horizontal conectora completa */}
            <div className="absolute left-[5%] right-[5%] h-[1px] bg-yellow-400" style={{ top: '8px' }}></div>
          </div>
          
          {/* Tercera fila */}
          <div className="grid grid-cols-3 gap-0 relative">
            {/* Octavo paso */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center z-10 mb-4">
                <FileCheck className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm text-gray-700 text-center">{t('method.step8.title')}</p>
            </div>
            
            {/* Noveno paso */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center z-10 mb-4">
                <Truck className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm text-gray-700 text-center">{t('method.step9.title')}</p>
            </div>
            
            {/* Décimo paso */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center z-10 mb-4">
                <MapPin className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm text-gray-700 text-center">{t('method.step10.title')}</p>
            </div>
            
            {/* Líneas horizontales conectoras entre los tres elementos */}
            <div className="absolute left-[16.5%] w-[34%] h-[1px] bg-yellow-400" style={{ top: '8px' }}></div>
            <div className="absolute right-[16.5%] w-[34%] h-[1px] bg-yellow-400" style={{ top: '8px' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}