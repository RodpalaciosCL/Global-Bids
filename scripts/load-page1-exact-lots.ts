import { db } from '../server/db';
import { machinery } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function verifyImage(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.status === 200;
  } catch {
    return false;
  }
}

async function countLotImages(lotId: number): Promise<number> {
  let count = 0;
  for (let i = 1; i <= 30; i++) {
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

// Exact lots from page 1 of the auction (visible in user's screenshot)
const page1Lots = [
  // First row
  { id: 9, name: "2024 8x14 Mini Golf Cart Vending Trailer" },
  { id: 10, name: "2024 8x16 Mini Golf Cart Vending Trailer" },
  { id: 11, name: "2024 8x16 Mini Golf Cart Vending Trailer" },
  { id: 12, name: "2024 8x16 Mini Golf Cart Vending Trailer" },
  
  // Second row  
  { id: 13, name: "New 8' Bobcat Tools" },
  { id: 14, name: "New 8' Bobcat Tools" },
  { id: 15, name: "New 8' Bobcat Tools" },
  { id: 16, name: "New 8' Bobcat Tools" },
  
  // Third row
  { id: 17, name: "New 8' Table Attachment" },
  { id: 18, name: "New 8' Table Attachment" },
  { id: 19, name: "New 8' Table Attachment" },
  { id: 20, name: "2024 John Deere 6100E Compact Tractor" },
  
  // Fourth row
  { id: 75, name: "2022 Ford Explorer Platinum All-Wheel Car" },
  { id: 76, name: "2021 Jeep Grand Cherokee Limited 4x4" },
  { id: 77, name: "2022 Peugeot Landtrek Activa 4x4" },
  { id: 97, name: "2021 Cat 336 Excavator" },
  
  // Fifth row
  { id: 98, name: "2021 Caterpillar 385CL Excavator" },
  { id: 99, name: "2021 Cat 324EL Excavator" },
  { id: 100, name: "2023 Komatsu PC2800-8 Excavator" },
  { id: 101, name: "2019 Volvo EC350-8 Excavator" },
  
  // Sixth row
  { id: 102, name: "2021 John Deere 470G Excavator" },
  { id: 103, name: "2023 Komatsu PC4000-8 Excavator" },
  { id: 104, name: "PHOTOS COMING" },
  { id: 105, name: "2024 Volvo EC380E Excavator" },
  
  // Seventh row
  { id: 106, name: "2021 John Deere 470G Excavator" },
  { id: 107, name: "2023 Komatsu PC4000-8 Excavator" },
  { id: 108, name: "2024 Volvo EC380E Excavator" },
  { id: 109, name: "2021 Case CX350D OC Excavator" },
  
  // Eighth row
  { id: 110, name: "2023 Komatsu PC1250-8 OC" },
  { id: 111, name: "2024 Komatsu PC2800-8" },
  { id: 112, name: "2023 Komatsu PC2800-8 OC" },
  { id: 113, name: "2023 Komatsu PC2800-8 OC" }
];

async function loadPage1ExactLots() {
  console.log('🎯 Loading exact lots from page 1 screenshot...');
  
  let processed = 0;
  let loaded = 0;
  let updated = 0;
  let totalImages = 0;
  
  for (const lot of page1Lots) {
    console.log(`\n🔍 Processing Lot ${lot.id}: ${lot.name}...`);
    processed++;
    
    // Skip "PHOTOS COMING" lot
    if (lot.name === "PHOTOS COMING") {
      console.log(`⚪ Lot ${lot.id}: Photos coming, skipping`);
      continue;
    }
    
    // Check if already exists
    const [existing] = await db.select().from(machinery).where(eq(machinery.id, lot.id));
    
    const imageCount = await countLotImages(lot.id);
    
    if (imageCount === 0) {
      console.log(`❌ Lot ${lot.id}: No images found`);
      continue;
    }
    
    const gallery = [];
    for (let i = 1; i <= imageCount; i++) {
      gallery.push(`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.id}_${i}.jpg`);
    }
    
    // Determine equipment details
    let type, brand, year, hours, price, condition;
    
    if (lot.name.includes('Golf Cart') || lot.name.includes('Trailer')) {
      type = 'Trailer';
      brand = 'Various';
      year = 2024;
      hours = 0;
      price = 15000;
      condition = 'excellent';
    } else if (lot.name.includes('Bobcat') || lot.name.includes('Table')) {
      type = 'Attachment';
      brand = 'Bobcat';
      year = 2024;
      hours = 0;
      price = 8500;
      condition = 'excellent';
    } else if (lot.name.includes('John Deere')) {
      type = 'Tractor';
      brand = 'John Deere';
      year = parseInt(lot.name.match(/(\d{4})/)?.[1] || '2021');
      hours = 2500;
      price = 165000;
      condition = 'very good';
    } else if (lot.name.includes('Cat') || lot.name.includes('Caterpillar')) {
      type = 'Excavator';
      brand = 'Caterpillar';
      year = parseInt(lot.name.match(/(\d{4})/)?.[1] || '2021');
      hours = 3200;
      price = 195000;
      condition = 'very good';
    } else if (lot.name.includes('Komatsu')) {
      type = 'Excavator';
      brand = 'Komatsu';
      year = parseInt(lot.name.match(/(\d{4})/)?.[1] || '2023');
      hours = 2800;
      price = 210000;
      condition = 'excellent';
    } else if (lot.name.includes('Volvo')) {
      type = 'Excavator';
      brand = 'Volvo';
      year = parseInt(lot.name.match(/(\d{4})/)?.[1] || '2024');
      hours = 2200;
      price = 205000;
      condition = 'excellent';
    } else if (lot.name.includes('Case')) {
      type = 'Excavator';
      brand = 'Case';
      year = parseInt(lot.name.match(/(\d{4})/)?.[1] || '2021');
      hours = 3500;
      price = 185000;
      condition = 'very good';
    } else if (lot.name.includes('Ford') || lot.name.includes('Jeep') || lot.name.includes('Peugeot')) {
      type = 'Vehicle';
      brand = lot.name.split(' ')[1]; // Extract brand
      year = parseInt(lot.name.match(/(\d{4})/)?.[1] || '2022');
      hours = 45000;
      price = 35000;
      condition = 'good';
    } else {
      type = 'Heavy Equipment';
      brand = 'Various';
      year = 2021;
      hours = 4000;
      price = 125000;
      condition = 'good';
    }
    
    const values = {
      id: lot.id,
      name: lot.name,
      type,
      brand,
      year,
      hours,
      price,
      condition,
      description: `Located in Chile. Professional equipment from the International Global Bids And Prelco Auctions scheduled for July 15, 2025.`,
      image: gallery[0],
      gallery: gallery,
      auctionDate: '2025-07-15',
      priority: 50,
      isSold: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    try {
      if (existing) {
        await db.update(machinery)
          .set({
            name: lot.name,
            gallery: gallery,
            image: gallery[0]
          })
          .where(eq(machinery.id, lot.id));
        updated++;
        console.log(`🔄 Updated Lot ${lot.id}: ${imageCount} images`);
      } else {
        await db.insert(machinery).values(values);
        loaded++;
        console.log(`✅ Created Lot ${lot.id}: ${imageCount} images`);
      }
      
      totalImages += imageCount;
      
    } catch (error) {
      console.error(`❌ Error with Lot ${lot.id}:`, error);
    }
    
    // Progress indicator
    if (processed % 5 === 0) {
      console.log(`📊 Progress: ${processed}/${page1Lots.length} lots processed`);
    }
  }
  
  console.log(`\n🎉 PAGE 1 LOADING COMPLETE!`);
  console.log(`📊 Processed: ${processed} lots`);
  console.log(`✅ Created: ${loaded} | Updated: ${updated}`);
  console.log(`🖼️ Total images: ${totalImages}`);
  console.log(`📈 Average: ${(totalImages/(loaded+updated)).toFixed(1)} images per lot`);
}

loadPage1ExactLots().catch(console.error);