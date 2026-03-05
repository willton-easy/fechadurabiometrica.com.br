// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'

export default defineConfig({
  site: 'https://www.fechadurabiometrica.com.br',

  // Adaptador Vercel: necessário para rotas de API (SSR on-demand)
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),   // suporte a componentes React (interatividade quando necessário)
    mdx(),     // artigos em MDX
    sitemap(), // sitemap.xml automático
  ],
})
