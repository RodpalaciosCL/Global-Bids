import puppeteer from 'puppeteer';
import axios from 'axios';
import pLimit from 'p-limit';
import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Configuración
const AUCTION_URL = 'https://northcountry.auctiontechs.com/auction-detail/174912699568418f53a4cac';
const CONCURRENCY = 5; // Máximo 5 lotes a la vez

// Verifica si una imagen existe (status 200) sin descargarla completa
async function verificarImagen(url: string): Promise<boolean> {
  try {
    const res = await axios.head(url, { timeout: 5000 });
    return res.status === 200;
  } catch {
    return false;
  }
}

interface LoteData {
  id: string;
  title: string;
  description: string;
  images: string[];
  url: string;
}

async function main() {
  console.log('🚀 Iniciando carga bulk de lotes de página 1...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    console.log('📥 Accediendo a la página de la subasta...');
    await page.goto(AUCTION_URL, { waitUntil: 'networkidle2' });
    await page.waitForSelector('a[href*="/item-detail"]');

    // Scroll para cargar imágenes por lazy load
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await new Promise(res => setTimeout(res, 500));
    }

    const lotes = await page.$$eval('a[href*="/item-detail"]', links => {
      const seen = new Set();
      return links.map(link => {
        const href = link.getAttribute('href');
        const id = href?.split('/item-detail/')[1]?.split('?')[0];
        const title = link.innerText.trim();
        const image = link.querySelector('img')?.src || '';
        if (id && !seen.has(id)) {
          seen.add(id);
          return { id, url: `https://northcountry.auctiontechs.com${href}`, title, image };
        }
        return null;
      }).filter(Boolean);
    });

    console.log(`✅ ${lotes.length} lotes detectados en la página 1.\n`);

    const limit = pLimit(CONCURRENCY);

    const resultados = await Promise.allSettled(
      lotes.map(lote => limit(async () => {
        const lotePage = await browser.newPage();
        
        try {
          await lotePage.goto(lote.url, { waitUntil: 'domcontentloaded' });
          await lotePage.waitForTimeout(600);

          // Extraer imágenes del carrusel
          const images = await lotePage.$$eval('.slick-track img', imgs =>
            imgs.map(i => i.src).filter(Boolean)
          ).catch(() => []);

          // Verificar imagen principal
          const imagenValida = images.length > 0 && await verificarImagen(images[0]);

          const description = await lotePage.$eval('.item-detail-body', el => el.innerText).catch(() => '');
          const title = await lotePage.$eval('.item-detail-title', el => el.innerText).catch(() => lote.title || 'Sin título');

          if (imagenValida) {
            console.log(`✅ Lote ${lote.id} OK - "${title.slice(0, 50)}..."`);
            return {
              id: lote.id,
              title: title.trim(),
              description: description.trim(),
              images,
              url: lote.url
            } as LoteData;
          } else {
            console.warn(`⛔ Lote ${lote.id} descartado - imagen inválida`);
            return null;
          }
        } finally {
          await lotePage.close();
        }
      }))
    );

    const lotesValidos = resultados
      .filter(r => r.status === 'fulfilled' && r.value !== null)
      .map(r => r.value) as LoteData[];

    console.log(`\n🎯 Lotes válidos procesados: ${lotesValidos.length}`);

    // Limpiar base de datos actual
    console.log('🧹 Limpiando base de datos...');
    await db.delete(machinery);

    // Insertar lotes válidos en la base de datos
    console.log('💾 Guardando lotes en base de datos...');
    
    for (const lote of lotesValidos) {
      try {
        await db.insert(machinery).values({
          lotNumber: parseInt(lote.id),
          title: lote.title,
          description: lote.description,
          imageCount: lote.images.length,
          category: 'Heavy Machinery',
          condition: 'Used',
          location: 'North Country',
          year: 2020 // Default year
        });
        
        console.log(`💾 Guardado: Lote ${lote.id} con ${lote.images.length} imágenes`);
      } catch (error) {
        console.error(`❌ Error guardando lote ${lote.id}:`, error);
      }
    }

    console.log(`\n🎉 Proceso completado: ${lotesValidos.length} lotes cargados en la base de datos`);
    
    // Mostrar resumen
    console.table(lotesValidos.slice(0, 10).map(l => ({
      id: l.id,
      fotos: l.images.length,
      title: l.title.slice(0, 40) + '...'
    })));

  } finally {
    await browser.close();
  }
}

main().catch(console.error);