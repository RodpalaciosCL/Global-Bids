import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertContactSchema, insertRegistrationSchema } from "@shared/schema";

import nodemailer from "nodemailer";
import "dotenv/config";

/* ─────────── Nodemailer (Office 365) ─────────── */
const smtp = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: "contacto@theglobalbid.com",
    pass: process.env.EMAIL_PASS, // ← APP‑PASSWORD
  },
  tls: { ciphers: "SSLv3" },
});

export async function registerRoutes(app: Express): Promise<Server> {
  /* Prefix all API routes with /api
     (en tu index de Express ya montas esto) */

  // ─────────────── MACHINERY ENDPOINTS (igual) ───────────────
  app.get("/api/machinery", async (req, res) => {
    try {
      const {
        search,
        type,
        brand,
        year,
        minPrice,
        maxPrice,
        condition,
        sort = "price-asc",
        page = "1",
        limit = "40",
        auctionPage, // New: auction page filter
      } = req.query;

      const result = await storage.searchMachinery(
        search as string | undefined,
        type as string | undefined,
        brand as string | undefined,
        year as string | undefined,
        minPrice ? parseInt(minPrice as string) : undefined,
        maxPrice ? parseInt(maxPrice as string) : undefined,
        condition as string | undefined,
        sort as string,
        parseInt(page as string),
        parseInt(limit as string),
        auctionPage ? parseInt(auctionPage as string) : undefined, // Pass auction page filter
      );

      res.json(result);
    } catch (error) {
      console.error("Error fetching machinery:", error);
      res.status(500).json({ message: "Failed to fetch machinery" });
    }
  });

  app.get("/api/machinery/featured", async (_req, res) => {
    try {
      const featuredMachinery = await storage.getFeaturedMachinery();
      res.json(featuredMachinery);
    } catch (error) {
      console.error("Error fetching featured machinery:", error);
      res.status(500).json({ message: "Failed to fetch featured machinery" });
    }
  });

  app.get("/api/machinery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const machinery = await storage.getMachinery(id);

      if (!machinery) {
        return res.status(404).json({ message: "Machinery not found" });
      }

      res.json(machinery);
    } catch (error) {
      console.error("Error fetching machinery:", error);
      res.status(500).json({ message: "Failed to fetch machinery" });
    }
  });

  // Image proxy endpoint
  app.get("/api/images/*", async (req, res) => {
    try {
      // Extract the full path after /api/images/
      const imagePath = req.params[0];
      const imageUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${imagePath}`;
      
      console.log('Proxying image:', imageUrl);
      
      const response = await fetch(imageUrl);
      
      if (!response.ok) {
        console.log('Image not found:', imageUrl, 'Status:', response.status);
        return res.status(404).json({ message: "Image not found" });
      }
      
      const imageBuffer = Buffer.from(await response.arrayBuffer());
      res.set('Content-Type', 'image/jpeg');
      res.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error proxying image:", error);
      res.status(500).json({ message: "Failed to fetch image" });
    }
  });

  // ─────────────── CONTACT FORM ───────────────
  app.post("/api/contact", async (req, res) => {
    try {
      const { type, interests, ...data } = req.body;
      
      if (type === 'registration') {
        // Handle registration form
        const registrationData = { ...data, interests: JSON.stringify(interests) };
        const validatedData = insertRegistrationSchema.parse(registrationData);
        const registration = await storage.createRegistration(validatedData);

        // Get interest labels in Spanish
        const interestLabels = interests?.map((id: string) => {
          const labels: Record<string, string> = {
            'maquinaria-general': 'Maquinaria General',
            'excavadoras': 'Excavadoras',
            'bulldozer': 'Bulldozer',
            'cargadores': 'Cargadores',
            'tractores': 'Tractores',
            'camionetas': 'Camionetas',
            'camiones': 'Camiones',
            'camiones-tolva': 'Camiones Tolva',
            'rodillos': 'Rodillos',
            'gruas': 'Grúas',
            'motoniveladoras': 'Motoniveladoras',
            'repuestos': 'Repuestos',
            'implementos': 'Implementos y Herramientas'
          };
          return labels[id] || id;
        }) || [];

        // Compose registration email
        const htmlBody = `
          <h2>Nuevo contacto de registro</h2>
          <p><strong>Nombre:</strong> ${registration.name}</p>
          <p><strong>Empresa:</strong> ${registration.company || "No indicado"}</p>
          <p><strong>Email:</strong> ${registration.email}</p>
          <p><strong>Teléfono:</strong> ${registration.phone || "No indicado"}</p>
          <p><strong>Intereses:</strong><br>${interestLabels.join(', ')}</p>
          <p><em>Registro realizado para participar en subastas de maquinaria</em></p>
        `;

      // 4. Send through Office 365
      const info = await smtp.sendMail({
        from: '"Global Bids Web" <contacto@theglobalbid.com>',
        to: "contacto@theglobalbid.com",
        subject: "Nuevo contacto de registro",
        html: htmlBody,
      });

        console.log(`✅ Correo de registro enviado → ${info.messageId}`);

        await new Promise((r) => setTimeout(r, 800));

        res.status(201).json({
          message: "Registration submitted successfully",
          registrationId: registration.id,
        });
      } else {
        // Handle regular contact form
        const validatedData = insertContactSchema.parse(data);
        const contact = await storage.createContact(validatedData);

        const htmlBody = `
          <h2>Nuevo mensaje desde el formulario</h2>
          <p><strong>Nombre:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Teléfono:</strong> ${contact.phone || "No indicado"}</p>
          <p><strong>Mensaje:</strong><br>${contact.message}</p>
        `;

        const info = await smtp.sendMail({
          from: '"Global Bids Web" <contacto@theglobalbid.com>',
          to: "contacto@theglobalbid.com",
          subject: `Nuevo contacto – ${contact.subject ?? "Sin asunto"}`,
          html: htmlBody,
        });

        console.log(`✅ Correo enviado → ${info.messageId}`);

        await new Promise((r) => setTimeout(r, 800));

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
      console.error("❌ Error al enviar contacto:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // ─────────────── REGISTRATION FORM (igual) ───────────────
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = insertRegistrationSchema.parse(req.body);
      const registration = await storage.createRegistration(validatedData);

      res.status(201).json({
        message: "Registration submitted successfully",
        registrationId: registration.id,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error submitting registration form:", error);
      res.status(500).json({ message: "Failed to submit registration form" });
    }
  });

  // ─────────────── HTTP SERVER ───────────────
  const httpServer = createServer(app);
  return httpServer;
}
