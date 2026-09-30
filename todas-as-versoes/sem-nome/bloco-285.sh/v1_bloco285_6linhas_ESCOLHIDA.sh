# Todas as APIs PDJUD usam este header:
Authorization: Bearer SEU_ACCESS_TOKEN

# Exemplo - Listar processos:
curl -X GET "https://homolog.eproc.tjmg.jus.br/pdjude/api/processos" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..."