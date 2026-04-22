import { chromium } from 'playwright';

const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';

const ARTICLE_MAP = [
  { img: 'hero_baby_security_2026.png', title: '🔒 Fechadura Digital para Quarto de Bebê', desc: 'Guia completo 2026. Smart home integrado! #fechadura #bebê #smarthome', url: '/guia-bebe-seguro' },
  { img: 'botao_panico_wifi_1776310024810.png', title: '🚨 Botão de Pânico Wi-Fi', desc: 'Notificação instantânea. Conecta via Wi-Fi! #botãodepânico #segurança', url: '/botao-panico-wifi' },
  { img: 'lock_alexa_google_1776310010162.png', title: '🎙️ Fechadura com Alexa e Google', desc: 'Controle por voz! #alexa #googlehome #fechadurasmart', url: '/alexa-google-home' },
  { img: 'camera_pet_furbo_tapo_1776309786642.png', title: '🐶 Câmera Pet Wi-Fi Tapo', desc: 'Monitore seu pet anywhere! #câmerapet #tapo', url: '/camera-pet-furbo' },
  { img: 'design_interiores_lock_1776309996605.png', title: '🏠 Design Interiores Lock', desc: 'Elegância e segurança! #design #interiores', url: '/design-interiores' },
  { img: 'lock_embutir_sobrepor_1776309982470.png', title: '🔧 Fechadura Embutir vs Sobrepor', desc: 'Qual escolher? Guia 2026! #fechadura', url: '/fechadura-embutir-sobrepor' },
  { img: 'rastreador_veicular_gps_1776309816476.png', title: '📍 Rastreador Veicular GPS', desc: 'Localize seu veículo em tempo real! #gps', url: '/rastreador-gps' },
  { img: 'detector_fumaca_wifi_1776309799967.png', title: '🔥 Detector Fumaça Wi-Fi', desc: 'Alerta instantâneo no celular! #fumaça', url: '/detector-fumaca-wifi' },
  { img: 'sirene_wifi_alarme_2026_1776309771751.png', title: '🔔 Sirene Wi-Fi Alarme', desc: 'Proteção completa! #alarme #smarthome', url: '/sirene-wifi-alarme' },
  { img: 'fechadura_fr101_vs_ydf40_1776309112451.png', title: '⚔️ FR101 vs YDF40', desc: 'Comparativo completo! #intelbras #yale', url: '/fr101-vs-ydf40' }
];

async function postSingle(index) {
  const data = ARTICLE_MAP[index];
  console.log(`📍 Pin ${index+1}: ${data.title}...`);
  
  try {
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts ? (await browser.contexts())[0] : await browser.newContext();
    const pages = context.pages ? await context.pages() : [];
    const page = pages[0] || await context.newPage();
    
    await page.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    
    // Upload - using exact source path
    const fileInput = await page.$('input[type="file"]');
    if (fileInput) {
      await fileInput.setInputFiles(`${SOURCE_DIR}/${data.img}`);
      await page.waitForTimeout(3000);
    }
    
    // Preencher - simplified selectors
    const inputs = await page.$$('input');
    const textareas = await page.$$('textarea');
    
    if (inputs.length >= 1) await inputs[0].fill(data.title);
    if (textareas.length >= 1) await textareas[0].fill(data.desc + ' https://fechadurabiometrica.com.br' + data.url);
    
    // URL
    await page.keyboard.press('Tab');
    const urlInputs = await page.$$('input');
    if(urlInputs.length >= 3) await urlInputs[2].fill('https://fechadurabiometrica.com.br' + data.url + '?utm_source=pinterest');
    
    // Publicar
    await page.click('button:has-text("Publicar")');
    await page.waitForTimeout(3500);
    
    console.log(`   ✅ OK`);
    await browser.close().catch(() => {});
    return true;
    
  } catch (e) {
    console.log(`   ❌ ` + e.message);
    return false;
  }
}

const idx = parseInt(process.argv[2] || '0');
postSingle(idx);