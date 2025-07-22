import { db } from './server/db.js';
import { machinery } from './shared/schema.js';

async function debugImages() {
  console.log('🔍 Debugging image URLs...');
  
  try {
    const result = await db.select({
      id: machinery.id,
      name: machinery.name,
      image: machinery.image,
      gallery: machinery.gallery
    }).from(machinery).limit(3);
    
    console.log('📋 Sample machinery records:');
    result.forEach(item => {
      console.log(`\n--- ID: ${item.id} ---`);
      console.log(`Name: ${item.name}`);
      console.log(`Image: ${item.image}`);
      console.log(`Gallery (first 2): ${item.gallery?.slice(0, 2).join(', ')}`);
    });
  } catch (error) {
    console.error('❌ Error:', error);
  }
  
  process.exit(0);
}

debugImages();
