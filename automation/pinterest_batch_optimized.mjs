import { chromium } from 'playwright';

const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';
const UPLOAD_DIR = 'C:/Users/willt/AppData/Local/Programs/Antigravity/pinterest_pins';

const ARTICLES = {
  'hero_baby_security_2026.png': { title: 'Fechadura Digital para Quarto de Bebê', desc: 'Segurança total para proteger seu bebê. Smart home integrado! #bebê #segurança', url: '/guia-bebe-seguro' },
  'botao_panico_wifi_1776310024810.png': { title: 'Botão de Pânico Wi-Fi', desc: 'Notificação instantânea para até 5 contatos. #botãodepânico #segurança', url: '/botao-panico-wifi' },
  'lock_alexa_google_1776310010162.png': { title: 'Fechadura com Alexa e Google', desc: 'Controle por voz. Integração smart home. #alexa #google', url: '/alexa-google-home' },
  'camera_pet_furbo_tapo_1776309786642.png': { title: 'Câmera Pet Wi-Fi Tapo', desc: 'Monitore seu pet anywhere. #câmerapet #tapo', url: '/camera-pet-furbo' },
  'design_interiores_lock_1776309996605.png': { title: 'Design de Interiores Smart Lock', desc: 'Elegância e segurança. #design #interiores', url: '/design-interiores' },
  'lock_embutir_sobrepor_1776309982470.png': { title: 'Fechadura Embutir vs Sobrepor', desc: 'Qual escolher? Guia 2026. #fechaduraembutir #fechadura', url: '/fechadura-embutir-sobrepor' },
  'rastreador_veicular_gps_1776309816476.png': { title: 'Rastreador Veicular GPS', desc: 'Localize seu veículo em tempo real. #gps #rastreador', url: '/rastreador-gps' },
  'detector_fumaca_wifi_1776309799967.png': { title: 'Detector de Fumaça Wi-Fi', desc: 'Alerta instantâneo no celular. #fumaça #incêncio', url: '/detector-fumaca-wifi' },
  'sirene_wifi_alarme_2026_1776309771751.png': { title: 'Sirene Wi-Fi Alarme 2026', desc: 'Proteção completa. #alarme #smarthome', url: '/sirene-wifi-alarme' },
  'fechadura_fr101_vs_ydf40_1776309112451.png': { title: 'FR101 vs YDF40', desc: 'Comparativo completo 2026. #intelbras #yale', url: '/fr101-vs-ydf40' },
  'fechadura_alexa_homekit_1776309101594.png': { title: 'Fechadura Alexa HomeKit', desc: 'Apple HomeKit + Alexa. #homekit #alexa', url: '/alexa-homekit' },
  'fechadura_madeira_macica_1776309086726.png': { title: 'Fechadura Porta Madeira', desc: 'Para porta de madeira maciça. #madeira #porta', url: '/fechadura-porta-madeira' },
  'review_intelbras_fr400_vidro_1776308726623.png': { title: 'Intelbras FR400 Vidro Review', desc: 'Review completo. #intelbras #fechadura', url: '/intelbras-fr400-vidro' },
  'espessura_vidro_fechadura_1776308714564.png': { title: 'Espessura Vidro para Fechadura', desc: 'Guia técnico 2026. #vidro #instalação', url: '/espessura-vidro-fechadura' },
  'fechadura_vidro_dupla_face_1776308696554.png': { title: 'Fechadura Vidro Dupla Face', desc: 'Segurança em ambos os lados. #vidro', url: '/fechadura-vidro-dupla-face' },
  'fechadura_escritorio_clinica_vidro_1776308683153.png': { title: 'Fechadura Escritório Clínica', desc: 'Perfeito para ambientes profissionais. #escritório', url: '/fechadura-escritorio-clinica' },
  'instalacao_sem_furo_vidro_1776308580572.png': { title: 'Instalação Sem Furo Vidro', desc: 'Tutorial completo. #instalação', url: '/instalacao-sem-furo-vidro' },
  'fechadura_porta_correr_vidro_1776308562718.png': { title: 'Fechadura Porta Correr Vidro', desc: 'Para portas de correr. #vidro', url: '/fechadura-porta-correr-vidro' },
  'modulo-wifi-portao-hero.png': { title: 'Módulo Wi-Fi Portão', desc: 'Abrir portão pelo celular. #portão', url: '/modulo-wifi-portao' },
  'lampada-sensor-presenca-hero.png': { title: 'Lâmpada Sensor Presença', desc: 'Automação residencial. #sensor', url: '/lampada-sensor-presenca' }
};

async function postBatch(startIndex) {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts ? (await browser.contexts())[0] : await browser.newContext();
  const pages = context.pages ? await context.pages() : [];
  const page = pages.length > 0 ? pages[0] : await context.newPage();
  
  const images = Object.keys(ARTICLES).slice(startIndex, startIndex + 10);
  
  for (const imgName of images) {
    const article = ARTICLES[imgName];
    const sourcePath = `${SOURCE_DIR}/${imgName}`;
    const destPath = `${UPLOAD_DIR}/pin_${startIndex}.png`;
    
    try {
      console.log(`📍 Posting: ${article.title}...`);
      
      await page.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      
      const fileInput = await page.$('input[type="file"]');
      if (fileInput) {
        await fileInput.setInputFiles(sourcePath);
        await page.waitForTimeout(2500);
      }
      
      // Preencher campos de forma otimizada
      await page.$eval('input[placeholder*="ítulo"], input[name*="title"]', el => el.value = '');
      await page.type('input[placeholder*="ítulo"], input[name*="title"]', article.title, { delay: 50 });
      await page.$eval('textarea[placeholder*="escr"], textarea[name*="desc"]', el => el.value = '');
      await page.type('textarea[placeholder*="escr"], textarea[name*="desc"]', article.desc + ' 🔗 ' + article.url, { delay: 30 });
      
      const urlInput = await page.$('input[placeholder*="estino"], input[name*="dest"]');
      if (urlInput) await urlInput.fill('https://fechadurabiometrica.com.br' + article.url + '?utm_source=pinterest');
      
      await page.click('button:has-text("Publicar"), button:has-text("Save")');
      await page.waitForTimeout(3000);
      
      console.log(`   ✅ OK`);
      
    } catch (e) {
      console.log(`   ❌ ` + e.message);
    }
  }
  
  console.log('\n🎉 Lote concluído!');
  await browser.close().catch(() => {});
}

const start = parseInt(process.argv[2] || '0');
postBatch(start);