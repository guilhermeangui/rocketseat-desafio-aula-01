import http from 'node:http'

// - Criar usuários
// - Listar usuários
// - Editar usuários
// - Deletar usuários

// HTTP:
// - Método HTTP
// - URL

// Métodos: GET, POST PUT, PATCH E DELETE
// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end (Ex: um formulário, onde o usuário preenche todos os campos)
// PATCH => Atualizar uma informação específica de um recurso no back-end (Ex: uma rota específica para aceitar notificações ou não)
// DELETE => Deletar um recurso no back-end

// É possível ter rotas iguais com métodos diferentes:
// GET /users => Buscando usuários no back-end
// POST /users => Cadastra um novo usuário no back-end

// Aplicação stateful: mantém o estado da aplicação na memória (enquanto o server estiver rodando, os dados ficam salvos na memória - Ex: usuários, carrinho de compras, etc)
// Aplicação stateless: não mantém o estado da aplicação na memória (salva as informações em bancos de dados, arquivos textos, etc)

// Cabeçalhos (Headers) => Metadados (informações sobre a requisição ou resposta)

// HTTP Status Codes
// 1xx => Informação
// 2xx => Sucesso
// 3xx => Redirecionamento
// 4xx => Erro do cliente
// 5xx => Erro do servidor

// -----------------------------------------------------

// Exercício: Salvando usuários em memória - Stateful (ou seja, enquanto o server estiver rodando):

// const users = []

// const server = http.createServer((req, res) => {
// 	const { method, url } = req

// 	console.log(method, url)

// 	if (method === 'GET' && url === '/users') {
// 		// Early return
// 		return res
// 			.setHeader('Content-Type', 'application/json') // Indicando o tipo de header para o client
// 			.end(JSON.stringify(users))
// 	}
	
// 	if (method === 'POST' && url === '/users') {
// 		users.push({
// 			id: 1,
// 			name: 'Angui',
// 			email: 'guilhermeangui@live.com',
// 		})

// 		return res
// 			.writeHead(201) // Status code 201 => Created
// 			.end() // Indicando que a requisição foi finalizada
// 		// return res.end('Criação de um usuário')
// 	}

// 	return res.writeHead(404).end() // Status code 404 => Not Found
// 	// return res.end('Hello World!')
// })

// server.listen(3333, () => console.log('Server is running on http://localhost:3333'));


// -----------------------------------------------------


// Aula 3 - Parte 3.6 - Enviando um JSON do Insomnia para o server.js

// const users = []

// const server = http.createServer(async (req, res) => {
// 	const { method, url } = req
	
// 	const buffers = []
// 	for await (const chunk of req) {
// 		buffers.push(chunk)
// 	}

// 	try {
// 		req.body = JSON.parse(Buffer.concat(buffers).toString())
// 	} catch {
// 		req.body = null
// 	}

// 	if (method === 'GET' && url === '/users') {
// 		return res
// 			.setHeader('Content-Type', 'application/json')
// 			.end(JSON.stringify(users))
// 	}
	
// 	if (method === 'POST' && url === '/users') {
// 		const { name, email, id } = req.body

// 		users.push({ id, name, email })

// 		return res
// 			.writeHead(201)
// 			.end()
// 	}

// 	return res.writeHead(404).end()
// })

// server.listen(3333, () => console.log('Server is running on http://localhost:3333'));


// -----------------------------------------------------

// Aula 3 - Parte 3.8 - Middlewares JSON
// Ver também: pasta /middlewares/json.js
// import { json } from './middlewares/json.js'

// const users = []

// const server = http.createServer(async (req, res) => {
// 	const { method, url } = req

// 	await json(req, res)

// 	if (method === 'GET' && url === '/users') {
// 		return res
// 			.end(JSON.stringify(users))
// 	}
	
// 	if (method === 'POST' && url === '/users') {
// 		const { name, email, id } = req.body

// 		users.push({ id, name, email })

// 		return res
// 			.writeHead(201)
// 			.end()
// 	}

// 	return res.writeHead(404).end()
// })

// server.listen(3333, () => console.log('Server is running on http://localhost:3333'));


// -----------------------------------------------------

// Aula 4 - Parte 4.1 - Banco de dados JSON
// Criando um banco de dados simples com um arquivo JSON
// Ver também: arquivo src/database.js

// import { json } from './middlewares/json.js'
// import { Database } from './database.js'

// const database = new Database()

// const server = http.createServer(async (req, res) => {
// 	const { method, url } = req

// 	await json(req, res)

// 	if (method === 'GET' && url === '/users') {
// 		const users = database.select('users')

// 		return res.end(JSON.stringify(users))
// 	}
	
// 	if (method === 'POST' && url === '/users') {
// 		const { name, email, id } = req.body
// 		const user = { id, name, email }

// 		database.insert('users', user)

// 		return res.writeHead(201).end()
// 	}

// 	return res.writeHead(404).end()
// })

// server.listen(3333, () => console.log('Server is running on http://localhost:3333'));


// -----------------------------------------------------

// Aula 4 - Parte 4.3 - Criando um ID único para cada usuário
// Adicionando a funcao ramdomUUID() do módulo crypto do NodeJS para criar IDs únicos

// import { json } from './middlewares/json.js'
// import { Database } from './database.js'
// import { randomUUID } from 'node:crypto'

// const database = new Database()

// const server = http.createServer(async (req, res) => {
// 	const { method, url } = req

// 	await json(req, res)

// 	if (method === 'GET' && url === '/users') {
// 		const users = database.select('users')

// 		return res.end(JSON.stringify(users))
// 	}
	
// 	if (method === 'POST' && url === '/users') {
// 		const { name, email } = req.body
// 		const user = { id: randomUUID(), name, email }

// 		database.insert('users', user)

// 		return res.writeHead(201).end()
// 	}

// 	return res.writeHead(404).end()
// })

// server.listen(3333, () => console.log('Server is running on http://localhost:3333'));


// -----------------------------------------------------


// Aula 5 - Parte 5.1 - Separando rotas da aplicação
// Separando rotas em um arquivo próprio: routes.js

// import { json } from './middlewares/json.js'
// import { routes } from './routes.js'

// const server = http.createServer(async (req, res) => {
// 	const { method, url } = req

// 	await json(req, res)

// 	// Procurando a rota dentro do array de rotas
// 	const route = routes.find(route => {
// 		return route.method === method && route.path === url
// 	})

// 	// Executando a rota encontrada
// 	if (route) {
// 		return route.handler(req, res)
// 	}

// 	return res.writeHead(404).end()
// })

// server.listen(3333, () => console.log('Server is running on http://localhost:3333'));


// -----------------------------------------------------


// Aula 5 - Parte 5.3, 5.4, 5.5, 5.6, 5.7, 5.8 - Regex dos parâmetros/query + Deletando um usuário pelo id + Atualizando um usuário pelo id

import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
	const { method, url } = req

	await json(req, res)

	// Procurando a rota dentro do array de rotas
	const route = routes.find(route => {
		return route.method === method && route.path.test(url)
	})

	// Executando a rota encontrada
	if (route) {
		const routeParams = req.url.match(route.path) // Match retorna um array com os parâmetros da URL
		const { query, ...params } = routeParams.groups // Pegando o grupo de captura "query" e o resto dos parâmetros (ex: id, name, etc)

		req.params = params
		req.query = extractQueryParams(query)

		return route.handler(req, res)
	}

	return res.writeHead(404).end()
})

server.listen(3333, () => console.log('Server is running on http://localhost:3333'));