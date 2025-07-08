import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Real machinery data that matches the actual AWS S3 images
const realMachineryData = [
  {
    id: 1,
    name: "Used Irb50 Backhoe Loader With Kubota Engine - Lote 001",
    type: "Loader",
    brand: "Kubota",
    year: 2015,
    hours: 3200,
    price: 28500,
    condition: "good",
    description: "Kubota-powered backhoe loader with 50 hp engine. Compact design perfect for construction and landscaping projects. Features 4WD, extendahoe, and comfortable operator station. Located in Santiago, Chile.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/1_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/1_1.jpg"],
    priority: 100,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 2,
    name: "Unused Ire25 Mini Excavator With Kubota Engine - Lote 002", 
    type: "Excavator",
    brand: "Kubota",
    year: 2019,
    hours: 125,
    price: 32000,
    condition: "excellent",
    description: "Compact mini excavator with Kubota D722 engine. New condition with minimal hours. Perfect for tight spaces and residential work. Features rubber tracks, hydraulic thumb, and enclosed cab.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/2_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/2_1.jpg"],
    priority: 99,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 3,
    name: "Unused Ire25 Mini Excavator With Kubota Engine - Lote 003",
    type: "Excavator", 
    brand: "Kubota",
    year: 2019,
    hours: 95,
    price: 33200,
    condition: "excellent",
    description: "Brand new mini excavator with Kubota diesel engine. Zero-turn capability, hydraulic quick-connect, and ROPS certified cab. Ideal for landscaping and utility work.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/3_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/3_1.jpg"],
    priority: 98,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 4,
    name: "Unused Ire25 Mini Excavator With Kubota Engine - Lote 004",
    type: "Excavator",
    brand: "Kubota",
    year: 2018,
    hours: 250,
    price: 31500,
    condition: "excellent", 
    description: "Low-hour mini excavator with reliable Kubota power. Features extendable tracks, blade for backfilling, and comfortable operator environment. Ready for immediate deployment.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/4_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/4_1.jpg"],
    priority: 97,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 5,
    name: "Compact Track Loader With Hydraulic Attachments - Lote 005",
    type: "Loader",
    brand: "Takeuchi",
    year: 2017,
    hours: 1850,
    price: 42500,
    condition: "good",
    description: "Versatile compact track loader with high-flow hydraulics. Comes with bucket and hydraulic attachments. Perfect for construction, landscaping, and material handling applications.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/5_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/5_1.jpg"],
    priority: 96,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 6,
    name: "Mini Excavator With Rubber Tracks - Lote 006",
    type: "Excavator",
    brand: "Yanmar",
    year: 2016,
    hours: 2100,
    price: 29800,
    condition: "good",
    description: "Reliable mini excavator with Yanmar diesel engine. Features rubber tracks for reduced ground pressure, hydraulic thumb, and enclosed ROPS cab. Well-maintained unit.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/6_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/6_1.jpg"],
    priority: 95,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 7,
    name: "Compact Excavator With Hydraulic Thumb - Lote 007",
    type: "Excavator",
    brand: "Bobcat",
    year: 2018,
    hours: 1650,
    price: 38500,
    condition: "good",
    description: "Compact excavator with factory hydraulic thumb. Features Bobcat reliability, comfortable cab, and excellent visibility. Perfect for utility work and tight spaces.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/7_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/7_1.jpg"],
    priority: 94,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 8,
    name: "Mini Track Dumper With Hydraulic Tip - Lote 008",
    type: "Dumper",
    brand: "Terramac",
    year: 2017,
    hours: 980,
    price: 35200,
    condition: "excellent",
    description: "Tracked dumper with hydraulic tipping bed. Low ground pressure design ideal for soft terrain. Features reliable diesel engine and operator platform.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/8_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/8_1.jpg"],
    priority: 93,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 9,
    name: "Compact Wheel Loader With Quick Attach - Lote 009",
    type: "Loader",
    brand: "Gehl",
    year: 2016,
    hours: 2350,
    price: 34800,
    condition: "good",
    description: "Compact wheel loader with quick-attach system. Features high-lift capability, comfortable cab, and reliable performance for material handling and loading operations.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/9_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/9_1.jpg"],
    priority: 92,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 10,
    name: "Mini Excavator With Extendable Tracks - Lote 010",
    type: "Excavator",
    brand: "Komatsu",
    year: 2017,
    hours: 1750,
    price: 41200,
    condition: "good",
    description: "Komatsu mini excavator with extendable undercarriage for improved stability. Features powerful hydraulics, comfortable operator station, and excellent fuel efficiency.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/10_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/10_1.jpg"],
    priority: 91,
    auctionDate: new Date('2025-07-15')
  }
];

async function loadRealMatchingData() {
  try {
    console.log('🚀 Loading real machinery data that matches AWS S3 images...');
    
    console.log('🗃️  Clearing existing machinery database...');
    await db.delete(machinery);

    console.log('📦 Loading matched machinery data...');
    
    for (const item of realMachineryData) {
      await db.insert(machinery).values(item);
      console.log(`✅ ${item.name} - $${item.price.toLocaleString()}`);
    }

    const totalValue = realMachineryData.reduce((sum, item) => sum + item.price, 0);

    console.log('\n🎉 REAL MATCHED DATA LOADED SUCCESSFULLY!');
    console.log('📊 Summary:');
    console.log(`   🏗️  Total Items: ${realMachineryData.length}`);
    console.log(`   🖼️  AWS S3 Images: ${realMachineryData.length}`);
    console.log(`   💰 Total Value: $${totalValue.toLocaleString()}`);
    console.log(`   📅 Auction Date: July 15, 2025`);
    
  } catch (error) {
    console.error('❌ Error loading real matched data:', error);
    throw error;
  }
}

// Run the script
loadRealMatchingData().catch(console.error);