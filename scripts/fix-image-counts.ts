import { db } from '../server/db';
import { machinery } from '../shared/schema';
import { eq } from 'drizzle-orm';

// Fix image counts for lots that were incorrectly loaded
async function fixImageCounts() {
  try {
    console.log('🔧 Fixing image counts for incorrectly loaded lots...');
    
    const lotsToFix = [97, 98]; // These had incorrect counts
    
    for (const lotId of lotsToFix) {
      // Get actual image count
      let actualCount = 0;
      for (let i = 1; i <= 20; i++) {
        try {
          const response = await fetch(`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lotId}_${i}.jpg`, { method: 'HEAD' });
          if (response.ok) {
            actualCount++;
          } else {
            break;
          }
        } catch {
          break;
        }
      }
      
      if (actualCount > 0) {
        // Build correct gallery array
        const correctGallery = [];
        for (let i = 1; i <= actualCount; i++) {
          correctGallery.push(`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lotId}_${i}.jpg`);
        }
        
        // Update the lot
        await db.update(machinery)
          .set({ gallery: correctGallery })
          .where(eq(machinery.id, lotId));
        
        console.log(`✅ Fixed Lot ${lotId}: Updated to ${actualCount} images`);
      }
    }
    
    // Get final status
    const result = await db.select().from(machinery);
    const totalImages = result.reduce((sum, lot) => sum + (lot.gallery ? lot.gallery.length : 1), 0);
    
    console.log(`\n🎉 IMAGE COUNT CORRECTION COMPLETE!`);
    console.log(`📊 Total lots: ${result.length}`);
    console.log(`🔥 Corrected total images: ${totalImages}`);
    
  } catch (error) {
    console.error('❌ Error fixing image counts:', error);
    throw error;
  }
}

fixImageCounts().catch(console.error);