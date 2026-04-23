# Pinterest Autopost - Comando para Antigravity

## Script Completo

```
# 1. Copiar imagens para pasta permitida
mkdir -Force "C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins"; Copy-Item "C:\Users\willt\OneDrive\Desktop\Pinterest_Pins_FechaduraBiometrica\hero_baby_security_2026.png" "C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins\pin_baby.png"

# 2. Executar no Antigravity (MCP tools)
playwright/browser_navigate https://www.pinterest.com/pin-builder/
playwright/browser_snapshot
playwright/browser_take_screenshot

# 3. Clicar no botão de upload (procurar ref do botão com texto "Upload" ou área clicável)
playwright/browser_click @[ref_do_botao_upload]
playwright/browser_snapshot

# 4. Upload da imagem
playwright/browser_file_upload C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins\pin_baby.png
playwright/browser_take_screenshot

# 5. Preencher título
playwright/browser_type @[ref_titulo] "🔒 Fechadura Digital para Quarto de Bebê: Segurança Total 2026"
playwright/browser_type @[ref_descricao] "💡 Guia completo com as melhores fechaduras biométricas para квартиры de bebê. Segurança máxima! #fechaduracióndigital #segurançabebê #smarthome"

# 6. Preencher link
playwright/browser_fill @[ref_destino] "https://fechadurabiometrica.com.br/guia-bebe-seguro?utm_source=pinterest"

# 7. Publicar
playwright/browser_click @[ref_publicar]
playwright/browser_take_screenshot
```

---

## Imagens Pendentes (Lote 6)

| # | Imagem | Título | Link |
|---|-------|--------|------|
| 1 | hero_baby_security_2026.png | Fechadura Digital para Quarto de Bebê | /guia-bebe-seguro |
| 2 | botao_panico_wifi.png | Botão de Pânico Wi-Fi | /botao-panico-wifi |
| 3 | camera_pet_furbo.png | Câmera Pet Wi-Fi Tapo | /camera-pet-furbo |
| 4 | lock_alexa_google.png | Fechadura com Alexa e Google Home | /alexa-google-home |
| 5 | design_interiores_lock.png | Design de Interiores com Smart Lock | /design-interiores |
| 6 | fechadura_airbnb_moderno_2026.png | Fechadura Moderna para Airbnb | /guia-airbnb |
| 7 | fechadura_madeira_macica.png | Fechadura para Porta de Madeira Maciça | /porta-madeira |
| 8 | fechadura_alexa_homekit.png | Fechadura Alexa HomeKit | /alexa-homekit |
| 9 | fechadura_escritorio_clinica_vidro.png | Fechadura para Escritório/Clínica | /escritorio-clinica |
| 10 | fechadura_porta_correr_vidro.png | Fechadura para Porta de Correr de Vidro | /porta-correr-vidro |

---

## Seletores Pinterest

Se o browser_snapshot não funcionar, use:
```
playwright/browser_snapshot -i
playwright/browser_find text "Upload" click
playwright/browser_find text "Criar Pin" click
```

Para publicar:
```
playwright/browser_find text "Publicar" click
playwright/browser_find text "Salvar" click
```