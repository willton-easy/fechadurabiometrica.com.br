/**
 * PINTEREST AUTOPOSTER - FechaduraBiometrica.com.br
 * Conecta ao Google Chrome local (já logado no Pinterest)
 * e posta os Pins automaticamente com imagens + textos prontos.
 * 
 * COMO USAR:
 * 1. Feche o Google Chrome
 * 2. Rode: node pinterest_autoposter.mjs
 */

import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import os from 'os';

// =====================================================
// CONFIGURAÇÕES
// =====================================================
const PINS_FOLDER = path.join(os.homedir(), 'OneDrive', 'Desktop', 'Pinterest_Pins_FechaduraBiometrica');
const LOG_FILE = path.join(PINS_FOLDER, 'pins_publicados.json');

// Caminho do Chrome (detecta automaticamente)
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  path.join(os.homedir(), 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'),
];

// Perfil SEPARADO para o Puppeteer (não conflita com o Chrome aberto)
const CHROME_USER_DATA = path.join(os.homedir(), 'OneDrive', 'Desktop', 'Pinterest_Pins_FechaduraBiometrica', '.chrome_session');

// =====================================================
// DADOS DOS PINS (Título + Descrição + Link + Imagem)
// =====================================================
const PINS = [
  {
    image: 'hero_mfr7001_vs_dp609_2026.png',
    title: 'Philips DDL702 vs Samsung SHP-DP609: Qual Escolher?',
    description: 'Comparativo definitivo entre as duas fechaduras digitais mais sofisticadas do Brasil! Reconhecimento facial 3D, Push-Pull, Wi-Fi integrado. Clique e descubra a vencedora! #FechaduraDigital #SmartHome #CasaInteligente #Segurança2026',
    link: 'https://fechadurabiometrica.com.br/comparativos/philips-ddl702-vs-samsung-shp-dp609',
    board: 'Fechaduras Digitais'
  },
  {
    image: 'comparativo_ifr7000_vs_mfr7001.png',
    title: 'Intelbras IFR 3000 vs Yale YRD 256: Custo Benefício Real',
    description: 'Qual fecha melhor sem gastar uma fortuna? Analisamos a Intelbras IFR 3000 e a Yale YRD 256 lado a lado. Biometria, App, Wi-Fi e durabilidade testados! #Intelbras #Yale #FechaduraBiometrica',
    link: 'https://fechadurabiometrica.com.br/comparativos/intelbras-ifr-3000-vs-yale-yrd-256',
    board: 'Fechaduras Digitais'
  },
  {
    image: 'fechadura_alexa_homekit_1776309101594.png',
    title: 'Melhor Fechadura Digital Wi-Fi com App em 2026',
    description: 'Guia definitivo das melhores fechaduras inteligentes com Wi-Fi e controle pelo celular! Intelbras, Elsys, Positivo e mais. Pare de usar chaves em 2026! #WiFi #SmartLock #Alexa #GoogleHome',
    link: 'https://fechadurabiometrica.com.br/guias/melhor-fechadura-digital-wifi-app',
    board: 'Fechaduras Digitais'
  },
  {
    image: 'fechadura_escritorio_clinica_vidro_1776308683153.png',
    title: 'Fechadura Digital para Porta de Vidro: Guia Completo',
    description: 'Trabalha em clínica, escritório ou studio? Veja as melhores fechaduras digitais para portas de vidro com biometria e controle remoto! #PortaDeVidro #FechaduraVidro #Escritório',
    link: 'https://fechadurabiometrica.com.br/guias/fechadura-digital-porta-de-vidro',
    board: 'Fechaduras para Escritório'
  },
  {
    image: 'fechadura-portao-externo-ip65.png',
    title: 'Fechadura Digital à Prova de Água IP65: Funciona Mesmo?',
    description: 'Chuva, sol e maresia não são problema! Descubra as melhores fechaduras digitais IP65 para porta externa e portão. Testamos a EZVIZ, Ekaza e Kuanttum! #IP65 #FechaduraExterna #PortaoEletronico',
    link: 'https://fechadurabiometrica.com.br/guias/fechadura-digital-prova-agua-porta-externa',
    board: 'Segurança Residencial'
  },
  {
    image: 'hero_biometria_facial_2026.png',
    title: 'Reconhecimento Facial 3D em Fechaduras: O Futuro é Hoje',
    description: 'A tecnologia que abre sua porta só de olhar para ela! Descubra como funciona o reconhecimento facial 3D nas fechaduras digitais de 2026. Seguro, rápido e incrível! #BiometriaFacial #3D #Tecnologia',
    link: 'https://fechadurabiometrica.com.br/comparativos/biometria-facial-vs-impressao-digital',
    board: 'Tecnologia e Segurança'
  },
  {
    image: 'hero_fechadura_airbnb.png',
    title: 'Fechadura Digital para Airbnb: Gerencie de Qualquer Lugar',
    description: 'Chega de chave escondida! Automatize seu Airbnb com fechaduras inteligentes. Crie senhas temporárias e faça check-in remoto pelo celular em 2026! #Airbnb #AluguelPorTemporada #AutomaçãoAirbnb',
    link: 'https://fechadurabiometrica.com.br/guias/gestao-remota-biometrica-airbnb',
    board: 'Airbnb e Aluguel'
  },
  {
    image: 'fechadura_acessibilidade_idosos_segura_1774148017467.png',
    title: 'Fechadura Digital para Idosos: A Opção Mais Segura',
    description: 'Diga adeus ao medo de chaves perdidas! As melhores fechaduras digitais para idosos com biometria simples, display grande e fácil instalação em 2026. #Idosos #Acessibilidade #FechaduraSimples',
    link: 'https://fechadurabiometrica.com.br/guias/melhor-fechadura-digital-wifi-app',
    board: 'Segurança Residencial'
  },
  {
    image: 'pin_luxury_door_biometric_1776616648865.png',
    title: 'Fechadura Biométrica de Luxo: Top 5 de 2026',
    description: 'Para quem não abre mão de sofisticação! As 5 fechaduras biométricas mais luxuosas e tecnológicas disponíveis no Brasil em 2026. Samsung, Philips, Yale! #Luxo #Design #Premium #CasaInteligente',
    link: 'https://fechadurabiometrica.com.br/guias/melhor-fechadura-digital-wifi-app',
    board: 'Design e Luxo'
  },
  {
    image: 'comparativo_ezviz_vs_yale.png',
    title: 'O Que Fazer Se a Bateria da Fechadura Digital Acabar?',
    description: 'Não entre em pânico! Revelamos os 3 planos de emergência de toda fechadura digital quando a bateria acaba. Powerbank, bateria 9V e chave mecânica! #Bateria #Emergência #FechaduraDigital',
    link: 'https://fechadurabiometrica.com.br/guias/o-que-acontece-se-acabar-bateria-fechadura-digital',
    board: 'Dicas e Tutoriais'
  },
  {
    image: 'review_intelbras_ifr7000_2026.png',
    title: 'Intelbras FR 101: Vale a Pena Comprar em 2026?',
    description: 'A fechadura mais vendida do Brasil testada! Review completo da Intelbras FR 101: pontos fortes, limitações e quando vale e quando não vale a pena comprar. #Intelbras #FR101 #Review2026',
    link: 'https://fechadurabiometrica.com.br/reviews/intelbras-fr-101-vale-a-pena',
    board: 'Reviews Completos'
  },
  {
    image: 'review_samsung_shp_dp609_2026.png',
    title: 'Samsung SHP-DP609: A Melhor Push-Pull do Brasil?',
    description: 'Samsung SHP-DP609 em detalhes: biometria ultra-rápida, design Push-Pull premium e alarme integrado. Testamos tudo para você decidir com segurança! #Samsung #PushPull #BiometríaDigital',
    link: 'https://fechadurabiometrica.com.br/comparativos/philips-ddl702-vs-samsung-shp-dp609',
    board: 'Reviews Completos'
  },
  {
    image: 'hero_top10_fechaduras_2026.png',
    title: 'Top 10 Fechaduras Digitais para Comprar em 2026',
    description: 'Selecionamos as 10 melhores fechaduras digitais biométricas do mercado brasileiro em 2026! Comparamos preço, tecnologia e segurança para você. #Top10 #MelhoresFechaduras #ComprarFechadura',
    link: 'https://fechadurabiometrica.com.br/guias/melhor-fechadura-digital-wifi-app',
    board: 'Guias de Compra'
  },
  {
    image: 'pin_airbnb_smart_lock_1776616692276.png',
    title: 'Smart Lock Airbnb: Controle Total do Seu Imóvel',
    description: 'Gerencie check-in e check-out remotamente, crie senhas temporárias e monitore acessos em tempo real com fechaduras inteligentes para Airbnb! #SmartLock #Airbnb #ControleRemoto #Hospedagem',
    link: 'https://fechadurabiometrica.com.br/guias/gestao-remota-biometrica-airbnb',
    board: 'Airbnb e Aluguel'
  },
  {
    image: 'pin_facial_recognition_lock_1776616671223.png',
    title: 'Biometria Facial vs Digital: Qual é Mais Segura?',
    description: 'Reconhecimento facial 3D ou impressão digital? Analisamos as duas tecnologias de forma técnica e prática para ajudar você a escolher a mais segura! #Biometria #Segurança #Tecnologia2026',
    link: 'https://fechadurabiometrica.com.br/comparativos/biometria-facial-vs-impressao-digital',
    board: 'Tecnologia e Segurança'
  },
];

