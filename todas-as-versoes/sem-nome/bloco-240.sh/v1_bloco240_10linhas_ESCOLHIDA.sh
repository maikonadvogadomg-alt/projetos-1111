curl -X POST https://eproc.tjmg.jus.br/pdjude/api/auth/certificado \
  -H "Content-Type: application/json" \
  --cert cert.p12 \
  --cert-type P12 \
  --pass "senha_certificado" \
  -d '{
    "cnpj": "xx.xxx.xxx/xxxx-xx",
    "oab": "MG12345",
    "ambiente": "producao"
  }'