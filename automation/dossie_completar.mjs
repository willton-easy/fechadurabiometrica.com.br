import { chromium } from 'playwright';
const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';

const PINS = [
  { 
    img: 'hero-biometric-dossier.jpg', 
    title: 'Reconhecimento Facial 3D Fechaduras Luz Estruturada 2026', 
    desc: 'Reconhecimento Facial de Luz Estruturada Philips Intelbras! fe.ch/dossie-seguranca-biometrica-residencial-2026', 
    url: 'dossie-seguranca-biometrica-residencial-2026' 
  },
  { 
    img: 'hero_biometria_facial_2026.png', 
    title: 'Criptografia Fechaduras Digitais Proteção Dados Biométricos 2026', 
    desc: 'Seus dados biométricos estão seguros? Criptografia de borda! fe.ch/dossie-seguranca-biometrica-residencial-2026', 
    url: 'dossie-seguranca-biometrica-residencial-2026' 
  },
  { 
    img: 'hero_biometric_dossier.jpg', 
    title: 'Fechadura Biométrica Alta Segurança Yale Philips Intelbras 2026', 
    desc: 'As melhores fechaduras biométricas de alta segurança residencial! fe.ch/dossie-seguranca-biometrica-residencial-2026', 
    url: 'dossie-seguranca-biometrica-residencial-2026' 
  }
];

async function postFaltantes() {
  console.log('Completando 3 pins do Dossie...\n');
  const br = await chromium.connectOverCDP('http://localhost:9222', { timeout: 10000 });
  const ctx = br.contexts ? (await br.contexts())[0] : await br.newContext();
  const pg = (await ctx.pages())[0] || await ctx.newPage();
  
  for (let i = 0; i < PINS.length; i++) {
    const p = PINS[i];
    console.log(`${i+1}/3: ${p.title}...`);
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
      console.log(`   OK`);
    } catch(e) { console.log(`   ERRO: ${e.message}`); }
  }
  console.log('Dossie completo! 10 pins!');
  await br.close();
}

postFaltantes().catch(console.error);