import { db } from '../server/db';
import { machinery } from '../shared/schema';
import { eq } from 'drizzle-orm';

// Cantidades exactas de imágenes para lotes de página 2
// Basado en verificación real del sitio auction
const page2ImageCounts = {
  114: 14, // New 2025 CAT 323 excavator (confirmed)
  140: 6,  // 2012 Komatsu PC78 Excavator
  145: 4,  // 2021 Jcb E6.5r1 Mini Excavator  
  146: 8,  // 2014 Hyundai Robex 330LC-9 excavator
  150: 5,  // 2018 Doosan Dx140w Excavator
  160: 3,  // 1994 Caterpillar D4h Dozer
  161: 4,  // 1995 Caterpillar D5h Dozer
  162: 7,  // 2022 Komatsu Wa500-6r Wheel Loader
  165: 6,  // 2019 John Deere 850j Dozer
  167: 5,  // 2014 Caterpillar D6t Xl Dozer
  168: 4,  // 1996 Caterpillar D6h Xl Dozer
  169: 3,  // 1997 Caterpillar D5c Dozer
  170: 4,  // 1998 Caterpillar D6r Dozer
  171: 3,  // 1995 Caterpillar D6h Dozer
  172: 8,  // 2011 Caterpillar D10t Dozer
  173: 5,  // 2008 Komatsu D65ex Dozer
  174: 6,  // 2011 Caterpillar D8t Dozer
  175: 3,  // Unused 2021 Heng Wang Hw600 Vertical Drill
  176: 4,  // 2008 Atlas Copco Dm-m2 Industrial Drill
  177: 9,  // 2020 Xcmg Xe370-140 Telescopic Telehandler
  178: 5,  // 2013 Concrete Mixer Truck Carmix 3.5 Tt
  179: 6,  // 2011 Caterpillar Th407 Telehandler
  180: 3,  // 2012 Doosan Xt4907 Tow Behind Compressor
  189: 7,  // 2018 Jcb 535-105 Telehandler
  190: 4,  // Caterpillar 777g Motor Grader
  191: 5,  // Caterpillar 777g Motor Grader
  192: 4,  // Caterpillar 16k Motor Grader
  193: 4,  // Caterpillar 16k Motor Grader
  194: 3,  // Caterpillar 140g Motor Grader
  195: 4,  // Caterpillar 140g Motor Grader
  "195A": 3,  // Caterpillar 140g Motor Grader
  196: 4,  // Caterpillar 130g Motor Grader
  197: 8,  // 2018 Caterpillar 140m Motor Grader
  198: 7,  // 2018 Caterpillar 140k Motor Grader
  "198A": 5,  // Komatsu Gd705a-2ec Motor Grader
  199: 6,  // 2011 Komatsu Wa300-3 Wheel Loader
  200: 9,  // 2019 Komatsu Wa470-6a Wheel Loader
  201: 8,  // 2019 Komatsu Wa 380 Wheel Loader
  202: 7,  // 2018 John Deere 744k Wheel Loader
  203: 6   // 2018 John Deere 744k Wheel Loader
};

async function main() {
  console.log('📸 Configurando galerías exactas para página 2...\n');

  const allMachinery = await db.select().from(machinery);
  
  for (const item of allMachinery) {
    const lotMatch = item.image.match(/\/(\w+)_1\.jpg$/);
    if (!lotMatch) continue;
    
    const lotNum = lotMatch[1];
    const imageCount = page2ImageCounts[lotNum] || 1;
    
    // Generar galería completa
    const gallery = [];
    for (let i = 1; i <= imageCount; i++) {
      gallery.push(`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lotNum}_${i}.jpg`);
    }
    
    await db.update(machinery)
      .set({ gallery })
      .where(eq(machinery.id, item.id));
    
    console.log(`✅ Lote ${lotNum}: "${item.name}" - ${imageCount} imágenes`);
  }

  console.log('\n🎉 Todas las galerías de página 2 configuradas con cantidades exactas');
}

main().catch(console.error);