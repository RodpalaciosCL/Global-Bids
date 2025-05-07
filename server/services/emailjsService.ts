import { Request, Response } from 'express';

// Función para enviar un correo a través de EmailJS
export const sendEmailWithEmailJS = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const serviceID = process.env.EMAILJS_SERVICE_ID;
  const templateID = process.env.EMAILJS_TEMPLATE_ID;
  const userID = process.env.EMAILJS_USER_ID;
  
  if (!serviceID || !templateID || !userID) {
    console.warn('Las variables de entorno de EmailJS no están configuradas correctamente');
    return false;
  }
  
  try {
    // Construimos la URL para la API de EmailJS
    const url = `https://api.emailjs.com/api/v1.0/email/send`;
    
    // Preparamos los datos en el formato que espera EmailJS
    const templateParams = {
      to_email: 'auctions@theglobalbid.com',
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message
    };
    
    // Realizamos la petición a la API de EmailJS
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: serviceID,
        template_id: templateID,
        user_id: userID,
        template_params: templateParams
      })
    });
    
    if (response.ok) {
      console.log('Email enviado exitosamente con EmailJS');
      return true;
    } else {
      console.error('Error al enviar email con EmailJS:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Error al enviar email con EmailJS:', error);
    return false;
  }
};