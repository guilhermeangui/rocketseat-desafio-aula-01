Terminal 1 (server):
npm run dev

Terminal 2 (client):
http POST localhost:3333/users
http GET localhost:3333/users


### Aula 1

- npm init -y
Criou o package.json

- criei uma pasta /src/server.js

- node src/server.js
comando pra rodar meu código js

- terminal: "http localhost:3333" pra testar (poderia ser no browser)
adicionei o código de createServer 

- node --watch src/server.js
assim o node reinicia quando o código sofre alterações

- adicionando scripts no package.json
adicionado o script "dev"


### Aula 2 (Estrutura)

- http POST localhost:3333/users
o código vai pegar que foi um POST e também que a rota foi /users -> aparecerá no terminal que está rodando o server


### Aula 3 (Streams)

Parte 3.1 3.2 e 3.3 - streams/fundamentals.js
Diversos tipos de streams. Comentários explicativos no código

Parte 3.4 - stream-http-server.js e fake-upload-to-http-stream.js
O fake upload simula um upload de arquivos pro nosso server

Parte 3.6 - server.js
Enviando um JSON do Insomnia para o server.js

Parte 3.7 - Buffer - buffer.js
O que é o Buffer? É uma representação de um espaço na memória do computador, usado especialmente para transitar dados de uma maneira muito rápida. Os dados armazenados no Buffer são feitos para logo serem tratados (enviados para outro lugar) e depois logo removidos. São maneiras de salvar e ler da memória de forma muito performática. Performática porque o Node usa esse modelo de Buffer na leitura/escrita de streams porque é mais performático ler parcialmente uma informação de forma binária (que é como o Buffer guarda na memória) do que necessariamente um texto, uma string, algo que tenha muito mais informações (acentos, tils, coisas que tem encoding). O Buffer existe dentro do Node (foi uma API criada dentro do Node) justamente pela incapacidade do JS de trabalhar com dados binários de maneira eficiente (por muito tempo ele não teve uma forma nativa de trabalhar com dados binários). Resumidamente, o Buffer é uma maneira mais eficiente/performatica pra ler e escrever da memória conversando de uma maneira binária (mais baixo nível).

Parte 3.8 - Middlewares
Middleware nada mais é que um interceptador. Um interceptador nada mais é (no Node) que uma função que intercepta nossa requisição e sempre recebem o req e o res

### Aula 4 (Banco de dados JSON)

Parte 4.1 - Criando um banco de dados JSON
Arquivos server.js e database.js

Parte 4.2 - Persistindo o banco de dados
Arquivo database.js

Parte 4.3 - Criando ID único e universal para os usuários


### Aula 5 (Rotas da aplicação)

Parte 5.1 - Criando o arquivo routes.js

Parte 5.2 - Parâmetros
- Query parameters: ?userId=1&name=Angui (URL Stateful - ex: filtros, paginação, ordenação, busca, etc)
- Route parameters: DELETE /users/1 (Identificação do recurso - ex: editar um usuário específico, deletar um usuário específico, etc)
- Request body: {"name": "Angui", "email": "angui@asd.com"} (usado para criar ou editar um recurso - URL Stateless - ex: formulários, upload de arquivos, etc)

Parte 5.3, 5.4 - Regex dos parâmetros
Arquivo src/utils/build-route-path.js e routes.js

Parte 5.5, 5.6 - Deletando um usuário pelo id, atualizando um usuário pelo id
Arquivo routes.js, server.js, database.js