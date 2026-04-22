import { chromium } from 'playwright';

const UPLOAD_DIR = 'C:/Users/willt/AppData/Local/Programs/Antigravity/pinterest_pins';
const SCREENSHOTS = 'C:/Users/willt/AppData/Local/Programs/Antigravity/pinterest_pins/screenshots';

const PIN_BATCH = [
  {
    image: 'pin_baby.png',
    title: '🔒 Fechadura Digital para Quarto de Bebê: Segurança Total 2026',
    desc: 'Guia completo com as melhores fechaduras biométricas para proteger seu bebê. Smart home integrado! #fechadurationsdigital #segurançabebê #smarthome',
    url: 'https://fechadurabiometrica.com.br/guia-bebe-seguro'
  },
  {
    image: 'pin_panico.png',
    title: '🚨 Botão de Pânico Wi-Fi: Segurança Emergencial 2026',
    desc: 'Botão de pânico com notificação instantânea. Conecta via Wi-Fi! #botãodepânico #segurança #smarthome',
    url: 'https://fechadurabiometrica.com.br/botao-panico-wifi'
  },
  {
    image: 'pin_alexa.png',
    title: '🎙️ Fechadura com Alexa e Google Home 2026',
    desc: 'Controle sua fechadura por voz! Integração com Alexa e Google Assistant. #alexa #googlehome #fechadurasmart',
    url: 'https://fechadurabiometrica.com.br/alexa-google-home'
  },
  {
    image: 'pin_pet.png',
    title: '🐶 Câmera Pet Wi-Fi Tapo: Monitore seu Pet 2026',
    desc: 'Vere seu pet enquanto trabalha! Câmera com detecção de movimento. #câmerapet #tapo #smarthome',
    url: 'https://fechadurabiometrica.com.br/camera-pet-furbo'
  }
];

async function postBatch() {
  console.log('🤖 PINTEREST AUTOPOST - LOTE 6');
  console.log('================================');
  
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts ? (await browser.contexts())[0] : await browser.newContext();
  const pages = context.pages ? await context.pages() : [];
  const page = pages.length > 0 ? pages[0] : await context.newPage();
  
  for (let i = 0; i < PIN_BATCH.length; i++) {
    const pin = PIN_BATCH[i];
    console.log(`\n📍 Postando Pin ${i + 1} de ${PIN_BATCH.length}: ${pin.title.substring(0, 40)}...`);
    
    try {
      // Upload imagem
      await page.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      
      const fileInput = await page.$('input[type="file"]');
      if (fileInput) {
        await fileInput.setInputFiles(`${UPLOAD_DIR}/${pin.image}`);
        await page.waitForTimeout(3000);
        console.log('   ✅ Imagem enviada');
      }
      
      // Preencher título
      const tituloInput = await page.$('input[placeholder*="ítulo"], input[name*="title"]');
      if (tituloInput) await tituloInput.fill(pin.title);
      
      // Preencher descrição
      const descInput = await page.$('textarea[placeholder*="escr"], textarea[name*="desc"]');
      if (descInput) await descInput.fill(pin.desc);
      
      // Preencher link
      const urlInput = await page.$('input[placeholder*="estino"], input[name*="dest"]');
      if (urlInput) await urlInput.fill(pin.url + '?utm_source=pinterest');
      
      console.log('   ✅ Campos preenchidos');
      
      // Publicar
      const publicarBtn = await page.$('button:has-text("Publicar"), button:has-text("Save")');
      if (publicarBtn) await publicarBtn.click();
      
      await page.waitForTimeout(5000);
      await page.screenshot({ path: `${SCREENSHOTS}/pin_${i + 1}_final.png` });
      console.log('   ✅ Pin publicado!');
      
    } catch (error) {
      console.error(`   ❌ Erro no Pin ${i + 1}:`, error.message);
    }
  }
  
  console.log('\n🎉 LOTE 6 CONCLUÍDO!');
}

postBatch().catch(console.error);