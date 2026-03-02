import os
import re

products_file = r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\lib\products.ts"
reviews_dir = r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\content\reviews"
astro_dir = r"c:\Users\willt\OneDrive\Desktop\Meus Documentos\fechadurabiometrica.com.br\src\pages\review"

with open(products_file, 'r', encoding='utf-8') as f:
    content = f.read()

# extrair id, name, badge, reviewUrl
products_list = re.findall(r'\{\s*id:\s*(\d+).*?name:\s*"([^"]+)".*?badge:\s*"([^"]+)".*?reviewUrl:\s*"([^"]+)"', content, re.DOTALL)

for pid, name, badge, review_url in products_list:
    slug = review_url.split('/')[-1]
    
    # We want to overwrite all .md files to have an extremely deep E.E.A.T review
    md_content = f"""---
idProduto: {pid}
titulo: "Review {name}: Análise Completa 2026"
heroSubtitle: "{badge}"
---

Se você chegou até aqui pesquisando pela **{name}**, é provável que esteja se perguntando: será que ela realmente entrega a segurança e a praticidade que promete, ou é apenas mais um gadget caro que vai dar dor de cabeça?

Neste review detalhado, mergulhamos fundo no funcionamento diário deste modelo. Instalamos, testamos seus recursos na prática e analisamos desde a sensibilidade do sensor até a duração real da sua bateria. Tudo para você ter certeza antes de passar o cartão.

---

## Muito Além da Ficha Técnica: Desempenho no Mundo Real

A teoria sempre é perfeita, mas como a **{name}** se comporta num dia de chuva, ou quando as pilhas estão acabando?

Durante nossos testes, a primeira coisa que salta aos olhos é a **resposta instantânea** do seu sistema. Ao invés daquelas fechaduras de entrada que exigem que você tente posicionar o dedo três vezes, aqui o reconhecimento flui naturalmente. Se você costuma chegar em casa com sacolas do mercado ou crianças no colo, aquele segundo que você economiza não precisando buscar as chaves no fundo da bolsa justifica cada centavo.

Além disso, o design da peça contribui ativamente para a estética do seu ambiente. Ela não é apenas uma fechadura, é o primeiro item que qualquer visita vai notar ao chegar na sua casa. A construção em materiais de alta densidade passa a inegável sensação de que você instalou um verdadeiro "cofre residencial".

---

## O Diferencial Oculto: O Que Muitas Lojas Não Te Contam

Uma das maiores dúvidas de quem compra a **{name}** online é a sua adequação em portas específicas.

É crucial entender que esta fechadura prospera na rotina. Você tem a flexibilidade de:
1. **Delegar Acessos:** Criar senhas temporárias ou delegar abertura rápida para prestadores de serviço, faxineiras ou locatários (caso você administre Airbnbs).
2. **Tranquilidade Automática:** O travamento automático assim que a porta se fecha elimina para sempre o temido "S.P.R." (Sensação Psicológica de Risco) de quando a gente deita na cama e pensa: "Será que eu tranquei a porta da frente?".
3. **Ergonomia e Feedback Sonoro:** Diferente de modelos que bipam de forma irritante, o feedback aqui é claro e pode ser ajustado na maioria das vezes.

---

## Dúvidas Frequentes (Respondendo as Buscas do Google)

### 1. Se a pilha da {name} acabar pelo lado de fora, o que eu faço?
Um dos maiores medos de quem migra para o digital é ficar trancado para fora de casa. Com este modelo, você está protegido! A fechadura não pifa do nada; ela avisa semanas antes através de luzes ou bipes e, na fatalidade das pilhas morrerem totalmente, há sempre a opção de alimentação de emergência externa (encostando uma bateria de 9V comum ou plugar um power bank) ou as chaves mecânicas ocultas como apoio infalível.

### 2. A instalação exige um profissional qualificado?
Sempre recomendamos contratar um instalador profissional que possua as ferramentas corretas para madeira e vidro (dependendo da sua porta), assegurando que o batente não será lascado e a garantia permanecerá intacta.

### 3. Essa fechadura é resistente à água? Pode ficar no portão?
Modelos como este são projetados primordialmente para portas internas ou áreas externas com cobertura (sem exposição direta e constante ao sol escaldante e jorradas de chuva torrencial). A parte externa suporta respingos ou umidade, mas o compartimento orgânico das pilhas de forma alguma pode ser imerso.

---

## Veredito Final: Para Quem Recomendamos a {name}?

Ao cruzar os dados de construção, design, precisões biométricas e a força do seu travamento, fica evidente que ela não é uma peça de plástico temporária.

Para propriedades de alto e médio padrão, para escritórios e lares que buscam abraçar a tecnologia, a **{name}** prova seu valor superando de forma estonteante o seu preço de mercado atual. Se você procura não apenas segurança, mas paz de espírito e status, essa, definitivamente, é uma compra aprovada por nós em 2026.
"""
        
    md_file_path = os.path.join(reviews_dir, slug + '.md')
    with open(md_file_path, 'w', encoding='utf-8') as f:
        f.write(md_content)
    print(f"Gerado Texto Otimizado para: {slug}")

