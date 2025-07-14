import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { insertRegistrationSchema } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import ReactFlagsSelect from 'react-flags-select';
import { useLanguage } from '@/contexts/LanguageContext';

// Extend the registration schema with additional validation
const getRegistrationFormSchema = (language: 'es' | 'en') => {
  const errorMessages = {
    es: {
      firstName: "El nombre debe tener al menos 2 caracteres",
      lastName: "El apellido debe tener al menos 2 caracteres",
      email: "Ingresa un email válido",
      phone: "Ingresa un número de teléfono válido",
      interestedIn: "Selecciona al menos un tipo de maquinaria"
    },
    en: {
      firstName: "First name must have at least 2 characters",
      lastName: "Last name must have at least 2 characters",
      email: "Please enter a valid email",
      phone: "Please enter a valid phone number",
      interestedIn: "Please select at least one type of machinery"
    }
  };
  
  return insertRegistrationSchema.extend({
    firstName: z.string().min(2, errorMessages[language].firstName),
    lastName: z.string().min(2, errorMessages[language].lastName),
    email: z.string().email(errorMessages[language].email),
    phone: z.string().min(8, errorMessages[language].phone),
    interestedIn: z.array(z.string()).min(1, errorMessages[language].interestedIn),
  });
};

type RegistrationFormData = z.infer<ReturnType<typeof getRegistrationFormSchema>>;

// Estado global para controlar la apertura del formulario desde cualquier componente
let formOpenCallback: ((open: boolean) => void) | null = null;

// Función expuesta para abrir el formulario desde cualquier parte
export function openRegistrationForm() {
  console.log("Función openRegistrationForm ejecutada");
  if (formOpenCallback) {
    console.log("Callback encontrado, abriendo formulario");
    formOpenCallback(true);
  } else {
    console.error("No hay callback para abrir el formulario");
    // Crear un elemento para que lo encuentre el useEffect
    const event = new CustomEvent('tryOpenRegistrationForm');
    document.dispatchEvent(event);
  }
}

