import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Artigos e Análises',
      href: getPermalink('/blog'),
    },
    {
      text: 'Porta de Vidro',
      href: getPermalink('/melhor-fechadura-digital-porta-de-vidro'),
    },
    {
      text: 'Glossário Tech',
      href: getPermalink('/glossario'),
    },
    {
      text: 'Contato',
      href: getPermalink('/contato'),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'Conteúdo',
      links: [
        { text: 'Blog', href: getPermalink('/blog') },
        { text: 'Especial Porta de Vidro', href: getPermalink('/melhor-fechadura-digital-porta-de-vidro') },
        { text: 'Dicionário de Tecnologias', href: getPermalink('/glossario') },
      ],
    },
    {
      title: 'Sobre',
      links: [
        { text: 'Quem Somos', href: getPermalink('/sobre') },
        { text: 'Entre em Contato', href: getPermalink('/contato') },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Política de Privacidade', href: getPermalink('/privacy') },
        { text: 'Termos de Uso', href: getPermalink('/terms') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Termos', href: getPermalink('/terms') },
    { text: 'Privacidade', href: getPermalink('/privacy') },
  ],
  socialLinks: [],
  footNote: `
    <span class="text-sm">Fechadura Biométrica © ${new Date().getFullYear()} · Todos os direitos reservados.</span><br/>
    <span class="text-xs text-slate-400">Este site contém links de afiliados. Quando você compra através de um de nossos links, podemos ganhar uma comissão sem nenhum custo extra para você.</span>
  `,
};
