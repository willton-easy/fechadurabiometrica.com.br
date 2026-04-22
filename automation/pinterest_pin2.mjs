import { chromium } from 'playwright';

const UPLOAD_DIR = 'C:/Users/willt/AppData/Local/Programs/Antigravity/pinterest_pins';
const SCREENSHOTS = 'C:/Users/willt/AppData/Local/Programs/Antigravity/pinterest_pins/screenshots';

const PIN_BATCH = [
  {
    image: 'pin_panico.png',
    title: 'Botão de Pânico Wi-Fi: Segurança Emergencial 2026',
    desc: 'Botão de pânico com notificação instantânea. Conecta via Wi-Fi e envía alertas para até 5 contatos! #botãodepânico #segurança #smarthome',
    url: 'https://fechadurabiometrica.com.br/botao-panico-wifi'
  },
  {
    image: 'pin_alexa.png',
    title: 'Fechadura com Alexa e Google Home 2026',
    desc: 'Controle sua fechadura por voz! Integração com Alexa e Google Assistant. #alexa #googlehome #fechadurasmart',
    url: 'https://fechadurabiometrica.com.br/alexa-google-home'
  }
];

async function postPin(index) {
  const pin = PIN_BATCH[index];
  console.log(`📍 Pin ${index + 2}/4: ${pin.title}...`);
  
  try {
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts ? (await browser.contexts())[0] : await browser.newContext();
    const pages = context.pages ? await context.pages() : [];
    const page = pages.length > 0 ? pages[0] : await context.newPage();
    
    await page.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    
    const fileInput = await page.$('input[type="file"]');
    if (fileInput) {
      await fileInput.setInputFiles(`${UPLOAD_DIR}/${pin.image}`);
      await page.waitForTimeout(3000);
    }
    
    const tituloInput = await page.$('input[placeholder*="ítulo"], input[name*="title"]');
    if (tituloInput) await tituloInput.fill(pin.title);
    
    const descInput = await page.$('textarea[placeholder*="escr"], textarea[name*="desc"]');
    if (descInput) await descInput.fill(pin.desc);
    
    const urlInput = await page.$('input[placeholder*="estino"], input[name*="dest"]');
    if (urlInput) await urlInput.fill(pin.url + '?utm_source=pinterest');
    
    const publicarBtn = await page.$('button:has-text("Publicar"), button:has-text("Save")');
    if (publicarBtn) await publicarBtn.click();
    
    await page.waitForTimeout(4000);
    await page.screenshot({ path: `${SCREENSHOTS}/pin_${index + 2}.png` });
    console.log(`   ✅ Pin ${index + 2} postado!`);
    await browser.close().catch(() => {});
    
  } catch (error) {
    console.error(`   ❌ Erro:`, error.message);
  }
}

const index = parseInt(process.argv[2] || '0');
postPin(index);