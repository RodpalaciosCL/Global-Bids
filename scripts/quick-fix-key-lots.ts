import { db } from '../server/db';
import { machinery } from '../shared/schema';
import { eq } from 'drizzle-orm';

// Key lots with known image counts from Puppeteer analysis
const KNOWN_IMAGE_COUNTS: Record<number, number> = {
  77: 22, // Peugeot Landtrek - confirmed 22 images
  76: 22, // Another lot with 22 images
  78: 8,  // Example from Puppeteer output
  97: 20, // Cat 336
  98: 20, // Cat 385c  
  114: 14 // Cat 323
};

async function quickFixKeyLots() {
  console.log('🚀 Quick fix for key lots with known image counts...');
  
  let updatedCount = 0;
  
  for (const [lotId, realImageCount] of Object.entries(KNOWN_IMAGE_COUNTS)) {
    const id = parseInt(lotId);
    
    // Build correct gallery array
    const correctGallery = [];
    for (let i = 1; i <= realImageCount; i++) {
      correctGallery.push(`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${id}_${i}.jpg`);
    }
    
    // Update the lot
    await db.update(machinery)
      .set({ 
        gallery: correctGallery,
        image: correctGallery[0]
      })
      .where(eq(machinery.id, id));
    
    console.log(`✅ Fixed Lot ${id}: Now has ${realImageCount} images`);
    updatedCount++;
  }
  
  console.log(`\n🎉 Quick fix complete! Updated ${updatedCount} key lots.`);
  console.log('📸 Verified image counts:');
  Object.entries(KNOWN_IMAGE_COUNTS).forEach(([id, count]) => {
    console.log(`   Lote ${id}: ${count} imágenes auténticas`);
  });
}

quickFixKeyLots().catch(console.error);