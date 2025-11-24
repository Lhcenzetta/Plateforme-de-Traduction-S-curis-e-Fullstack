import os
from urllib import request


HF_TOKEN = os.getenv("HF_API_TOKEN")

def translate_text(text: str, direction: str):
    if direction == "fr-en":
        model = "Helsinki-NLP/opus-mt-fr-en"
    elif direction == "en-fr":
        model = "Helsinki-NLP/opus-mt-en-fr"
    else:
        raise ValueError("Invalid direction")

    API_URL = f"https://router.huggingface.co/hf-inference/models/{model}"

    headers = {
        "Authorization": f"Bearer {HF_TOKEN}"
    }

    payload = {
        "inputs": text
    }

    response = request.post(API_URL, headers=headers, json=payload, timeout=10)

    if response.status_code != 200:
        raise Exception(f"HuggingFace Error: {response.text}")

    return response.json()[0]["translation_text"]
