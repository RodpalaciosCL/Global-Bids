import { neon } from '@neondatabase/serverless';
import fs from 'fs';

const sql = neon(process.env.DATABASE_URL);

// Read original data from complete-north-data.sql
const originalData = fs.readFileSync('complete-north-data.sql', 'utf-8');

// Function to extract detailed info from original descriptions
function extractDetailedInfo(originalDesc, name) {
  const details = {
    location: '',
    serialNumber: '',
    meterReading: '',
    horsepower: '',
    engine: '',
    transmission: '',
    travel: '',
    hydraulics: '',
    features: [],
    condition: '',
    operatingHours: '',
    bucket: '',
    ripper: '',
    blade: '',
    workLights: '',
    ac: '',
    glass: '',
    undercarriage: '',
    joystick: '',
    tires: '',
    capacity: '',
    reach: '',
    drivetrain: '',
    year: '',
    mileage: '',
    fuel: '',
    interior: '',
    safety: '',
    dimensions: '',
    weight: ''
  };

  const desc = originalDesc.toLowerCase();
  
  // Extract location
  const locationMatch = originalDesc.match(/Located In ([^,]+), Chile/i);
  if (locationMatch) {
    details.location = locationMatch[1];
  }
  
  // Extract serial number
  const snMatch = originalDesc.match(/Sn[\/\s]*([A-Za-z0-9]+)/i);
  if (snMatch) {
    details.serialNumber = snMatch[1].toUpperCase();
  }
  
  // Extract meter reading (hours)
  const meterMatch = originalDesc.match(/Meter Reads (\d+(?:,\d+)*) Hours/i);
  if (meterMatch) {
    details.meterReading = meterMatch[1];
    details.operatingHours = meterMatch[1];
  }
  
  // Extract horsepower
  const hpMatch = originalDesc.match(/(\d+) HP/i);
  if (hpMatch) {
    details.horsepower = hpMatch[1];
  }
  
  // Extract engine info
  if (desc.includes('diesel powered') || desc.includes('diesel')) {
    details.engine = 'Motor Diesel';
  }
  if (desc.includes('kubota')) {
    details.engine = 'Motor Kubota Diesel';
  }
  if (desc.includes('briggs')) {
    details.engine = 'Motor Briggs & Stratton';
  }
  
  // Extract transmission
  if (desc.includes('8 speed')) {
    details.transmission = '8 velocidades';
  } else if (desc.includes('2 speed')) {
    details.transmission = '2 velocidades';
  } else if (desc.includes('automatic')) {
    details.transmission = 'Automática';
  }
  
  // Extract features
  if (desc.includes('heat/ac') || desc.includes('heat & ac')) {
    details.ac = 'Calefacción/AC';
  }
  if (desc.includes('full glass')) {
    details.glass = 'Vidrios completos';
  }
  if (desc.includes('work lights')) {
    details.workLights = 'Luces de trabajo';
  }
  if (desc.includes('joystick')) {
    details.joystick = 'Control joystick';
  }
  if (desc.includes('4x4')) {
    details.drivetrain = '4x4';
  }
  if (desc.includes('aux hyd') || desc.includes('auxiliary hydraulics')) {
    details.hydraulics = 'Hidráulicos auxiliares';
  }
  if (desc.includes('quick coupler')) {
    details.features.push('Acoplador rápido');
  }
  if (desc.includes('thumb')) {
    details.features.push('Pulgar hidráulico');
  }
  if (desc.includes('ripper')) {
    details.ripper = 'Ripper incluido';
  }
  if (desc.includes('blade')) {
    details.blade = 'Hoja incluida';
  }
  
  // Extract condition
  if (desc.includes('super clean') || desc.includes('clean machine')) {
    details.condition = 'Máquina muy limpia';
  }
  if (desc.includes('good rubber')) {
    details.tires = 'Neumáticos en buen estado';
  }
  if (desc.includes('runs and operates')) {
    details.condition = 'Funciona y opera correctamente';
  }
  
  // Extract bucket info
  if (desc.includes('digging bucket')) {
    details.bucket = 'Balde de excavación';
  }
  if (desc.includes('dump bucket')) {
    details.bucket = 'Balde de descarga';
  }
  if (desc.includes('side dump')) {
    details.bucket = 'Balde de descarga lateral';
  }
  
  // Extract undercarriage condition
  const ucMatch = originalDesc.match(/Uc At (\d+)%/i);
  if (ucMatch) {
    details.undercarriage = `Tren de rodaje al ${ucMatch[1]}%`;
  }
  
  // Extract capacity info
  const capacityMatch = originalDesc.match(/(\d+)lbs Capacity/i);
  if (capacityMatch) {
    details.capacity = `${capacityMatch[1]} lbs de capacidad`;
  }
  
  // Extract reach info
  const reachMatch = originalDesc.match(/(\d+)ft Max Reach/i);
  if (reachMatch) {
    details.reach = `${reachMatch[1]} pies de alcance máximo`;
  }
  
  return details;
}

