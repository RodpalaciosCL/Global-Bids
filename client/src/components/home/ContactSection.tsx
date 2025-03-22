import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { fadeIn, staggerContainer, slideUp } from '@/lib/animations';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(3, "Nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Por favor selecciona un asunto"),
  message: z.string().min(10, "Mensaje debe tener al menos 10 caracteres")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });
  
  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Te responderemos a la brevedad.",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error al enviar mensaje",
        description: error.message || "Por favor intenta nuevamente más tarde.",
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contacto" className="py-16 bg-accent" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-primary">Contáctanos</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600">¿Tienes alguna consulta sobre nuestros remates o necesitas asesoría especializada? Nuestro equipo está listo para ayudarte.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            className="order-2 lg:order-1"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideUp}
          >
            <form 
              className="bg-white p-6 rounded-lg shadow-md"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                  <input 
                    id="name" 
                    {...register('name')}
                    className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico *</label>
                  <input 
                    id="email" 
                    type="email"
                    {...register('email')}
                    className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input 
                  id="phone" 
                  type="tel"
                  {...register('phone')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Asunto *</label>
                <select 
                  id="subject"
                  {...register('subject')}
                  className={`w-full p-3 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition`}
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="info">Información general</option>
                  <option value="auction">Preguntas sobre remates</option>
                  <option value="machinery">Consulta sobre maquinaria específica</option>
                  <option value="sell">Vender mi maquinaria</option>
                  <option value="other">Otro asunto</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                <textarea 
                  id="message"
                  rows={5}
                  {...register('message')}
                  className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition`}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-light text-white font-semibold px-6 py-3 rounded-lg transition duration-300 flex justify-center"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : 'Enviar mensaje'}
              </button>
            </form>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md mb-8"
              variants={slideUp}
            >
              <h3 className="font-heading font-bold text-xl mb-4 text-primary">Información de contacto</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-secondary text-xl mt-1 mr-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Dirección</h4>
                    <p className="text-gray-600">Av. Industrial 1250, Parque Empresarial<br/>Santiago, Chile</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-secondary text-xl mt-1 mr-4">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Teléfono</h4>
                    <p className="text-gray-600">+56 2 2345 6789</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-secondary text-xl mt-1 mr-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">contacto@macbid.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-secondary text-xl mt-1 mr-4">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Horario de atención</h4>
                    <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00<br/>Sábado: 9:00 - 13:00</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              variants={slideUp}
            >
              <h3 className="font-heading font-bold text-xl mb-4 text-primary">Síguenos</h3>
              <div className="flex space-x-4">
                {['facebook-f', 'twitter', 'instagram', 'linkedin-in', 'youtube'].map((social, index) => (
                  <motion.a 
                    key={index}
                    href="#" 
                    className="bg-primary hover:bg-primary-light text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className={`fab fa-${social}`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
