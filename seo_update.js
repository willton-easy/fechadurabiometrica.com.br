import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetArticlePath = 'melhor-fechadura-eletronica-airbnb-temporada';

function getFiles(dir, files = []) {
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath, files);
        } else if (fullPath.endsWith('.md')) {
            files.push(fullPath);
        }
    }
    return files;
}

const contentDir = path.join(__dirname, 'src', 'content');
let allFiles = getFiles(contentDir);

// Filter out the new article so we don't modify its date or crosslink to itself
const oldFiles = allFiles.filter(f => !f.includes(targetArticlePath));

const today = new Date('2026-04-04T12:00:00Z');

oldFiles.sort((a, b) => b.localeCompare(a));

oldFiles.forEach((file, index) => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // 1. DISPERSE DATE
    const publishDate = new Date(today);
    publishDate.setDate(publishDate.getDate() - Math.floor(index * 1.2));
    const dateString = publishDate.toISOString().split('T')[0];
    
    content = content.replace(/publishDate:\s*[^\r\n]+/, `publishDate: ${dateString}`);

    //  INVERTING log order so we start from oldest if needed, but 1.2 * index is fine
    
    // 2. INJECT CTA into the top 15 files
    if (index < 15 && !content.includes(targetArticlePath)) {
        const cta = `\n\n> [!TIP]\n> **Vai alugar seu imóvel na praia?** Veja também nosso novo [Guia Definitivo de Fechaduras Eletrônicas para o seu Airbnb](/guias/melhor-fechadura-eletronica-airbnb-temporada).\n\n`;
        
        if (content.includes('## Conclusão')) {
            content = content.replace('## Conclusão', cta + '## Conclusão');
        } else if (content.includes('## O Veredito Final')) {
            content = content.replace('## O Veredito Final', cta + '## O Veredito Final');
        } else if (content.includes('## O Veredito')) {
             content = content.replace('## O Veredito', cta + '## O Veredito');
        } else {
            content = content + cta;
        }
    }

    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated ${path.basename(file)} | Date -> ${dateString} | Injetado CTA? ${index < 15 ? 'Sim' : 'Não'}`);
});

console.log("All files processed.");
