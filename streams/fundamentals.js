// Nexflix & Spotify

// Importação de clientes via CSV (Excel)
// Caso extremo (exemplo): 1GB - 1.000.000 de linhas (ou algo do tipo)
// - POST /upload -> import.csv
// - O processamento será muito custoso - a 10mb/s demoraria 100s para o upload para então o Node começar a trabalhar

// Outro cenário (streams):
// 10mb/s -> 10.000 linhas. O Node pode começar a trabalhar com as primeiras 10.000 linhas enquanto o upload ainda está acontecendo, via stream

// Readable streams / Writable streams / Duplex streams / Transform streams

// process.stdin // Readable stream (Leitura)
// process.stdout // Writable stream (Escrita)

// Buffer: Modelo que o NodeJS para transicionar os dados entre streams


// ----------


// Exemplo: Ao executar o código abaixo, tudo que for digitado no terminal será repetido (echo) no terminal
// process.stdin
// 	.pipe(process.stdout)


// -----------


// Aula 3 - Parte 3.1 (Streams)
// Exemplo: Uma stream Readable que vai de 1 a 100
// import { Readable } from 'node:stream'

// class OneToHundredStream extends Readable {
// 	index = 1

// 	_read() {
// 		const i = this.index++

// 		// if (i > 100) {
// 		// 	this.push(null)
// 		// } else {
// 		// 	const buf = Buffer.from(String(i))
// 		// 	this.push(buf)
// 		// }

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

// new OneToHundredStream()
// 	.pipe(process.stdout)


// -----------


// Aula 3 - Parte 3.1 (Streams)
// Exemplo: Uma stream Readable (que vai de 1 a 100), 
// Writable (que multiplica por 10)
// Transform (que converte o número em negativo)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
	index = 1

	_read() {
		const i = this.index++

		// Ao descomentar o código abaixo, cada número será impresso a cada 200ms no console
		setTimeout(() => {
			if (i > 100) {
				this.push(null)
			} else {
				const buf = Buffer.from(String(i))
				this.push(buf)
			}
		}, 200);
	}
}

class InverseNumberStream extends Transform {
	_transform(chunk, encoding, callback) {
		const transformed = Number(chunk.toString()) * -1
		callback(null, Buffer.from(String(transformed)))
	}
}

class MultiplyByTenStream extends Writable {
	_write(chunk, encoding, callback) {
		console.log(Number(chunk.toString()) * 10)
		callback()
	}
}

new OneToHundredStream() // Stream de leitura: Consigo apenas ler dados dela
	.pipe(new InverseNumberStream()) // Stream de transformação: Obrigatoriamente precisa ler dados de algum lugar e escrever dados para outro lugar. Utilizada no intermeio, para comunicar duas streams
	.pipe(new MultiplyByTenStream()) // Stream de escrita: Consigo apenas escrever dados nela