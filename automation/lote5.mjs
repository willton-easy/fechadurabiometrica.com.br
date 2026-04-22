import { chromium } from 'playwright';
const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';
const PINS = [
  { img: 'hero_mfr7001_vs_dp609_2026.png', title: 'MFR7001 vs DP609', desc: 'Comparativo!', url: 'comparativo-mfr7001-dp609' },
  { img: 'hero_mfr7001_facial_1774200730630.png', title: 'MFR7001 Facial', desc: 'Reconhecimento facial!', url: 'intelbras-mfr7001' },
  { img: 'ifr_7000_hero_fidelity_1775724316169.png', title: 'IFR7000 Review', desc: 'Review completo!', url: 'intelbras-ifr-7000' },
  { img: 'mfr_7001_hero_fidelity_1775724329968.png', title: 'MFR7001 Review', desc: 'Review completo!', url: 'intelbras-mfr7001' },
  { img: 'ezviz_dl05_hero_fidelity_1775724360053.png', title: 'Ezviz DL05 Review', desc: 'Review completo!', url: 'ezviz-dl05' },
  { img: 'ezviz-dl05-info.png', title: 'Ezviz DL05 Info', desc: 'Informações!', url: 'ezviz-dl05-info' },
  { img: 'nova_digital_hero_fidelity_1775724344787.png', title: 'Nova Digital', desc: 'Inovação!', url: 'nova-digital' },
  { img: 'review_intelbras_ifr7000_2026.png', title: 'IFR7000 Review', desc: 'Review!', url: 'intelbras-ifr-7000' },
  { img: 'review_yale_ymf40a_2026.png', title: 'Yale YMF40A Review', desc: 'Review!', url: 'yale-ymf-40a' },
  { img: 'review_samsung_shp_dp609_2026.png', title: 'Samsung SHP-DP609', desc: 'Review!', url: 'samsung-shp-dp609' }
];

async function post() {
  console.log('📍 Posting lote 5...');
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
  console.log('🎉 Lote 5 completo!');
  await br.close();
}

post().catch(e => console.log(`❌ ${e.message}`));