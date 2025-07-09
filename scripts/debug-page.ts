import axios from 'axios';
import * as cheerio from 'cheerio';

async function debugPage() {
  try {
    console.log('🔍 Inspeccionando HTML de la página...');
    
    const response = await axios.get('https://northcountry.auctiontechs.com/auction-detail/174912699568418f53a4cac');
    const $ = cheerio.load(response.data);
    
    // Buscar diferentes patrones de enlaces
    console.log('\n📋 Buscando diferentes selectores:');
    
    console.log(`Enlaces con "item-detail": ${$('a[href*="item-detail"]').length}`);
    console.log(`Enlaces con "lot": ${$('a[href*="lot"]').length}`);
    console.log(`Enlaces href="/": ${$('a[href^="/"]').length}`);
    console.log(`Todas las imágenes: ${$('img').length}`);
    
    // Mostrar algunos enlaces encontrados
    console.log('\n🔗 Primeros 10 enlaces encontrados:');
    $('a').slice(0, 10).each((i, element) => {
      const href = $(element).attr('href');
      const text = $(element).text().trim();
      if (href) {
        console.log(`${i+1}. ${href} - "${text.slice(0, 50)}..."`);
      }
    });

    // Buscar elementos que contengan números de lote
    console.log('\n🔢 Elementos con patrones de números:');
    $('*').each((i, element) => {
      const text = $(element).text();
      if (text.match(/lot\s*\d+/i) || text.match(/item\s*\d+/i)) {
        console.log(`Texto: "${text.slice(0, 100)}..."`);
        const tagName = element.tagName;
        const className = $(element).attr('class');
        console.log(`Tag: ${tagName}, Class: ${className}`);
        console.log('---');
      }
    });

  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'Error desconocido');
  }
}

debugPage();