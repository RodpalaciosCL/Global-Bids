import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Primero creo página 1 (lotes originales de la primera página)
const page1Lots = [
  { name: "Unused Irb50 Backhoe Loader", lotNum: 1, page: 1 },
  { name: "Unused Irb50 Mini Excavator", lotNum: 2, page: 1 },
  { name: "Unused Irb50 Mini Excavator", lotNum: 3, page: 1 },
  { name: "Unused Irb50 Mini Excavator", lotNum: 4, page: 1 },
  { name: "2022 Peugeot Landtrek", lotNum: 77, page: 1 },
  { name: "2022 Ford Excursion", lotNum: 75, page: 1 },
  { name: "2021 Jeep Grand Cherokee Limited Car", lotNum: 76, page: 1 },
  { name: "2024 John Deere 8105R Tractor", lotNum: 20, page: 1 },
  { name: "2021 Cat 336dl Excavator", lotNum: 99, page: 1 },
  { name: "2019 Caterpillar 385c Excavator", lotNum: 98, page: 1 },
  // Agregar más lotes de la página 1 original...
];

async function main() {
  console.log('🔄 Reorganizando páginas...\n');

  // Eliminar todos los lotes actuales
  await db.delete(machinery);
  
  // Crear página 1 con lotes originales
  let id = 1;
  for (const lot of page1Lots) {
    const imageUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.lotNum}_1.jpg`;
    const gallery = [imageUrl];
    
    await db.insert(machinery).values({
      id: id++,
      name: lot.name,
      type: "excavator",
      brand: "Caterpillar",
      year: 2021,
      hours: 1500,
      price: 75000,
      condition: "excellent",
      description: `${lot.name} - Authentic auction item from International Global Bids And Prelco Auctions.`,
      image: imageUrl,
      gallery: gallery,
      page: 1
    });
    
    console.log(`✅ Página 1 - LOT ${lot.lotNum}: ${lot.name}`);
  }

  // Crear página 2 con lotes de página 2 del sitio real
  const page2Lots = [
    { name: "New 2025 CAT 323 excavator (unused)", lotNum: 114 },
    { name: "2012 Komatsu PC78 Excavator", lotNum: 140 },
    { name: "2021 Jcb E6.5r1 Mini Excavator", lotNum: 145 },
    { name: "2014 Hyundai Robex 330LC-9 excavator", lotNum: 146 },
    { name: "2018 Doosan Dx140w Excavator", lotNum: 150 },
    { name: "1994 Caterpillar D4h Dozer", lotNum: 160 },
    { name: "1995 Caterpillar D5h Dozer", lotNum: 161 },
    { name: "2022 Komatsu Wa500-6r Wheel Loader", lotNum: 162 },
    { name: "2019 John Deere 850j Dozer", lotNum: 165 },
    { name: "2014 Caterpillar D6t Xl Dozer", lotNum: 167 },
    { name: "1996 Caterpillar D6h Xl Dozer", lotNum: 168 },
    { name: "1997 Caterpillar D5c Dozer", lotNum: 169 },
    { name: "1998 Caterpillar D6r Dozer", lotNum: 170 },
    { name: "1995 Caterpillar D6h Dozer", lotNum: 171 },
    { name: "2011 Caterpillar D10t Dozer", lotNum: 172 },
    { name: "2008 Komatsu D65ex Dozer", lotNum: 173 },
    { name: "2011 Caterpillar D8t Dozer", lotNum: 174 },
    { name: "Unused 2021 Heng Wang Hw600 Vertical Drill", lotNum: 175 },
    { name: "2008 Atlas Copco Dm-m2 Industrial Drill", lotNum: 176 },
    { name: "2020 Xcmg Xe370-140 Telescopic Telehandler", lotNum: 177 },
    { name: "2013 Concrete Mixer Truck Carmix 3.5 Tt", lotNum: 178 },
    { name: "2011 Caterpillar Th407 Telehandler", lotNum: 179 },
    { name: "2012 Doosan Xt4907 Tow Behind Compressor", lotNum: 180 },
    { name: "2018 Jcb 535-105 Telehandler", lotNum: 189 },
    { name: "Caterpillar 777g Motor Grader", lotNum: 190 },
    { name: "Caterpillar 777g Motor Grader", lotNum: 191 },
    { name: "Caterpillar 16k Motor Grader", lotNum: 192 },
    { name: "Caterpillar 16k Motor Grader", lotNum: 193 },
    { name: "Caterpillar 140g Motor Grader", lotNum: 194 },
    { name: "Caterpillar 140g Motor Grader", lotNum: 195 },
    { name: "Caterpillar 140g Motor Grader", lotNum: "195A" },
    { name: "Caterpillar 130g Motor Grader", lotNum: 196 },
    { name: "2018 Caterpillar 140m Motor Grader", lotNum: 197 },
    { name: "2018 Caterpillar 140k Motor Grader", lotNum: 198 },
    { name: "Komatsu Gd705a-2ec Motor Grader", lotNum: "198A" },
    { name: "2011 Komatsu Wa300-3 Wheel Loader", lotNum: 199 },
    { name: "2019 Komatsu Wa470-6a Wheel Loader", lotNum: 200 },
    { name: "2019 Komatsu Wa 380 Wheel Loader", lotNum: 201 },
    { name: "2018 John Deere 744k Wheel Loader", lotNum: 202 },
    { name: "2018 John Deere 744k Wheel Loader", lotNum: 203 }
  ];

  for (const lot of page2Lots) {
    const imageUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.lotNum}_1.jpg`;
    const gallery = [imageUrl];
    
    await db.insert(machinery).values({
      id: id++,
      name: lot.name,
      type: "excavator",
      brand: "Caterpillar", 
      year: 2020,
      hours: 2000,
      price: 85000,
      condition: "excellent",
      description: `${lot.name} - Authentic auction item from International Global Bids And Prelco Auctions.`,
      image: imageUrl,
      gallery: gallery,
      page: 2
    });
    
    console.log(`✅ Página 2 - LOT ${lot.lotNum}: ${lot.name}`);
  }

  console.log(`\n🎉 Creadas página 1 (${page1Lots.length} lotes) y página 2 (${page2Lots.length} lotes)`);
}

main().catch(console.error);