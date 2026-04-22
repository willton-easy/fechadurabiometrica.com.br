import { chromium } from 'playwright';
const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';

async function post() {
  console.log('📍 Pin 4: Botão de Pânico...');
  const br = await chromium.connectOverCDP('http://localhost:9222', { timeout: 10000 });
  const ctx = br.contexts ? (await br.contexts())[0] : await br.newContext();
  const pg = (await ctx.pages())[0] || await ctx.newPage();
  
  await pg.goto('https://www.pinterest.com/pin-builder/', { timeout: 15000 });
  await pg.waitForSelector('input[type="file"]', { timeout: 10000 });
  
  await (await pg.$('input[type="file"]')).setInputFiles(`${SOURCE_DIR}/botao_panico_wifi_1776310024810.png`);
  await pg.waitForTimeout(2500);
  
  // Preencher campos
  const txts = await pg.$$('textarea');
  if(txts[0]) await txts[0].fill('Botão de Pânico Wi-Fi 2026');
  if(txts[1]) await txts[1].fill('Notificação instantânea! #botãodepânico #segurança fe.ch/botao-panico-wifi');
  
  await pg.waitForTimeout(500);
  
  // Procurar TODOS botões
  const btns = await pg.$$('button');
  console.log(`   ${btns.length} botões encontrados`);
  for (let i = 0; i < btns.length; i++) {
    const txt = await btns[i].textContent();
    if(txt) console.log(`   Botão ${i}: "${txt.substring(0,30)}"`);
  }
  
  // Clicar primeiro botão com texto relevante
  const saveBtn = await pg.$('button:has-text("Salvar"), button:has-text("Publicar"), button:has-text("Criar"), button:has-text("Save")');
  if (saveBtn) {
    await saveBtn.click();
    console.log('✅ Clicado!');
  } else {
    console.log('❌ Botão não encontrado');
  }
  
  await pg.waitForTimeout(2000);
  await br.close();
}

post().catch(e => console.log(`❌ ${e.message}`));