// =====================================================
// FUNÇÕES AUXILIARES
// =====================================================

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function loadLog() {
  if (fs.existsSync(LOG_FILE)) {
    return JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
  }
  return { posted: [] };
}

function saveLog(log) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
}

function findChrome() {
  for (const p of CHROME_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('Google Chrome não encontrado! Instale o Chrome e tente novamente.');
}

// =====================================================
// LÓGICA PRINCIPAL
// =====================================================
async function postPin(page, pin, imgFullPath) {
  console.log(`\n📌 Postando: "${pin.title}"`);
  
  // Navega para o criador de pins
  try {
    await page.goto('https://br.pinterest.com/pin-builder/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch(e) { /* continua mesmo com timeout */ }
  
  // Fecha qualquer popup/modal
  await page.keyboard.press('Escape');
  await delay(2000);
  
  // Aguarda o input de arquivo aparecer (selector correto do Pinterest 2026)
  let fileInput;
  try {
    fileInput = await page.waitForSelector('input[type="file"]', { timeout: 15000 });
    console.log('✅ Input de upload encontrado!');
  } catch(e) {
    // Tenta clicar na área de upload para revelar o input
    console.log('⚠️ Tentando ativar área de upload clicando nela...');
    try {
      const uploadDiv = await page.$('[class*="PinBuilderUpload"], [class*="uploadArea"], [class*="Upload"]');
      if (uploadDiv) await uploadDiv.click();
      await delay(2000);
      fileInput = await page.waitForSelector('input[type="file"]', { timeout: 10000 });
    } catch(e2) {
      throw new Error('Input de upload não encontrado após 25 segundos. Verifique se o Pinterest carregou corretamente.');
    }
  }
  
  // Upload da imagem
  await fileInput.uploadFile(imgFullPath);
  console.log('✅ Imagem carregada! Aguardando processamento...');
  await delay(4000);
  
  // Preenche o Título — aguarda o campo aparecer após upload
  let titleInput;
  try {
    titleInput = await page.waitForSelector(
      'textarea[id*="title"], textarea[placeholder*="tulo"], input[placeholder*="tulo"], [data-test-id*="title"]',
      { timeout: 10000 }
    );
  } catch(e) {
    // Tenta seletor genérico
    const textareas = await page.$$('textarea');
    if (textareas.length > 0) titleInput = textareas[0];
  }
  
  if (titleInput) {
    await titleInput.click({ clickCount: 3 });
    await titleInput.type(pin.title, { delay: 25 });
    console.log('✅ Título preenchido!');
  } else {
    console.log('⚠️ Campo de título não encontrado, continuando...');
  }
  await delay(500);
  
  // Preenche a Descrição
  let descInput;
  try {
    const textareas = await page.$$('textarea');
    // O segundo textarea geralmente é a descrição
    descInput = textareas.length > 1 ? textareas[1] : null;
  } catch(e) {}
  
  if (descInput) {
    await descInput.click({ clickCount: 3 });
    await descInput.type(pin.description, { delay: 15 });
    console.log('✅ Descrição preenchida!');
  }
  await delay(500);
  
  // Preenche o Link de Destino
  let linkInput;
  try {
    linkInput = await page.waitForSelector(
      'input[placeholder*="link"], input[placeholder*="estino"], input[type="url"]',
      { timeout: 5000 }
    );
  } catch(e) {}
  
  if (linkInput) {
    await linkInput.click({ clickCount: 3 });
    await linkInput.type(pin.link, { delay: 20 });
    console.log('✅ Link preenchido!');
  }
  await delay(1000);
  
  // Tira screenshot antes de publicar
  await page.screenshot({ path: path.join(PINS_FOLDER, `antes_publicar_${Date.now()}.png`) });
  
  // Publica — tenta múltiplos seletores
  const publishSelectors = [
    'button[data-test-id="board-dropdown-save-button"]',
    '[data-test-id="save-pin-button"]',
    'button[type="submit"]',
  ];
  
  let publicado = false;
  for (const sel of publishSelectors) {
    try {
      const btn = await page.$(sel);
      if (btn) {
        await btn.click();
        console.log('🚀 Pin PUBLICADO com sucesso!');
        await delay(4000);
        publicado = true;
        break;
      }
    } catch(e) {}
  }
  
  if (!publicado) {
    // Última tentativa por texto do botão
    const btns = await page.$$('button');
    for (const btn of btns) {
      const text = await btn.evaluate(el => el.innerText).catch(() => '');
      if (text && (text.toLowerCase().includes('publicar') || text.toLowerCase().includes('salvar') || text.toLowerCase().includes('publish'))) {
        await btn.click();
        console.log('🚀 Pin PUBLICADO por texto do botão!');
        await delay(4000);
        publicado = true;
        break;
      }
    }
  }
  
  if (!publicado) {
    await page.screenshot({ path: path.join(PINS_FOLDER, `erro_publicar_${Date.now()}.png`) });
    console.log('❌ Botão de publicar não encontrado. Screenshot salvo para análise.');
  }
  
  return publicado;
}

// =====================================================
// MAIN
// =====================================================
(async () => {
  console.log('🤖 ============================================');
  console.log('🤖  PINTEREST AUTOPOSTER - FechaduraBiom 2026');
  console.log('🤖 ============================================\n');
  
  const log = loadLog();
  const chromePath = findChrome();
  
  console.log(`✅ Chrome encontrado: ${chromePath}`);
  console.log(`📁 Pasta de Pins: ${PINS_FOLDER}`);
  console.log(`📋 Total de Pins a postar: ${PINS.length}\n`);
  
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: chromePath,
      userDataDir: CHROME_USER_DATA,
      headless: false,
      defaultViewport: null,
      args: [
        '--start-maximized',
        '--disable-blink-features=AutomationControlled',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-session-crashed-bubble',
        '--disable-infobars'
      ],
    });
  } catch (err) {
    console.error('\n❌ ERRO: Não foi possível iniciar o Chrome!');
    console.error('Verifique se o Google Chrome está FECHADO e tente novamente.');
    console.error(`Detalhe: ${err.message}`);
    process.exit(1);
  }
  
  const page = (await browser.pages())[0] || await browser.newPage();
  
  // Remove o banner de automação
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });
  
  // Verifica login
  console.log('👀 Verificando sessão do Pinterest...');
  try {
    await page.goto('https://br.pinterest.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch(e) {
    console.log('⚠️ Carregamento lento, aguardando mais 5s...');
    await delay(5000);
  }
  await delay(3000);
  
  const currentUrl = page.url();
  console.log(`📍 URL atual: ${currentUrl}`);
  
  if (currentUrl.includes('login') || currentUrl.includes('signup') || currentUrl.includes('accounts')) {
    console.log('\n⚠️ ATENÇÃO: Você não está logado no Pinterest!');
    console.log('Por favor, faça LOGIN na janela do Chrome que abriu.');
    console.log('O robô vai aguardar 90 segundos...\n');
    try {
      await page.goto('https://br.pinterest.com/login/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    } catch(e) { /* ignora timeout */ }
    await delay(90000); // 90 segundos para fazer login
    console.log('\n✅ Continuando após aguardar login...');
  } else {
    console.log('✅ Sessão do Pinterest ativa!');
  }
  
  console.log('🚀 Iniciando postagem dos Pins...\n');
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  
  for (const pin of PINS) {
    // Pula os já publicados
    if (log.posted.includes(pin.image)) {
      console.log(`⏭️ Já publicado anteriormente: ${pin.image}`);
      skipCount++;
      continue;
    }
    
    const imgPath = path.join(PINS_FOLDER, pin.image);
    if (!fs.existsSync(imgPath)) {
      console.log(`⚠️ Imagem não encontrada: ${imgPath}`);
      errorCount++;
      continue;
    }
    
    try {
      const success = await postPin(page, pin, imgPath);
      if (success) {
        log.posted.push(pin.image);
        saveLog(log);
        successCount++;
        console.log(`📊 Progresso: ${successCount} publicados, ${errorCount} erros\n`);
        // Aguarda entre pins para não ser bloqueado por spam
        const waitTime = 15000 + Math.floor(Math.random() * 10000); // 15-25 segundos
        console.log(`⏳ Aguardando ${Math.round(waitTime/1000)}s antes do próximo pin...`);
        await delay(waitTime);
      }
    } catch (err) {
      console.error(`❌ Erro ao postar ${pin.image}: ${err.message}`);
      errorCount++;
      await delay(5000);
    }
  }
  
  console.log('\n🎉 ============================================');
  console.log(`🎉  AUTOMAÇÃO CONCLUÍDA!`);
  console.log(`    ✅ Publicados com sucesso: ${successCount}`);
  console.log(`    ⏭️  Já existentes (pulados): ${skipCount}`);
  console.log(`    ❌ Erros: ${errorCount}`);
  console.log('🎉 ============================================');
  
  await browser.close();
})();
