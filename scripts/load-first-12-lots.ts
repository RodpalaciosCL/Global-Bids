import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Function to detect images for each lot
async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

async function detectImagesForLot(lotNumber: number): Promise<string[]> {
  const images: string[] = [];
  let imageNumber = 1;
  
  while (imageNumber <= 20) {
    const imageUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lotNumber}_${imageNumber}.jpg`;
    const exists = await checkImageExists(imageUrl);
    
    if (exists) {
      images.push(imageUrl);
    } else {
      break;
    }
    
    imageNumber++;
  }
  
  return images;
}

// Real data for the first 12 lots based on NorthCountry patterns
const first12Lots = [
  {
    id: 1,
    name: "Unused Irb50 Backhoe Loader With Kubota Engine",
    type: "Loader",
    brand: "Kubota",
    year: 2024,
    hours: 0,
    price: 52000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Kubota D902. Power Type: Internal Combustion Engine, Displacement (l): 0.719, Maximum Power (kw/hp): 11.8. Fuel Type: Diesel, Loader Bucket Capacity (m³): 0.25, Loader Maximum Lifting Height (mm): 3300, Loader Maximum Lifting Weight (mm): 2025, Maximum Excavation Height (mm): 2250, Maximum Unloading Height (mm): 1600, Maximum excavation Depth (mm): 1700, Maximum Excavation Radius (mm): 2500. Located in Colina, Chile."
  },
  {
    id: 2,
    name: "Unused Ire25 Mini Excavator With Kubota Engine",
    type: "Excavator",
    brand: "Kubota",
    year: 2024,
    hours: 0,
    price: 48000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Kubota D722, Power Type: Internal Combustion Engine, Displacement (l): 0.719, Maximum Power (kw/hp): 10.2, Horsepower (hp): 14, Fuel Type: Diesel, Fuel Consumption (g/kwh): 0.5-1.2, Fuel Capacity (l): 15, Bucket Capacity (m³): 0.03 Length*width*height (mm): 2925 * 1100 * 2423, Track Width (mm): 180, Maximum Excavation Depth (mm): 1693, Maximum Unloading Height (mm): 1900. Located in Colina, Chile."
  },
  {
    id: 3,
    name: "Unused Ire25 Mini Excavator With Kubota Engine",
    type: "Excavator",
    brand: "Kubota",
    year: 2024,
    hours: 0,
    price: 48000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Kubota D722, Power Type: Internal Combustion Engine, Displacement (l): 0.719, Maximum Power (kw/hp): 10.2, Horsepower (hp): 14, Fuel Type: Diesel, Fuel Consumption (g/kwh): 0.5-1.2, Fuel Capacity (l): 15, Bucket Capacity (m³): 0.03 Length*width*height (mm): 2925 * 1100 * 2423, Track Width (mm): 180, Maximum Excavation Depth (mm): 1693, Maximum Unloading Height (mm): 1900. Located in Colina, Chile."
  },
  {
    id: 4,
    name: "Unused Ire25 Mini Excavator With Kubota Engine",
    type: "Excavator",
    brand: "Kubota",
    year: 2024,
    hours: 0,
    price: 48000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Kubota D722, Power Type: Internal Combustion Engine, Displacement (l): 0.719, Maximum Power (kw/hp): 10.2, Horsepower (hp): 14, Fuel Type: Diesel, Fuel Consumption (g/kwh): 0.5-1.2, Fuel Capacity (l): 15, Bucket Capacity (m³): 0.03 Length*width*height (mm): 2925 * 1100 * 2423, Track Width (mm): 180, Maximum Excavation Depth (mm): 1693, Maximum Unloading Height (mm): 1900. Located in Colina, Chile."
  },
  {
    id: 5,
    name: "Unused Ire25 Mini Excavator With Kubota Engine",
    type: "Excavator",
    brand: "Kubota",
    year: 2024,
    hours: 0,
    price: 48000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Kubota D722, Power Type: Internal Combustion Engine, Displacement (l): 0.719, Maximum Power (kw/hp): 10.2, Horsepower (hp): 14, Fuel Type: Diesel, Fuel Consumption (g/kwh): 0.5-1.2, Fuel Capacity (l): 15, Bucket Capacity (m³): 0.03 Length*width*height (mm): 2925 * 1100 * 2423, Track Width (mm): 180, Maximum Excavation Depth (mm): 1693, Maximum Unloading Height (mm): 1900. Located in Colina, Chile."
  },
  {
    id: 6,
    name: "Unused Ire25 Mini Excavator With Kubota Engine",
    type: "Excavator",
    brand: "Kubota",
    year: 2024,
    hours: 0,
    price: 48000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Kubota D722, Power Type: Internal Combustion Engine, Displacement (l): 0.719, Maximum Power (kw/hp): 10.2, Horsepower (hp): 14, Fuel Type: Diesel, Fuel Consumption (g/kwh): 0.5-1.2, Fuel Capacity (l): 15, Bucket Capacity (m³): 0.03 Length*width*height (mm): 2925 * 1100 * 2423, Track Width (mm): 180, Maximum Excavation Depth (mm): 1693, Maximum Unloading Height (mm): 1900. Located in Colina, Chile."
  },
  {
    id: 7,
    name: "Unused Irb25 Crawler Dumper With Seat",
    type: "Dumper",
    brand: "Briggs & Stratton",
    year: 2024,
    hours: 0,
    price: 55000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Briggs & Stratton, Engine Power 8.6kw, Transmission Model: Gull 18 Type, Transmission Gear: 3+1 In/out Gear, External Exhaust Silencer, Twin Lever Control System, Fully Hydraulic Control Material: Engineering Rubber Track, Track Model: 230*72*46, Max. Load: 1500kg, Drive Way: Transmission Belt Pulley Drive, Startup Way: Electric Ignition, Top Speed: 15km/h, Minimum Speed: 8km/h, Turning Radius: 1350mm, Unload Way: Dump And Dump Bucket, Supporting Roller: Five On One Side. Located in Colina, Chile."
  },
  {
    id: 8,
    name: "Unused Irb25 Crawler Dumper With Seat",
    type: "Dumper",
    brand: "Briggs & Stratton",
    year: 2024,
    hours: 0,
    price: 55000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Briggs & Stratton, Engine Power 8.6kw, Transmission Model: Gull 18 Type, Transmission Gear: 3+1 In/out Gear, External Exhaust Silencer, Twin Lever Control System, Fully Hydraulic Control Material: Engineering Rubber Track, Track Model: 230*72*46, Max. Load: 1500kg, Drive Way: Transmission Belt Pulley Drive, Startup Way: Electric Ignition, Top Speed: 15km/h, Minimum Speed: 8km/h, Turning Radius: 1350mm, Unload Way: Dump And Dump Bucket, Supporting Roller: Five On One Side. Located in Colina, Chile."
  },
  {
    id: 9,
    name: "Unused Irb25 Crawler Dumper With Seat",
    type: "Dumper",
    brand: "Briggs & Stratton",
    year: 2024,
    hours: 0,
    price: 55000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Briggs & Stratton, Engine Power 8.6kw, Transmission Model: Gull 18 Type, Transmission Gear: 3+1 In/out Gear, External Exhaust Silencer, Twin Lever Control System, Fully Hydraulic Control Material: Engineering Rubber Track, Track Model: 230*72*46, Max. Load: 1500kg, Drive Way: Transmission Belt Pulley Drive, Startup Way: Electric Ignition, Top Speed: 15km/h, Minimum Speed: 8km/h, Turning Radius: 1350mm, Unload Way: Dump And Dump Bucket, Supporting Roller: Five On One Side. Located in Colina, Chile."
  },
  {
    id: 10,
    name: "Unused Irb25 Crawler Dumper With Seat",
    type: "Dumper",
    brand: "Briggs & Stratton",
    year: 2024,
    hours: 0,
    price: 55000,
    condition: "excellent",
    description: "Located in Colina, Chile. Engine Model: Briggs & Stratton, Engine Power 8.6kw, Transmission Model: Gull 18 Type, Transmission Gear: 3+1 In/out Gear, External Exhaust Silencer, Twin Lever Control System, Fully Hydraulic Control Material: Engineering Rubber Track, Track Model: 230*72*46, Max. Load: 1500kg, Drive Way: Transmission Belt Pulley Drive, Startup Way: Electric Ignition, Top Speed: 15km/h, Minimum Speed: 8km/h, Turning Radius: 1350mm, Unload Way: Dump And Dump Bucket, Supporting Roller: Five On One Side. Located in Colina, Chile."
  },
  {
    id: 11,
    name: "2024 Irp-40 Mini Golf Cart With Awning",
    type: "Utility Vehicle",
    brand: "IRP",
    year: 2024,
    hours: 0,
    price: 8500,
    condition: "excellent",
    description: "Located in Colina, Chile. External Dimensions(mm):1800x900x1500, Tire Specifications: Front 3.00-8 Rear 3.00-8, Type Of Fuel: Battery, Preparation Mass (kg): 116, Passenger Rating: 2, Maximum Speed(km/h): 15.5, Steering Form: Handle. Located in Colina, Chile."
  },
  {
    id: 12,
    name: "2024 Irp-40 Mini Golf Cart With Awning And Carport",
    type: "Utility Vehicle",
    brand: "IRP",
    year: 2024,
    hours: 0,
    price: 8500,
    condition: "excellent",
    description: "Located in Colina, Chile. External Dimensions(mm):1800x900x1500, Tire Specifications: Front 3.00-8 Rear 3.00-8, Type Of Fuel: Battery, Preparation Mass (kg): 116, Passenger Rating: 2, Maximum Speed(km/h): 15.5, Steering Form: Handle. Located in Colina, Chile."
  }
];

async function loadFirst12Lots() {
  try {
    console.log('🚀 Loading first 12 lots from NorthCountry...');
    
    console.log('🗃️  Clearing existing machinery database...');
    await db.delete(machinery);

    console.log('📦 Loading lots 1-12 with image detection...');
    
    for (const lot of first12Lots) {
      console.log(`🔍 Detecting images for Lot ${lot.id}...`);
      const gallery = await detectImagesForLot(lot.id);
      
      await db.insert(machinery).values({
        ...lot,
        image: gallery[0] || `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.id}_1.jpg`,
        gallery: gallery.length > 0 ? gallery : [`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.id}_1.jpg`],
        priority: 100 - lot.id,
        auctionDate: new Date('2025-07-15')
      });
      
      console.log(`✅ Lot ${lot.id}: ${lot.name} - $${lot.price.toLocaleString()} (${gallery.length} images)`);
    }

    const totalValue = first12Lots.reduce((sum, item) => sum + item.price, 0);

    console.log('\n🎉 FIRST 12 LOTS LOADED!');
    console.log('📊 Summary:');
    console.log(`   🏗️  Total Items: ${first12Lots.length}`);
    console.log(`   💰 Total Value: $${totalValue.toLocaleString()}`);
    console.log(`   📅 Auction Date: July 15, 2025`);
    console.log(`   📍 Location: Colina, Chile`);
    
  } catch (error) {
    console.error('❌ Error loading first 12 lots:', error);
    throw error;
  }
}

loadFirst12Lots().catch(console.error);