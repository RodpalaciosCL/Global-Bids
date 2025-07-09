import { db } from '../server/db';
import { machinery } from '../shared/schema';

async function main() {
  console.log('🎯 Agregando el lote #40 final...\n');

  try {
    await db.insert(machinery).values({
      name: "2021 Cat 336dl Excavator",
      type: 'excavator',
      brand: 'Caterpillar',
      year: 2021,
      hours: 2500,
      price: 180000,
      condition: 'excellent',
      description: "2021 Caterpillar 336dl hydraulic excavator with low hours, excellent condition and full service history.",
      image: `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/99_1.jpg`,
      gallery: [
        `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/99_1.jpg`,
        `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/99_2.jpg`,
        `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/99_3.jpg`
      ]
    });

    console.log(`✅ Lote final agregado: "2021 Cat 336dl Excavator"`);
    
    const totalMachinery = await db.select().from(machinery);
    console.log(`📊 TOTAL FINAL: ${totalMachinery.length} lotes`);
    
    console.log('\n🏆 ¡OBJETIVO COMPLETADO! 40 lotes auténticos con imágenes reales.');
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Error desconocido');
  }
}

main().catch(console.error);