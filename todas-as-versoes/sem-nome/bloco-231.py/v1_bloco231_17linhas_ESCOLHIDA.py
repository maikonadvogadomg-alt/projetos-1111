import requests

url = "https://sso.cloud.pje.jus.br/auth/realms/pje/protocol/openid-connect/token"
data = {
    "client_id": "seu_client_id",
    "client_secret": "seu_client_secret",
    "grant_type": "password",
    "username": "usuario_cnj",
    "password": "senha_cnj"
}

response = requests.post(url, data=data)
token = response.json()["access_token"]

# Uso na API PDJd
headers = {"Authorization": f"Bearer {token}"}
api_response = requests.get("https://api.pdpj.jus.br/sua_endpoint", headers=headers)