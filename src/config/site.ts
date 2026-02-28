// ============================================================
// ARQUIVO: src/config/site.ts
// O QUE FAZ: Guarda as informações principais do site, como
// nome, título e descrição. É como uma "ficha cadastral"
// do site. Quando outros arquivos precisam dessas infos,
// eles importam (buscam) daqui — assim, se precisar mudar
// o nome do site, só muda aqui e funciona em todo lugar!
// ============================================================

// "export" significa que outras partes do projeto podem
// usar essa variável. "const" significa que ela não vai
// mudar enquanto o site estiver rodando.
export const SITE = {
  // Nome curto do site (aparece no cabeçalho e no SEO)
  name: "Fechadura Biométrica",

  // Título completo — aparece na aba do navegador quando
  // alguém abre a página inicial
  title: "Fechadura Biométrica - Avaliações e Guias Especializados",

  // Descrição que aparece no Google quando alguém pesquisa
  // o site. Uma boa descrição ajuda a atrair mais visitantes!
  description:
    "Descubra as melhores opções de fechaduras biométricas do mercado. Reviews profundos, comparativos e guias técnicos de segurança residencial inteligente.",

  // Endereço oficial do site na internet
  url: "https://fechadurabiometrica.com.br",

  // Idioma do site (pt-BR = Português do Brasil)
  language: "pt-BR",

  // Nome do autor/criador dos conteúdos
  author: "Equipe Fechadura Biométrica",
};
