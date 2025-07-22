import { 
  users, 
  type User, 
  type InsertUser,
  machinery,
  type Machinery,
  type InsertMachinery,
  contacts,
  type Contact,
  type InsertContact,
  registrations,
  type Registration,
  type InsertRegistration
} from "../src/types/schema.js";
import { db } from "./db.js";
import { eq, and, gte, lte, like, or, desc, asc, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Machinery operations
  getAllMachinery(): Promise<Machinery[]>;
  getMachinery(id: number): Promise<Machinery | undefined>;
  searchMachinery(
    search?: string, 
    type?: string, 
    brand?: string, 
    year?: string, 
    minPrice?: number, 
    maxPrice?: number, 
    condition?: string,
    sortBy?: string,
    page?: number,
    limit?: number,
    auctionPage?: number,
    specificFilter?: string // New parameter for specific equipment filtering
  ): Promise<{ items: Machinery[], total: number, totalPages: number }>;
  getFeaturedMachinery(): Promise<Machinery[]>;
  createMachinery(machinery: InsertMachinery): Promise<Machinery>;
  updateMachinery(id: number, machinery: Partial<InsertMachinery>): Promise<Machinery | undefined>;
  deleteMachinery(id: number): Promise<boolean>;
  
  // Contact form operations
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  
  // Registration operations
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrations(): Promise<Registration[]>;
}

// Database-based storage implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllMachinery(): Promise<Machinery[]> {
    return await db.select().from(machinery).orderBy(desc(machinery.priority), desc(machinery.id));
  }

  async getMachinery(id: number): Promise<Machinery | undefined> {
    const [machine] = await db.select().from(machinery).where(eq(machinery.id, id));
    return machine || undefined;
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
    limit: number = 40,
    auctionPage?: number
  ): Promise<{ items: Machinery[], total: number, totalPages: number }> {
    // Build where conditions
    const conditions = [];

    // Filter by auction page if specified
    if (auctionPage) {
      conditions.push(eq(machinery.page, auctionPage));
    }

    if (search) {
      const searchPattern = `%${search}%`;
      conditions.push(
        or(
          sql`${machinery.name} ILIKE ${searchPattern}`,
          sql`${machinery.description} ILIKE ${searchPattern}`,
          sql`${machinery.brand} ILIKE ${searchPattern}`,
          sql`${machinery.type} ILIKE ${searchPattern}`
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
        conditions.push(lte(machinery.year, 2017));
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

    // Build order by
    let orderBy;
    switch (sortBy) {
      case 'price-desc':
        orderBy = [desc(machinery.priority), desc(machinery.price)];
        break;
      case 'year-desc':
        orderBy = [desc(machinery.priority), desc(machinery.year)];
        break;
      case 'year-asc':
        orderBy = [desc(machinery.priority), asc(machinery.year)];
        break;
      case 'price-asc':
      default:
        orderBy = [desc(machinery.priority), asc(machinery.price)];
        break;
    }

    // Get total count first
    const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;
    const totalResult = await db.select().from(machinery).where(whereCondition);
    const total = totalResult.length;
    
    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // Get paginated results
    const offset = (page - 1) * limit;
    const items = await db
      .select()
      .from(machinery)
      .where(whereCondition)
      .orderBy(...orderBy)
      .limit(limit)
      .offset(offset);

    return { items, total, totalPages };
  }

  async getFeaturedMachinery(): Promise<Machinery[]> {
    return await db
      .select()
      .from(machinery)
      .where(eq(machinery.isSold, true))
      .limit(3);
  }

  async createMachinery(insertMachinery: InsertMachinery): Promise<Machinery> {
    const [machine] = await db.insert(machinery).values(insertMachinery).returning();
    return machine;
  }

  async updateMachinery(id: number, updateData: Partial<InsertMachinery>): Promise<Machinery | undefined> {
    const [machine] = await db
      .update(machinery)
      .set(updateData)
      .where(eq(machinery.id, id))
      .returning();
    return machine || undefined;
  }

  async deleteMachinery(id: number): Promise<boolean> {
    const result = await db.delete(machinery).where(eq(machinery.id, id));
    return (result.rowCount || 0) > 0;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.id));
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const [registration] = await db.insert(registrations).values(insertRegistration).returning();
    return registration;
  }

  async getAllRegistrations(): Promise<Registration[]> {
    return await db.select().from(registrations).orderBy(desc(registrations.id));
  }

  async getRegistrations(): Promise<Registration[]> {
    return this.getAllRegistrations();
  }
}

export const storage = new DatabaseStorage();
