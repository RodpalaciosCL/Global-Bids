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
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {t('method.title')} - {t('method.subtitle')}
          </h2>
          <div className="mx-auto w-24 h-1 bg-primary mb-5"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            {t('method.description')}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Primera fila con flechas curvas */}
          <div className="mb-20 relative">
            <div className="flex justify-between">
              {/* Paso 1 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step1.title')}</p>
              </div>
              
              {/* Paso 2 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step2.title')}</p>
              </div>
              
              {/* Paso 3 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Monitor className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step3.title')}</p>
              </div>
              
              {/* Paso 4 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step4.title')}</p>
              </div>
            </div>
            
            {/* SVG para las flechas curvas - Primera fila */}
            <svg className="absolute top-0 left-0 w-full h-20 overflow-visible" style={{ zIndex: 1 }}>
              {/* Flecha completa de extremo a extremo */}
              <path 
                d="M 20,40 H 785" 
                stroke="#FFC832" 
                strokeWidth="2" 
                fill="none" 
                className="z-0"
              />
              
              {/* Flecha de dirección */}
              <path 
                d="M 560,40 L 570,35 L 570,45 Z" 
                fill="#FFC832" 
                className="z-10"
              />
              
              {/* Conexión a la segunda fila - flecha curva*/}
              <path 
                d="M 405,40 C 405,70 405,100 405,130 Q 405,140 415,140 H 585 Q 595,140 595,150 C 595,180 595,210 595,240" 
                stroke="#FFC832" 
                strokeWidth="2" 
                fill="none" 
                className="z-0"
                strokeDasharray="5,5"
              />
              
              {/* Flecha de dirección en la curva */}
              <path 
                d="M 595,220 L 590,210 L 600,210 Z" 
                fill="#FFC832" 
                className="z-10"
                transform="rotate(90, 595, 210)"
              />
            </svg>
          </div>
          
          {/* Segunda fila con flechas curvas */}
          <div className="mb-20 relative">
            <div className="flex justify-around">
              {/* Paso 5 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step5.title')}</p>
              </div>
              
              {/* Paso 6 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step6.title')}</p>
              </div>
              
              {/* Paso 7 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step7.title')}</p>
              </div>
            </div>
            
            {/* SVG para las flechas curvas - Segunda fila */}
            <svg className="absolute top-0 left-0 w-full h-20 overflow-visible" style={{ zIndex: 1 }}>
              {/* Flecha horizontal */}
              <path 
                d="M 150,40 H 650" 
                stroke="#FFC832" 
                strokeWidth="2" 
                fill="none" 
                className="z-0"
              />
              
              {/* Flecha de dirección */}
              <path 
                d="M 500,40 L 510,35 L 510,45 Z" 
                fill="#FFC832" 
                className="z-10"
              />
              
              {/* Conexión a la tercera fila - flecha curva*/}
              <path 
                d="M 400,40 C 400,70 400,100 400,130 Q 400,140 410,140 H 585 Q 595,140 595,150 C 595,180 595,210 595,240" 
                stroke="#FFC832" 
                strokeWidth="2" 
                fill="none" 
                className="z-0"
                strokeDasharray="5,5"
              />
              
              {/* Flecha de dirección en la curva */}
              <path 
                d="M 595,220 L 590,210 L 600,210 Z" 
                fill="#FFC832" 
                className="z-10"
                transform="rotate(90, 595, 210)"
              />
            </svg>
          </div>
          
          {/* Tercera fila con flechas curvas */}
          <div className="relative">
            <div className="flex justify-around">
              {/* Paso 8 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <FileCheck className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step8.title')}</p>
              </div>
              
              {/* Paso 9 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step9.title')}</p>
              </div>
              
              {/* Paso 10 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step10.title')}</p>
              </div>
            </div>
            
            {/* SVG para las flechas curvas - Tercera fila */}
            <svg className="absolute top-0 left-0 w-full h-20 overflow-visible" style={{ zIndex: 1 }}>
              {/* Flecha desde paso 8 a paso 9 */}
              <path 
                d="M 180,40 H 390" 
                stroke="#FFC832" 
                strokeWidth="2" 
                fill="none" 
                className="z-0"
              />
              
              {/* Flecha de dirección */}
              <path 
                d="M 370,40 L 380,35 L 380,45 Z" 
                fill="#FFC832" 
                className="z-10"
              />
              
              {/* Flecha desde paso 9 a paso 10 */}
              <path 
                d="M 420,40 H 620" 
                stroke="#FFC832" 
                strokeWidth="2" 
                fill="none" 
                className="z-0"
              />
              
              {/* Flecha de dirección */}
              <path 
                d="M 600,40 L 610,35 L 610,45 Z" 
                fill="#FFC832" 
                className="z-10"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}