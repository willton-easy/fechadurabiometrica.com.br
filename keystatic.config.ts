import { config, collection, fields } from '@keystatic/core';

const AUTHORS = [
  { label: 'Nilton Vasconcelo', value: 'Nilton Vasconcelo' },
  { label: 'Wilton Alves', value: 'Wilton Alves' },
  { label: 'Katarina Brito', value: 'Katarina Brito' },
];

const CATEGORIES = [
  { label: 'Guias', value: 'Guias' },
  { label: 'Dicas', value: 'Dicas' },
  { label: 'Smart Home', value: 'Smart Home' },
  { label: 'Segurança', value: 'Segurança' },
  { label: 'Review', value: 'Review' },
  { label: 'Comparativo', value: 'Comparativo' },
];

// O espelho exato do Schema AstroWind do seu projeto:
const baseFields = {
  title: fields.text({ label: '📝 Título do Artigo', validation: { isRequired: true } }),
  description: fields.text({ label: '📋 Descrição / Resumo', multiline: true }),
  excerpt: fields.text({ label: 'Resumo Legado (Excerpt)', multiline: true }),
  
  publishDate: fields.date({ label: '📅 Data de Publicação' }),
  updateDate: fields.date({ label: '📅 Data de Atualização' }),
  date: fields.date({ label: '📅 Data Alternativa' }),
  
  author: fields.select({ label: '✍️ Autor', options: AUTHORS, defaultValue: 'Nilton Vasconcelo' }),
  category: fields.select({ label: '📂 Categoria', options: CATEGORIES, defaultValue: 'Guias' }),
  tags: fields.array(fields.text({ label: 'Tag' }), { label: '🏷️ Tags', itemLabel: (p) => p.fields.value }),
  
  image: fields.text({ label: '🖼️ Imagem de Capa (Caminho)' }),
  draft: fields.checkbox({ label: 'Rascunho?', defaultValue: false }),
  featured: fields.checkbox({ label: '⭐ Destacado?', defaultValue: false }),
  type: fields.text({ label: 'Tipo de Conteúdo' }),
  
  seoTitle: fields.text({ label: '🔍 Título SEO' }),
  seoDescription: fields.text({ label: '🔍 Descrição SEO', multiline: true }),
  
  // Campos do "Reviews" que alguns arquivos antigos usam acidentalmente
  pros: fields.array(fields.text({ label: 'Pró' }), { label: 'Prós', itemLabel: (p) => p.fields.value }),
  cons: fields.array(fields.text({ label: 'Contra' }), { label: 'Contras', itemLabel: (p) => p.fields.value }),
  affiliateLink: fields.text({ label: 'Link Afiliado Legado' }),
  priceText: fields.text({ label: 'Texto Preço Legado' }),
  highlight: fields.text({ label: 'Destaque Legado' }),

  metadata: fields.object({
    title: fields.text({ label: 'Metadata Title' }),
    ignoreTitleTemplate: fields.checkbox({ label: 'Ignorar Template de Título?', defaultValue: false }),
    canonical: fields.text({ label: 'URL Canônica' }),
    description: fields.text({ label: 'Metadata Descrição' }),
    robots: fields.object({
      index: fields.checkbox({ label: 'Index', defaultValue: true }),
      follow: fields.checkbox({ label: 'Follow', defaultValue: true }),
    }),
    openGraph: fields.object({
      url: fields.text({ label: 'OG URL' }),
      siteName: fields.text({ label: 'OG Site Name' }),
      locale: fields.text({ label: 'OG Locale' }),
      type: fields.text({ label: 'OG Type' }),
      // arrays e sub-objetos complexos removidos para simplicidade visual,
      // mas as chaves estritas são mantidas no modo relaxado do MDX se suportadas
    }),
    twitter: fields.object({
      handle: fields.text({ label: 'Twitter Handle' }),
      site: fields.text({ label: 'Twitter Site' }),
      cardType: fields.text({ label: 'Twitter Card Type' }),
    }),
  }),
};

export default config({
  storage: { kind: 'local' },
  ui: { brand: { name: 'Fechadura Biométrica — CMS' } },

  collections: {
    guias: collection({
      label: '📘 Guias e Artigos',
      slugField: 'title',
      path: 'src/content/guias/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        ...baseFields,
        content: fields.text({
          label: '✍️ Conteúdo do Artigo (Modo Código Compatível)',
          multiline: true,
        }),
      },
    }),
    reviews: collection({
      label: '⭐ Reviews de Produtos',
      slugField: 'title',
      path: 'src/content/reviews/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        ...baseFields,
        content: fields.text({
          label: '✍️ Conteúdo do Review (Modo Código Compatível)',
          multiline: true,
        }),
      },
    }),
    comparativos: collection({
      label: '⚖️ Comparativos',
      slugField: 'title',
      path: 'src/content/comparativos/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        ...baseFields,
        content: fields.text({
          label: '✍️ Conteúdo (Modo Código Compatível)',
          multiline: true,
        }),
      },
    }),
  },
});
