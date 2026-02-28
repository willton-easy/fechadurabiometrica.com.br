// ============================================================
// ARQUIVO: src/content/config.ts
// O QUE FAZ: Define o "formato" que cada artigo do blog
// precisa ter. É como um formulário obrigatório:
// todo artigo DEVE ter título, descrição e data.
// Se algum artigo estiver faltando um campo obrigatório,
// o Astro vai mostrar um erro na tela, avisando o erro.
//
// Isso evita que você esqueça de colocar informações
// importantes em um artigo!
// ============================================================

// Importamos as ferramentas do Astro para definir coleções
// e do Zod (biblioteca de validação) para definir os tipos de dados
import { defineCollection, z } from 'astro:content';

// Aqui criamos a "coleção" chamada 'blog'.
// Uma COLEÇÃO é uma pasta com arquivos de conteúdo
// (como artigos em Markdown) que seguem um padrão.
const blogCollection = defineCollection({
  // 'type: content' significa que os arquivos são
  // documentos de texto (Markdown ou MDX)
  type: 'content',

  // 'schema' define as REGRAS de cada artigo.
  // z.object({ ... }) é como dizer: "cada artigo deve
  // ter esse conjunto de campos".
  schema: z.object({
    // Título do artigo — texto obrigatório
    title: z.string(),

    // Resumo curto do artigo — texto obrigatório
    // (aparece no Google e nas listagens)
    description: z.string(),

    // Data de publicação — obrigatória
    date: z.date(),

    // Data de atualização — opcional (só coloca se atualizar o artigo)
    updated: z.date().optional(),

    // Tipo do artigo — só aceita uma dessas 4 opções:
    // 'review'      → análise de um produto específico
    // 'comparativo' → comparação entre vários produtos
    // 'guia'        → tutorial ou passo a passo
    // 'informativo' → artigo informativo geral
    type: z.enum(['review', 'comparativo', 'guia', 'informativo']),

    // Se o artigo é destaque na página inicial (padrão: false)
    featured: z.boolean().default(false).optional(),

    // Se o artigo ainda está em rascunho e não deve aparecer (padrão: false)
    draft: z.boolean().default(false).optional(),

    // Palavras-chave do artigo (ex: ["Intelbras", "Segurança"])
    tags: z.array(z.string()).optional(),

    // Título especial para o Google (diferente do título normal)
    seoTitle: z.string().optional(),

    // Descrição especial para o Google
    seoDescription: z.string().optional(),

    // Lista de VANTAGENS do produto (usado em reviews)
    pros: z.array(z.string()).optional(),

    // Lista de DESVANTAGENS do produto (usado em reviews)
    cons: z.array(z.string()).optional(),

    // Link de afiliado para comprar o produto
    // .url() valida automaticamente se é um link válido
    affiliateLink: z.string().url().optional(),

    // Texto do preço ou promoção (ex: "R$ 199,90 na Amazon")
    priceText: z.string().optional(),

    // Destaque especial do produto (ex: "Melhor Custo Benefício")
    highlight: z.string().optional()
  })
});

// Exportamos todas as coleções para o Astro reconhecer.
// Se criar uma nova coleção (ex: 'produtos'), adiciona aqui também!
export const collections = {
  blog: blogCollection, // a coleção 'blog' usa as regras definidas acima
};
