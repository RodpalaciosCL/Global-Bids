import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertContactSchema, insertRegistrationSchema } from "@shared/schema";
import { testDatabaseConnection } from "./db";
import nodemailer from "nodemailer";
import "dotenv/config";

export async function registerRoutes(app: Express): Promise<Server> {
  // Test database connection on startup
  console.log('Initializing database connection...');
  const isDbConnected = await testDatabaseConnection();
  if (!isDbConnected) {
    console.warn('Database connection failed, but continuing with server startup...');
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
  // ─────────────── MACHINERY ENDPOINTS ───────────────
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
      // Return empty result set instead of error to prevent frontend crashes
      res.json({ items: [], total: 0, totalPages: 0 });
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

  // ─────────────── CONTACT FORM WITH EMAIL ───────────────
  app.post("/api/contact", async (req, res) => {
    try {
      const { type, interests, ...data } = req.body;
      
      if (type === 'registration') {
        // Handle registration form
        const registrationData = { ...data, interests: JSON.stringify(interests) };
        const validatedData = insertRegistrationSchema.parse(registrationData);
        const registration = await storage.createRegistration(validatedData);

        console.log(`✅ Registration saved to database: ${registration.name}`);

        // Send registration email
        const htmlBody = `
          <h2>Nuevo registro para subastas - Global Bids</h2>
          <p><strong>Nombre:</strong> ${registration.name}</p>
          <p><strong>Email:</strong> ${registration.email}</p>
          <p><strong>Teléfono:</strong> ${registration.phone || "No indicado"}</p>
          <p><strong>Empresa:</strong> ${registration.company || "No indicada"}</p>
          <p><strong>País:</strong> ${registration.country || "No indicado"}</p>
          <p><em>Registro realizado para participar en subastas de maquinaria</em></p>
        `;

        try {
          const info = await transporter.sendMail({
            from: '"Global Bids Web" <auctions@theglobalbid.com>',
            to: "rodpalacios@me.com",
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

        try {
          const info = await transporter.sendMail({
            from: '"Global Bids Web" <auctions@theglobalbid.com>',
            to: "rodpalacios@me.com",
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
      console.error("❌ Error saving contact:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // ─────────────── REGISTRATION FORM ───────────────
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