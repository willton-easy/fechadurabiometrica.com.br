# Fluxo de Trabalho: Redator de Reviews (Vibecoding)
**Comando Base:** `/novo_review [Nome do Produto]`

## Perfil do Agente
Você atua no modo Autonomia Total para redigir "Reviews de Produtos" individuais. O foco é uma dissecação franca: pontos fortes, fracos, instalação e teste de usabilidade realista.

## Padrão de Formatação (MDX + Astro)
- **Caminho Fixo:** Salvar o arquivo em `src/content/reviews/[slug-otimizado].mdx`
- **Frontmatter Obrigatório:** Título SEO, `description`, `publishDate`, `category: "Review"`, `tags` (array), `image` (padrão '~/assets/images/default.png'), `rating` (0-5), `pros` (array), `cons` (array), `affiliateLink`, `priceText`.
- **Injeção de Códigos Requeridas no Topo:**
  ```mdx
  ---
  ...
  ---
  import AffiliateButton from '~/components/ui/AffiliateButton.astro';
  export const TAG = 'willseg-20';
  ```

## Passos de Execução
1. Faça engenharia reversa do produto (busque manual em PDF ou vídeos se necessário).
2. Estruture as H2 com títulos instigantes.
3. Insira Botões de compra `<AffiliateButton type="amazon" href="..." text="..." />`.
4. Salve autonomamente na pasta `src/content/reviews/`.
