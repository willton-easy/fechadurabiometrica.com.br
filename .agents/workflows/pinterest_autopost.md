# Pinterest Autopost Workflow

## Problema
O token da API Pinterest foi comprometido. Postagem via API está desabilitada.

## Solução
Postagem via Playwright MCP (navegação automatizada).

## Passos

### 1. Preparar imagens
Copiar imagens para pasta permitida pelo Playwright:
```powershell
$Dest = "C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins"
New-Item -ItemType Directory -Force -Path $Dest
Copy-Item "C:\Users\willt\OneDrive\Desktop\Pinterest_Pins_FechaduraBiometrica\*.png" $Dest
```

### 2. Postar via Playwright MCP

2.1. Navegar até Pin Builder:
```
browser_navigate("https://www.pinterest.com/pin-builder/")
```

2.2. Clicar no botão de upload:
```
browser_click("ref=[id_do_botao]")
```

2.3. Upload da imagem:
```
browser_file_upload("C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins\[nome_arquivo].png")
```

2.4. Preencher campos:
```
browser_type("[ref=titulo]", "Título do Pin")
browser_type("[ref=descricao]", "Descrição com #hashtags")
browser_type("[ref=destino]", "https://fechadurabiometrica.com.br/artigo?utm_source=pinterest")
```

2.5. Publicar:
```
browser_click("ref=[botao_publicar]")
```

## Artigos para mapear

| Imagem | Artigo |
|--------|-------|
| pin_luxury_door_biometric | /fechadura-digital-porta-vidro |
| fechadura_litoral_luxo | /fechadura-digital-litoral |
| hero_top10 | /melhores-fechaduras-digitais-2026 |
| hero_fechadura_airbnb | /guia-airbnb-fechaduras |
| review_intelbras_ifr7000 | /intelbras-ifr-7000 |
| review_samsung_shp_dp609 | /samsung-shp-dp609 |
| review_yale_ymf40a | /yale-ymf-40a |
| fechadura_madeira_macica | /fechadura-porta-madeira |
| fechadura_porta_correr_vidro | /fechadura-porta-correr-vidro |
| hero_biometria_facial | /biometria-facial-2026 |

## Status das Postagens

### Postados (Lotes 1-5)
- [x] Fechadura Digital para Porta de Vidro com Puxador H
- [x] Fechadura Digital para Litoral
- [x] Melhor Fechadura Digital Wi-Fi via App
- [x] Philips vs Samsung SHP-DP609
- [x] Guia Definitivo Airbnb 2026
- [x] Top 10 Melhores Fechaduras 2026
- [x] Intelbras IFR 7000
- [x] Yale YMF 40A
- [x] Samsung SHP-DP609

### Pendentes (72 imagens)
Verificar `Textos_Para_Postar_Pinterest.txt` para textos otimizados.