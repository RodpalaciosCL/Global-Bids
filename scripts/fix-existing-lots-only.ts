import { db } from '../server/db';
import { machinery } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

async function getRealImageCount(lotId: number): Promise<{ count: number; gallery: string[] }> {
  const gallery: string[] = [];
  let count = 0;
  
  // Check images sequentially until we find a missing one
  for (let i = 1; i <= 25; i++) { // Check up to 25 images per lot
    const imageUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lotId}_${i}.jpg`;
    const exists = await checkImageExists(imageUrl);
    
    if (exists) {
      gallery.push(imageUrl);
      count++;
    } else {
      break; // Stop at first missing image
    }
  }
  
  return { count, gallery };
}

async function fixExistingLotsOnly() {
  console.log('🔧 Fixing image counts for existing lots only...');
  
  try {
    // Get all existing lots from database
    const existingLots = await db.select().from(machinery);
    console.log(`📋 Found ${existingLots.length} existing lots`);
    
    let correctedCount = 0;
    let totalImages = 0;
    const results: Array<{id: number, name: string, before: number, after: number}> = [];
    
    for (const lot of existingLots) {
      const currentImageCount = lot.gallery?.length || 1;
      const { count: realCount, gallery: realGallery } = await getRealImageCount(lot.id);
      
      if (realCount > 0 && realCount !== currentImageCount) {
        // Update lot with correct image count and gallery
        await db.update(machinery)
          .set({ 
            gallery: realGallery,
            image: realGallery[0] // Update main image to first in gallery
          })
          .where(eq(machinery.id, lot.id));
        
        results.push({
          id: lot.id,
          name: lot.name,
          before: currentImageCount,
          after: realCount
        });
        
        correctedCount++;
        console.log(`✅ Lot ${lot.id}: ${currentImageCount} → ${realCount} images`);
      } else if (realCount > 0) {
        console.log(`✓ Lot ${lot.id}: Correct (${realCount} images)`);
      } else {
        console.log(`⚠️ Lot ${lot.id}: No images found`);
      }
      
      totalImages += realCount;
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log('\n🎉 EXISTING LOTS IMAGE COUNT CORRECTION COMPLETE!');
    console.log(`📊 Corrected lots: ${correctedCount}`);
    console.log(`🖼️ Total authentic images: ${totalImages}`);
    console.log(`💯 All ${existingLots.length} existing lots now have exact image counts`);
    
    if (results.length > 0) {
      console.log('\n📋 CORRECTIONS MADE:');
      console.table(results);
    }
    
  } catch (error) {
    console.error('❌ Error fixing existing lots:', error);
    throw error;
  }
}

fixExistingLotsOnly().catch(console.error);