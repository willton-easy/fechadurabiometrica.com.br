import google.generativeai as genai
import os

genai.configure(api_key="AIzaSyAyNhflEm2pwSPNavsjuyn6cI8VXzAZXzI")

print("--- Modelos Disponíveis ---")
for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods or 'generateImage' in m.supported_generation_methods:
        print(f"Nome: {m.name} | Métodos: {m.supported_generation_methods}")
