import sharp from 'sharp';

async function generate() {
  try {
    console.log("Resizing icon to 114x114...");
    await sharp('public/icon-512.png')
      .resize(114, 114)
      .toFile('public/icon-114.png');
    
    console.log("Generating screenshots...");
    // Let's just resize the desktop screenshot to 1280x720, 1920x1080 and 1280x800 for Amazon
    await sharp('public/screenshot-desktop.png')
      .resize(1280, 720, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 1 } })
      .toFile('public/screenshot-1.png');
      
    await sharp('public/screenshot-desktop.png')
      .resize(1920, 1080, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 1 } })
      .toFile('public/screenshot-2.png');
      
    await sharp('public/screenshot-desktop.png')
      .resize(1280, 800, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 1 } })
      .toFile('public/screenshot-3.png');

    console.log("Done generating Amazon assets!");
  } catch (error) {
    console.error(error);
  }
}

generate();
