import { 
  users, type User, type InsertUser,
  machinery, type Machinery, type InsertMachinery,
  contacts, type Contact, type InsertContact,
  registrations, type Registration, type InsertRegistration
} from "@shared/schema";
import { db } from "./db";
import { eq, like, and, or, gte, lte, desc, asc } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  // Machinery operations
  async getAllMachinery(): Promise<Machinery[]> {
    return db.select().from(machinery);
  }

  async getMachinery(id: number): Promise<Machinery | undefined> {
    const [item] = await db.select().from(machinery).where(eq(machinery.id, id));
    return item;
  }

  async createMachinery(item: InsertMachinery): Promise<Machinery> {
    const [newItem] = await db.insert(machinery).values(item).returning();
    return newItem;
  }

  async searchMachinery(
    search?: string, 
    type?: string, 
    brand?: string, 
    year?: string, 
    minPrice?: number, 
    maxPrice?: number, 
    condition?: string,
    sortBy: string = 'price-asc',
    page: number = 1,
    limit: number = 6
  ): Promise<{ items: Machinery[], total: number, totalPages: number }> {
    let query = db.select().from(machinery);
    
    // Apply filters
    const conditions = [];
    
    if (search) {
      const searchLower = `%${search.toLowerCase()}%`;
      conditions.push(
        or(
          like(machinery.name, searchLower),
          like(machinery.description, searchLower),
          like(machinery.brand, searchLower)
        )
      );
    }
    
    if (type) {
      conditions.push(eq(machinery.type, type));
    }
    
    if (brand) {
      conditions.push(eq(machinery.brand, brand));
    }
    
    if (year) {
      if (year === 'older') {
        conditions.push(lte(machinery.year, 2018));
      } else {
        conditions.push(eq(machinery.year, parseInt(year)));
      }
    }
    
    if (minPrice !== undefined) {
      conditions.push(gte(machinery.price, minPrice));
    }
    
    if (maxPrice !== undefined) {
      conditions.push(lte(machinery.price, maxPrice));
    }
    
    if (condition) {
      conditions.push(eq(machinery.condition, condition));
    }
    
    // If we have conditions, add them to the query
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    // Count total items for pagination
    const totalQuery = db.select({ count: machinery.id }).from(machinery);
    if (conditions.length > 0) {
      totalQuery.where(and(...conditions));
    }
    
    const [totalResult] = await totalQuery;
    const total = Number(totalResult?.count || 0);
    const totalPages = Math.ceil(total / limit);
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        query = query.orderBy(asc(machinery.price));
        break;
      case 'price-desc':
        query = query.orderBy(desc(machinery.price));
        break;
      case 'year-desc':
        query = query.orderBy(desc(machinery.year));
        break;
      case 'year-asc':
        query = query.orderBy(asc(machinery.year));
        break;
    }
    
    // Apply pagination
    const offset = (page - 1) * limit;
    query = query.limit(limit).offset(offset);
    
    const items = await query;
    
    return { items, total, totalPages };
  }

  async getFeaturedMachinery(): Promise<Machinery[]> {
    return db.select().from(machinery).where(eq(machinery.isSold, true)).limit(3);
  }

  // Contact operations
  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }

  // Registration operations
  async createRegistration(registration: InsertRegistration): Promise<Registration> {
    const [newRegistration] = await db.insert(registrations).values(registration).returning();
    return newRegistration;
  }
}