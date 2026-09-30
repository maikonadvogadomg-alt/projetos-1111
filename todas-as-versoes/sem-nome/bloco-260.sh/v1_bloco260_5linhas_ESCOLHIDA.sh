curl -X POST https://homolog.eproc.tjmg.jus.br/pdjude/api/auth/certificado \
  --key maikon_pdjud.key \
  --cert seu_certificado.crt \
  -d '{"cpf":"09494128648"}' \
  -H "Content-Type: application/json"