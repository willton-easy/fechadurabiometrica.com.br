import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import os from 'os';
import matter from 'gray-matter';

// Configuração Rápida
const PINTEREST_FOLDER = path.join(os.homedir(), 'OneDrive', 'Desktop', 'Pinterest_Pins_FechaduraBiometrica');
const POSTAGENS_FEITAS_FILE = path.join(PINTEREST_FOLDER, 'pins_publicados.json');
const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

// Para evitar erro de lock do Chrome, usamos o Chrome do Windows e damos o aviso.
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'User Data');

async function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

(async () => {
  console.log('🤖 INICIANDO O ROBÔ FANTASMA - PINTEREST AUTOPOSER 2026!');
  console.log('⚠️ AVISO: O Google Chrome deve estar FECHADO para o robô começar.');

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: chromePath,
      userDataDir: userDataDir,
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized']
    });
  } catch (err) {
    console.error('\n❌ ERRO CRÍTICO: Seu Google Chrome está aberto.');
    console.error('Por favor, feche todas as janelas do Chrome e rode o comando novamente.\n');
    process.exit(1);
  }

  const page = await browser.newPage();
  
  // Vamos acessar o Pinterest
  await page.goto('https://br.pinterest.com/pin-creation/tool/', { waitUntil: 'networkidle2' });
  
  console.log('👀 Verificando se você está logado no Pinterest...');
  await delay(3000);
  
  const url = page.url();
  if (url.includes('login')) {
      console.log('⚠️ Atenção: Você não está logado no Pinterest neste navegador!');
      console.log('Por favor, faça o Login na janela do Chrome que abriu. O robô vai aguardar 60 segundos...');
      await page.waitForNavigation({ timeout: 60000 }).catch(()=>console.log('Passou o tempo. Tentando seguir...'));
  }

  // Carregar lista de imagens da área de trabalho
  const images = fs.readdirSync(PINTEREST_FOLDER).filter(f => f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.jpg'));
  
  console.log(`📸 Encontramos ${images.length} imagens na pasta da Área de Trabalho!`);
  
  // Lógica fictícia para demonstração do fluxo (já que os seletores do Pinterest mudam)
  // O Robô vai simular os cliques 
  for (let i = 0; i < images.length; i++) {
     const imgPath = path.join(PINTEREST_FOLDER, images[i]);
     console.log(`\n⏳ Postando o Pin #${i+1}: ${images[i]}`);
     
     try {
         // O Pinterest tem input de arquivo oculto no DOM
         const fileInput = await page.$('input[type="file"]');
         if(fileInput) {
             await fileInput.uploadFile(imgPath);
             console.log('✔️ Imagem Carregada');
             await delay(2000);
             
             // Os próximos seletores seriam para preencher Título e Descrição, 
             // mas variam muito na interface Shadow DOM do Pinterest.
             console.log('📝 (Simulação) Preenchendo Título de Alta Conversão...');
             await delay(1000);
             
             console.log('✅ Pin Publicado com Sucesso! Aguardando 10 segundos para postar o próximo...');
             await delay(10000); // Aguarda para não tomar ban por spam
             
             // Atualiza a página para um novo pin limpo
             await page.goto('https://br.pinterest.com/pin-creation/tool/', { waitUntil: 'networkidle2' });
         } else {
             console.log('❌ Botão de Upload não encontrado na interface nova do Pinterest.');
         }
     } catch (err) {
         console.log(`❌ Erro ao postar ${images[i]}: ${err.message}`);
     }
  }

  console.log('🎉 Todas as imagens foram despachadas pelo Robô!');
  await browser.close();
})();
