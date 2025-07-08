import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Quick realistic machinery data with pre-existing image URLs
const quickMachinery = [
  {
    name: "2019 CAT 336 Hydraulic Excavator",
    type: "Excavator",
    brand: "Caterpillar",
    year: 2019,
    hours: 2850,
    price: 185000,
    condition: "excellent",
    description: "CAT 336 Hydraulic Excavator with 36 ton operating weight. Features advanced hydraulic system, air conditioning, and GPS ready technology. Well maintained with complete service records.",
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
    description: "Komatsu PC490LC-11 Large Excavator with 49 ton operating weight. Equipped with intelligent Machine Control, fuel-efficient engine, and enhanced operator comfort.",
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
    description: "Volvo A40G Articulated Dump Truck with 40-ton payload capacity. Features automatic transmission, load assist system, and advanced stability control.",
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
    description: "CAT 980M Wheel Loader with 4.6 cubic yard bucket capacity. Equipped with Cat Production Measurement system, joystick steering, and fuel-efficient engine.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop"
  },
  {
    name: "2021 John Deere 870G LC Excavator",
    type: "Excavator",
    brand: "John Deere",
    year: 2021,
    hours: 890,
    price: 198000,
    condition: "excellent",
    description: "John Deere 870G LC Excavator with long reach configuration. Features advanced hydraulics, Grade Guidance ready, and ComfortGard cab with premium HVAC.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"
  },
  {
    name: "2016 Liebherr R 946 Demolition Excavator",
    type: "Excavator",
    brand: "Liebherr",
    year: 2016,
    hours: 5200,
    price: 175000,
    condition: "good",
    description: "Liebherr R 946 Demolition Excavator with specialized demolition equipment. Heavy-duty undercarriage, reinforced cab protection, and high-reach boom configuration.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop"
  },
  {
    name: "2019 CAT D6T LGP Bulldozer",
    type: "Bulldozer",
    brand: "Caterpillar",
    year: 2019,
    hours: 2100,
    price: 158000,
    condition: "excellent",
    description: "CAT D6T LGP (Low Ground Pressure) Bulldozer with VPAT blade. Features electronic fuel injection, hydrostatic transmission, and operator presence system.",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop"
  },
  {
    name: "2020 Komatsu WA470-8 Wheel Loader",
    type: "Loader",
    brand: "Komatsu",
    year: 2020,
    hours: 1650,
    price: 142000,
    condition: "excellent",
    description: "Komatsu WA470-8 Wheel Loader with 4.0 cubic yard bucket. SmartLoader Logic, automatic transmission, and enhanced visibility design.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop"
  },
  {
    name: "2018 Volvo EC480E Excavator",
    type: "Excavator",
    brand: "Volvo",
    year: 2018,
    hours: 3400,
    price: 168000,
    condition: "good",
    description: "Volvo EC480E Excavator with 48 ton operating weight. ECO mode for fuel efficiency, care track system, and Volvo Co-Pilot display.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
  },
  {
    name: "2017 CAT 725C2 Articulated Truck",
    type: "Truck",
    brand: "Caterpillar",
    year: 2017,
    hours: 4800,
    kilometers: 52000,
    price: 125000,
    condition: "good",
    description: "CAT 725C2 Articulated Truck with 25-ton payload. Automatic transmission, traction control system, and enhanced operator environment.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop"
  },
  {
    name: "2021 Hitachi ZX490LCH-6 Excavator",
    type: "Excavator",
    brand: "Hitachi",
    year: 2021,
    hours: 750,
    price: 205000,
    condition: "excellent",
    description: "Hitachi ZX490LCH-6 Large Excavator with advanced hydraulic system. ConSite OIL telematics, spacious cab, and fuel-efficient Stage V engine.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop"
  },
  {
    name: "2019 Case 1650M Dozer",
    type: "Bulldozer",
    brand: "Case",
    year: 2019,
    hours: 2900,
    price: 135000,
    condition: "good",
    description: "Case 1650M Crawler Dozer with 6-way PAT blade. Electronic pilot hydraulics, mechanical drive transmission, and ROPS/FOPS certified cab.",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop"
  },
  {
    name: "2020 Bobcat T870 Compact Track Loader",
    type: "Loader",
    brand: "Bobcat",
    year: 2020,
    hours: 850,
    price: 68000,
    condition: "excellent",
    description: "Bobcat T870 Compact Track Loader with vertical lift path. Advanced Control System, comfort cab with air conditioning, and versatile attachment compatibility.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop"
  },
  {
    name: "2018 Komatsu GD655-6 Motor Grader",
    type: "Grader",
    brand: "Komatsu",
    year: 2018,
    hours: 3200,
    price: 185000,
    condition: "good",
    description: "Komatsu GD655-6 Motor Grader with 14-foot moldboard. Intelligent Machine Control ready, electronic joystick controls, and enhanced operator visibility.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"
  },
  {
    name: "2017 CAT 950M Wheel Loader",
    type: "Loader",
    brand: "Caterpillar",
    year: 2017,
    hours: 4100,
    price: 128000,
    condition: "good",
    description: "CAT 950M Wheel Loader with 3.8 cubic yard bucket. Cat Production Measurement, joystick steering, and optimized hydraulic system for efficiency.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop"
  },
  {
    name: "2019 Volvo EC380E Excavator",
    type: "Excavator",
    brand: "Volvo",
    year: 2019,
    hours: 2200,
    price: 155000,
    condition: "excellent",
    description: "Volvo EC380E Excavator with 38 ton operating weight. Fuel-efficient engine, intelligent hydraulics, and premium operator environment with climate control.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
  },
  {
    name: "2020 John Deere 744L Wheel Loader",
    type: "Loader",
    brand: "John Deere",
    year: 2020,
    hours: 1450,
    price: 165000,
    condition: "excellent",
    description: "John Deere 744L Wheel Loader with 4.4 cubic yard bucket. PowerTech Plus engine, automatic transmission, and ergonomic operator station.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop"
  },
  {
    name: "2016 CAT 966M XE Wheel Loader",
    type: "Loader",
    brand: "Caterpillar",
    year: 2016,
    hours: 5800,
    price: 118000,
    condition: "fair",
    description: "CAT 966M XE Electric Drive Wheel Loader with fuel efficiency optimization. Continuously Variable Transmission, advanced traction control, and enhanced productivity.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop"
  },
  {
    name: "2021 Kubota KX080-4a Excavator",
    type: "Excavator",
    brand: "Kubota",
    year: 2021,
    hours: 320,
    price: 75000,
    condition: "excellent",
    description: "Kubota KX080-4a Compact Excavator with zero tail swing design. Powerful hydraulic system, comfortable operator environment, and excellent fuel efficiency.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop"
  },
  {
    name: "2018 Liebherr L 566 XPower Wheel Loader",
    type: "Loader",
    brand: "Liebherr",
    year: 2018,
    hours: 3600,
    price: 148000,
    condition: "good",
    description: "Liebherr L 566 XPower Wheel Loader with intelligent power management. XPower drivetrain, comfort cab with panoramic view, and advanced hydraulics.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop"
  }
];

