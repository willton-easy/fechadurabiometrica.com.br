import { chromium } from 'playwright';
const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';
const PINS = [
  { img: 'comparativo_ezviz_vs_yale.png', title: 'Ezviz vs Yale', desc: 'Comparativo!', url: 'comparativo-ezviz-yale' },
  { img: 'comparativo_ifr7000_vs_mfr7001.png', title: 'IFR7000 vs MFR7001', desc: 'Comparativo!', url: 'comparativo-ifr7000-mfr7001' },
  { img: 'hero_top10_fechaduras_2026.png', title: 'Top 10 Fechaduras', desc: 'As melhores de 2026!', url: 'melhores-fechaduras-digitais-2026' },
  { img: 'hero_biometria_facial_2026.png', title: 'Biometria Facial 2026', desc: 'Reconhecimento facial!', url: 'biometria-facial-2026' },
  { img: 'hero_fechadura_airbnb.png', title: 'Fechadura Airbnb', desc: 'Perfeito para Airbnb!', url: 'guia-airbnb-fechaduras-biometricas-2026' },
  { img: 'fechadura_litoral_luxo_2026_titanium_pvd_1774147639507.png', title: 'Fechadura Litoral', desc: 'Resistente à maresia!', url: 'fechadura-digital-litoral' },
  { img: 'fechadura_externa_luxo_2026_ip65_1774147330927.png', title: 'Fechadura Externa IP65', desc: 'À prova d\'água!', url: 'fechadura-externa-ip65' },
  { img: 'fechadura-portao-externo-ip65.png', title: 'Fechadura Portão', desc: 'Para portão externo!', url: 'fechadura-portao-externo' },
  { img: 'hero_portao_eletronico_1774200755410.png', title: 'Portão Eletrônico', desc: 'Automação completa!', url: 'portao-eletronico' },
  { img: 'olho-magico-digital.png', title: 'Olho Mágico Digital', desc: 'Ver sem abrir!', url: 'olho-magico-digital' }
];

async function post() {
  console.log('📍 Posting lote 4...');
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
  console.log('🎉 Lote 4 completo!');
  await br.close();
}

post().catch(e => console.log(`❌ ${e.message}`));