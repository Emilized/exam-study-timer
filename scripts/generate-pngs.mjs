import sharp from 'sharp';

async function main() {
  await sharp('public/icon-192.svg').png().toFile('public/icon-192.png');
  await sharp('public/icon-512.svg').png().toFile('public/icon-512.png');
  
  // create dummy screenshots
  await sharp({
    create: {
      width: 1280,
      height: 720,
      channels: 4,
      background: { r: 75, g: 0, b: 130, alpha: 1 }
    }
  }).png().toFile('public/screenshot-desktop.png');

  await sharp({
    create: {
      width: 750,
      height: 1334,
      channels: 4,
      background: { r: 75, g: 0, b: 130, alpha: 1 }
    }
  }).png().toFile('public/screenshot-mobile.png');

  console.log('PNGs created successfully');
}

main().catch(console.error);
