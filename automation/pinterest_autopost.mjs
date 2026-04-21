import { chromium } from 'playwright';

const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';

const PINS = [
  { img: 'botao_panico_wifi_1776310024810.png', title: 'Botão de Pânico Wi-Fi: Segurança Emergencial 2026', desc: 'Botão de pânico com notificação instantânea. Conecta via Wi-Fi! #botãodepânico #segurança #smarthome', url: '/botao-panico-wifi' },
  { img: 'lock_alexa_google_1776310010162.png', title: 'Fechadura com Alexa e Google Home 2026', desc: 'Controle sua fechadura por voz! #alexa #googlehome #fechadurasmart', url: '/alexa-google-home' },
  { img: 'design_interiores_lock_1776309996605.png', title: 'Design de Interiores Smart Lock 2026', desc: 'Elegância e segurança para sua casa! #design #interiores #smarthome', url: '/design-interiores' },
  { img: 'lock_embutir_sobrepor_1776309982470.png', title: 'Fechadura Embutir vs Sobrepor', desc: 'Qual escolher? Guia completo 2026! #fechadura #instalfür', url: '/fechadura-embutir-sobrepor' },
  { img: 'rastreador_veicular_gps_1776309816476.png', title: 'Rastreador Veicular GPS', desc: 'Localize seu veículo em tempo real! #gps #rastreador', url: '/rastreador-gps' },
  { img: 'detector_fumaca_wifi_1776309799967.png', title: 'Detector de Fumaça Wi-Fi', desc: 'Alerta instantâneo no celular! #fumaça #segurança', url: '/detector-fumaca-wifi' },
  { img: 'sirene_wifi_alarme_2026_1776309771751.png', title: 'Sirene Wi-Fi Alarme 2026', desc: 'Proteção completa! #alarme #smarthome', url: '/sirene-wifi-alarme' },
  { img: 'fechadura_fr101_vs_ydf40_1776309112451.png', title: 'FR101 vs YDF40 Comparativo', desc: 'Qual melhor? Comparativo completo 2026! #intelbras #yale', url: '/fr101-vs-ydf40' },
  { img: 'fechadura_alexa_homekit_1776309101594.png', title: 'Fechadura Alexa HomeKit', desc: 'Apple HomeKit + Alexa! #homekit #alexa', url: '/alexa-homekit' },
  { img: 'fechadura_madeira_macica_1776309086726.png', title: 'Fechadura Porta Madeira', desc: 'Para porta de madeira maciça! #madeira #porta', url: '/fechadura-porta-madeira' },
  { img: 'pinterest_luxo_vidro_hero.png', title: 'A Única Fechadura Digital para Porta de Vidro que Não Quebra o Blindex (Top 10 2026)', desc: 'Acha que precisa furar seu vidro temperado? Cuidado! Furos amadores estilhaçam portas inteiras. Descubra como a tecnologia de "Fixação por Pressão" blindou as sacadas e clínicas de alto padrão em 2026. Review sincero das melhores opções do mercado (Intelbras, Tuya, Elsys e mais). Sem quebra-quebra, instalação em 30 min. 👇 Clique e veja o Guia Completo antes de comprar errado!', url: '/guias/melhor-fechadura-digital-porta-de-vidro' }
];

async function postPin(index) {
  const p = PINS[index];
  console.log(`📍 ${index+1}/10: ${p.title}...`);
  
  const br = await chromium.connectOverCDP('http://localhost:9222');
  const ctx = br.contexts ? (await br.contexts())[0] : await br.newContext();
  const pg = ctx.pages ? (await ctx.pages())[0] : await ctx.newPage();
  
  try {
    await pg.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'domcontentloaded' });
    await pg.waitForTimeout(4000);
    
    const inp = await pg.$('input[type="file"]');
    if (inp) { 
      await inp.setInputFiles(`${SOURCE_DIR}/${p.img}`); 
      console.log(`   📷 imagem enviada`);
      await pg.waitForTimeout(5000);
    }
    
    const txts = await pg.locator('textarea').all();
    if(txts[0]) { await txts[0].fill(p.title); console.log(`   📝 título ok`); }
    if(txts[1]) { await txts[1].fill(p.desc + ' https://fechadurabiometrica.com.br' + p.url); console.log(`   📝 descrição ok`); }
    
    const inputs = await pg.locator('input').all();
    for (const inp of inputs) {
      try {
        const val = await inp.inputValue();
        if (val === '') {
          await inp.fill('https://fechadurabiometrica.com.br' + p.url + '?utm_source=pinterest');
          console.log(`   🔗 link ok`);
          break;
        }
      } catch {}
    }
    
    await pg.waitForTimeout(3000);
    
    const buttons = await pg.locator('button').all();
    for (const btn of buttons) {
      try {
        const txt = await btn.textContent();
        if (txt && (txt.includes('Publicar') || txt.includes('Save') || txt.includes('Publish') || txt.includes('Criar'))) {
          await btn.click();
          console.log(`   ✅ PIN PUBLICADO!`);
          await pg.waitForTimeout(4000);
          break;
        }
      } catch {}
    }
  } catch (e) { console.log(`   ❌ ${e.message}`); }
  finally { await br.close().catch(() => {}); }
}

postPin(parseInt(process.argv[2] || '0'));