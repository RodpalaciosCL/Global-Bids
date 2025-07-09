import { db } from '../server/db';
import { machinery } from '../shared/schema';
import { eq } from 'drizzle-orm';

// Datos de imágenes reales basados en las screenshots
const lotImageCounts = {
  77: 22, // Peugeot Landtrek - tiene muchas imágenes
  75: 8,  // Ford Excursion - múltiples imágenes
  76: 7,  // Jeep Grand Cherokee - múltiples imágenes
  99: 15, // Cat 336dl Excavator
  98: 12, // Caterpillar 385c
  100: 10, // Komatsu Pc300lc-8
  101: 8,  // Komatsu Pc220lc-demo
  102: 6,  // John Deere 200g
  103: 5,  // Komatsu Pc200-8
  105: 7,  // Volvo Ec350dl
  106: 9,  // Komatsu Pc-200
  107: 6,  // Cat 302d2l
  108: 8,  // Hitachi Zaxis Lc 350
  109: 5,  // Komatsu Pc75
  110: 10, // Caterpillar 336 Dl
  111: 8,  // Caterpillar 323d2l
  112: 6,  // Hitachi Zaxis 200lc-3
  113: 9   // Caterpillar 320d2 GC
};

async function main() {
  console.log('🎯 Actualizando galerías con número correcto de imágenes...\n');

  const allMachinery = await db.select().from(machinery);
  
  for (const item of allMachinery) {
    // Extraer número de lote de la URL de imagen actual
    const lotMatch = item.image.match(/\/(\d+)_1\.jpg$/);
    if (!lotMatch) continue;
    
    const lotNum = parseInt(lotMatch[1]);
    const imageCount = lotImageCounts[lotNum] || 3; // Default 3 si no está especificado
    
    // Generar galería completa
    const gallery = [];
    for (let i = 1; i <= imageCount; i++) {
      gallery.push(`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lotNum}_${i}.jpg`);
    }
    
    try {
      await db.update(machinery)
        .set({ gallery })
        .where(eq(machinery.id, item.id));
      
      console.log(`✅ Lote ${lotNum}: "${item.name}" - ${imageCount} imágenes`);
    } catch (error) {
      console.error(`❌ Error actualizando lote ${lotNum}:`, error);
    }
  }

  console.log('\n🎉 Galerías actualizadas con imágenes reales');
}

main().catch(console.error);