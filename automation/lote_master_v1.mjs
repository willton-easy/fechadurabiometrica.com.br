import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';
const TEXT_FILE = path.join(SOURCE_DIR, 'Textos_Para_Postar_Pinterest.txt');

// Configuração de Lote (Pode ser ajustado)
const START_INDEX = 0; 
const LIMIT = 10;

async function run() {
  console.log("📖 Lendo banco de dados de textos do Pinterest...");
  const content = fs.readFileSync(TEXT_FILE, 'utf-8');
  
  // Regex para extrair blocos de Pins
  const blocks = content.split(/={10,}/);
  const pins = [];
  
  for (const block of blocks) {
    if (!block.includes('📌 Título Exato:')) continue;
    
    const titleMatch = block.match(/📌 Título Exato:\s*(.*)/);
    const descMatch = block.match(/📝 Descrição Estratégica:\s*(.*)/);
    const urlMatch = block.match(/🌐 Link Original:\s*(.*)/);
    
    if (titleMatch && urlMatch) {
      const url = urlMatch[1].trim();
      const slug = url.split('/').pop();
      
      pins.push({
        title: titleMatch[1].trim(),
        desc: descMatch ? descMatch[1].trim() : '',
        url: url,
        slug: slug
      });
    }
  }

  console.log(`📊 Encontrados ${pins.length} pins no arquivo.`);
  
  // Tentar casar imagens
  const files = fs.readdirSync(SOURCE_DIR);
  const finalBatch = [];
  
  console.log("🔍 Mapeando imagens (debug):");
  for (const pin of pins) {
    // Busca por palavras-chave significativas do slug
    const keywords = pin.slug.split('-').filter(k => k.length > 3);
    const matchedFile = files.find(f => {
      const lowFile = f.toLowerCase();
      // Bate se incluir o slug completo ou pelo menos 2 palavras-chave únicas
      if (lowFile.includes(pin.slug.toLowerCase())) return true;
      const matches = keywords.filter(k => lowFile.includes(k.toLowerCase()));
      return matches.length >= 2;
    });

    if (matchedFile) {
      finalBatch.push({ ...pin, img: matchedFile });
      console.log(`   ✅ Match: [${matchedFile}] <-> ${pin.slug}`);
    }
  }

  console.log(`🎯 Mapeados ${finalBatch.length} pins com imagens correspondentes.`);
  
  const batchToPost = finalBatch.slice(START_INDEX, START_INDEX + LIMIT);
  console.log(`🚀 Iniciando postagem de lote (Index ${START_INDEX} a ${START_INDEX + LIMIT})...`);

  try {
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = (await browser.contexts())[0];
    const page = await context.newPage();
    
    for (const pin of batchToPost) {
      console.log(`📍 Postando [${pin.img}]: ${pin.title}...`);
      
      try {
        await page.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(4000);
        
        // 1. Upload
        const fileInput = await page.$('input[type="file"][aria-label="Upload de arquivo"]');
        if (fileInput) {
          await fileInput.setInputFiles(path.join(SOURCE_DIR, pin.img));
          await page.waitForTimeout(5000);
        }
        
        // 2. Título
        const titleSelector = 'textarea[placeholder="Adicione um título"]';
        await page.waitForSelector(titleSelector, { timeout: 10000 });
        await page.fill(titleSelector, pin.title);
        
        // 3. Descrição (Draft.js)
        const descSelector = 'div[role="combobox"][aria-label="Conte sobre o que é o seu Pin"]';
        await page.click(descSelector);
        await page.keyboard.type(pin.desc);
        
        // 4. Link
        const linkSelector = 'textarea[placeholder="Adicione um link de destino"]';
        await page.fill(linkSelector, pin.url + '?utm_source=pinterest&utm_medium=autopost_v1');
        
        await page.waitForTimeout(3000);
        
        // 5. Publicar
        const publishBtn = await page.$('button[data-test-id="board-dropdown-save-button"]');
        if (publishBtn) {
          await publishBtn.click();
        } else {
          await page.click('button:has-text("Publicar")');
        }
        
        await page.waitForTimeout(8000);
        console.log(`   ✅ Sucesso!`);
        
      } catch (err) {
        console.error(`   ❌ Falha no pin: ${err.message}`);
      }
    }
    
    await page.close();
    console.log(`🏁 Lote concluído.`);
    
  } catch (err) {
    console.error(`🔴 Erro fatal no navegador: ${err.message}`);
  }
}

run();
