import requests

url = "https://homolog.eproc.tjmg.jus.br/pdjude/api/auth/oab"
payload = {
    "oab": "183712MG",
    "senha": "token123456",
    "cpf": "SEU_CPF"
}

response = requests.post(url, json=payload)
token = response.json()['access_token']
print(f"TOKEN: {token}")