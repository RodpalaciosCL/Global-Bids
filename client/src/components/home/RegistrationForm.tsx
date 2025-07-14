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
  const [selectedCountry, setSelectedCountry] = useState("CL"); // Chile por defecto
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

  // Mapa de códigos de país a códigos telefónicos (ampliado)
  const countryToCode: Record<string, string> = {
    "CL": "+56", // Chile
    "AR": "+54", // Argentina
    "BR": "+55", // Brasil
    "PE": "+51", // Perú
    "CO": "+57", // Colombia
    "MX": "+52", // México
    "EC": "+593", // Ecuador
    "UY": "+598", // Uruguay
    "BO": "+591", // Bolivia
    "VE": "+58", // Venezuela
    "US": "+1", // Estados Unidos
    "CA": "+1", // Canadá
    "ES": "+34", // España
    "DE": "+49", // Alemania
    "FR": "+33", // Francia
    "IT": "+39", // Italia
    "GB": "+44", // Reino Unido
    "PT": "+351", // Portugal
    "NL": "+31", // Países Bajos
    "CH": "+41", // Suiza
    "AU": "+61", // Australia
    "NZ": "+64", // Nueva Zelanda
    "ZA": "+27", // Sudáfrica
    "IN": "+91", // India
    "CN": "+86", // China
    "JP": "+81", // Japón
    "KR": "+82", // Corea del Sur
    "RU": "+7", // Rusia
    "AE": "+971", // Emiratos Árabes Unidos
    "SA": "+966", // Arabia Saudita
    "QA": "+974", // Qatar
    "EG": "+20", // Egipto
    "MA": "+212", // Marruecos
    "NG": "+234", // Nigeria
    "KE": "+254", // Kenia
    "GH": "+233", // Ghana
    "SG": "+65", // Singapur
    "MY": "+60", // Malasia
    "TH": "+66", // Tailandia
    "ID": "+62", // Indonesia
    "PH": "+63", // Filipinas
    "PK": "+92", // Pakistán
    "TR": "+90", // Turquía
    "DK": "+45", // Dinamarca
    "SE": "+46", // Suecia
    "NO": "+47", // Noruega
    "FI": "+358", // Finlandia
    "IS": "+354", // Islandia
    "BE": "+32", // Bélgica
    "AT": "+43", // Austria
  };
  
  // Obtener el código telefónico actual basado en el país seleccionado
  const getCountryCode = () => countryToCode[selectedCountry] || "+56";
  
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
              className="bg-white rounded-lg p-4 sm:p-6 shadow-xl max-w-md w-full text-left relative z-20 my-4 sm:my-8 max-h-[85vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">{t('registration.title')}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-800"
                  onClick={toggleForm}
                >
                  ✕
                </Button>
              </div>
              <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{t('registration.description')}</p>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">{t('registration.firstName')}</label>
                    <Input
                      id="firstName"
                      placeholder={language === 'es' ? "Ingresa tu nombre" : "Enter your first name"}
                      {...form.register('firstName')}
                      className={form.formState.errors.firstName ? 'border-red-500' : ''}
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{form.formState.errors.firstName.message?.toString()}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">{t('registration.lastName')}</label>
                    <Input
                      id="lastName"
                      placeholder={language === 'es' ? "Ingresa tu apellido" : "Enter your last name"}
                      {...form.register('lastName')}
                      className={form.formState.errors.lastName ? 'border-red-500' : ''}
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{form.formState.errors.lastName.message?.toString()}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('registration.email')}</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={language === 'es' ? "tucorreo@ejemplo.com" : "your.email@example.com"}
                    {...form.register('email')}
                    className={form.formState.errors.email ? 'border-red-500' : ''}
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message?.toString()}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t('registration.phone')}</label>
                  <div className="flex gap-2">
                    <div className="w-2/5">
                      <ReactFlagsSelect
                        selected={selectedCountry}
                        onSelect={(code) => {
                          setSelectedCountry(code);
                          // Actualiza el valor del teléfono con el nuevo código de país
                          const phoneNumber = form.getValues('phone').replace(/^\+\d+\s/, '');
                          form.setValue('phone', `${getCountryCode()} ${phoneNumber}`);
                        }}
                        countries={Object.keys(countryToCode)}
                        customLabels={Object.keys(countryToCode).reduce((acc, code) => {
                          acc[code] = `${countryToCode[code]} ${code}`;
                          return acc;
                        }, {} as Record<string, string>)}
                        placeholder={language === 'es' ? "Selecciona" : "Select"}
                        searchable={true}
                        selectButtonClassName="!border-gray-300 rounded-md h-10 !bg-white w-full"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        id="phone"
                        placeholder="XXXX XXXX"
                        value={form.getValues('phone')?.replace(/^\+\d+\s/, '') || ''}
                        onChange={(e) => {
                          // Elimina cualquier código de país existente y agrega el seleccionado
                          const phoneWithoutCode = e.target.value.replace(/^\+\d+\s/, '');
                          form.setValue('phone', `${getCountryCode()} ${phoneWithoutCode}`);
                        }}
                        className={form.formState.errors.phone ? 'border-red-500' : ''}
                      />
                    </div>
                  </div>
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message?.toString()}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('registration.interested')}</label>
                  <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto border border-gray-200 p-3 rounded-md">
                    {machineryTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
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
                        <label htmlFor={type.id} className="text-sm text-gray-700">{t(`registration.${type.id}s`)}</label>
                      </div>
                    ))}
                  </div>
                  {form.formState.errors.interestedIn && (
                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.interestedIn.message?.toString()}</p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 text-lg"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? 
                      (language === 'es' ? 'Enviando...' : 'Sending...') : 
                      t('registration.register')}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-2">
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