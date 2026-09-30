curl -X POST https://homolog.eproc.tjmg.jus.br/pdjude/api/auth/certificado \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "09494128648",
    "cnpj_oab": "045100"
  }'