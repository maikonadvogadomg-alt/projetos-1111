# Se você tem o .crt público:
openssl pkcs12 -export -in seu_certificado.crt -inkey maikon_pdjud.key -out pdjud_a1.p12

# Senha: defina "123456" ou sua preferida