// Script to analyze all machinery and generate correct category counts
const { db } = require('./server/db.js');

function getCorrectType(name, description) {
  const nameAndDesc = (name + ' ' + description).toLowerCase();
  const titleWords = name.toLowerCase();
  
  // ABSOLUTE PRIORITY: Title keywords are FINAL authority
  
  // Bus detection FIRST - highest priority for autobuses
  if (titleWords.includes('autobús') || titleWords.includes('autobus') || titleWords.includes(' bus')) {
    return 'autobus';
  }
  // Tolva detection - specific Spanish keywords and dump trailers
  else if (titleWords.includes('tolva') || titleWords.includes('dump trailer') || 
      titleWords.includes('tri-axle') || titleWords.includes('dumper')) {
    return 'tolva';
  }
  // Dump Trucks (different from tolvas - these are the truck chassis)
  else if (titleWords.includes('dump truck') || titleWords.includes('haul truck') || 
      titleWords.includes('rock truck') || titleWords.includes('articulated haul truck') ||
      titleWords.includes('rigid rock truck')) {
    return 'camion-tolva';
  }
  // Golf Carts
  else if (titleWords.includes('golf cart')) {
    return 'carrito-golf';
  }
  // Excavators - HIGHEST PRIORITY  
  else if (titleWords.includes('excavator')) {
    return 'excavadora';
  }
  // Loaders
  else if (titleWords.includes('loader') || titleWords.includes('wheel loader') || 
      titleWords.includes('track loader')) {
    return 'cargador';
  }
  // Motor Graders  
  else if (titleWords.includes('motor grader') || titleWords.includes('grader')) {
    return 'motoniveladora';
  }
  // Bulldozers
  else if (titleWords.includes('bulldozer') || titleWords.includes('dozer')) {
    return 'bulldozer';
  }
  // Cranes
  else if (titleWords.includes('crane') || titleWords.includes('grúa')) {
    return 'grua';
  }
  // Concrete Mixers
  else if (titleWords.includes('concrete mixer')) {
    return 'mezcladora';
  }
  // Rollers
  else if (titleWords.includes('roller')) {
    return 'rodillo';
  }
  // Telehandlers
  else if (titleWords.includes('telehandler')) {
    return 'manipulador-telescopico';
  }
  // Compressors
  else if (titleWords.includes('compressor') || titleWords.includes('generator')) {
    return 'compresor';
  }
  // Vehicles - Cherokee, Explorer, Pickup trucks, etc.
  else if (titleWords.includes('cherokee') || titleWords.includes('explorer') || 
      titleWords.includes('peugeot') || titleWords.includes('landtrek') ||
      titleWords.includes('pickup') || titleWords.includes('armored car')) {
    return 'camioneta';
  }
  // Tractors (agricultural/construction - not sleeper tractors)
  else if (titleWords.includes('tractor') && !titleWords.includes('sleeper')) {
    return 'tractor';
  }
  // Trailers (not dump trailers - those are tolvas)
  else if (titleWords.includes('trailer') && !titleWords.includes('dump')) {
    return 'remolque';
  }
  // Generic trucks (catch-all for other truck types)
  else if (titleWords.includes('truck') || titleWords.includes('camión') ||
      titleWords.includes('sleeper tractor')) {
    return 'camion';
  }
  // Parts and attachments
  else if (nameAndDesc.includes('ripper tooth') || nameAndDesc.includes('rake attachment') ||
      titleWords.includes('attachment') || titleWords.includes('tooth') || titleWords.includes('rake')) {
    return 'repuesto';
  }
  // Fallback to machinery for unidentified equipment
  else {
    return 'maquinaria-general';
  }
}

async function analyzeMachinery() {
  try {
    const machinery = await db.select().from(require('./shared/schema.js').machinery);
    
    const categories = {};
    
    machinery.forEach(item => {
      const correctType = getCorrectType(item.name, item.description);
      categories[correctType] = (categories[correctType] || 0) + 1;
    });
    
    // Sort by count descending
    const sortedCategories = Object.entries(categories)
      .sort(([,a], [,b]) => b - a)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    
    console.log('=== CATEGORÍAS REALES CON CONTEOS ===');
    Object.entries(sortedCategories).forEach(([type, count]) => {
      console.log(`${type}: ${count}`);
    });
    
    console.log('\n=== TOTAL ===');
    console.log(`Total items: ${machinery.length}`);
    
    return sortedCategories;
    
  } catch (error) {
    console.error('Error analyzing machinery:', error);
  }
}

// Run the analysis if this file is executed directly
if (require.main === module) {
  analyzeMachinery().then(() => process.exit(0));
}

module.exports = { analyzeMachinery, getCorrectType };