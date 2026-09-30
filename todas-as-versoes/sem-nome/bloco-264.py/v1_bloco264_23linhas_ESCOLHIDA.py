import requests
import json

# Arquivos PEM
key_file = "maikon_pdjud.key"
cert_file = "seu_certificado.crt"

url = "https://homolog.eproc.tjmg.jus.br/pdjude/api/auth/certificado"
payload = {
    "cpf": "09494128648",
    "cnpj_oab": "045100"
}

response = requests.post(url, json=payload, 
                       cert=(cert_file, key_file),
                       verify=True)

if response.status_code == 200:
    token_data = response.json()
    print("✅ TOKEN:", token_data['access_token'])
    print("Expira em:", token_data['expires_in'], "segundos")
else:
    print("❌ Erro:", response.status_code, response.text)