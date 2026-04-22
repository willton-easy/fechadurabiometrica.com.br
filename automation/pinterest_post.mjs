import { chromium } from '/c/Users/willt/AppData/Roaming/npm/node_modules/playwright/index.mjs';

console.log('🤖 Pinterest Autopost via Playwright...');

const browser = await chromium.launch({ 
  headless: false,
  args: ['--disable-blink-features=AutomationControlled']
});

const page = await browser.newPage();

try {
  console.log('📍 Navegando ao Pinterest...');
  await page.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.screenshot({ path: 'pinterest_initial.png', fullPage: true });
  console.log('✅ Página carregada! Verifique o screenshot.');
} catch (error) {
  console.error('❌ Erro:', error.message);
} finally {
  await browser.close();
}