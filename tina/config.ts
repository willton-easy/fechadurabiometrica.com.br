import { defineConfig } from "tinacms";

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

// Campos base compartilhados entre coleções
const seoFields = [
  { type: "string" as const, name: "seoTitle", label: "Título SEO (60 chars)" },
  { type: "string" as const, name: "seoDescription", label: "Descrição SEO (160 chars)" },
];

const productFields = [
  { type: "number" as const, name: "position", label: "Posição no Ranking" },
  { type: "string" as const, name: "title", label: "Nome do Produto", required: true },
  { type: "string" as const, name: "image", label: "URL Imagem Principal (Amazon _AC_SL500_)" },
  {
    type: "object" as const,
    name: "extraImages",
    label: "Imagens Extras (Galeria)",
    list: true,
    fields: [
      { type: "string" as const, name: "url", label: "URL da Imagem" },
    ],
  },
  { type: "string" as const, name: "badge", label: "Badge de Destaque (ex: 🏆 Melhor Geral)" },
  { type: "number" as const, name: "rating", label: "Nota (1-5)" },
  { type: "number" as const, name: "reviewCount", label: "Qtd. Avaliações" },
  { type: "string" as const, name: "amazonLink", label: "Link Amazon (com tag willseg-20)" },
  { type: "string" as const, name: "mercadoLivreLink", label: "Link Mercado Livre" },
];

export default defineConfig({
  branch,
  clientId: process.env.PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // ─────────────────────────────────────────
      // REVIEWS
      // ─────────────────────────────────────────
      {
        name: "reviews",
        label: "📝 Reviews",
        path: "src/content/reviews",
        format: "md",
        ui: {
          defaultItem: {
            type: "review",
            featured: false,
            date: new Date().toISOString(),
          },
        },
        fields: [
          { type: "string", name: "title", label: "Título do Review", required: true },
          { type: "string", name: "description", label: "Descrição Curta", required: true },
          { type: "datetime", name: "date", label: "Data de Publicação" },
          { type: "boolean", name: "featured", label: "Artigo em Destaque?" },
          { type: "string", name: "tags", label: "Tags", list: true },
          ...seoFields,
          { type: "string", name: "pros", label: "✅ Prós", list: true },
          { type: "string", name: "cons", label: "❌ Contras", list: true },
          { type: "string", name: "affiliateLink", label: "Link Afiliado Amazon (tag: willseg-20)" },
          { type: "string", name: "mlLink", label: "Link Afiliado Mercado Livre" },
          { type: "string", name: "priceText", label: "Texto de Preço (ex: R$ 389 em março/2026)" },
          { type: "string", name: "highlight", label: "Selo de Destaque (ex: Melhor Custo-Benefício)" },
          { type: "number", name: "rating", label: "Nota (1-5)" },
          {
            type: "object",
            name: "images",
            label: "Imagens do Produto (Galeria)",
            list: true,
            fields: [
              { type: "string" as const, name: "url", label: "URL Amazon (_AC_SL500_)" },
              { type: "string" as const, name: "alt", label: "Texto alternativo" },
            ],
          },
          { type: "rich-text", name: "body", label: "Corpo do Artigo", isBody: true },
        ],
      },

      // ─────────────────────────────────────────
      // COMPARATIVOS
      // ─────────────────────────────────────────
      {
        name: "comparativos",
        label: "⚖️ Comparativos",
        path: "src/content/comparativos",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Título do Comparativo", required: true },
          { type: "string", name: "description", label: "Descrição Curta", required: true },
          { type: "datetime", name: "date", label: "Data" },
          { type: "boolean", name: "featured", label: "Em Destaque?" },
          { type: "string", name: "tags", label: "Tags", list: true },
          ...seoFields,
          // Produtos comparados
          {
            type: "object",
            name: "products",
            label: "Produtos Comparados",
            list: true,
            fields: productFields,
          },
          { type: "rich-text", name: "body", label: "Conteúdo do Comparativo", isBody: true },
        ],
      },

      // ─────────────────────────────────────────
      // GUIAS
      // ─────────────────────────────────────────
      {
        name: "guias",
        label: "📖 Guias de Compra",
        path: "src/content/guias",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Título do Guia", required: true },
          { type: "string", name: "description", label: "Descrição Curta", required: true },
          { type: "datetime", name: "date", label: "Data" },
          { type: "boolean", name: "featured", label: "Em Destaque?" },
          { type: "string", name: "tags", label: "Tags", list: true },
          ...seoFields,
          // Lista de produtos do Top 10
          {
            type: "object",
            name: "products",
            label: "⭐ Produtos do Ranking (Top N)",
            list: true,
            ui: {
              itemProps: (item: { title?: string; position?: number }) => ({
                label: item?.title ? `#${item.position} — ${item.title}` : "Novo Produto",
              }),
            },
            fields: productFields,
          },
          { type: "rich-text", name: "body", label: "Conteúdo do Guia", isBody: true },
        ],
      },
    ],
  },
});
