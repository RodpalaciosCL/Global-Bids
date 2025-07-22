import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../lib/storage';

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
    const { id } = req.query;
    const machineryId = parseInt(id as string);
    
    if (isNaN(machineryId)) {
      return res.status(400).json({ message: 'Invalid machinery ID' });
    }

    const machinery = await storage.getMachinery(machineryId);

    if (!machinery) {
      return res.status(404).json({ message: "Machinery not found" });
    }

    res.json(machinery);
  } catch (error) {
    console.error("Error fetching machinery:", error);
    res.status(500).json({ message: "Failed to fetch machinery" });
  }
}
