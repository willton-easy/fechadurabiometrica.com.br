import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import https from 'https';

const BASE_URL = 'https://fechadurabiometrica.com.br';
const TEMP_DIR = 'C:/Users/willt/OneDrive/Desktop/Meus Documentos/fechadurabiometrica.com.br/automation/temp_pins';

if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

const PINS = [
  {
    "title": "Cerca Elétrica Residencial: Guia Jurídico e Lei Brasileira 2026",
    "desc": "Cerca elétrica é crime? Conheça a lei brasileira, normas da ABNT e os requisitos de altura e voltagem para instalar com segurança e legalidade. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_cerca_eletrica_wifi_2026.png",
    "slug": "cerca-eletrica-residencial-e-crime-lei-brasileira",
    "amazon": "https://www.amazon.com.br/s?k=cerca+eletrica+wifi+kit&tag=willseg-20"
  },
  {
    "title": "Melhor Cerca Elétrica Residencial Wi-Fi 2026: Kit Completo",
    "desc": "Quer instalar cerca elétrica? Veja os melhores kits completos com central Wi-Fi de 2026. Proteção perimetral inteligente com alerta no celular e controle via app. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_cerca_eletrica_wifi_2026.png",
    "slug": "cerca-eletrica-residencial-wifi-kit-completo",
    "amazon": "https://www.amazon.com.br/s?k=central+cerca+eletrica+wifi+intelbras&tag=willseg-20"
  },
  {
    "title": "Coleira GPS vs AirTag para Pets: Qual a Melhor Escolha em 2026?",
    "desc": "Qual a melhor forma de rastrear seu pet? Comparamos a Coleira GPS sem mensalidade vs Apple AirTag. Veja qual o mais seguro para seu cachorro ou gato. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_rastreador_pet_airtag_2026.png",
    "slug": "coleira-gps-vs-airtag-para-pet-comparativo",
    "amazon": "https://www.amazon.com.br/s?k=coleira+gps+pet+sem+mensalidade&tag=willseg-20"
  },
  {
    "title": "Como a Tecnologia Ajuda Idosos que Moram Sozinhos em 2026",
    "desc": "A tecnologia salvando vidas. Conheça as melhores soluções para idosos que moram sozinhos: sensores de queda, botões de pânico e monitoramento remoto inteligente. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_tecnologia_idosos_2026.png",
    "slug": "como-a-tecnologia-protege-idosos-morando-sozinhos",
    "amazon": "https://www.amazon.com.br/s?k=botao+panico+idosos+wifi&tag=willseg-20"
  },
  {
    "title": "Como Automatizar o Registro de Água em Caso de Vazamento",
    "desc": "Saiba como automatizar o fechamento da água em sua casa. Tutorial completo para instalar válvula Wi-Fi integrada ao sensor de vazamento e evitar alagamentos. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_sensor_vazamento_agua_wifi_2026.png",
    "slug": "como-automatizar-registro-agua-vazamento-wifi",
    "amazon": "https://www.amazon.com.br/s?k=valvula+inteligente+wifi+agua&tag=willseg-20"
  },
  {
    "title": "Como Gerenciar seu Airbnb sem Obras ou Furos (Guia 2026)",
    "desc": "Facilite o check-in do seu Airbnb sem reformas. Conheça as melhores fechaduras digitais de sobrepor e adaptadores inteligentes para anfitriões em 2026. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/airbnb_manager_lock_tutorial_2026_1777424105803.png",
    "slug": "como-gerenciar-fechadura-airbnb-sem-furar",
    "amazon": "https://www.amazon.com.br/s?k=fechadura+digital+sobrepor+aluguel&tag=willseg-20"
  },
  {
    "title": "Como Instalar Rastreador Veicular Escondido: Guia de Instalação Segura",
    "desc": "Aprenda a instalar seu rastreador GPS de forma profissional e indetectável. Guia passo a passo para esconder o dispositivo no carro ou moto e evitar furtos. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_rastreador_veicular_escondido_2026.png",
    "slug": "como-instalar-rastreador-veicular-escondido-guia",
    "amazon": "https://www.amazon.com.br/s?k=rastreador+veicular+sem+mensalidade+4g&tag=willseg-20"
  },
  {
    "title": "Como Rastrear Filho pelo Celular em Tempo Real (Guia 2026)",
    "desc": "Paz de espírito para os pais! Conheça as melhores apps e gadgets para rastrear seu filho em tempo real em 2026. Segurança digital e física para sua família. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_rastrear_filho_gps_2026.png",
    "slug": "como-rastrear-filho-pelo-celular-gps-tempo-real",
    "amazon": "https://www.amazon.com.br/s?k=smartwatch+infantil+com+gps+e+camera&tag=willseg-20"
  },
  {
    "title": "Cortina Inteligente Wi-Fi: Vale a Pena Simular Presença para Segurança?",
    "desc": "Aumente a segurança da sua casa com cortinas e persianas inteligentes. Saiba como simular presença remotamente e afastar invasores durante suas viagens. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_cortina_inteligente_2026.png",
    "slug": "cortina-inteligente-wifi-simular-presenca-seguranca",
    "amazon": "https://www.amazon.com.br/s?k=motor+persiana+wifi+tuya&tag=willseg-20"
  },
  {
    "title": "O Futuro da Segurança Residencial: Tendências e IA para 2027",
    "desc": "Descubra o futuro da segurança residencial. IA preditiva, protocolo Matter e biometria sem contato: veja o que esperar da proteção de casas em 2027. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_futuro_seguranca_ia_2027.png",
    "slug": "futuro-seguranca-residencial-ia-tendencias-2027",
    "amazon": "https://www.amazon.com.br/s?k=fechadura+biometrica+facial+3d&tag=willseg-20"
  },
  {
    "title": "Iluminação Automática e Segurança: Como Dissuadir Invasores",
    "desc": "Proteja seu perímetro com luz! Aprenda como usar iluminação automática e refletores inteligentes para dissuadir invasores e aumentar a segurança da sua casa. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_iluminacao_inteligente_2026.png",
    "slug": "iluminacao-automatica-seguranca-dissuasao-luz-inteligente",
    "amazon": "https://www.amazon.com.br/s?k=refletor+led+com+sensor+de+presenca+wifi&tag=willseg-20"
  },
  {
    "title": "Melhor Câmera Pet Wi-Fi 2026 — Top 5 para Monitorar Cachorro e Gato",
    "desc": "As 5 melhores câmeras pet WiFi de 2026 para vigiar seu cachorro pelo celular. Visão noturna, petisco remoto e alerta de latido. Compare preços Amazon e ML. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_baby_security_2026.png",
    "slug": "melhor-camera-pet-wifi-2026",
    "amazon": "https://amzn.to/3PsVpZC"
  },
  {
    "title": "Melhor Rastreador Veicular sem Mensalidade em 2026: Guia Completo",
    "desc": "Descubra os melhores rastreadores veiculares sem mensalidade em 2026 com análise técnica, instalação segura e recomendação por perfil de uso. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_rastreador_veicular_escondido_2026.png",
    "slug": "melhor-rastreador-veicular-sem-mensalidade-2026",
    "amazon": "https://www.amazon.com.br/s?k=rastreador+veicular+sem+mensalidade&tag=willseg-20"
  },
  {
    "title": "Melhor Sensor de Inundação Wi-Fi 2026: Evite Alagamentos e Vazamentos",
    "desc": "Proteja sua casa contra vazamentos de água. Veja os melhores sensores de inundação Wi-Fi de 2026 para pia, banheiro e área de serviço com alerta no celular. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_sensor_inundacao_2026.png",
    "slug": "melhor-sensor-inundacao-vazamento-agua-wifi-2026",
    "amazon": "https://www.amazon.com.br/s?k=sensor+vazamento+agua+wifi+tuya&tag=willseg-20"
  },
  {
    "title": "As 5 Melhores Babás Eletrônicas Wi-Fi de 2026: Qual Câmera Vigia seu Bebê de Verdade?",
    "desc": "Vai ter bebê? Descubra as 5 melhores babás eletrônicas com câmera Wi-Fi de 2026. Review completo de Motorola, Intelbras e TakTark para um sono tranquilo. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero-baba-eletronica-2026.png",
    "slug": "melhores-babas-eletronicas-wifi-camera-2026",
    "amazon": "https://amzn.to/3PsVpZC"
  },
  {
    "title": "Câmera Veicular Dashcam: As 5 Melhores para Segurança no Trânsito 2026",
    "desc": "Qual a melhor dashcam para seu carro em 2026? Veja o ranking das 5 melhores câmeras veiculares com 4K, GPS e visão noturna para segurança e prova judicial. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_comparativo_dashcam_2026.png",
    "slug": "melhores-cameras-veiculares-dashcam-2026",
    "amazon": "https://www.amazon.com.br/s?k=dashcam+camera+veicular+4k+70mai&tag=willseg-20"
  },
  {
    "title": "Coleira GPS para Cachorro e Gato: As 5 Melhores sem Mensalidade 2026",
    "desc": "Qual a melhor coleira GPS para cachorro e gato? Veja o ranking de 2026 com os melhores rastreadores sem mensalidade, cerca virtual e bateria de longa duração. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_coleiras_gps_ranking_2026.png",
    "slug": "melhores-coleiras-gps-pet-sem-mensalidade-2026",
    "amazon": "https://www.amazon.com.br/s?k=coleira+gps+cachorro+gato&tag=willseg-20"
  },
  {
    "title": "Mini Câmera Espiã Wi-Fi: As 5 Mais Discretas e Seguras de 2026",
    "desc": "Procurando uma câmera escondida? Veja as 5 melhores mini câmeras espiãs Wi-Fi de 2026, indetectáveis e com acesso pelo celular para segurança da família. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/hero_camera_espia_discreta_2026.png",
    "slug": "melhores-mini-cameras-espias-discretas-2026",
    "amazon": "https://www.amazon.com.br/s?k=mini+camera+espia+wifi+escondida&tag=willseg-20"
  },
  {
    "title": "Trava de Segurança para Gavetas: As Melhores para Proteger Crianças 2026",
    "desc": "Evite acidentes domésticos! Conheça as melhores travas de segurança para gavetas, armários e portas de 2026. Guia completo de baby proofing para sua casa. #seguranca #tecnologia #casa2026",
    "img": "~/assets/images/artigos/travas-seguranca-gavetas-bebe.png",
    "slug": "melhores-travas-seguranca-gavetas-bebe-2026",
    "amazon": "https://www.amazon.com.br/s?k=trava+seguranca+gaveta+bebe+magnetica&tag=willseg-20"
  }
];

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const filePath = path.join(TEMP_DIR, filename);
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filePath);
      });
    }).on('error', reject);
  });
}

