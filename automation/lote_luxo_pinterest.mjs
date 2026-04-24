import { chromium } from 'playwright';
import path from 'path';

const SOURCE_DIR = 'C:/Users/willt/Videos/fechadura de luxo';
const AFFILIATE_LINK = 'https://amzn.to/4cpZZku';

const PINS = [
  { 
    file: '611mN-TynML._AC_SL1500_.jpg', 
    title: 'Fechadura Digital Inteligente: Segurança de Elite para sua Porta', 
    desc: 'Transforme a entrada da sua casa com tecnologia biométrica de ponta. Segurança, estilo e praticidade em um só dispositivo. 🛡️✨' 
  },
  { 
    file: '618eCJxfghL._AC_SL1500_.jpg', 
    title: 'Review 2026: A Melhor Fechadura Biométrica Custo-Benefício', 
    desc: 'Buscando segurança sem gastar uma fortuna? Este modelo é o campeão de vendas na Amazon pela sua durabilidade e precisão.' 
  },
  { 
    file: '61Zke1n8vgL._AC_SL1500_.jpg', 
    title: 'Design Minimalista e Alta Segurança: O Futuro das Fechaduras', 
    desc: 'A elegância encontra a proteção máxima. Ideal para quem busca um visual clean sem abrir mão da tecnologia de reconhecimento facial.' 
  },
  { 
    file: '61iQmhXy1tL._AC_SL1500_.jpg', 
    title: 'Fechadura Inteligente com Senha e App: Controle Total de Onde Estiver', 
    desc: 'Abra a porta pelo celular, crie senhas para visitas e receba notificações em tempo real. A sua casa mais inteligente hoje!' 
  },
  { 
    file: '61zmembx9vL._AC_SL1500_.jpg', 
    title: 'Por que Trocar sua Fechadura Comum por uma Digital?', 
    desc: 'Esqueça as chaves! Descubra como a fechadura digital pode facilitar sua rotina e aumentar a segurança da sua família.' 
  },
  { 
    file: 'fechaduras_inteligentes_vs_digitais_qual__a_melhor.mp4', 
    title: 'Digital vs Inteligente: Qual a Melhor para Você? (Guia 2026)', 
    desc: 'Você sabe a diferença? Assista ao vídeo e descubra qual categoria de fechadura se adapta melhor ao seu estilo de vida.' 
  },
  { 
    file: 'luxo.jpg', 
    title: 'Luxo e Tecnologia: Reconhecimento Facial e Controle Tuya', 
    desc: 'O ápice da tecnologia residencial: Reconhecimento facial infravermelho e integração total com o ecossistema Smart Home.' 
  },
  { 
    file: 'resistente a chuva.jpg', 
    title: 'Fechadura Digital IP65: Totalmente À Prova D\'Água', 
    desc: 'Ideal para portões externos e litoral. Resistência comprovada contra chuva forte, maresia e poeira. Durabilidade garantida!' 
  },
  { 
    file: 'resistente a sol.jpg', 
    title: 'Resistência Solar Extrema: Fechadura para o Calor do Brasil', 
    desc: 'Projetada para suportar alta incidência de raios UV sem perda de funcionalidade ou desbotamento. Tecnologia de ponta para sua fachada.' 
  },
  { 
    file: 'sol e chuva.jpg', 
    title: 'Proteção Total 365 Dias: Sol, Chuva e Poeira', 
    desc: 'Não importa o clima, sua segurança está garantida. Fechadura robusta com vedação dupla para máxima proteção externa.' 
  }
];

