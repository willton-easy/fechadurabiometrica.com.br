# Pinterest Autopost - Script Unificado
# Execute: node lote_unico.mjs [0-5]

import { chromium } from 'playwright';
const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';

const LOTE = [
  // LOTE 0
  [
    { img: 'hero_baby_security_2026.png', title: 'Fechadura Bebê', desc: 'Segurança total!', url: 'guia-bebe-seguro' },
    { img: 'pin_airbnb_smart_lock_1776616692276.png', title: 'Airbnb Smart Lock', desc: 'Perfeito!', url: 'guia-airbnb-fechaduras-biometricas-2026' },
    { img: 'pin_facial_recognition_lock_1776616671223.png', title: 'Reconhecimento Facial', desc: 'Facial!', url: 'biometria-facial-2026' },
    { img: 'pin_luxury_door_biometric_1776616648865.png', title: 'Fechadura Luxo', desc: 'Luxo!', url: 'fechadura-digital-luxo' },
    { img: 'hero_litoral_maresia_1774200779133.png', title: 'Fechadura Litoral', desc: 'Anti-maresia!', url: 'fechadura-digital-litoral' },
    { img: 'hero_top10_fechaduras_2026.png', title: 'Top 10', desc: 'As melhores!', url: 'melhores-fechaduras-digitais-2026' },
    { img: 'hero_biometria_facial_2026.png', title: 'Biometria Facial', desc: 'Facial!', url: 'biometria-facial-2026' },
    { img: 'hero_mfr7001_facial_1774200730630.png', title: 'MFR7001', desc: 'Facial!', url: 'intelbras-mfr7001' },
    { img: 'hero_fechadura_airbnb.png', title: 'Airbnb', desc: 'Para Airbnb!', url: 'guia-airbnb-fechaduras-biometricas-2026' },
    { img: 'fechadura_madeira_macica_1776309086726.png', title: 'Porta Madeira', desc: 'Madeira!', url: 'fechadura-porta-madeira' }
  ],
  // LOTE 1 (já postado)
  [
    { img: 'botao_panico_wifi_1776310024810.png', title: 'Botão Pânico', desc: 'Emergência!', url: 'botao-panico-wifi' },
    { img: 'lock_alexa_google_1776310010162.png', title: 'Alexa Google', desc: 'Voz!', url: 'alexa-google-home' },
    { img: 'design_interiores_lock_1776309996605.png', title: 'Design', desc: 'Elegância!', url: 'design-interiores' },
    { img: 'lock_embutir_sobrepor_1776309982470.png', title: 'Embutir vs Sobrepor', desc: 'Qual escolher?', url: 'fechadura-embutir-sobrepor' },
    { img: 'detector_fumaca_wifi_1776309799967.png', title: 'Detector Fumaça', desc: 'Alerta!', url: 'detector-fumaca-wifi' },
    { img: 'sirene_wifi_alarme_2026_1776309771751.png', title: 'Sirene', desc: 'Alarme!', url: 'sirene-wifi-alarme' },
    { img: 'fechadura_fr101_vs_ydf40_1776309112451.png', title: 'FR101 vs YDF40', desc: 'Comparativo!', url: 'fr101-vs-ydf40' },
    { img: 'fechadura_alexa_homekit_1776309101594.png', title: 'HomeKit', desc: 'Apple!', url: 'alexa-homekit' },
    { img: 'fechadura_madeira_macica_1776309086726.png', title: 'Madeira', desc: 'Porta!', url: 'fechadura-porta-madeira' },
    { img: 'fechadura_escritorio_clinica_vidro_1776308683153.png', title: 'Escritório', desc: 'Clínica!', url: 'fechadura-escritorio-clinica' }
  ]
];

async function post(loteIdx) {
  const PINS = LOTE[loteIdx] || LOTE[0];
  console.log(`📍 Lote ${loteIdx}: ${PINS.length} pins...`);
  const br = await chromium.connectOverCDP('http://localhost:9222', { timeout: 10000 });
  const ctx = br.contexts ? (await br.contexts())[0] : await br.newContext();
  const pg = (await ctx.pages())[0] || await ctx.newPage();
  for (let i = 0; i < PINS.length; i++) {
    const p = PINS[i];
    console.log(`📍 ${i+1}/${PINS.length}: ${p.title}...`);
    try {
      await pg.goto('https://www.pinterest.com/pin-builder/', { timeout: 15000 });
      await pg.waitForSelector('input[type="file"]', { timeout: 10000 });
      await (await pg.$('input[type="file"]')).setInputFiles(`${SOURCE_DIR}/${p.img}`);
      await pg.waitForTimeout(2500);
      const txts = await pg.$$('textarea');
      if(txts[0]) await txts[0].fill(p.title);
      if(txts[1]) await txts[1].fill(p.desc + ' fe.ch/' + p.url);
      const saveBtn = await pg.$('button:has-text("Salvar"), button:has-text("Publicar"), button:has-text("Criar"), button:has-text("Save")');
      if (saveBtn) await saveBtn.click();
      await pg.waitForTimeout(2500);
      console.log(`   ✅`);
    } catch(e) { console.log(`   ❌ ${e.message}`); }
  }
  console.log(`🎉 Lote ${loteIdx} completo!`);
  await br.close();
}

post(parseInt(process.argv[2] || '0'));