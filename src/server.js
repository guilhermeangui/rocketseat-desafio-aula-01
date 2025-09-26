import http from 'node:http'
import { json } from './middlewares/json.js'
import { csv } from './middlewares/csv.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
	const { method, url } = req

	if (url.includes('/tasks/csv') && method === 'POST') {
		await csv(req, res)
	} else {
		await json(req, res)
	}

	const route = routes.find(route => {
		return route.method === method && route.path.test(url)
	})

	if (route) {
		const routeParams = req.url.match(route.path)
		const { query, ...params } = routeParams.groups || {}

		req.params = params
		req.query = extractQueryParams(query)

		console.log(req.params, req.query)

		return route.handler(req, res)
	}

	return res.writeHead(404).end()
})

server.listen(3333, () => console.log('🚀 rodando no http://localhost:3333'));