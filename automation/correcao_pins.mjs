import { chromium } from 'playwright';
const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';

// Pins para CORRIGIR (URLs e títulos otimizados)
const CORRECTIONS = [
  { 
    img: 'hero_baby_security_2026.png', 
    title: '🔒 Fechadura para Quarto de Bebê 2026', 
    desc: 'Review completo! Senha temporária + biométrica. Segurança total para seu bebê! #bebê #segurança #smarthome',
    url: 'como-proteger-baba-eletronica-hacker'
  },
  { 
    img: 'lock_alexa_google_1776310010162.png', 
    title: '🎙️ Fechadura Alexa Google Home 2026', 
    desc: 'Controle por voz com Alexa e Google! Abra pelo celular! #alexa #googlehome #smarthome',
    url: 'fechadura-digital-com-alexa-google'
  },
  { 
    img: 'hero_biometria_facial_2026.png', 
    title: '👁️ Biometria Facial 3D 2026', 
    desc: 'Reconhecimento facial 3D! Muito mais seguro que senha! #biometria #facial #segurança',
    url: 'biometria-facial-3d-fechadura-2026'
  },
  { 
    img: 'fechadura_alexa_homekit_1776309101594.png', 
    title: '🍎 Fechadura Alexa HomeKit 2026', 
    desc: 'Compatível Alexa e Apple HomeKit! Abra pelo celular ou voz! #homekit #alexa #apple',
    url: 'fechadura-eletronica-compativel-alexa-apple-homekit'
  },
  { 
    img: 'fechadura_porta_correr_vidro_1776308562718.png', 
    title: '🚪 Fechadura Porta Correr Vidro 2026', 
    desc: 'Para sacada e porta de correr! Instalação sem furo! #vidro #correr #apartamento',
    url: 'fechadura-digital-porta-vidro-correr-sacada-apartamento'
  }
];

async function correctPins() {
  console.log('📍 Correção de pins...');
  const br = await chromium.connectOverCDP('http://localhost:9222', { timeout: 10000 });
  const ctx = br.contexts ? (await br.contexts())[0] : await br.newContext();
  const pg = (await ctx.pages())[0] || await ctx.newPage();
  
  for (let i = 0; i < CORRECTIONS.length; i++) {
    const p = CORRECTIONS[i];
    console.log(`📍 ${i+1}/${CORRECTIONS.length}: ${p.title}...`);
    try {
      await pg.goto('https://www.pinterest.com/pin-builder/', { timeout: 15000 });
      await pg.waitForSelector('input[type="file"]', { timeout: 10000 });
      await (await pg.$('input[type="file"]')).setInputFiles(`${SOURCE_DIR}/${p.img}`);
      await pg.waitForTimeout(2500);
      const txts = await pg.$$('textarea');
      if(txts[0]) await txts[0].fill(p.title);
      if(txts[1]) await txts[1].fill(p.desc + ' 🔗 fe.ch/' + p.url);
      const saveBtn = await pg.$('button:has-text("Salvar"), button:has-text("Publicar"), button:has-text("Criar"), button:has-text("Save")');
      if (saveBtn) await saveBtn.click();
      await pg.waitForTimeout(2500);
      console.log(`   ✅ CORRIGIDO! URL: fe.ch/${p.url}`);
    } catch(e) { console.log(`   ❌ ${e.message}`); }
  }
  console.log('🎉 Correções completas!');
  await br.close();
}

correctPins().catch(e => console.log(`❌ ${e.message}`));