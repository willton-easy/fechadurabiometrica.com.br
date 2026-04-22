import { chromium } from 'playwright';
const SOURCE_DIR = 'C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica';

// LOTES OTIMIZADOS COMPLETOS
const LOTES = {
  // LOTE 7: Arquitetura, Decoração, Casa
  7: [
    { img: 'porta-pivotante-puxador.png', title: '🚪 Fechadura Porta Pivotante 2026', desc: 'Para porta pivotante! Design sofisticado! #porta #design #arquitetura', url: 'melhor-fechadura-digital-porta-pivotante-puxador' },
    { img: 'porta-correr-papagaio.png', title: '🚪 Fechadura Boca de Papagaio 2026', desc: 'Para porta de correr! Sem complicação! #papagaio #correr', url: 'melhor-fechadura-digital-porta-de-correr-bico-de-papagaio' },
    { img: 'porta-madeira-fina.png', title: '🪵 Fechadura Porta Madeira Fina', desc: 'Para porta de madeira fina! Guia completo! #madeira #porta', url: 'fechadura-digital-porta-madeira-fina' },
    { img: 'papaiz-sl140-door.png', title: '🔐 Papaiz SL140 Review', desc: 'Review completo! Bom e barato! #papaiz #review', url: 'papaiz-smart-lock' },
    { img: 'hero_mfr7001_vs_dp609_2026.png', title: '⚔️ MFR7001 vs Samsung DP609', desc: 'Qual melhor? Comparativo! #comparativo #intelbras #samsung', url: 'comparativos/philips-ddl702-vs-samsung-shp-dp609' },
    { img: 'hero_portao_eletronico_1774200755410.png', title: '⚡ Portão Eletrônico Smart', desc: 'Automação completa! Abra pelo celular! #portão #automação', url: 'fechadura-eletronica-portao-externo' },
    { img: 'fechadura-portao-externo-ip65.png', title: '💧 Fechadura Portão IP65', desc: 'À prova d\'água! Para portão externo! #ip65 #portão', url: 'fechadura-digital-prova-agua-portao-externo' },
    { img: 'fechadura_externa_luxo_2026_ip65_1774147330927.png', title: '💎 Fechadura Externa Luxo IP65', desc: 'Luxo + resistência! Para área externa! #luxo #ip65', url: 'fechadura-digital-prova-agua-porta-externa' },
    { img: 'fechadura_litoral_luxo_2026_titanium_pvd_1774147639507.png', title: '🏖️ Fechadura Litoral Titanium', desc: 'Titanium PVD! Anti-maresia! Para litoral! #litoral #titanium', url: 'fechadura-litoral-maresia' },
    { img: 'fechadura_airbnb_moderno_2026_luxo_1774147950358.png', title: '🏠 Fechadura Airbnb Luxo', desc: 'Perfeita para Airbnb! Gestão remota! #airbnb #luxo', url: 'guia-airbnb-fechaduras-biometricas-2026' }
  ],
  // LOTE 8: Segurança, Tecnologia
  8: [
    { img: 'hero_litoral_maresia_1774200779133.png', title: '🏖️ Fechadura Anti-Maresia 2026', desc: 'Resiste à maresia! Para casas no litoral! #litoral #maresia', url: 'fechadura-litoral-maresia' },
    { img: 'fechadura_acessibilidade_idosos_segura_1774148017467.png', title: '👴 Fechadura para Idosos 2026', desc: 'Acessibilidade! Fácil de usar! #idosos #acessibilidade', url: 'biometria-para-idosos-acessibilidade-e-seguranca' },
    { img: 'cofre_digital_biometrico_1774202142712.png', title: '🔒 Cofre Digital Biométrico', desc: 'Segurança máxima! Cofre smart! #cofre #segurança', url: 'melhor-cofre-digital-biometrico-resenha' },
    { img: 'hero_baby_security_2026.png', title: '👶 Segurança para Bebê 2026', desc: 'Proteja seu bebê! Fechadura smart! #bebê #segurança', url: 'como-proteger-baba-eletronica-hacker' },
    { img: 'fechadura-portao-externo-ip65.png', title: '🚗 Fechadura Portão Externo', desc: 'Para portão! Resistente! #portão #externo', url: 'fechadura-eletronica-portao-externo' },
    { img: 'hero_mfr7001_facial_1774200730630.png', title: '👤 MFR7001 Facial 3D', desc: 'Reconhecimento facial 3D! Intelbras! #facial #intelbras', url: 'intelbras-mfr-7001' },
    { img: 'hero_biometria_facial_2026.png', title: '👁️ Biometria 3D Fechadura', desc: 'Reconhecimento 3D! Mais seguro! #biometria #3d', url: 'biometria-facial-3d-fechadura-2026' },
    { img: 'hero_fechadura_airbnb.png', title: '🏠 Fechadura para Airbnb', desc: 'Gestão remota! Senhas temporárias! #airbnb #gestão', url: 'guia-airbnb-fechaduras-biometricas-2026' },
    { img: 'olho_magico_wifi_1774202114037.png', title: '👁️ Olho Mágico Wi-Fi', desc: 'Ver sem abrir! Câmera integrada! #olho #wifi', url: 'olho-magico-digital-wi-fi' },
    { img: 'videoporteiro_wifi_1774202088975.png', title: '📹 Videoporteiro Wi-Fi', desc: 'Veja e fale pelo celular! #videoporteiro', url: 'melhor-videoporteiro-wifi-2026' }
  ],
  // LOTE 9: Tecnologia IoT
  9: [
    { img: 'interfone-wifi-2026.png', title: '📞 Interfone Wi-Fi 2026', desc: 'Comunicação via Wi-Fi! celular! #interfone #wifi', url: 'melhor-interfone-wifi-residencial-2026' },
    { img: 'modulo-wifi-portao-hero.png', title: '🚗 Módulo Wi-Fi Portão', desc: 'Abra portão pelo celular! #portão #wifi', url: 'melhor-modulo-wifi-portao-eletronico-2026' },
    { img: 'lampada-sensor-presenca-hero.png', title: '💡 Lâmpada Sensor Presença', desc: 'Acende sozinha! Economia de energia! #sensor #lâmpada', url: 'melhor-lampada-sensor-presenca-2026' },
    { img: 'tomada-inteligente-wifi-hero.png', title: '🔌 Tomada Inteligente Wi-Fi', desc: 'Controle via app! Timer! #tomada #smart', url: 'melhor-tomada-inteligente-wifi-2026' },
    { img: 'botao_panico_wifi_1776310024810.png', title: '🚨 Botão Pânico Wi-Fi', desc: 'Alerta instantâneo! Até 5 contatos! #pânico #wifi', url: 'melhor-botao-panico-idosos-wifi-2026' },
    { img: 'detector_fumaca_wifi_1776309799967.png', title: '🔥 Detector Fumaça Wi-Fi', desc: 'Alerta no celular! Incêndio! #fumaça #segurança', url: 'melhor-detector-fumaca-gas-wifi-2026' },
    { img: 'sirene_wifi_alarme_2026_1776309771751.png', title: '🔔 Sirene Wi-Fi Alarme', desc: 'Alarme completo! Via app! #alarme #smarthome', url: 'melhor-sirene-wifi-alarme-residencial-2026' },
    { img: 'camera_pet_furbo_tapo_1776309786642.png', title: '🐶 Câmera Pet Wi-Fi', desc: 'Vejas eu pet! Furbo, Tapo! #pet #câmera', url: 'furbo-vs-petcube-vs-tapo-camera-pet-2026' },
    { img: 'rastreador_veicular_gps_1776309816476.png', title: '📍 Rastreador GPS Veicular', desc: 'Localize! Sem mensalidade! #gps #rastreador', url: 'melhor-rastreador-veicular-sem-mensalidade-2026' },
    { img: 'hero_mfr7001_vs_dp609_2026.png', title: '⚔️ Comparativo Fechaduras 2026', desc: 'Samsung vs Intelbras! Qual melhor? #comparativo', url: 'comparativos/philips-ddl702-vs-samsung-shp-dp609' }
  ]
};

