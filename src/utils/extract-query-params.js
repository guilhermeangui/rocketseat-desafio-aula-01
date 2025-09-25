// Aula 5.7 - Extraindo query params da URL
export function extractQueryParams(queryString) {
	if (!queryString) {
		return {}
	}

	return Object.fromEntries(
		queryString
			.replace('?', '')
			.split('&')
			.map(param => param.split('='))
			.map(([key, value]) => [key, decodeURIComponent(value)]) // decodeURIComponent decodifica valores que foram codificados na URL (ex: espaços viram %20)
	)
}