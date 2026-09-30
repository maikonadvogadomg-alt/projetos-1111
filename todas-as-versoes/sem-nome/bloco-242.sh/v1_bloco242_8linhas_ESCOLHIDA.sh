curl -X POST https://eproc.tjmg.jus.br/pdjude/api/auth/token \
  -H "Authorization: Bearer CERT_VALIDACAO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "client_credentials",
    "client_id": "PDJUD-123456",
    "scope": "peticao.andamento.processos"
  }'