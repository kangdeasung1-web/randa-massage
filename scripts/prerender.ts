import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CITIES_CONFIG, getPathByRegionId } from '../src/data/slugs.js';
import { getPageById } from '../src/data/regions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p: string) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('../dist/index.html'), 'utf-8');

// The server bundle that was built by vite
const { render } = await import(toAbsolute('../dist/server/entry-server.js'));

async function buildPages() {
  const routes = ['/'];
  CITIES_CONFIG.forEach((city) => {
    city.regions.forEach((region) => {
      const regionPath = getPathByRegionId(region.regionId);
      if (regionPath !== '/' && !routes.includes(regionPath)) {
        routes.push(regionPath);
      }
    });
  });

  for (const url of routes) {
    let regionId = '시흥출장마사지';
    if (url !== '/') {
      const parts = url.split('/').filter(Boolean);
      const slug = parts[1] || '';
      for (const city of CITIES_CONFIG) {
        const found = city.regions.find(r => r.slug === slug);
        if (found) {
          regionId = found.regionId;
          break;
        }
      }
    }
    
    const pageData = getPageById(regionId);
    
    const appHtml = await render(url);

    // Remove framer-motion SSR styles that hide content initially
    let cleanAppHtml = appHtml.replace(/style="([^"]*)"/g, (match, styles) => {
      let cleaned = styles
        .replace(/(^|;)opacity:\s*0;?/g, '$1')
        .replace(/(^|;)transform:\s*(scale|translate|none)[^;]*;?/g, '$1')
        .replace(/;+/g, ';')
        .replace(/^;/, '')
        .replace(/;$/, '');
      
      if (cleaned.trim() === '') {
        return ''; // completely remove the style attribute
      }
      return `style="${cleaned}"`;
    });

    let html = template.replace('<!--app-html-->', cleanAppHtml);

    if (pageData) {
      const origin = 'https://ganda-massage.com';
      const canonicalUrl = `${origin}${url}`;
      
      const headTags = `
    <title>${pageData.title}</title>
    <meta name="description" content="${pageData.description}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${pageData.title}" />
    <meta property="og:description" content="${pageData.description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageData.title}" />
    <meta name="twitter:description" content="${pageData.description}" />
      `.trim();

      html = html.replace(
        '<title>간다출장마사지 - 시흥출장마사지 프리미엄 방문케어</title>',
        headTags
      );
    }

    const filePath = toAbsolute(`../dist${url === '/' ? '/index.html' : `${url}/index.html`}`);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, html);
    console.log(`Pre-rendered ${filePath}`);
  }
}

buildPages().catch(e => {
  console.error(e);
  process.exit(1);
});
