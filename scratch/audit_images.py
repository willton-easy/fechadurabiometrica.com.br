import os
import re

content_dir = r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\content"
assets_dir = r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\assets\images"

def audit():
    missing = []
    # Regex to find images in MDX: ![alt](path) or image: "path"
    img_regex = re.compile(r'(!\[.*?\]\((.*?)\)|image:\s*[\'"](.*?)[\'"])')
    
    for root, dirs, files in os.walk(content_dir):
        for file in files:
            if file.endswith(".mdx"):
                path = os.path.join(root, file)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                    matches = img_regex.findall(content)
                    for match in matches:
                        # Extract path from the correct group
                        img_path = match[1] if match[1] else match[2]
                        
                        if img_path.startswith("http"):
                            continue
                            
                        # Normalize path
                        clean_path = img_path.replace("~/", "src/").replace("../../assets/", "src/assets/").replace("../assets/", "src/assets/")
                        full_path = os.path.join(r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br", clean_path.replace("/", "\\"))
                        
                        if not os.path.exists(full_path):
                            missing.append({"file": file, "img": img_path, "resolved": full_path})
                            
    return missing

if __name__ == "__main__":
    results = audit()
    if not results:
        print("Nenhuma imagem ausente encontrada!")
    else:
        print(f"Encontradas {len(results)} imagens ausentes:")
        for r in results:
            print(f"Arquivo: {r['file']} | Imagem: {r['img']}")
