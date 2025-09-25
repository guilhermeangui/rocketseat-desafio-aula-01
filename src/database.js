// Aula 4 - Parte 4.1 - Banco de dados JSON
// Criando um banco de dados JSON

// // Estrutura desejada: { "users": [...], "..." : [...] }

// export class Database {
// 	#database = {} // O # na frente do database indica que é uma propriedade privada, só pode ser acessada dentro da classe

// 	insert(table, data) {
// 		if (Array.isArray(this.#database[table])) {
// 			this.#database[table].push(data)
// 		} else {
// 			this.#database[table] = [data]
// 		}

// 		return data;
// 	}

// 	select(table) {
// 		const data = this.#database[table] ?? []
// 		return data
// 	}
// }


// -----------------------------------------------------


// Aula 4 - Parte 4.2 - Persistindo os dados em um arquivo JSON

// import fs from 'node:fs/promises' // A diferença do "fs/promises" pro apenas "fs" é que o primeiro já trabalha com Promises, então não precisa usar callbacks como o segundo (mais antigo) precisava. Porém, o fs/promises não tem os métodos de streaming, portanto se for lidar com arquivos por parte é necessário usar o "fs"

// const databasePath = new URL('../db.json', import.meta.url) // Forma mais atual de lidar com paths no NodeJS, independentemente do diretório que a aplicação esteja rodando

// export class Database {
// 	#database = {}

// 	constructor() { // O constructor é um método especial que é executado automaticamente quando a classe é instanciada (quando fazemos "new Database()")
// 		fs.readFile(databasePath, 'utf8')
// 			.then((data) => {
// 				this.#database = JSON.parse(data) // Lendo o arquivo db.json e transformando o conteúdo (string) em um objeto JavaScript
// 			})
// 			.catch(() => {
// 				this.#persist() // Se o arquivo não existir, cria um novo
// 			})
// 	}

// 	#persist() { // Método privado para escrever nosso banco de dados num arquivo físico. Será chamado toda vez que inserirmos um registro no banco de dados (ver o insert())
// 		fs.writeFile(databasePath, JSON.stringify(this.#database)) // Salvando a database no arquivo db.json
// 	}

// 	insert(table, data) {
// 		if (Array.isArray(this.#database[table])) {
// 			this.#database[table].push(data)
// 		} else {
// 			this.#database[table] = [data]
// 		}

// 		this.#persist()

// 		return data
// 	}

// 	select(table) {
// 		const data = this.#database[table] ?? []
// 		return data
// 	}
// }


// -----------------------------------------------------

// Aula 5 - Parte 5.5, 5.6, 5.8 - Adicionando o método de delete do usuário, update do usuário e search de usuário
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

	delete(table, id) {
		if (Array.isArray(this.#database[table])) {
			this.#database[table] = this.#database[table].filter(item => item.id !== id) // Filtrando o array para remover o item com o id especificado
			this.#persist()
		}
	}

	update(table, id, data) {
		const rowIndex = this.#database[table].findIndex(row => row.id === id) 

		if (rowIndex > -1) {
			this.#database[table][rowIndex] = { ...this.#database[table][rowIndex], ...data } // Atualizando o item com os novos dados
			this.#persist()
		}
	}
}