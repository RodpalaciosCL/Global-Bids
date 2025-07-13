import { readFileSync } from 'fs';

// Cargar todos los nombres de equipos de la base de datos
const sqlData = readFileSync('complete-north-data.sql', 'utf8');
const insertLines = sqlData.split('\n').filter(line => line.includes('INSERT INTO machinery'));

const equipment = [];
insertLines.forEach(line => {
  const match = line.match(/VALUES \(\d+, '([^']+)'/);
  if (match) {
    equipment.push(match[1]);
  }
});

// Función de clasificación mejorada
function classifyEquipment(name) {
  const lowerName = name.toLowerCase();
  
  // Excavadoras
  if (lowerName.includes('excavator') || lowerName.includes('backhoe')) {
    return 'excavadora';
  }
  
  // Cargadores
  if (lowerName.includes('wheel loader') || lowerName.includes('loader')) {
    return 'cargador';
  }
  
  // Bulldozers
  if (lowerName.includes('dozer')) {
    return 'bulldozer';
  }
  
  // Motoniveladora
  if (lowerName.includes('grader')) {
    return 'motoniveladora';
  }
  
  // Camiones (incluyendo dump trucks, water trucks, etc.)
  if (lowerName.includes('truck') || lowerName.includes('camión')) {
    if (lowerName.includes('dump') || lowerName.includes('haul') || lowerName.includes('rock')) {
      return 'camion-tolva';
    }
    return 'camion';
  }
  
  // Rodillos
  if (lowerName.includes('roller')) {
    return 'rodillo';
  }
  
  // Autobuses
  if (lowerName.includes('bus')) {
    return 'autobus';
  }
  
  // Telehandlers
  if (lowerName.includes('telehandler')) {
    return 'manipulador-telescopico';
  }
  
  // Grúas
  if (lowerName.includes('crane')) {
    return 'grua';
  }
  
  // Perforadoras
  if (lowerName.includes('drill')) {
    return 'perforadora';
  }
  
  // Compresores
  if (lowerName.includes('compressor')) {
    return 'compresor';
  }
  
  // Tractores
  if (lowerName.includes('tractor')) {
    return 'tractor';
  }
  
  // Skidsteer
  if (lowerName.includes('skidsteer')) {
    return 'minicargador';
  }
  
  // Remolques
  if (lowerName.includes('trailer')) {
    return 'remolque';
  }
  
  // Golf Carts
  if (lowerName.includes('golf cart')) {
    return 'carrito-golf';
  }
  
  // Vehículos (Cherokee, Explorer, etc.)
  if (lowerName.includes('explorer') || lowerName.includes('cherokee') || 
      lowerName.includes('peugeot') || lowerName.includes('armored car')) {
    return 'vehiculo';
  }
  
  // Mezcladores de concreto
  if (lowerName.includes('concrete mixer') || lowerName.includes('mixer')) {
    return 'mezcladora';
  }
  
  // Repuestos y accesorios
  if (lowerName.includes('ripper tooth') || lowerName.includes('rake attachment') || 
      lowerName.includes('toilet') || lowerName.includes('body')) {
    return 'repuesto';
  }
  
  return 'maquinaria-general';
}

// Clasificar todos los equipos y contar
const categories = {};
equipment.forEach(name => {
  const category = classifyEquipment(name);
  categories[category] = (categories[category] || 0) + 1;
});

// Mostrar resultados ordenados por cantidad
console.log('=== CLASIFICACIÓN COMPLETA DE EQUIPOS ===');
Object.entries(categories)
  .sort((a, b) => b[1] - a[1])
  .forEach(([category, count]) => {
    console.log(`${category}: ${count} equipos`);
  });

console.log(`\nTotal equipos clasificados: ${equipment.length}`);
