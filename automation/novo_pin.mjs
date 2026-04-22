import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_DIR = 'C:/Users/willt/OneDrive/Desktop/Meus Documentos/fechadurabiometrica.com.br';

// Listar arquivos recursivamente
function listFiles(dir, files = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      listFiles(fullPath, files);
    } else if (item.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Gerar título clickbait baseado no SEO
function generateTitle(title) {
  const year = new Date().getFullYear();
  
  const patterns = [
    `DESCUBRA: ${title}`,
    `${title} - O Guia Completo ${year}`,
    `O que ninguém te conta sobre ${title}`,
    `GUIA COMPLETO: ${title}`,
    `${title}: A Verdade que os Vendedores Escondem`,
    `TUDO sobre ${title} em ${year}`,
    `${title} - Review Completo e Comparativo`,
    `QUAL A MELHOR ${title.split(' ').slice(-2).join(' ')}?`
  ];
  
  return patterns[Math.floor(Math.random() * patterns.length)];
}

// Gerar descrição vendedora
function generateDesc(title, url) {
  const year = new Date().getFullYear();
  
  const descs = [
    `Você NÃO pode comprar sem ler isso primeiro!\n\n${title}.\n\nSalve para depois! fe.ch/${url}`,
    `ATENÇÃO: Se você está pensando em comprar, PRECISA ver isto!\n\nReview completo + comparativo + melhores preços.\n\nClique agora! fe.ch/${url}`,
    `Essa análise vai te economizar R$500+!\n\n${title} comparado em detalhes.\n\nSem enrolação! fe.ch/${url}`,
    `Os vendedores NÃO querem que você saiba isso!\n\nComparamos os melhores modelos.\n\nResultado? Clique e descubra! fe.ch/${url}`,
    `GUIA DEFINITIVO ${year}!\n\n${title} - Tudo que você precisa saber.\n\nLeia antes de comprar! fe.ch/${url}`
  ];
  
  return descs[Math.floor(Math.random() * descs.length)];
}

// Main
async function main() {
  const slug = process.argv[2];
  
  if (!slug) {
    console.log('\n📌 USO: node novo_pin.mjs [slug-artigo]');
    console.log('Exemplo: node novo_pin.mjs dossie-seguranca\n');
    return;
  }
  
  console.log('\n🔍 Preparando pin...\n');
  
  // Procurar artigo
  const contentDir = path.join(BASE_DIR, 'src/content');
  const files = listFiles(contentDir);
  const articleFile = files.find(f => f.toLowerCase().includes(slug.toLowerCase()));
  
  if (!articleFile) {
    console.log(`❌ Artigo "${slug}" não encontrado!`);
    return;
  }
  
  const content = fs.readFileSync(articleFile, 'utf-8');
  const titleMatch = content.match(/title:\s*["'](.+?)["']/);
  const imageMatch = content.match(/image:\s*["'](.+?)["']/);
  
  if (!titleMatch) {
    console.log('❌ Título não encontrado no frontmatter!');
    return;
  }
  
  const articleTitle = titleMatch[1];
  const articleSlug = path.basename(articleFile, '.mdx');
  
  // Procurar imagem
  let image = null;
  if (imageMatch) {
    const imgPath = imageMatch[1].replace('~/', '');
    const publicDir = path.join(BASE_DIR, 'public');
    const assetsDir = path.join(BASE_DIR, 'src/assets/images');
    
    image = path.join(publicDir, imgPath);
    if (!fs.existsSync(image)) {
      image = path.join(assetsDir, path.basename(imgPath));
    }
    if (!fs.existsSync(image)) {
      image = null;
    }
  }
  
  const pinTitle = generateTitle(articleTitle);
  const pinDesc = generateDesc(articleTitle, articleSlug);
  
  console.log('📝 ARTIGO:', articleTitle);
  console.log('\n📝 TÍTULO:', pinTitle);
  console.log('\n📝 DESCRIÇÃO:');
  pinDesc.split('\n').forEach(l => console.log('  ' + l));
  console.log('\n🖼️ IMAGEM:', image ? path.basename(image) : 'NÃO ENCONTRADA');
  console.log('🔗 LINK:', `fe.ch/${articleSlug}`);
  console.log('\n---\n');
  
  if (!image) {
    console.log('❌ Imagem não encontrada!');
    return;
  }
  
  const br = await chromium.connectOverCDP('http://localhost:9222', { timeout: 10000 });
  const ctx = br.contexts ? (await br.contexts())[0] : await br.newContext();
  const pg = (await ctx.pages())[0] || await ctx.newPage();
  
  try {
    console.log('📍 Postando...\n');
    await pg.goto('https://www.pinterest.com/pin-builder/', { timeout: 15000 });
    await pg.waitForSelector('input[type="file"]', { timeout: 10000 });
    await (await pg.$('input[type="file"]')).setInputFiles(image);
    await pg.waitForTimeout(2500);
    
    const txts = await pg.$$('textarea');
    if(txts[0]) await txts[0].fill(pinTitle);
    if(txts[1]) await txts[1].fill(pinDesc);
    
    const saveBtn = await pg.$('button:has-text("Salvar"), button:has-text("Publicar"), button:has-text("Criar"), button:has-text("Save")');
    if (saveBtn) await saveBtn.click();
    await pg.waitForTimeout(2500);
    
    console.log('✅ PIN POSTADO!');
    console.log(`🔗 fe.ch/${articleSlug}`);
  } catch(e) {
    console.log(`❌ ERRO: ${e.message}`);
  }
  await br.close();
}

main().catch(console.error);