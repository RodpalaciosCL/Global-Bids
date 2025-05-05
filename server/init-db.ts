import { db } from './db';
import { migrations } from 'drizzle-orm/postgres-js/migrator';
import { DatabaseStorage } from './databaseStorage';

async function initDatabase() {
  try {
    console.log('Initializing database...');
    
    // Execute drizzle push to create tables
    console.log('Creating tables...');
    await db.run`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`;
    
    await db.run`CREATE TABLE IF NOT EXISTS machinery (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      brand TEXT NOT NULL,
      year INTEGER NOT NULL,
      hours INTEGER,
      kilometers INTEGER,
      price INTEGER NOT NULL,
      condition TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      gallery TEXT[],
      is_sold BOOLEAN DEFAULT false,
      auction_date DATE,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
    
    await db.run`CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
    
    await db.run`CREATE TABLE IF NOT EXISTS registrations (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      interested_in TEXT[] NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
    
    console.log('Tables created successfully');
    
    // Initialize sample data
    console.log('Initializing sample data...');
    const storage = new DatabaseStorage();
    await storage.initSampleData();
    console.log('Sample data initialized successfully');
    
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    process.exit(0);
  }
}

initDatabase();