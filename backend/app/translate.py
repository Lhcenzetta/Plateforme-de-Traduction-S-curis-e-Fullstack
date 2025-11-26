import os
import requests

headers = {
   "Authorization": f"Bearer {os.environ['HF_API_TOKEN']}",
}

def query(text , servie):
    payload = { "inputs": text}

    if (servie == "fr-en"):
         model = "Helsinki-NLP/opus-mt-fr-en"
    elif (servie == "en-fr"):
         model = "Helsinki-NLP/opus-mt-en-fr"
    else :
         return "operation not fount ! please make sure you entre a right servise"
    
    API_URL = f"https://router.huggingface.co/hf-inference/models/{model}"
    response = requests.post(API_URL, headers=headers, json=payload)
    result = response.json()
    return result[0]["translation_text"]

# print(query("the text her will traduire to fr or eng" , "en-fr"))