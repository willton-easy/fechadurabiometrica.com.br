import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIRS = [
  'src/content/guias',
  'src/content/reviews',
  'src/content/comparativos'
];

const URL_BASE = 'https://fechadurabiometrica.com.br';
const OUTPUT_FILE = 'output_pinterest_pins.txt';

function extrairMetadados() {
  const pastasBase = CONTENT_DIRS.map(d => path.join(process.cwd(), d));
  const pinData = [];

  for (let i = 0; i < pastasBase.length; i++) {
    const dirPath = pastasBase[i];
    const category = CONTENT_DIRS[i].split('/').pop();
    
    if (fs.existsSync(dirPath)) {
      const arquivos = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
      
      arquivos.forEach(arquivo => {
        const filePath = path.join(dirPath, arquivo);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        // Formatar Título Principal
        const tituloPost = data.title || arquivo;
        const slug = arquivo.replace('.mdx', '').replace('.md', '');
        const postUrl = `${URL_BASE}/${category}/${slug}`;

        // Estratégia Híbrida - Pin 1: Lifestyle / Autoridade
        pinData.push(`
=========================================
🟢 PIN DE LIFESTYLE / AUTORIDADE
=========================================
📌 Título Exato: Porta Elegante: ${tituloPost}
📝 Descrição Estratégica: Transforme a segurança da sua casa com estilo. Aprenda tudo sobre a ${tituloPost} no nosso blog especializado em fechaduras biométricas. Pare de usar chaves e viva no futuro em 2026! 🔒✨
🏷️ Tags Quentes: #FechaduraDigital #SmartHome #Arquitetura #CasaInteligente #${slug}
🌐 Link Original: ${postUrl}
`);

        // Estratégia Híbrida - Pin 2: Review/Afiliados
        if (category === 'reviews' || data.ratingValue) {
          pinData.push(`
=========================================
🟠 PIN FOCADO EM VENDAS / REVIEW (Tráfego de Fundo de Funil)
=========================================
📌 Título Exato: Review Honesto da ${tituloPost}
📝 Descrição Estratégica: Vale a pena comprar essa fechadura? 🤔 Eu fiz a análise completa que vai salvar o seu bolso e proteger a sua porta de vidro ou madeira. Veja os prós, contras e o preço atualizado!
🏷️ Tags Quentes: #ReviewFechadura #Decoracao #Desconto #${slug}
🌐 Link Original: ${postUrl}
          `);
        }
      });
    }
  }

  // Salvar no arquivo final
  fs.writeFileSync(path.join(process.cwd(), OUTPUT_FILE), pinData.join('\n'));
  console.log(`🚀 Máquina de Pins executada com Sucesso!`);
  console.log(`-> ${pinData.length} ideias de Pins geradas e salvas em ${OUTPUT_FILE}`);
}

extrairMetadados();
