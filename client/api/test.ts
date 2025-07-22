import type { VercelRequest, VercelResponse } from '@vercel/node';

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
      return res.status(500).json({ 
        success: false, 
        message: 'DATABASE_URL environment variable is not set',
        env: envCheck
      });
    }
    
    // Now test importing db
    let dbImportSuccess = false;
    let dbError = null;
    try {
      const { db } = await import('./db.js');
      dbImportSuccess = true;
      
      // Test database connection
      const { sql } = await import('drizzle-orm');
      const result = await db.execute(sql`SELECT 1 as test`);
      
      res.json({ 
        success: true, 
        message: 'Database connection test successful',
        dbImportSuccess,
        dbResult: 'Connected successfully',
        env: envCheck
      });
    } catch (dbErr) {
      dbError = dbErr instanceof Error ? dbErr.message : 'Unknown db error';
      res.status(500).json({ 
        success: false, 
        message: 'Database connection failed',
        dbImportSuccess,
        error: dbError,
        env: envCheck
      });
    }
  } catch (error) {
    console.error("Test error:", error);
    res.status(500).json({ 
      success: false, 
      message: 'Test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      env: {
        DATABASE_URL: !!process.env.DATABASE_URL,
        DATABASE_URL_length: process.env.DATABASE_URL?.length || 0,
        NODE_ENV: process.env.NODE_ENV || 'unknown'
      }
    });
  }
}
