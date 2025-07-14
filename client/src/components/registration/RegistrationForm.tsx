import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegistration } from '@/contexts/RegistrationContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  interests: string[];
  acceptTerms: boolean;
}

// Códigos de país completos para selector
const countryPhoneCodes = [
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
  { code: 'BR', name: 'Brasil', dialCode: '+55', flag: '🇧🇷' },
  { code: 'PE', name: 'Perú', dialCode: '+51', flag: '🇵🇪' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴' },
  { code: 'MX', name: 'México', dialCode: '+52', flag: '🇲🇽' },
  { code: 'EC', name: 'Ecuador', dialCode: '+593', flag: '🇪🇨' },
  { code: 'UY', name: 'Uruguay', dialCode: '+598', flag: '🇺🇾' },
  { code: 'BO', name: 'Bolivia', dialCode: '+591', flag: '🇧🇴' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪' },
  { code: 'PY', name: 'Paraguay', dialCode: '+595', flag: '🇵🇾' },
  { code: 'US', name: 'Estados Unidos', dialCode: '+1', flag: '🇺🇸' },
  { code: 'CA', name: 'Canadá', dialCode: '+1', flag: '🇨🇦' },
  { code: 'ES', name: 'España', dialCode: '+34', flag: '🇪🇸' },
  { code: 'DE', name: 'Alemania', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'Francia', dialCode: '+33', flag: '🇫🇷' },
  { code: 'IT', name: 'Italia', dialCode: '+39', flag: '🇮🇹' },
  { code: 'GB', name: 'Reino Unido', dialCode: '+44', flag: '🇬🇧' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { code: 'NL', name: 'Países Bajos', dialCode: '+31', flag: '🇳🇱' },
  { code: 'CH', name: 'Suiza', dialCode: '+41', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
  { code: 'BE', name: 'Bélgica', dialCode: '+32', flag: '🇧🇪' },
  { code: 'SE', name: 'Suecia', dialCode: '+46', flag: '🇸🇪' },
  { code: 'NO', name: 'Noruega', dialCode: '+47', flag: '🇳🇴' },
  { code: 'DK', name: 'Dinamarca', dialCode: '+45', flag: '🇩🇰' },
  { code: 'FI', name: 'Finlandia', dialCode: '+358', flag: '🇫🇮' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'NZ', name: 'Nueva Zelanda', dialCode: '+64', flag: '🇳🇿' },
  { code: 'ZA', name: 'Sudáfrica', dialCode: '+27', flag: '🇿🇦' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
  { code: 'JP', name: 'Japón', dialCode: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'Corea del Sur', dialCode: '+82', flag: '🇰🇷' },
  { code: 'RU', name: 'Rusia', dialCode: '+7', flag: '🇷🇺' },
  { code: 'AE', name: 'Emiratos Árabes Unidos', dialCode: '+971', flag: '🇦🇪' },
  { code: 'SA', name: 'Arabia Saudita', dialCode: '+966', flag: '🇸🇦' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
  { code: 'EG', name: 'Egipto', dialCode: '+20', flag: '🇪🇬' },
  { code: 'MA', name: 'Marruecos', dialCode: '+212', flag: '🇲🇦' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenia', dialCode: '+254', flag: '🇰🇪' },
  { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭' },
  { code: 'SG', name: 'Singapur', dialCode: '+65', flag: '🇸🇬' },
  { code: 'MY', name: 'Malasia', dialCode: '+60', flag: '🇲🇾' },
  { code: 'TH', name: 'Tailandia', dialCode: '+66', flag: '🇹🇭' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩' },
  { code: 'PH', name: 'Filipinas', dialCode: '+63', flag: '🇵🇭' },
  { code: 'PK', name: 'Pakistán', dialCode: '+92', flag: '🇵🇰' },
  { code: 'TR', name: 'Turquía', dialCode: '+90', flag: '🇹🇷' },
  { code: 'IS', name: 'Islandia', dialCode: '+354', flag: '🇮🇸' }
];

export function RegistrationForm() {
  const { isFormOpen, closeForm } = useRegistration();
  const { language } = useLanguage();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(countryPhoneCodes[0]); // Chile por defecto
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    interests: [],
    acceptTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Opciones de interés según el idioma - categorías de maquinaria específicas
  const interestOptions = language === 'es' 
    ? [
      { id: 'maquinaria-general', label: 'Maquinaria General' },
      { id: 'excavadoras', label: 'Excavadoras' },
      { id: 'bulldozer', label: 'Bulldozer' },
      { id: 'cargadores', label: 'Cargadores' },
      { id: 'tractores', label: 'Tractores' },
      { id: 'camionetas', label: 'Camionetas' },
      { id: 'camiones', label: 'Camiones' },
      { id: 'camiones-tolva', label: 'Camiones Tolva' },
      { id: 'rodillos', label: 'Rodillos' },
      { id: 'gruas', label: 'Grúas' },
      { id: 'motoniveladoras', label: 'Motoniveladoras' },
      { id: 'repuestos', label: 'Repuestos' },
      { id: 'implementos', label: 'Implementos y Herramientas' },
    ]
    : [
      { id: 'maquinaria-general', label: 'General Machinery' },
      { id: 'excavadoras', label: 'Excavators' },
      { id: 'bulldozer', label: 'Bulldozers' },
      { id: 'cargadores', label: 'Loaders' },
      { id: 'tractores', label: 'Tractors' },
      { id: 'camionetas', label: 'Pickup Trucks' },
      { id: 'camiones', label: 'Trucks' },
      { id: 'camiones-tolva', label: 'Dump Trucks' },
      { id: 'rodillos', label: 'Rollers' },
      { id: 'gruas', label: 'Cranes' },
      { id: 'motoniveladoras', label: 'Motor Graders' },
      { id: 'repuestos', label: 'Spare Parts' },
      { id: 'implementos', label: 'Attachments & Tools' },
    ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    // Combinar código de país + número para el formData
    const fullPhone = selectedCountry.dialCode + ' ' + value;
    setFormData(prev => ({ ...prev, phone: fullPhone }));
  };

  const handleCountryChange = (country: typeof countryPhoneCodes[0]) => {
    setSelectedCountry(country);
    // Actualizar teléfono con nuevo código
    const fullPhone = country.dialCode + ' ' + phoneNumber;
    setFormData(prev => ({ ...prev, phone: fullPhone }));
  };

  const handleInterestChange = (interestId: string) => {
    setFormData(prev => {
      const newInterests = prev.interests.includes(interestId) 
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId];
      
      return { ...prev, interests: newInterests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    // Envío real del formulario
    setIsSubmitting(true);
    
    try {
      // Separar nombre completo en firstName y lastName
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: formData.email,
          phone: formData.phone,
          interestedIn: formData.interests
        }),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Reseteamos el formulario después de unos segundos
        setTimeout(() => {
          setIsSuccess(false);
          setCurrentStep(1);
          setFormData({
            name: '',
            company: '',
            email: '',
            phone: '',
            interests: [],
            acceptTerms: false,
          });
          closeForm();
        }, 3000);
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      console.error('Error sending registration:', error);
      setIsSubmitting(false);
      // En caso de error, mostrar mensaje pero no resetear el formulario
      alert(language === 'es' 
        ? 'Error al enviar el formulario. Por favor intente nuevamente.' 
        : 'Error sending form. Please try again.');
    }
  };

  const isFormValid = () => {
    if (currentStep === 1) {
      return formData.name.trim() !== '' && formData.email.trim() !== '';
    } else if (currentStep === 2) {
      return formData.interests.length > 0;
    } else {
      return formData.acceptTerms;
    }
  };

  // Si el formulario no está abierto, no renderizamos nada
  if (!isFormOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeForm}
        />
        
        <motion.div
          className="bg-white rounded-xl shadow-2xl w-full max-w-md z-50 overflow-hidden relative max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Cabecera del formulario */}
          <div className="bg-primary text-white p-4">
            <button 
              onClick={closeForm}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-all"
            >
              <i className="fas fa-times"></i>
            </button>
            
            <h2 className="text-lg font-bold">
              {language === 'es' ? 'Registro de Participante' : 'Participant Registration'}
            </h2>
            <p className="text-white/80 mt-1 text-sm">
              {language === 'es' 
                ? 'Complete el formulario para acceder a nuestras subastas' 
                : 'Complete the form to access our auctions'}
            </p>
            
            {/* Indicador de pasos */}
            <div className="flex items-center mt-3">
              {[1, 2, 3].map(step => (
                <div key={step} className="flex items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep === step 
                      ? 'bg-white text-primary' 
                      : currentStep > step 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/30 text-white'}`}
                  >
                    {currentStep > step ? <i className="fas fa-check"></i> : step}
                  </div>
                  {step < 3 && (
                    <div 
                      className={`w-12 h-0.5 ${
                        currentStep > step ? 'bg-green-500' : 'bg-white/30'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Contenido del formulario */}
          <form onSubmit={handleSubmit} className="p-4">
            <AnimatePresence mode="wait">
              {/* Paso 1: Información personal */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="font-bold text-lg text-gray-800">
                    {language === 'es' ? 'Información Personal' : 'Personal Information'}
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'es' ? 'Nombre Completo' : 'Full Name'}*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'es' ? 'Empresa' : 'Company'}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'es' ? 'Correo Electrónico' : 'Email'}*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'es' ? 'Teléfono' : 'Phone'}
                    </label>
                    <div className="flex gap-2">
                      {/* Selector de país */}
                      <div className="relative">
                        <select
                          value={selectedCountry.code}
                          onChange={(e) => {
                            const country = countryPhoneCodes.find(c => c.code === e.target.value);
                            if (country) handleCountryChange(country);
                          }}
                          className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white text-sm appearance-none pr-8"
                        >
                          {countryPhoneCodes.map(country => (
                            <option key={country.code} value={country.code}>
                              {country.flag} {country.dialCode}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* Input del número */}
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder={language === 'es' ? 'Ej: 971415496' : 'Ex: 971415496'}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {language === 'es' ? 'Formato completo: ' : 'Full format: '}{selectedCountry.dialCode} {phoneNumber}
                    </p>
                  </div>
                </motion.div>
              )}
              
              {/* Paso 2: Intereses */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  <h3 className="font-bold text-base text-gray-800">
                    {language === 'es' ? 'Interés en:' : 'Interest in:'}
                  </h3>
                  <p className="text-gray-600 text-xs">
                    {language === 'es' 
                      ? 'Seleccione las categorías de maquinaria que le interesan' 
                      : 'Select the machinery categories you are interested in'}
                  </p>
                  
                  <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                    {interestOptions.map(option => (
                      <label 
                        key={option.id} 
                        className="flex items-center p-2 rounded border border-gray-200 cursor-pointer hover:bg-gray-50 transition text-sm"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                          checked={formData.interests.includes(option.id)}
                          onChange={() => handleInterestChange(option.id)}
                        />
                        <span className="ml-2 text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Paso 3: Términos y condiciones */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="font-bold text-lg text-gray-800">
                    {language === 'es' ? 'Términos y Condiciones' : 'Terms and Conditions'}
                  </h3>
                  
                  <div className="h-48 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
                    <p className="mb-4">
                      {language === 'es'
                        ? 'Al registrarse en nuestra plataforma, usted acepta los siguientes términos y condiciones:'
                        : 'By registering on our platform, you agree to the following terms and conditions:'}
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        {language === 'es'
                          ? 'Global Bids utilizará su información de contacto para enviarle notificaciones sobre subastas y eventos.'
                          : 'Global Bids will use your contact information to send you notifications about auctions and events.'}
                      </li>
                      <li>
                        {language === 'es'
                          ? 'Para participar en las subastas, deberá completar un proceso de verificación adicional.'
                          : 'To participate in the auctions, you will need to complete an additional verification process.'}
                      </li>
                      <li>
                        {language === 'es'
                          ? 'Global Bids se reserva el derecho de admisión a las subastas y eventos.'
                          : 'Global Bids reserves the right of admission to auctions and events.'}
                      </li>
                      <li>
                        {language === 'es'
                          ? 'Su información personal será tratada de acuerdo a nuestra política de privacidad.'
                          : 'Your personal information will be treated according to our privacy policy.'}
                      </li>
                    </ol>
                  </div>
                  
                  <label className="flex items-start mt-4 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                      required
                    />
                    <span className="ml-3 text-sm text-gray-600">
                      {language === 'es'
                        ? 'He leído y acepto los términos y condiciones, así como la política de privacidad de Global Bids.'
                        : 'I have read and agree to the terms and conditions, as well as the privacy policy of Global Bids.'}
                    </span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Mensaje de éxito */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-green-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {language === 'es' ? '¡Registro Exitoso!' : 'Registration Successful!'}
                </h3>
                <p className="text-gray-600 mt-2">
                  {language === 'es'
                    ? 'Gracias por registrarse. Recibirá información sobre nuestras próximas subastas.'
                    : 'Thank you for registering. You will receive information about our upcoming auctions.'}
                </p>
              </motion.div>
            )}
            
            {/* Botones de navegación */}
            {!isSuccess && (
              <div className="flex justify-between mt-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition flex items-center"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    {language === 'es' ? 'Anterior' : 'Previous'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition flex items-center"
                  >
                    <i className="fas fa-times mr-2"></i>
                    {language === 'es' ? 'Cancelar' : 'Cancel'}
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className={`px-6 py-2 rounded-lg transition flex items-center ${
                    isFormValid() && !isSubmitting
                      ? 'bg-primary hover:bg-primary-dark text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      {language === 'es' ? 'Procesando...' : 'Processing...'}
                    </>
                  ) : currentStep < 3 ? (
                    <>
                      {language === 'es' ? 'Siguiente' : 'Next'}
                      <i className="fas fa-arrow-right ml-2"></i>
                    </>
                  ) : (
                    <>
                      {language === 'es' ? 'Enviar Registro' : 'Submit Registration'}
                      <i className="fas fa-paper-plane ml-2"></i>
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}