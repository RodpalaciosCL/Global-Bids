import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Function to verify image exists
async function verifyImageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.status === 200;
  } catch {
    return false;
  }
}

// Additional lots to test and add if they have real images
const lotCandidates = [
  { id: 19, name: "Heavy Equipment Unit-19" },
  { id: 20, name: "Heavy Equipment Unit-20" },
  { id: 21, name: "Heavy Equipment Unit-21" },
  { id: 22, name: "Heavy Equipment Unit-22" },
  { id: 23, name: "Heavy Equipment Unit-23" },
  { id: 24, name: "Heavy Equipment Unit-24" },
  { id: 25, name: "Heavy Equipment Unit-25" },
  { id: 26, name: "Heavy Equipment Unit-26" },
  { id: 27, name: "Heavy Equipment Unit-27" },
  { id: 28, name: "Heavy Equipment Unit-28" },
  { id: 29, name: "Heavy Equipment Unit-29" },
  { id: 30, name: "Heavy Equipment Unit-30" },
  { id: 140, name: "Elite Heavy Machinery Unit-140" },
  { id: 145, name: "Elite Heavy Machinery Unit-145" },
  { id: 150, name: "Elite Heavy Machinery Unit-150" },
  { id: 155, name: "Elite Heavy Machinery Unit-155" },
  { id: 160, name: "Elite Heavy Machinery Unit-160" }
];

async function detectAndAddConfirmedLots() {
  console.log('🔍 Testing additional lot candidates for real images...');
  
  let added = 0;
  let totalNewImages = 0;
  const confirmedLots = [];
  
  for (const candidate of lotCandidates) {
    console.log(`\n🔍 Testing Lot ${candidate.id}...`);
    
    // Test if first image exists
    const firstImageUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${candidate.id}_1.jpg`;
    const hasImages = await verifyImageExists(firstImageUrl);
    
    if (!hasImages) {
      console.log(`❌ Lot ${candidate.id}: No images found`);
      continue;
    }
    
    // Detect how many images this lot has
    let imageCount = 0;
    for (let i = 1; i <= 25; i++) {
      const imageUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${candidate.id}_${i}.jpg`;
      const exists = await verifyImageExists(imageUrl);
      
      if (exists) {
        imageCount++;
      } else {
        break;
      }
    }
    
    if (imageCount > 0) {
      // Build gallery
      const gallery = [];
      for (let i = 1; i <= imageCount; i++) {
        gallery.push(`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${candidate.id}_${i}.jpg`);
      }
      
      // Add to database
      try {
        await db.insert(machinery).values({
          id: candidate.id,
          name: candidate.name,
          type: 'Heavy Equipment',
          brand: 'Various',
          year: 2020,
          hours: 4000,
          price: 115000,
          condition: 'good',
          description: `Located in Chile. Professional equipment from the International Global Bids And Prelco Auctions scheduled for July 15, 2025.`,
          image: gallery[0],
          gallery: gallery,
          auctionDate: '2025-07-15',
          priority: 45,
          isSold: false,
          createdAt: new Date().toISOString().split('T')[0]
        });
        
        confirmedLots.push({ id: candidate.id, name: candidate.name, images: imageCount });
        added++;
        totalNewImages += imageCount;
        console.log(`✅ Added Lot ${candidate.id}: ${imageCount} verified images`);
        
      } catch (error) {
        console.error(`❌ Error adding Lot ${candidate.id}:`, error);
      }
    }
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log(`\n🎉 ADDITIONAL LOTS CONFIRMED!`);
  console.log(`📊 Added ${added} new lots`);
  console.log(`🖼️ Total new images: ${totalNewImages}`);
  
  if (confirmedLots.length > 0) {
    console.log('\n📋 NEWLY CONFIRMED LOTS:');
    console.table(confirmedLots);
  }
}

detectAndAddConfirmedLots().catch(console.error);