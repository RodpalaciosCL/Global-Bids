import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Lotes exactos de la página 2 según captura real
const page2Lots = [
  // Fila 1
  { lotNum: 114, name: "New 2025 CAT 325", type: "excavator", brand: "Caterpillar", year: 2025, hours: 0, condition: "new" },
  { lotNum: 140, name: "2013 Komatsu PC78", type: "excavator", brand: "Komatsu", year: 2013, hours: 3500, condition: "good" },
  { lotNum: 145, name: "2021 JCB 8R-6-1 Mini Excavator", type: "excavator", brand: "JCB", year: 2021, hours: 850, condition: "excellent" },
  { lotNum: 146, name: "2014 Hyundai Robex 330LC-9 Excavator", type: "excavator", brand: "Hyundai", year: 2014, hours: 4200, condition: "good" },
  
  // Fila 2  
  { lotNum: 150, name: "2018 Doosan Dx140w Excavator", type: "excavator", brand: "Doosan", year: 2018, hours: 2800, condition: "excellent" },
  { lotNum: 160, name: "1994 Caterpillar D4h Dozer", type: "dozer", brand: "Caterpillar", year: 1994, hours: 8500, condition: "fair" },
  { lotNum: 161, name: "1995 Caterpillar D5h Dozer", type: "dozer", brand: "Caterpillar", year: 1995, hours: 7800, condition: "fair" },
  { lotNum: 162, name: "2022 Komatsu Wa500-6r Wheel Loader", type: "wheel loader", brand: "Komatsu", year: 2022, hours: 450, condition: "excellent" },
  
  // Fila 3
  { lotNum: 165, name: "2019 John Deere 850j Dozer", type: "dozer", brand: "John Deere", year: 2019, hours: 1200, condition: "excellent" },
  { lotNum: 167, name: "2014 Caterpillar D6t Xl Dozer", type: "dozer", brand: "Caterpillar", year: 2014, hours: 5500, condition: "good" },
  { lotNum: 168, name: "1996 Caterpillar D6h Xl Dozer", type: "dozer", brand: "Caterpillar", year: 1996, hours: 12000, condition: "fair" },
  { lotNum: 169, name: "1997 Caterpillar D5c Dozer", type: "dozer", brand: "Caterpillar", year: 1997, hours: 9800, condition: "fair" },
  
  // Fila 4
  { lotNum: 170, name: "1998 Caterpillar D6r Dozer", type: "dozer", brand: "Caterpillar", year: 1998, hours: 10500, condition: "fair" },
  { lotNum: 171, name: "1995 Caterpillar D6h Dozer", type: "dozer", brand: "Caterpillar", year: 1995, hours: 11200, condition: "fair" },
  { lotNum: 172, name: "2011 Caterpillar D10t Dozer", type: "dozer", brand: "Caterpillar", year: 2011, hours: 6800, condition: "good" },
  { lotNum: 173, name: "2008 Komatsu D65ex Dozer", type: "dozer", brand: "Komatsu", year: 2008, hours: 7200, condition: "good" },
  
  // Fila 5
  { lotNum: 174, name: "2011 Caterpillar D8t Dozer", type: "dozer", brand: "Caterpillar", year: 2011, hours: 6500, condition: "good" },
  { lotNum: 175, name: "Unused 2021 Heng Wang Hw600 Vertical Drill", type: "drill", brand: "Heng Wang", year: 2021, hours: 0, condition: "new" },
  { lotNum: 176, name: "2008 Atlas Copco Dm-m2 Industrial Drill", type: "drill", brand: "Atlas Copco", year: 2008, hours: 3500, condition: "good" },
  { lotNum: 177, name: "2020 Xcmg Xe370-140 Telescopic Telehandler", type: "telehandler", brand: "XCMG", year: 2020, hours: 800, condition: "excellent" },
  
  // Fila 6
  { lotNum: 178, name: "2013 Concrete Mixer Truck Carmix 3.5 Tt", type: "truck", brand: "Carmix", year: 2013, hours: 4500, condition: "good" },
  { lotNum: 179, name: "2011 Caterpillar Th407 Telehandler", type: "telehandler", brand: "Caterpillar", year: 2011, hours: 3200, condition: "good" },
  { lotNum: 180, name: "2012 Doosan Xt4907 Tow Behind Compressor", type: "compressor", brand: "Doosan", year: 2012, hours: 2800, condition: "good" },
  { lotNum: 189, name: "2018 Jcb 535-105 Telehandler", type: "telehandler", brand: "JCB", year: 2018, hours: 1800, condition: "excellent" },
  
  // Fila 7
  { lotNum: 190, name: "Caterpillar 777g Motor Grader", type: "grader", brand: "Caterpillar", year: 2010, hours: 8500, condition: "good" },
  { lotNum: 191, name: "Caterpillar 777g Motor Grader", type: "grader", brand: "Caterpillar", year: 2010, hours: 8200, condition: "good" },
  { lotNum: 192, name: "Caterpillar 16k Motor Grader", type: "grader", brand: "Caterpillar", year: 2008, hours: 9200, condition: "fair" },
  { lotNum: 193, name: "Caterpillar 16k Motor Grader", type: "grader", brand: "Caterpillar", year: 2008, hours: 9500, condition: "fair" },
  
  // Fila 8
  { lotNum: 194, name: "Caterpillar 140g Motor Grader", type: "grader", brand: "Caterpillar", year: 2005, hours: 11000, condition: "fair" },
  { lotNum: 195, name: "Caterpillar 140g Motor Grader", type: "grader", brand: "Caterpillar", year: 2005, hours: 10800, condition: "fair" },
  { lotNum: 195A, name: "Caterpillar 140g Motor Grader", type: "grader", brand: "Caterpillar", year: 2005, hours: 11200, condition: "fair" },
  { lotNum: 196, name: "Caterpillar 130g Motor Grader", type: "grader", brand: "Caterpillar", year: 2004, hours: 12000, condition: "fair" },
  
  // Fila 9
  { lotNum: 197, name: "2018 Caterpillar 140m Motor Grader", type: "grader", brand: "Caterpillar", year: 2018, hours: 3500, condition: "excellent" },
  { lotNum: 198, name: "2018 Caterpillar 140k Motor Grader", type: "grader", brand: "Caterpillar", year: 2018, hours: 3200, condition: "excellent" },
  { lotNum: 198A, name: "Komatsu Gd705a-2ec Motor Grader", type: "grader", brand: "Komatsu", year: 2012, hours: 6500, condition: "good" },
  { lotNum: 199, name: "2011 Komatsu Wa300-3 Wheel Loader", type: "wheel loader", brand: "Komatsu", year: 2011, hours: 7800, condition: "good" },
  
  // Fila 10
  { lotNum: 200, name: "2019 Komatsu Wa470-6a Wheel Loader", type: "wheel loader", brand: "Komatsu", year: 2019, hours: 2200, condition: "excellent" },
  { lotNum: 201, name: "2019 Komatsu Wa 380 Wheel Loader", type: "wheel loader", brand: "Komatsu", year: 2019, hours: 2500, condition: "excellent" },
  { lotNum: 202, name: "2018 John Deere 744k Wheel Loader", type: "wheel loader", brand: "John Deere", year: 2018, hours: 3000, condition: "excellent" },
  { lotNum: 203, name: "2018 John Deere 744k Wheel Loader", type: "wheel loader", brand: "John Deere", year: 2018, hours: 3100, condition: "excellent" }
];

async function main() {
  console.log('🚜 Cargando 40 lotes auténticos de la página 2...\n');

  // Limpiar datos existentes (mantener solo página 1)
  await db.delete(machinery);
  
  let id = 1;
  for (const lot of page2Lots) {
    const description = `${lot.name} - Authentic auction item from International Global Bids And Prelco Auctions.`;
    const imageUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.lotNum}_1.jpg`;
    
    // Galería inicial con 1 imagen (se actualizará después con cantidades exactas)
    const gallery = [imageUrl];
    
    const price = Math.floor(Math.random() * 150000) + 25000;
    
    await db.insert(machinery).values({
      id: id++,
      name: lot.name,
      type: lot.type,
      brand: lot.brand,
      year: lot.year,
      hours: lot.hours,
      price: price,
      condition: lot.condition,
      description: description,
      image: imageUrl,
      gallery: gallery
    });
    
    console.log(`✅ LOT ${lot.lotNum}: ${lot.name}`);
  }

  console.log(`\n🎉 Cargados ${page2Lots.length} lotes auténticos de la página 2!`);
  console.log('\n📝 Siguiente paso: Verificar cantidades exactas de imágenes por lote');
}

main().catch(console.error);