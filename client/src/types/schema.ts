import { pgTable, text, serial, integer, boolean, date, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for admin access
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Machinery table
export const machinery = pgTable("machinery", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // excavator, truck, loader, etc.
  brand: text("brand").notNull(),
  year: integer("year").notNull(),
  hours: integer("hours"),
  kilometers: integer("kilometers"),
  price: integer("price").notNull(),
  condition: text("condition").notNull(), // excellent, good, fair, repair
  description: text("description").notNull(),
  image: text("image").notNull(),
  gallery: text("gallery").array(),
  isSold: boolean("is_sold").default(false),
  auctionDate: date("auction_date"),
  priority: integer("priority"), // Higher numbers come first in listings
  page: integer("page").default(1), // Auction page number
  createdAt: date("created_at").notNull().defaultNow(),
});

export const insertMachinerySchema = createInsertSchema(machinery).omit({
  id: true,
  createdAt: true,
});

// Contact form submissions
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: date("created_at").notNull().defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

// Registration form submissions
export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  interestedIn: text("interested_in").array().notNull(),
  createdAt: date("created_at").notNull().defaultNow(),
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMachinery = z.infer<typeof insertMachinerySchema>;
export type MachineryType = typeof machinery.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactType = typeof contacts.$inferSelect;

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type RegistrationType = typeof registrations.$inferSelect;

// Machinery types (inferred from API responses)
export type Machinery = {
  id: number;
  name: string;
  type: string;
  brand: string;
  year: number;
  hours?: number;
  kilometers?: number;
  price: number;
  condition: string;
  description: string;
  image: string;
  gallery?: string[];
  isSold?: boolean;
  auctionDate?: string;
  priority?: number;
  page?: number;
  createdAt?: string;
};

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
};

export type Registration = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interestedIn: string[];
  createdAt: string;
};
