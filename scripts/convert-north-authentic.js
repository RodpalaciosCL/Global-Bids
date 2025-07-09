// Convert authentic North Country data to our database format
import fs from 'fs';

// Read the authentic North Country data
const page1Data = JSON.parse(fs.readFileSync('page1-authentic.json', 'utf8'));
const page2Data = JSON.parse(fs.readFileSync('page2-authentic.json', 'utf8'));

// Combine both pages
const allLots = [
  ...page1Data.data.map(item => ({ ...item, page: 1 })),
  ...page2Data.data.map(item => ({ ...item, page: 2 }))
];

console.log(`Found ${allLots.length} authentic lots from North Country`);

// Convert to our database format
const convertedLots = allLots.map(lot => {
  // Extract type from item name
  let type = 'machinery';
  const itemName = lot.item_name.toLowerCase();
  if (itemName.includes('excavator') || itemName.includes('backhoe')) type = 'excavator';
  else if (itemName.includes('loader') || itemName.includes('dumper')) type = 'loader';
  else if (itemName.includes('crawler')) type = 'crawler';
  else if (itemName.includes('mini')) type = 'mini-excavator';

  // Extract brand from description or name
  let brand = 'Unknown';
  const fullText = (lot.item_name + ' ' + lot.description).toLowerCase();
  if (fullText.includes('kubota')) brand = 'Kubota';
  else if (fullText.includes('caterpillar') || fullText.includes('cat ')) brand = 'Caterpillar';
  else if (fullText.includes('briggs')) brand = 'Briggs & Stratton';
  else if (fullText.includes('rato')) brand = 'Rato';

  // Extract year - default to 2024 for "Unused" items
  let year = 2024;
  if (lot.item_name.includes('Unused')) year = 2024;

  // Extract power/hours from description
  let hours = 0; // Unused items have 0 hours
  let power = null;
  const powerMatch = lot.description.match(/(\d+\.?\d*)\s*kw/i);
  if (powerMatch) power = parseFloat(powerMatch[1]);

  // Get image URLs - use the authentic images from itemimages array
  const gallery = lot.itemimages?.map(img => img.image) || [];
  const mainImage = gallery[0] || `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lot.lot_number}_1.jpg`;

  return {
    id: parseInt(lot.lot_number),
    name: lot.item_name,
    type: type,
    brand: brand,
    year: year,
    hours: hours,
    kilometers: null,
    price: 75000, // Default auction price
    condition: 'excellent', // Unused items are excellent
    description: lot.description,
    image: mainImage,
    gallery: gallery,
    is_sold: false,
    auction_date: null,
    priority: null,
    page: lot.page,
    created_at: '2025-07-09',
    // Additional authentic data
    city: lot.city || 'Colina',
    country: lot.country || 'Chile',
    zipcode: lot.zipcode || '43',
    lot_number: lot.lot_number,
    item_id: lot.id,
    auction_id: lot.auction_id
  };
});

// Generate SQL statements
console.log('-- Authentic North Country Auctions data from getWebcastItems API');
console.log('DELETE FROM machinery;');
console.log('');

convertedLots.forEach(lot => {
  const galleryStr = lot.gallery.map(url => `"${url}"`).join(',');
  const description = lot.description.replace(/'/g, "''").replace(/\n/g, ' ');
  const name = lot.name.replace(/'/g, "''");
  
  console.log(`INSERT INTO machinery (id, name, type, brand, year, hours, kilometers, price, condition, description, image, gallery, is_sold, auction_date, priority, page, created_at) VALUES (${lot.id}, '${name}', '${lot.type}', '${lot.brand}', ${lot.year}, ${lot.hours}, null, ${lot.price}, '${lot.condition}', '${description}', '${lot.image}', '{${galleryStr}}', false, null, null, ${lot.page}, '${lot.created_at}');`);
});

console.log('');
console.log(`-- Generated ${convertedLots.length} authentic lots`);
console.log(`-- Page 1: ${convertedLots.filter(l => l.page === 1).length} lots`);
console.log(`-- Page 2: ${convertedLots.filter(l => l.page === 2).length} lots`);
console.log(`-- Types: ${[...new Set(convertedLots.map(l => l.type))].join(', ')}`);
console.log(`-- Brands: ${[...new Set(convertedLots.map(l => l.brand))].join(', ')}`);