import { chromium } from 'playwright';
const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';
const PINS = [
  { img: 'fechadura_vidro_dupla_face_1776308696554.png', title: 'Fechadura Vidro Dupla Face', desc: 'Segurança em ambos os lados! #vidro', url: 'fechadura-vidro-dupla-face' },
  { img: 'fechadura_porta_correr_vidro_1776308562718.png', title: 'Fechadura Porta Correr', desc: 'Para portas de correr!', url: 'fechadura-porta-correr-vidro' },
  { img: 'instalacao_sem_furo_vidro_1776308580572.png', title: 'Instalação Sem Furo', desc: 'Tutorial completo!', url: 'instalacao-sem-furo-vidro' },
  { img: 'review_intelbras_fr400_vidro_1776308726623.png', title: 'Intelbras FR400 Review', desc: 'Review completo!', url: 'intelbras-fr400-vidro' },
  { img: 'espessura_vidro_fechadura_1776308714564.png', title: 'Espessura Vidro Fechadura', desc: 'Guia técnico!', url: 'espessura-vidro-fechadura' },
  { img: 'modulo-wifi-portao-hero.png', title: 'Módulo Wi-Fi Portão', desc: 'Abrir portão pelo celular!', url: 'modulo-wifi-portao' },
  { img: 'lampada-sensor-presenca-hero.png', title: 'Lâmpada Sensor', desc: 'Automação residencial!', url: 'lampada-sensor-presenca' },
  { img: 'rastreador_veicular_gps_1776309816476.png', title: 'Rastreador GPS', desc: 'Localize seu veículo!', url: 'rastreador-gps' },
  { img: 'camera_pet_furbo_tapo_1776309786642.png', title: 'Câmera Pet Tapo', desc: 'Monitore seu pet!', url: 'camera-pet-furbo' },
  { img: 'comparativo_elsys_vs_intelbras.png', title: 'Elsys vs Intelbras', desc: 'Comparativo!', url: 'comparativo-elsys-intelbras' }
];

async function post() {
  console.log('📍 Posting lote 3...');
  const br = await chromium.connectOverCDP('http://localhost:9222', { timeout: 10000 });
  const ctx = br.contexts ? (await br.contexts())[0] : await br.newContext();
  const pg = (await ctx.pages())[0] || await ctx.newPage();
  
  for (let i = 0; i < PINS.length; i++) {
    const p = PINS[i];
    console.log(`📍 ${i+1}/10: ${p.title}...`);
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
  console.log('🎉 Lote 3 completo!');
  await br.close();
}

post().catch(e => console.log(`❌ ${e.message}`));