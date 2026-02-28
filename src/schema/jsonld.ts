// ============================================================
// ARQUIVO: src/schema/jsonld.ts
// O QUE FAZ: Gera os dados estruturados em formato JSON-LD.
//
// JSON-LD é um "roteiro invisível" que você coloca na página
// para que o Google entenda MELHOR o conteúdo.
//
// Por exemplo, quando você vê nos resultados do Google:
// ⭐⭐⭐⭐⭐  "Review Intelbras FR 101"  — com estrelas!
// Isso acontece porque a página tem um JSON-LD de Review.
//
// Este arquivo tem 3 funções que geram esses dados:
// 1. generateArticleSchema  → para artigos comuns
// 2. generateReviewSchema   → para avaliações de produtos
// 3. generateBreadcrumbSchema → para o "rastro" de navegação
// ============================================================

// Importamos as configurações do site (nome, URL, autor)
import { SITE } from '../config/site';

// ============================================================
// TIPO: ArticleSchemaProps
// Define quais informações são necessárias para gerar o schema.
// É como uma lista de ingredientes de uma receita.
// ============================================================
type ArticleSchemaProps = {
  title: string;           // título do artigo
  description: string;     // descrição do artigo
  url: string;             // endereço completo da página
  publishedDate: Date;     // data de publicação
  modifiedDate?: Date;     // data de modificação (opcional — o ? indica isso)
  authorName?: string;     // nome do autor (opcional)
  imageUrl?: string;       // endereço da imagem de capa (opcional)
};

// ============================================================
// FUNÇÃO: generateArticleSchema
// Cria os dados estruturados para um ARTIGO comum.
// O Google usa isso para entender que a página é um artigo.
//
// Pense nisso como preencher um formulário para o Google:
// "Ei Google, esta página é um artigo chamado X,
//  publicado em Y, escrito por Z!"
// ============================================================
export const generateArticleSchema = ({
  title,
  description,
  url,
  publishedDate,
  modifiedDate,
  authorName = SITE.author, // se não informar o autor, usa o padrão do site
  imageUrl,
}: ArticleSchemaProps) => {
  return {
    "@context": "https://schema.org",   // linguagem padrão de dados estruturados
    "@type": "Article",                  // tipo: artigo
    "headline": title,                   // título do artigo (aparece no Google)
    "description": description,          // descrição resumida
    // imageUrl ? [imageUrl] : [] significa:
    // SE tiver imagem → coloca na lista. SE não tiver → lista vazia.
    "image": imageUrl ? [imageUrl] : [],
    "datePublished": publishedDate.toISOString(),    // data em formato universal
    // SE tiver data de modificação, usa ela. SE não, usa a data de publicação.
    "dateModified": modifiedDate ? modifiedDate.toISOString() : publishedDate.toISOString(),
    "author": {
      "@type": "Person",     // o autor é uma Pessoa
      "name": authorName     // nome do autor
    },
    "publisher": {
      "@type": "Organization",  // o publicador é uma Organização
      "name": SITE.name,        // nome do site
      "logo": {
        "@type": "ImageObject",            // o logo é uma imagem
        "url": `${SITE.url}/logo.png`      // endereço do logo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",  // este artigo é a PRINCIPAL entidade da página
      "@id": url           // identificado pelo endereço da página
    }
  };
};

// ============================================================
// FUNÇÃO: generateReviewSchema
// Cria os dados estruturados para uma AVALIAÇÃO (Review).
// Os reviews são especiais porque o Google pode mostrar
// as estrelas de avaliação direto no resultado de busca!
//
// Esta função "constrói em cima" do schema de artigo,
// adicionando informações extras sobre o produto e a nota.
// ============================================================
export const generateReviewSchema = (
  articleProps: ArticleSchemaProps,  // dados básicos do artigo
  itemName: string,                   // nome do produto avaliado
  rating: number = 5,                 // nota de 1 a 5 (padrão: 5 estrelas)
  pros?: string[],                    // lista de vantagens (opcional)
  cons?: string[]                     // lista de desvantagens (opcional)
) => {
  // Primeiro criamos o schema base de artigo
  const baseSchema = generateArticleSchema(articleProps);

  // Depois "espalhamos" (spread ...) o schema base e adicionamos
  // os campos extras específicos de review
  return {
    ...baseSchema,              // tudo que um artigo normal tem
    "@type": "Review",          // mas o tipo agora é Review (avaliação)!
    "itemReviewed": {
      "@type": "Product",       // o que está sendo avaliado é um Produto
      "name": itemName          // nome do produto (ex: "Intelbras FR 101")
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": rating.toString(),  // nota (ex: "5")
      "bestRating": "5"                  // nota máxima possível
    },
    // NOTAS POSITIVAS: lista de vantagens em formato aceito pelo Google
    // pros.map() transforma a lista de textos em objetos com posição
    "positiveNotes": pros ? { 
      "@type": "ItemList", 
      "itemListElement": pros.map((p, i) => ({ 
        "@type": "ListItem", 
        "position": i + 1,  // posição: 1, 2, 3...
        "name": p           // texto da vantagem
      })) 
    } : undefined,

    // NOTAS NEGATIVAS: lista de desvantagens em formato aceito pelo Google
    "negativeNotes": cons ? { 
      "@type": "ItemList", 
      "itemListElement": cons.map((c, i) => ({ 
        "@type": "ListItem", 
        "position": i + 1,  // posição: 1, 2, 3...
        "name": c           // texto da desvantagem
      })) 
    } : undefined,
  };
};

// ============================================================
// FUNÇÃO: generateBreadcrumbSchema
// Cria os dados do "rastro de navegação" para o Google.
//
// Breadcrumb (migalhas de pão) vem da história de João e Maria:
// eles deixavam migalhas para encontrar o caminho de volta.
// Na web, é o caminho que aparece no topo de uma página:
//   Home > Blog > Nome do Artigo
//
// O Google usa isso para entender onde a página fica
// na hierarquia do site, e pode mostrar isso no resultado
// de busca como:  fechadurabiometrica.com.br › blog › artigo
// ============================================================
export const generateBreadcrumbSchema = (url: string, title: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",  // tipo: lista de migalhas de pão
    "itemListElement": [
      // 1ª migalha: Home (a página inicial)
      {
        "@type": "ListItem",
        "position": 1,           // posição na hierarquia
        "name": "Home",          // nome visível
        "item": SITE.url         // endereço da página inicial
      },
      // 2ª migalha: Blog (a lista de artigos)
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${SITE.url}/blog`  // endereço da lista do blog
      },
      // 3ª migalha: O artigo atual (onde o usuário está)
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,    // nome do artigo atual
        "item": url       // endereço completo do artigo
      }
    ]
  };
};
