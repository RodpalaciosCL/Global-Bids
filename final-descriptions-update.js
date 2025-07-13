import { neon } from '@neondatabase/serverless';
import fs from 'fs';

const sql = neon(process.env.DATABASE_URL);

// Read original data
const originalData = fs.readFileSync('complete-north-data.sql', 'utf-8');

// Extract all INSERT statements with detailed regex
function getAllMachineryData() {
  const insertRegex = /INSERT INTO machinery.*?VALUES\s*\((\d+),\s*'([^']*(?:''[^']*)*)',\s*'([^']*)',\s*'([^']*)',\s*\d+,\s*\d+,\s*(?:\d+|null),\s*\d+,\s*'([^']*)',\s*'([^']*(?:''[^']*)*)',/g;
  const allData = [];
  let match;
  
  while ((match = insertRegex.exec(originalData)) !== null) {
    allData.push({
      id: parseInt(match[1]),
      name: match[2].replace(/''/g, "'"),
      type: match[3],
      brand: match[4],
      condition: match[5],
      description: match[6].replace(/''/g, "'")
    });
  }
  
  return allData;
}

// Build comprehensive Spanish description
function buildDetailedDescription(originalDesc, name, brand) {
  let description = 'Detalles del Equipo:\n\n';
  
  const desc = originalDesc.toLowerCase();
  
  // Extract and add location
  const locationMatch = originalDesc.match(/Located In ([^,]+), Chile/i);
  if (locationMatch) {
    description += `Ubicación: ${locationMatch[1]}, Chile\n`;
  }
  
  // Extract year from name
  const yearMatch = name.match(/^(\d{4})/);
  if (yearMatch) {
    description += `Año: ${yearMatch[1]}\n`;
  }
  
  // Extract serial number
  const snMatch = originalDesc.match(/Sn[\/\s]*([A-Za-z0-9]+)/i);
  if (snMatch) {
    description += `Número de Serie: ${snMatch[1].toUpperCase()}\n`;
  }
  
  // Extract VIN
  const vinMatch = originalDesc.match(/Vin[\/\s]*([A-Za-z0-9]+)/i);
  if (vinMatch) {
    description += `VIN: ${vinMatch[1].toUpperCase()}\n`;
  }
  
  // Extract meter reading/hours
  const meterMatch = originalDesc.match(/Meter Reads (\d+(?:,\d+)*) Hours/i);
  if (meterMatch) {
    description += `Lectura del Medidor: ${meterMatch[1]} horas\n`;
  }
  
  // Extract mileage
  const milesMatch = originalDesc.match(/(\d+(?:,\d+)*)\s*(?:miles?|Miles?)/i);
  if (milesMatch) {
    const miles = parseInt(milesMatch[1].replace(/,/g, ''));
    const km = Math.round(miles * 1.60934);
    description += `Kilometraje: ${km.toLocaleString()} km\n`;
  }
  
  // Extract horsepower
  const hpMatch = originalDesc.match(/(\d+)\s*HP/i);
  if (hpMatch) {
    description += `Potencia: ${hpMatch[1]} HP\n`;
  }
  
  // Extract engine info
  if (desc.includes('diesel')) {
    description += `Motor: Motor Diesel\n`;
  }
  if (desc.includes('gas') && !desc.includes('diesel')) {
    description += `Motor: Motor a Gasolina\n`;
  }
  if (desc.includes('kubota')) {
    description += `Motor: Motor Kubota Diesel\n`;
  }
  if (desc.includes('caterpillar') && desc.includes('engine')) {
    description += `Motor: Motor Diesel Caterpillar\n`;
  }
  
  // Extract transmission
  if (desc.includes('automatic')) {
    description += `Transmisión: Automática\n`;
  }
  if (desc.includes('8 speed')) {
    description += `Transmisión: 8 velocidades\n`;
  }
  if (desc.includes('6 speed')) {
    description += `Transmisión: 6 velocidades\n`;
  }
  if (desc.includes('2 speed')) {
    description += `Transmisión: 2 velocidades\n`;
  }
  
  // Extract drivetrain
  if (desc.includes('4x4')) {
    description += `Tracción: 4x4\n`;
  }
  
  // Extract climate control
  if (desc.includes('heat/ac') || desc.includes('heat & ac')) {
    description += `Clima: Calefacción/AC\n`;
  }
  
  // Extract glass
  if (desc.includes('full glass')) {
    description += `Cabina: Vidrios completos\n`;
  }
  
  // Extract lights
  if (desc.includes('work lights')) {
    description += `Iluminación: Luces de trabajo\n`;
  }
  
  // Extract hydraulics
  if (desc.includes('aux hyd') || desc.includes('auxiliary hydraulics')) {
    description += `Hidráulicos: Hidráulicos auxiliares\n`;
  }
  
  // Extract bucket info
  if (desc.includes('digging bucket')) {
    description += `Balde: Balde de excavación\n`;
  }
  if (desc.includes('dump bucket')) {
    description += `Balde: Balde de descarga\n`;
  }
  if (desc.includes('side dump')) {
    description += `Balde: Balde de descarga lateral\n`;
  }
  
  // Extract ripper
  if (desc.includes('ripper')) {
    description += `Ripper: Ripper incluido\n`;
  }
  
  // Extract blade
  if (desc.includes('blade')) {
    description += `Hoja: Hoja incluida\n`;
  }
  
  // Extract undercarriage
  const ucMatch = originalDesc.match(/Uc At (\d+)%/i);
  if (ucMatch) {
    description += `Tren de Rodaje: UC al ${ucMatch[1]}%\n`;
  }
  
  // Extract control
  if (desc.includes('joystick')) {
    description += `Control: Control joystick\n`;
  }
  
  // Extract capacity
  const capacityMatch = originalDesc.match(/(\d+)lbs Capacity/i);
  if (capacityMatch) {
    description += `Capacidad: ${capacityMatch[1]} lbs\n`;
  }
  
  // Extract reach
  const reachMatch = originalDesc.match(/(\d+)ft Max Reach/i);
  if (reachMatch) {
    description += `Alcance: ${reachMatch[1]} pies máximo\n`;
  }
  
  // Extract tire condition
  if (desc.includes('good rubber')) {
    description += `Neumáticos: Neumáticos en buen estado\n`;
  }
  
  // Extract condition
  if (desc.includes('clean machine') || desc.includes('super clean')) {
    description += `Estado: Máquina limpia\n`;
  }
  if (desc.includes('runs and operates')) {
    description += `Operación: Funciona y opera correctamente\n`;
  }
  if (desc.includes('ready for work')) {
    description += `Disponibilidad: Lista para trabajar\n`;
  }
  
  // Extract stabilizers
  if (desc.includes('dual stabilizers')) {
    description += `Estabilizadores: Estabilizadores duales\n`;
  }
  
  // Extract fire system
  if (desc.includes('fire suppressant')) {
    description += `Seguridad: Sistema supresor de incendios\n`;
  }
  
  // Extract additional features for vehicles
  if (desc.includes('leather')) {
    description += `Interior: Asientos de cuero\n`;
  }
  if (desc.includes('navigation')) {
    description += `Tecnología: Sistema de navegación\n`;
  }
  if (desc.includes('heated seats')) {
    description += `Comodidad: Asientos calefaccionados\n`;
  }
  if (desc.includes('blind spot')) {
    description += `Seguridad: Monitor de puntos ciegos\n`;
  }
  
  return description.trim();
}

async function updateAllDescriptions() {
  try {
    console.log('🔧 Actualizando TODAS las descripciones con información completa...');
    
    // Get original data
    const originalData = getAllMachineryData();
    console.log(`📋 Encontrados ${originalData.length} elementos en archivo original`);
    
    // Get current database data
    const currentData = await sql`SELECT id, name, description FROM machinery ORDER BY id`;
    console.log(`💾 ${currentData.length} elementos en base de datos`);
    
    let updated = 0;
    
    for (const current of currentData) {
      // Find corresponding original data
      const original = originalData.find(item => item.id === current.id);
      
      if (original) {
        // Build comprehensive description
        const newDescription = buildDetailedDescription(original.description, original.name, original.brand);
        
        // Always update to ensure consistency
        await sql`UPDATE machinery SET description = ${newDescription} WHERE id = ${current.id}`;
        updated++;
        
        console.log(`✅ Actualizado ID ${current.id}: ${current.name.substring(0, 50)}...`);
      } else {
        console.log(`⚠️  No encontrado en original: ID ${current.id}`);
      }
    }
    
    console.log(`\n🎉 ¡Completado! ${updated} descripciones actualizadas con información completa.`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

updateAllDescriptions();