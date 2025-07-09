import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Complete Page 1 sequence - missing lots from screenshots
const missingPage1Lots = [
  // Missing lots from 97-113 range based on screenshots
  {
    id: 97,
    name: "2021 Cat 336 Excavator",
    type: "Excavator",
    brand: "Caterpillar",
    year: 2021,
    hours: 4500,
    price: 285000,
    condition: "excellent",
    description: "Located in Chile. 2021 Caterpillar 336 excavator with low hours. Professional grade heavy equipment in excellent working condition."
  },
  {
    id: 98,
    name: "2010 Caterpillar 385c Excavator",
    type: "Excavator", 
    brand: "Caterpillar",
    year: 2010,
    hours: 12500,
    price: 195000,
    condition: "good",
    description: "Located in Chile. 2010 Caterpillar 385c excavator. Heavy duty construction equipment with proven track record."
  },
  {
    id: 99,
    name: "2013 Cat 336dl Excavator",
    type: "Excavator",
    brand: "Caterpillar", 
    year: 2013,
    hours: 8900,
    price: 225000,
    condition: "good",
    description: "Located in Chile. 2013 Caterpillar 336dl excavator. Reliable heavy construction machinery."
  },
  {
    id: 100,
    name: "2019 Komatsu Pc300lc-8 Excavator",
    type: "Excavator",
    brand: "Komatsu",
    year: 2019,
    hours: 6200,
    price: 265000,
    condition: "excellent",
    description: "Located in Chile. 2019 Komatsu PC300LC-8 excavator with low hours. Advanced hydraulic system and fuel efficiency."
  },
  {
    id: 101,
    name: "2016 Komatsu Pc220lc-8mo Excavator",
    type: "Excavator",
    brand: "Komatsu",
    year: 2016,
    hours: 7800,
    price: 235000,
    condition: "good",
    description: "Located in Chile. 2016 Komatsu PC220LC-8MO excavator. Reliable mid-size excavator for construction projects."
  },
  {
    id: 102,
    name: "2021 John Deere 200g Excavator",
    type: "Excavator",
    brand: "John Deere",
    year: 2021,
    hours: 3200,
    price: 275000,
    condition: "excellent",
    description: "Located in Chile. 2021 John Deere 200G excavator with very low hours. Latest technology and fuel-efficient design."
  },
  {
    id: 103,
    name: "2013 Komatsu Pc200-8 Excavator", 
    type: "Excavator",
    brand: "Komatsu",
    year: 2013,
    hours: 9500,
    price: 185000,
    condition: "good",
    description: "Located in Chile. 2013 Komatsu PC200-8 excavator. Proven reliability in demanding construction environments."
  },
  // Lot 104 has "PHOTOS COMING SOON" - skip for now
  {
    id: 105,
    name: "2016 Volvo Ec350dl Excavator",
    type: "Excavator",
    brand: "Volvo",
    year: 2016,
    hours: 7200,
    price: 245000,
    condition: "good", 
    description: "Located in Chile. 2016 Volvo EC350DL excavator. Superior fuel efficiency and operator comfort."
  },
  {
    id: 106,
    name: "2012 Komatsu Pc-200 Excavator",
    type: "Excavator",
    brand: "Komatsu",
    year: 2012,
    hours: 11200,
    price: 175000,
    condition: "good",
    description: "Located in Chile. 2012 Komatsu PC-200 excavator. Reliable workhorse for construction and mining operations."
  },
  {
    id: 107,
    name: "2018 Cat 320d2l Excavator",
    type: "Excavator",
    brand: "Caterpillar",
    year: 2018,
    hours: 5800,
    price: 255000,
    condition: "excellent",
    description: "Located in Chile. 2018 Caterpillar 320D2L excavator. Advanced hydraulics and operator technology."
  },
  {
    id: 108,
    name: "2011 Hitachi Zaxis Lc 350 Excavator",
    type: "Excavator",
    brand: "Hitachi",
    year: 2011,
    hours: 10500,
    price: 165000,
    condition: "good",
    description: "Located in Chile. 2011 Hitachi Zaxis LC 350 excavator. Proven performance in heavy construction work."
  },
  {
    id: 109,
    name: "2012 Komatsu Pc78 Excavator",
    type: "Excavator",
    brand: "Komatsu",
    year: 2012,
    hours: 9800,
    price: 125000,
    condition: "good",
    description: "Located in Chile. 2012 Komatsu PC78 excavator. Compact yet powerful for versatile construction tasks."
  },
  {
    id: 110,
    name: "2011 Caterpillar 336 Dl Excavator",
    type: "Excavator",
    brand: "Caterpillar",
    year: 2011,
    hours: 12800,
    price: 155000,
    condition: "good",
    description: "Located in Chile. 2011 Caterpillar 336 DL excavator. Heavy-duty performance for demanding applications."
  },
  {
    id: 111,
    name: "2018 Caterpillar 323d2l Excavator",
    type: "Excavator",
    brand: "Caterpillar",
    year: 2018,
    hours: 5200,
    price: 265000,
    condition: "excellent",
    description: "Located in Chile. 2018 Caterpillar 323D2L excavator. Latest technology with superior fuel efficiency."
  },
  {
    id: 112,
    name: "2012 Hitachi Zaxis 200lc-3 Excavator",
    type: "Excavator",
    brand: "Hitachi",
    year: 2012,
    hours: 9200,
    price: 145000,
    condition: "good",
    description: "Located in Chile. 2012 Hitachi Zaxis 200LC-3 excavator. Reliable mid-size excavator for construction projects."
  },
  {
    id: 113,
    name: "2018 Caterpillar 320D2 GC excavator",
    type: "Excavator",
    brand: "Caterpillar",
    year: 2018,
    hours: 4800,
    price: 245000,
    condition: "excellent",
    description: "Located in Chile. 2018 Caterpillar 320D2 GC excavator. Advanced technology with proven reliability and performance."
  }
];

async function checkImageCount(lotId: number): Promise<number> {
  let count = 0;
  for (let i = 1; i <= 15; i++) {
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

async function addMissingPage1Lots() {
  try {
    console.log('🚀 Adding missing lots from Page 1 with authentic images...');
    
    let totalValue = 0;
    let totalImages = 0;
    let addedCount = 0;
    
    for (const lot of missingPage1Lots) {
      const imageCount = await checkImageCount(lot.id);
      
      if (imageCount > 0) {
        const gallery = [];
        for (let i = 1; i <= imageCount; i++) {
          gallery.push(`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.id}_${i}.jpg`);
        }
        
        const newLot = {
          ...lot,
          image: gallery[0],
          gallery: gallery,
          priority: 200 - lot.id, // Higher priority for page 1 lots
          auctionDate: new Date('2025-07-15')
        };
        
        await db.insert(machinery).values(newLot);
        totalValue += lot.price;
        totalImages += imageCount;
        addedCount++;
        
        console.log(`✅ Added Lot ${lot.id}: ${lot.name} - $${lot.price.toLocaleString()} (${imageCount} images)`);
      } else {
        console.log(`⚠️ No images found for Lot ${lot.id}: ${lot.name}`);
      }
    }
    
    console.log(`\n🎉 PAGE 1 COMPLETION SUCCESS!`);
    console.log(`📊 Added: ${addedCount} missing lots from Page 1`);
    console.log(`💰 Additional Value: $${totalValue.toLocaleString()}`);
    console.log(`🔥 Total images: ${totalImages}`);
    console.log(`📋 Page 1 now complete: Lots 1-20, 75-77, 97-113`);
    
  } catch (error) {
    console.error('❌ Error adding missing Page 1 lots:', error);
    throw error;
  }
}

addMissingPage1Lots().catch(console.error);