import { chromium } from 'playwright';
const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';

// LOTE 11: FUNDO DE FUNIL - Alta Intenção de Compra
// Marcas, modelos, preços, comparações diretas
const LOTE11 = [
  { img: 'review_intelbras_ifr7000_2026.png', title: 'Intelbras IFR7000 Review Completo Preço Onde Comprar 2026', desc: 'Review completo IFR7000! Preço e onde comprar! fe.ch/intelbras-ifr-7000', url: 'intelbras-ifr-7000' },
  { img: 'review_yale_ymf40a_2026.png', title: 'Yale YMF40A Review Preço Comparison Samsung 2026', desc: 'Yale vs Samsung! Review completo! fe.ch/yale-ymf-40a', url: 'yale-ymf-40a' },
  { img: 'review_samsung_shp_dp609_2026.png', title: 'Samsung SHP-DP609 Review Preço Melhores Preços 2026', desc: 'Samsung review! Melhores preços! fe.ch/samsung-shp-dp609', url: 'samsung-shp-dp609' },
  { img: 'review_pado_fds50_2026.png', title: 'Pado FDS50 Review Preço Online 2026', desc: 'Pado review! Preço online! fe.ch/pado-fds-50', url: 'pado-fds-50' },
  { img: 'review_intelbras_fr400_vidro_2026.png', title: 'Intelbras FR400 Porta Vidro Review Preço 2026', desc: 'FR400 para vidro! Review! fe.ch/review-intelbras-fr-400-porta-vidro', url: 'review-intelbras-fr-400-porta-vidro' },
  { img: 'comparativo_ezviz_vs_yale.png', title: 'Ezviz vs Yale Comparativo Review Melhor Preço 2026', desc: 'Ezviz vs Yale! Qual melhor? fe.ch/comparativos/comparativo-ezviz-dp2c-vs-yale-real-view', url: 'comparativos/comparativo-ezviz-dp2c-vs-yale-real-view' },
  { img: 'comparativo_ifr7000_vs_mfr7001.png', title: 'Intelbras IFR7000 vs MFR7001 Comparativo Preço 2026', desc: 'IFR7000 vs MFR7001! fe.ch/comparativos/comparativo-ifr7000-vs-mfr7001', url: 'comparativos/comparativo-ifr7000-vs-mfr7001' },
  { img: 'comparativo_elsys_vs_intelbras.png', title: 'Elsys vs Intelbras Comparativo Preço Melhor 2026', desc: 'Elsys vs Intelbras! fe.ch/comparativos/comparativo-elsys-esf-de4000b-vs-intelbras-ifr-3000', url: 'comparativos/comparativo-elsys-esf-de4000b-vs-intelbras-ifr-3000' },
  { img: 'hero_mfr7001_vs_dp609_2026.png', title: 'MFR7001 vs Samsung DP609 Comparativo Review 2026', desc: 'MFR7001 vs DP609! fe.ch/comparativos/philips-ddl702-vs-samsung-shp-dp609', url: 'comparativos/philips-ddl702-vs-samsung-shp-dp609' },
  { img: 'fechadura_fr101_vs_ydf40_1776309112451.png', title: 'Intelbras FR101 vs Yale YDF40 Comparativo Preço 2026', desc: 'FR101 vs YDF40! fe.ch/comparativos/intelbras-fr-101-vs-yale-ydf-40', url: 'comparativos/intelbras-fr-101-vs-yale-ydf-40' }
];

// LOTE 12: FUNDO DE FUNIL - Reviews específicos
const LOTE12 = [
  { img: 'nova_digital_hero_fidelity_1775724344787.png', title: 'Nova Digital Smart Lock Review Preço Online 2026', desc: 'Nova Digital review! fe.ch/reviews/novadigital-sl-lumi', url: 'reviews/novadigital-sl-lumi' },
  { img: 'ezviz-dl05-info.png', title: 'Ezviz DL05 Review Preço Especificações Completas 2026', desc: 'Ezviz DL05! fe.ch/reviews/ezviz-dl05', url: 'reviews/ezviz-dl05' },
  { img: 'ezviz_dl05_hero_fidelity_1775724360053.png', title: 'Ezviz DL05 Review Completo Wi-Fi App 2026', desc: 'Ezviz DL05! fe.ch/reviews/ezviz-dl05', url: 'reviews/ezviz-dl05' },
  { img: 'ifr_7000_hero_fidelity_1775724316169.png', title: 'Intelbras IFR7000 Review Wi-Fi App Biométrico 2026', desc: 'IFR7000! fe.ch/reviews/intelbras-ifr-7000', url: 'reviews/intelbras-ifr-7000' },
  { img: 'mfr_7001_hero_fidelity_1775724329968.png', title: 'Intelbras MFR7001 Review Facial 3D Preço 2026', desc: 'MFR7001! fe.ch/reviews/intelbras-mfr-7001', url: 'reviews/intelbras-mfr-7001' },
  { img: 'lock_embutir_sobrepor_1776309982470.png', title: 'Fechadura Embutir vs Sobrepor Qual Melhor Preço 2026', desc: 'Embutir vs Sobrepor! fe.ch/reviews/embutir-vs-sobrepor-analise-motor', url: 'reviews/embutir-vs-sobrepor-analise-motor' },
  { img: 'review_intelbras_fr400_vidro_1776308726623.png', title: 'Intelbras FR400 Vidro Review Especificações 2026', desc: 'FR400! fe.ch/reviews/review-intelbras-fr-400-porta-vidro', url: 'reviews/review-intelbras-fr-400-porta-vidro' },
  { img: 'espessura_vidro_fechadura_1776308714564.png', title: 'Espessura Vidro Fechadura Eletrônica Qual Usar 2026', desc: 'Guia técnico! fe.ch/guias/espessura-vidro-fechadura-eletronica', url: 'guias/espessura-vidro-fechadura-eletronica' },
  { img: 'instalacao_sem_furo_vidro_1776308580572.png', title: 'Instalação Fechadura Digital Porta Vidro Sem Furar Tutorial 2026', desc: 'Tutorial! fe.ch/guias/como-instalar-fechadura-digital-porta-vidro-sem-furar', url: 'guias/como-instalar-fechadura-digital-porta-vidro-sem-furar' },
  { img: 'fechadura_escritorio_clinica_vidro_1776308683153.png', title: 'Fechadura Digital Consultório Clínica Odontología Porto Vidro 2026', desc: 'Para clínica! fe.ch/guias/melhor-fechadura-biometrica-clinica-escritorio', url: 'guias/melhor-fechadura-biometrica-clinica-escritorio' }
];

async function postLote(loteNum) {
  const PINS = loteNum === 11 ? LOTE11 : LOTE12;
  console.log(`Postando Lote ${loteNum}: ${PINS.length} pins (fundo funil)...`);
  const br = await chromium.connectOverCDP('http://localhost:9222', { timeout: 10000 });
  const ctx = br.contexts ? (await br.contexts())[0] : await br.newContext();
  const pg = (await ctx.pages())[0] || await ctx.newPage();
  
  for (let i = 0; i < PINS.length; i++) {
    const p = PINS[i];
    console.log(`${i+1}/${PINS.length}: ${p.title.substring(0,50)}...`);
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
  console.log(`LOTE ${loteNum} COMPLETO!`);
  await br.close();
}

const loteNum = parseInt(process.argv[2] || '11');
postLote(loteNum);