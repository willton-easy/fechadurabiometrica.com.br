import { config, collection, fields } from '@keystatic/core';

// ─────────────────────────────────────────────
// Autores disponíveis no projeto
// ─────────────────────────────────────────────
const AUTHORS = [
  { label: 'Nilton Vasconcelo', value: 'Nilton Vasconcelo' },
  { label: 'Wilton Alves', value: 'Wilton Alves' },
  { label: 'Katarina Brito', value: 'Katarina Brito' },
];

// ─────────────────────────────────────────────
// Categorias disponíveis
// ─────────────────────────────────────────────
const CATEGORIES_GUIAS = [
  { label: 'Guias', value: 'Guias' },
  { label: 'Dicas', value: 'Dicas' },
  { label: 'Smart Home', value: 'Smart Home' },
  { label: 'Segurança', value: 'Segurança' },
];

const CATEGORIES_REVIEWS = [
  { label: 'Review', value: 'Review' },
  { label: 'Comparativo', value: 'Comparativo' },
  { label: 'Análise Técnica', value: 'Análise Técnica' },
];

// ─────────────────────────────────────────────
// Campos base compartilhados entre coleções
// ─────────────────────────────────────────────
const baseFields = {
  title: fields.text({
    label: '📝 Título do Artigo',
    description: 'Título principal que aparece no blog e nas redes sociais',
    validation: { isRequired: true },
  }),
  description: fields.text({
    label: '📋 Descrição / Resumo',
    description: 'Resumo curto do artigo (aparece nos cards do blog)',
    multiline: true,
    validation: { isRequired: true },
  }),
  seoTitle: fields.text({
    label: '🔍 Título SEO (Google)',
    description: 'Título que aparece na aba do navegador e no Google. Se não preencher, usa o Título do Artigo.',
    multiline: false,
  }),
  seoDescription: fields.text({
    label: '🔍 Descrição SEO (Google)',
    description: 'Texto de até 160 chars que aparece abaixo do link no Google',
    multiline: true,
  }),
  author: fields.select({
    label: '✍️ Autor',
    description: 'Selecione o redator responsável pelo artigo',
    options: AUTHORS,
    defaultValue: 'Nilton Vasconcelo',
  }),
  publishDate: fields.date({
    label: '📅 Data de Publicação',
    description: 'Data em que o artigo será publicado',
    defaultValue: { kind: 'today' },
  }),
  image: fields.text({
    label: '🖼️ Imagem de Capa (Caminho)',
    description: 'Caminho da imagem. Ex: ~/assets/images/minha-imagem.png (salve a imagem em src/assets/images/ primeiro)',
  }),
  tags: fields.array(
    fields.text({ label: 'Tag' }),
    {
      label: '🏷️ Tags',
      description: 'Palavras-chave para categorizar o artigo',
      itemLabel: (props) => props.fields.value,
    }
  ),
  featured: fields.checkbox({
    label: '⭐ Artigo em Destaque?',
    description: 'Marque para destacar este artigo na home do blog',
    defaultValue: false,
  }),
  affiliateLink: fields.text({
    label: '🛒 Link de Afiliado Principal',
    description: 'Link principal de afiliado Amazon ou Mercado Livre (opcional)',
  }),
};

// ─────────────────────────────────────────────
// Configuração Principal do Keystatic
// ─────────────────────────────────────────────
export default config({
  // Modo local: salva diretamente nos arquivos do projeto
  storage: {
    kind: 'local',
  },

  // ─── Interface do Painel ───
  ui: {
    brand: {
      name: 'Fechadura Biométrica — CMS',
    },
  },

  // ─── Coleções (tipos de conteúdo) ───
  collections: {

    // =============================================
    // 1. GUIAS E ARTIGOS LONGOS
    // =============================================
    guias: collection({
      label: '📘 Guias e Artigos',
      slugField: 'title',
      path: 'src/content/guias/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        ...baseFields,
        category: fields.select({
          label: '📂 Categoria',
          options: CATEGORIES_GUIAS,
          defaultValue: 'Guias',
        }),
        content: fields.mdx({
          label: '✍️ Conteúdo do Artigo',
          description: 'Escreva o artigo completo aqui. Use a barra de ferramentas para formatar.',
        }),
      },
    }),

    // =============================================
    // 2. REVIEWS DE PRODUTOS
    // =============================================
    reviews: collection({
      label: '⭐ Reviews de Produtos',
      slugField: 'title',
      path: 'src/content/reviews/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        ...baseFields,
        category: fields.select({
          label: '📂 Categoria',
          options: CATEGORIES_REVIEWS,
          defaultValue: 'Review',
        }),
        pros: fields.array(
          fields.text({ label: 'Ponto Positivo' }),
          {
            label: '✅ Prós (Pontos Positivos)',
            description: 'Liste os pontos fortes do produto',
            itemLabel: (props) => props.fields.value,
          }
        ),
        cons: fields.array(
          fields.text({ label: 'Ponto Negativo' }),
          {
            label: '❌ Contras (Pontos Negativos)',
            description: 'Liste os pontos fracos do produto',
            itemLabel: (props) => props.fields.value,
          }
        ),
        priceText: fields.text({
          label: '💰 Faixa de Preço',
          description: 'Ex: R$ 1.200 a R$ 1.500',
        }),
        highlight: fields.text({
          label: '🏆 Destaque Principal',
          description: 'Uma frase que resume o diferencial do produto. Ex: Melhor custo-benefício de 2026',
        }),
        content: fields.mdx({
          label: '✍️ Conteúdo do Review',
          description: 'Escreva o review completo aqui. Use a barra de ferramentas para formatar.',
        }),
      },
    }),

    // =============================================
    // 3. COMPARATIVOS
    // =============================================
    comparativos: collection({
      label: '⚖️ Comparativos',
      slugField: 'title',
      path: 'src/content/comparativos/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        ...baseFields,
        category: fields.select({
          label: '📂 Categoria',
          options: [{ label: 'Comparativo', value: 'Comparativo' }],
          defaultValue: 'Comparativo',
        }),
        content: fields.mdx({
          label: '✍️ Conteúdo do Comparativo',
          description: 'Escreva o comparativo completo aqui.',
        }),
      },
    }),
  },
});
