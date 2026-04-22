import { chromium } from 'playwright';
const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';

// LOTES SEM EMOJIS - TÍTULOS LONTAIL SEO
const LOTES = {
  8: [
    { img: 'hero_litoral_maresia_1774200779133.png', title: 'Fechadura Digital Resistente Maresia Litoral 2026', desc: 'Titanium PVD! Resistente à maresia! Para casas no litoral! fe.ch/fechadura-litoral-maresia', url: 'fechadura-litoral-maresia' },
    { img: 'fechadura_acessibilidade_idosos_segura_1774148017467.png', title: 'Fechadura Digital para Idosos Acessibilidade 2026', desc: 'Fácil de usar! Biometria para idosos! fe.ch/biometria-para-idosos-acessibilidade-e-seguranca', url: 'biometria-para-idosos-acessibilidade-e-seguranca' },
    { img: 'cofre_digital_biometrico_1774202142712.png', title: 'Cofre Digital Biométrico Segurança Máxima 2026', desc: 'Cofre smart com biometria! Segurança máxima! fe.ch/melhor-cofre-digital-biometrico-resenha', url: 'melhor-cofre-digital-biometrico-resenha' },
    { img: 'hero_baby_security_2026.png', title: 'Fechadura Digital Quarto Bebê Segurança Total 2026', desc: 'Proteja seu bebê! Fechadura smart com senha temporária! fe.ch/como-proteger-baba-eletronica-hacker', url: 'como-proteger-baba-eletronica-hacker' },
    { img: 'fechadura-portao-externo-ip65.png', title: 'Fechadura Eletrônica Portão Externo IP65 2026', desc: 'Para portão externo! IP65 à prova dágua! fe.ch/fechadura-eletronica-portao-externo', url: 'fechadura-eletronica-portao-externo' },
    { img: 'hero_mfr7001_facial_1774200730630.png', title: 'Intelbras MFR7001 Reconhecimento Facial 3D Review', desc: 'Reconhecimento facial 3D! Review completo Intelbras! fe.ch/intelbras-mfr-7001', url: 'intelbras-mfr-7001' },
    { img: 'hero_biometria_facial_2026.png', title: 'Fechadura Biometria Facial 3D Segurança 2026', desc: 'Reconhecimento facial 3D! Mais seguro que senha! fe.ch/biometria-facial-3d-fechadura-2026', url: 'biometria-facial-3d-fechadura-2026' },
    { img: 'hero_fechadura_airbnb.png', title: 'Fechadura Digital para Airbnb Gestão Remota 2026', desc: 'Senhas temporárias! Gestão remota! Perfeito para airbnb! fe.ch/guia-airbnb-fechaduras-biometricas-2026', url: 'guia-airbnb-fechaduras-biometricas-2026' },
    { img: 'olho_magico_wifi_1774202114037.png', title: 'Olho Mágico Digital Wi-Fi com Câmera 2026', desc: 'Ver sem abrir! Câmera wi-fi integrada! fe.ch/olho-magico-digital-wi-fi', url: 'olho-magico-digital-wi-fi' },
    { img: 'videoporteiro_wifi_1774202088975.png', title: 'Videoporteiro Wi-Fi Celular Review 2026', desc: 'Veja e fale pelo celular! Review completo! fe.ch/melhor-videoporteiro-wifi-2026', url: 'melhor-videoporteiro-wifi-2026' }
  ],
  9: [
    { img: 'interfone-wifi-2026.png', title: 'Interfone Wi-Fi Residencial Review 2026', desc: 'Comunicação via wi-fi! Celular! fe.ch/melhor-interfone-wifi-residencial-2026', url: 'melhor-interfone-wifi-residencial-2026' },
    { img: 'modulo-wifi-portao-hero.png', title: 'Módulo Wi-Fi Portão Eletrônico Abrir Celular 2026', desc: 'Abra portão pelo celular! fe.ch/melhor-modulo-wifi-portao-eletronico-2026', url: 'melhor-modulo-wifi-portao-eletronico-2026' },
    { img: 'lampada-sensor-presenca-hero.png', title: 'Lâmpada Inteligente Sensor Presença Wi-Fi 2026', desc: 'Acende sozinha! Economia de energia! fe.ch/melhor-lampada-sensor-presenca-2026', url: 'melhor-lampada-sensor-presenca-2026' },
    { img: 'tomada-inteligente-wifi-hero.png', title: 'Tomada Inteligente Wi-Fi Timer Controle App 2026', desc: 'Controle via app! Timer programável! fe.ch/melhor-tomada-inteligente-wifi-2026', url: 'melhor-tomada-inteligente-wifi-2026' },
    { img: 'botao_panico_wifi_1776310024810.png', title: 'Botão Pânico Wi-Fi Idosos Emergência 2026', desc: 'Alerta instantâneo! Até 5 contatos! fe.ch/melhor-botao-panico-idosos-wifi-2026', url: 'melhor-botao-panico-idosos-wifi-2026' },
    { img: 'detector_fumaca_wifi_1776309799967.png', title: 'Detector Fumaça Wi-Fi Gas Alerta Celular 2026', desc: 'Alerta no celular! Incêndio! fe.ch/melhor-detector-fumaca-gas-wifi-2026', url: 'melhor-detector-fumaca-gas-wifi-2026' },
    { img: 'sirene_wifi_alarme_2026_1776309771751.png', title: 'Sirene Wi-Fi Alarme Residencial Smart 2026', desc: 'Alarme completo via app! fe.ch/melhor-sirene-wifi-alarme-residencial-2026', url: 'melhor-sirene-wifi-alarme-residencial-2026' },
    { img: 'camera_pet_furbo_tapo_1776309786642.png', title: 'Câmera Pet Wi-Fi Furbo Tapo Petcube Review 2026', desc: 'Vejas eu pet! Furbo Tapo! fe.ch/furbo-vs-petcube-vs-tapo-camera-pet-2026', url: 'furbo-vs-petcube-vs-tapo-camera-pet-2026' },
    { img: 'rastreador_veicular_gps_1776309816476.png', title: 'Rastreador GPS Veicular Sem Mensalidade 2026', desc: 'Localize seu veículo! Sem mensalidade! fe.ch/melhor-rastreador-veicular-sem-mensalidade-2026', url: 'melhor-rastreador-veicular-sem-mensalidade-2026' },
    { img: 'hero_mfr7001_vs_dp609_2026.png', title: 'Comparativo Fechaduras Digitais 2026 Samsung Intelbras', desc: 'Samsung vs Intelbras! Qual melhor? fe.ch/comparativos/philips-ddl702-vs-samsung-shp-dp609', url: 'comparativos/philips-ddl702-vs-samsung-shp-dp609' }
  ],
  10: [
    { img: 'porta-pivotante-puxador.png', title: 'Fechadura Digital Porta Pivotante Puxador Design 2026', desc: 'Para porta pivotante! Design sofisticado! fe.ch/melhor-fechadura-digital-porta-pivotante-puxador', url: 'melhor-fechadura-digital-porta-pivotante-puxador' },
    { img: 'porta-correr-papagaio.png', title: 'Fechadura Digital Porta Correr Boca Papagaio 2026', desc: 'Para porta de correr! Sem complicação! fe.ch/melhor-fechadura-digital-porta-de-correr-bico-de-papagaio', url: 'melhor-fechadura-digital-porta-de-correr-bico-de-papagaio' },
    { img: 'porta-madeira-fina.png', title: 'Fechadura Digital Porta Madeira Fina Instalação 2026', desc: 'Para porta de madeira fina! Guia completo! fe.ch/fechadura-digital-porta-madeira-fina', url: 'fechadura-digital-porta-madeira-fina' },
    { img: 'papaiz-sl140-door.png', title: 'Papaiz SL140 Smart Lock Review Preço 2026', desc: 'Review completo! Bom e barato! fe.ch/papaiz-smart-lock', url: 'papaiz-smart-lock' },
    { img: 'fechadura-portao-externo-ip65.png', title: 'Fechadura Portão Externo IP65 Prova Água 2026', desc: 'IP65 à prova dágua! fe.ch/fechadura-digital-prova-agua-portao-externo', url: 'fechadura-digital-prova-agua-portao-externo' },
    { img: 'fechadura_externa_luxo_2026_ip65_1774147330927.png', title: 'Fechadura Externa Luxo IP65 Área Aberta 2026', desc: 'Luxo + resistência! fe.ch/fechadura-digital-prova-agua-porta-externa', url: 'fechadura-digital-prova-agua-porta-externa' },
    { img: 'fechadura_litoral_luxo_2026_titanium_pvd_1774147639507.png', title: 'Fechadura Litoral Titanium PVD Anti Maresia 2026', desc: 'Titanium PVD! fe.ch/fechadura-litoral-maresia', url: 'fechadura-litoral-maresia' },
    { img: 'fechadura_airbnb_moderno_2026_luxo_1774147950358.png', title: 'Fechadura Airbnb Moderna Luxo Gestão Remota Senhas 2026', desc: 'Perfeito para airbnb! fe.ch/guia-airbnb-fechaduras-biometricas-2026', url: 'guia-airbnb-fechaduras-biometricas-2026' },
    { img: 'hero_portao_eletronico_1774200755410.png', title: 'Portão Eletrônico Automação Residencial Smart 2026', desc: 'Automação completa! fe.ch/fechadura-eletronica-portao-externo', url: 'fechadura-eletronica-portao-externo' },
    { img: 'hero_top10_fechaduras_2026.png', title: 'Top 10 Melhores Fechaduras Digitais 2026', desc: 'As melhores de 2026! fe.ch/melhores-fechaduras-digitais-2026', url: 'melhores-fechaduras-digitais-2026' }
  ],
  11: [
    { img: 'rastreador_tecnologia_esp.png', title: 'Rastreador Veicular 2026 Tecnologia Zero Mensalidade', desc: 'Melhor tecnologia de rastreamento via satélite em 2026. Zero mensalidade! fe.ch/melhor-rastreador-veicular-sem-mensalidade-2026', url: 'melhor-rastreador-veicular-sem-mensalidade-2026' },
    { img: 'rastreador_app_premium.png', title: 'Rastreador Smart Celular 2026 Alerta Ignição App', desc: 'Controle total pelo celular! Alertas em tempo real. fe.ch/melhor-rastreador-veicular-sem-mensalidade-2026', url: 'melhor-rastreador-veicular-sem-mensalidade-2026' },
    { img: 'rastreador_instalacao_moto.png', title: 'Como Instalar Rastreador Moto Oculto Passo a Passo 2026', desc: 'Aprenda a esconder seu rastreador na moto de forma profissional. fe.ch/melhor-rastreador-veicular-sem-mensalidade-2026', url: 'melhor-rastreador-veicular-sem-mensalidade-2026' },
    { img: 'rastreador_veicular_gps_1776309816476.png', title: 'Melhor Rastreador Veicular Sem Mensalidade Guia 2026', desc: 'Ranking dos melhores rastreadores GPS sem mensalidade em 2026. fe.ch/melhor-rastreador-veicular-sem-mensalidade-2026', url: 'melhor-rastreador-veicular-sem-mensalidade-2026' }
  ]
};

async function postLote(loteNum) {
  const PINS = LOTES[loteNum];
  if (!PINS) {
    console.log(`Lote ${loteNum} não existe. Disponíveis: ${Object.keys(LOTES).join(', ')}`);
    return;
  }
  
  console.log(`Postando Lote ${loteNum}: ${PINS.length} pins (sem emojis)...`);
  const br = await chromium.connectOverCDP('http://localhost:9222', { timeout: 10000 });
  const ctx = br.contexts ? (await br.contexts())[0] : await br.newContext();
  const pg = (await ctx.pages())[0] || await ctx.newPage();
  
  for (let i = 0; i < PINS.length; i++) {
    const p = PINS[i];
    console.log(`${i+1}/${PINS.length}: ${p.title.substring(0,50)}...`);
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
      console.log(`   OK: fe.ch/${p.url}`);
    } catch(e) { console.log(`   ERRO: ${e.message}`); }
  }
  console.log(`LOTE ${loteNum} COMPLETO!`);
  await br.close();
}

const loteNum = parseInt(process.argv[2] || '8');
postLote(loteNum);