async function postLote(loteNum) {
  const PINS = LOTES[loteNum];
  if (!PINS) {
    console.log(`Lote ${loteNum} não existe. Disponíveis: ${Object.keys(LOTES).join(', ')}`);
    return;
  }
  
  console.log(`📍 Postando Lote ${loteNum}: ${PINS.length} pins...`);
  const br = await chromium.connectOverCDP('http://localhost:9222', { timeout: 10000 });
  const ctx = br.contexts ? (await br.contexts())[0] : await br.newContext();
  const pg = (await ctx.pages())[0] || await ctx.newPage();
  
  for (let i = 0; i < PINS.length; i++) {
    const p = PINS[i];
    console.log(`📍 ${i+1}/${PINS.length}: ${p.title}...`);
    try {
      await pg.goto('https://www.pinterest.com/pin-builder/', { timeout: 15000 });
      await pg.waitForSelector('input[type="file"]', { timeout: 10000 });
      await (await pg.$('input[type="file"]')).setInputFiles(`${SOURCE_DIR}/${p.img}`);
      await pg.waitForTimeout(2500);
      const txts = await pg.$$('textarea');
      if(txts[0]) await txts[0].fill(p.title);
      if(txts[1]) await txts[1].fill(p.desc + ' 🔗 fe.ch/' + p.url);
      const saveBtn = await pg.$('button:has-text("Salvar"), button:has-text("Publicar"), button:has-text("Criar"), button:has-text("Save")');
      if (saveBtn) await saveBtn.click();
      await pg.waitForTimeout(2500);
      console.log(`   ✅ fe.ch/${p.url}`);
    } catch(e) { console.log(`   ❌ ${e.message}`); }
  }
  console.log(`🎉 LOTE ${loteNum} COMPLETO!`);
  await br.close();
}

const loteNum = parseInt(process.argv[2] || '7');
postLote(loteNum);