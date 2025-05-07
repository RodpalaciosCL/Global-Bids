import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertContactSchema, insertRegistrationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Prefix all API routes with /api
  
  // Get all machinery with filters
  app.get("/api/machinery", async (req, res) => {
    try {
      const { 
        search, type, brand, year, 
        minPrice, maxPrice, condition, 
        sort = 'price-asc',
        page = '1',
        limit = '6'
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
        parseInt(limit as string)
      );
      
      res.json(result);
    } catch (error) {
      console.error("Error fetching machinery:", error);
      res.status(500).json({ message: "Failed to fetch machinery" });
    }
  });
  
  // Get featured machinery
  app.get("/api/machinery/featured", async (req, res) => {
    try {
      const featuredMachinery = await storage.getFeaturedMachinery();
      res.json(featuredMachinery);
    } catch (error) {
      console.error("Error fetching featured machinery:", error);
      res.status(500).json({ message: "Failed to fetch featured machinery" });
    }
  });
  
  // Get machinery by ID
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
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Store contact submission
      const contact = await storage.createContact(validatedData);
      
      // Log the contact information for admin review
      console.log("😊 NUEVO MENSAJE DE CONTACTO RECIBIDO:");
      console.log(`De: ${contact.name} (${contact.email})`);
      console.log(`Asunto: ${contact.subject}`);
      console.log(`Mensaje: ${contact.message}`);
      console.log(`👉 Este mensaje debería enviarse a: framirez@theglobalbid.com, ffaundez@theglobalbid.com`);
      console.log("-----------------------------------");
      
      // Simular un pequeño retraso para mejor experiencia de usuario
      await new Promise(resolve => setTimeout(resolve, 800));
      
      res.status(201).json({ 
        message: "Contact form submitted successfully", 
        contactId: contact.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });
  
  // Registration form submission
  app.post("/api/register", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertRegistrationSchema.parse(req.body);
      
      // Store registration submission
      const registration = await storage.createRegistration(validatedData);
      
      res.status(201).json({ 
        message: "Registration submitted successfully", 
        registrationId: registration.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Error submitting registration form:", error);
      res.status(500).json({ message: "Failed to submit registration form" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
