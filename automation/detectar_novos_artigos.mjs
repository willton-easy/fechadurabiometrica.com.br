# Pinterest Autopost - Automático
# Detecta artigos novos e prepara pins

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = 'C:/Users/willt/OneDrive/Desktop/Meus Documentos/fechadurabiometrica.com.br/src/content';
const PINS_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';

// Detectar artigos novos (últimas 24h)
function getNewArticles() {
  const articles = [];
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  
  const files = fs.readdirSync(CONTENT_DIR, { recursive: true })
    .filter(f => f.endsWith('.mdx'));
  
  for (const file of files) {
    const fullPath = path.join(CONTENT_DIR, file);
    const stats = fs.statSync(fullPath);
    
    if (now - stats.mtimeMs < oneDay) {
      // Extrair título do frontmatter
      const content = fs.readFileSync(fullPath, 'utf-8');
      const titleMatch = content.match(/title:\s*["'](.+?)["']/);
      const slug = path.basename(file, '.mdx');
      
      articles.push({
        slug,
        title: titleMatch ? titleMatch[1] : slug,
        file,
        path: fullPath
      });
    }
  }
  return articles;
}

// Gerar pins para artigo
function generatePin(article) {
  return {
    title: article.title,
    desc: `Guia completo! ${article.title}. fe.ch/${article.slug}`,
    url: article.slug,
    image: null // Procurar imagem relacionada
  };
}

// Main
async function main() {
  console.log('🔍 Detectando artigos novos...\n');
  
  const articles = getNewArticles();
  
  if (articles.length === 0) {
    console.log('❌ Nenhum artigo novo encontrado');
    return;
  }
  
  console.log(`✅ ${articles.length} artigo(s) novo(s) encontrado(s):\n`);
  
  for (const art of articles) {
    console.log(`📝 ${art.title}`);
    console.log(`   Slug: ${art.slug}`);
    console.log(`   Arquivo: ${art.file}`);
    
    // Procurar imagens relacionadas
    const possibleImages = [
      `${PINS_DIR}/${art.slug}.png`,
      `${PINS_DIR}/hero_${art.slug}.png`,
      `${PINS_DIR}/review_${art.slug}.png`
    ];
    
    const existingImage = possibleImages.find(f => fs.existsSync(f));
    if (existingImage) {
      console.log(`   🖼️ Imagem: ${path.basename(existingImage)}`);
    } else {
      console.log(`   ⚠️ Sem imagem encontrada`);
    }
    console.log('');
  }
  
  console.log('---');
  console.log('Execute no Antigravity:');
  console.log('node automation/pinterest_autopost.mjs');
}

main().catch(console.error);