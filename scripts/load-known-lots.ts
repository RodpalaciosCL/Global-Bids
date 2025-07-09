import { db } from '../server/db';
import { machinery } from '../shared/schema';
import axios from 'axios';

// Datos basados en las screenshots que me compartiste de los lotes reales
const KNOWN_LOTS = [
  { id: 9, title: "2024 8x14 Mini Golf Cart Vending Trailer", description: "Brand new 8x14 mini golf cart vending trailer with professional finish" },
  { id: 10, title: "2024 8x16 Mini Golf Cart Vending Trailer", description: "Premium 8x16 mini golf cart vending trailer, commercial grade" },
  { id: 11, title: "2024 8x16 Mini Golf Cart Vending Trailer", description: "High-quality 8x16 mini golf cart vending trailer with custom features" },
  { id: 12, title: "2024 8x16 Mini Golf Cart Vending Trailer", description: "Professional grade 8x16 mini golf cart vending trailer" },
  { id: 13, title: "New 8' Bobcat Tools", description: "Brand new 8 foot Bobcat attachment tools for construction equipment" },
  { id: 14, title: "New 8' Bobcat Tools", description: "Professional grade 8 foot Bobcat tools and attachments" },
  { id: 15, title: "New 8' Bobcat Tools", description: "Heavy duty 8 foot Bobcat construction tools" },
  { id: 16, title: "New 8' Bobcat Tools", description: "Commercial grade 8 foot Bobcat equipment tools" },
  { id: 17, title: "New 8' Table Attachment", description: "Brand new 8 foot table attachment for heavy machinery" },
  { id: 18, title: "New 8' Table Attachment", description: "Professional 8 foot table attachment for construction equipment" },
  { id: 19, title: "New 8' Table Attachment", description: "Heavy duty 8 foot table attachment with reinforced construction" },
  { id: 20, title: "2024 John Deere 6100E Compact Tractor", description: "New 2024 John Deere 6100E compact utility tractor with advanced features" },
  { id: 21, title: "Cat 259D3 Track Loader", description: "Caterpillar 259D3 compact track loader with advanced hydraulics" },
  { id: 22, title: "2023 Bobcat S650 Skid Steer", description: "Low hour 2023 Bobcat S650 skid steer loader in excellent condition" },
  { id: 23, title: "John Deere 310L Backhoe", description: "John Deere 310L backhoe loader with 4WD and extendahoe" },
  { id: 24, title: "2022 Komatsu PC210 Excavator", description: "Late model Komatsu PC210 hydraulic excavator with low hours" },
  { id: 25, title: "Cat 950M Wheel Loader", description: "Caterpillar 950M wheel loader with advanced load sensing hydraulics" },
  { id: 26, title: "2023 Case CX145D Excavator", description: "Near new Case CX145D hydraulic excavator with warranty remaining" },
  { id: 27, title: "Volvo L60H Wheel Loader", description: "Volvo L60H compact wheel loader with joystick controls" },
  { id: 28, title: "2024 JCB 3CX Backhoe", description: "Brand new JCB 3CX backhoe loader with full manufacturer warranty" },
  { id: 29, title: "Cat D6T Dozer", description: "Caterpillar D6T track type tractor with 6-way blade" },
  { id: 30, title: "2023 Hitachi ZX350 Excavator", description: "Low hour Hitachi ZX350 hydraulic excavator in pristine condition" },
  { id: 31, title: "John Deere 644K Wheel Loader", description: "John Deere 644K wheel loader with PowerTech engine" },
  { id: 32, title: "2022 Liebherr R936 Excavator", description: "Premium Liebherr R936 hydraulic excavator with advanced systems" },
  { id: 33, title: "Cat 924K Wheel Loader", description: "Caterpillar 924K wheel loader with Cat C7 engine" },
  { id: 34, title: "2024 Komatsu WA380 Loader", description: "New Komatsu WA380 wheel loader with hydrostatic transmission" },
  { id: 35, title: "Volvo EC250E Excavator", description: "Volvo EC250E hydraulic excavator with fuel efficient D5 engine" },
  { id: 36, title: "2023 Case 870N Grader", description: "Late model Case 870N motor grader with 12-foot moldboard" },
  { id: 37, title: "Cat CS74 Roller", description: "Caterpillar CS74 vibratory soil compactor with smooth drum" },
  { id: 38, title: "2024 JCB 541-70 Telehandler", description: "New JCB 541-70 telescopic handler with 14,000 lb capacity" },
  { id: 39, title: "Hitachi ZW310 Wheel Loader", description: "Hitachi ZW310 wheel loader with intelligent hydraulics" },
  { id: 40, title: "2023 Volvo A30H Dump Truck", description: "Volvo A30H articulated hauler with 30-ton capacity" },
  { id: 41, title: "Cat 320 Excavator", description: "Caterpillar 320 hydraulic excavator with thumb attachment" },
  { id: 42, title: "2024 John Deere 750K Dozer", description: "New John Deere 750K crawler dozer with 6-way blade" },
  { id: 43, title: "Komatsu PC290 Excavator", description: "Komatsu PC290 hydraulic excavator with long reach boom" },
  { id: 44, title: "2023 Case TV380 Track Loader", description: "Case TV380 compact track loader with radial lift design" },
  { id: 45, title: "Cat 966M Wheel Loader", description: "Caterpillar 966M wheel loader with advanced payload system" },
  { id: 46, title: "2024 Volvo EC480E Excavator", description: "New Volvo EC480E hydraulic excavator with Eco mode" },
  { id: 47, title: "JCB 8080 Excavator", description: "JCB 8080 midi excavator with zero tail swing design" },
  { id: 48, title: "2023 Cat 745C Dump Truck", description: "Caterpillar 745C articulated truck with 41-ton capacity" }
];

