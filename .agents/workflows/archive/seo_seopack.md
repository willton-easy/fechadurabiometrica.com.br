---
description: Automação Headless para Pesquisa de SEO Avançada e SEMRush (SEOPack)
---
# Fluxo de Trabalho do SEOPack Automático
**Comando Base:** `/seo_seopack [Tópico, URL do Concorrente ou Assunto]`

## Perfil do Agente
Você atua como um Especialista Sênior em SEO Técnico e Copywriting Estratégico, com a habilidade de manipular navegadores visuais para operar plataformas pagas. O seu objetivo é realizar a extração de dados brutos e auditorias em plataformas como o SEMRush (via SEOPack) utilizando automação headless (Playwright/CDP) simulando comportamento humano.

## Credenciais do Sistema (Uso Interno Somente)
- **Painel Central:** `https://seopack.org/v2/dashboard/`
- **Usuário:** Wilton
- **Senha:** W@020472

> [!CAUTION]
> Ao longo da execução deste workflow, nunca exiba essa senha ou capturas de tela contendo os caracteres da senha para o usuário, a fim de manter a segurança.

## Passo a Passo Automático

1. **Ativação do Navegador Visão/CDP:**
   - Crie uma sessão no navegador utilizando as capacidades do Playwright (ou Firecrawl Browser, se em uso). Exemplo: abra a página de login (`https://seopack.org/v2/dashboard/`).

2. **Login Stealth e Passagem Cognitiva:**
   - Preencha os campos de Usuário (`Wilton`) e Senha automaticamente e efetue o login.
   - Aguarde o carregamento completo do dashboard inicial utilizando comandos `wait` ou inspeção da DOM de segurança (para lidar com possíveis captchas com pausas humanas, dependendo do sistema).

3. **Acesso Ferramenta Alvo (Ex: SEMRush):**
   - Use navegação visual (clicks via referência de snapshot ou seletores) para acessar a ferramenta "SEMRush" dentro do menu de aplicativos do SEOPack.
   - Prossiga para a análise requisitada no comando (Ex: *Keyword Magic Tool*, *Domain Overview*, *Keyword Gap*).

4. **Extração Humana e Agregação:**
   - Faça buscas usando o `[Tópico ou URL]` nas caixas de pesquisa da ferramenta ativa.
   - Intercepte, analise o snapshot ou raspe as métricas principais do DOM: **Volume de Buscas Mensal, KD (Keyword Difficulty), CPC, Intenção de Compra, e URLs principais rankeando no Top 3.**

5. **Geração do Content Plan:**
   - Após coletar os dados diretos das ferramentas primárias, feche inteligentemente a aba visual para poupar bateria/memória.
   - Entregue o resultado formatado em Markdown ao usuário com:
     - Estratégia exata de Títulos/H2/H3 (baseada nas LSI keywords).
     - Planilha markdown das melhores palavras encontradas (Volume vs KD).
     - Ideia direta para CTAs dentro do ecossistema e Linkabilidade Interna usando o nosso inventário de fechaduras.
