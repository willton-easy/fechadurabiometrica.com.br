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
  console.log(`🚀 Iniciando postagem de ${PINS.length} pins no Pinterest com NOVOS SELETORES...`);
  
  try {
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = (await browser.contexts())[0];
    const page = await context.newPage();
    
    for (const pin of PINS) {
      console.log(`📍 Postando: ${pin.title}...`);
      
      await page.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(5000);
      
      // 1. Upload de Imagem
      const fileInput = await page.$('input[type="file"][aria-label="Upload de arquivo"]');
      if (fileInput) {
        await fileInput.setInputFiles(`${SOURCE_DIR}/${pin.img}`);
        await page.waitForTimeout(5000);
      } else {
        console.log("   ⚠️ Input de arquivo não encontrado pelo seletor ARIA.");
      }
      
      // 2. Preencher Título
      const titleSelector = 'textarea[placeholder="Adicione um título"]';
      await page.waitForSelector(titleSelector, { timeout: 10000 });
      await page.fill(titleSelector, pin.title);
      
      // 3. Preencher Descrição (Draft.js - clicar e digitar)
      const descSelector = 'div[role="combobox"][aria-label="Conte sobre o que é o seu Pin"]';
      await page.click(descSelector);
      await page.keyboard.type(pin.desc + ' #fechadura #segurança #smarthome');
      
      // 4. Link de Destino
      const linkSelector = 'textarea[placeholder="Adicione um link de destino"]';
      await page.fill(linkSelector, 'https://www.fechadurabiometrica.com.br' + pin.url + '?utm_source=pinterest&utm_medium=autopost');
      
      await page.waitForTimeout(2000);
      
      // 5. Publicar
      const publishBtn = await page.$('button[data-test-id="board-dropdown-save-button"]');
      if (publishBtn) {
        await publishBtn.click();
      } else {
        // Fallback para texto
        await page.click('button:has-text("Publicar")');
      }
      
      await page.waitForTimeout(8000); // Esperar processar o upload e postagem
      console.log(`   ✅ OK: ${pin.img}`);
    }
    
    await page.close();
    console.log(`🏁 Lote concluído!`);
    
  } catch (e) {
    console.error(`❌ Erro no lote: ${e.message}`);
  }
}

postBatch();
