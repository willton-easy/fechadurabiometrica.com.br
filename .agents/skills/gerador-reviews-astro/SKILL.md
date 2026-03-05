---
name: gerador-reviews-astro
description: Skill autônoma para navegar em e-commerces (Amazon), extrair fotos, preços e links, reescrever as descrições evitando plágio e gerar os arquivos em Markdown nativo para o projeto Astro.
---

# Gerador de Reviews e Artigos em Markdown para Astro

Esta skill fornece uma automação robótica guiada por IA para criar postagens completas de review sem a necessidade de um CMS (WordPress) ou importador de JSON. O Agente Antigravity atua como um navegador autônomo, acessando a loja, extraindo informações visuais e textuais, e gerando arquivos locais baseados em Markdown.

## 🎯 Quando usar esta Skill?

Sempre que o usuário quiser buscar novos produtos afiliados na Amazon (ou outros e-commerces) e gerar automaticamente arquivos estruturados para o Astro.

**Exemplo de Prompt para o usuário iniciar:**

> "Execute a skill gerador-reviews-astro. Pesquise os 2 produtos mais vendidos de fechaduras digitais Intelbras na Amazon. Use minha tag de afiliado 'fechadurabio-20'."

## ⚙️ Instruções de Execução para o Agente (VOCÊ)

Quando ativada, **VOCÊ (Agente Antigravity)** deverá executar os passos abaixo de forma estritamente autônoma, silenciosa e sequencial:

### 1. Pesquisa Web e Extração (Browser Subagent)

- Abra o navegador e acesse a loja pesquisando pelo **NICHO/PRODUTO** e **QUANTIDADE** delimitada pelo usuário.
- Entre na página inicial de cada produto resultante.
- **Dados a Extrair:**
  - Preço atual listado.
  - Imagem principal em alta qualidade (para Hero Image).
  - Extraia no máximo 6 fotos em ótima qualidade analisando a galeria.
  - URL canônica (base) do produto.

### 2. Formatação da URL de Afiliado

- Pegue a URL base que você extraiu.
- Adicione o parâmetro obrigatório contendo a tag de afiliado do usuário.
- _Você automatiza todo o tagueamento localmente na URL limpa extraída._

### 3. Redação Anti-Plágio (Criação de Conteúdo)

- **PROIBIDO:** Copiar os textos exatos da loja.
- Crie um **Título Otimizado**, provocativo e focado nos benefícios.
- Escreva uma descrição imersiva e persuasiva (em formato de Análise / Review). Foque em destacar pontos fortes e os pormenores técnicos.

### 4. Geração do Arquivo do Astro (.md)

Para cada produto analisado e convertido, **CRIE um novo arquivo** dentro do projeto do usuário (geralmente em `src/content/reviews/slug-do-produto.md` ou outra pasta que o usuário designar).

Use obrigatoriamente a estrutura abaixo para salvar o arquivo:

```markdown
---
title: "[Título Otimizado que você gerou]"
description: "[Breve resumo chamativo sobre o produto]"
pubDate: "[Data Atual no formato YYYY-MM-DD]"
heroImage: "[URL da foto principal em alta resolução]"
affiliateLink: "[A Url construída com a tag de afiliado]"
price: "[Preço atual]"
---

## Análise do Produto

[Insira aqui a descrição imersiva e original escrita por você, detalhando a fechadura e os prós de adquiri-la]

## Galeria de Fotos Promocionais

[Crie uma listagem ou formatação com as URLs Markdown das até 6 fotos extraídas]

## Veredito

[Parágrafo de incentivo argumentativo seguido de uma chamada para ação clara direcionando para clicar no link abaixo]

[🛒 Verificar Disponibilidade e Preço Promocional na Amazon]([Inserir o affiliateLink aqui])
```

### 5. Finalização

- Gere um arquivo `.md` por produto.
- Retorne ao usuário afirmando quantos produtos foram processados, os arquivos marcados recém-criados e notifique a finalização.
