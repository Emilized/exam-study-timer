import sharp from 'sharp';
import fs from 'fs';

const iconSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <linearGradient id="ring2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#4f46e5" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Transparent background for icons if needed, but let's make it rounded rect so it's transparent outside -->
  <rect width="512" height="512" rx="114" fill="url(#bg)" />
  <circle cx="256" cy="256" r="160" fill="none" stroke="url(#ring2)" stroke-width="24" opacity="0.3" />
  <path d="M 256 96 A 160 160 0 0 1 416 256" fill="none" stroke="url(#ring)" stroke-width="24" stroke-linecap="round" filter="url(#glow)" />
  <circle cx="256" cy="256" r="100" fill="#1e293b" />
  <path d="M 256 186 L 256 256 L 300 300" fill="none" stroke="#fcd34d" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
</svg>
`;

const promoSvg = `
<svg width="1024" height="500" viewBox="0 0 1024 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgPromo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
     <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <linearGradient id="ring2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#4f46e5" />
    </linearGradient>
    <filter id="glowPromo" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="1024" height="500" fill="url(#bgPromo)" />
  
  <g transform="translate(250, 250) scale(0.6)">
    <circle cx="0" cy="0" r="160" fill="none" stroke="url(#ring2)" stroke-width="24" opacity="0.3" />
    <path d="M 0 -160 A 160 160 0 0 1 160 0" fill="none" stroke="url(#ring)" stroke-width="24" stroke-linecap="round" filter="url(#glowPromo)" />
    <circle cx="0" cy="0" r="100" fill="#1e293b" />
    <path d="M 0 -70 L 0 0 L 44 44" fill="none" stroke="#fcd34d" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
  </g>
  
  <text x="450" y="240" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="56" fill="#f8fafc">Simple Focus Timer</text>
  <text x="450" y="295" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="28" fill="#cbd5e1">Boost productivity, stay focused.</text>
</svg>
`;

const promo16x9Svg = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <rect width="1920" height="1080" fill="#0f172a" />
  <defs>
     <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <linearGradient id="ring2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#4f46e5" />
    </linearGradient>
    <filter id="glowPromo" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <g transform="translate(480, 540) scale(1.0)">
    <circle cx="0" cy="0" r="160" fill="none" stroke="url(#ring2)" stroke-width="24" opacity="0.3" />
    <path d="M 0 -160 A 160 160 0 0 1 160 0" fill="none" stroke="url(#ring)" stroke-width="24" stroke-linecap="round" filter="url(#glowPromo)" />
    <circle cx="0" cy="0" r="100" fill="#1e293b" />
    <path d="M 0 -70 L 0 0 L 44 44" fill="none" stroke="#fcd34d" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
  </g>
  
  <text x="750" y="520" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="100" fill="#f8fafc">Simple Focus Timer</text>
  <text x="750" y="620" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="48" fill="#cbd5e1">Deep, distraction-free work.</text>
</svg>
`;

const logoSvg = `
<svg width="640" height="260" viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
  <defs>
     <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <linearGradient id="ring2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#4f46e5" />
    </linearGradient>
    <filter id="glowPromo" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <g transform="translate(130, 130) scale(0.6)">
    <circle cx="0" cy="0" r="160" fill="none" stroke="url(#ring2)" stroke-width="24" opacity="0.3" />
    <path d="M 0 -160 A 160 160 0 0 1 160 0" fill="none" stroke="url(#ring)" stroke-width="24" stroke-linecap="round" filter="url(#glowPromo)" />
    <circle cx="0" cy="0" r="100" fill="#1e293b" />
    <path d="M 0 -70 L 0 0 L 44 44" fill="none" stroke="#fcd34d" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
  </g>
  
  <text x="250" y="125" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="44" fill="#f8fafc">Simple Focus</text>
  <text x="250" y="175" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="32" fill="#cbd5e1">Timer</text>
</svg>
`;

const banner1920x720Svg = `
<svg width="1920" height="720" viewBox="0 0 1920 720" xmlns="http://www.w3.org/2000/svg">
  <rect width="1920" height="720" fill="#1e1b4b" />
  <circle cx="1500" cy="200" r="800" fill="#4f46e5" opacity="0.2" filter="blur(100px)" />
  <circle cx="200" cy="600" r="600" fill="#f59e0b" opacity="0.1" filter="blur(100px)" />
</svg>
`;

