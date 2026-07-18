import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CITIES_CONFIG, getPathByRegionId } from '../src/data/slugs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://ganda-massage.com';

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  CITIES_CONFIG.forEach((city) => {
    city.regions.forEach((region) => {
      const regionPath = getPathByRegionId(region.regionId);
      if (regionPath === "/") return; // already added above
      xml += `  <url>
    <loc>${BASE_URL}${regionPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });
  });

  xml += `</urlset>\n`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');

  console.log(`Sitemap successfully generated at ${sitemapPath}`);
}

generateSitemap();
