import { chromium } from 'playwright';

const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';

const PINS = [
  { 
    img: 'fechadura-wifi-vs-bluetooth-hero.png', 
    title: 'Wi-Fi ou Bluetooth em Fechadura Digital: Qual a Melhor Escolha em 2026?', 
    desc: 'Guia completo comparando conexão Wi-Fi e Bluetooth para fechaduras inteligentes. Descubra qual modelo oferece melhor custo-benefício e segurança.', 
    url: '/guias/fechadura-digital-wi-fi-vs-bluetooth' 
  },
  { 
    img: 'fechadura-inteligente-offline-hero.png', 
    title: 'Fechadura Inteligente Funciona Sem Internet? Verdades e Limitações', 
    desc: 'Descubra se sua fechadura digital continua segura quando o Wi-Fi cai. Tudo sobre funcionamento offline e segurança local em 2026.', 
    url: '/guias/fechadura-inteligente-funciona-sem-internet' 
  },
  { 
    img: 'fechadura_digital_vs_inteligente_infografico_2026.png', 
    title: 'Diferença entre Fechadura Digital e Inteligente: Infográfico 2026', 
    desc: 'Entenda definitivamente a diferença técnica entre fechaduras digitais e inteligentes com nosso infográfico exclusivo.', 
    url: '/guias/diferenca-fechadura-digital-inteligente' 
  },
  { 
    img: 'olho-magico-digital.png', 
    title: 'Olho Mágico Digital com Câmera: Guia Melhores Modelos 2026', 
    desc: 'Aposente o visor de vidro! Guia completo sobre olhos mágicos digitais com Wi-Fi e monitoramento por celular.', 
    url: '/guias/olho-magico-digital-com-camera' 
  }
];

async function postBatch() {
  console.log(`🚀 Iniciando postagem de ${PINS.length} pins no Pinterest...`);
  
  try {
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = (await browser.contexts())[0];
    const page = await context.newPage();
    
    for (const pin of PINS) {
      console.log(`📍 Postando: ${pin.title}...`);
      
      await page.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3000);
      
      // Upload
      const fileInput = await page.$('input[type="file"]');
      if (fileInput) {
        await fileInput.setInputFiles(`${SOURCE_DIR}/${pin.img}`);
        await page.waitForTimeout(4000);
      }
      
      // Preencher Título e Descrição
      const inputs = await page.$$('input');
      const textareas = await page.$$('textarea');
      
      if (inputs.length >= 1) await inputs[0].fill(pin.title);
      if (textareas.length >= 1) await textareas[0].fill(pin.desc + ' #fechadura #segurança #smarthome');
      
      // URL de destino
      const urlInputs = await page.$$('input');
      if(urlInputs.length >= 3) {
        await urlInputs[2].fill('https://www.fechadurabiometrica.com.br' + pin.url + '?utm_source=pinterest&utm_medium=autopost');
      }
      
      // Esperar renderizar botão publicar
      await page.waitForTimeout(2000);
      
      // Publicar (Tentar clicar no botão de publicar)
      const publishBtn = await page.$('button[data-test-id="board-dropdown-save-button"]');
      if (publishBtn) {
        await publishBtn.click();
      } else {
        await page.click('button:has-text("Publicar")');
      }
      
      await page.waitForTimeout(5000);
      console.log(`   ✅ OK: ${pin.img}`);
    }
    
    await page.close();
    console.log(`🏁 Lote concluído!`);
    
  } catch (e) {
    console.error(`❌ Erro no lote: ${e.message}`);
  }
}

postBatch();
