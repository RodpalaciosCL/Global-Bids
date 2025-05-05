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
    limit: number = 6
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
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'year-desc':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'year-asc':
        filtered.sort((a, b) => a.year - b.year);
        break;
    }
    
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
        name: "Cargador Frontal Komatsu WA200",
        type: "loader",
        brand: "Komatsu",
        year: 2019,
        hours: 3100,
        price: 62000,
        condition: "excellent",
        description: "Cargador frontal con capacidad de 2.0 m³, dirección articulada y control por joystick.",
        image: "https://images.unsplash.com/photo-1595842936365-1fabba86da27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        isSold: false,
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
        name: "Grúa Torre Liebherr 180HC",
        type: "crane",
        brand: "Liebherr",
        year: 2017,
        hours: 3800,
        price: 168000,
        condition: "good",
        description: "Grúa torre con alcance de 65 metros y capacidad de carga máxima de 10 toneladas. Incluye documentación técnica.",
        image: "https://images.pexels.com/photos/532079/pexels-photo-532079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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

export const storage = new MemStorage();
