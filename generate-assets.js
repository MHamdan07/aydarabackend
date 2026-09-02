import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDirs = [
  path.join(__dirname, '../aydarastore/public'),
  path.join(__dirname, '../aydarastore/public/brand'),
  path.join(__dirname, '../aydarastore/src/assets/brand'),
  path.join(__dirname, '../admindashboard/public'),
  path.join(__dirname, '../admindashboard/public/brand'),
  path.join(__dirname, '../admindashboard/src/assets/brand')
];

targetDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// AY Monogram Pure Clean Vector Definition matching image geometry
const getMonogramPaths = (colorDef = "url(#goldGrad)") => `
  <!-- Outer Letter A Left Diagonal & Base -->
  <path d="M 215 80 L 265 80 L 120 400 L 60 400 Z" fill="${colorDef}"/>
  <!-- Inner A Crossbar -->
  <path d="M 125 320 L 290 320 L 320 375 L 100 375 Z" fill="${colorDef}"/>
  <!-- A Apex & Inner Slopes -->
  <path d="M 215 80 L 275 80 L 335 195 L 300 245 L 245 140 Z" fill="${colorDef}"/>
  <!-- Y Interlocking Upper Right Branch -->
  <path d="M 370 80 L 440 80 L 295 340 L 255 340 Z" fill="${colorDef}"/>
  <!-- Y Right Vertical/Diagonal Lower Leg -->
  <path d="M 320 290 L 375 290 L 375 400 L 320 400 Z" fill="${colorDef}"/>
  <!-- Interlocking Joint Ribbon -->
  <path d="M 245 140 L 300 240 L 335 240 L 275 140 Z" fill="${colorDef}"/>
`;

// Master SVG Definitions
const svgFavicon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EAD7A6"/>
      <stop offset="40%" stop-color="#C8A96B"/>
      <stop offset="75%" stop-color="#DECB9F"/>
      <stop offset="100%" stop-color="#A58341"/>
    </linearGradient>
  </defs>
  <g transform="translate(5, 10)">
    <!-- Interlocking Monogram AY -->
    <path d="M 210 60 L 268 60 L 105 420 L 45 420 Z" fill="url(#goldGrad)"/>
    <path d="M 120 330 L 305 330 L 330 385 L 95 385 Z" fill="url(#goldGrad)"/>
    <path d="M 210 60 L 272 60 L 338 185 L 300 240 L 245 135 Z" fill="url(#goldGrad)"/>
    <path d="M 375 60 L 445 60 L 290 345 L 245 345 Z" fill="url(#goldGrad)"/>
    <path d="M 330 280 L 385 280 L 385 420 L 330 420 Z" fill="url(#goldGrad)"/>
    <path d="M 245 135 L 300 235 L 340 235 L 275 135 Z" fill="url(#goldGrad)"/>
  </g>
</svg>`;

const svgFullLogoStacked = (isWhite = false) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="goldGradFull" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EAD7A6"/>
      <stop offset="40%" stop-color="#C8A96B"/>
      <stop offset="75%" stop-color="#DECB9F"/>
      <stop offset="100%" stop-color="#A58341"/>
    </linearGradient>
  </defs>
  <g transform="translate(100, 10) scale(0.8)">
    <path d="M 210 40 L 268 40 L 105 400 L 45 400 Z" fill="${isWhite ? '#FFFFFF' : 'url(#goldGradFull)'}"/>
    <path d="M 120 310 L 305 310 L 330 365 L 95 365 Z" fill="${isWhite ? '#FFFFFF' : 'url(#goldGradFull)'}"/>
    <path d="M 210 40 L 272 40 L 338 165 L 300 220 L 245 115 Z" fill="${isWhite ? '#FFFFFF' : 'url(#goldGradFull)'}"/>
    <path d="M 375 40 L 445 40 L 290 325 L 245 325 Z" fill="${isWhite ? '#FFFFFF' : 'url(#goldGradFull)'}"/>
    <path d="M 330 260 L 385 260 L 385 400 L 330 400 Z" fill="${isWhite ? '#FFFFFF' : 'url(#goldGradFull)'}"/>
    <path d="M 245 115 L 300 215 L 340 215 L 275 115 Z" fill="${isWhite ? '#FFFFFF' : 'url(#goldGradFull)'}"/>
  </g>
  <text x="300" y="375" text-anchor="middle" font-family="'Cormorant Garamond', 'Playfair Display', Georgia, serif" font-size="44" font-weight="400" letter-spacing="18" fill="${isWhite ? '#FFFFFF' : (isWhite ? '#FFFFFF' : 'url(#goldGradFull)')}">AYDARA</text>
</svg>`;

const svgFullLogoInline = (isWhite = false) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 140" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="goldGradInline" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EAD7A6"/>
      <stop offset="40%" stop-color="#C8A96B"/>
      <stop offset="75%" stop-color="#DECB9F"/>
      <stop offset="100%" stop-color="#A58341"/>
    </linearGradient>
  </defs>
  <g transform="translate(10, 10) scale(0.28)">
    <path d="M 210 40 L 268 40 L 105 400 L 45 400 Z" fill="${isWhite ? '#FFFFFF' : 'url(#goldGradInline)'}"/>
    <path d="M 120 310 L 305 310 L 330 365 L 95 365 Z" fill="${isWhite ? '#FFFFFF' : 'url(#goldGradInline)'}"/>
    <path d="M 210 40 L 272 40 L 338 165 L 300 220 L 245 115 Z" fill="${isWhite ? '#FFFFFF' : 'url(#goldGradInline)'}"/>
    <path d="M 375 40 L 445 40 L 290 325 L 245 325 Z" fill="${isWhite ? '#FFFFFF' : 'url(#goldGradInline)'}"/>
    <path d="M 330 260 L 385 260 L 385 400 L 330 400 Z" fill="${isWhite ? '#FFFFFF' : 'url(#goldGradInline)'}"/>
    <path d="M 245 115 L 300 215 L 340 215 L 275 115 Z" fill="${isWhite ? '#FFFFFF' : 'url(#goldGradInline)'}"/>
  </g>
  <text x="390" y="82" text-anchor="middle" font-family="'Cormorant Garamond', 'Playfair Display', Georgia, serif" font-size="44" font-weight="400" letter-spacing="16" fill="${isWhite ? '#FFFFFF' : 'url(#goldGradInline)'}">AYDARA</text>
</svg>`;

// Write all SVG assets
targetDirs.forEach(dir => {
  fs.writeFileSync(path.join(dir, 'favicon.svg'), svgFavicon, 'utf8');
  fs.writeFileSync(path.join(dir, 'aydara-logo.svg'), svgFullLogoStacked(false), 'utf8');
  fs.writeFileSync(path.join(dir, 'aydara-logo-gold.svg'), svgFullLogoStacked(false), 'utf8');
  fs.writeFileSync(path.join(dir, 'aydara-logo-white.svg'), svgFullLogoStacked(true), 'utf8');
  fs.writeFileSync(path.join(dir, 'aydara-logo-inline.svg'), svgFullLogoInline(false), 'utf8');
  fs.writeFileSync(path.join(dir, 'aydara-logo-inline-white.svg'), svgFullLogoInline(true), 'utf8');
});

console.log('Successfully generated 2D transparent vector assets for AYDARA!');
