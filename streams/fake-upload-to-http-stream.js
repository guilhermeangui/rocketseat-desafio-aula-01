// Aula 3 - Parte 3.4 - Streams + HTTP Server

// import { Readable } from 'node:stream'

// // Desde o Node 18, é possível usar o fetch nativo do NodeJS
// // Antes era necessário instalar o node-fetch

// class OneToHundredStream extends Readable {
// 	index = 1

// 	_read() {
// 		const i = this.index++

// 		// Ao descomentar o código abaixo, cada número será impresso a cada 200ms no console
// 		setTimeout(() => {
// 			if (i > 100) {
// 				this.push(null)
// 			} else {
// 				const buf = Buffer.from(String(i))
// 				this.push(buf)
// 			}
// 		}, 200);
// 	}
// }

// fetch('http://localhost:3335', {
// 	method: 'POST', // Simulando um upload de arquivo pro nosso server - Precisa ser POST neste caso
// 	body: new OneToHundredStream(),
// 	duplex: 'half', // Necessário quando o body é uma stream - A partir do Node 18.14.0
// 	headers: {
// 		'Content-Type': 'application/octet-stream'
// 	}
// })
// .then(response => response.text())
// .then(data => console.log('Concluído'))


// ----------------

// Aula 3 - Parte 3.5 - Esperando a stream acabar (a informação por completo) para processar os dados

import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
	index = 1

	_read() {
		const i = this.index++

		// Ao descomentar o código abaixo, cada número será impresso a cada 200ms no console
		setTimeout(() => {
			if (i > 5) {
				this.push(null)
			} else {
				const buf = Buffer.from(String(i))
				this.push(buf)
			}
		}, 1000);
	}
}

fetch('http://localhost:3335', {
	method: 'POST',
	body: new OneToHundredStream(),
	duplex: 'half', 
	headers: {
		'Content-Type': 'application/octet-stream'
	}
})
.then(response => response.text())
.then(data => console.log(data))
