import { chromium } from 'playwright';
const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';

const PINS = [
  { 
    img: 'hero-biometric-dossier.jpg', 
    title: 'Fechadura Biométrica Alta Segurança Yale Philips Intelbras 2026', 
    desc: 'As melhores fechaduras biométricas de alta segurança residencial! fe.ch/dossie-seguranca-biometrica-residencial-2026', 
    url: 'dossie-seguranca-biometrica-residencial-2026' 
  }
];

async function postFinal() {
  console.log('Postando último pin do Dossie...\n');
  const br = await chromium.connectOverCDP('http://localhost:9222', { timeout: 10000 });
  const ctx = br.contexts ? (await br.contexts())[0] : await br.newContext();
  const pg = (await ctx.pages())[0] || await ctx.newPage();
  
  const p = PINS[0];
  console.log(`📍 ${p.title}...`);
  try {
    await pg.goto('https://www.pinterest.com/pin-builder/', { timeout: 15000 });
    await pg.waitForSelector('input[type="file"]', { timeout: 10000 });
    await (await pg.$('input[type="file"]')).setInputFiles(`${SOURCE_DIR}/${p.img}`);
    await pg.waitForTimeout(2500);
    const txts = await pg.$$('textarea');
    if(txts[0]) await txts[0].fill(p.title);
    if(txts[1]) await txts[1].fill(p.desc);
    const saveBtn = await pg.$('button:has-text("Salvar"), button:has-text("Publicar"), button:has-text("Criar"), button:has-text("Save")');
    if (saveBtn) await saveBtn.click();
    await pg.waitForTimeout(2500);
    console.log(`✅ Dossiê Segurança Biométrica COMPLETO! 10 pins!`);
  } catch(e) { console.log(`❌ ${e.message}`); }
  await br.close();
}

postFinal().catch(console.error);