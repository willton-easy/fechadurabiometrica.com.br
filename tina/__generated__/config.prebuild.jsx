// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var seoFields = [
  { type: "string", name: "seoTitle", label: "T\xEDtulo SEO (60 chars)" },
  { type: "string", name: "seoDescription", label: "Descri\xE7\xE3o SEO (160 chars)" }
];
var productFields = [
  { type: "number", name: "position", label: "Posi\xE7\xE3o no Ranking" },
  { type: "string", name: "title", label: "Nome do Produto", required: true },
  { type: "string", name: "image", label: "URL Imagem Principal (Amazon _AC_SL500_)" },
  {
    type: "object",
    name: "extraImages",
    label: "Imagens Extras (Galeria)",
    list: true,
    fields: [
      { type: "string", name: "url", label: "URL da Imagem" }
    ]
  },
  { type: "string", name: "badge", label: "Badge de Destaque (ex: \u{1F3C6} Melhor Geral)" },
  { type: "number", name: "rating", label: "Nota (1-5)" },
  { type: "number", name: "reviewCount", label: "Qtd. Avalia\xE7\xF5es" },
  { type: "string", name: "amazonLink", label: "Link Amazon (com tag willseg-20)" },
  { type: "string", name: "mercadoLivreLink", label: "Link Mercado Livre" }
];
var config_default = defineConfig({
  branch,
  clientId: process.env.PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ─────────────────────────────────────────
      // REVIEWS
      // ─────────────────────────────────────────
      {
        name: "reviews",
        label: "\u{1F4DD} Reviews",
        path: "src/content/reviews",
        format: "md",
        ui: {
          defaultItem: {
            type: "review",
            featured: false,
            date: (/* @__PURE__ */ new Date()).toISOString()
          }
        },
        fields: [
          { type: "string", name: "title", label: "T\xEDtulo do Review", required: true },
          { type: "string", name: "description", label: "Descri\xE7\xE3o Curta", required: true },
          { type: "datetime", name: "date", label: "Data de Publica\xE7\xE3o" },
          { type: "boolean", name: "featured", label: "Artigo em Destaque?" },
          { type: "string", name: "tags", label: "Tags", list: true },
          ...seoFields,
          { type: "string", name: "pros", label: "\u2705 Pr\xF3s", list: true },
          { type: "string", name: "cons", label: "\u274C Contras", list: true },
          { type: "string", name: "affiliateLink", label: "Link Afiliado Amazon (tag: willseg-20)" },
          { type: "string", name: "mlLink", label: "Link Afiliado Mercado Livre" },
          { type: "string", name: "priceText", label: "Texto de Pre\xE7o (ex: R$ 389 em mar\xE7o/2026)" },
          { type: "string", name: "highlight", label: "Selo de Destaque (ex: Melhor Custo-Benef\xEDcio)" },
          { type: "number", name: "rating", label: "Nota (1-5)" },
          {
            type: "object",
            name: "images",
            label: "Imagens do Produto (Galeria)",
            list: true,
            fields: [
              { type: "string", name: "url", label: "URL Amazon (_AC_SL500_)" },
              { type: "string", name: "alt", label: "Texto alternativo" }
            ]
          },
          { type: "rich-text", name: "body", label: "Corpo do Artigo", isBody: true }
        ]
      },
      // ─────────────────────────────────────────
      // COMPARATIVOS
      // ─────────────────────────────────────────
      {
        name: "comparativos",
        label: "\u2696\uFE0F Comparativos",
        path: "src/content/comparativos",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "T\xEDtulo do Comparativo", required: true },
          { type: "string", name: "description", label: "Descri\xE7\xE3o Curta", required: true },
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
            fields: productFields
          },
          { type: "rich-text", name: "body", label: "Conte\xFAdo do Comparativo", isBody: true }
        ]
      },
      // ─────────────────────────────────────────
      // GUIAS
      // ─────────────────────────────────────────
      {
        name: "guias",
        label: "\u{1F4D6} Guias de Compra",
        path: "src/content/guias",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "T\xEDtulo do Guia", required: true },
          { type: "string", name: "description", label: "Descri\xE7\xE3o Curta", required: true },
          { type: "datetime", name: "date", label: "Data" },
          { type: "boolean", name: "featured", label: "Em Destaque?" },
          { type: "string", name: "tags", label: "Tags", list: true },
          ...seoFields,
          // Lista de produtos do Top 10
          {
            type: "object",
            name: "products",
            label: "\u2B50 Produtos do Ranking (Top N)",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.title ? `#${item.position} \u2014 ${item.title}` : "Novo Produto"
              })
            },
            fields: productFields
          },
          { type: "rich-text", name: "body", label: "Conte\xFAdo do Guia", isBody: true }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
