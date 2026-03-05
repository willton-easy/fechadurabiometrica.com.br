import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Reviews',
      href: getPermalink('/reviews'),
    },
    {
      text: 'Comparativos',
      href: getPermalink('/comparativos'),
    },
    {
      text: 'Guias',
      href: getPermalink('/guias'),
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
      title: 'Categorias',
      links: [
        { text: 'Reviews', href: getPermalink('/reviews') },
        { text: 'Comparativos', href: getPermalink('/comparativos') },
        { text: 'Guias', href: getPermalink('/guias') },
      ],
    },
    {
      title: 'Sobre Nós',
      links: [
        { text: 'Quem Somos', href: getPermalink('/sobre') },
        { text: 'Contato', href: getPermalink('/contato') },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Termos de Uso', href: getPermalink('/terms') },
        { text: 'Política de Privacidade', href: getPermalink('/privacy') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Termos', href: getPermalink('/terms') },
    { text: 'Privacidade', href: getPermalink('/privacy') },
  ],
  socialLinks: [],
  footNote: `
    Fechadura Biométrica © Todos os direitos reservados.
  `,
};
