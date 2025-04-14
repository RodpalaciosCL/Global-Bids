import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { insertRegistrationSchema } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Extend the registration schema with additional validation
const registrationFormSchema = insertRegistrationSchema.extend({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  phone: z.string().min(8, "Ingresa un número de teléfono válido"),
  interestedIn: z.array(z.string()).min(1, "Selecciona al menos un tipo de maquinaria"),
});

type RegistrationFormData = z.infer<typeof registrationFormSchema>;

export function RegistrationForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [countryCode, setCountryCode] = useState('+56'); // Chile por defecto
  const { toast } = useToast();

  // Lista de países comunes en Latinoamérica y sus códigos
  const countries = [
    { code: '+56', name: 'Chile' },
    { code: '+54', name: 'Argentina' },
    { code: '+55', name: 'Brasil' },
    { code: '+51', name: 'Perú' },
    { code: '+57', name: 'Colombia' },
    { code: '+52', name: 'México' },
    { code: '+593', name: 'Ecuador' },
    { code: '+598', name: 'Uruguay' },
    { code: '+591', name: 'Bolivia' },
    { code: '+58', name: 'Venezuela' },
    { code: '+1', name: 'Estados Unidos / Canadá' },
    { code: '+34', name: 'España' },
  ];
  
  // Form with validation
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
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
        title: "Registro enviado",
        description: "Gracias por registrarte. Te contactaremos pronto.",
      });
      form.reset();
      setIsFormOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu registro. Por favor intenta nuevamente.",
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
  
  return (
    <div>
      {!isFormOpen ? (
        <motion.button
          onClick={toggleForm}
          className="inline-block bg-secondary hover:bg-secondary-dark text-primary text-lg font-bold px-8 py-4 rounded-lg transition duration-300 shadow-lg"
          variants={slideUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Registrate en nuestra plataforma de remates
          <i className="fas fa-arrow-right ml-2"></i>
        </motion.button>
      ) : (
        <motion.div 
          className="bg-white rounded-lg p-6 shadow-xl max-w-lg mx-auto text-left relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Inscríbete en nuestra plataforma</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-800"
              onClick={toggleForm}
            >
              ✕
            </Button>
          </div>
          <p className="text-gray-600 mb-4">Regístrate para recibir notificaciones sobre subastas</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <Input
                  id="firstName"
                  placeholder="Ingresa tu nombre"
                  {...form.register('firstName')}
                  className={form.formState.errors.firstName ? 'border-red-500' : ''}
                />
                {form.formState.errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                <Input
                  id="lastName"
                  placeholder="Ingresa tu apellido"
                  {...form.register('lastName')}
                  className={form.formState.errors.lastName ? 'border-red-500' : ''}
                />
                {form.formState.errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                {...form.register('email')}
                className={form.formState.errors.email ? 'border-red-500' : ''}
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <div className="flex gap-2">
                <div className="w-1/3">
                  <Select 
                    value={countryCode} 
                    onValueChange={(value) => {
                      setCountryCode(value);
                      // Actualiza el valor del teléfono con el nuevo código de país
                      const phoneNumber = form.getValues('phone').replace(/^\+\d+\s/, '');
                      form.setValue('phone', `${value} ${phoneNumber}`);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="País" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.code} {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Input
                    id="phone"
                    placeholder="9 XXXX XXXX"
                    value={form.getValues('phone').replace(/^\+\d+\s/, '')}
                    onChange={(e) => {
                      // Elimina cualquier código de país existente y agrega el seleccionado
                      const phoneWithoutCode = e.target.value.replace(/^\+\d+\s/, '');
                      form.setValue('phone', `${countryCode} ${phoneWithoutCode}`);
                    }}
                    className={form.formState.errors.phone ? 'border-red-500' : ''}
                  />
                </div>
              </div>
              {form.formState.errors.phone && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interesado en</label>
              <div className="grid grid-cols-2 gap-2">
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
                    <label htmlFor={type.id} className="text-sm text-gray-700">{type.label}</label>
                  </div>
                ))}
              </div>
              {form.formState.errors.interestedIn && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.interestedIn.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2"
              disabled={mutation.isPending}
            >
              Registrarme
            </Button>

            <p className="text-xs text-gray-500 text-center mt-2">
              Al registrarte, aceptas nuestra Política de Privacidad y Términos de Servicio.
            </p>
          </form>

          {mutation.isPending && <LoadingOverlay isLoading={true} />}
        </motion.div>
      )}
    </div>
  );
}