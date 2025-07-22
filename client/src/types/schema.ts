import { z } from "zod";

// Contact form schema
export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

// Registration form schema
export const insertRegistrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  interestedIn: z.array(z.string()).min(1, "Please select at least one interest"),
});

// Type exports
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;

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