async function loadQuickMachinery() {
  try {
    console.log('Clearing existing machinery data...');
    await db.delete(machinery);
    
    console.log('Loading realistic heavy machinery data quickly...');
    
    for (let i = 0; i < quickMachinery.length; i++) {
      const item = quickMachinery[i];
      
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
        priority: quickMachinery.length - i, // Higher priority for earlier items
        auctionDate: new Date('2025-07-15') // Set auction date
      };
      
      await db.insert(machinery).values(machineryData);
      console.log(`✓ Loaded: ${item.name}`);
    }
    
    console.log(`\n🎉 Successfully loaded ${quickMachinery.length} realistic machinery items!`);
    console.log('📊 Summary:');
    console.log(`   • Excavators: ${quickMachinery.filter(m => m.type === 'Excavator').length}`);
    console.log(`   • Loaders: ${quickMachinery.filter(m => m.type === 'Loader').length}`);
    console.log(`   • Trucks: ${quickMachinery.filter(m => m.type === 'Truck').length}`);
    console.log(`   • Bulldozers: ${quickMachinery.filter(m => m.type === 'Bulldozer').length}`);
    console.log(`   • Other: ${quickMachinery.filter(m => !['Excavator', 'Loader', 'Truck', 'Bulldozer'].includes(m.type)).length}`);
    
  } catch (error) {
    console.error('❌ Error loading machinery data:', error);
  }
}

// Run the script
loadQuickMachinery().catch(console.error);