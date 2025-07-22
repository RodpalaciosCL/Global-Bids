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
    const { path } = req.query;
    const imagePath = Array.isArray(path) ? path.join('/') : path;
    const imageUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${imagePath}`;
    
    console.log('Proxying image:', imageUrl);
    
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      console.log('Image not found:', imageUrl, 'Status:', response.status);
      return res.status(404).json({ message: "Image not found" });
    }
    
    const imageBuffer = Buffer.from(await response.arrayBuffer());
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error proxying image:", error);
    res.status(500).json({ message: "Failed to fetch image" });
  }
}
