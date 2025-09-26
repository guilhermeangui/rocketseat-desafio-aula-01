import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
	{
		method: 'POST',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			const { title, description } = req.body

			if (!title || !description) {
				return res.writeHead(400).end(JSON.stringify({ 
					message: 'O título e a descrição são obrigatórios' 
				}))
			}

			const task = { 
				id: randomUUID(), 
				title, 
				description, 
				created_at: new Date(), 
				updated_at: new Date(), 
				completed_at: null, 
			}

			database.insert('tasks', task)
			return res.writeHead(201).end()
		}
	},
	{
		method: 'POST',
		path: buildRoutePath('/tasks/csv'),
		handler: (req, res) => {
			const csvData = req.csvData

			console.log(csvData)

			if (!csvData || !Array.isArray(csvData)) {
				return res.writeHead(400).end(JSON.stringify({ 
					message: 'CSV inválido ou vazio' 
				}))
			}

			const success = []
			const errors = []

			csvData.forEach((row, index) => {
				const { title, description } = row

				if (!title || !description) {
					errors.push({
						linha: index + 2,
						erro: 'Título e descrição são obrigatórios'
					})
					return
				}

				const task = { 
					id: randomUUID(), 
					title: title.trim(), 
					description: description.trim(), 
					created_at: new Date(), 
					updated_at: new Date(), 
					completed_at: null, 
				}

				database.insert('tasks', task)
				success.push(task)
			})

			const response = {
				totalProcessed: csvData.length,
				tasksCreated: success.length,
				errors: errors.length,
				errorDetails: errors
			}

			if (errors.length > 0) {
				return res.writeHead(207).end(JSON.stringify(response))
			}

			return res.writeHead(201).end(JSON.stringify(response))
		}
	},
	{
		method: 'GET',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			const { search } = req.query

			const tasks = database.select('tasks', 
				search ? {
					title: search,
					description: search,
				} : null
			)
			return res.end(JSON.stringify(tasks))
		}
	},
	{
		method: 'PUT',
		path: buildRoutePath('/tasks/:id'),
		handler: (req, res) => {
			const { id } = req.params
			const { title, description } = req.body

			if (!title || !description) {
				return res.writeHead(400).end(JSON.stringify({ 
					message: 'O título e a descrição são obrigatórios' 
				}))
			}

			if (database.selectByID('tasks', id) === undefined) {
				return res.writeHead(404).end(JSON.stringify({ 
					message: 'Tarefa não encontrada' 
				}))
			}

			database.update('tasks', 
				id, 
				{ 
					title, 
					description, 
					updated_at: new Date() 
				}
			)
			return res.writeHead(204).end()
		}
	},
	{
		method: 'DELETE',
		path: buildRoutePath('/tasks/:id'),
		handler: (req, res) => {
			const { id } = req.params

			if (database.selectByID('tasks', id) === undefined) {
				return res.writeHead(404).end(JSON.stringify({ 
					message: 'Tarefa não encontrada' 
				}))
			}

			database.delete('tasks', id)
			return res.writeHead(204).end()
		}
	},
	{
		method: 'PATCH',
		path: buildRoutePath('/tasks/:id/complete'),
		handler: (req, res) => {
			const { id } = req.params

			if (database.selectByID('tasks', id) === undefined) {
				return res.writeHead(404).end(JSON.stringify({ 
					message: 'Tarefa não encontrada' 
				}))
			}

			database.update('tasks', id, { completed_at: new Date() })
			return res.writeHead(204).end()
		}
	}
]