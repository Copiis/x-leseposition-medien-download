#!/usr/bin/env node
/**
 * Füllt GreasyFork Name + „Zusätzliche Informationen“ über Chrome CDP (Port 9222).
 * Nutzung: node greasyfork-cdp-fill.mjs de|en [--publish]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lang = (process.argv[2] || 'de').toLowerCase();
const publish = process.argv.includes('--publish');

const files = {
  de: 'greasyfork-info-de.html',
  en: 'greasyfork-info-en.html',
};
const urls = {
  de: 'https://greasyfork.org/de/scripts/517767-twitter-x-timeline-sync/edit',
  en: 'https://greasyfork.org/en/scripts/517767-twitter-x-timeline-sync/edit',
};
const titles = {
  de: 'X Leseposition & Medien-Download',
  en: 'X Reading Position & Media Download',
};

const infoFile = path.join(__dirname, files[lang]);
if (!files[lang] || !fs.existsSync(infoFile)) {
  console.error(`❌ Unbekannte Sprache oder Datei fehlt: ${lang}`);
  process.exit(1);
}

const html = fs.readFileSync(infoFile, 'utf8')
  .replace(/^<!--[\s\S]*?-->\s*/gm, '')
  .trim();

const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
const page = (await browser.pages()).find((p) => !p.url().startsWith('chrome-extension://')) || await browser.newPage();

console.log(`→ ${urls[lang]}`);
await page.goto(urls[lang], { waitUntil: 'networkidle2', timeout: 60000 });

const title = await page.title();
if (/sign in|anmelden|404/i.test(title) || page.url().includes('sign_in')) {
  console.log('⚠️  Nicht eingeloggt — als Copiis anmelden, dann erneut starten.');
  await browser.disconnect();
  process.exit(2);
}

async function fillField(selectors, value) {
  for (const sel of selectors) {
    const el = await page.$(sel);
    if (!el) continue;
    await el.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await el.evaluate((node, v) => {
      node.value = v;
      node.dispatchEvent(new Event('input', { bubbles: true }));
      node.dispatchEvent(new Event('change', { bubbles: true }));
    }, value);
    return true;
  }
  return false;
}

const nameOk = await fillField(
  ['input#script_name', 'input[name="script[name]"]', 'input[name*="name"]'],
  titles[lang],
);
const infoOk = await fillField(
  ['textarea#script_additional_info', 'textarea[name="script[additional_info]"]', 'textarea[name*="additional"]'],
  html,
);

if (!nameOk) console.log('⚠️  Namensfeld nicht gefunden — Titel manuell setzen:', titles[lang]);
else console.log(`✅ Skriptname: ${titles[lang]}`);

if (!infoOk) {
  console.log('⚠️  Infotext-Feld nicht gefunden:', page.url());
  await browser.disconnect();
  process.exit(3);
}
console.log(`✅ ${lang.toUpperCase()}-Infotext eingefügt (${html.length} Zeichen)`);

if (publish) {
  const btn = await page.$('input[type="submit"][name="commit"], button[type="submit"], input[type="submit"]');
  if (btn) {
    await btn.click();
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
    console.log('✅ Veröffentlicht:', page.url());
  } else {
    console.log('⚠️  Submit-Button nicht gefunden — bitte manuell veröffentlichen.');
  }
} else {
  console.log('   Jetzt „Veröffentlichen“ / „Post“ klicken (oder --publish).');
}

await browser.disconnect();