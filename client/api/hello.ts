import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    res.json({ 
      message: 'Hello from Vercel!',
      timestamp: new Date().toISOString(),
      success: true
    });
  } catch (error) {
    console.error('Hello endpoint error:', error);
    res.status(500).json({ error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' });
  }
}
