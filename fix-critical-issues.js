import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function fixCriticalIssues() {
  try {
    console.log('🔧 Fixing critical issues...');
    
    // Fix golf cart classifications
    console.log('1. Fixing golf cart classifications...');
    await sql`UPDATE machinery SET type = 'golf-cart' WHERE name LIKE '%Golf Cart%'`;
    
    // Fix vehicle classifications
    console.log('2. Fixing vehicle classifications...');
    await sql`UPDATE machinery SET type = 'vehicle' WHERE name LIKE '%Ford Explorer%' OR name LIKE '%Jeep%' OR name LIKE '%Peugeot%'`;
    
    // Fix truck classifications
    console.log('3. Fixing truck classifications...');
    await sql`UPDATE machinery SET type = 'truck' WHERE name LIKE '%Truck%' OR name LIKE '%Volvo Fm%' OR name LIKE '%Volvo Fmx%'`;
    
    // Fix bus classifications
    console.log('4. Fixing bus classifications...');
    await sql`UPDATE machinery SET type = 'bus' WHERE name LIKE '%Bus%'`;
    
    // Fix tractor classifications
    console.log('5. Fixing tractor classifications...');
    await sql`UPDATE machinery SET type = 'tractor' WHERE name LIKE '%Tractor%'`;
    
    // Fix dozer classifications
    console.log('6. Fixing dozer classifications...');
    await sql`UPDATE machinery SET type = 'dozer' WHERE name LIKE '%Dozer%'`;
    
    // Fix grader classifications
    console.log('7. Fixing grader classifications...');
    await sql`UPDATE machinery SET type = 'grader' WHERE name LIKE '%Grader%'`;
    
    // Fix drill classifications
    console.log('8. Fixing drill classifications...');
    await sql`UPDATE machinery SET type = 'drill' WHERE name LIKE '%Drill%'`;
    
    // Fix parts classifications
    console.log('9. Fixing parts classifications...');
    await sql`UPDATE machinery SET type = 'parts' WHERE name LIKE '%Ripper Tooth%' OR name LIKE '%Rake Attachment%'`;
    
    // Fix telehandler classifications
    console.log('10. Fixing telehandler classifications...');
    await sql`UPDATE machinery SET type = 'telehandler' WHERE name LIKE '%Telehandler%'`;
    
    // Fix roller classifications
    console.log('11. Fixing roller classifications...');
    await sql`UPDATE machinery SET type = 'roller' WHERE name LIKE '%Roller%'`;
    
    // Fix mixer classifications
    console.log('12. Fixing mixer classifications...');
    await sql`UPDATE machinery SET type = 'mixer' WHERE name LIKE '%Mixer%'`;
    
    // Fix compressor classifications
    console.log('13. Fixing compressor classifications...');
    await sql`UPDATE machinery SET type = 'compressor' WHERE name LIKE '%Compressor%'`;
    
    // Fix crane classifications
    console.log('14. Fixing crane classifications...');
    await sql`UPDATE machinery SET type = 'crane' WHERE name LIKE '%Crane%'`;
    
    // Fix trailer classifications
    console.log('15. Fixing trailer classifications...');
    await sql`UPDATE machinery SET type = 'trailer' WHERE name LIKE '%Trailer%'`;
    
    // Fix skidsteer classifications
    console.log('16. Fixing skidsteer classifications...');
    await sql`UPDATE machinery SET type = 'skidsteer' WHERE name LIKE '%Skid Steer%'`;
    
    // Fix dumper classifications
    console.log('17. Fixing dumper classifications...');
    await sql`UPDATE machinery SET type = 'dumper' WHERE name LIKE '%Dumper%'`;
    
    // Fix dump-truck classifications
    console.log('18. Fixing dump-truck classifications...');
    await sql`UPDATE machinery SET type = 'dump-truck' WHERE name LIKE '%Dump Truck%'`;
    
    // Show updated counts
    console.log('\n📊 Updated type counts:');
    const counts = await sql`SELECT type, COUNT(*) as count FROM machinery GROUP BY type ORDER BY count DESC`;
    for (const row of counts) {
      console.log(`  ${row.type}: ${row.count}`);
    }
    
    console.log('\n✅ Critical issues fixed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixCriticalIssues();