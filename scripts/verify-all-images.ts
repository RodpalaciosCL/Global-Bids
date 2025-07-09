import { db } from '../server/db';
import { machinery } from '../shared/schema';
import { eq } from 'drizzle-orm';
import axios from 'axios';

async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await axios.head(url, { timeout: 5000 });
    return response.status === 200;
  } catch {
    return false;
  }
}

async function main() {
  console.log('🔍 Verificando TODAS las imágenes reales de TODOS los lotes...\n');

  const allMachinery = await db.select().from(machinery);
  
  for (const item of allMachinery) {
    const lotMatch = item.image.match(/\/(\d+)_1\.jpg$/);
    if (!lotMatch) continue;
    
    const lotNum = parseInt(lotMatch[1]);
    console.log(`\n📋 Verificando Lote ${lotNum}: "${item.name}"`);
    
    // Verificar hasta 30 imágenes para encontrar el máximo real
    const realImages = [];
    for (let i = 1; i <= 30; i++) {
      const imageUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lotNum}_${i}.jpg`;
      const exists = await checkImageExists(imageUrl);
      
      if (exists) {
        realImages.push(imageUrl);
        console.log(`  ✅ Imagen ${i} existe`);
      } else {
        console.log(`  ❌ Imagen ${i} no existe - fin de secuencia`);
        break;
      }
    }
    
    if (realImages.length > 0) {
      // Actualizar con las imágenes reales encontradas
      await db.update(machinery)
        .set({ 
          image: realImages[0],
          gallery: realImages 
        })
        .where(eq(machinery.id, item.id));
      
      console.log(`  📊 Total imágenes reales: ${realImages.length}`);
    } else {
      console.log(`  ⚠️  Sin imágenes válidas para lote ${lotNum}`);
    }
    
    // Pausa pequeña para no sobrecargar
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  const total = await db.select().from(machinery);
  console.log(`\n🎉 Verificación completa de ${total.length} lotes`);
}

main().catch(console.error);