async function postPin(index) {
  if (index >= PINS.length) {
    console.log('✅ Todos os pins foram processados!');
    return;
  }
  const p = PINS[index];
  console.log(`📍 ${index+1}/${PINS.length}: ${p.title}...`);
  
  let localImgPath = '';
  try {
    if (p.img.startsWith('http')) {
      const ext = p.img.includes('jpg') ? 'jpg' : (p.img.includes('png') ? 'png' : 'webp');
      const filename = `${p.slug}.${ext}`;
      localImgPath = await downloadImage(p.img, filename);
    } else {
      localImgPath = p.img.replace('~', 'C:/Users/willt/OneDrive/Desktop/Meus Documentos/fechadurabiometrica.com.br/src');
    }

    const br = await chromium.connectOverCDP('http://localhost:9222');
    const ctx = (await br.contexts())[0] || await br.newContext();
    const pg = (await ctx.pages())[0] || await ctx.newPage();
    
    await pg.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'load', timeout: 60000 });
    await pg.waitForSelector('input[type="file"]', { timeout: 30000 });
    await pg.waitForTimeout(2000);
    
    // 1. Upload da Imagem
    const inp = await pg.$('input[type="file"]');
    if (inp) { 
      await inp.setInputFiles(localImgPath); 
      console.log(`   📤 Imagem enviada: ${path.basename(localImgPath)}`);
      await pg.waitForTimeout(6000);
    }
    
    // 2. Preencher Título
    console.log(`   ✍️ Preenchendo título...`);
    const titleSelector = 'input[placeholder="Adicione um título"], [aria-label="Adicione um título"]';
    await pg.waitForSelector(titleSelector, { state: 'visible', timeout: 15000 });
    await pg.fill(titleSelector, p.title);

    // 3. Preencher Descrição
    console.log(`   ✍️ Preenchendo descrição...`);
    const descSelector = '[contenteditable="true"], textarea[placeholder="Conte sobre o que é o seu Pin"]';
    await pg.waitForSelector(descSelector, { state: 'visible', timeout: 5000 });
    const fullDesc = `${p.desc}\n\n👉 Confira o guia completo aqui: ${BASE_URL}/${p.slug}`;
    await pg.fill(descSelector, fullDesc);

    // 4. Link de Destino
    console.log(`   🔗 Preenchendo link de destino...`);
    const destUrl = p.amazon && p.amazon.startsWith('http') ? p.amazon : `${BASE_URL}/${p.slug}`;
    const linkSelector = 'input[placeholder="Adicione um link de destino"], [aria-label="Adicione um link de destino"]';
    await pg.waitForSelector(linkSelector, { state: 'visible', timeout: 5000 });
    await pg.fill(linkSelector, destUrl);
    
    await pg.waitForTimeout(3000);
    console.log(`   ✅ Pin preparado com sucesso: ${p.title}`);
    console.log(`   🔗 Destino: ${destUrl}`);
    
    // 5. Publicar (Descomente se quiser automação total de clique)
    // const publishBtn = pg.getByRole('button', { name: /Publicar|Save|Publish|Criar/ });
    // await publishBtn.click();
    // await pg.waitForTimeout(5000);
    
    // await br.close();
  } catch (e) {
    console.log(`   ❌ Erro: ${e.message}.`);
  }
}

async function runAll() {
    for(let i=0; i < PINS.length; i++) {
        await postPin(i);
    }
}

const arg = process.argv[2];
if (arg === 'all') {
    runAll();
} else {
    postPin(parseInt(arg || '0'));
}
