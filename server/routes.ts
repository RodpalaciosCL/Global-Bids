import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertContactSchema, insertRegistrationSchema } from "@shared/schema";
import "dotenv/config";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // ─────────────── CONTACT FORM (Simplified - no email backend) ───────────────
  app.post("/api/contact", async (req, res) => {
    try {
      const { type, interests, ...data } = req.body;
      
      if (type === 'registration') {
        // Handle registration form
        const registrationData = { ...data, interests: JSON.stringify(interests) };
        const validatedData = insertRegistrationSchema.parse(registrationData);
        const registration = await storage.createRegistration(validatedData);

        console.log(`✅ Registration saved to database: ${registration.name}`);

        res.status(201).json({
          message: "Registration submitted successfully",
          registrationId: registration.id,
        });
      } else {
        // Handle regular contact form
        const validatedData = insertContactSchema.parse(data);
        const contact = await storage.createContact(validatedData);

        console.log(`✅ Contact saved to database: ${contact.name}`);

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