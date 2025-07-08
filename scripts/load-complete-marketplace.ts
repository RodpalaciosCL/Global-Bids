import { db } from '../server/db';
import { machinery } from '../shared/schema';

const completeMarketplace = [
  {
    name: "2019 CAT 336 Hydraulic Excavator - Lote 001",
    type: "Excavator",
    brand: "Caterpillar",
    year: 2019,
    hours: 2850,
    price: 185000,
    condition: "excellent",
    description: "CAT 336 Hydraulic Excavator with 36 ton operating weight. Features advanced hydraulic system, air conditioning, GPS ready technology, and complete service records. Located in Santiago, Chile.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2020 Komatsu PC490LC-11 Excavator - Lote 002",
    type: "Excavator", 
    brand: "Komatsu",
    year: 2020,
    hours: 1950,
    price: 220000,
    condition: "excellent",
    description: "Komatsu PC490LC-11 Large Excavator with 49 ton operating weight. Equipped with intelligent Machine Control, fuel-efficient engine, enhanced operator comfort. Perfect for mining operations.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2018 Volvo A40G Articulated Dump Truck - Lote 003",
    type: "Truck",
    brand: "Volvo",
    year: 2018,
    hours: 4200,
    kilometers: 45000,
    price: 165000,
    condition: "good",
    description: "Volvo A40G Articulated Dump Truck with 40-ton payload capacity. Features automatic transmission, load assist system, advanced stability control. Ideal for construction projects.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2017 CAT 980M Wheel Loader - Lote 004",
    type: "Loader",
    brand: "Caterpillar",
    year: 2017,
    hours: 3850,
    price: 145000,
    condition: "good",
    description: "CAT 980M Wheel Loader with 4.6 cubic yard bucket capacity. Equipped with Cat Production Measurement system, joystick steering, fuel-efficient engine. Ready for immediate work.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2021 John Deere 870G LC Excavator - Lote 005",
    type: "Excavator",
    brand: "John Deere",
    year: 2021,
    hours: 890,
    price: 198000,
    condition: "excellent",
    description: "John Deere 870G LC Excavator with long reach configuration. Features advanced hydraulics, Grade Guidance ready, ComfortGard cab with premium HVAC. Nearly new condition.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2019 CAT D6T LGP Bulldozer - Lote 006",
    type: "Bulldozer",
    brand: "Caterpillar",
    year: 2019,
    hours: 2100,
    price: 158000,
    condition: "excellent",
    description: "CAT D6T LGP (Low Ground Pressure) Bulldozer with VPAT blade. Features electronic fuel injection, hydrostatic transmission, operator presence system. Perfect for earthmoving.",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2020 Komatsu WA470-8 Wheel Loader - Lote 007",
    type: "Loader",
    brand: "Komatsu",
    year: 2020,
    hours: 1650,
    price: 142000,
    condition: "excellent",
    description: "Komatsu WA470-8 Wheel Loader with 4.0 cubic yard bucket. SmartLoader Logic, automatic transmission, enhanced visibility design. Low hours, excellent condition.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2018 Volvo EC480E Excavator - Lote 008",
    type: "Excavator",
    brand: "Volvo",
    year: 2018,
    hours: 3400,
    price: 168000,
    condition: "good",
    description: "Volvo EC480E Excavator with 48 ton operating weight. ECO mode for fuel efficiency, care track system, Volvo Co-Pilot display. Well maintained by certified technicians.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2017 CAT 725C2 Articulated Truck - Lote 009",
    type: "Truck",
    brand: "Caterpillar",
    year: 2017,
    hours: 4800,
    kilometers: 52000,
    price: 125000,
    condition: "good",
    description: "CAT 725C2 Articulated Truck with 25-ton payload. Automatic transmission, traction control system, enhanced operator environment. Ready for heavy-duty transport.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2021 Hitachi ZX490LCH-6 Excavator - Lote 010",
    type: "Excavator",
    brand: "Hitachi",
    year: 2021,
    hours: 750,
    price: 205000,
    condition: "excellent",
    description: "Hitachi ZX490LCH-6 Large Excavator with advanced hydraulic system. ConSite OIL telematics, spacious cab, fuel-efficient Stage V engine. Top-tier performance machine.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2019 Case 1650M Dozer - Lote 011",
    type: "Bulldozer",
    brand: "Case",
    year: 2019,
    hours: 2900,
    price: 135000,
    condition: "good",
    description: "Case 1650M Crawler Dozer with 6-way PAT blade. Electronic pilot hydraulics, mechanical drive transmission, ROPS/FOPS certified cab. Reliable earthmoving equipment.",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2020 Bobcat T870 Compact Track Loader - Lote 012",
    type: "Loader",
    brand: "Bobcat",
    year: 2020,
    hours: 850,
    price: 68000,
    condition: "excellent",
    description: "Bobcat T870 Compact Track Loader with vertical lift path. Advanced Control System, comfort cab with air conditioning, versatile attachment compatibility. Compact but powerful.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2018 Komatsu GD655-6 Motor Grader - Lote 013",
    type: "Grader",
    brand: "Komatsu",
    year: 2018,
    hours: 3200,
    price: 185000,
    condition: "good",
    description: "Komatsu GD655-6 Motor Grader with 14-foot moldboard. Intelligent Machine Control ready, electronic joystick controls, enhanced operator visibility. Professional road construction equipment.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2020 John Deere 744L Wheel Loader - Lote 014",
    type: "Loader",
    brand: "John Deere",
    year: 2020,
    hours: 1450,
    price: 165000,
    condition: "excellent",
    description: "John Deere 744L Wheel Loader with 4.4 cubic yard bucket. PowerTech Plus engine, automatic transmission, ergonomic operator station. Low hours, premium condition.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2016 CAT 966M XE Wheel Loader - Lote 015",
    type: "Loader",
    brand: "Caterpillar",
    year: 2016,
    hours: 5800,
    price: 118000,
    condition: "fair",
    description: "CAT 966M XE Electric Drive Wheel Loader with fuel efficiency optimization. Continuously Variable Transmission, advanced traction control, enhanced productivity. Great value option.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2021 Kubota KX080-4a Excavator - Lote 016",
    type: "Excavator",
    brand: "Kubota",
    year: 2021,
    hours: 320,
    price: 75000,
    condition: "excellent",
    description: "Kubota KX080-4a Compact Excavator with zero tail swing design. Powerful hydraulic system, comfortable operator environment, excellent fuel efficiency. Perfect for tight spaces.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2018 Liebherr L 566 XPower Wheel Loader - Lote 017",
    type: "Loader",
    brand: "Liebherr",
    year: 2018,
    hours: 3600,
    price: 148000,
    condition: "good",
    description: "Liebherr L 566 XPower Wheel Loader with intelligent power management. XPower drivetrain, comfort cab with panoramic view, advanced hydraulics. European engineering excellence.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2019 Volvo EC380E Excavator - Lote 018",
    type: "Excavator",
    brand: "Volvo",
    year: 2019,
    hours: 2200,
    price: 155000,
    condition: "excellent",
    description: "Volvo EC380E Excavator with 38 ton operating weight. Fuel-efficient engine, intelligent hydraulics, premium operator environment with climate control. Swedish reliability.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2017 CAT 950M Wheel Loader - Lote 019",
    type: "Loader",
    brand: "Caterpillar",
    year: 2017,
    hours: 4100,
    price: 128000,
    condition: "good",
    description: "CAT 950M Wheel Loader with 3.8 cubic yard bucket. Cat Production Measurement, joystick steering, optimized hydraulic system for efficiency. Proven workhorse.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&auto=format"
  },
  {
    name: "2020 CAT 320 Excavator - Lote 020",
    type: "Excavator",
    brand: "Caterpillar",
    year: 2020,
    hours: 1850,
    price: 175000,
    condition: "excellent",
    description: "CAT 320 Excavator with advanced hydraulic system. Grade with Assist technology, fuel-efficient engine, operator comfort package. Perfect balance of size and power.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&auto=format"
  }
];

