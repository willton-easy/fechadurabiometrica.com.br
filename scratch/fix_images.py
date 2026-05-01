import os
import re

GUIAS_DIR = r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\content\guias"
ASSETS_DIR = r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\assets\images"
ARTIGOS_DIR = os.path.join(ASSETS_DIR, "artigos")

# Fallbacks
DEFAULT_FALLBACK = "~/assets/images/artigos/default-2026.png"
BIOMETRIA_FALLBACK = "~/assets/images/artigos/hero-fechadura-facial-2026.png"
ALARME_FALLBACK = "~/assets/images/artigos/hero_cerca_eletrica_wifi_2026.png"
GPS_FALLBACK = "~/assets/images/artigos/hero_rastrear_filho_gps_2026.png"

def get_fallback(img_path):
    lower = img_path.lower()
    if "biometria" in lower or "facial" in lower:
        return BIOMETRIA_FALLBACK
    if "alarme" in lower or "sensor" in lower:
        return ALARME_FALLBACK
    if "gps" in lower or "smartwatch" in lower:
        return GPS_FALLBACK
    return DEFAULT_FALLBACK

def fix_images():
    for filename in os.listdir(GUIAS_DIR):
        if not filename.endswith(".mdx"):
            continue
            
        filepath = os.path.join(GUIAS_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Match images in Markdown and Frontmatter
        # Markdown: ![alt](path)
        # Frontmatter: image: 'path'
        
        def replace_match(match):
            img_path = match.group(2)
            
            # Normalize path for checking
            check_path = img_path.replace("~/", "src/").replace("/", os.sep)
            # If relative, we need to handle it, but for now we assume most are ~/ or /
            
            full_check_path = os.path.join(r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br", check_path.lstrip(os.sep))
            
            if not os.path.exists(full_check_path):
                fallback = get_fallback(img_path)
                print(f"Fixing {filename}: {img_path} -> {fallback}")
                return f"{match.group(1)}{fallback}{match.group(3)}"
            return match.group(0)

        # Regex for markdown images: (!\[.*?\]\()(.+?)(\))
        new_content = re.sub(r'(!\[.*?\]\()(.+?)(\))', replace_match, content)
        
        # Regex for frontmatter image: (image:\s*['"])(.+?)(['"])
        new_content = re.sub(r'(image:\s*[\'"])(.+?)([\'"])', replace_match, new_content)
        
        # Also handle export const produtos image: "path"
        new_content = re.sub(r'(image:\s*[\'"])(.+?)([\'"])', replace_match, new_content)

        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

if __name__ == "__main__":
    fix_images()
