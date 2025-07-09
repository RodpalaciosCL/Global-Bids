import { db } from '../server/db';
import { machinery } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function verifyImageCounts() {
  try {
    console.log('🔍 Verifying actual image counts for recently added lots...');
    
    const lotsToCheck = [97, 98, 99, 100, 101, 102, 103, 113, 114];
    
    for (const lotId of lotsToCheck) {
      // Check actual image count
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
      
      // Get from database
      const [dbLot] = await db.select().from(machinery).where(eq(machinery.id, lotId));
      
      if (dbLot) {
        const dbImageCount = dbLot.gallery ? dbLot.gallery.length : 1;
        console.log(`Lot ${lotId}: Database shows ${dbImageCount} images, AWS has ${actualCount} images`);
        
        if (dbImageCount !== actualCount) {
          console.log(`  ⚠️ MISMATCH for Lot ${lotId}!`);
        } else {
          console.log(`  ✅ CORRECT for Lot ${lotId}`);
        }
      } else {
        console.log(`Lot ${lotId}: Not found in database, AWS has ${actualCount} images`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error verifying image counts:', error);
    throw error;
  }
}

verifyImageCounts().catch(console.error);