curl -X POST https://homolog.eproc.tjmg.jus.br/pdjude/api/auth/oab \
  -H "Content-Type: application/json" \
  -d '{
    "oab": "183712MG",
    "senha": "token123456",
    "cpf": "SEU_CPF_AQUI"
  }'