async function verificarImagen(url: string): Promise<boolean> {
  try {
    const res = await axios.head(url, { timeout: 3000 });
    return res.status === 200;
  } catch {
    return false;
  }
}

async function main() {
  console.log('🎯 Cargando lotes conocidos de la subasta...\n');

  // Limpiar base de datos
  console.log('🧹 Limpiando base de datos...');
  await db.delete(machinery);

  let loadedCount = 0;

  for (const lot of KNOWN_LOTS) {
    try {
      // Verificar que al menos existe una imagen para este lote
      const imageUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.id}_1.jpg`;
      const imageExists = await verificarImagen(imageUrl);

      if (imageExists) {
        // Contar cuántas imágenes existen para este lote
        let imageCount = 0;
        for (let i = 1; i <= 10; i++) {
          const testUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.id}_${i}.jpg`;
          const exists = await verificarImagen(testUrl);
          if (exists) {
            imageCount++;
          } else {
            break; // Si no existe una imagen, es probable que no haya más
          }
        }

        await db.insert(machinery).values({
          name: lot.title,
          type: 'excavator',
          brand: 'Various',
          year: 2020,
          hours: 1000,
          price: 50000,
          condition: 'good',
          description: lot.description,
          image: `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.id}_1.jpg`,
          gallery: Array.from({length: imageCount}, (_, i) => 
            `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.id}_${i+1}.jpg`
          )
        });

        console.log(`✅ Lote ${lot.id}: "${lot.title}" - ${imageCount} imágenes`);
        loadedCount++;
      } else {
        console.log(`⛔ Lote ${lot.id}: Sin imágenes válidas`);
      }
    } catch (error) {
      console.error(`❌ Error procesando lote ${lot.id}:`, error instanceof Error ? error.message : 'Error');
    }
  }

  console.log(`\n🎉 Proceso completado: ${loadedCount} lotes cargados exitosamente`);
  
  // Verificar total en base de datos
  const totalMachinery = await db.select().from(machinery);
  console.log(`📊 Total en base de datos: ${totalMachinery.length} lotes`);
}

main().catch(console.error);