# Pinterest Autopost - Documentação

## Scripts Disponíveis

### 1. Postar Lote SEO (sem emojis)
```bash
node lotes_seo.mjs [8-12]
```

### 2. Postar Lote Fundo de Funil
```bash
node lotes_fundo_funil.mjs [11-12]
```

### 3. Corrigir Pins com URL Errada
```bash
node correcao_pins.mjs
```

## Estrutura dos Pins

Editar o array `LOTE` nos scripts:

```javascript
const PINS = [
  { 
    img: 'nome-da-imagem.png', 
    title: 'Título Longtail SEO 2026', 
    desc: 'Descrição + link fe.ch/url', 
    url: 'slug-artigo' 
  }
];
```

## Imagens

Local: `C:/Users/willt/OneDrive/Desktop/Pinterest_Pins_FechaduraBiometrica`

Copiar para allowed folder:
```powershell
Copy-Item "ORIGEM" "C:/Users/willt/AppData/Local/Programs/Antigravity/pinterest_pins/DESTINO"
```

## Pré-requisitos

1. Chrome do Antigravity aberto
2. Logado no Pinterest
3. Porta 9222 ativa

Verificar porta:
```powershell
Get-NetTCPConnection -LocalPort 9222
```

## Adicionar Novo Lote

1. Copiar imagens para pasta Pinterest
2. Editar script com novos PINS
3. Executar:
```powershell
Start-Job -ScriptBlock { node lotes_seo.mjs [NUMERO_LOTE] } | Receive-Job -Wait -AutoRemoveJob
```

## Configuração Pinterest

- Site: https://www.pinterest.com/pin-builder/
- Board: Fechadura Eletrônica
- Link: fe.ch/[slug]?utm_source=pinterest

## Tips SEO

- Sem emojis nos títulos
- Usar termos longtail: "[ Marca ] [ Modelo ] [ Review/Comparativo ] [ Preço ]"
- Fundo de funil: incluir "Review", "Preço", "Qual melhor"
- Descrição curta com link direto