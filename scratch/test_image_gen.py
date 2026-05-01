from google import genai
import os

client = genai.Client(api_key="AIzaSyAyNhflEm2pwSPNavsjuyn6cI8VXzAZXzI", http_options={'api_version': 'v1alpha'})

model_id = 'gemini-3.1-flash-image-preview'
prompt = "A high-end product photography of a portable door lock on a wooden desk, Sony A7R IV style, 8k."

print(f"Testando gera\u00e7\u00e3o com o modelo {model_id}...")

try:
    # Tentando o m\u00e9todo de conte\u00fado para modelos de imagem
    response = client.models.generate_content(
        model=model_id,
        contents=prompt
    )
    
    print("--- Resposta Recebida ---")
    # Verificando se a resposta cont\u00e9m partes de imagem
    for part in response.candidates[0].content.parts:
        if part.inline_data:
            print(f"Imagem detectada! Tamanho: {len(part.inline_data.data)} bytes")
            with open("scratch/test_image.png", "wb") as f:
                f.write(part.inline_data.data)
            print("Imagem salva em scratch/test_image.png")
        else:
            print(f"Parte detectada, mas n\u00e3o \u00e9 imagem: {part.text if part.text else 'Outro tipo'}")

except Exception as e:
    print(f"Erro no teste: {str(e)}")
