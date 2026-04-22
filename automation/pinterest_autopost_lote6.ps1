# Pinterest Autopost - Script Único
# Cole TODO este conteúdo no Antigravity e execute

# =============================================
# PASSO 1: Preparar Ambiente
# =============================================
$UploadDir = "C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins"
$SourceDir = "C:\Users\willt\OneDrive\Desktop\Pinterest_Pins_FechaduraBiometrica"
$OutputDir = "C:\Users\willt\AppData\Local\Programs\Antigravity\pinterest_pins\screenshots"

if (!(Test-Path $UploadDir)) { New-Item -ItemType Directory -Path $UploadDir -Force }
if (!(Test-Path $OutputDir)) { New-Item -ItemType Directory -Path $OutputDir -Force }

# =============================================
# PASSO 2: Copiar Imagens do Lote
# =============================================
$images = @(
    @{name="hero_baby_security_2026.png"; dest="pin_baby.png"; title="Fechadura Digital para Quarto de Bebê: Segurança Total 2026"; desc="💡 Guia completo com as melhores fechaduras biométricas para proteger seu bebê. Smart home integrado! #fechaduracióndigital #segurançabebê #smarthome"; url="https://fechadurabiometrica.com.br/guia-bebe-seguro"},
    @{name="botao_panico_wifi_1776310024810.png"; dest="pin_panico.png"; title="Botão de Pânico Wi-Fi: Segurança Emergencial 2026"; desc="🚨 Botão de pânico com notificação instantânea. Conecta via Wi-Fi e envía alertas para até 5 contatos! #botãodepânico #segurança #smarthome"; url="https://fechadurabiometrica.com.br/botao-panico-wifi"},
    @{name="lock_alexa_google_1776310010162.png"; dest="pin_alexa.png"; title="Fechadura com Alexa e Google Home 2026"; desc="🎙️ Controle sua fechadura por voz! Integração com Alexa e Google Assistant. Abraham e trancamento automático! #alexa #googlehome #fechadurasmart"; url="https://fechadurabiometrica.com.br/alexa-google-home"},
    @{name="camera_pet_furbo_tapo_1776309786642.png"; dest="pin_pet.png"; title="Câmera Pet Wi-Fi Tapo: Monitore seu Pet 2026"; desc="🐶 Vere seu pet enquanto trabalha! Câmera com detecção de movimento e visão noturna. Abraham your furry friend! #câmerapet #tapo #smarthome"; url="https://fechadurabiometrica.com.br/camera-pet-furbo"},
    @{name="design_interiores_lock_1776309996605.png"; dest="pin_design.png"; title="Design de Interiores com Smart Lock: Elegância 2026"; desc="🏠 Fechaduras que embelezam! Design minimalista que combina com qualquer интерьер. Segurança com estilo! #design #interiores #fechaduraluxo"; url="https://fechadurabiometrica.com.br/design-interiores"}
)

foreach ($img in $images) {
    $src = Join-Path $SourceDir $img.name
    $dst = Join-Path $UploadDir $img.dest
    if (Test-Path $src) {
        Copy-Item $src -Destination $dst -Force
        Write-Host "✅ Copiado: $($img.name)"
    }
}

# =============================================
# PASSO 3: Navegar ao Pinterest
# =============================================
playwright/browser_navigate https://www.pinterest.com/pin-builder/
playwright/browser_wait --load networkidle
playwright/browser_snapshot

# =============================================
# PASSO 4: Postar Cada Imagem
# =============================================
$counter = 1
foreach ($img in $images) {
    Write-Host "`n📍 Postando Pin $counter de $($images.Count)..."
    
    # Clicar no botão de upload
    playwright/browser_find text "Upload" click
    playwright/browser_wait 1000
    
    # Upload da imagem
    $imagePath = Join-Path $UploadDir $img.dest
    playwright/browser_file_upload $imagePath
    playwright/browser_wait 3000
    
    # Preencher título
    playwright/browser_find text "Título" fill $img.title
    playwright/browser_wait 500
    
    # Preencher descrição
    playwright/browser_find text "Descrição" fill $img.desc
    playwright/browser_wait 500
    
    # Preencher link
    $fullUrl = "$($img.url)?utm_source=pinterest"
    playwright/browser_fill @[ref_destino] $fullUrl
    playwright/browser_wait 500
    
    # Publicar
    playwright/browser_find text "Publicar" click
    playwright/browser_wait 5000
    playwright/browser_take_screenshot
    
    $counter++
}

playwright/browser_wait 3000
playwright/browser_take_screenshot
Write-Host "`n🎉 Lote 6 Concluído!"