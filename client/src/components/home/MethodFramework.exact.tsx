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
          {/* Primera fila */}
          <div className="mb-20 relative">
            <div className="flex justify-around">
              {/* Paso 1 */}
              <div className="flex flex-col items-center relative z-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step1.title')}</p>
              </div>
              
              {/* Paso 2 */}
              <div className="flex flex-col items-center relative z-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step2.title')}</p>
              </div>
              
              {/* Paso 3 */}
              <div className="flex flex-col items-center relative z-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Monitor className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step3.title')}</p>
              </div>
              
              {/* Paso 4 */}
              <div className="flex flex-col items-center relative z-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step4.title')}</p>
              </div>
            </div>
            
            {/* SVG para las flechas - Primera fila */}
            <svg className="absolute top-0 left-0 w-full h-full overflow-visible" style={{ zIndex: 1 }}>
              {/* Línea recta horizontal */}
              <path 
                d="M 80,40 H 640" 
                stroke="#FFC832" 
                strokeWidth="2" 
                fill="none"
              />
              
              {/* Triángulo de flecha apuntando a la izquierda en la tercera posición */}
              <path 
                d="M 490,40 L 480,35 L 480,45 Z" 
                fill="#FFC832"
              />
              
              {/* Línea vertical punteada que baja desde el segundo círculo */}
              <path 
                d="M 260,40 L 260,80 L 260,150 L 480,150 L 530,150 L 530,210" 
                stroke="#FFC832" 
                strokeWidth="2" 
                fill="none"
                strokeDasharray="5,5"
              />
              
              {/* Triángulo de flecha en la línea punteada apuntando hacia abajo */}
              <path 
                d="M 530,200 L 525,190 L 535,190 Z" 
                fill="#FFC832"
              />
            </svg>
          </div>
          
          {/* Segunda fila */}
          <div className="mb-20 relative">
            <div className="flex justify-between">
              {/* Paso 5 */}
              <div className="flex flex-col items-center ml-20 relative z-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step5.title')}</p>
              </div>
              
              {/* Paso 6 */}
              <div className="flex flex-col items-center relative z-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step6.title')}</p>
              </div>
              
              {/* Paso 7 */}
              <div className="flex flex-col items-center mr-20 relative z-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step7.title')}</p>
              </div>
            </div>
            
            {/* SVG para las flechas - Segunda fila */}
            <svg className="absolute top-0 left-0 w-full h-full overflow-visible" style={{ zIndex: 1 }}>
              {/* Línea recta horizontal entre paso 5 y 6 */}
              <path 
                d="M 200,40 H 400" 
                stroke="#FFC832" 
                strokeWidth="2" 
                fill="none"
              />
              
              {/* Línea vertical punteada que baja desde el punto medio entre paso 5 y 6 */}
              <path 
                d="M 380,40 L 380,80 L 380,150 L 490,150 L 490,210" 
                stroke="#FFC832" 
                strokeWidth="2" 
                fill="none"
                strokeDasharray="5,5"
              />
              
              {/* Triángulo de flecha en la línea punteada apuntando hacia abajo */}
              <path 
                d="M 490,200 L 485,190 L 495,190 Z" 
                fill="#FFC832"
              />
            </svg>
          </div>
          
          {/* Tercera fila */}
          <div className="relative">
            <div className="flex justify-between">
              {/* Paso 8 */}
              <div className="flex flex-col items-center ml-16 relative z-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <FileCheck className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step8.title')}</p>
              </div>
              
              {/* Paso 9 */}
              <div className="flex flex-col items-center relative z-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step9.title')}</p>
              </div>
              
              {/* Paso 10 */}
              <div className="flex flex-col items-center mr-16 relative z-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-700 text-center max-w-[140px]">{t('method.step10.title')}</p>
              </div>
            </div>
            
            {/* SVG para las flechas - Tercera fila */}
            <svg className="absolute top-0 left-0 w-full h-20 overflow-visible" style={{ zIndex: 1 }}>
              {/* Línea horizontal con flecha desde paso 8 hacia paso 9 */}
              <path 
                d="M 225,40 H 370" 
                stroke="#FFC832" 
                strokeWidth="2" 
                fill="none"
              />
              
              {/* Triángulo de flecha en la línea horizontal */}
              <path 
                d="M 360,40 L 350,35 L 350,45 Z" 
                fill="#FFC832"
              />
              
              {/* Línea horizontal con flecha desde paso 9 hacia paso 10 */}
              <path 
                d="M 430,40 H 570" 
                stroke="#FFC832" 
                strokeWidth="2" 
                fill="none"
              />
              
              {/* Triángulo de flecha en la línea horizontal */}
              <path 
                d="M 560,40 L 550,35 L 550,45 Z" 
                fill="#FFC832"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}