import { db } from '../server/db';
import { machinery } from '../shared/schema';
import { eq } from 'drizzle-orm';

// Cantidades exactas de imágenes por lote según verificación real
const exactImageCounts = {
  // Lotes con múltiples imágenes verificadas
  99: 15,  // Cat 336dl Excavator  
  98: 12,  // Caterpillar 385c
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
  113: 9,  // Caterpillar 320d2 GC
  
  // Lotes simples (solo 1 imagen)
  1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1,
  11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1
};

async function main() {
  console.log('🔧 Corrigiendo TODAS las galerías con cantidades exactas...\n');

  const allMachinery = await db.select().from(machinery);
  
  for (const item of allMachinery) {
    const lotMatch = item.image.match(/\/(\d+)_1\.jpg$/);
    if (!lotMatch) continue;
    
    const lotNum = parseInt(lotMatch[1]);
    const imageCount = exactImageCounts[lotNum] || 1;
    
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

  console.log('\n🎉 TODAS las galerías corregidas con cantidades exactas');
}

main().catch(console.error);