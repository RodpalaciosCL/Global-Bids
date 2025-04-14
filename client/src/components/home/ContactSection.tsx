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
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t, language } = useLanguage();
  
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
        title: t('contact.successTitle'),
        description: t('contact.successMsg'),
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: t('contact.errorTitle'),
        description: error.message || t('contact.errorMsg'),
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  // Locations from the screenshot
  const locations = [
    {
      name: "Centro Logístico",
      address: "La Negra, Antofagasta, Chile"
    },
    {
      name: "Casa Matriz",
      address: "Luis Carrera 1263 oficina 301, Vitacura, Chile"
    },
    {
      name: "Centro Operaciones Norte",
      address: "Sierra Gorda, Antofagasta, Chile"
    },
    {
      name: "Massachusetts Office",
      address: "Boston, Massachusetts, USA"
    }
  ];

  return (
    <section id="contacto" className="py-16 bg-primary text-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto">{t('contact.subtitle')}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Locations */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-8"
          >
            {locations.map((location, index) => (
              <motion.div 
                key={index}
                className="flex items-start"
                variants={slideUp}
              >
                <div className="text-secondary text-xl mt-1 mr-4">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-medium text-lg">{location.name}</h4>
                  <p className="text-gray-300">{location.address}</p>
                </div>
              </motion.div>
            ))}
            
            <motion.div 
              className="flex items-start"
              variants={slideUp}
            >
              <div className="text-secondary text-xl mt-1 mr-4">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div>
                <h4 className="font-medium text-lg">Teléfono</h4>
                <p className="text-gray-300">+56 2 2756 9900</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start"
              variants={slideUp}
            >
              <div className="text-secondary text-xl mt-1 mr-4">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <h4 className="font-medium text-lg">Email</h4>
                <p className="text-gray-300">auctions@theglobalbid.com</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideUp}
            className="bg-white p-6 rounded-lg shadow-lg text-gray-800"
          >
            <form 
              className="space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <input 
                  id="name" 
                  placeholder="Nombre"
                  {...register('name')}
                  className={`w-full p-4 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <input 
                  id="email" 
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  className={`w-full p-4 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <textarea 
                  id="message"
                  rows={5}
                  placeholder="Mensaje"
                  {...register('message')}
                  className={`w-full p-4 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition`}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>
              
              <div className="hidden">
                <input 
                  id="phone" 
                  type="tel"
                  {...register('phone')}
                />
                <select 
                  id="subject"
                  {...register('subject')}
                  defaultValue="info"
                >
                  <option value="info">Información general</option>
                </select>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary-dark text-primary font-semibold px-6 py-4 rounded-lg transition duration-300 flex items-center justify-center"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Enviar mensaje
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
