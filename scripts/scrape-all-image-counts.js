import puppeteer from 'puppeteer';

const AUCTION_URL = 'https://northcountry.auctiontechs.com/auction-detail/174912699568418f53a4cac';
const AUCTION_ID = '174912699568418f53a4cac';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(AUCTION_URL, { waitUntil: 'networkidle2' });

  console.log('🌀 Obteniendo todos los lotes de la página 1...');
  await page.waitForSelector('a[href*="item-detail"]');

  // Scroll por si hay lazy loading
  for (let i = 0; i < 6; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await new Promise(resolve => setTimeout(resolve, 600));
  }

  // Obtener todos los IDs de lotes únicos
  const lotes = await page.$$eval('a[href*="/item-detail"]', links => {
    const seen = new Set();
    return links.map(link => {
      const href = link.getAttribute('href');
      const id = href?.split('/item-detail/')[1]?.split('?')[0];
      if (id && !seen.has(id)) {
        seen.add(id);
        return id;
      }
      return null;
    }).filter(Boolean);
  });

  console.log(`🔍 Se encontraron ${lotes.length} lotes.\n`);

  const resultados = [];

  for (const id of lotes) {
    const loteURL = `https://northcountry.auctiontechs.com/item-detail/${id}?auction_id=${AUCTION_ID}`;
    await page.goto(loteURL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Contar las imágenes del carrusel
    let count = await page.$$eval('.slick-track img', imgs => imgs.length).catch(() => 0);

    // Opción secundaria: leer contador visual "1 / 22"
    try {
      const textoContador = await page.$eval('.slick-counter', el => el.innerText);
      const matches = textoContador.match(/\/\s*(\d+)/);
      if (matches) {
        count = parseInt(matches[1], 10);
      }
    } catch (e) {
      // Si no hay contador, usar el conteo de imágenes
    }

    const title = await page.$eval('.item-detail-title', el => el.innerText).catch(() => `Lote ${id}`);
    
    // Extract lot number from title
    const lotMatch = title.match(/Lot\s*(\d+)/i);
    const lotNumber = lotMatch ? parseInt(lotMatch[1]) : null;

    resultados.push({ 
      originalId: id,
      lotNumber: lotNumber, 
      title: title.trim(), 
      fotos: count 
    });
    
    console.log(`✅ ${title} → ${count} fotos`);
  }

  console.log('\n📊 Tabla resumen:\n');
  console.table(resultados);

  // Generate TypeScript code to update database
  console.log('\n🔧 Código para actualizar base de datos:');
  console.log('const REAL_IMAGE_COUNTS = {');
  resultados.forEach(result => {
    if (result.lotNumber && result.fotos > 0) {
      console.log(`  ${result.lotNumber}: ${result.fotos}, // ${result.title}`);
    }
  });
  console.log('};');

  await browser.close();
})();