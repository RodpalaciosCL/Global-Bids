import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../lib/db';
import { sql } from 'drizzle-orm';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configure CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check environment variables first
    const envCheck = {
      DATABASE_URL: !!process.env.DATABASE_URL,
      DATABASE_URL_length: process.env.DATABASE_URL?.length || 0,
      NODE_ENV: process.env.NODE_ENV || 'unknown'
    };
    
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    
    console.log('Testing database connection...');
    // Use a simple query with sql template
    const result = await db.execute(sql`SELECT 1 as test`);
    console.log('Database connection successful');
    
    res.json({ 
      success: true, 
      message: 'Database connection test successful',
      dbResult: 'Connected successfully',
      env: envCheck
    });
  } catch (error) {
    console.error("Database test error:", error);
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      env: {
        DATABASE_URL: !!process.env.DATABASE_URL,
        DATABASE_URL_length: process.env.DATABASE_URL?.length || 0,
        NODE_ENV: process.env.NODE_ENV || 'unknown'
      }
    });
  }
}
