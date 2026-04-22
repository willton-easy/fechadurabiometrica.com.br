# =============================================
# PINTEREST AUTOPOST - LOTE 6
# Cole no Antigravity para executar
# =============================================

# PASSO 1: Copiar mais imagens
Copy-Item "C:\Users\willt\OneDrive\Desktop\Pinterest_Pins_FechaduraBiometrica\botao_panico_wifi_1776310024810.png" "C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins\pin_panico.png" -Force
Copy-Item "C:\Users\willt\OneDrive\Desktop\Pinterest_Pins_FechaduraBiometrica\lock_alexa_google_1776310010162.png" "C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins\pin_alexa.png" -Force

# PASSO 2: Navegar ao Pinterest
playwright/browser_navigate https://www.pinterest.com/pin-builder/

# PASSO 3: Tirar snapshot inicial
playwright/browser_snapshot

# =============================================
# PIN 1: Baby Security
# =============================================
playwright/browser_file_upload "C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins\pin_baby.png"
playwright/browser_fill @[ref_titulo] "Fechadura Digital para Quarto de Bebê: Segurança Total 2026"
playwright/browser_fill @[ref_descricao] "Guia completo com as melhores fechaduras biométricas para proteger seu bebê. Smart home integrado! #fechadurationsdigital #segurançabebê #smarthome"
playwright/browser_fill @[ref_destino] "https://fechadurabiometrica.com.br/guia-bebe-seguro?utm_source=pinterest"
playwright/browser_find text "Publicar" click
playwright/browser_wait 5000

# =============================================
# PIN 2: Botão de Pânico
# =============================================
playwright/browser_file_upload "C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins\pin_panico.png"
playwright/browser_fill @[ref_titulo] "Botão de Pânico Wi-Fi: Segurança Emergencial 2026"
playwright/browser_fill @[ref_descricao] "Botão de pânico com notificação instantânea. Conecta via Wi-Fi! #botãodepânico #segurança #smarthome"
playwright/browser_fill @[ref_destino] "https://fechadurabiometrica.com.br/botao-panico-wifi?utm_source=pinterest"
playwright/browser_find text "Publicar" click
playwright/browser_wait 5000

# =============================================
# PIN 3: Alexa/Google Home
# =============================================
playwright/browser_file_upload "C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins\pin_alexa.png"
playwright/browser_fill @[ref_titulo] "Fechadura com Alexa e Google Home 2026"
playwright/browser_fill @[ref_descricao] "Controle sua fechadura por voz! Integração com Alexa e Google Assistant. #alexa #googlehome #fechadurasmart"
playwright/browser_fill @[ref_destino] "https://fechadurabiometrica.com.br/alexa-google-home?utm_source=pinterest"
playwright/browser_find text "Publicar" click
playwright/browser_wait 5000

# =============================================
# CONCLUSÃO
# =============================================
playwright/browser_take_screenshot
Write-Host "Lote 6 Concluído!"