import os
import re

CONTENT_DIRS = [
    r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\content\reviews",
    r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\content\guias"
]

AUTHORS = ["Nilton Vasconcelo", "Wilton Alves", "Katarina Brito"]

def distribute():
    all_files = []
    for d in CONTENT_DIRS:
        if not os.path.exists(d):
            continue
        for f in os.listdir(d):
            if f.endswith(".mdx"):
                all_files.append(os.path.join(d, f))
    
    # Ordenação para garantir que a distribuição seja previsível
    all_files.sort()
    
    count = 0
    for i, file_path in enumerate(all_files):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Só atualiza se não tiver um autor ou se o autor for genérico
        # Se for um dos nossos "super artigos" criativos, pulamos para não bagunçar a voz
        # (Nesse caso, como queremos "igualmente", vamos forçar a distribuição em tudo que não for os 3 novos)
        
        # Regex para achar e substituir o autor no frontmatter
        if "author:" in content:
            # Substitui linha existente
            new_content = re.sub(r'author:\s*".*?"', f'author: "{AUTHORS[i % len(AUTHORS)]}"', content)
            new_content = re.sub(r"author:\s*'.*?'", f'author: "{AUTHORS[i % len(AUTHORS)]}"', new_content)
        else:
            # Insere após o título se não houver autor
            new_content = re.sub(r'(title:.*?\n)', r'\1author: "' + AUTHORS[i % len(AUTHORS)] + r'"\n', content)
            
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            print(f"Autor atribuído: {os.path.basename(file_path)} -> {AUTHORS[i % len(AUTHORS)]}")
            
    print(f"Total de arquivos atualizados: {count}")

if __name__ == "__main__":
    distribute()
