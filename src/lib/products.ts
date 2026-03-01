export interface Product {
  id: number;
  rank: number;
  name: string;
  badge: string;
  badgeColor: "primary" | "accent" | "cta";
  image: string;
  specs: string[];
  verdict: string;
  pros: string[];
  cons: string[];
  amazonUrl: string;
  mlUrl: string;
  reviewUrl: string;
}

export const products: Product[] = [
  {
    id: 1,
    rank: 1,
    name: "Yale YMF 40A RL",
    badge: "Melhor Escolha Premium",
    badgeColor: "accent",
    image: "https://m.media-amazon.com/images/I/51ligr6wW3L._AC_SX569_.jpg",
    specs: ["Biometria (20 digitais)", "Senha PIN", "Chave Mecânica", "App Yale Home"],
    verdict:
      "A Yale YMF 40A RL é o tanque de guerra das fechaduras. Extremamente silenciosa (mecanismo rolete) e com uma das biometrias mais precisas que já testamos.",
    pros: [
      "Integração nativa com Alexa",
      "Guia de voz em português",
      "Alarme de intrusão e calor",
      "Mecanismo de embutir ultra robusto",
    ],
    cons: ["Preço elevado", "Exige bridge para Wi-Fi remoto"],
    amazonUrl: "https://amzn.to/4b33ueL",
    mlUrl: "https://meli.la/1hVhuw8",
    reviewUrl: "/review/yale-ymf-40a-rl",
  },
  {
    id: 2,
    rank: 2,
    name: "Intelbras FR 220",
    badge: "Melhor Custo-Benefício",
    badgeColor: "cta",
    image: "https://m.media-amazon.com/images/I/51SD1pB3X-L._AC_SX569_.jpg",
    specs: ["Biometria (100 digitais)", "Senha", "Cartão", "Sobrepor"],
    verdict:
      "O 'queridinho' do Brasil. Se você quer largar as chaves hoje sem gastar muito e sem complicação na instalação, a FR 220 é a escolha óbvia.",
    pros: [
      "Instalação vapt-vupt (sobrepor)",
      "Assistência técnica em todo o país",
      "Até 100 digitais cadastradas",
      "Teclado touch muito responsivo",
    ],
    cons: ["Não tem Wi-Fi nativo", "Design mais simples"],
    amazonUrl: "https://amzn.to/40Cj24c",
    mlUrl: "https://meli.la/2bfc5J2",
    reviewUrl: "/review/intelbras-fr-220",
  },
  {
    id: 3,
    rank: 3,
    name: "Intelbras IFR 7000",
    badge: "Melhor Integração e Design",
    badgeColor: "primary",
    image: "https://m.media-amazon.com/images/I/61BypIl8SRL.jpg",
    specs: ["Wi-Fi Nativo", "Push-Pull", "Alexa", "App Izy"],
    verdict:
      "A alternativa perfeita para quem busca acabamento premium e o prático sistema Push-Pull (empurre e entre). Além disso, integra-se de forma impecável à casa inteligente pelo app Izy.",
    pros: [
      "Sistema Push-Pull super prático",
      "Sincronização com Alexa e Google",
      "Relatório detalhado pelo app",
      "Até 100 impressões digitais",
    ],
    cons: ["Exige o hub ICA 1001 para uso remoto", "Instalação exige especialista"],
    amazonUrl: "https://www.amazon.com.br/dp/B0BXB7419R",
    mlUrl: "https://lista.mercadolivre.com.br/intelbras-ifr-7000#D[A:intelbras%20ifr%207000]",
    reviewUrl: "/review/intelbras-ifr-7000",
  },
  {
    id: 4,
    rank: 4,
    name: "Elsys ESF-DE4000B",
    badge: "A mais Versátil",
    badgeColor: "primary",
    image: "https://m.media-amazon.com/images/I/41-pe-SSrjL._AC_UL320_.jpg",
    specs: ["Biometria", "Senha", "Tag RFID", "App Elsys"],
    verdict:
      "Uma das mais fáceis de configurar via app. Funciona muito bem para quem quer gerenciar acessos de visitas e prestadores de serviço.",
    pros: [
      "App muito intuitivo",
      "Gestão de senhas temporárias",
      "Design de embutir slim",
      "Ótimo acabamento",
    ],
    cons: ["Biometria exige dedo bem seco", "Instalação exige precisão"],
    amazonUrl: "https://www.amazon.com.br/dp/B08HSMKRR8",
    mlUrl: "https://meli.la/1PDGayy",
    reviewUrl: "/review/elsys-esf-de4000b",
  },
  {
    id: 5,
    rank: 5,
    name: "Intelbras FR 201",
    badge: "Melhor Design sobrepor",
    badgeColor: "primary",
    image: "https://m.media-amazon.com/images/I/41HcCEN+upL._AC_UL320_.jpg",
    specs: ["Biometria", "Senha", "Sensor Térmico", "Sobrepor"],
    verdict:
      "Une a facilidade da FR 220 com um visual muito mais moderno. Ideal para quem quer um toque de sofisticação sem precisar esculpir a porta.",
    pros: [
      "Visual Black Piano elegante",
      "Sensor térmico (segurança incêndio)",
      "Aviso sonoro de bateria fraca",
      "Instalação muito limpa",
    ],
    cons: ["Não tem acesso remoto", "Preço flutua bastante"],
    amazonUrl: "https://amzn.to/4r9fgu7",
    mlUrl: "https://meli.la/28SbeV3",
    reviewUrl: "/review/intelbras-fr-201",
  },
  {
    id: 6,
    rank: 6,
    name: "Primebras Athenas",
    badge: "Melhor Gestão App",
    badgeColor: "primary",
    image: "https://m.media-amazon.com/images/I/41iKLJ5BFpL._AC_SX569_.jpg",
    specs: ["App dedicado", "Biometria", "Histórico", "Tag"],
    verdict:
      "A Primebras focou em quem vive no celular. O histórico de quem entrou e saiu é um dos mais detalhados da categoria.",
    pros: [
      "P3004 Athenas vem com app robusto",
      "Ambidestra (serve em qualquer lado)",
      "Até 300 usuários",
      "Travamento automático confiável",
    ],
    cons: ["Marca menos tradicional", "Material um pouco mais leve"],
    amazonUrl: "https://amzn.to/4u9LEj1",
    mlUrl: "https://meli.la/232BgxP",
    reviewUrl: "/review/primebras-athenas",
  },
  {
    id: 7,
    rank: 7,
    name: "Papaiz Sobrepor SL140",
    badge: "Elegância e Praticidade",
    badgeColor: "primary",
    image: "/papaiz-sl140-sobrepor.webp",
    specs: ["Instalação Sobreposta", "Biometria", "Maçaneta Reversível", "Senha"],
    verdict:
      "A Papaiz SL140 de sobrepor é ideal para quem busca uma instalação rápida e sem grandes furos na porta. Combina o design slim da marca com a versatilidade do modelo de sobrepor.",
    pros: [
      "Instalação simplificada (Sobrepor)",
      "Design ultra slim e discreto",
      "Alta velocidade de leitura biométrica",
      "Qualidade e garantia Papaiz",
    ],
    cons: ["Alimentação por pilhas (como a maioria)", "Design focado em portas internas/apartamentos"],
    amazonUrl: "https://amzn.to/3MQlbGo",
    mlUrl: "https://meli.la/1jerQyg",
    reviewUrl: "/review/papaiz-sl140-sobrepor",
  },
  {
    id: 8,
    rank: 8,
    name: "Intelbras FR 101",
    badge: "Melhor de Entrada",
    badgeColor: "primary",
    image: "https://m.media-amazon.com/images/I/51R13R8zlmL._AC_UL320_.jpg",
    specs: ["Senha Digital", "Compacta", "Alarme", "Sobrepor"],
    verdict:
      "O modelo mais em conta que você pode confiar. Não tem biometria (apenas senha), mas a segurança Intelbras está toda aqui.",
    pros: [
      "Preço imbatível",
      "Fácil de esconder no design da porta",
      "Alarme anti-arrombamento",
      "Simples até para idosos e crianças",
    ],
    cons: ["Sem biometria", "Limitada a senhas"],
    amazonUrl: "https://amzn.to/3P9uG3Z",
    mlUrl: "https://meli.la/12VH5ij",
    reviewUrl: "/review/intelbras-fr-101",
  },
  {
    id: 9,
    rank: 9,
    name: "NovaDigital SL06",
    badge: "Robustez e Estilo",
    badgeColor: "primary",
    image: "/novadigital-sl06.webp",
    specs: ["Biometria", "Wi-Fi Tuya", "Maçaneta em Aço", "App Smart Life"],
    verdict:
      "Design sofisticado com maçaneta em aço inox e biometria de alta velocidade. Integração com Tuya/Smart Life para controle remoto. Uma surpresa muito positiva no segmento intermediário.",
    pros: [
      "Maçaneta premium em aço inox",
      "Integração Tuya/Smart Life/Alexa",
      "Biometria rápida e precisa",
      "Certificação ANATEL (produto homologado)",
    ],
    cons: ["Marca menos conhecida no Brasil", "Suporte técnico apenas online"],
    amazonUrl: "https://amzn.to/3P8JT5j",
    mlUrl: "https://meli.la/1gq7gyZ",
    reviewUrl: "/review/novadigital-sl06",
  },
  {
    id: 10,
    rank: 10,
    name: "Pado FDE-600",
    badge: "Qualidade Nacional",
    badgeColor: "primary",
    image: "/pado-fde-600-bio.webp",
    specs: ["Biometria", "Senha", "Tag", "Maçaneta Reversível"],
    verdict:
      "A Pado trouxe sua experiência em fechaduras mecânicas para o digital. Acabamento impecável e sensação de segurança no toque.",
    pros: [
      "Excelente assistência técnica Pado",
      "Múltiplos modos de abertura",
      "Vem com tags inclusas",
      "Voz de orientação em PT-BR",
    ],
    cons: ["Mecanismo um pouco pesado", "Interface do app datada"],
    amazonUrl: "https://amzn.to/4clSgnQ",
    mlUrl: "https://meli.la/2HH1UDL",
    reviewUrl: "/review/pado-fde-600",
  },
  {
    id: 11,
    rank: 11,
    name: "Fechadura Slim Inteligente (Sem Marca)",
    badge: "Custo Acessível",
    badgeColor: "primary",
    image: "/fechadura-slim-generica.png",
    specs: ["Wi-Fi Tuya", "Biometria", "App Smartphone", "Resistente à Água"],
    verdict:
      "Uma indicação extra para quem quer entrar no mundo das fechaduras inteligentes sem pagar pela marca. Usa a plataforma Tuya — a mesma base de marcas globais renomadas — e entrega recursos surpreendentes pelo preço.",
    pros: [
      "Integração com app Tuya / Smart Life",
      "Resistência a água e poeira",
      "Abertura por digital, senha ou app",
      "Custo-benefício surpreendente",
    ],
    cons: ["Suporte técnico limitado (sem marca)", "App pode estar em inglês"],
    amazonUrl: "https://www.amazon.com.br/dp/B0F1KTWXVW",
    mlUrl: "https://lista.mercadolivre.com.br/fechadura-inteligente-biometrica-tuya#D[A:fechadura%20inteligente%20tuya]",
    reviewUrl: "/review/fechadura-slim-generica",
  },
];

