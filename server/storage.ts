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
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, like, or, desc, asc } from "drizzle-orm";

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
    limit?: number
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
  getAllRegistrations(): Promise<Registration[]>;
}

// In-memory implementation of storage
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private machinery: Map<number, Machinery>;
  private contacts: Map<number, Contact>;
  private registrations: Map<number, Registration>;
  
  private userIdCounter: number;
  private machineryIdCounter: number;
  private contactIdCounter: number;
  private registrationIdCounter: number;

  constructor() {
    this.users = new Map();
    this.machinery = new Map();
    this.contacts = new Map();
    this.registrations = new Map();
    
    this.userIdCounter = 1;
    this.machineryIdCounter = 1;
    this.contactIdCounter = 1;
    this.registrationIdCounter = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Machinery methods
  async getAllMachinery(): Promise<Machinery[]> {
    return Array.from(this.machinery.values());
  }
  
  async getMachinery(id: number): Promise<Machinery | undefined> {
    return this.machinery.get(id);
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
    let filtered = Array.from(this.machinery.values());
    
    // Apply filters
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchLower) || 
        item.description.toLowerCase().includes(searchLower) ||
        item.brand.toLowerCase().includes(searchLower)
      );
    }
    
    if (type) {
      filtered = filtered.filter(item => item.type === type);
    }
    
    if (brand) {
      filtered = filtered.filter(item => item.brand.toLowerCase() === brand.toLowerCase());
    }
    
    if (year) {
      if (year === 'older') {
        filtered = filtered.filter(item => item.year < 2018);
      } else {
        filtered = filtered.filter(item => item.year === parseInt(year));
      }
    }
    
    if (minPrice !== undefined) {
      filtered = filtered.filter(item => item.price >= minPrice);
    }
    
    if (maxPrice !== undefined) {
      filtered = filtered.filter(item => item.price <= maxPrice);
    }
    
    if (condition) {
      filtered = filtered.filter(item => item.condition === condition);
    }
    
    // Primero ordenamos por prioridad (para asegurar que ciertos elementos aparezcan primero)
    // y después por el criterio solicitado
    filtered.sort((a, b) => {
      // Compara prioridad primero (elementos con prioridad más alta aparecen primero)
      const priorityA = (a as any).priority || 0;
      const priorityB = (b as any).priority || 0;
      
      if (priorityA !== priorityB) {
        return priorityB - priorityA; // Mayor prioridad primero
      }
      
      // Si tienen la misma prioridad, aplicamos el criterio solicitado
      switch (sortBy) {
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'condition-desc':
          const conditionOrder = { 'excellent': 4, 'good': 3, 'fair': 2, 'repair': 1 };
          return (conditionOrder[b.condition as keyof typeof conditionOrder] || 0) - 
                 (conditionOrder[a.condition as keyof typeof conditionOrder] || 0);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-desc':
          return b.year - a.year;
        case 'year-asc':
          return a.year - b.year;
        default:
          return 0;
      }
    });
    
    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const items = filtered.slice(startIndex, startIndex + limit);
    
    return { items, total, totalPages };
  }
  
  async getFeaturedMachinery(): Promise<Machinery[]> {
    // Get 3 sold items for featured section
    return Array.from(this.machinery.values())
      .filter(item => item.isSold)
      .slice(0, 3);
  }
  
  async createMachinery(insertMachinery: InsertMachinery): Promise<Machinery> {
    const id = this.machineryIdCounter++;
    const now = new Date();
    const machinery: Machinery = { 
      ...insertMachinery, 
      id,
      createdAt: now.toISOString() as any
    };
    this.machinery.set(id, machinery);
    return machinery;
  }
  
  async updateMachinery(id: number, updateData: Partial<InsertMachinery>): Promise<Machinery | undefined> {
    const existing = this.machinery.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updateData };
    this.machinery.set(id, updated);
    return updated;
  }
  
  async deleteMachinery(id: number): Promise<boolean> {
    return this.machinery.delete(id);
  }
  
  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactIdCounter++;
    const now = new Date();
    const contact: Contact = { 
      ...insertContact, 
      id,
      createdAt: now.toISOString() as any
    };
    this.contacts.set(id, contact);
    return contact;
  }
  
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
  
  // Registration methods
  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = this.registrationIdCounter++;
    const now = new Date();
    const registration: Registration = { 
      ...insertRegistration, 
      id,
      createdAt: now.toISOString() as any
    };
    this.registrations.set(id, registration);
    return registration;
  }
  
  async getAllRegistrations(): Promise<Registration[]> {
    return Array.from(this.registrations.values());
  }
  
  // Initialize with sample data
  private initSampleData() {
    // Sample machinery
    const machineryItems: InsertMachinery[] = [
      {
        name: "Excavadora Caterpillar 320D",
        type: "excavator",
        brand: "Caterpillar",
        year: 2018,
        hours: 4300,
        price: 85000,
        condition: "good",
        description: "Excavadora hidráulica de 20 toneladas, motor Cat C6.6 ACERT, brazo de excavación estándar.",
        image: "https://images.unsplash.com/photo-1533518463841-d62e1838af9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        isSold: false,
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
        name: "Cat 725 Articulated Haul Truck - Lote 397",
        type: "truck",
        brand: "Caterpillar",
        year: 2019,
        hours: 10831,
        price: 135000,
        condition: "good",
        description: "Sn/ cat00725hb1l02380, Meter Reads 10831 Hours, Fleet Maintained, 4 speed automatic, Heat And Air, full glass, new rubber all around, runs and operates as it should.",
        image: "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/397_1.jpg",
        gallery: [
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/397_1.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/397_2.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/397_6.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/397_7.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/397_11.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/397_12.jpg"
        ],
        isSold: false,
        priority: 1
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
        isSold: false,
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
        ]
      },
      {
        name: "2011 Manitex 50155s Mounted On Freightliner - Lote 342",
        type: "crane",
        brand: "Manitex",
        year: 2011,
        hours: 5670,
        price: 185000,
        condition: "excellent",
        description: "Vin#1fvsc7dv7bhay5364, Meter Reads 5,670 Hours, Detroit Dd13-450 Hp Turbo Diesel, Business Class M2 112 Newer Lmi Screen, Newer Main Winch Cable, Fuller Rio 1690ll 10 Speed Trans, Twin 20,000 Lb Front Steering Axles, 45,000 Lb Air Suspension W/retention Kit,13.200 Lb Steerable Pusher Axle, 13.200 Lb Steerable Tag Axle, Al Aluminum Tags, 50 Ton Rajed Capacity, 39\" One Stage Jib MaxSheave Height 203, Enclosed Operator Cab With Heater Radio Remote Outrigger Controls, 5 Ton Down Haul Hook And Ball, Heavy Duty Icc Bumper, No Jib, Includes Rooster For Dual Winches, Truck Was In Daily Use Until 11/2024 Recently Upgraded.",
        image: "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/342_1.jpg",
        gallery: [
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/342_1.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/342_3.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/342_4.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/342_5.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/342_6.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/342_10.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/342_14.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/342_19.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/342_22.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/342_27.jpg"
        ],
        isSold: false,
        priority: 1
      },
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
        // Prioridad especial para que aparezca en la primera página
        priority: 1
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
        name: "2002 Komatsu Wa500-3h Wheel Loader - Lote 339",
        type: "loader",
        brand: "Komatsu",
        year: 2002,
        hours: 4639,
        price: 82000,
        condition: "good",
        description: "Sn/ Wa500h30122, Meter Reads 4639 Hours, Fleet Maintained, Ready For Work, Full Glass, Heat/ac, 4 Speed Automatic.",
        image: "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/339_1.jpg",
        gallery: [
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/339_1.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/339_2.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/339_3.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/339_6.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/339_8.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/339_10.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/339_9.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/339_11.jpg",
          "https://auctiontechupload.s3.amazonaws.com/216/auction/1840/339_12.jpg"
        ],
        isSold: false,
        priority: 1
      },
      // Featured/sold items
      {
        name: "Excavadora CAT 320",
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
      },
      {
        name: "Camión Volvo FH16",
        type: "truck",
        brand: "Volvo",
        year: 2023,
        kilometers: 80000,
        price: 95000,
        condition: "excellent",
        description: "Camión de carga pesada con capacidad de 32 toneladas, motor Euro 5 y cabina full equipo con solo 80,000 km.",
        image: "https://images.pexels.com/photos/2553041/pexels-photo-2553041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        isSold: true,
        auctionDate: new Date("2023-02-20").toISOString(),
      },
      {
        name: "Generador Industrial Caterpillar",
        type: "generator",
        brand: "Caterpillar",
        year: 2023,
        hours: 1200,
        price: 85000,
        condition: "excellent",
        description: "Generador industrial 500kW diesel con cubierta insonorizada y panel de control digital. 1,200 horas de uso.",
        image: "https://images.pexels.com/photos/162568/oil-pump-jack-sunset-clouds-silhouette-162568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        isSold: true,
        auctionDate: new Date("2023-04-10").toISOString(),
      }
    ];
    
    // Add sample machinery
    machineryItems.forEach(item => {
      this.createMachinery(item);
    });
    
    // Add admin user
    this.createUser({
      username: "admin",
      password: "adminpassword123", // This would be hashed in a real app
    });
  }
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
      conditions.push(
        or(
          like(machinery.name, `%${search}%`),
          like(machinery.description, `%${search}%`),
          like(machinery.brand, `%${search}%`)
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
    return result.rowCount > 0;
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
}

export const storage = new DatabaseStorage();
