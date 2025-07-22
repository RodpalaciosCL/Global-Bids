import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from "zod";
import { insertContactSchema, insertRegistrationSchema } from "../src/types/schema";
import nodemailer from "nodemailer";
import { storage } from './storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configure CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Configure SMTP transporter for Office 365
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: "auctions@theglobalbid.com",
      pass: process.env.EMAIL_PASS,
    },
    tls: { ciphers: "SSLv3" },
  });

  try {
    const { type, interests, ...data } = req.body;
    
    if (type === 'registration') {
      // Handle registration form
      const registrationData = { ...data, interestedIn: interests };
      const validatedData = insertRegistrationSchema.parse(registrationData);
      const registration = await storage.createRegistration(validatedData);

      console.log(`✅ Registration saved to database: ${registration.firstName} ${registration.lastName}`);

      // Send registration email
      const htmlBody = `
        <h2>Nuevo registro para subastas - Global Bids</h2>
        <p><strong>Nombre:</strong> ${registration.firstName} ${registration.lastName}</p>
        <p><strong>Email:</strong> ${registration.email}</p>
        <p><strong>Teléfono:</strong> ${registration.phone}</p>
        <p><strong>Interesado en:</strong> ${Array.isArray(registration.interestedIn) ? registration.interestedIn.join(', ') : registration.interestedIn}</p>
        <p><em>Registro realizado para participar en subastas de maquinaria</em></p>
      `;

      // Send email using SMTP transporter
      try {
        const info = await transporter.sendMail({
          from: '"Global Bids Web" <auctions@theglobalbid.com>',
          to: "contacto@theglobalbid.com",
          subject: "Nuevo contacto de registro",
          html: htmlBody,
        });
        console.log(`✅ Registration email sent → ${info.messageId}`);
      } catch (emailError) {
        console.error('❌ Email error:', emailError);
      }

      res.status(201).json({
        message: "Registration submitted successfully",
        registrationId: registration.id,
      });
    } else {
      // Handle regular contact form
      const validatedData = insertContactSchema.parse(data);
      const contact = await storage.createContact(validatedData);

      console.log(`✅ Contact saved to database: ${contact.name}`);

      // Send contact email
      const htmlBody = `
        <h2>Nuevo mensaje desde el formulario de contacto</h2>
        <p><strong>Nombre:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Teléfono:</strong> ${contact.phone || "No indicado"}</p>
        <p><strong>Mensaje:</strong><br>${contact.message}</p>
      `;

      // Send email using SMTP transporter
      try {
        const info = await transporter.sendMail({
          from: '"Global Bids Web" <auctions@theglobalbid.com>',
          to: "contacto@theglobalbid.com",
          subject: `Nuevo contacto – ${contact.subject || "Sin asunto"}`,
          html: htmlBody,
        });
        console.log(`✅ Contact email sent → ${info.messageId}`);
      } catch (emailError) {
        console.error('❌ Email error:', emailError);
      }

      res.status(201).json({
        message: "Contact form submitted successfully",
        contactId: contact.id,
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    console.error("Contact form error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
