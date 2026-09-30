openssl pkcs12 -export -out pdjud_a1.pfx \
  -inkey pdjud_private.key \
  -in pdjud_a1.crt \
  -certfile cacert.pem \
  -passout pass:PDJUD2026@