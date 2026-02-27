# Definição e Controle de MCPs (Model Context Protocol)
Este projeto foi concebido (VibeCoding) e desenhado para ser administrado via agentes autônomos. 

Como Inteligência Artificial (Gemini/Antigravity), eu já possuo integrações nativas e poderosas que me garantem:
1. **Filesystem MCP**: Permissão total nativa nos meus sub-agentes baseados no diretório de trabalho do usuário para criar, editar, excluir arquivos com contexto amplo da workspace.
2. **NPM MCP / Command Execution**: Tenho o tool `run_command` habilitado, que atua na prática como o sistema NPM (executando build, dev, lint, deps) validando os resultados assincronamente.
3. **Web Fetch MCP**: Possuo acesso autônomo e nativo a scripts externos e de Python (ex: Firecrawl API usando Python `urllib` ou `requests`), substituindo satisfatoriamente o fetch cru.

## Próximos passos operacionais:
Para o **GitHub MCP** e **Vercel MCP**, o deploy precisará ser configurado no lado do usuário via Vercel Dashboard (conectando o repositório GitHub ao projeto `fechadurabiometrica`), a menos que tokens explícitos (CLI tokens) fossem garantidos no contexto.

> O repositório foi criado e mantido no padrão para acionar automaticamente o CI/CD da Vercel através da branch principal (`main`).
