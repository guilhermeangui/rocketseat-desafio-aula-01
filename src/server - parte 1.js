// const a = 5;
// const b = 5;
// console.log(a + b);

// -------------------------------------------------------------

// Aplicações HTTP => APIs

// CommonJS => require [DEPRECADO]
// const http = require('http');

// ESModules => import/export [ATUAL]
// Porém, para funcionar, é necessário adicionar o "type": "module" no package.json
import http from 'node:http' // ou 'http' (a partir do Node 18)

const server = http.createServer((req, res) => {
	return res.end('Hello World!')
})

server.listen(3333, () => console.log('Server is running on http://localhost:3333'));

// -------------------------------------------------------------