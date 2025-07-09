const puppeteer = require('puppeteer');
const axios = require('axios');
const pLimit = require('p-limit');

// Limit concurrent requests
const limit = pLimit(5);

async function scrapeAuctionData() {
  console.log('Starting auction data scraping...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  
  const lots = [];
  
  try {
    // Get all lot numbers from 114 to 201 (80+ lots total)
    for (let lotNum = 114; lotNum <= 201; lotNum++) {
      await limit(async () => {
        try {
          console.log(`Scraping lot ${lotNum}...`);
          
          // Check if images exist first
          const imageUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lotNum}_1.jpg`;
          try {
            const imageResponse = await axios.head(imageUrl, { timeout: 5000 });
            if (imageResponse.status !== 200) {
              console.log(`Skipping lot ${lotNum} - no image found`);
              return;
            }
          } catch (imageError) {
            console.log(`Skipping lot ${lotNum} - image error:`, imageError.message);
            return;
          }
          
          // Try to access the lot detail page
          const lotUrl = `https://northcountry.auctiontechs.com/item-detail/${lotNum}?auction_id=174912699568418f53a4cac`;
          
          await page.goto(lotUrl, { waitUntil: 'networkidle2', timeout: 30000 });
          
          // Extract lot information
          const lotData = await page.evaluate(() => {
            const title = document.querySelector('h1')?.textContent?.trim() || 
                         document.querySelector('.lot-title')?.textContent?.trim() ||
                         document.querySelector('[class*="title"]')?.textContent?.trim();
            
            const description = document.querySelector('.description')?.textContent?.trim() ||
                              document.querySelector('[class*="description"]')?.textContent?.trim() ||
                              document.querySelector('p')?.textContent?.trim();
            
            const specs = [];
            document.querySelectorAll('tr, .spec-row, [class*="spec"]').forEach(row => {
              const cells = row.querySelectorAll('td, .spec-value, span');
              if (cells.length >= 2) {
                const key = cells[0].textContent?.trim();
                const value = cells[1].textContent?.trim();
                if (key && value) {
                  specs.push({ key, value });
                }
              }
            });
            
            return {
              title,
              description,
              specs,
              url: window.location.href
            };
          });
          
          if (lotData.title) {
            // Count images for this lot
            let imageCount = 0;
            for (let imgNum = 1; imgNum <= 20; imgNum++) {
              try {
                const imgUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lotNum}_${imgNum}.jpg`;
                const imgResponse = await axios.head(imgUrl, { timeout: 3000 });
                if (imgResponse.status === 200) {
                  imageCount++;
                } else {
                  break;
                }
              } catch {
                break;
              }
            }
            
            // Create gallery array
            const gallery = [];
            for (let i = 1; i <= imageCount; i++) {
              gallery.push(`https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lotNum}_${i}.jpg`);
            }
            
            // Determine equipment type and brand from title
            const title = lotData.title.toLowerCase();
            let type = 'excavator';
            let brand = 'Caterpillar';
            let year = 2020;
            let hours = 2000;
            let condition = 'excellent';
            
            if (title.includes('excavator')) type = 'excavator';
            else if (title.includes('loader')) type = 'loader';
            else if (title.includes('grader')) type = 'grader';
            else if (title.includes('dozer')) type = 'dozer';
            else if (title.includes('truck')) type = 'truck';
            
            if (title.includes('caterpillar') || title.includes('cat')) brand = 'Caterpillar';
            else if (title.includes('komatsu')) brand = 'Komatsu';
            else if (title.includes('john deere')) brand = 'John Deere';
            else if (title.includes('hyundai')) brand = 'Hyundai';
            
            // Extract year if present
            const yearMatch = title.match(/(?:19|20)\d{2}/);
            if (yearMatch) year = parseInt(yearMatch[0]);
            
            // Extract hours if present
            const hoursMatch = lotData.description?.match(/(\d+)\s*hrs|(\d+)\s*hours/i);
            if (hoursMatch) hours = parseInt(hoursMatch[1] || hoursMatch[2]);
            
            const lot = {
              id: lotNum,
              name: lotData.title,
              type,
              brand,
              year,
              hours,
              kilometers: null,
              price: 75000, // Default price since we don't show pricing
              condition,
              description: lotData.description || `${lotData.title} - Authentic auction item from International Global Bids And Prelco Auctions.`,
              image: gallery[0],
              gallery,
              isSold: false,
              auctionDate: null,
              priority: null,
              page: lotNum <= 157 ? 1 : 2, // Distribute 44 lots per page (114-157 = page 1, 158-201 = page 2)
              createdAt: new Date().toISOString().split('T')[0]
            };
            
            lots.push(lot);
            console.log(`✓ Scraped lot ${lotNum}: ${lotData.title}`);
          } else {
            console.log(`⚠ No title found for lot ${lotNum}`);
          }
          
        } catch (error) {
          console.log(`✗ Error scraping lot ${lotNum}:`, error.message);
        }
      });
    }
    
    console.log(`\nScraping complete! Found ${lots.length} lots.`);
    
    // Save to file
    const fs = require('fs');
    fs.writeFileSync('./scraped-lots.json', JSON.stringify(lots, null, 2));
    
    console.log('Data saved to scraped-lots.json');
    
  } catch (error) {
    console.error('Scraping failed:', error);
  } finally {
    await browser.close();
  }
  
  return lots;
}

// Run the scraper
scrapeAuctionData().catch(console.error);