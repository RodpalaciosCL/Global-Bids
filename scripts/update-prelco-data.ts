import { db } from '../server/db';
import { machinery } from '../shared/schema';
import { eq } from 'drizzle-orm';

// Update existing lots with exact Prelco auction names
const prelcoUpdates = [
  {
    id: 1,
    name: "Unused Irbl50 Backhoe Loader With Kubota Engine",
    type: "Loader",
    brand: "Kubota",
    year: 2024,
    price: 52000
  },
  {
    id: 2,
    name: "Unused Ire25 Mini Excavator With Kubota Engine",
    type: "Excavator", 
    brand: "Kubota",
    year: 2024,
    price: 48000
  },
  {
    id: 3,
    name: "Unused Ire25 Mini Excavator With Kubota Engine",
    type: "Excavator",
    brand: "Kubota", 
    year: 2024,
    price: 48000
  },
  {
    id: 4,
    name: "Unused Ire25 Mini Excavator With Kubota Engine",
    type: "Excavator",
    brand: "Kubota",
    year: 2024,
    price: 48000
  },
  {
    id: 5,
    name: "Unused 1re15 Mini Excavator",
    type: "Excavator",
    brand: "IR Equipment",
    year: 2024,
    price: 32000
  },
  {
    id: 6,
    name: "Unused 1re15 Mini Excavator", 
    type: "Excavator",
    brand: "IR Equipment",
    year: 2024,
    price: 32000
  },
  {
    id: 7,
    name: "Unused Ird25 Crawler Dumper With Seat",
    type: "Dumper",
    brand: "IR Equipment",
    year: 2024,
    price: 55000
  },
  {
    id: 8,
    name: "Unused Ird25 Crawler Dumper With Seat",
    type: "Dumper", 
    brand: "IR Equipment",
    year: 2024,
    price: 55000
  },
  {
    id: 9,
    name: "New Irgc40 Mini Golf Cart With Awning And Carport",
    type: "Utility Vehicle",
    brand: "IR Equipment",
    year: 2024,
    price: 8500
  },
  {
    id: 10,
    name: "New Irgc40 Mini Golf Cart With Awning And Carport",
    type: "Utility Vehicle",
    brand: "IR Equipment", 
    year: 2024,
    price: 8500
  },
  {
    id: 11,
    name: "New Irgc40 Mini Golf Cart With Awning And Carport",
    type: "Utility Vehicle",
    brand: "IR Equipment",
    year: 2024,
    price: 8500
  },
  {
    id: 12,
    name: "2024 Irgc40 Mini Golf Cart With Awning And Carport",
    type: "Utility Vehicle",
    brand: "IR Equipment",
    year: 2024,
    price: 8500
  },
  {
    id: 13,
    name: "New Irmt Mobile Toilet W/shower",
    type: "Support Equipment",
    brand: "IR Equipment",
    year: 2024,
    price: 15000
  },
  {
    id: 14,
    name: "New Ir Ripper Tooth",
    type: "Attachment", 
    brand: "IR Equipment",
    year: 2024,
    price: 2500
  },
  {
    id: 15,
    name: "New Ir Ripper Tooth",
    type: "Attachment",
    brand: "IR Equipment",
    year: 2024,
    price: 2500
  },
  {
    id: 16,
    name: "New Ir Ripper Tooth",
    type: "Attachment",
    brand: "IR Equipment", 
    year: 2024,
    price: 2500
  },
  {
    id: 17,
    name: "New Ir Rake Attachment",
    type: "Attachment",
    brand: "IR Equipment",
    year: 2024,
    price: 3500
  },
  {
    id: 18,
    name: "New Ir Rake Attachment",
    type: "Attachment",
    brand: "IR Equipment",
    year: 2024,
    price: 3500
  },
  {
    id: 19,
    name: "New Ir Rake Attachment", 
    type: "Attachment",
    brand: "IR Equipment",
    year: 2024,
    price: 3500
  },
  {
    id: 20,
    name: "2025 John Deere 6105e Tractor",
    type: "Tractor",
    brand: "John Deere",
    year: 2025,
    price: 85000
  },
  {
    id: 75,
    name: "2020 Ford Explorer Ecoboost Armored Car",
    type: "Armored Vehicle",
    brand: "Ford",
    year: 2020,
    price: 125000
  },
  {
    id: 76,
    name: "2021 Jeep Grand Cherokee Armored Car",
    type: "Armored Vehicle",
    brand: "Jeep", 
    year: 2021,
    price: 135000
  }
];

async function updatePrelcoData() {
  try {
    console.log('🔄 Updating lots with exact Prelco auction names...');
    
    for (const update of prelcoUpdates) {
      await db.update(machinery)
        .set({
          name: update.name,
          type: update.type,
          brand: update.brand,
          year: update.year,
          price: update.price
        })
        .where(eq(machinery.id, update.id));
      
      console.log(`✅ Updated Lot ${update.id}: ${update.name} - $${update.price.toLocaleString()}`);
    }

    console.log('\n🎉 PRELCO DATA UPDATED!');
    console.log('📊 All lots now match exact Prelco auction names and specifications');
    
  } catch (error) {
    console.error('❌ Error updating Prelco data:', error);
    throw error;
  }
}

updatePrelcoData().catch(console.error);