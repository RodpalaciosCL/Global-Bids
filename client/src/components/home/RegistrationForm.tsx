import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";

const registrationFormSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
  interestedIn: z.array(z.string()).min(1, "Selecciona al menos una opción")
});

type RegistrationFormData = z.infer<typeof registrationFormSchema>;

const interestOptions = [
  { id: "excavators", label: "Excavadoras" },
  { id: "loaders", label: "Cargadores" },
  { id: "trucks", label: "Camiones" },
  { id: "generators", label: "Generadores" },
  { id: "cranes", label: "Grúas" },
  { id: "backhoes", label: "Retroexcavadoras" }
];

export function RegistrationForm() {
  const { toast } = useToast();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      interestedIn: []
    }
  });

  const mutation = useMutation({
    mutationFn: (data: RegistrationFormData) => {
      return apiRequest('/api/registrations', 'POST', data);
    },
    onSuccess: () => {
      setIsFormSubmitted(true);
      toast({
        title: "¡Registro exitoso!",
        description: "Gracias por registrarte en nuestra plataforma",
      });
    },
    onError: (error) => {
      toast({
        title: "Error al registrarse",
        description: "Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.",
        variant: "destructive"
      });
      console.error("Registration error:", error);
    }
  });

  const onSubmit = (data: RegistrationFormData) => {
    mutation.mutate(data);
  };

  return (
    <motion.div 
      className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LoadingOverlay isLoading={mutation.isPending} />
      
      <div className="p-6">
        {isFormSubmitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-check text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">¡Registro Exitoso!</h3>
            <p className="text-gray-600 mb-6">
              Gracias por registrarte en Global Bids. Pronto recibirás información sobre nuestras próximas subastas.
            </p>
            <Button 
              onClick={() => setIsFormSubmitted(false)}
              variant="outline"
            >
              Registrar otra persona
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-primary">Inscríbete en nuestra plataforma</h3>
              <p className="text-gray-600 text-sm mt-1">
                Regístrate para recibir notificaciones sobre subastas
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingresa tu nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingresa tu apellido" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="tucorreo@ejemplo.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="+56 9 XXXX XXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <Label className="text-sm font-medium">Interesado en</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {interestOptions.map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name="interestedIn"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...field.value, option.id]
                                    : field.value.filter((value) => value !== option.id);
                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">{option.label}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  {form.formState.errors.interestedIn && (
                    <p className="text-sm font-medium text-destructive mt-2">
                      {form.formState.errors.interestedIn.message}
                    </p>
                  )}
                </div>
                
                <Button type="submit" className="w-full bg-primary text-white" size="lg">
                  Registrarme
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Al registrarte, aceptas nuestra Política de Privacidad y Términos de Servicio.
                </p>
              </form>
            </Form>
          </>
        )}
      </div>
    </motion.div>
  );
}