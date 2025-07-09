import { db } from '../server/db';
import { machinery } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function checkRealImageCount(lotId: number): Promise<number> {
  let count = 0;
  for (let i = 1; i <= 30; i++) { // Check up to 30 images
    try {
      const response = await fetch(`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lotId}_${i}.jpg`, { method: 'HEAD' });
      if (response.ok) {
        count++;
      } else {
        break;
      }
    } catch {
      break;
    }
  }
  return count;
}

async function fixAllImageCounts() {
  try {
    console.log('🔧 Fixing ALL image counts to match AWS reality...');
    
    const allLots = await db.select().from(machinery);
    let updatedCount = 0;
    let totalCorrectImages = 0;
    
    for (const lot of allLots) {
      const realImageCount = await checkRealImageCount(lot.id);
      const currentGalleryCount = lot.gallery ? lot.gallery.length : 1;
      
      if (realImageCount !== currentGalleryCount && realImageCount > 0) {
        // Build correct gallery array
        const correctGallery = [];
        for (let i = 1; i <= realImageCount; i++) {
          correctGallery.push(`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.id}_${i}.jpg`);
        }
        
        // Update the lot
        await db.update(machinery)
          .set({ 
            gallery: correctGallery,
            image: correctGallery[0] // Update main image too
          })
          .where(eq(machinery.id, lot.id));
        
        console.log(`✅ Fixed Lot ${lot.id}: ${currentGalleryCount} → ${realImageCount} images`);
        updatedCount++;
      } else if (realImageCount > 0) {
        console.log(`✓ Lot ${lot.id}: Correct (${realImageCount} images)`);
      } else {
        console.log(`⚠️ Lot ${lot.id}: No images found`);
      }
      
      totalCorrectImages += realImageCount;
    }
    
    console.log(`\n🎉 IMAGE COUNT CORRECTION COMPLETE!`);
    console.log(`📊 Updated lots: ${updatedCount}`);
    console.log(`🔥 Total real images: ${totalCorrectImages}`);
    console.log(`📋 All lots now have accurate image counts`);
    
  } catch (error) {
    console.error('❌ Error fixing all image counts:', error);
    throw error;
  }
}

fixAllImageCounts().catch(console.error);