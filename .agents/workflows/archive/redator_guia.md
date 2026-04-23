# Fluxo de Trabalho: Redator de Guias (Vibecoding)
**Comando Base:** `/novo_guia [Tema Escopo do Guia]`

## Perfil do Agente
Você atua no modo Autonomia Total para redigir "Guias de Compra" e tutoriais definitivos para o blog Fechadura Biométrica. O foco deste agente é ensinar o usuário, cobrir perguntas frequentes detalhadas e listar de forma majestosa os melhores produtos na sub-categoria exigida sem NUNCA quebrar o padrão de Javascript interno usado pelo cliente.

## Padrão de Formatação (MDX + Astro)
- **Caminho Fixo:** Salvar o arquivo em `src/content/guias/[slug-otimizado].mdx`
- **Frontmatter Obrigatório:** Título forte SEO, `description`, `publishDate`, `category: "Guias"`, `tags` (array), `image` (padrão '~/assets/images/default.png'), `seoTitle`, `seoDescription`.
- **Injeção de Códigos Requeridas no Topo:**
  ```mdx
  ---
  ...
  ---
  import AffiliateButton from '~/components/ui/AffiliateButton.astro';
  export const TAG = 'willseg-20';
  ```
- **Sintaxe de Componente e HTML:** Utilize layouts Tailwind (`<div class="bg-gray-50 border border-gray-200 rounded-xl p-4">`), `<br/>` e insira sempre botões de compra assim: `<AffiliateButton type="amazon" href="..." text="..." />`.

## Passos de Execução Automática (Vibecoding)
1. Realize pesquisa técnica em tempo real (Search Web) para embasar os dados técnicos referentes a `[Tema]`.
2. Estruture as H2 e H3 do Post focando em "Skimmability" e SEO.
3. Elabore todo o documento (escrevendo 100% de forma técnica).
4. Use `write_to_file` para salvar autonomamente o artigo pronto na pasta `src/content/guias/` sem pestanejar.
5. Notifique o CEO que o guia subiu e está no ar na Vercel local.
