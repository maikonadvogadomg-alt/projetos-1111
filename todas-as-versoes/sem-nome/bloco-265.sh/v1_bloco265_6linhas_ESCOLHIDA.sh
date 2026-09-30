# Header Authorization para todas APIs PDJUD
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...

# Exemplo: Listar processos
curl -X GET https://homolog.eproc.tjmg.jus.br/pdjude/api/processos \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"