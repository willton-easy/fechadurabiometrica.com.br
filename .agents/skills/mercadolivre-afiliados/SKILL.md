---
name: mercadolivre-afiliados
description: Central de conhecimento sobre integração de produtos, varredura de preços e links de afiliados do Mercado Livre.
---

# Mercado Livre Afiliados e Integrações

Este documento concentra a documentação e os aprendizados consolidados sobre como resgatar preços, imagens e gerenciar links do Mercado Livre em projetos focados em afiliação (Blogs e Reviews).

## Endpoints de API Conhecidos

A principal rota para buscar detalhes de um anúncio é a `/items/{MLB_ID}`.
**Exemplo:** `https://api.mercadolibre.com/items/MLB2144222365`

### ⚠️ O Problema do `PolicyAgent` (Erro 403)

O Mercado Livre é extremamente rígido contra rastreamento (Scraping) e Web-Crawling de suas APIs públicas para evitar congestionamento.
Se você fizer uma requisição `GET` para a API de Itens de forma anônima:

- A partir do lado do **Cliente (JS no Navegador)**, mesmo em produção.
- A partir de um **Backend Simples** (Node.js/Python com `requests`/`fetch`) sem autenticação pesada.

O retorno será invariavelmente:

```json
{
  "message": "At least one policy returned UNAUTHORIZED.",
  "code": "PA_UNAUTHORIZED_RESULT_FROM_POLICIES",
  "status": 403,
  "blocked_by": "PolicyAgent"
}
```

Isso significa que o seu IP ou a origem da sua requisição não passou pelo firewall anti-bots deles.

### Soluções para contornar a API

Existem três caminhos para obter o preço e estoque em Tempo Real para fins de afiliação:

1. **OAuth 2.0 (App Oficial Autorizado):**
   Criar um App no [Mercado Livre Developers](https://developers.mercadolivre.com.br/), gerar as credenciais (`CLIENT_ID` e `CLIENT_SECRET`) e rodar um cronjob (ou ação Serverless) no backend Astro para gerar o token e buscar o item autorizado. (Vimos que em contas recém-criadas _mesmo com token_, o `PolicyAgent` ainda pode barrar se a conta não tiver permições "Ouro" ou validada).

2. **Web Scraping Seguro via Selenium/Playwright Stealth:**
   Para fins de pequenos blogs estáticos, acessar a página visual real do navegador (`https://produto.mercadolivre.com.br/MLB-XXX`) em plano de fundo rodando [Puppeteer Stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth). Extrair o preço raspando o DOM (`.ui-pdp-price__second-line .andes-money-amount__fraction`) onde a proteção CORS não existe e não se aplica.

3. **Fallback Híbrido (Segurança Máxima):**
   _A abordagem adotada neste projeto atual._ Tentar a sorte injetando Script no front-end do leitor. Se a API do ML barrar (como ocorreu no `localhost`), um _Timeout Promise_ de 2 segundos intercepta o travamento e revela ao usuário os "Botões Padrões" limpos evitando que ele veja carregamentos infinitos e frustrações (UX protegida).

## Boas Práticas de Afiliação (Identificadores)

- No sistema do projeto, **sempre grave os Links Encurtados** fornecidos pelo Mercado Livre (ex: `https://meli.la/1hVhuw8`).
- Grave paralelamente o ID Base do Mercado Livre (`MLBXXXXXXXX`) na chave `mlbId`. O ID é vital para puxar imagens originais em alta definição via `/items` e realizar rastreio se for desejado.
