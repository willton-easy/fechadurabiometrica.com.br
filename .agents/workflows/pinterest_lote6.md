# Pinterest Autopost - Lote 6
# Execute line by line no Antigravity

# Preparar diretório
mkdir -Force "C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins"

# Copiar imagens
Copy-Item "C:\Users\willt\OneDrive\Desktop\Pinterest_Pins_FechaduraBiometrica\hero_baby_security_2026.png" "C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins\pin_baby.png"

# =============================================
# INICIAR POSTAGEM
# =============================================

playwright/browser_navigate https://www.pinterest.com/pin-builder/
playwright/browser_wait --load networkidle
playwright/browser_snapshot

# Clicar no botão de upload
playwright/browser_click [REF_DO_BOTAO_UPLOAD]

# Upload da imagem
playwright/browser_file_upload "C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins\pin_baby.png"

# Preencher campos
playwright/browser_fill [REF_TITULO] "🔒 Fechadura Digital para Quarto de Bebê: Segurança Total 2026"
playwright/browser_fill [REF_DESCRICAO] "💡 Guia completo com as melhores fechaduras biométricas para proteger seu bebê. Smart home integrado! #fechaduracióndigital #segurançabebê #smarthome #bebê #segurança"
playwright/browser_fill [REF_DESTINO] "https://fechadurabiometrica.com.br/guia-bebe-seguro?utm_source=pinterest"

# Publicar
playwright/browser_click [REF_PUBLICAR]
playwright/browser_wait 3000
playwright/browser_take_screenshot

# =============================================
# PRÓXIMO PIN (repita o processo)
# =============================================