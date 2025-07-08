import { db } from '../server/db';
import { machinery } from '../shared/schema';

const sampleMachinery = [
  {
    name: "2019 CAT 336 Hydraulic Excavator",
    type: "Excavator",
    brand: "Caterpillar", 
    year: 2019,
    hours: 2850,
    price: 185000,
    condition: "excellent",
    description: "CAT 336 Hydraulic Excavator with 36 ton operating weight. Features advanced hydraulic system, air conditioning, and GPS ready technology.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop"
  },
  {
    name: "2020 Komatsu PC490LC-11 Excavator", 
    type: "Excavator",
    brand: "Komatsu",
    year: 2020,
    hours: 1950,
    price: 220000,
    condition: "excellent",
    description: "Komatsu PC490LC-11 Large Excavator with 49 ton operating weight. Equipped with intelligent Machine Control and fuel-efficient engine.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
  },
  {
    name: "2018 Volvo A40G Articulated Dump Truck",
    type: "Truck", 
    brand: "Volvo",
    year: 2018,
    hours: 4200,
    kilometers: 45000,
    price: 165000,
    condition: "good",
    description: "Volvo A40G Articulated Dump Truck with 40-ton payload capacity. Features automatic transmission and load assist system.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop"
  },
  {
    name: "2017 CAT 980M Wheel Loader",
    type: "Loader",
    brand: "Caterpillar",
    year: 2017, 
    hours: 3850,
    price: 145000,
    condition: "good",
    description: "CAT 980M Wheel Loader with 4.6 cubic yard bucket capacity. Equipped with Cat Production Measurement system.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop"
  },
  {
    name: "2019 CAT D6T LGP Bulldozer",
    type: "Bulldozer",
    brand: "Caterpillar",
    year: 2019,
    hours: 2100, 
    price: 158000,
    condition: "excellent",
    description: "CAT D6T LGP (Low Ground Pressure) Bulldozer with VPAT blade. Features electronic fuel injection and hydrostatic transmission.",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop"
  }
];

async function loadSampleMachinery() {
  console.log('Clearing existing machinery...');
  await db.delete(machinery);
  
  console.log('Loading sample machinery...');
  for (let i = 0; i < sampleMachinery.length; i++) {
    const item = sampleMachinery[i];
    
    await db.insert(machinery).values({
      name: item.name,
      type: item.type,
      brand: item.brand,
      year: item.year,
      hours: item.hours,
      kilometers: item.kilometers,
      price: item.price,
      condition: item.condition,
      description: item.description,
      image: item.image,
      gallery: [item.image],
      priority: sampleMachinery.length - i,
      auctionDate: new Date('2025-07-15')
    });
    
    console.log(`✓ ${item.name}`);
  }
  
  console.log(`Loaded ${sampleMachinery.length} machinery items successfully!`);
}

loadSampleMachinery().catch(console.error);