async function postBatch() {
  console.log(`🚀 Iniciando postagem de ${PINS.length} pins no Pinterest...`);
  
  const userDataDir = path.join(process.cwd(), 'automation', 'pinterest_session');
  const browser = await chromium.launchPersistentContext(userDataDir, { 
    headless: false,
    viewport: { width: 1280, height: 800 },
    slowMo: 100
  }); 
  
  const page = browser.pages()[0] || await browser.newPage();
  
  try {
    for (let i = 0; i < PINS.length; i++) {
      const pin = PINS[i];
      console.log(`📍 Processando: ${pin.title}...`);
      
      console.log(`   🌐 Carregando Pin Builder...`);
      await page.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'domcontentloaded', timeout: 90000 });
      
      // Esperar um pouco extra para garantir hidratação mínima
      await page.waitForTimeout(5000);

      // Detectar login
      if (page.url().includes('login')) {
        console.log("⚠️ Por favor, faça login no Pinterest. O script aguardará...");
        await page.waitForURL('**/pin-builder/**', { timeout: 180000 });
      }

      await page.waitForTimeout(5000);
      
      // 1. Upload de Arquivo
      console.log(`   ⬆️ Tentando carregar: ${pin.file}`);
      
      const fileInputSelector = 'input[type="file"]';
      await page.waitForSelector(fileInputSelector, { state: 'attached', timeout: 30000 });
      const fileInput = await page.$(fileInputSelector);

      if (fileInput) {
        const filePath = path.join(SOURCE_DIR, pin.file);
        await fileInput.setInputFiles(filePath);
        console.log(`   ✅ Arquivo carregado.`);
        await page.waitForTimeout(5000);
      } else {
        throw new Error("Não foi possível encontrar o campo de upload de arquivo.");
      }
      
      // 2. Título
      console.log(`   📝 Preenchendo título...`);
      const titleSelector = 'input[placeholder*="título"], textarea[placeholder*="título"], [aria-label*="título"]';
      await page.waitForSelector(titleSelector, { timeout: 15000 });
      await page.fill(titleSelector, pin.title);
      
      // 3. Descrição
      console.log(`   📝 Preenchendo descrição...`);
      const descSelector = '[aria-label*="Conte sobre"], [role="combobox"]';
      await page.click(descSelector);
      await page.keyboard.type(pin.desc + ' #fechaduradigital #smarthome #seguranca #amazonafiliados');
      
      // 4. Link
      console.log(`   🔗 Adicionando link...`);
      const linkSelector = 'input[placeholder*="link"], textarea[placeholder*="link"], [aria-label*="link"]';
      await page.fill(linkSelector, AFFILIATE_LINK);
      
      await page.waitForTimeout(2000);
      
      // 5. Seleção de Pasta (Board)
      console.log(`   📂 Verificando pasta...`);
      const boardSelector = '[data-test-id="board-dropdown-select-button"], button:has-text("casal")';
      const boardDropdown = await page.$(boardSelector);
      if (boardDropdown) {
          await boardDropdown.click();
          await page.waitForTimeout(3000);
          const firstBoard = await page.$('[data-test-id="board-row"], [role="listitem"]');
          if (firstBoard) {
              await firstBoard.click();
              console.log("   ✅ Pasta selecionada.");
          }
          await page.waitForTimeout(2000);
      }

      // 6. Publicar
      console.log(`   🎯 Publicando...`);
      const publishBtn = await page.waitForSelector('button:has-text("Publicar"), button[data-test-id="board-dropdown-save-button"]', { timeout: 15000 });
      if (publishBtn) {
        await publishBtn.click();
        console.log(`   🚀 Clique no botão Publicar efetuado.`);
      } else {
        console.log("   ⚠️ Tentando clique alternativo no botão de salvar...");
        await page.click('button[type="submit"]');
      }
      
      await page.waitForTimeout(10000); // Esperar postar
      console.log(`   ✨ Finalizado: ${pin.file}`);
    }
    
    console.log(`🏁 Todos os ${PINS.length} pins foram processados!`);
  } catch (e) {
    console.error(`❌ Erro durante o processo: ${e.message}`);
    await page.screenshot({ path: `automation/error_pinterest_${Date.now()}.png` });
  } finally {
    console.log("Processo encerrado em 30 segundos...");
    await new Promise(r => setTimeout(r, 30000));
    await browser.close();
  }
}

postBatch();

