// src/lib/articles.ts
// Fonte central de todos os artigos do site.
// Reviews são gerados dinamicamente via Astro Content Collections.
// Guias/Comparativos são referenciados manualmente aqui enquanto são .astro estáticos.
// Quando um novo guia for adicionado, basta incluir um novo item aqui também.

export type ArticleCategory = 'Review' | 'Guia' | 'Comparativo' | 'Lista';

export interface Article {
  title: string;
  slug: string;          // URL completa, ex: /review/yale-ymf-40a-rl
  excerpt: string;
  category: ArticleCategory;
  date: string;          // ISO: YYYY-MM-DD
  updatedDate?: string;  // ISO: YYYY-MM-DD
  image: string;
  featured?: boolean;    // true = exibir como destaque no /blog/
}

// ─── Reviews de Produtos ─────────────────────────────────────────────────────
// Estes dados complementam os gerados pelas Astro Content Collections.
// A lista aqui serve para a página /blog/ e o componente RecentArticles.
export const articles: Article[] = [
  {
    title: 'Yale YMF 40A RL: A Fechadura Premium Vale a Pena?',
    slug: '/review/yale-ymf-40a-rl',
    excerpt: 'Testamos a Yale YMF 40A RL com biometria semicondutora, mecanismo de rolete silencioso e integração com Alexa. Descubra se o investimento vale para o seu caso.',
    category: 'Review',
    date: '2026-02-01',
    updatedDate: '2026-03-04',
    image: '/images/produtos/yale-ymf-40a-rl.webp',
    featured: true,
  },
  {
    title: 'Intelbras FR 220: O Queridinho do Brasil Vale a Pena em 2026?',
    slug: '/review/intelbras-fr-220',
    excerpt: 'A FR 220 é a fechadura biométrica mais vendida do Brasil. Mas ela ainda é a melhor escolha custo-benefício em 2026? Review completo com tudo que você precisa saber.',
    category: 'Review',
    date: '2026-02-05',
    updatedDate: '2026-03-04',
    image: '/images/produtos/intelbras-fr-220.webp',
    featured: false,
  },
  {
    title: 'Intelbras IFR 7000: Biometria Facial Sem Contato Vale a Pena?',
    slug: '/review/intelbras-ifr-7000',
    excerpt: 'O reconhecimento facial chegou para fechaduras residenciais. Testamos a IFR 7000 para saber se funciona mesmo no dia a dia — com sol, óculos e máscara.',
    category: 'Review',
    date: '2026-02-08',
    updatedDate: '2026-03-04',
    image: '/images/produtos/intelbras-ifr-7000.webp',
    featured: false,
  },
  {
    title: 'Elsys ESF-DE4000B: Fechadura Biométrica de Embutir Completa?',
    slug: '/review/elsys-esf-de4000b',
    excerpt: 'A Elsys ESF-DE4000B promete robustez e múltiplos métodos de acesso. Analisamos especificações, instalação e custo-benefício desta fechadura de embutir.',
    category: 'Review',
    date: '2026-02-10',
    updatedDate: '2026-03-04',
    image: '/images/produtos/elsys-esf-de4000b.webp',
    featured: false,
  },
  {
    title: 'Intelbras FR 201: A Fechadura Mais Avaliada do Brasil Vale a Pena?',
    slug: '/review/intelbras-fr-201',
    excerpt: 'Com mais de 5.600 avaliações no Mercado Livre, a FR 201 é uma das mais populares do país. Mas popularidade significa qualidade? Review honesto.',
    category: 'Review',
    date: '2026-02-12',
    updatedDate: '2026-03-04',
    image: '/images/produtos/intelbras-fr-201.webp',
    featured: false,
  },
  {
    title: 'Primebras Athenas: Fechadura Digital Acessível Vale a Pena?',
    slug: '/review/primebras-athenas',
    excerpt: 'A Primebras Athenas entra na faixa de preço mais acessível. Descobrimos o que ela entrega e para quem faz mais sentido comprar.',
    category: 'Review',
    date: '2026-02-14',
    updatedDate: '2026-03-04',
    image: '/images/produtos/primebras-athenas.webp',
    featured: false,
  },
  {
    title: 'Intelbras FR 101: Ideal para Começar com Fechadura Biométrica?',
    slug: '/review/intelbras-fr-101',
    excerpt: 'A FR 101 é o modelo de entrada da Intelbras com mais de 7.700 avaliações. Para quem está comprando a primeira fechadura digital, ela é suficiente?',
    category: 'Review',
    date: '2026-02-18',
    updatedDate: '2026-03-04',
    image: '/images/produtos/intelbras-fr-101.webp',
    featured: false,
  },
  {
    title: 'Pado FDE-600: Fechadura Digital de Embutir Vale a Pena?',
    slug: '/review/pado-fde-600',
    excerpt: 'A Pado FDE-600 é uma opção nacional para quem quer fechadura de embutir. Analisamos a qualidade de construção, instalação e custo-benefício real.',
    category: 'Review',
    date: '2026-02-20',
    updatedDate: '2026-03-04',
    image: '/images/produtos/pado-fde-600.webp',
    featured: false,
  },
  {
    title: 'Primebras Athenas Vidro: Melhor Fechadura para Porta de Vidro?',
    slug: '/review/primebras-athenas-vidro',
    excerpt: 'Fechaduras para porta de vidro têm instalação diferente e exigências específicas. Veja se a Athenas Vidro resolve o problema da sua porta sem obras.',
    category: 'Review',
    date: '2026-02-22',
    updatedDate: '2026-03-04',
    image: '/images/produtos/primebras-athenas-vidro.webp',
    featured: false,
  },

  // ─── Guias e Comparativos ──────────────────────────────────────────────────
  {
    title: 'As 10 Melhores Fechaduras Biométricas de 2026: Ranking Completo',
    slug: '/guias/melhores-fechaduras-biometricas-2026',
    excerpt: 'Comparamos os modelos mais vendidos, testados e bem avaliados do mercado. Veja nosso ranking atualizado com análise de custo-benefício, segurança e instalação.',
    category: 'Lista',
    date: '2026-01-15',
    updatedDate: '2026-03-04',
    image: '/images/produtos/yale-ymf-40a-rl.webp',
    featured: false,
  },
  {
    title: 'Melhor Fechadura para Porta de Vidro em 2026: Guia Completo',
    slug: '/guias/melhores-fechaduras-porta-de-vidro-2026',
    excerpt: 'Porta de vidro tem exigências específicas — trilho, espessura, peso do painel. Veja quais fechaduras realmente funcionam e como escolher sem erro.',
    category: 'Guia',
    date: '2026-01-20',
    updatedDate: '2026-03-04',
    image: '/images/produtos/primebras-athenas-vidro.webp',
    featured: false,
  },
];

// Helper: ordenar por data (mais recente primeiro)
export function getArticlesSorted(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Helper: pegar N artigos mais recentes excluindo o atual
export function getRecentArticles(excludeSlug?: string, limit = 4): Article[] {
  return getArticlesSorted()
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, limit);
}

// Helper: artigo em destaque
export function getFeaturedArticle(): Article {
  return articles.find((a) => a.featured) ?? articles[0];
}

// Helper: formatar data para exibição
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
