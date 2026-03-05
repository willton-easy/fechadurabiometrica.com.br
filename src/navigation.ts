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
      links: [
        { text: '🔐 Intelbras FR 400', href: getPermalink('/reviews/intelbras-fr-400') },
        { text: '🔐 Intelbras FR 101', href: getPermalink('/reviews/intelbras-fr-101') },
        { text: '🔐 Yale YMF 40A', href: getPermalink('/reviews/yale-ymf-40a') },
        { text: '🔐 Pado FDS-50', href: getPermalink('/reviews/pado-fds-50') },
        { text: '→ Ver todos os reviews', href: getPermalink('/reviews') },
      ],
    },
    {
      text: 'Comparativos',
      href: getPermalink('/comparativos'),
      links: [
        { text: '⚖️ Intelbras FR 400 vs Pado', href: getPermalink('/comparativos/intelbras-fr400-vs-pado') },
        { text: '⚖️ Fechadura com ou sem biometria', href: getPermalink('/comparativos/biometria-ou-senha') },
        { text: '→ Ver todos os comparativos', href: getPermalink('/comparativos') },
      ],
    },
    {
      text: 'Guias',
      href: getPermalink('/guias'),
      links: [
        { text: '📖 Porta de Vidro', href: getPermalink('/melhor-fechadura-digital-porta-de-vidro') },
        { text: '📖 Como Instalar', href: getPermalink('/guias/como-instalar-fechadura-digital') },
        { text: '📖 Biometria vs Senha', href: getPermalink('/guias/biometria-ou-senha') },
        { text: '→ Ver todos os guias', href: getPermalink('/guias') },
      ],
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
        { text: 'Reviews de Fechaduras', href: getPermalink('/reviews') },
        { text: 'Comparativos', href: getPermalink('/comparativos') },
        { text: 'Guias de Compra', href: getPermalink('/guias') },
        { text: 'Melhor para Porta de Vidro', href: getPermalink('/melhor-fechadura-digital-porta-de-vidro') },
      ],
    },
    {
      title: 'Marcas',
      links: [
        { text: 'Fechaduras Intelbras', href: getPermalink('/reviews#intelbras') },
        { text: 'Fechaduras Yale', href: getPermalink('/reviews#yale') },
        { text: 'Fechaduras Pado', href: getPermalink('/reviews#pado') },
        { text: 'Fechaduras Elsys', href: getPermalink('/reviews#elsys') },
      ],
    },
    {
      title: 'Sobre Nós',
      links: [
        { text: 'Quem Somos', href: getPermalink('/sobre') },
        { text: 'Contato', href: getPermalink('/contato') },
        { text: 'Política de Privacidade', href: getPermalink('/privacy') },
        { text: 'Termos de Uso', href: getPermalink('/terms') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Termos', href: getPermalink('/terms') },
    { text: 'Privacidade', href: getPermalink('/privacy') },
    { text: 'Quem Somos', href: getPermalink('/sobre') },
  ],
  socialLinks: [],
  footNote: `
    <span class="text-sm">Fechadura Biométrica © ${new Date().getFullYear()} · Todos os direitos reservados.</span><br/>
    <span class="text-xs text-slate-400">Este site contém links de afiliados da Amazon e Mercado Livre. Ao comprar pelos nossos links, ganhamos uma comissão sem custo extra para você.</span>
  `,
};
