import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './storage';

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
    const {
      search,
      type,
      brand,
      year,
      minPrice,
      maxPrice,
      condition,
      sort = "price-asc",
      page = "1",
      limit = "40",
      auctionPage,
    } = req.query;

    const result = await storage.searchMachinery(
      search as string | undefined,
      type as string | undefined,
      brand as string | undefined,
      year as string | undefined,
      minPrice ? parseInt(minPrice as string) : undefined,
      maxPrice ? parseInt(maxPrice as string) : undefined,
      condition as string | undefined,
      sort as string,
      parseInt(page as string),
      parseInt(limit as string),
      auctionPage ? parseInt(auctionPage as string) : undefined,
    );

    res.json(result);
  } catch (error) {
    console.error("Error fetching machinery:", error);
    // Return empty result set instead of error to prevent frontend crashes
    res.json({ items: [], total: 0, totalPages: 0 });
  }
}
