import { parse } from 'csv-parse'

export async function csv(req, res) {
	const buffers = []
	for await (const chunk of req) { 
		buffers.push(chunk) 
	}

	try {
		const buf = Buffer.concat(buffers).toString()
		
		const parsedData = await new Promise((resolve, reject) => {
			parse(buf, {
				columns: false,
				skip_empty_lines: true,
				trim: true,
				delimiter: ';'
			}, (err, parsedData) => {
				if (err) reject(err)
				else resolve(parsedData)
			})
		})

		const csvData = parsedData.slice(1).map(row => ({
			title: row[0],
			description: row[1]
		}))

		req.csvData = csvData
	} catch (error) {
		req.csvData = null
	}

	res.setHeader('Content-Type', 'application/json')
}