// Aula 5 - Parte 5.3 - Regex dos parâmetros

export function buildRoutePath(path) {
	const routeParametersRegex = /:([a-zA-Z]+)/g // :id, :name, :anyName (começa com dois pontos e depois qualquer letra maiúscula ou minúscula)
	const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-zA-Z0-9-_]+)') // Substituindo :id por (?<id>[a-zA-Z0-9-_]+) - O que está entre parênteses é um grupo de captura (captura o valor do parâmetro)
	const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`) // ^ indica o início da string, $ indica o fim da string. O que está entre parênteses é um grupo de captura (captura o valor do parâmetro). O grupo de captura "query" captura tudo que vem depois do "?" na URL (parâmetros de query string, ex: ?page=2&limit=10)

	return pathRegex
}