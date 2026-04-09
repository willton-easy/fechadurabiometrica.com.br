import os
import re

CONTENT_DIRS = [
    r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\content\reviews",
    r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\content\guias"
]

IMPORTS_BLOCK = """\nimport AffiliateButton from '~/components/ui/AffiliateButton.astro';
import affiliates from '~/data/affiliates.json';\n\n"""

# Regex para encontrar links de afiliados antigos (Amazon e Mercado Livre encapsulados na classe btn)
BTN_REGEX = re.compile(r'<a\s+href="([^"]+)"[^>]*class="[^"]*btn[^"]*"[^>]*>(.*?)</a>', re.DOTALL)

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pula se já for um arquivo migrado ou se não tiver Frontmatter
    if "import AffiliateButton" in content:
        return
        
    parts = content.split('---')
    if len(parts) >= 3:
        # Injetando importações logo após o encerramento do frontmatter
        new_content = '---'.join(parts[:2]) + '---' + IMPORTS_BLOCK + '---'.join(parts[2:])
        
        # Substituir os botões antigos pelo novo Componente
        def replace_button(match):
            href = match.group(1)
            text = match.group(2).strip()
            # Remover emojis do texto inicial caso atrapalhe, mas manteremos
            btn_type = 'amazon' if 'amzn' in href or 'amazon' in href else ('mercadolivre' if 'meli' in href or 'mercadolivre' in href else 'primary')
            return f'<AffiliateButton type="{btn_type}" href="{href}" text="{text}" />'
            
        new_content = BTN_REGEX.sub(replace_button, new_content)
        
        # Salvando num novo arquivo .mdx
        new_file_path = file_path + 'x'
        with open(new_file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        # Deletando o antigo .md
        os.remove(file_path)
        print(f"Migrado: {os.path.basename(file_path)} -> {os.path.basename(new_file_path)}")

def main():
    count = 0
    for d in CONTENT_DIRS:
        if not os.path.exists(d):
            continue
        for filename in os.listdir(d):
            if filename.endswith(".md"):
                file_path = os.path.join(d, filename)
                process_file(file_path)
                count += 1
                
    print(f"Total de arquivos migrados: {count}")

if __name__ == "__main__":
    main()
