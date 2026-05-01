import os
import re
from pathlib import Path

# Paths
BASE_DIR = r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br"
CONTENT_DIRS = [
    os.path.join(BASE_DIR, "src", "content", "guias"),
    os.path.join(BASE_DIR, "src", "content", "reviews"),
    os.path.join(BASE_DIR, "src", "content", "comparativos")
]
IMAGE_DIRS = [
    os.path.join(BASE_DIR, "public", "images"),
    os.path.join(BASE_DIR, "src", "assets", "images")
]

# Image regex (Markdown and MDX/JSX)
MARKDOWN_IMAGE_RE = re.compile(r"!\[.*?\]\((.*?)\)")
MDX_IMAGE_RE = re.compile(r'src=["\'](.*?)["\']') # Simplistic check for JSX-like src

def check_image_exists(img_path):
    if img_path.startswith("http"):
        return True
    
    # Handle Astro alias
    resolved_path = img_path.replace("~/", "")
    
    # List of possible base directories to search from
    search_bases = [
        BASE_DIR,
        os.path.join(BASE_DIR, "public"),
        os.path.join(BASE_DIR, "src")
    ]
    
    for base in search_bases:
        full_path = os.path.join(base, resolved_path.lstrip("/"))
        if os.path.exists(full_path):
            return True
            
        # Try appending to specific asset/image dirs if not already there
        for idir in IMAGE_DIRS:
            # If path is just filename
            if "/" not in resolved_path:
                if os.path.exists(os.path.join(idir, resolved_path)):
                    return True
            
            # If path is something like assets/images/...
            if resolved_path.startswith("assets/images/"):
                potential = os.path.join(BASE_DIR, "src", resolved_path)
                if os.path.exists(potential):
                    return True
                
    return False

def audit_articles():
    results = []
    
    for content_dir in CONTENT_DIRS:
        if not os.path.exists(content_dir):
            continue
            
        for file in os.listdir(content_dir):
            if not file.endswith(".mdx"):
                continue
                
            file_path = os.path.join(content_dir, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            images = MARKDOWN_IMAGE_RE.findall(content)
            images.extend(MDX_IMAGE_RE.findall(content))
            
            # Filter out non-image files if needed
            images = [img for img in images if any(img.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'])]
            
            issue = None
            if not images:
                issue = "SEM IMAGENS"
            else:
                missing_images = []
                for img in images:
                    if not check_image_exists(img):
                        missing_images.append(img)
                
                if missing_images:
                    issue = f"IMAGENS QUEBRADAS: {', '.join(missing_images)}"
                else:
                    # Heuristic for theme mismatch
                    # Check if "fechadura" article has "rastreador" images or vice versa
                    title_keywords = file.lower().replace(".mdx", "").split("-")
                    for img in images:
                        img_name = img.lower()
                        if "rastreador" in title_keywords and ("fechadura" in img_name or "door" in img_name):
                            issue = f"POSSÍVEL TEMA ERRADO: {img}"
                            break
                        if ("fechadura" in title_keywords or "digital" in title_keywords) and "rastreador" in img_name:
                            issue = f"POSSÍVEL TEMA ERRADO: {img}"
                            break
                        if "placeholder" in img_name or "example" in img_name or "temp" in img_name:
                            issue = f"IMAGEM PLACEHOLDER: {img}"
                            break

            if issue:
                results.append({
                    "file": file,
                    "dir": os.path.basename(content_dir),
                    "issue": issue
                })
                
    return results

if __name__ == "__main__":
    issues = audit_articles()
    print(f"Audit completed. Found {len(issues)} articles with issues.\n")
    for item in issues:
        print(f"[{item['dir']}] {item['file']}: {item['issue']}")
