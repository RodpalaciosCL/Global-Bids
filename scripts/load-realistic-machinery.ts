import { v2 as cloudinary } from 'cloudinary';
import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Realistic heavy machinery data based on typical auction items
const realisticMachinery = [
  {
    name: "2019 CAT 336 Hydraulic Excavator",
    type: "Excavator",
    brand: "Caterpillar",
    year: 2019,
    hours: 2850,
    price: 185000,
    condition: "excellent",
    description: "CAT 336 Hydraulic Excavator with 36 ton operating weight. Features advanced hydraulic system, air conditioning, and GPS ready technology. Well maintained with complete service records.",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000000/excavator_cat336.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000001/excavator_komatsu490.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000002/truck_volvo_a40g.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000003/loader_cat980m.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000004/excavator_johndeere870.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000005/excavator_liebherr946.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000006/bulldozer_cat_d6t.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000007/loader_komatsu470.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000008/excavator_volvo480.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000009/truck_cat725c2.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000010/excavator_hitachi490.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000011/bulldozer_case1650.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000012/loader_bobcat_t870.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000013/grader_komatsu655.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000014/loader_cat950m.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000015/excavator_volvo380.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000016/loader_johndeere744.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000017/loader_cat966xe.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000018/excavator_kubota080.jpg"
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
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1640000019/loader_liebherr566.jpg"
  }
];

async function uploadPlaceholderImage(itemName: string, itemId: number): Promise<string> {
  try {
    // Create a simple SVG placeholder for machinery
    const svgContent = `
      <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="600" fill="#f0f0f0"/>
        <rect x="50" y="50" width="700" height="500" fill="#e0e0e0" rx="10"/>
        <circle cx="150" cy="450" r="60" fill="#333"/>
        <circle cx="650" cy="450" r="60" fill="#333"/>
        <rect x="200" y="200" width="400" height="200" fill="#ffcc00" rx="5"/>
        <text x="400" y="320" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#333">
          ${itemName.split(' ').slice(0, 3).join(' ')}
        </text>
        <text x="400" y="350" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#666">
          Heavy Machinery
        </text>
      </svg>
    `;

    const result = await cloudinary.uploader.upload(`data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`, {
      folder: 'global-bids/machinery',
      public_id: `machinery-${itemId}`,
      transformation: [
        { width: 800, height: 600, crop: 'fill', quality: 'auto' }
      ]
    });
    
    return result.secure_url;
  } catch (error) {
    console.error(`Error creating placeholder image for ${itemName}:`, error);
    // Return a default construction equipment image URL
    return 'https://res.cloudinary.com/demo/image/upload/v1640000000/sample_construction_equipment.jpg';
  }
}

async function loadRealisticMachinery() {
  try {
    console.log('Clearing existing machinery data...');
    await db.delete(machinery);
    
    console.log('Loading realistic heavy machinery data...');
    
    for (let i = 0; i < realisticMachinery.length; i++) {
      const item = realisticMachinery[i];
      
      // Create placeholder image for each item
      const cloudinaryUrl = await uploadPlaceholderImage(item.name, i + 1);
      
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
        image: cloudinaryUrl,
        gallery: [cloudinaryUrl],
        priority: realisticMachinery.length - i, // Higher priority for earlier items
        auctionDate: new Date('2025-07-15') // Set auction date
      };
      
      await db.insert(machinery).values(machineryData);
      console.log(`✓ Loaded: ${item.name}`);
      
      // Add small delay to avoid overwhelming Cloudinary
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log(`\n🎉 Successfully loaded ${realisticMachinery.length} realistic machinery items!`);
    console.log('📊 Summary:');
    console.log(`   • Excavators: ${realisticMachinery.filter(m => m.type === 'Excavator').length}`);
    console.log(`   • Loaders: ${realisticMachinery.filter(m => m.type === 'Loader').length}`);
    console.log(`   • Trucks: ${realisticMachinery.filter(m => m.type === 'Truck').length}`);
    console.log(`   • Bulldozers: ${realisticMachinery.filter(m => m.type === 'Bulldozer').length}`);
    console.log(`   • Other: ${realisticMachinery.filter(m => !['Excavator', 'Loader', 'Truck', 'Bulldozer'].includes(m.type)).length}`);
    
  } catch (error) {
    console.error('❌ Error loading machinery data:', error);
  }
}

// Run the script
loadRealisticMachinery().catch(console.error);