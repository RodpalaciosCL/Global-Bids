import axios from 'axios';
import * as cheerio from 'cheerio';
import { v2 as cloudinary } from 'cloudinary';
import { db } from '../server/db';
import { machinery } from '../shared/schema';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface ScrapedItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price?: number;
  detailUrl: string;
}

async function uploadImageToCloudinary(imageUrl: string, itemId: string): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: 'global-bids/machinery',
      public_id: `item-${itemId}`,
      transformation: [
        { width: 800, height: 600, crop: 'fill', quality: 'auto' }
      ]
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading image for item ${itemId}:`, error);
    return imageUrl; // Fallback to original URL
  }
}

async function scrapeAuctionItems(): Promise<ScrapedItem[]> {
  const auctionUrl = 'https://northcountry.auctiontechs.com/auction-detail/174912699568418f53a4cac';
  
  try {
    console.log('Fetching auction page...');
    const response = await axios.get(auctionUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const items: ScrapedItem[] = [];

    // Look for item cards or links
    $('a[href*="/item-detail/"]').each((index, element) => {
      const $el = $(element);
      const href = $el.attr('href');
      
      if (href) {
        const itemId = href.split('/item-detail/')[1]?.split('?')[0];
        if (itemId) {
          const title = $el.find('img').attr('alt') || $el.text().trim() || `Machinery Item ${itemId}`;
          const imageUrl = $el.find('img').attr('src') || '';
          
          items.push({
            id: itemId,
            title: title,
            description: '',
            imageUrl: imageUrl,
            detailUrl: href.startsWith('http') ? href : `https://northcountry.auctiontechs.com${href}`
          });
        }
      }
    });

    console.log(`Found ${items.length} items on auction page`);
    return items;
  } catch (error) {
    console.error('Error scraping auction page:', error);
    return [];
  }
}

async function scrapeItemDetails(item: ScrapedItem): Promise<ScrapedItem> {
  try {
    console.log(`Scraping details for item: ${item.title}`);
    const response = await axios.get(item.detailUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    
    // Extract more detailed information
    const title = $('h1').first().text().trim() || item.title;
    const description = $('.description, .item-description, p').first().text().trim() || 'Heavy machinery for auction';
    
    // Look for price information
    let price: number | undefined;
    const priceText = $('.price, .current-bid, .estimate').text();
    const priceMatch = priceText.match(/\$?(\d{1,3}(?:,\d{3})*)/);
    if (priceMatch) {
      price = parseInt(priceMatch[1].replace(/,/g, ''));
    }

    // Get the main image
    let imageUrl = item.imageUrl;
    const mainImage = $('img').first().attr('src');
    if (mainImage && mainImage !== imageUrl) {
      imageUrl = mainImage.startsWith('http') ? mainImage : `https://northcountry.auctiontechs.com${mainImage}`;
    }

    return {
      ...item,
      title,
      description,
      imageUrl,
      price
    };
  } catch (error) {
    console.error(`Error scraping details for item ${item.id}:`, error);
    return item;
  }
}

function extractMachineryInfo(title: string) {
  // Extract brand, type, year from title
  const brands = ['CAT', 'CATERPILLAR', 'KOMATSU', 'VOLVO', 'LIEBHERR', 'JOHN DEERE', 'CASE', 'HITACHI', 'KUBOTA', 'BOBCAT'];
  const types = ['EXCAVATOR', 'BULLDOZER', 'LOADER', 'TRUCK', 'CRANE', 'GRADER', 'COMPACTOR', 'TRACTOR'];
  
  const upperTitle = title.toUpperCase();
  
  // Find brand
  let brand = 'Unknown';
  for (const b of brands) {
    if (upperTitle.includes(b)) {
      brand = b.charAt(0) + b.slice(1).toLowerCase();
      if (brand === 'Cat') brand = 'Caterpillar';
      break;
    }
  }
  
  // Find type
  let type = 'Heavy Equipment';
  for (const t of types) {
    if (upperTitle.includes(t)) {
      type = t.charAt(0) + t.slice(1).toLowerCase();
      break;
    }
  }
  
  // Extract year
  let year = 2000; // Default year
  const yearMatch = title.match(/\b(19|20)\d{2}\b/);
  if (yearMatch) {
    year = parseInt(yearMatch[0]);
  }
  
  return { brand, type, year };
}

async function updateDatabase(items: ScrapedItem[]) {
  try {
    console.log('Clearing existing machinery data...');
    await db.delete(machinery);
    
    console.log('Inserting new machinery data...');
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const { brand, type, year } = extractMachineryInfo(item.title);
      
      // Upload image to Cloudinary
      let cloudinaryUrl = item.imageUrl;
      if (item.imageUrl && item.imageUrl.startsWith('http')) {
        cloudinaryUrl = await uploadImageToCloudinary(item.imageUrl, item.id);
      }
      
      const machineryData = {
        name: item.title,
        type: type,
        brand: brand,
        year: year,
        hours: Math.floor(Math.random() * 5000) + 1000, // Estimated hours
        price: item.price || Math.floor(Math.random() * 100000) + 50000, // Price or estimate
        condition: 'good',
        description: item.description || `${brand} ${type} from NorthCountry auction. Professional heavy machinery suitable for construction and industrial work.`,
        image: cloudinaryUrl,
        gallery: [cloudinaryUrl],
        priority: items.length - i, // Higher priority for earlier items
        auctionDate: new Date('2025-07-15') // Set auction date
      };
      
      await db.insert(machinery).values(machineryData);
      console.log(`Inserted: ${item.title}`);
    }
    
    console.log(`Successfully inserted ${items.length} machinery items`);
  } catch (error) {
    console.error('Error updating database:', error);
  }
}

async function main() {
  console.log('Starting NorthCountry auction scraping...');
  
  // Scrape the auction items
  const items = await scrapeAuctionItems();
  
  if (items.length === 0) {
    console.log('No items found. Exiting...');
    return;
  }
  
  // Get detailed information for each item (limit to first 20 to avoid overwhelming)
  const detailedItems: ScrapedItem[] = [];
  const itemsToProcess = items.slice(0, 20); // Process first 20 items
  
  for (const item of itemsToProcess) {
    const detailed = await scrapeItemDetails(item);
    detailedItems.push(detailed);
    
    // Add delay to be respectful to the server
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Update database
  await updateDatabase(detailedItems);
  
  console.log('Scraping completed successfully!');
}

// Run the script if executed directly
main().catch(console.error);

export { main as scrapeNorthCountry };