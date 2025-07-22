import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../storage.js';

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
    const featuredMachinery = await storage.getFeaturedMachinery();
    res.json(featuredMachinery);
  } catch (error) {
    console.error("Error fetching featured machinery:", error);
    res.status(500).json({ message: "Failed to fetch featured machinery" });
  }
}
