# MÓDULO GLOBAL: PESQUISA DE CONCORRÊNCIA E GERAÇÃO DE SUPERCONTEÚDO (SEOPack + Semrush)

## 1. Acesso ao SEOPack.org (Ferramenta Agregadora de SEO)
O SEOPack.org dá acesso a Semrush, Ahrefs, Moz, etc. 
Requisito:
- Armazenar credenciais nas **variáveis de ambiente** (`SEOPACK_USER`, `SEOPACK_PASS`). NUNCA no código ou logs.
- Para acessar, o agente usará um script (ex: Python/Node) para login e extração de dados.
- O agente pode chamar a automação/skill `seopack-query` que recebe uma palavra-chave e retorna:
  - Volume de busca, dificuldade, CPC.
  - Top 10 concorrentes orgânicos.
  - Palavras-chave relacionadas e perguntas (People Also Ask).
  - Headlines dos concorrentes.

**Segurança**: Solicitar que o usuário configure as variáveis de ambiente. Se não estiverem configuradas, avisar.

## 2. Workflow de Pesquisa de Concorrência e Oportunidades
1. **Consultar o SEOPack** via skill `seopack-query`:
   - Dificuldade < 50, Volume > 100/mês.
   - Lista de 5 concorrentes principais.
2. **Visitar os 5 concorrentes**:
   - Extrair título, meta description, H1, H2, H3.
   - Identificar pontos chave, exemplos de CTAs, imagens.
   - Salvar resumo em `pesquisa/[palavra-chave]_concorrentes.md`.
3. **Identificar lacunas e oportunidades**:
   - O que ninguém abordou? Quais headlines geram engajamento? Sugerir 3 ângulos únicos.
4. **Resumir Briefing**:
   - Palavra primária, 5 secundárias.
   - Headline principal, sub-headlines.
   - Estrutura de conteúdo (intro, 5-8 seções, FAQ, conclusão) e sugestão de imagens.

## 3. Criação de Artigos (Mínimo 2000 palavras)
- Contar palavras; expandir se necessário.
- Tom persuasivo, autoritário.
- CTAs a cada 500-700 palavras (linkando direto para produto/whatsapp).
- Imagens fiéis geradas ou no Unsplash, salvar em `public/images/` com alt text otimizado.
- Estilo próprio sem plágio, em `.md` ou estrutura para Astro.

## 4. Auditoria de Páginas Astro (Quebradas/Vazias)
- Listar todas as páginas (`.astro`, `.mdx`, `.md`).
- Verificar links internos (testar alvo / 404).
- Relatar páginas com <300 palavras em `auditoria/paginas_problema.md`.
- Modo autônomo: Preencher páginas vazias automaticamente (500-1000 palavras) mantendo estilo. Nunca sobrescrevendo sem permissão se em modo supervisionado.

## 5. Prevenção de Repetição
- Índice monitorado de "Artigos Publicados" (verificar nos últimos 60 dias). Se houver repetição, trocar ângulo/palavra-chave.

## 6. Comandos Específicos do Módulo
- `/pesquisar-oportunidades "kw"`: Roda a pesquisa.
- `/criar-super-post "kw"`: Pesquisa, gera 2000+ words, detecta framework, envia build/commit.
- `/auditar-site`: Varre, reporta vazias e quebradas.
- `/preencher-paginas-vazias`: Autogera SEO em locais desidratados.
- `/status-conteudo`: Overview do painel publicado/oportunidades.