const screenshot1 = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <rect width="1920" height="1080" fill="#0f172a" />
  <circle cx="1700" cy="100" r="1000" fill="#4f46e5" opacity="0.2" filter="blur(80px)" />
  <text x="250" y="470" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="80" fill="#f8fafc">Crush your goals.</text>
  <text x="250" y="550" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="40" fill="#cbd5e1">Distraction-free environment.</text>
</svg>
`;

const screenshot2 = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <rect width="1920" height="1080" fill="#0f172a" />
  <circle cx="200" cy="900" r="800" fill="#1e1b4b" opacity="0.6" filter="blur(60px)" />
  <text x="250" y="470" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="80" fill="#f8fafc">Stay on schedule.</text>
  <text x="250" y="550" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="40" fill="#cbd5e1">Custom study and break intervals.</text>
</svg>
`;

const screenshot3 = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <rect width="1920" height="1080" fill="#0f172a" />
  <circle cx="960" cy="540" r="1200" fill="#f59e0b" opacity="0.1" filter="blur(100px)" />
  <text x="250" y="470" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="80" fill="#f8fafc">Track your progress.</text>
  <text x="250" y="550" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="40" fill="#cbd5e1">See your stats visualised instantly.</text>
</svg>
`;

async function generate() {
  try {
    // Basic Assets
    fs.writeFileSync('public/icon-512.svg', iconSvg);
    fs.writeFileSync('public/promo-1024.svg', promoSvg);

    console.log("Generating 512x512 icon...");
    await sharp(Buffer.from(iconSvg)).resize(512, 512).png().toFile('public/icon-512.png');

    console.log("Generating 114x114 icon...");
    await sharp(Buffer.from(iconSvg)).resize(114, 114).png().toFile('public/icon-114.png');

    console.log("Generating 1024x500 promo image...");
    await sharp(Buffer.from(promoSvg)).resize(1024, 500).png().toFile('public/promo-1024.png');

    // FireTV Assets
    console.log("Generating FireTV App Icon (1280x720)...");
    await sharp(Buffer.from(promo16x9Svg))
      .resize(1280, 720)
      .flatten({ background: '#0f172a' }) // Ensures no transparency
      .png()
      .toFile('public/firetv-app-icon.png');
      
    console.log("Generating FireTV Background Image (1920x1080)...");
    await sharp(Buffer.from(promo16x9Svg))
      .resize(1920, 1080)
      .flatten({ background: '#0f172a' })
      .png()
      .toFile('public/firetv-bg.png');

    console.log("Generating FireTV Featured Logo (640x260)...");
    await sharp(Buffer.from(logoSvg))
      .resize(640, 260)
      .png()
      .toFile('public/firetv-logo.png');

    console.log("Generating FireTV Featured Background (1920x720)...");
    await sharp(Buffer.from(banner1920x720Svg))
      .resize(1920, 720)
      .flatten({ background: '#1e1b4b' })
      .png()
      .toFile('public/firetv-featured-bg.png');

    // Store Screenshots (Composited with screenshot-desktop.png if it exists)
    let desktopAppScreenshot;
    try {
      desktopAppScreenshot = await sharp('public/screenshot-desktop.png')
        .resize({ width: 700, height: 900, fit: 'contain' }) // mock size 
        .toBuffer();
    } catch (e) {
      console.log("No screenshot-desktop.png found, skipping compositing");
    }

    console.log("Generating Store Screenshots (1920x1080)...");
    
    // Screenshot 1
    let s1 = sharp(Buffer.from(screenshot1));
    if (desktopAppScreenshot) s1 = s1.composite([{ input: desktopAppScreenshot, left: 1000, top: 90 }]);
    await s1.png().toFile('public/screenshot-1.png');

    // Screenshot 2
    let s2 = sharp(Buffer.from(screenshot2));
    if (desktopAppScreenshot) s2 = s2.composite([{ input: desktopAppScreenshot, left: 1000, top: 90 }]);
    await s2.png().toFile('public/screenshot-2.png');

    // Screenshot 3
    let s3 = sharp(Buffer.from(screenshot3));
    if (desktopAppScreenshot) s3 = s3.composite([{ input: desktopAppScreenshot, left: 1000, top: 90 }]);
    await s3.png().toFile('public/screenshot-3.png');

    console.log("Assets generated successfully!");
  } catch (error) {
    console.error("Error generating assets:", error);
  }
}

generate();
