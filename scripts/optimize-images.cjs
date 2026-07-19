const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create public/images directory if it doesn't exist
const outputDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read initialMenu.js
const menuFilePath = path.join(__dirname, '../src/data/initialMenu.js');
let menuContent = fs.readFileSync(menuFilePath, 'utf8');

// Match all Unsplash / HTTP image URLs
const urlRegex = /https:\/\/[^'"]+/g;
const matches = Array.from(new Set(menuContent.match(urlRegex) || []));

console.log(`Found ${matches.length} unique remote image URLs to process.`);

async function processImages() {
  let count = 0;
  for (const url of matches) {
    count++;
    const filename = `img_${count}_${Date.now()}.webp`;
    const outputPath = path.join(outputDir, filename);
    const webpPublicPath = `/images/${filename}`;

    try {
      console.log(`[${count}/${matches.length}] Downloading ${url.slice(0, 60)}...`);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Convert to WebP & compress at 80% quality, max width 600px
      await sharp(buffer)
        .resize({ width: 600, withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 })
        .toFile(outputPath);

      console.log(`  └─ Saved & compressed as ${webpPublicPath}`);

      // Replace URL in menuContent
      menuContent = menuContent.split(url).join(webpPublicPath);
    } catch (err) {
      console.error(`  └─ Error processing ${url}:`, err.message);
    }
  }

  // Write updated initialMenu.js
  fs.writeFileSync(menuFilePath, menuContent, 'utf8');
  console.log('🎉 Successfully optimized all menu images to WebP!');
}

processImages();
