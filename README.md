# Fechadura Biométrica - Blog

Projeto de blog focado em segurança residencial (fechaduras digitais, biométricas e eletrônicas). Otimizado para SEO de alta performance e experiência do usuário afiliado.

## 🚀 Arquitetura

O sistema foi montado de forma VibeCoding profissional utilizando as seguintes tecnologias:

- **Framework**: Astro (SSG nativo para ultra-performance)
- **Estilização**: Tailwind CSS Integrado
- **Linguagem**: TypeScript Strict
- **Conteúdo**: Astro Content Collections (Markdown e MDX com validação `Zod`)
- **SEO Automático**: OpenGraph, Schema.org (JSON-LD dinâmico Baseado no `type` do Post)
- **Deploy**: Preparado 100% para a plataforma Vercel

## 📁 Estrutura do Projeto

- `src/components/`: Componentes reutilizáveis (como botões afiliados e blocos de prós/contras).
- `src/layouts/`: Arquivos base de layout HTML (`BaseLayout`) e o layout de injeção inteligente (`BlogLayout`).
- `src/pages/`: Rotas automáticas geradas pelo arquivo. Contém a home `index.astro` e o slug dinâmico em `blog/[...slug].astro`.
- `src/content/config.ts`: Modela a base de dados em Markdown.
- `src/content/blog/`: Onde todos os arquivos `.md` devem ser estocados.
- `src/schema/jsonld.ts`: Lógica de injeção de schemas SEO no Google.

## 📝 Como criar um novo Post

Dentro de `src/content/blog/`, crie um arquivo markdown como `minha-analise.md`. Preencha o Frontmatter estrito:

```yaml
---
title: "Review Fechadura XYZ"
description: "Descrição breve que aparecerá nos cards da home"
date: 2026-03-01
type: "review" # Pode ser review, comparativo, guia, informativo
seoTitle: "Melhor fechadura XYZ de 2026" # Opcional
pros:
  - "Pró 1"
  - "Pró 2"
cons:
  - "Contra 1"
affiliateLink: "https://seu-link-de-afiliado.com"
priceText: "Verificado no site"
highlight: "Destaque da Fechadura"
---

Texto do conteúdo aqui...
```

Caso você informe `type: "review"`, o `BlogLayout` automaticamente irá gerar o quadro visual com os **Prós e Contras** e adicionará o **Botão Call to Action** no rodapé do artigo. Além disso, a página informará ao Google via JSON-LD que este post é um "Review", favorecendo as estrelas nas buscas.

## 💻 Scripts Locais

- `npm run dev`: Subir servidor de testes local da Astro.
- `npm run build`: Gerar arquivos estáticos na flag `dist`.
- `npm run astro check`: Validar os tipos de TypeScript.