// Function to build comprehensive description
function buildComprehensiveDescription(details, originalDesc, name) {
  let description = 'Detalles del Equipo:\n\n';
  
  // Add location
  if (details.location) {
    description += `Ubicación: ${details.location}, Chile\n`;
  }
  
  // Extract year from name
  const yearMatch = name.match(/^(\d{4})/);
  if (yearMatch) {
    description += `Año: ${yearMatch[1]}\n`;
  }
  
  // Add serial number
  if (details.serialNumber) {
    description += `Número de Serie: ${details.serialNumber}\n`;
  }
  
  // Add meter reading
  if (details.meterReading) {
    description += `Lectura del Medidor: ${details.meterReading} horas\n`;
  }
  
  // Add horsepower
  if (details.horsepower) {
    description += `Potencia: ${details.horsepower} HP\n`;
  }
  
  // Add engine
  if (details.engine) {
    description += `Motor: ${details.engine}\n`;
  }
  
  // Add transmission
  if (details.transmission) {
    description += `Transmisión: ${details.transmission}\n`;
  }
  
  // Add drivetrain
  if (details.drivetrain) {
    description += `Tracción: ${details.drivetrain}\n`;
  }
  
  // Add AC/Heat
  if (details.ac) {
    description += `Clima: ${details.ac}\n`;
  }
  
  // Add glass
  if (details.glass) {
    description += `Cabina: ${details.glass}\n`;
  }
  
  // Add work lights
  if (details.workLights) {
    description += `Iluminación: ${details.workLights}\n`;
  }
  
  // Add hydraulics
  if (details.hydraulics) {
    description += `Hidráulicos: ${details.hydraulics}\n`;
  }
  
  // Add bucket
  if (details.bucket) {
    description += `Balde: ${details.bucket}\n`;
  }
  
  // Add ripper
  if (details.ripper) {
    description += `Ripper: ${details.ripper}\n`;
  }
  
  // Add blade
  if (details.blade) {
    description += `Hoja: ${details.blade}\n`;
  }
  
  // Add undercarriage
  if (details.undercarriage) {
    description += `Tren de Rodaje: ${details.undercarriage}\n`;
  }
  
  // Add joystick
  if (details.joystick) {
    description += `Control: ${details.joystick}\n`;
  }
  
  // Add capacity
  if (details.capacity) {
    description += `Capacidad: ${details.capacity}\n`;
  }
  
  // Add reach
  if (details.reach) {
    description += `Alcance: ${details.reach}\n`;
  }
  
  // Add tires
  if (details.tires) {
    description += `Neumáticos: ${details.tires}\n`;
  }
  
  // Add features
  if (details.features.length > 0) {
    description += `Características: ${details.features.join(', ')}\n`;
  }
  
  // Add condition
  if (details.condition) {
    description += `Estado: ${details.condition}\n`;
  }
  
  // Add remaining info from original description if not already included
  const lowerOriginal = originalDesc.toLowerCase();
  if (lowerOriginal.includes('ready for work')) {
    description += `Disponibilidad: Lista para trabajar\n`;
  }
  if (lowerOriginal.includes('fleet maintained')) {
    description += `Mantenimiento: Mantenida por flota\n`;
  }
  
  return description.trim();
}

async function updateAllDescriptions() {
  try {
    console.log('🔧 Actualizando todas las descripciones...');
    
    // Get all machinery items
    const allMachinery = await sql`SELECT id, name, description FROM machinery ORDER BY id`;
    
    console.log(`📋 Procesando ${allMachinery.length} elementos...`);
    
    let updated = 0;
    
    for (const item of allMachinery) {
      // Find original data in SQL file
      const regex = new RegExp(`INSERT INTO machinery.*?VALUES \\(${item.id},.*?'([^']*(?:''[^']*)*)'`, 'i');
      const match = originalData.match(regex);
      
      if (match) {
        const originalDesc = match[1].replace(/''/g, "'");
        
        // Extract detailed info
        const details = extractDetailedInfo(originalDesc, item.name);
        
        // Build comprehensive description
        const newDescription = buildComprehensiveDescription(details, originalDesc, item.name);
        
        // Update only if we have substantial improvements
        if (newDescription.length > item.description.length || 
            !item.description.includes('Detalles del Equipo:')) {
          
          await sql`UPDATE machinery SET description = ${newDescription} WHERE id = ${item.id}`;
          updated++;
          
          console.log(`✅ Actualizado ID ${item.id}: ${item.name.substring(0, 50)}...`);
        }
      }
    }
    
    console.log(`\n🎉 Actualización completa! ${updated} descripciones mejoradas.`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

updateAllDescriptions();