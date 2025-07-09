import axios from 'axios';
import * as cheerio from 'cheerio';
import pLimit from 'p-limit';
import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Configuración
const AUCTION_URL = 'https://northcountry.auctiontechs.com/auction-detail/174912699568418f53a4cac';
const CONCURRENCY = 3; // Máximo 3 lotes a la vez para evitar límites

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
  console.log('🚀 Iniciando carga bulk simple de lotes...\n');

  try {
    // Obtener la página principal
    console.log('📥 Obteniendo página de subasta...');
    const response = await axios.get(AUCTION_URL);
    const $ = cheerio.load(response.data);
    
    // Extraer enlaces de lotes
    const lotes: Array<{id: string, url: string, title: string}> = [];
    const seen = new Set();
    
    $('a[href*="/item-detail"]').each((_, element) => {
      const href = $(element).attr('href');
      if (href) {
        const id = href.split('/item-detail/')[1]?.split('?')[0];
        const title = $(element).text().trim();
        if (id && !seen.has(id)) {
          seen.add(id);
          lotes.push({
            id,
            url: `https://northcountry.auctiontechs.com${href}`,
            title
          });
        }
      }
    });

    console.log(`✅ ${lotes.length} lotes detectados en la página.\n`);

    const limit = pLimit(CONCURRENCY);

    const resultados = await Promise.allSettled(
      lotes.slice(0, 40).map(lote => limit(async () => {
        try {
          console.log(`🔍 Procesando Lote ${lote.id}...`);
          
          const loteResponse = await axios.get(lote.url);
          const lote$ = cheerio.load(loteResponse.data);
          
          // Extraer título real
          const title = lote$('.item-detail-title').text().trim() || lote.title;
          
          // Extraer descripción
          const description = lote$('.item-detail-body').text().trim();
          
          // Extraer imágenes del carrusel
          const images: string[] = [];
          lote$('.slick-track img').each((_, img) => {
            const src = lote$(img).attr('src');
            if (src) {
              images.push(src);
            }
          });

          // Verificar al menos la primera imagen
          const imagenValida = images.length > 0 && await verificarImagen(images[0]);

          if (imagenValida && title && description) {
            console.log(`✅ Lote ${lote.id} OK - "${title.slice(0, 50)}..."`);
            return {
              id: lote.id,
              title: title.trim(),
              description: description.trim(),
              images,
              url: lote.url
            } as LoteData;
          } else {
            console.warn(`⛔ Lote ${lote.id} descartado - datos insuficientes`);
            return null;
          }
        } catch (error) {
          console.error(`❌ Error procesando lote ${lote.id}:`, error instanceof Error ? error.message : 'Error desconocido');
          return null;
        }
      }))
    );

    const lotesValidos = resultados
      .filter(r => r.status === 'fulfilled' && r.value !== null)
      .map(r => r.value) as LoteData[];

    console.log(`\n🎯 Lotes válidos procesados: ${lotesValidos.length}`);

    if (lotesValidos.length === 0) {
      console.log('❌ No se encontraron lotes válidos');
      return;
    }

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
        console.error(`❌ Error guardando lote ${lote.id}:`, error instanceof Error ? error.message : 'Error desconocido');
      }
    }

    console.log(`\n🎉 Proceso completado: ${lotesValidos.length} lotes cargados en la base de datos`);
    
    // Mostrar resumen
    console.table(lotesValidos.slice(0, 10).map(l => ({
      id: l.id,
      fotos: l.images.length,
      title: l.title.slice(0, 40) + '...'
    })));

  } catch (error) {
    console.error('❌ Error en el proceso principal:', error instanceof Error ? error.message : 'Error desconocido');
  }
}

main().catch(console.error);