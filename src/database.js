import fs from 'node:fs/promises' 

const databasePath = new URL('../db.json', import.meta.url) 

export class Database {
	#database = {}

	constructor() {
		fs.readFile(databasePath, 'utf8')
			.then((data) => {
				this.#database = JSON.parse(data)
			})
			.catch(() => {
				this.#persist()
			})
	}

	#persist() {
		fs.writeFile(databasePath, JSON.stringify(this.#database))
	}

	insert(table, data) {
		if (Array.isArray(this.#database[table])) {
			this.#database[table].push(data)
		} else {
			this.#database[table] = [data]
		}

		this.#persist()

		return data
	}

	select(table, search) {
		const data = this.#database[table] ?? []

		if (search) {
			return data.filter(item => {
				return Object.entries(search).some(([key, value]) => {
					return item[key]?.toString().toLowerCase().includes(value.toString().toLowerCase())
				})
			})
		}

		return data
	}

	selectByID(table, id) {
		const data = this.#database[table] ?? []
		return data.find(item => item.id === id)
	}

	delete(table, id) {
		if (Array.isArray(this.#database[table])) {
			this.#database[table] = this.#database[table].filter(item => item.id !== id)
			this.#persist()
		}
	}

	update(table, id, data) {
		const rowIndex = this.#database[table].findIndex(row => row.id === id) 

		if (rowIndex > -1) {
			this.#database[table][rowIndex] = { ...this.#database[table][rowIndex], ...data }
			this.#persist()
		}
	}
}