import { chromium } from 'playwright';
const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';

// Pins para Dossiê Segurança Biométrica 2026
const PINS = [
  { 
    img: 'hero_biometria_facial_2026.png', 
    title: 'Biometria Capacitiva Residencial Como Funciona Segurança 2026', 
    desc: 'Sensores capacitivos Yale IFR7000! Como funciona a segurança biométrica! fe.ch/dossie-seguranca-biometrica-residencial-2026', 
    url: 'dossie-seguranca-biometrica-residencial-2026' 
  },
  { 
    img: 'hero_biometric_dossier.jpg', 
    title: 'Reconhecimento Facial 3D Fechaduras 2026 Estruturada', 
    desc: 'Reconhecimento Facial de Luz Estruturada Philips Intelbras! fe.ch/dossie-seguranca-biometrica-residencial-2026', 
    url: 'dossie-seguranca-biometrica-residencial-2026' 
  },
  { 
    img: 'hero_mfr7001_facial_1774200730630.png', 
    title: 'Biometria de Veias Palma NIR Fechadura 2026', 
    desc: 'Palm Vein - Tecnologia NIR anti-fraude! fe.ch/dossie-seguranca-biometrica-residencial-2026', 
    url: 'dossie-seguranca-biometrica-residencial-2026' 
  },
  { 
    img: 'review_intelbras_ifr7000_2026.png', 
    title: 'Intelbras IFR7000 Review Capacitivo Preço 2026', 
    desc: 'IFR7000 capacitivo! Review completo! fe.ch/intelbras-ifr-7000', 
    url: 'intelbras-ifr-7000' 
  },
  { 
    img: 'review_yale_ymf40a_2026.png', 
    title: 'Yale YMF40A Review Capacitivo Preço Online 2026', 
    desc: 'Yale YMF40A! Review! fe.ch/yale-ymf-40a', 
    url: 'yale-ymf-40a' 
  },
  { 
    img: 'hero_biometria_facial_2026.png', 
    title: 'Sensores Capacitivos vs Ópticos vs 3D Comparativo 2026', 
    desc: 'Qual tecnologia é mais segura? Comparativo completo! fe.ch/dossie-seguranca-biometrica-residencial-2026', 
    url: 'dossie-seguranca-biometrica-residencial-2026' 
  },
  { 
    img: 'dossie_secury.jpg', 
    title: 'Criptografia Fechaduras Digitais Proteção Dados 2026', 
    desc: 'Seus dados biométricos estão seguros? fe.ch/dossie-seguranca-biometrica-residencial-2026', 
    url: 'dossie-seguranca-biometrica-residencial-2026' 
  },
  { 
    img: 'hero_biometric_dossier.jpg', 
    title: 'Fechadura Biométrica Alta Segurança 2026 Yale Philips', 
    desc: 'As melhores fechaduras biométricas de alta segurança! fe.ch/dossie-seguranca-biometrica-residencial-2026', 
    url: 'dossie-seguranca-biometrica-residencial-2026' 
  },
  { 
    img: 'comparativo_ezviz_vs_yale.png', 
    title: 'Yale vs Philips vs Intelbras Comparativo 2026', 
    desc: 'Qual marca é mais segura? Comparativo! fe.ch/dossie-seguranca-biometrica-residencial-2026', 
    url: 'dossie-seguranca-biometrica-residencial-2026' 
  },
  { 
    img: 'hero_mfr7001_vs_dp609_2026.png', 
    title: 'MFR7001 vs IFR7000 vs DP609 Comparativo 2026', 
    desc: 'Intelbras! Qual modelo é melhor? fe.ch/dossie-seguranca-biometrica-residencial-2026', 
    url: 'dossie-seguranca-biometrica-residencial-2026' 
  }
];

async function postDossie() {
  console.log('Preparando 10 pins para Dossie Segurança Biométrica...\n');
  const br = await chromium.connectOverCDP('http://localhost:9222', { timeout: 10000 });
  const ctx = br.contexts ? (await br.contexts())[0] : await br.newContext();
  const pg = (await ctx.pages())[0] || await ctx.newPage();
  
  for (let i = 0; i < PINS.length; i++) {
    const p = PINS[i];
    console.log(`${i+1}/${PINS.length}: ${p.title}...`);
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
  console.log('10 pins do Dossie postados!');
  await br.close();
}

postDossie().catch(console.error);