export function RegistrationForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryPhoneCodes[0]); // Chile por defecto
  const [phoneNumber, setPhoneNumber] = useState('');
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  // Establecer el callback para abrir el formulario y escuchar el evento personalizado
  useEffect(() => {
    formOpenCallback = setIsFormOpen;
    
    // Agregar un listener para el evento personalizado como alternativa
    const handleOpenForm = () => {
      console.log("Evento personalizado detectado, abriendo formulario");
      setIsFormOpen(true);
    };
    
    document.addEventListener('tryOpenRegistrationForm', handleOpenForm);
    document.addEventListener('openRegistrationForm', handleOpenForm);
    
    return () => {
      formOpenCallback = null;
      document.removeEventListener('tryOpenRegistrationForm', handleOpenForm);
      document.removeEventListener('openRegistrationForm', handleOpenForm);
    };
  }, []);

  // Códigos de país para selector
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
    { code: 'US', name: 'Estados Unidos', dialCode: '+1', flag: '🇺🇸' },
    { code: 'CA', name: 'Canadá', dialCode: '+1', flag: '🇨🇦' },
    { code: 'ES', name: 'España', dialCode: '+34', flag: '🇪🇸' },
    { code: 'DE', name: 'Alemania', dialCode: '+49', flag: '🇩🇪' },
    { code: 'FR', name: 'Francia', dialCode: '+33', flag: '🇫🇷' },
    { code: 'IT', name: 'Italia', dialCode: '+39', flag: '🇮🇹' },
    { code: 'GB', name: 'Reino Unido', dialCode: '+44', flag: '🇬🇧' }
  ];
  
  // Manejar cambios de teléfono
  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    // Actualizar el formulario con el número completo
    const fullPhone = selectedCountry.dialCode + value;
    form.setValue('phone', fullPhone);
  };

  const handleCountryChange = (country: typeof countryPhoneCodes[0]) => {
    setSelectedCountry(country);
    // Actualizar teléfono con nuevo código
    const fullPhone = country.dialCode + phoneNumber;
    form.setValue('phone', fullPhone);
  };
  
  // Form with validation
  const [schema, setSchema] = useState(() => getRegistrationFormSchema(language));
  
  // Actualizar el esquema cuando cambie el idioma
  useEffect(() => {
    setSchema(getRegistrationFormSchema(language));
  }, [language]);
  
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      interestedIn: [],
    },
  });
  
  // Submit handler using API
  const mutation = useMutation({
    mutationFn: (data: RegistrationFormData) => {
      return apiRequest('POST', '/api/register', data);
    },
    onSuccess: () => {
      toast({
        title: t('registration.successTitle'),
        description: t('registration.successMsg'),
      });
      form.reset();
      setIsFormOpen(false);
    },
    onError: (error) => {
      toast({
        title: t('registration.errorTitle'),
        description: t('registration.errorMsg'),
        variant: "destructive",
      });
      console.error("Registration error:", error);
    }
  });
  
  // Handle form submission
  const onSubmit = (data: RegistrationFormData) => {
    mutation.mutate(data);
  };
  
  // Machinery types for checkboxes
  const machineryTypes = [
    { id: 'excavator', label: 'Excavadoras' },
    { id: 'loader', label: 'Cargadores' },
    { id: 'truck', label: 'Camiones' },
    { id: 'generator', label: 'Generadores' },
    { id: 'crane', label: 'Grúas' },
    { id: 'backhoe', label: 'Retroexcavadoras' },
  ];
  
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  
  // Prevent body scroll when form is open
  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFormOpen]);
  
  return (
    <div id="registration-form">
      <motion.button
        onClick={toggleForm}
        className="inline-block bg-secondary hover:bg-secondary-dark text-primary text-sm sm:text-base md:text-lg font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition duration-300 shadow-lg"
        variants={slideUp}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {t('registration.button')}
        <i className="fas fa-arrow-right ml-2"></i>
      </motion.button>
      
      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg p-3 shadow-xl max-w-xs w-full text-left relative z-20 my-2"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-bold text-gray-900">{t('registration.title')}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-800"
                  onClick={toggleForm}
                >
                  ✕
                </Button>
              </div>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder={t('registration.firstName')}
                    {...form.register('firstName')}
                    className={`text-sm ${form.formState.errors.firstName ? 'border-red-500' : ''}`}
                  />
                  <Input
                    placeholder={t('registration.lastName')}
                    {...form.register('lastName')}
                    className={`text-sm ${form.formState.errors.lastName ? 'border-red-500' : ''}`}
                  />
                </div>

                <Input
                  type="email"
                  placeholder={t('registration.email')}
                  {...form.register('email')}
                  className={`text-sm ${form.formState.errors.email ? 'border-red-500' : ''}`}
                />

                <div className="space-y-1">
                  <div className="flex gap-1">
                    <select
                      value={selectedCountry.code}
                      onChange={(e) => {
                        const country = countryPhoneCodes.find(c => c.code === e.target.value);
                        if (country) handleCountryChange(country);
                      }}
                      className="px-2 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-xs"
                    >
                      {countryPhoneCodes.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.dialCode}
                        </option>
                      ))}
                    </select>
                    <Input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder={language === 'es' ? '971415496' : '971415496'}
                      className={`flex-1 text-sm ${form.formState.errors.phone ? 'border-red-500' : ''}`}
                    />
                  </div>
                  <p className="text-xs text-gray-400">
                    {selectedCountry.dialCode}{phoneNumber}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t('registration.interested')}</label>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {machineryTypes.slice(0, 4).map((type) => (
                      <div key={type.id} className="flex items-center space-x-1">
                        <Checkbox
                          id={type.id}
                          onCheckedChange={(checked) => {
                            const currentValues = form.getValues('interestedIn');
                            if (checked) {
                              form.setValue('interestedIn', [...currentValues, type.id]);
                            } else {
                              form.setValue(
                                'interestedIn',
                                currentValues.filter((value) => value !== type.id)
                              );
                            }
                          }}
                        />
                        <label htmlFor={type.id} className="text-xs text-gray-700">{t(`registration.${type.id}s`)}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 text-sm"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 
                    (language === 'es' ? 'Enviando...' : 'Sending...') : 
                    t('registration.register')}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  {t('registration.terms')}
                </p>
              </form>

              {mutation.isPending && <LoadingOverlay isLoading={true} />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}