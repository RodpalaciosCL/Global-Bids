import { 
  users, type User, type InsertUser,
  machinery, type Machinery, type InsertMachinery,
  contacts, type Contact, type InsertContact,
  registrations, type Registration, type InsertRegistration
} from "@shared/schema";
import { db } from "./db";
import { eq, like, and, or, gte, lte, desc, asc } from "drizzle-orm";
import { IStorage } from "./storage";
import { SQL } from "drizzle-orm";

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
  
  // Implement missing methods from IStorage interface
  async updateMachinery(id: number, item: Partial<InsertMachinery>): Promise<Machinery | undefined> {
    const [updatedItem] = await db.update(machinery)
      .set(item)
      .where(eq(machinery.id, id))
      .returning();
    return updatedItem;
  }
  
  async deleteMachinery(id: number): Promise<void> {
    await db.delete(machinery).where(eq(machinery.id, id));
  }
  
  async getAllContacts(): Promise<Contact[]> {
    return db.select().from(contacts);
  }
  
  async getAllRegistrations(): Promise<Registration[]> {
    return db.select().from(registrations);
  }
  
  // Initialize sample data
  async initSampleData(): Promise<void> {
    // Add sample machinery items
    const machineryItems: InsertMachinery[] = [
      {
        name: "2019 Heat King Idf1000 Ground Heater - Lote 88",
        type: "heater",
        brand: "Heat King",
        year: 2019,
        hours: 980,
        price: 28500,
        condition: "good",
        description: "Vin# 2ep330306k1022293, Good Rubber All Around, Diesel Powered, Bill Of Sale Only!",
        image: "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/88_1.jpg",
        gallery: [
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/88_1.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/88_3.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/88_5.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/88_6.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/88_8.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/88_7.jpg"
        ],
        isSold: false,
      },
      {
        name: "2020 Cat 308cr Excavator - Lote 301",
        type: "excavator",
        brand: "Caterpillar",
        year: 2020,
        hours: 2080,
        price: 95000,
        condition: "excellent",
        description: "Sn/ Cat00308cgw801103, Meter Reads 2080 Hours, 2 Speed, Hyd Blade, Aux Hyd, Hyd Thumb, Quick Coupler, Super Clean Machine! Fully Loaded!",
        image: "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/301_1.jpg",
        gallery: [
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/301_1.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/301_2.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/301_3.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/301_5.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/301_6.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/301_7.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/301_8.jpg"
        ],
        isSold: false,
      },
      {
        name: "2016 Jlg 600aj Manlift - Lote 94",
        type: "manlift",
        brand: "JLG",
        year: 2016,
        hours: 326,
        price: 45000,
        condition: "good",
        description: "SN/ 0300221374, Meter Reads 326 Hours!! Diesel Powered, 4x4, 500lbs Capacity, 60ft Max Reach, 39ft Outreach, Fleet Maintained, Good Rubber All Around.",
        image: "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/94_1.jpg",
        gallery: [
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/94_1.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/94_2.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/94_3.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/94_4.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/94_5.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/94_6.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/94_8.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/94_9.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/94_10.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/94_14.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/94_15.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/94_16.jpg"
        ],
        isSold: false
      },
      {
        name: "2007 Komatsu Pc300lc-7e0 Excavator - Lote 479",
        type: "excavator",
        brand: "Komatsu",
        year: 2007,
        hours: 8500,
        price: 62000,
        condition: "good",
        description: "Sn/ 143t54a88319, Display Does Not Illuminated For Hours, 3 Speed, Heat/ac, Aux Hyd, Lemac Digging Bucket, Hyd Quick Coupler.",
        image: "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/479_1.jpg",
        gallery: [
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/479_1.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/479_2.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/479_7.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/479_11.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/479_15.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/479_14.jpg"
        ],
        isSold: false,
        priority: 1
      },
      {
        name: "Camión Volquete Volvo FMX",
        type: "truck",
        brand: "Volvo",
        year: 2021,
        kilometers: 45000,
        price: 78000,
        condition: "excellent",
        description: "Camión volquete 6x4 con capacidad de carga de 20 toneladas y sistema hidráulico completo.",
        image: "https://images.unsplash.com/photo-1627121374573-05a9b0b25927?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        isSold: false,
      },
      {
        name: "Retroexcavadora John Deere 310SL",
        type: "backhoe",
        brand: "John Deere",
        year: 2020,
        hours: 2500,
        price: 72000,
        condition: "excellent",
        description: "Retroexcavadora con tracción en las 4 ruedas, cabina climatizada y sistema de estabilizadores.",
        image: "https://images.pexels.com/photos/259966/pexels-photo-259966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        isSold: false,
      },
      {
        name: "Excavadora Caterpillar 320D",
        type: "excavator",
        brand: "Caterpillar",
        year: 2022,
        hours: 5200,
        price: 120000,
        condition: "excellent",
        description: "Excavadora hidráulica de 20 toneladas en excelente estado, con 5,200 horas de uso y mantenimiento al día.",
        image: "https://images.pexels.com/photos/1882537/pexels-photo-1882537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        isSold: true,
        auctionDate: new Date("2022-12-15").toISOString(),
      }
    ];
    
    // Add admin user
    await this.createUser({
      username: "admin",
      password: "adminpassword123", // This would be hashed in a real app
    });
    
    // Add sample machinery
    for (const item of machineryItems) {
      await this.createMachinery(item);
    }
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