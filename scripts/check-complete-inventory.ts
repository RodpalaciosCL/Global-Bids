import { db } from '../server/db';
import { machinery } from '../shared/schema';

async function main() {
  console.log('📊 Verificando inventario completo...\n');

  const allMachinery = await db.select().from(machinery);
  
  console.log(`Total de lotes en base de datos: ${allMachinery.length}`);
  
  // Agrupar por tipo para verificar diversidad
  const byType = allMachinery.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('\nDistribución por tipo:');
  Object.entries(byType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count} lotes`);
  });
  
  // Verificar que tenemos los lotes principales mencionados
  const keyLots = [
    'Unused Irb50 Backhoe Loader',
    '2022 Peugeot Landtrek', 
    '2022 Ford Excursion',
    '2021 Jeep Grand Cherokee Limited Car',
    'New Iguchi Mini Golf Cart',
    '2021 Cat 336dl Excavator'
  ];
  
  console.log('\nVerificando lotes clave:');
  keyLots.forEach(name => {
    const found = allMachinery.find(item => item.name.includes(name.split(' ')[0]));
    console.log(`  ${name}: ${found ? '✅ Encontrado' : '❌ Faltante'}`);
  });
  
  // Mostrar primeros 10 para verificar títulos
  console.log('\nPrimeros 10 lotes:');
  allMachinery.slice(0, 10).forEach((item, i) => {
    console.log(`  ${i+1}. "${item.name}" - ${item.gallery?.length || 0} imágenes`);
  });
}

main().catch(console.error);