async function loadCompleteMarketplace() {
  try {
    console.log('🔄 Clearing existing machinery database...');
    await db.delete(machinery);
    console.log('✅ Database cleared successfully');
    
    console.log('📦 Loading complete marketplace with 20 realistic machines...');
    
    for (let i = 0; i < completeMarketplace.length; i++) {
      const item = completeMarketplace[i];
      
      const machineryData = {
        name: item.name,
        type: item.type,
        brand: item.brand,
        year: item.year,
        hours: item.hours || undefined,
        kilometers: item.kilometers || undefined,
        price: item.price,
        condition: item.condition,
        description: item.description,
        image: item.image,
        gallery: [item.image],
        priority: completeMarketplace.length - i,
        auctionDate: new Date('2025-07-15')
      };
      
      await db.insert(machinery).values(machineryData);
      console.log(`✅ ${i + 1}/20 - ${item.name}`);
    }
    
    console.log('\n🎉 MARKETPLACE LOADED SUCCESSFULLY!');
    console.log('📊 Summary:');
    const excavators = completeMarketplace.filter(m => m.type === 'Excavator').length;
    const loaders = completeMarketplace.filter(m => m.type === 'Loader').length;
    const trucks = completeMarketplace.filter(m => m.type === 'Truck').length;
    const bulldozers = completeMarketplace.filter(m => m.type === 'Bulldozer').length;
    const graders = completeMarketplace.filter(m => m.type === 'Grader').length;
    
    console.log(`   🚜 Excavators: ${excavators}`);
    console.log(`   🏗️  Loaders: ${loaders}`);
    console.log(`   🚛 Trucks: ${trucks}`);
    console.log(`   🦾 Bulldozers: ${bulldozers}`);
    console.log(`   🛤️  Graders: ${graders}`);
    console.log(`\n💰 Total Value: $${completeMarketplace.reduce((sum, m) => sum + m.price, 0).toLocaleString()}`);
    console.log('🏆 Ready for auction on July 15, 2025!');
    
  } catch (error) {
    console.error('❌ Error loading marketplace:', error);
    throw error;
  }
}

loadCompleteMarketplace().catch(console.error);