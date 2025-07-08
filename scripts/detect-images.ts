// Script to detect how many images each lot has
async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

async function detectImagesForLot(lotNumber: number): Promise<string[]> {
  const images: string[] = [];
  let imageNumber = 1;
  
  while (imageNumber <= 20) { // Max 20 images per lot
    const imageUrl = `https://auctiontechupload.s3.amazonaws.com/216/auction/2187/${lotNumber}_${imageNumber}.jpg`;
    const exists = await checkImageExists(imageUrl);
    
    if (exists) {
      images.push(imageUrl);
      console.log(`✅ Lot ${lotNumber}: Image ${imageNumber} exists`);
    } else {
      console.log(`❌ Lot ${lotNumber}: Image ${imageNumber} not found, stopping`);
      break;
    }
    
    imageNumber++;
  }
  
  return images;
}

async function scanAllLots() {
  console.log('🔍 Scanning all lot images...');
  
  const lotData: { [key: number]: string[] } = {};
  
  // Check lots 1-20 to start
  for (let lot = 1; lot <= 20; lot++) {
    console.log(`\n📦 Checking Lot ${lot}...`);
    const images = await detectImagesForLot(lot);
    
    if (images.length > 0) {
      lotData[lot] = images;
      console.log(`📸 Lot ${lot}: Found ${images.length} images`);
    } else {
      console.log(`⚠️ Lot ${lot}: No images found`);
    }
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n📊 SCAN RESULTS:');
  Object.entries(lotData).forEach(([lot, images]) => {
    console.log(`Lot ${lot}: ${images.length} images`);
  });
  
  return lotData;
}

// Test specific lots we know exist
async function testKnownLots() {
  console.log('🧪 Testing known lots...');
  
  const knownLots = [1, 7, 12, 77];
  
  for (const lot of knownLots) {
    console.log(`\n🔍 Testing Lot ${lot}:`);
    const images = await detectImagesForLot(lot);
    console.log(`Found ${images.length} images:`, images);
  }
}

testKnownLots().catch(console.error);