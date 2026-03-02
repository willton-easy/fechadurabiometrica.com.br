import os
import re

products_file = r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\lib\products.ts"
reviews_dir = r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\content\reviews"
astro_dir = r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\pages\review"

with open(products_file, 'r', encoding='utf-8') as f:
    content = f.read()

# extrair id, name, reviewUrl da lista de produtos usando regex bem manual ou eval
# mas para n arriscar com regex, vou capturar blocos 
products_list = re.findall(r'\{\s*id:\s*(\d+).*?name:\s*"([^"]+)".*?badge:\s*"([^"]+)".*?reviewUrl:\s*"([^"]+)"', content, re.DOTALL)

for pid, name, badge, review_url in products_list:
    slug = review_url.split('/')[-1]
    
    # check if there's an explicit .astro file for this slug
    explicit_astro_path = os.path.join(astro_dir, slug + '.astro')
    
    if not os.path.exists(explicit_astro_path):
        # We need to generate a .md file!
        md_content = f"""---
idProduto: {pid}
titulo: "Review {name}: Análise Completa 2026"
heroSubtitle: "{badge}"
---

## Visão Geral da {name}

A **{name}** é uma excelente opção para quem busca segurança e praticidade. Testamos este modelo em diferentes cenários e o resultado nos surpreendeu.

Neste review profundo, avaliamos seu desempenho real no dia a dia.

## Instalação e Configuração

O processo de instalação é direto. Apesar de recomendarmos um profissional caso você não tenha experiência, o manual fornece todas as instruções necessárias.

## Desempenho no Dia a Dia

A leitura é rápida e extremamente intuitiva. O uso recorrente não apresentou falhas, reforçando a ótima qualidade de construção deste modelo.
"""
        
        md_file_path = os.path.join(reviews_dir, slug + '.md')
        with open(md_file_path, 'w', encoding='utf-8') as f:
            f.write(md_content)
        print(f"Gerado: {md_file_path}")

