import { chromium } from 'playwright';

const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';

const PINS = [
  { img: 'botao_panico_wifi_1776310024810.png', title: 'Botão de Pânico Wi-Fi 2026', desc: 'Notificação instantânea! #botãodepânico #segurança', url: '/botao-panico-wifi' },
  { img: 'lock_alexa_google_1776310010162.png', title: 'Fechadura Alexa e Google 2026', desc: 'Controle por voz! #alexa #googlehome', url: '/alexa-google-home' },
  { img: 'design_interiores_lock_1776309996605.png', title: 'Smart Lock Design 2026', desc: 'Elegância e segurança! #design', url: '/design-interiores' },
  { img: 'lock_embutir_sobrepor_1776309982470.png', title: 'Embutir vs Sobrepor', desc: 'Qual escolher? #fechadura', url: '/fechadura-embutir-sobrepor' },
  { img: 'detector_fumaca_wifi_1776309799967.png', title: 'Detector Fumaça Wi-Fi', desc: 'Alerta no celular!', url: '/detector-fumaca-wifi' },
  { img: 'sirene_wifi_alarme_2026_1776309771751.png', title: 'Sirene Wi-Fi Alarme', desc: 'Proteção completa!', url: '/sirene-wifi-alarme' },
  { img: 'fechadura_fr101_vs_ydf40_1776309112451.png', title: 'FR101 vs YDF40', desc: 'Comparativo!', url: '/fr101-vs-ydf40' },
  { img: 'fechadura_alexa_homekit_1776309101594.png', title: 'Alexa HomeKit 2026', desc: 'Apple + Alexa!', url: '/alexa-homekit' },
  { img: 'fechadura_madeira_macica_1776309086726.png', title: 'Fechadura Porta Madeira', desc: 'Para madeira!', url: '/fechadura-porta-madeira' },
  { img: 'fechadura_escritorio_clinica_vidro_1776308683153.png', title: 'Escritório Clínica Vidro', desc: 'Profissional!', url: '/fechadura-escritorio-clinica' }
];

async function post(idx) {
  const p = PINS[idx];
  console.log(`${idx+1}/10: ${p.title}...`);
  const br = await chromium.connectOverCDP('http://localhost:9222');
  const ctx = br.contexts ? (await br.contexts())[0] : await br.newContext();
  const pg = ctx.pages ? (await ctx.pages())[0] : await ctx.newPage();
  try {
    await pg.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'domcontentloaded' });
    await pg.waitForTimeout(2000);
    const inp = await pg.$('input[type="file"]');
    if (inp) { await inp.setInputFiles(`${SOURCE_DIR}/${p.img}`); await pg.waitForTimeout(3000); }
    const txts = await pg.$$('textarea');
    if (txts[0]) await txts[0].fill(p.title);
    if (txts[1]) await txts[1].fill(p.desc + ' fe.ch/' + p.url);
    await pg.click('button:has-text("Publicar")');
    await pg.waitForTimeout(3000);
    console.log(`✅`);
  } catch (e) { console.log(`❌ ${e.message}`); }
  finally { await br.close().catch(() => {}); }
}

post(parseInt(process.argv[2] || '0'));