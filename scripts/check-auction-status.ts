import { db } from '../server/db';
import { machinery } from '../shared/schema';
import { eq, count } from 'drizzle-orm';

async function checkAuctionStatus() {
  try {
    console.log('📊 Checking current Prelco auction status...');
    
    // Get all lots
    const allLots = await db.select().from(machinery);
    const totalValue = allLots.reduce((sum, lot) => sum + lot.price, 0);
    
    // Group by ranges for analysis
    const page1Lots = allLots.filter(lot => 
      (lot.id >= 1 && lot.id <= 20) || 
      (lot.id >= 75 && lot.id <= 77) || 
      (lot.id >= 97 && lot.id <= 113)
    );
    
    const page2Lots = allLots.filter(lot => lot.id >= 114 && lot.id <= 200);
    const page3Lots = allLots.filter(lot => lot.id >= 201 && lot.id <= 300);
    const page4Lots = allLots.filter(lot => lot.id >= 301 && lot.id <= 500);
    
    // Count images
    const totalImages = allLots.reduce((sum, lot) => sum + (lot.gallery ? lot.gallery.length : 1), 0);
    
    console.log(`\n🎉 PRELCO AUCTION STATUS UPDATE`);
    console.log(`📊 Total lots loaded: ${allLots.length}`);
    console.log(`💰 Total auction value: $${totalValue.toLocaleString()}`);
    console.log(`🔥 Total authentic images: ${totalImages}`);
    
    console.log(`\n📄 PAGE BREAKDOWN:`);
    console.log(`   Page 1: ${page1Lots.length} lots (Lots 1-20, 75-77, 97-113)`);
    console.log(`   Page 2: ${page2Lots.length} lots (Lots 114-200)`);
    console.log(`   Page 3: ${page3Lots.length} lots (Lots 201-300)`);
    console.log(`   Page 4: ${page4Lots.length} lots (Lots 301-500)`);
    
    console.log(`\n🏆 TOP VALUE LOTS:`);
    const topLots = allLots
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);
    
    topLots.forEach((lot, index) => {
      const imageCount = lot.gallery ? lot.gallery.length : 1;
      console.log(`   ${index + 1}. Lot ${lot.id}: ${lot.name} - $${lot.price.toLocaleString()} (${imageCount} images)`);
    });
    
    console.log(`\n📅 Auction Date: July 15, 2025`);
    console.log(`🌍 International Global Bids And Prelco Auctions`);
    
    return {
      totalLots: allLots.length,
      totalValue,
      totalImages,
      pages: {
        page1: page1Lots.length,
        page2: page2Lots.length,
        page3: page3Lots.length,
        page4: page4Lots.length
      }
    };
    
  } catch (error) {
    console.error('❌ Error checking auction status:', error);
    throw error;
  }
}

checkAuctionStatus().catch(console.error);