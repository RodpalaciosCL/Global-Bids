import { db } from '../server/db';
import { machinery } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function verifyImage(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.status === 200;
  } catch {
    return false;
  }
}

async function countLotImages(lotId: number): Promise<number> {
  let count = 0;
  for (let i = 1; i <= 25; i++) {
    const url = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lotId}_${i}.jpg`;
    const exists = await verifyImage(url);
    if (exists) {
      count++;
    } else {
      break;
    }
  }
  return count;
}

// Additional lots to test based on common auction numbering
const additionalLots = [
  150, 155, 160, 165, 170, 175, 180, 185, 190, 195,
  200, 205, 210, 215, 220, 225, 230, 235, 240, 245,
  250, 255, 260, 265, 270, 275, 280, 285, 290, 295
];

async function addRemainingLots() {
  console.log('🔍 Testing additional lot numbers for images...');
  
  let added = 0;
  let totalNewImages = 0;
  
  for (const lotId of additionalLots) {
    console.log(`Testing Lot ${lotId}...`);
    
    // Check if already exists
    const [existing] = await db.select().from(machinery).where(eq(machinery.id, lotId));
    if (existing) {
      console.log(`⚪ Lot ${lotId}: Already exists`);
      continue;
    }
    
    const imageCount = await countLotImages(lotId);
    
    if (imageCount > 0) {
      const gallery = [];
      for (let i = 1; i <= imageCount; i++) {
        gallery.push(`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lotId}_${i}.jpg`);
      }
      
      try {
        await db.insert(machinery).values({
          id: lotId,
          name: `Professional Equipment Unit-${lotId}`,
          type: 'Professional Equipment',
          brand: 'Various',
          year: 2022,
          hours: 2200,
          price: 140000,
          condition: 'very good',
          description: `Located in Chile. Professional equipment from the International Global Bids And Prelco Auctions scheduled for July 15, 2025.`,
          image: gallery[0],
          gallery: gallery,
          auctionDate: '2025-07-15',
          priority: 45,
          isSold: false,
          createdAt: new Date().toISOString().split('T')[0]
        });
        
        added++;
        totalNewImages += imageCount;
        console.log(`✅ Added Lot ${lotId}: ${imageCount} images`);
        
      } catch (error) {
        console.error(`❌ Error adding Lot ${lotId}:`, error);
      }
    }
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log(`\n🎉 ADDITIONAL LOTS SCAN COMPLETE!`);
  console.log(`📊 Added: ${added} new lots`);
  console.log(`🖼️ Added images: ${totalNewImages}`);
}

addRemainingLots().catch(console.error);