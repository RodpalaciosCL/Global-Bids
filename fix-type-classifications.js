import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function fixTypeClassifications() {
  try {
    console.log('🔧 Corrigiendo clasificaciones de tipos...');
    
    // Fix Golf Carts - all items with "golf cart" in name should be golf-cart
    await sql`UPDATE machinery SET type = 'golf-cart' WHERE LOWER(name) LIKE '%golf cart%'`;
    console.log('✅ Golf carts corregidos');
    
    // Fix Compressors
    await sql`UPDATE machinery SET type = 'compressor' WHERE LOWER(name) LIKE '%compressor%'`;
    console.log('✅ Compresores corregidos');
    
    // Fix Concrete Mixers
    await sql`UPDATE machinery SET type = 'mixer' WHERE LOWER(name) LIKE '%concrete mixer%' OR LOWER(name) LIKE '%mixer%'`;
    console.log('✅ Mezcladoras corregidas');
    
    // Fix Cranes
    await sql`UPDATE machinery SET type = 'crane' WHERE LOWER(name) LIKE '%crane%'`;
    console.log('✅ Grúas corregidas');
    
    // Fix Skidsteers
    await sql`UPDATE machinery SET type = 'skidsteer' WHERE LOWER(name) LIKE '%skidsteer%'`;
    console.log('✅ Minicargadores corregidos');
    
    // Fix Water Trucks and Fuel Trucks - should be truck not dump-truck
    await sql`UPDATE machinery SET type = 'truck' WHERE LOWER(name) LIKE '%water truck%' OR LOWER(name) LIKE '%fuel truck%'`;
    console.log('✅ Camiones cisterna y combustible corregidos');
    
    // Fix Articulated Haul Trucks - should be dump-truck
    await sql`UPDATE machinery SET type = 'dump-truck' WHERE LOWER(name) LIKE '%haul truck%' OR LOWER(name) LIKE '%rock truck%'`;
    console.log('✅ Camiones articulados corregidos');
    
    // Fix Motor Graders
    await sql`UPDATE machinery SET type = 'grader' WHERE LOWER(name) LIKE '%grader%'`;
    console.log('✅ Motoniveladoras corregidas');
    
    // Fix Telehandlers
    await sql`UPDATE machinery SET type = 'telehandler' WHERE LOWER(name) LIKE '%telehandler%'`;
    console.log('✅ Manipuladores telescópicos corregidos');
    
    // Fix Rollers
    await sql`UPDATE machinery SET type = 'roller' WHERE LOWER(name) LIKE '%roller%'`;
    console.log('✅ Rodillos corregidos');
    
    // Fix Drills
    await sql`UPDATE machinery SET type = 'drill' WHERE LOWER(name) LIKE '%drill%'`;
    console.log('✅ Perforadoras corregidas');
    
    // Fix Buses
    await sql`UPDATE machinery SET type = 'bus' WHERE LOWER(name) LIKE '%bus%'`;
    console.log('✅ Autobuses corregidos');
    
    // Fix Trailers
    await sql`UPDATE machinery SET type = 'trailer' WHERE LOWER(name) LIKE '%trailer%'`;
    console.log('✅ Remolques corregidos');
    
    // Fix Vehicles (Explorer, Cherokee, Landtrek)
    await sql`UPDATE machinery SET type = 'vehicle' WHERE LOWER(name) LIKE '%explorer%' OR LOWER(name) LIKE '%cherokee%' OR LOWER(name) LIKE '%landtrek%' OR LOWER(name) LIKE '%armored%'`;
    console.log('✅ Vehículos corregidos');
    
    // Fix Parts/Attachments
    await sql`UPDATE machinery SET type = 'parts' WHERE LOWER(name) LIKE '%ripper tooth%' OR LOWER(name) LIKE '%rake attachment%' OR LOWER(name) LIKE '%attachment%' OR LOWER(name) LIKE '%tooth%'`;
    console.log('✅ Repuestos corregidos');
    
    // Special fixes for specific items
    await sql`UPDATE machinery SET type = 'machinery' WHERE LOWER(name) LIKE '%toilet%'`;
    console.log('✅ Equipos especiales corregidos');
    
    // Verify the changes
    const results = await sql`SELECT type, COUNT(*) as count FROM machinery GROUP BY type ORDER BY count DESC`;
    console.log('\n📊 Clasificaciones actualizadas:');
    results.forEach(row => {
      console.log(`${row.type}: ${row.count}`);
    });
    
    console.log('\n🎉 ¡Clasificaciones corregidas exitosamente!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixTypeClassifications();