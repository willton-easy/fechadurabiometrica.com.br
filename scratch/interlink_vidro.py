import os

def update_file(filepath, search_text, replace_text):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if search_text in content:
        new_content = content.replace(search_text, replace_text)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {filepath}")
    else:
        print(f"Search text not found in: {filepath}")

# 1. Update Main Pillar
pillar_path = r'c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\content\guias\melhor-fechadura-digital-porta-de-vidro.mdx'
guides_section = """
## 📚 Manuais de Aprofundamento por Cenário

A escolha da fechadura depende diretamente de onde ela será instalada. Criamos guias técnicos ultra-profundos para cada necessidade específica:

- **[Clínicas e Consultórios](/guias/fechadura-digital-consultorio-clinica-porta-vidro)**: Higiene, biometria sem toque e controle de acesso para funcionários.
- **[Sacadas de Apartamento](/guias/fechadura-digital-porta-vidro-correr-sacada-apartamento)**: Foco em portas de correr, resistência à maresia (IP65) e segurança para varandas.
- **[Design de Luxo e Puxador H](/guias/fechadura-digital-porta-vidro-puxador-h-design-luxo)**: Como conciliar a estética de grandes puxadores com tecnologia invisível.
- **[Guia de Compras 2026](/guias/onde-comprar-fechadura-digital-porta-vidro-aliexpress-brasil)**: A verdade sobre AliExpress vs. Mercado Livre (preço, garantia e suporte).
- **[Vanguarda Tecnológica](/guias/top-5-fechaduras-digital-porta-vidro-biometria-matter-2026)**: Conheça os modelos com protocolo Matter e Biometria Facial 3D.

"""

# Use a more generic search for the FAQ header to avoid emoji issues
with open(pillar_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
found = False
for line in lines:
    if "Perguntas Frequentes" in line and not found:
        new_lines.append(guides_section)
        new_lines.append(line)
        found = True
    else:
        new_lines.append(line)

with open(pillar_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

# 2. Update Reviews
fr400_path = r'c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\content\reviews\intelbras-fr-400.mdx'
update_file(fr400_path, '## 3. Casos de Uso', '## 📚 Guia de Especialidade\n\nSe você está instalando em um ambiente profissional, veja nosso guia sobre [Fechadura Digital em Consultórios e Clínicas](/guias/fechadura-digital-consultorio-clinica-porta-vidro).\n\n## 3. Casos de Uso')

lumi_path = r'c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\content\reviews\novadigital-sl-lumi.mdx'
update_file(lumi_path, '## Veredito', '## 🏡 Apartamento e Sacada\n\nA SL-Lumi é a favorita para quem tem portas de correr. Veja como otimizar a segurança no nosso guia de [Fechadura Digital para Porta de Vidro de Correr em Sacada](/guias/fechadura-digital-porta-vidro-correr-sacada-apartamento).\n\n## Veredito')

rochaed_path = r'c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\content\reviews\rochaed-vdrbg.mdx'
update_file(rochaed_path, '## Conclusão', '## 💎 Estética e Puxadores\n\nQuer combinar a Rochaed com um visual de luxo? Veja nosso manual de [Fechadura para Porta de Vidro com Puxador H](/guias/fechadura-digital-porta-vidro-puxador-h-design-luxo).\n\n## Conclusão')

print("Interlinking complete.")
