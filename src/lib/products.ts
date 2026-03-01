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
    amazonUrl: "https://www.amazon.com.br/COMBO-Fechadura-Digital-Biometria-Trinco/dp/B0B1P94B93/",
    mlUrl: "#",
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
    amazonUrl: "https://www.amazon.com.br/Fechadura-Digital-Intelbras-FR-220/dp/B07DJSHN6D/",
    mlUrl: "#",
    reviewUrl: "/review/intelbras-fr-220",
  },
  {
    id: 3,
    rank: 3,
    name: "Samsung SHP-DP609",
    badge: "Mais Tecnológica",
    badgeColor: "primary",
    image: "https://keyless.co.nz/cdn/shop/products/1_20190822193255zgh998ZG_1024x.jpg?v=1630412718",
    specs: ["Wi-Fi Nativo", "Push-Pull", "NFC", "Biometria"],
    verdict:
      "A rainha do design. O sistema Push-Pull (empurre e entre) muda o jogo da conveniência, e o Wi-Fi já vem pronto para te avisar tudo no celular.",
    pros: [
      "Design Push-Pull futurista",
      "Wi-Fi nativo (sem hub)",
      "App Samsung Smart Doorlock",
      "Função Smart Bell (campainha no app)",
    ],
    cons: ["Consome 8 pilhas AA", "Exige porta robusta"],
    amazonUrl: "https://www.amazon.com.br/s?k=Samsung+SHP-DP609",
    mlUrl: "#",
    reviewUrl: "/review/samsung-shp-dp-609",
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
    amazonUrl: "https://www.amazon.com.br/FECHADURA-DIGITAL-EMBUTIR-BIOMETRIA-ESF-DE4000B/dp/B08HSMKRR8/",
    mlUrl: "#",
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
    amazonUrl: "https://www.amazon.com.br/Fechadura-Digital-Intelbras-FR-201/dp/B076HZ63PL/",
    mlUrl: "#",
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
    amazonUrl: "https://www.amazon.com.br/Primebras-P3004-Fechadura-Biom%C3%A9trica-Athenas/dp/B0CRRTPBJT/",
    mlUrl: "#",
    reviewUrl: "/review/primebras-athenas",
  },
  {
    id: 7,
    rank: 7,
    name: "Papaiz SL140 Bio",
    badge: "Elegância Máxima",
    badgeColor: "primary",
    image: "https://m.media-amazon.com/images/I/41G6Cq9f0XL._AC_UL320_.jpg",
    specs: ["Design Slim", "Biometria", "Maçaneta Reversível", "Senha"],
    verdict:
      "A Papaiz SL140 é para quem não quer que a fechadura 'grite' na porta. É discreta, fina e muito bem construída.",
    pros: [
      "Mecanismo de embutir muito fino",
      "Maçaneta ultra confortável",
      "Fácil de combinar com decorações",
      "Alta durabilidade mecânica",
    ],
    cons: ["App básico", "Teclado menor que o padrão"],
    amazonUrl: "https://www.amazon.com.br/Fechadura-Papaiz-Biom%C3%A9trica-Usu%C3%A1rios-Revers%C3%ADvel/dp/B0F8R9WWFQ/",
    mlUrl: "#",
    reviewUrl: "/review/papaiz-sl140",
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
    amazonUrl: "https://www.amazon.com.br/Fechadura-Digital-Intelbras-FR-101/dp/B01MFB1B48/",
    mlUrl: "#",
    reviewUrl: "/review/intelbras-fr-101",
  },
  {
    id: 9,
    rank: 9,
    name: "Samsung SHP-DH538",
    badge: "Robustez Samsung",
    badgeColor: "primary",
    image: "https://www.samsungdoorlock.ca/wp-content/uploads/2019/11/DH-538_Front-e1574452673711.jpg",
    specs: ["Biometria Semicondutora", "Modo Anti-Roubo", "Senha", "Bravo"],
    verdict:
      "Se você quer a marca Samsung mas prefere a segurança de uma maçaneta (alavanca) tradicional, o modelo DH538 é o seu número.",
    pros: [
      "Sensor biométrico de alta velocidade",
      "Estrutura em liga de zinco",
      "Modo não-perturbe",
      "Alarme de intrusão",
    ],
    cons: ["Design um pouco 'quadrado'", "Ocupa bastante espaço na porta"],
    amazonUrl: "https://www.amazon.com.br/s?k=Samsung+SHP-DH538",
    mlUrl: "#",
    reviewUrl: "/review/samsung-shp-dh538",
  },
  {
    id: 10,
    rank: 10,
    name: "Pado FDE-600",
    badge: "Qualidade Nacional",
    badgeColor: "primary",
    image: "https://m.media-amazon.com/images/I/5196zKjY8hL._AC_UL320_.jpg",
    specs: ["Biometria", "Senha", "Tag", "Maçaneta Reversível"],
    verdict:
      "A Pado trouxe sua experiência em fechadeiras mecânicas para o digital. Acabamento impecável e sensação de segurança no toque.",
    pros: [
      "Excelente assistência técnica Pado",
      "Múltiplos modos de abertura",
      "Vem com tags inclusas",
      "Voz de orientação em PT-BR",
    ],
    cons: ["Mecanismo um pouco pesado", "Interface do app datada"],
    amazonUrl: "https://www.amazon.com.br/Fechadura-Digital-Pado-FDE-600W-EP/dp/B0B5B6D4X4/",
    mlUrl: "#",
    reviewUrl: "/review/pado-fde-600",
  },
];

