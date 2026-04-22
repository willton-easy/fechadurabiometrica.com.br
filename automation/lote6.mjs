import { chromium } from 'playwright';
const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';
const PINS = [
  { img: 'review_pado_fds50_2026.png', title: 'Pado FDS50 Review', desc: 'Review!', url: 'pado-fds50' },
  { img: 'review_intelbras_fr400_vidro_2026.png', title: 'FR400 Vidro Review', desc: 'Para vidro!', url: 'intelbras-fr400-vidro' },
  { img: 'olho_magico_wifi_1774202114037.png', title: 'Olho Mágico Wi-Fi', desc: 'Wi-Fi!', url: 'olho-magico-wifi' },
  { img: 'videoporteiro_wifi_1774202088975.png', title: 'Videoporteiro Wi-Fi', desc: 'Ver quem liga!', url: 'videoporteiro-wifi' },
  { img: 'interfone-wifi-2026.png', title: 'Interfone Wi-Fi', desc: 'Comunicação!', url: 'interfone-wifi' },
  { img: 'hero_litoral_maresia_1774200779133.png', title: 'Fechadura Litoral', desc: 'Anti-maresia!', url: 'fechadura-digital-litoral' },
  { img: 'fechadura_airbnb_moderno_2026_luxo_1774147950358.png', title: 'Airbnb Luxo', desc: 'Para Airbnb de luxo!', url: 'guia-airbnb-fechaduras-biometricas-2026' },
  { img: 'fechadura_acessibilidade_idosos_segura_1774148017467.png', title: 'Acessibilidade', desc: 'Para idosos!', url: 'acessibilidade-idosos' },
  { img: 'cofre_digital_biometrico_1774202142712.png', title: 'Cofre Digital', desc: 'Segurança máxima!', url: 'cofre-digital' },
  { img: 'elsys-esf-4000b.png', title: 'Elsys ESF-4000B', desc: 'Review!', url: 'elsys-esf-4000b' }
];

async function post() {
  console.log('📍 Posting lote 6...');
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
  console.log('🎉 LOTE 6 COMPLETO! Total: 54 pins!');
  await br.close();
}

post().catch(e => console.log(`❌ ${e.message}`));