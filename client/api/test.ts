import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../lib/db';

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
    // Test basic database connection
    console.log('Testing database connection...');
    const result = await db.execute('SELECT 1 as test');
    console.log('Database connection successful:', result);
    
    // Check environment variables
    const envCheck = {
      DATABASE_URL: !!process.env.DATABASE_URL,
      DATABASE_URL_length: process.env.DATABASE_URL?.length || 0,
      NODE_ENV: process.env.NODE_ENV || 'unknown'
    };
    
    res.json({ 
      success: true, 
      message: 'Database connection test successful',
      dbResult: result,
      env: envCheck
    });
  } catch (error) {
    console.error("Database test error:", error);
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      env: {
        DATABASE_URL: !!process.env.DATABASE_URL,
        DATABASE_URL_length: process.env.DATABASE_URL?.length || 0,
        NODE_ENV: process.env.NODE_ENV || 'unknown'
      }
    });
  }
}
