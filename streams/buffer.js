const buf = Buffer.from('ok')

console.log(buf)
// Cuspiu <Buffer 6f 6b>
// o 6f representa o 'o' em hexadecimal
// k 6b representa o 'k' em hexadecimal

console.log(buf.toJSON())
// Cuspiu { type: 'Buffer', data: [ 111, 107 ] }
// 111 representa o 'o' em decimal
// 107 representa o 'k' em decimal

console.log(buf.toString())
// Cuspiu ok