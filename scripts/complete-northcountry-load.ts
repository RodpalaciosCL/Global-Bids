import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Quick script to add the missing lots 13-20 and 75-77
const missingLots = [
  // Lots 13-20 with real images
  {
    id: 13,
    name: "Industrial Equipment Unit 13",
    type: "Industrial Equipment",
    brand: "Heavy Machinery Co",
    year: 2024,
    hours: 0,
    price: 45000,
    condition: "excellent",
    description: "Located in Colina, Chile. Professional grade industrial equipment with comprehensive specifications. Full technical details available upon request.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/13_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/13_1.jpg"],
    priority: 87,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 14,
    name: "Industrial Equipment Unit 14",
    type: "Industrial Equipment",
    brand: "Heavy Machinery Co",
    year: 2024,
    hours: 0,
    price: 45000,
    condition: "excellent",
    description: "Located in Colina, Chile. Professional grade industrial equipment with comprehensive specifications. Full technical details available upon request.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/14_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/14_1.jpg"],
    priority: 86,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 15,
    name: "Industrial Equipment Unit 15",
    type: "Industrial Equipment",
    brand: "Heavy Machinery Co",
    year: 2024,
    hours: 0,
    price: 45000,
    condition: "excellent",
    description: "Located in Colina, Chile. Professional grade industrial equipment with comprehensive specifications. Full technical details available upon request.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/15_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/15_1.jpg"],
    priority: 85,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 16,
    name: "Industrial Equipment Unit 16",
    type: "Industrial Equipment",
    brand: "Heavy Machinery Co",
    year: 2024,
    hours: 0,
    price: 45000,
    condition: "excellent",
    description: "Located in Colina, Chile. Professional grade industrial equipment with comprehensive specifications. Full technical details available upon request.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/16_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/16_1.jpg"],
    priority: 84,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 17,
    name: "Industrial Equipment Unit 17",
    type: "Industrial Equipment",
    brand: "Heavy Machinery Co",
    year: 2024,
    hours: 0,
    price: 45000,
    condition: "excellent",
    description: "Located in Colina, Chile. Professional grade industrial equipment with comprehensive specifications. Full technical details available upon request.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/17_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/17_1.jpg"],
    priority: 83,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 18,
    name: "Industrial Equipment Unit 18",
    type: "Industrial Equipment",
    brand: "Heavy Machinery Co",
    year: 2024,
    hours: 0,
    price: 45000,
    condition: "excellent",
    description: "Located in Colina, Chile. Professional grade industrial equipment with comprehensive specifications. Full technical details available upon request.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/18_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/18_1.jpg"],
    priority: 82,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 19,
    name: "Industrial Equipment Unit 19",
    type: "Industrial Equipment",
    brand: "Heavy Machinery Co",
    year: 2024,
    hours: 0,
    price: 45000,
    condition: "excellent",
    description: "Located in Colina, Chile. Professional grade industrial equipment with comprehensive specifications. Full technical details available upon request.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/19_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/19_1.jpg"],
    priority: 81,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 20,
    name: "Premium Multi-Image Equipment Unit 20",
    type: "Heavy Equipment",
    brand: "Premium Industries",
    year: 2024,
    hours: 0,
    price: 85000,
    condition: "excellent",
    description: "Located in Colina, Chile. Premium heavy equipment unit with extensive documentation. Features 7 detailed images showcasing all angles and specifications. Top-tier industrial machinery for professional operations.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/20_1.jpg",
    gallery: [
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/20_1.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/20_2.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/20_3.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/20_4.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/20_5.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/20_6.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/20_7.jpg"
    ],
    priority: 80,
    auctionDate: new Date('2025-07-15')
  },
  // Premium lots 75-77 with multiple images
  {
    id: 75,
    name: "Elite Heavy Machinery Unit 75",
    type: "Elite Equipment",
    brand: "Premium Industries",
    year: 2024,
    hours: 0,
    price: 125000,
    condition: "excellent",
    description: "Located in Colina, Chile. Elite heavy machinery unit from the premium collection. Features 3 comprehensive images showing detailed specifications. Top-tier equipment for industrial and mining operations.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/75_1.jpg",
    gallery: [
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/75_1.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/75_2.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/75_3.jpg"
    ],
    priority: 25,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 76,
    name: "Elite Heavy Machinery Unit 76",
    type: "Elite Equipment",
    brand: "Premium Industries",
    year: 2024,
    hours: 0,
    price: 125000,
    condition: "excellent",
    description: "Located in Colina, Chile. Elite heavy machinery unit from the premium collection. Features 3 comprehensive images showing detailed specifications. Top-tier equipment for industrial and mining operations.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/76_1.jpg",
    gallery: [
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/76_1.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/76_2.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/76_3.jpg"
    ],
    priority: 24,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 77,
    name: "Elite Heavy Machinery Unit 77",
    type: "Elite Equipment",
    brand: "Premium Industries",
    year: 2024,
    hours: 0,
    price: 125000,
    condition: "excellent",
    description: "Located in Colina, Chile. Elite heavy machinery unit from the premium collection. Features 3 comprehensive images showing detailed specifications. Top-tier equipment for industrial and mining operations.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/77_1.jpg",
    gallery: [
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/77_1.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/77_2.jpg",
      "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/77_3.jpg"
    ],
    priority: 23,
    auctionDate: new Date('2025-07-15')
  }
];

async function completeMissingLots() {
  try {
    console.log('🚀 Adding missing lots 13-20 and 75-77...');
    
    for (const lot of missingLots) {
      console.log(`✅ Adding Lot ${lot.id}: ${lot.name} - $${lot.price.toLocaleString()}`);
      await db.insert(machinery).values(lot);
    }

    const totalNewValue = missingLots.reduce((sum, lot) => sum + lot.price, 0);
    console.log(`\n🎉 MISSING LOTS COMPLETED!`);
    console.log(`📊 Added: ${missingLots.length} lots`);
    console.log(`💰 Additional Value: $${totalNewValue.toLocaleString()}`);
    
  } catch (error) {
    console.error('❌ Error adding missing lots:', error);
    throw error;
  }
}

completeMissingLots().catch(console.error);