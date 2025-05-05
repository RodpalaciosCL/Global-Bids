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
        
        {/* Espacio vacío para que implementes tu versión personalizada */}
        <div className="max-w-5xl mx-auto">
          {/* El contenido será reemplazado por tu implementación */}
        </div>
      </div>
    </section>
  );
}