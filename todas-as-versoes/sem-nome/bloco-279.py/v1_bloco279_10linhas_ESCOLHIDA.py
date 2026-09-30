import requests

url = "https://homolog.eproc.tjmg.jus.br/pdjude/api/auth/certificado"
data = {
    "cpf": "09494128648",
    "cnpj_oab": "045100"
}

response = requests.post(url, json=data)
print(response.json())