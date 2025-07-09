import { db } from '../server/db';
import { machinery } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function testImageUrls() {
  console.log('🔍 Testing image URLs for availability...');
  
  // Get first few lots to test
  const lots = await db.select().from(machinery).limit(5);
  
  for (const lot of lots) {
    console.log(`\n📋 Testing Lot ${lot.id}: ${lot.name}`);
    console.log(`   Main image: ${lot.image}`);
    
    if (lot.gallery && lot.gallery.length > 0) {
      console.log(`   Gallery has ${lot.gallery.length} images:`);
      
      // Test first 3 images
      for (let i = 0; i < Math.min(3, lot.gallery.length); i++) {
        const imageUrl = lot.gallery[i];
        try {
          const response = await fetch(imageUrl, { method: 'HEAD' });
          const status = response.ok ? '✅' : '❌';
          console.log(`   ${status} Image ${i + 1}: ${response.status} - ${imageUrl}`);
        } catch (error) {
          console.log(`   ❌ Image ${i + 1}: ERROR - ${imageUrl}`);
        }
      }
    }
  }
}

async function fixBrokenImageUrls() {
  console.log('\n🔧 Checking and fixing image URLs...');
  
  const lots = await db.select().from(machinery);
  
  for (const lot of lots) {
    if (!lot.image || !lot.gallery || lot.gallery.length === 0) {
      console.log(`⚠️ Lot ${lot.id} has missing image data, fixing...`);
      
      // Generate correct URLs
      const correctGallery = [];
      for (let i = 1; i <= 8; i++) { // Default to 8 images
        correctGallery.push(`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.id}_${i}.jpg`);
      }
      
      await db.update(machinery)
        .set({ 
          image: correctGallery[0],
          gallery: correctGallery
        })
        .where(eq(machinery.id, lot.id));
      
      console.log(`✅ Fixed Lot ${lot.id} with ${correctGallery.length} images`);
    }
  }
}

async function debugImages() {
  await testImageUrls();
  await fixBrokenImageUrls();
}

debugImages().catch(console.error);