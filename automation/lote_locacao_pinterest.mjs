import { chromium } from 'playwright';

const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Meus Documentos/fechadurabiometrica.com.br/src/assets/images';

const PINS = [
  { 
    img: 'apartamento_alugado_casa_inteligente_2026_hero_1777424062941.png', 
    title: 'Casa Inteligente em Aluguel: Automação sem Furos 2026', 
    desc: 'Mora de aluguel? Veja como automatizar sua casa sem furar paredes ou perder a caução. Guia Zero Furos 2026! #smarthome #aluguel #casainteligente', 
    url: '/guia-apartamento-alugado-casa-inteligente-2026' 
  },
  { 
    img: 'fechadura_sobrepor_aluguel_2026_list_1777424080296.png', 
    title: 'Top 7 Fechaduras de Sobrepor para Apartamento Alugado', 
    desc: 'Praticidade sem chaves! Conheça as melhores fechaduras de sobrepor que preservam sua porta. #fechaduradigital #segurança #apartamento', 
    url: '/melhores-fechaduras-digital-sobrepor-aluguel-2026' 
  },
  { 
    img: 'yale_connect_retrofit_review_2026_1777424092816.png', 
    title: 'Yale Connect Retrofit: A Fechadura Invisível para Aluguel', 
    desc: 'Ninguém sabe que você tem uma fechadura smart! Review completo da Yale Connect Retrofit. #yale #retrofit #segurançaresidencial', 
    url: '/yale-connect-retrofit-review-aluguel' 
  },
  { 
    img: 'airbnb_manager_lock_tutorial_2026_1777424105803.png', 
    title: 'Gestão de Airbnb: Acesso Remoto sem Obras 2026', 
    desc: 'Seja um Superhost! Como automatizar o check-in do seu Airbnb sem trocar a fechadura externa. #airbnb #anfitrião #checkinremoto', 
    url: '/como-gerenciar-fechadura-airbnb-sem-furar' 
  },
  { 
    img: 'olho_magico_digital_wifi_2026_1777424119824.png', 
    title: 'Olho Mágico Digital Wi-Fi: Veja quem bate pelo Celular', 
    desc: 'Transforme seu olho mágico em uma câmera de segurança HD sem furos extras. #segurança #apartamento #olhomágico', 
    url: '/olho-magico-digital-wifi-apartamento-sem-furo' 
  },
  { 
    img: 'cameras_wifi_sem_furo_interna_2026_1777424136886.png', 
    title: 'Melhores Câmeras Wi-Fi Internas sem Furo 2026', 
    desc: 'Segurança interna portátil e potente. Ideal para quem mora sozinho ou tem pets. #cameras #vigilancia #smarthome', 
    url: '/melhores-cameras-wifi-internas-sem-furo' 
  },
  { 
    img: 'seguranca_mulheres_moram_sozinhas_2026_1777424152169.png', 
    title: 'Segurança Feminina: 10 Gadgets para Quem Mora Sozinha', 
    desc: 'Paz de espírito com tecnologia. Proteja seu espaço com as melhores soluções de 2026. #segurançafeminina #morarsozinha #girlpower', 
    url: '/seguranca-mulheres-moram-sozinhas-tecnologia-2026' 
  },
  { 
    img: 'sensor_porta_janela_sem_furo_2026_1777424166619.png', 
    title: 'Como Instalar Sensores de Porta sem Furar nada', 
    desc: 'Tutorial DIY: Segurança magnética com instalação adesiva instantânea. #diy #segurança #casaconectada', 
    url: '/como-instalar-sensor-porta-janela-sem-furar' 
  }
];

async function postPin(index) {
  if (index >= PINS.length) return;
  const p = PINS[index];
  console.log(`📍 ${index+1}/${PINS.length}: ${p.title}...`);
  
  // Aqui assumimos que o usuário tem um navegador rodando com CDP na porta 9222
  // ou adaptamos para rodar via Playwright direto se as credenciais estiverem salvas.
  try {
    const br = await chromium.connectOverCDP('http://localhost:9222');
    const ctx = (await br.contexts())[0] || await br.newContext();
    const pg = (await ctx.pages())[0] || await ctx.newPage();
    
    await pg.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'networkidle' });
    await pg.waitForTimeout(3000);
    
    const inp = await pg.$('input[type="file"]');
    if (inp) { 
      await inp.setInputFiles(`${SOURCE_DIR}/${p.img}`); 
      await pg.waitForTimeout(5000);
    }
    
    const txts = await pg.locator('textarea').all();
    if(txts[0]) await txts[0].fill(p.title);
    if(txts[1]) await txts[1].fill(p.desc + ' https://fechadurabiometrica.com.br' + p.url);
    
    const inputs = await pg.locator('input').all();
    for (const inp of inputs) {
      try {
        const val = await inp.inputValue();
        if (val === '') {
          await inp.fill('https://fechadurabiometrica.com.br' + p.url);
          break;
        }
      } catch {}
    }
    
    await pg.waitForTimeout(2000);
    console.log(`   ✅ Pronto para publicar: ${p.title}`);
    
    // Opcional: clicar em publicar
    // const btn = await pg.getByRole('button', { name: /Publicar|Save|Publish|Criar/ });
    // await btn.click();
    
    await br.close();
  } catch (e) {
    console.log(`   ❌ Erro: ${e.message}. Certifique-se que o Chrome está aberto com --remote-debugging-port=9222`);
  }
}

const idx = parseInt(process.argv[2] || '0');
postPin(idx);
