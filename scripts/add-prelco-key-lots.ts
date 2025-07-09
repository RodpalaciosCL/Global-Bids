import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Add key lots from each page of Prelco auction with authentic data
const keyPrelcoLots = [
  // Lot 114 - Page 2 opener - CAT 323 with 14 images
  {
    id: 114,
    name: "New 2025 CAT 323 excavator (unused)",
    type: "Excavator",
    brand: "Caterpillar",
    year: 2025,
    hours: 0,
    price: 285000,
    condition: "excellent",
    description: "Located in Shanghai, China, SN/ CAT00323HGKW30018. Featuring a C7.1 single turbo engine, 151 kW (205hp), the 323 meets China Nonroad Stage IV emission standards, LED work lights, rock guards, grade assist, CAT payload, touch screen monitor, customizable joy sticks, push to start, 1.83 cubic yard bucket. Located in Shanghai, China.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_1.jpg",
    gallery: [
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_1.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_2.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_3.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_4.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_5.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_6.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_7.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_8.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_9.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_10.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_11.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_12.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_13.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/114_14.jpg"
    ],
    priority: 10,
    auctionDate: new Date('2025-07-15')
  },
  // Lot 204 - Page 3 opener - John Deere 744k with 4 images
  {
    id: 204,
    name: "2012 John Deere 744k Wheel Loader",
    type: "Loader",
    brand: "John Deere",
    year: 2012,
    hours: 20549,
    price: 185000,
    condition: "good",
    description: "Located in Maria Elena, Chile, SN/ 1DW744KXECD643807. Meter reads 20,549 hours, runs and operates, full glass, solid bucket, work lights, 4 speed transmission. Located in Maria Elena, Chile.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/204_1.jpg",
    gallery: [
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/204_1.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/204_2.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/204_3.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/204_4.jpg"
    ],
    priority: 9,
    auctionDate: new Date('2025-07-15')
  },
  // Lot 376 - Page 4 opener - Refrigerated Truck Body with 5 images
  {
    id: 376,
    name: "2022 Refrigerated Truck Body",
    type: "Truck Body",
    brand: "Huabon",
    year: 2022,
    hours: 0,
    price: 35000,
    condition: "excellent",
    description: "Located in Paine, Chile. Huabon Refrigeration Unit, measurements length 6.70m width 2.20m, height 2.25m. Located in Paine, Chile.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/376_1.jpg",
    gallery: [
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/376_1.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/376_2.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/376_3.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/376_4.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/376_5.jpg"
    ],
    priority: 8,
    auctionDate: new Date('2025-07-15')
  },
  // Lot 502 - Page 4 last lot - AEI Lowbed Trailer with 6 images
  {
    id: 502,
    name: "1998 AEI Lowbed Trailer",
    type: "Trailer",
    brand: "AEI",
    year: 1998,
    hours: 0,
    price: 22000,
    condition: "good",
    description: "Located in Paine, Chile. 3-axle semi-trailer, length 7.50m and width 1.25m, LED lighting, flip third axle, air suspension, D-rings, good rubber all around. Located in Paine, Chile.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/502_1.jpg",
    gallery: [
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/502_1.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/502_2.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/502_3.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/502_4.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/502_5.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/502_6.jpg"
    ],
    priority: 7,
    auctionDate: new Date('2025-07-15')
  }
];

async function addKeyPrelcoLots() {
  try {
    console.log('🚀 Adding key lots from all pages of Prelco auction...');
    
    for (const lot of keyPrelcoLots) {
      console.log(`✅ Adding Lot ${lot.id}: ${lot.name} - $${lot.price.toLocaleString()} (${lot.gallery.length} images)`);
      await db.insert(machinery).values(lot);
    }

    const totalNewValue = keyPrelcoLots.reduce((sum, lot) => sum + lot.price, 0);
    console.log(`\n🎉 KEY PRELCO LOTS ADDED!`);
    console.log(`📊 Added: ${keyPrelcoLots.length} key lots from all 4 pages`);
    console.log(`💰 Additional Value: $${totalNewValue.toLocaleString()}`);
    console.log(`🔥 Total gallery images: ${keyPrelcoLots.reduce((sum, lot) => sum + lot.gallery.length, 0)}`);
    
  } catch (error) {
    console.error('❌ Error adding key Prelco lots:', error);
    throw error;
  }
}

addKeyPrelcoLots().catch(console.error);