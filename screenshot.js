import puppeteer from 'puppeteer';
import { mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = resolve(__dirname, 'temporary_screenshots');
const FILE = resolve(__dirname, 'index.html');
const URL = `file://${FILE}`;

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'mobile',  width: 390,  height: 844 },
];

const SECTIONS = ['hero', 'how', 'why', 'product', 'waitlist'];

if (!existsSync(SCREENSHOT_DIR)) mkdirSync(SCREENSHOT_DIR);

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

const browser = await puppeteer.launch({ headless: true });

for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height });
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  });
  await new Promise(r => setTimeout(r, 600));

  // Full page
  await page.screenshot({
    path: `${SCREENSHOT_DIR}/${timestamp}_${vp.name}_full.png`,
    fullPage: true,
  });

  // Individual sections
  for (const id of SECTIONS) {
    const el = await page.$(`#${id}`);
    if (el) {
      await el.screenshot({
        path: `${SCREENSHOT_DIR}/${timestamp}_${vp.name}_${id}.png`,
      });
    }
  }

  await page.close();
}

await browser.close();
console.log(`Screenshots saved to temporary_screenshots/ (${timestamp})`);
