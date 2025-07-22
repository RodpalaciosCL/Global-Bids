import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../src/types/schema.js";

// Configure Neon for serverless WebSocket connections
neonConfig.webSocketConstructor = ws;

// Improve connection stability
neonConfig.poolQueryViaFetch = true;
neonConfig.useSecureWebSocket = true;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Configure connection pool with better error handling
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Add error handling for pool connections
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Add connection event handlers
pool.on('connect', () => {
  console.log('Database client connected');
});

pool.on('remove', () => {
  console.log('Database client removed');
});

export const db = drizzle({ client: pool, schema });

// Test database connection on startup
export async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...');
    const result = await db.execute('SELECT 1 as test');
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}
