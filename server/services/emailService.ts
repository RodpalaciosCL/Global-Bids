import { Request, Response } from 'express';
import sgMail from '@sendgrid/mail';

// Verificar que la API key esté definida
if (!process.env.SENDGRID_API_KEY) {
  console.warn('SENDGRID_API_KEY no está definida. El servicio de correo no funcionará correctamente.');
}

// Configurar SendGrid si la API key está disponible
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export const sendContactEmail = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    // Validar que se proporcionen todos los datos necesarios
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todos los campos son obligatorios' 
      });
    }

    // Si no hay API key configurada, devolver un mensaje personalizado
    if (!process.env.SENDGRID_API_KEY) {
      return res.status(503).json({ 
        success: false, 
        message: 'El servicio de correo no está configurado. Por favor, contacta al administrador.' 
      });
    }

    // Crear el mensaje
    const msg = {
      to: 'auctions@theglobalbid.com',
      from: 'noreply@theglobalbid.com', // Debe ser un remitente verificado en SendGrid
      subject: 'Nuevo mensaje de contacto - Global Bids',
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Enviar el correo
    await sgMail.send(msg);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Mensaje enviado con éxito' 
    });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error al enviar el mensaje. Por favor, intenta de nuevo más tarde.' 
    });
  }
};