const http = require('http');
const url = require('url');
const routes = require('./routes.js');
const { bodyParser } = require('./helpers/bodyParser.js');

const server = http.createServer((req, res) => {
    // Configurar os cabeçalhos CORS manualmente
    // res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir todos os domínios (não recomendado para produção)
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Exibir informações sobre o método HTTP e o endpoint solicitado
    console.log(`Method: ${req.method} | Endpoint: ${req.url}`);

    // Analisar a URL da solicitação
    const parsedUrl = url.parse(req.url, true);

    let { pathname } = parsedUrl;
    let id = null;

    // Dividir o endpoint em partes e remover itens vazios
    // const splitEndpoint = pathname.split('/').filter((routerItem) => Boolean(routerItem))
    const splitEndpoint = pathname.split('/').filter(Boolean);

    if (splitEndpoint.length > 1) {
        // Se houver mais de uma parte no endpoint, considerá-lo como um parâmetro "id"
        pathname = `/${splitEndpoint[0]}/:id`;
        id = splitEndpoint[1];
        console.log(pathname);
    }

    // Encontrar a rota correspondente com base no método HTTP e no endpoint
    const route = routes.find((routeObj) => routeObj.method === req.method && routeObj.endpoint === pathname);

    if (route) {
        // Definir os objetos "query" e "params" para a solicitação
        req.query = parsedUrl.query;
        req.params = { id };

        // Definir uma função "send" no objeto de resposta para enviar respostas JSON
        res.send = (statusCode, body) => {
            res.writeHead(statusCode, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(body));
        };

        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            // Para métodos que enviam dados no corpo (POST, PUT, PATCH), analisar o corpo antes de chamar o manipulador da rota
            bodyParser(req, () => route.handler(req, res));
        } else {
            // Para outros métodos, chamar diretamente o manipulador da rota
            route.handler(req, res);
        }

    } else {
        // Se a rota não for encontrada, retornar uma resposta de erro 404
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end(`Cannot ${req.method} ${req.url}`);
    }

});

// Iniciar o servidor na porta 3000
server.listen(3000, () => console.log('🔥 Welcome to my API 🔥'));
