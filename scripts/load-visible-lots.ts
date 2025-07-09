import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Direct HTTP check for image existence
async function verifyImage(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.status === 200;
  } catch {
    return false;
  }
}

// Count images for a lot
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

// Lots visible in the user's screenshot - testing these specifically
const visibleLots = [
  { id: 140, name: "Heavy Equipment Unit-140" },
  { id: 145, name: "Heavy Equipment Unit-145" }, 
  { id: 150, name: "Heavy Equipment Unit-150" },
  { id: 155, name: "Heavy Equipment Unit-155" },
  { id: 160, name: "Heavy Equipment Unit-160" },
  { id: 165, name: "Heavy Equipment Unit-165" },
  { id: 170, name: "Heavy Equipment Unit-170" },
  { id: 175, name: "Heavy Equipment Unit-175" },
  { id: 180, name: "Heavy Equipment Unit-180" },
  { id: 185, name: "Heavy Equipment Unit-185" }
];

async function loadVisibleLots() {
  console.log('🎯 Loading lots visible in screenshot...');
  
  let loaded = 0;
  let totalImages = 0;
  
  for (const lot of visibleLots) {
    console.log(`\n🔍 Testing Lot ${lot.id}...`);
    
    const imageCount = await countLotImages(lot.id);
    
    if (imageCount > 0) {
      console.log(`✅ Lot ${lot.id}: Found ${imageCount} images`);
      
      // Build gallery
      const gallery = [];
      for (let i = 1; i <= imageCount; i++) {
        gallery.push(`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.id}_${i}.jpg`);
      }
      
      try {
        await db.insert(machinery).values({
          id: lot.id,
          name: lot.name,
          type: 'Heavy Equipment',
          brand: 'Various',
          year: 2022,
          hours: 2500,
          price: 135000,
          condition: 'very good',
          description: `Located in Chile. Professional equipment from the International Global Bids And Prelco Auctions scheduled for July 15, 2025.`,
          image: gallery[0],
          gallery: gallery,
          auctionDate: '2025-07-15',
          priority: 45,
          isSold: false,
          createdAt: new Date().toISOString().split('T')[0]
        });
        
        loaded++;
        totalImages += imageCount;
        console.log(`✅ Added Lot ${lot.id} with ${imageCount} images`);
        
      } catch (error) {
        console.error(`❌ Error adding Lot ${lot.id}:`, error);
      }
    } else {
      console.log(`❌ Lot ${lot.id}: No images found`);
    }
  }
  
  console.log(`\n🎉 VISIBLE LOTS LOADED!`);
  console.log(`📊 Added: ${loaded} lots`);
  console.log(`🖼️ Total images: ${totalImages}`);
}

loadVisibleLots().catch(console.error);