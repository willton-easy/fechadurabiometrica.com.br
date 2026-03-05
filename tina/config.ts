import { defineConfig } from "tinacms";

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

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
      {
        name: "reviews",
        label: "Reviews",
        path: "src/content/reviews",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Título", required: true },
          { type: "string", name: "description", label: "Descrição", required: true },
          { type: "datetime", name: "date", label: "Data" },
          { type: "string", name: "type", label: "Tipo (review)", required: true },
          { type: "boolean", name: "featured", label: "Destaque" },
          { type: "string", name: "tags", label: "Tags", list: true },
          { type: "string", name: "seoTitle", label: "Título SEO" },
          { type: "string", name: "seoDescription", label: "Descrição SEO" },
          { type: "string", name: "pros", label: "Prós", list: true },
          { type: "string", name: "cons", label: "Contras", list: true },
          { type: "string", name: "affiliateLink", label: "Link Afiliado Amazon" },
          { type: "string", name: "priceText", label: "Texto do Preço" },
          { type: "string", name: "highlight", label: "Texto de Destaque" },
          { type: "rich-text", name: "body", label: "Corpo do Artigo", isBody: true },
        ],
      },
      {
        name: "comparativos",
        label: "Comparativos",
        path: "src/content/comparativos",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Título", required: true },
          { type: "string", name: "description", label: "Descrição", required: true },
          { type: "datetime", name: "date", label: "Data" },
          { type: "string", name: "type", label: "Tipo (comparativo)", required: true },
          { type: "boolean", name: "featured", label: "Destaque" },
          { type: "string", name: "tags", label: "Tags", list: true },
          { type: "string", name: "seoTitle", label: "Título SEO" },
          { type: "string", name: "seoDescription", label: "Descrição SEO" },
          { type: "string", name: "affiliateLink", label: "Link Afiliado Amazon" },
          { type: "rich-text", name: "body", label: "Corpo do Artigo", isBody: true },
        ],
      },
      {
        name: "guias",
        label: "Guias",
        path: "src/content/guias",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Título", required: true },
          { type: "string", name: "description", label: "Descrição", required: true },
          { type: "datetime", name: "date", label: "Data" },
          { type: "string", name: "type", label: "Tipo (guia)", required: true },
          { type: "boolean", name: "featured", label: "Destaque" },
          { type: "string", name: "tags", label: "Tags", list: true },
          { type: "string", name: "seoTitle", label: "Título SEO" },
          { type: "string", name: "seoDescription", label: "Descrição SEO" },
          { type: "rich-text", name: "body", label: "Corpo do Artigo", isBody: true },
        ],
      },
    ],
  },
});
