import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Exact data from NorthCountry auction - verified items
const northCountryItems = [
  {
    id: 1,
    name: "Unused Irb50 Backhoe Loader With Kubota Engine - Lote 001",
    type: "Loader",
    brand: "Kubota", 
    year: 2024,
    hours: 0,
    price: 52000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Kubota D902. Power Type: Internal Combustion Engine, Displacement (l): 0.719, Maximum Power (kw/hp): 11.8. Fuel Type: Diesel, Loader Bucket Capacity (m³): 0.25, Loader Maximum Lifting Height (mm): 3300, Loader Maximum Lifting Weight (mm): 2025, Maximum Excavation Height (mm): 2250, Maximum Unloading Height (mm): 1600, Maximum excavation Depth (mm): 1700, Maximum Excavation Radius (mm): 2500. Located in Colina, Chile.",
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
    year: 2024,
    hours: 0,
    price: 48000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Kubota D722, Power Type: Internal Combustion Engine, Displacement (l): 0.719, Maximum Power (kw/hp): 10.2, Horsepower (hp): 14, Fuel Type: Diesel, Fuel Consumption (g/kwh): 0.5-1.2, Fuel Capacity (l): 15, Bucket Capacity (m³): 0.03 Length*width*height (mm): 2925 * 1100 * 2423, Track Width (mm): 180, Maximum Excavation Depth (mm): 1693, Maximum Unloading Height (mm): 1900. Located in Colina, Chile.",
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
    year: 2024, 
    hours: 0,
    price: 48000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Kubota D722, Power Type: Internal Combustion Engine, Displacement (l): 0.719, Maximum Power (kw/hp): 10.2, Horsepower (hp): 14, Fuel Type: Diesel, Fuel Consumption (g/kwh): 0.5-1.2, Fuel Capacity (l): 15, Bucket Capacity (m³): 0.03 Length*width*height (mm): 2925 * 1100 * 2423, Track Width (mm): 180, Maximum Excavation Depth (mm): 1693, Maximum Unloading Height (mm): 1900. Located in Colina, Chile.",
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
    year: 2024,
    hours: 0,
    price: 48000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Kubota D722, Power Type: Internal Combustion Engine, Displacement (l): 0.719, Maximum Power (kw/hp): 10.2, Horsepower (hp): 14, Fuel Type: Diesel, Fuel Consumption (g/kwh): 0.5-1.2, Fuel Capacity (l): 15, Bucket Capacity (m³): 0.03 Length*width*height (mm): 2925 * 1100 * 2423, Track Width (mm): 180, Maximum Excavation Depth (mm): 1693, Maximum Unloading Height (mm): 1900. Located in Colina, Chile.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/4_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/4_1.jpg"],
    priority: 97,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 5,
    name: "Unused Ire25 Mini Excavator With Kubota Engine - Lote 005",
    type: "Excavator",
    brand: "Kubota",
    year: 2024,
    hours: 0,
    price: 48000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Kubota D722, Power Type: Internal Combustion Engine, Displacement (l): 0.719, Maximum Power (kw/hp): 10.2, Horsepower (hp): 14, Fuel Type: Diesel, Fuel Consumption (g/kwh): 0.5-1.2, Fuel Capacity (l): 15, Bucket Capacity (m³): 0.03 Length*width*height (mm): 2925 * 1100 * 2423, Track Width (mm): 180, Maximum Excavation Depth (mm): 1693, Maximum Unloading Height (mm): 1900. Located in Colina, Chile.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/5_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/5_1.jpg"],
    priority: 96,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 6,
    name: "Unused Ire25 Mini Excavator With Kubota Engine - Lote 006",
    type: "Excavator",
    brand: "Kubota",
    year: 2024,
    hours: 0,
    price: 48000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Kubota D722, Power Type: Internal Combustion Engine, Displacement (l): 0.719, Maximum Power (kw/hp): 10.2, Horsepower (hp): 14, Fuel Type: Diesel, Fuel Consumption (g/kwh): 0.5-1.2, Fuel Capacity (l): 15, Bucket Capacity (m³): 0.03 Length*width*height (mm): 2925 * 1100 * 2423, Track Width (mm): 180, Maximum Excavation Depth (mm): 1693, Maximum Unloading Height (mm): 1900. Located in Colina, Chile.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/6_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/6_1.jpg"],
    priority: 95,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 7,
    name: "Unused Irb25 Crawler Dumper With Seat - Lote 007",
    type: "Dumper",
    brand: "Briggs & Stratton",
    year: 2024,
    hours: 0,
    price: 55000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Briggs & Stratton, Engine Power 8.6kw, Transmission Model: Gull 18 Type, Transmission Gear: 3+1 In/out Gear, External Exhaust Silencer, Twin Lever Control System, Fully Hydraulic Control Material: Engineering Rubber Track, Track Model: 230*72*46, Max. Load: 1500kg, Drive Way: Transmission Belt Pulley Drive, Startup Way: Electric Ignition, Top Speed: 15km/h, Minimum Speed: 8km/h, Turning Radius: 1350mm, Unload Way: Dump And Dump Bucket, Supporting Roller: Five On One Side. Located in Colina, Chile.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/7_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/7_1.jpg"],
    priority: 94,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 8,
    name: "Unused Irb25 Crawler Dumper With Seat - Lote 008",
    type: "Dumper",
    brand: "Briggs & Stratton", 
    year: 2024,
    hours: 0,
    price: 55000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Briggs & Stratton, Engine Power 8.6kw, Transmission Model: Gull 18 Type, Transmission Gear: 3+1 In/out Gear, External Exhaust Silencer, Twin Lever Control System, Fully Hydraulic Control Material: Engineering Rubber Track, Track Model: 230*72*46, Max. Load: 1500kg, Drive Way: Transmission Belt Pulley Drive, Startup Way: Electric Ignition, Top Speed: 15km/h, Minimum Speed: 8km/h, Turning Radius: 1350mm, Unload Way: Dump And Dump Bucket, Supporting Roller: Five On One Side. Located in Colina, Chile.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/8_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/8_1.jpg"],
    priority: 93,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 9,
    name: "Unused Irb25 Crawler Dumper With Seat - Lote 009",
    type: "Dumper",
    brand: "Briggs & Stratton",
    year: 2024,
    hours: 0,
    price: 55000,
    condition: "excellent", 
    description: "Located in Colina, Chile. Engine Model: Briggs & Stratton, Engine Power 8.6kw, Transmission Model: Gull 18 Type, Transmission Gear: 3+1 In/out Gear, External Exhaust Silencer, Twin Lever Control System, Fully Hydraulic Control Material: Engineering Rubber Track, Track Model: 230*72*46, Max. Load: 1500kg, Drive Way: Transmission Belt Pulley Drive, Startup Way: Electric Ignition, Top Speed: 15km/h, Minimum Speed: 8km/h, Turning Radius: 1350mm, Unload Way: Dump And Dump Bucket, Supporting Roller: Five On One Side. Located in Colina, Chile.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/9_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/9_1.jpg"],
    priority: 92,
    auctionDate: new Date('2025-07-15')
  },
  {
    id: 10,
    name: "Unused Irb25 Crawler Dumper With Seat - Lote 010",
    type: "Dumper",
    brand: "Briggs & Stratton",
    year: 2024,
    hours: 0,
    price: 55000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Briggs & Stratton, Engine Power 8.6kw, Transmission Model: Gull 18 Type, Transmission Gear: 3+1 In/out Gear, External Exhaust Silencer, Twin Lever Control System, Fully Hydraulic Control Material: Engineering Rubber Track, Track Model: 230*72*46, Max. Load: 1500kg, Drive Way: Transmission Belt Pulley Drive, Startup Way: Electric Ignition, Top Speed: 15km/h, Minimum Speed: 8km/h, Turning Radius: 1350mm, Unload Way: Dump And Dump Bucket, Supporting Roller: Five On One Side. Located in Colina, Chile.",
    image: "https://auctiontechupload.s3.amazonaws.com/216/auction/2187/10_1.jpg",
    gallery: ["https://auctiontechupload.s3.amazonaws.com/216/auction/2187/10_1.jpg"],
    priority: 91,
    auctionDate: new Date('2025-07-15')
  }
];

async function loadNorthCountryExact() {
  try {
    console.log('🚀 Loading exact NorthCountry auction data...');
    
    console.log('🗃️  Clearing existing machinery database...');
    await db.delete(machinery);

    console.log('📦 Loading exact NorthCountry items...');
    
    for (const item of northCountryItems) {
      await db.insert(machinery).values(item);
      console.log(`✅ ${item.name} - $${item.price.toLocaleString()}`);
    }

    const totalValue = northCountryItems.reduce((sum, item) => sum + item.price, 0);

    console.log('\n🎉 EXACT NORTHCOUNTRY DATA LOADED!');
    console.log('📊 Summary:');
    console.log(`   🏗️  Total Items: ${northCountryItems.length}`);
    console.log(`   🖼️  AWS S3 Images: ${northCountryItems.length}`);
    console.log(`   💰 Total Value: $${totalValue.toLocaleString()}`);
    console.log(`   📅 Auction Date: July 15, 2025`);
    
  } catch (error) {
    console.error('❌ Error loading exact data:', error);
    throw error;
  }
}

loadNorthCountryExact().catch(console.error);