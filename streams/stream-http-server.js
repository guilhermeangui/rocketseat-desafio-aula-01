// Aula 3 - Parte 3.4 - Streams + HTTP Server
// // Feito para estruturas de dados que podem ser consumidos em partes (ex: JSON não pode, mas CSV pode - assim como músicas, vídeos, textos, etc)

// import http from 'node:http'
// import { Transform } from 'node:stream'

// class InverseNumberStream extends Transform {
// 	_transform(chunk, encoding, callback) {
// 		const transformed = Number(chunk.toString()) * -1

// 		console.log(transformed)

// 		callback(null, Buffer.from(String(transformed)))
// 	}
// }

// // Neste caso:
// // req => ReadableStream
// // res => WritableStream

// const server = http.createServer((req, res) => {
// 	if (req.method === 'POST') {
// 		return req
// 			.pipe(new InverseNumberStream())
// 			.pipe(res)
// 	}
// })

// server.listen(3335)


// ------------

// Aula 3 - Parte 3.5 - Esperando a stream acabar (a informação por completo) para processar os dados. Nada irá acontecer até a stream acabar

// Curiosidade: JSON é impossível de consumir por partes, precisa ser o arquivo todo porque tem que começar com { e terminar com } (ou [ e ] no caso de arrays) e poderia vir quebrado se fosse em chunks

import http from 'node:http'

const server = http.createServer(async (req, res) => {
	const buffers = []

	for await (const chunk of req) {
		buffers.push(chunk)
	}

	const fullStreamContent = Buffer.concat(buffers).toString()

	console.log(fullStreamContent)

	return res.end(fullStreamContent)
})

server.listen(3335)