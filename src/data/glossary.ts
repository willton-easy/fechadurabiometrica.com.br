export interface GlossaryItem {
  title: string;
  description: string;
  icon?: string;
  category: 'Hardware' | 'Biometria' | 'Conexão' | 'Segurança' | 'Instalação' | 'Funções';
}

export const glossaryItems: GlossaryItem[] = [
  // --- BIOMETRIA E ACESSO (Expansão) ---
  {
    title: 'Biometria Capacitiva',
    description: 'Tecnologia que utiliza campos elétricos para mapear as digitais. É imune a réplicas de silicone ou fotos, sendo o padrão de segurança atual.',
    category: 'Biometria',
    icon: 'tabler:fingerprint',
  },
  {
    title: 'Scanner Facial 3D',
    description: 'Projeção de milhares de pontos infravermelhos para criar um mapa volumétrico do rosto. Funciona até no escuro absoluto.',
    category: 'Biometria',
    icon: 'tabler:scan-eye',
  },
  {
    title: 'Biometria de Palma',
    description: 'Mapeamento do padrão de veias sob a pele da palma da mão. Virtualmente impossível de falsificar sem fluxo sanguíneo ativo.',
    category: 'Biometria',
    icon: 'tabler:hand-stop',
  },
  {
    title: 'Reconhecimento de Íris',
    description: 'Mapeamento dos padrões únicos da íris ocular. Um dos métodos de autenticação mais caros e seguros do mundo.',
    category: 'Biometria',
    icon: 'tabler:eye',
  },
  {
    title: 'Liveness Detection',
    description: 'Algoritmo que distingue pele humana real de réplicas como moldes de silicone ou fotos de alta resolução.',
    category: 'Biometria',
    icon: 'tabler:user-check',
  },
  {
    title: 'FRR (False Rejection Rate)',
    description: 'Taxa de Falsa Rejeição: probabilidade de o sistema negar acesso por erro a um usuário cadastrado.',
    category: 'Biometria',
    icon: 'tabler:user-x',
  },
  {
    title: 'FAR (False Acceptance Rate)',
    description: 'Taxa de Falsa Aceitação: probabilidade de o sistema permitir acesso por erro a um usuário não autorizado.',
    category: 'Biometria',
    icon: 'tabler:shield-off',
  },
  {
    title: 'Biometria de 500 DPI',
    description: 'Resolução de alta definição do sensor capaz de capturar detalhes minuciosos das ranhuras papilares.',
    category: 'Biometria',
    icon: 'tabler:microscope',
  },
  {
    title: 'Veia do Dedo',
    description: 'Leitura do padrão vascular interno do dedo, imune a falhas por sujeira ou umidade na superfície da pele.',
    category: 'Biometria',
    icon: 'tabler:pills',
  },
  {
    title: 'NFC (Near Field)',
    description: 'Permite que smartphones e smartwatches sejam usados como chaves digitais por aproximação curto alcance.',
    category: 'Biometria',
    icon: 'tabler:nfc',
  },
  {
    title: 'RFID (13.56MHz)',
    description: 'Identificação por rádio frequente usada em tags e cartões de proximidade padrão Mifare.',
    category: 'Biometria',
    icon: 'tabler:antenna-bars-5',
  },
  {
    title: 'Dual-Factor Auth',
    description: 'Exige dois métodos independentes para liberar acesso (ex: Biometria + Senha numérica).',
    category: 'Biometria',
    icon: 'tabler:2fa',
  },
  {
    title: 'Scanner Óptico',
    description: 'Tecnologia mais antiga que usa luz para fotografar a digital. Menos segura que a capacitiva.',
    category: 'Biometria',
    icon: 'tabler:photo',
  },
  {
    title: 'Semi-conductor Sensor',
    description: 'Sensor biométrico de alta performance que mapeia a digital através de sinais elétricos.',
    category: 'Biometria',
    icon: 'tabler:bolt',
  },

  // --- CONECTIVIDADE E PROTOCOLOS (Expansão) ---
  {
    title: 'Protocolo Matter',
    description: 'Padrão universal que une Apple, Google e Amazon, permitindo que dispositivos de marcas diferentes falem a mesma língua.',
    category: 'Conexão',
    icon: 'tabler:target-arrow',
  },
  {
    title: 'Thread Protocol',
    description: 'Rede mesh de ultra-baixa latência projetada para conectar smart homes sem depender de Wi-Fi central.',
    category: 'Conexão',
    icon: 'tabler:route',
  },
  {
    title: 'UWB (Ultra-Wideband)',
    description: 'Rádio de curto alcance para localização milimétrica, permitindo abertura mãos-livres ultra-precisa.',
    category: 'Conexão',
    icon: 'tabler:broadcast',
  },
  {
    title: 'Zigbee 3.0',
    description: 'Evolução do Zigbee com maior segurança e compatibilidade universal entre dispositivos IoT.',
    category: 'Conexão',
    icon: 'tabler:router',
  },
  {
    title: 'Z-Wave Plus',
    description: 'Protocolo de rádio com maior alcance e eficiência de bateria, operando em frequências abaixo de 1GHz.',
    category: 'Conexão',
    icon: 'tabler:zodiac-libra',
  },
  {
    title: 'MQTT',
    description: 'Protocolo de mensagens extremamente leve para comunicação instantânea entre sensores e hubs.',
    category: 'Conexão',
    icon: 'tabler:message-forward',
  },
  {
    title: 'OTA (Over-The-Air)',
    description: 'Atualização sem fio do software interno para corrigir bugs ou adicionar funções remotamente.',
    category: 'Conexão',
    icon: 'tabler:download',
  },
  {
    title: 'Geofencing',
    description: 'Automação baseada em localização GPS para trancar ou destrancar a porta ao entrar/sair de um perímetro.',
    category: 'Conexão',
    icon: 'tabler:map-pin',
  },
  {
    title: 'BLE (Bluetooth LE)',
    description: 'Bluetooth de baixo consumo usado para configuração e abertura por proximidade via app.',
    category: 'Conexão',
    icon: 'tabler:bluetooth-connected',
  },
  {
    title: 'Hub / Gateway',
    description: 'Dispositivo "ponte" que traduz sinais Zigbee/Z-Wave para o Wi-Fi da residência.',
    category: 'Conexão',
    icon: 'tabler:network',
  },
  {
    title: 'Local API',
    description: 'Interface que permite controle da fechadura na rede local sem depender da internet externa.',
    category: 'Conexão',
    icon: 'tabler:cloud-computing',
  },
  {
    title: 'Mesh Network',
    description: 'Rede onde cada dispositivo atua como repetidor, estendendo o alcance por toda a casa.',
    category: 'Conexão',
    icon: 'tabler:topology-star-3',
  },
  {
    title: 'Wi-Fi 2.4GHz/5GHz',
    description: 'Suporte a ambas as frequências de Wi-Fi para maior flexibilidade e estabilidade de conexão.',
    category: 'Conexão',
    icon: 'tabler:wifi',
  },
  {
    title: 'Apple Home Key',
    description: 'Tecnologia da Apple que permite abrir portas usando o iPhone ou Apple Watch via NFC/UWB.',
    category: 'Conexão',
    icon: 'tabler:brand-apple',
  },
  {
    title: 'Latência de Nuvem',
    description: 'O atraso entre o comando no app e a resposta da fechadura, medido em milissegundos.',
    category: 'Conexão',
    icon: 'tabler:clock',
  },

  // --- HARDWARE E MECÂNICA (Expansão) ---
  {
    title: 'Mortise (Embutir)',
    description: 'Corpo da fechadura inserido dentro de um entalhe na porta, oferecendo visual limpo e alta segurança.',
    category: 'Hardware',
    icon: 'tabler:border-all',
  },
  {
    title: 'Sobrepor (Rim Lock)',
    description: 'Modelo fixado na face interna da porta, ideal para vidros blindex e instalações rápidas.',
    category: 'Hardware',
    icon: 'tabler:layout-sidebar',
  },
  {
    title: 'Deadbolt (Maciço)',
    description: 'Trinco de segurança sem mola, movido apenas mecanicamente para máxima resistência contra arrombamento.',
    category: 'Hardware',
    icon: 'tabler:lock-square',
  },
  {
    title: 'Latch (Trinco Mola)',
    description: 'Mecanismo que mantém a porta encostada; em modelos digitais, é acionado automaticamente pelo motor.',
    category: 'Hardware',
    icon: 'tabler:square-rounded-arrow-right',
  },
  {
    title: 'Zinc Alloy (Zamac)',
    description: 'Liga metálica de alta durabilidade e anti-corrosão usada no corpo de fechaduras premium.',
    category: 'Hardware',
    icon: 'tabler:atom-2',
  },
  {
    title: 'Stainless Steel 304',
    description: 'Aço inoxidável de alta resistência mecânica, ideal para áreas litorâneas e expostas ao tempo.',
    category: 'Hardware',
    icon: 'tabler:shield-half',
  },
  {
    title: 'Escutcheon (Espelho)',
    description: 'Placa decorativa e protetora que envolve a maçaneta e cobre os furos de instalação.',
    category: 'Hardware',
    icon: 'tabler:rectangle',
  },
  {
    title: 'Backset',
    description: 'Distância entre o centro da maçaneta e a borda da porta. Crítica para compatibilidade de furação.',
    category: 'Hardware',
    icon: 'tabler:ruler-2',
  },
  {
    title: 'Spindle (Eixo)',
    description: 'Barra quadrada que atravessa a porta e conecta as maçanetas ao mecanismo central.',
    category: 'Hardware',
    icon: 'tabler:crosshair',
  },
  {
    title: 'Clutch (Embreagem)',
    description: 'Componente que engata a maçaneta ao motor apenas após a autenticação bem-sucedida.',
    category: 'Hardware',
    icon: 'tabler:settings-automation',
  },
  {
    title: 'Strike Plate (Testa)',
    description: 'Chapa reforçada no batente onde a lingueta ou trinco se alojam ao fechar.',
    category: 'Hardware',
    icon: 'tabler:door-exit',
  },
  {
    title: 'Multiponto',
    description: 'Sistema que aciona vários pontos de travamento (superior, lateral, inferior) simultaneamente.',
    category: 'Hardware',
    icon: 'tabler:list-numbers',
  },
  {
    title: 'Solenoide',
    description: 'Atuador eletromecânico que dispara ou retrai o pino de trava instantaneamente.',
    category: 'Hardware',
    icon: 'tabler:magnet',
  },
  {
    title: 'PVD Coating',
    description: 'Revestimento ultra-resistente contra riscos e desbotamento por raios UV e maresia.',
    category: 'Hardware',
    icon: 'tabler:layers-intersect',
  },
  {
    title: 'Anti-Sag Mechanism',
    description: 'Molas reforçadas que impedem que a maçaneta fique "caída" com o passar dos anos.',
    category: 'Hardware',
    icon: 'tabler:arrow-bar-up',
  },

  // --- SEGURANÇA E ALARMES (Expansão) ---
  {
    title: 'ANSI Grade 1',
    description: 'Classificação de segurança mais alta (comercial/residencial), testada para resistência extrema.',
    category: 'Segurança',
    icon: 'tabler:medal',
  },
  {
    title: 'IP66 Waterproof',
    description: 'Grau de proteção contra jatos potentes de água, ideal para portões externos sem cobertura.',
    category: 'Segurança',
    icon: 'tabler:cloud-storm',
  },
  {
    title: 'AES-256 bits',
    description: 'Criptografia de padrão governamental que protege todos os dados trafegados na rede.',
    category: 'Segurança',
    icon: 'tabler:lock-access',
  },
  {
    title: 'Bumping (Anti-Bump)',
    description: 'Proteção contra técnica de arrombamento que usa percussão em chaves mestras.',
    category: 'Segurança',
    icon: 'tabler:hammer',
  },
  {
    title: 'Picking (Anti-Pick)',
    description: 'Cilindro com pinos especiais que dificultam a abertura por manipulação manual (gazua).',
    category: 'Segurança',
    icon: 'tabler:needle-thread',
  },
  {
    title: 'Lockout Mode',
    description: 'Bloqueio do painel após várias tentativas de senha errada, impedindo ataques de força bruta.',
    category: 'Segurança',
    icon: 'tabler:hand-finger',
  },
  {
    title: 'Tamper Alarm',
    description: 'Sirene disparada ao detectar tentativas de remoção ou danos físicos ao corpo da fechadura.',
    category: 'Segurança',
    icon: 'tabler:alert-octagon',
  },
  {
    title: 'Fake PIN Code',
    description: 'Permite digitar números aleatórios antes/depois da senha real para evitar rastro de gordura ou espionagem.',
    category: 'Segurança',
    icon: 'tabler:mask',
  },
  {
    title: 'Pânico Silencioso',
    description: 'Senha especial que abre a porta mas avisa secretamente a polícia ou parentes via app.',
    category: 'Segurança',
    icon: 'tabler:bell-ringing',
  },
  {
    title: 'HSM (Secure Module)',
    description: 'Chip isolado que armazena chaves criptográficas, protegido contra extração física de dados.',
    category: 'Segurança',
    icon: 'tabler:cpu-2',
  },
  {
    title: 'Cripto Curva Elíptica',
    description: 'Método moderno que oferece segurança máxima com menor consumo de energia que o RSA.',
    category: 'Segurança',
    icon: 'tabler:math-symbols',
  },
  {
    title: 'Audit Trail',
    description: 'Log detalhado mantendo histórico de quem, quando e como a porta foi aberta.',
    category: 'Segurança',
    icon: 'tabler:clipboard-list',
  },
  {
    title: 'Anti-Panic Exit',
    description: 'Permite abertura interna imediata em emergências apenas abaixando a maçaneta.',
    category: 'Segurança',
    icon: 'tabler:emergency-bed',
  },
  {
    title: 'Drill Protection',
    description: 'Chapas de aço temperado inseridas para impedir perfuração do mecanismo central.',
    category: 'Segurança',
    icon: 'tabler:bolt-off',
  },

  // --- FUNÇÕES E SMART (Expansão) ---
  {
    title: 'Auto-Lock Delay',
    description: 'Ajuste de tempo (ex: 5s a 30s) para a tranca fechar sozinha após a porta ser encostada.',
    category: 'Funções',
    icon: 'tabler:clock-stop',
  },
  {
    title: 'Passage Mode',
    description: 'Mantenha a fechadura destravada para eventos ou alto fluxo em horários específicos.',
    category: 'Funções',
    icon: 'tabler:walk',
  },
  {
    title: 'Modo Não Perturbe',
    description: 'Bloqueio eletrônico interno que impede abertura externa mesmo com senha cadastrada.',
    category: 'Funções',
    icon: 'tabler:moon',
  },
  {
    title: 'One-Time Password',
    description: 'Senha de uso único que expira imediatamente após o primeiro acesso com sucesso.',
    category: 'Funções',
    icon: 'tabler:key-off',
  },
  {
    title: 'Access Scenes',
    description: 'Automações configuradas, como acender luzes ao abrir a porta pela primeira vez à noite.',
    category: 'Funções',
    icon: 'tabler:wand',
  },
  {
    title: 'Amazon Alexa / Siri',
    description: 'Comando por voz para trancar a porta ou verificar o status via assistente virtual.',
    category: 'Funções',
    icon: 'tabler:microphone-2',
  },
  {
    title: 'Airbnb Integration',
    description: 'Sincronização com o calendário de reservas para gerar senhas automáticas para hóspedes.',
    category: 'Funções',
    icon: 'tabler:brand-airbnb',
  },
  {
    title: 'Check-in API',
    description: 'Integração de software que permite gerenciar acessos de grandes prédios remotamente.',
    category: 'Funções',
    icon: 'tabler:code',
  },
  {
    title: 'Emergency Power',
    description: 'Porta USB-C ou Micro-USB externa para ligar a fechadura com Powerbank se a pilha acabar.',
    category: 'Funções',
    icon: 'tabler:battery-charging',
  },
  {
    title: 'Low Battery Alert',
    description: 'Avisos visuais e sonoros persistentes quando a bateria atinge níveis críticos.',
    category: 'Funções',
    icon: 'tabler:battery-2',
  },
  {
    title: 'Guia por Voz',
    description: 'Instruções sonoras em português para facilitar a configuração e o uso diário.',
    category: 'Funções',
    icon: 'tabler:volume-2',
  },
  {
    title: 'Backup Keyway',
    description: 'Local para chave mecânica física oculta para uso em caso de falha eletrônica total.',
    category: 'Hardware',
    icon: 'tabler:key',
  },
  {
    title: 'Time-Based Access',
    description: 'Restrição de senhas para funcionarem apenas em dias e horários determinados.',
    category: 'Funções',
    icon: 'tabler:calendar-time',
  },
  {
    title: 'Smart Home Hub',
    description: 'Integração com ecossistemas como Home Assistant ou Google Home.',
    category: 'Funções',
    icon: 'tabler:smart-home',
  },

  // --- INSTALAÇÃO E MATERIAIS (Expansão) ---
  {
    title: 'Primer P80',
    description: 'Solução química aplicada antes da fita adesiva para maximizar a união com o vidro.',
    category: 'Instalação',
    icon: 'tabler:test-pipe',
  },
  {
    title: 'Fita 3M VHB',
    description: 'Adesivo estrutural de altíssima resistência usado em fechaduras de sobrepor sem furos.',
    category: 'Instalação',
    icon: 'tabler:box',
  },
  {
    title: 'Gabarito de Furação',
    description: 'Molde em papel ou adesivo que indica os pontos exatos para furação milimétrica.',
    category: 'Instalação',
    icon: 'tabler:template',
  },
  {
    title: 'Broca Copo Diamante',
    description: 'Ferramenta para cortes circulares limpos em portas de madeira ou metal.',
    category: 'Instalação',
    icon: 'tabler:drill',
  },
  {
    title: 'Espessura Mínima',
    description: 'Parâmetro técnico (geralmente 35mm+) para que o maquinário caiba na porta.',
    category: 'Instalação',
    icon: 'tabler:ruler-measure',
  },
  {
    title: 'Certificado ANATEL',
    description: 'Garantia de que o rádio Wi-Fi da fechadura segue as normas de segurança nacionais.',
    category: 'Instalação',
    icon: 'tabler:certificate',
  },
  {
    title: 'Torque de Aperto',
    description: 'A pressão exata nos parafusos para evitar danos ao vidro ou folga no mecanismo.',
    category: 'Instalação',
    icon: 'tabler:variable',
  },
  {
    title: 'Nivelamento a Laser',
    description: 'Uso de laser para garantir que a fechadura e o batente estejam perfeitamente alinhados.',
    category: 'Instalação',
    icon: 'tabler:inner-shadow-bottom-right',
  },
  {
    title: 'Lubrificante de Grafite',
    description: 'Único tipo de lubrificante recomendado para cilindros mecânicos; evita acúmulo de poeira.',
    category: 'Instalação',
    icon: 'tabler:droplet',
  },
];
