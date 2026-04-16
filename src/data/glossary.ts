export interface GlossaryItem {
  title: string;
  description: string;
  icon?: string;
  category: 'Hardware' | 'Biometria' | 'Conexão' | 'Segurança' | 'Instalação' | 'Funções';
}

export const glossaryItems: GlossaryItem[] = [
  // --- BIOMETRIA E ACESSO ---
  {
    title: 'Biometria Capacitiva',
    description: 'Tecnologia que utiliza campos elétricos para mapear as digitais. É imune a réplicas de silicone ou fotos, sendo o padrão de segurança atual.',
    category: 'Biometria',
    icon: 'tabler:fingerprint',
  },
  {
    title: 'Biometria Semicondutora',
    description: 'Sensores que medem a bioimpedância do dedo. Identificam o fluxo sanguíneo e calor, garantindo que o dedo é de uma pessoa viva.',
    category: 'Biometria',
    icon: 'tabler:shield-check',
  },
  {
    title: 'Scanner Facial 3D (FaceID)',
    description: 'Projeção de milhares de pontos infravermelhos para criar um mapa volumétrico do rosto. Funciona até no escuro absoluto.',
    category: 'Biometria',
    icon: 'tabler:scan-eye',
  },
  {
    title: 'Reconhecimento de Íris',
    description: 'Mapeamento dos padrões únicos da íris ocular. É um dos métodos de autenticação mais caros e seguros do mundo.',
    category: 'Biometria',
    icon: 'tabler:eye',
  },
  {
    title: 'RFID (Radio Frequency Identification)',
    description: 'Identificação por radiofrequência sem contato. Utilizado em tags de chaveiro e cartões de proximidade de 13.56MHz.',
    category: 'Biometria',
    icon: 'tabler:nfc',
  },
  {
    title: 'NFC (Near Field Communication)',
    description: 'Permite que smartphones e smartwatches sejam usados como chaves digitais ao serem aproximados do leitor da fechadura.',
    category: 'Biometria',
    icon: 'tabler:device-mobile',
  },
  {
    title: 'Senha Dinâmica / OTP',
    description: 'One-Time Password. Códigos válidos por apenas um uso ou tempo limitado, gerados remotamente via aplicativo.',
    category: 'Biometria',
    icon: 'tabler:key',
  },
  {
    title: 'Sensores de Vivacidade (Liveness Detection)',
    description: 'Capacidade de distinguir pele humana real de materiais sintéticos ou fotografias digitais de alta resolução.',
    category: 'Biometria',
    icon: 'tabler:scan',
  },

  // --- CONECTIVIDADE E PROTOCOLOS ---
  {
    title: 'Protocolo Matter',
    description: 'Padrão universal de 2026 que une Alexa, Google e Apple. Permite que dispositivos de marcas diferentes falem a mesma língua.',
    category: 'Conexão',
    icon: 'tabler:smart-home',
  },
  {
    title: 'Thread Protocol',
    description: 'Rede mesh de ultra-baixa latência e consumo. Garante que a fechadura responda instantaneamente e economize bateria.',
    category: 'Conexão',
    icon: 'tabler:route',
  },
  {
    title: 'Zigbee 3.0',
    description: 'Protocolo de rádio estável e seguro. Exige um Hub/Gateway para conectar-se ao Wi-Fi da residência.',
    category: 'Conexão',
    icon: 'tabler:router',
  },
  {
    title: 'BLE (Bluetooth Low Energy)',
    description: 'Conexão de baixo consumo usada para configuração inicial e abertura por proximidade via app oficial.',
    category: 'Conexão',
    icon: 'tabler:bluetooth',
  },
  {
    title: 'Wi-Fi 2.4GHz / 5GHz',
    description: 'Padrão de rede comum. Fechaduras Wi-Fi direto costumam consumir mais pilhas que modelos Zigbee/Bluetooth.',
    category: 'Conexão',
    icon: 'tabler:wifi',
  },
  {
    title: 'Hub / Gateway',
    description: 'A "ponte" que traduz o sinal da fechadura (Zigbee/BT) para o Wi-Fi, permitindo controle mundial via internet.',
    category: 'Conexão',
    icon: 'tabler:network',
  },
  {
    title: 'Firmware OTA (Over-The-Air)',
    description: 'Atualização automática do software da fechadura via internet para corrigir bugs ou adicionar novas funções.',
    category: 'Conexão',
    icon: 'tabler:download',
  },
  {
    title: 'Geofencing',
    description: 'Automação baseada em localização. A porta destrava sozinha quando você entra em um perímetro definido ao redor de casa.',
    category: 'Conexão',
    icon: 'tabler:map-pin',
  },

  // --- HARDWARE E MECÂNICA ---
  {
    title: 'Mortise (Maquinário)',
    description: 'A caixa da fechadura que vai dentro da porta. Existem diversos padrões: 4085, 4585, 5572, etc.',
    category: 'Hardware',
    icon: 'tabler:binary-tree',
  },
  {
    title: 'Backset (Distância de Broca)',
    description: 'Medida da borda da porta até o centro do furo da maçaneta. Define a compatibilidade física do maquinário.',
    category: 'Hardware',
    icon: 'tabler:ruler-2',
  },
  {
    title: 'Fechadura de Embutir',
    description: 'Instalação dentro da porta. Oferece visual clean e maior resistência mecânica contra arrombamentos.',
    category: 'Hardware',
    icon: 'tabler:door',
  },
  {
    title: 'Fechadura de Sobrepor',
    description: 'Fixada na face da porta. Ideal para vidros blindex ou portas onde não se pode escavar o miolo.',
    category: 'Hardware',
    icon: 'tabler:square-plus',
  },
  {
    title: 'Cilindro Multiponto',
    description: 'Reforço interno com diversos pinos de precisão, dificultando a abertura com chaves mestras ou michas.',
    category: 'Hardware',
    icon: 'tabler:lock',
  },
  {
    title: 'Maçaneta Reversível',
    description: 'Mecanismo que permite inverter o lado da maçaneta para portas que abrem para a esquerda ou direita.',
    category: 'Hardware',
    icon: 'tabler:arrow-left-right',
  },
  {
    title: 'Liga de Zamac 5',
    description: 'Liga de Zinco, Alumínio, Magnésio e Cobre. Oferece alta durabilidade, resistência mecânica e anti-corrosão.',
    category: 'Hardware',
    icon: 'tabler:atom-2',
  },
  {
    title: 'Aço Inox 304',
    description: 'Material nobre usado nas linguetas e trincos. Altamente resistente à ferrugem, mesmo em regiões litorâneas.',
    category: 'Hardware',
    icon: 'tabler:shield',
  },
  {
    title: 'Trinco Rolete',
    description: 'Ideal para portas pivotantes com puxador. Permite que a porta fique fechada sem precisar girar a maçaneta.',
    category: 'Hardware',
    icon: 'tabler:circle-dot',
  },
  {
    title: 'Lingueta Anti-Vandalismo',
    description: 'Pino reforçado com alma de aço temperado que resiste a cortes de serra e tentativas de alavancagem.',
    category: 'Hardware',
    icon: 'tabler:hammer',
  },
  {
    title: 'Acabamento Black Piano',
    description: 'Revestimento em polímero de alto brilho que oferece estética luxuosa e moderna para ambientes de design.',
    category: 'Hardware',
    icon: 'tabler:palette',
  },
  {
    title: 'Backset Ajustável',
    description: 'Mecanismo que permite regular a profundidade da lingueta, adaptando-se a diferentes posições de furação.',
    category: 'Hardware',
    icon: 'tabler:adjustments',
  },

  // --- SEGURANÇA E ALARMES ---
  {
    title: 'Senha de Pânico',
    description: 'Código que libera a entrada normalmente, mas dispara um alerta silencioso no celular de familiares ou polícia.',
    category: 'Segurança',
    icon: 'tabler:alert-triangle',
  },
  {
    title: 'Código Scrambling (Falso)',
    description: 'Permite digitar números aleatórios antes ou depois da senha real para evitar rastro de gordura ou olhares curiosos.',
    category: 'Segurança',
    icon: 'tabler:mask',
  },
  {
    title: 'Senha Falsa Periódica',
    description: 'Recurso que exige a troca de um dígito específico a cada X dias para maximizar a rotatividade de segurança.',
    category: 'Segurança',
    icon: 'tabler:history',
  },
  {
    title: 'Alarme de Intrusão',
    description: 'Sirene de alto volume (80dB+) que dispara caso a fechadura detecte impacto violento ou pressão indevida.',
    category: 'Segurança',
    icon: 'tabler:access-point',
  },
  {
    title: 'Sensor Magnético de Porta',
    description: 'Detecta se a porta foi apenas fechada ou se o trinco realmente travou. Avisa se a porta ficar encostada.',
    category: 'Segurança',
    icon: 'tabler:magnet',
  },
  {
    title: 'Anti-Panic Exit',
    description: 'Função que libera a trava interna apenas puxando a maçaneta, garantindo saída rápida em caso de incêndio.',
    category: 'Segurança',
    icon: 'tabler:emergency-bed',
  },
  {
    title: 'Proteção IP65 / IP66',
    description: 'Índice de Proteção contra intempéries. O primeiro dígito é poeira, o segundo é proteção contra jatos d’água.',
    category: 'Segurança',
    icon: 'tabler:cloud-rain',
  },
  {
    title: 'Brute Force Lockout',
    description: 'Bloqueio temporário do painel após 5 ou 10 tentativas consecutivas de senha ou digital incorreta.',
    category: 'Segurança',
    icon: 'tabler:lock-off',
  },
  {
    title: 'Criptografia de 128-bit AES',
    description: 'Padrão criptográfico que protege os dados trafegados entre a nuvem e o dispositivo contra hackers.',
    category: 'Segurança',
    icon: 'tabler:lock',
  },
  {
    title: 'Notificação Push em Tempo Real',
    description: 'Alerta instantâneo no seu celular toda vez que alguém abre a porta ou quando ocorre um erro de acesso.',
    category: 'Segurança',
    icon: 'tabler:bell-ringing',
  },

  // --- FUNÇÕES INTELIGENTES ---
  {
    title: 'App Tuya / Smart Life',
    description: 'Ecossistema global compatível com milhares de marcas, permitindo automações complexas entre aparelhos.',
    category: 'Funções',
    icon: 'tabler:apps',
  },
  {
    title: 'Mibo Smart (Intelbras)',
    description: 'Aplicativo brasileiro da Intelbras otimizado para segurança e suporte técnico nacional.',
    category: 'Funções',
    icon: 'tabler:brand-apple-arcade',
  },
  {
    title: 'Yale Home / August Connect',
    description: 'Plataforma líder mundial em segurança com foco em integração Apple HomeKit e fechaduras de luxo.',
    category: 'Funções',
    icon: 'tabler:home-check',
  },
  {
    title: 'Registro de Log (Audit Trail)',
    description: 'Histórico detalhado com nome, data, hora e método de entrada de cada usuário que acessou o local.',
    category: 'Funções',
    icon: 'tabler:list-details',
  },
  {
    title: 'Modo Não Perturbe (Privacidade)',
    description: 'Trava eletrônica que bloqueia qualquer acesso externo (mesmo com senha) para garantir privacidade total.',
    category: 'Funções',
    icon: 'tabler:moon-stars',
  },
  {
    title: 'Modo Passagem (Passage Mode)',
    description: 'Mantém a porta destravada temporariamente para eventos, festas ou fluxo alto de pessoas em escritórios.',
    category: 'Funções',
    icon: 'tabler:run',
  },
  {
    title: 'Check-in Automatizado',
    description: 'Geração automática de senhas por API para plataformas como Airbnb, facilitando o alugueis por temporada.',
    category: 'Funções',
    icon: 'tabler:calendar-event',
  },
  {
    title: 'Backup Mecânico via USB',
    description: 'Terminal de alimentação externo para carregar a fechadura com um Powerbank caso as pilhas acabem.',
    category: 'Funções',
    icon: 'tabler:usb',
  },

  // --- INSTALAÇÃO E SUPORTE ---
  {
    title: 'Gabarito de Furação',
    description: 'Molde em papel ou adesivo que indica exatamente onde furar a porta para um encaixe milimétrico.',
    category: 'Instalação',
    icon: 'tabler:template',
  },
  {
    title: 'Fita 3M VHB Estrutural',
    description: 'Adesivo de altíssima resistência usado em fechaduras de sobrepor para fixação em vidros sem furos.',
    category: 'Instalação',
    icon: 'tabler:sticker',
  },
  {
    title: 'Primer de Aderência P80',
    description: 'Solução química aplicada antes da fita adesiva para maximizar a união molecular entre a fechadura e o vidro.',
    category: 'Instalação',
    icon: 'tabler:spray',
  },
  {
    title: 'Espessura Mínima da Porta',
    description: 'Parâmetro técnico (geralmente entre 35mm e 55mm) necessário para que o maquinário seja instalado.',
    category: 'Instalação',
    icon: 'tabler:columns-3',
  },
  {
    title: 'Broca Copo Diamantada',
    description: 'Ferramenta específica para realizar cortes circulares em portas de madeira ou metal sem lascar o acabamento.',
    category: 'Instalação',
    icon: 'tabler:tool',
  },
  {
    title: 'Certificação ANATEL',
    description: 'Selo que garante que a fechadura segue as normas brasileiras de segurança de rádio e Wi-Fi.',
    category: 'Instalação',
    icon: 'tabler:certificate',
  },
];
