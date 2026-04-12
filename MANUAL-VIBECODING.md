# 🔥 Manual Opcional: Como Publicar no Blog com Vibecoding

Você não precisa de um painel de "Word" engessado (CMS) lidando com problemas e arquivos quebrados. Este projeto roda com Automação de Nível Zero (*Vibecoding*). O agente de Inteligência Artificial funciona como o seu time inteiro de conteúdo e programação. O ecossistema está montado!

## 🤖 Nossos Comandos Mágicos de Conteúdo

Sempre que quiser publicar um artigo novo e perfeitamente injetado no ecossistema de vendas da **Fechadura Biométrica**, basta enviar UM desses comandos via chat para o agente:

### 1. Guideline de Guias (Artigos Gigantes e Informativos)
**Como usar:**
`/novo_guia [Tema que você deseja]`

*Exemplo Prático: `/novo_guia Fechaduras para Porta de Alumínio Sem Fio`*
**Ao enviar esse comando o Agente irá:**

- Varrer a web levantando as regras do tema no mercado atual.
- Gerar na raiz `/src/content/guias/` o novo artigo massivo em `MDX`.
- Criar a interlinkagem com componentes de afiliação e aplicar o `<AffiliateButton>` automaticamente.
- Usará HTML/Tailwind se precisar de blocos de alertas no post.

---

### 2. Guideline de Review de Produto
**Como usar:**
`/novo_review [Nome de Produto Específico]`

*Exemplo Prático: `/novo_review Fechadura Digital Elsys ESF-DE2000B`*
**Ao enviar esse comando o Agente irá:**
- Captar as prós / contras técnicos, o manual de usabilidade ou ficha do fabricante.
- Inserir caixas dinâmicas para review isolado em `src/content/reviews/`.
- Chamar nativamente o botão direto de vendas ou uma `AffiliateTable`.

---

### 3. Combates Diretos (Comparativos)
**Como usar:**
`/novo_comparativo [Produto A] vs [Produto B]`

*Exemplo Prático: `/novo_comparativo Yale YRD 256 vs Intelbras IFR 3000`*
**Ao enviar esse comando o Agente irá:**
- Mapear a batalha justa técnica por recurso chave (Bateria, Hub, Conectividade).
- Inserir uma tabela de frente a frente no MDX para os dois modelos.
- Salvar na coleção oculta do Astro de `src/content/comparativos/`.

---

## 🏗 Repositório (AstroWind Ecosystem)
Todas essas *skills* foram fisicamente armazenadas dentro da raiz inteligente do seu projeto, onde a IA monitora você de forma residente:
📍 `.agents/workflows/`

*Se um dia for clonar este site para lançar outro (Exemplo: "Câmera Wifi de Segurança"), copie o bloco gerado ou copie a página `.agents` para criar e carregar este workflow na nova branch!*
