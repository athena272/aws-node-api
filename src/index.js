const http = require('http')
const url = require('url')
const routes = require('./routes.js')
const { bodyParser } = require('./helpers/bodyParser.js')

const server = http.createServer((req, res) => {
    console.log(`Method: ${req.method} | Endpoint: ${req.url}`)
    const parsedUrl = url.parse(req.url, true)

    let { pathname } = parsedUrl
    let id = null

    // const splitEndpoint = pathname.split('/').filter((routerItem) => Boolean(routerItem))
    const splitEndpoint = pathname.split('/').filter(Boolean)

    if (splitEndpoint.length > 1) {
        pathname = `/${splitEndpoint[0]}/:id`
        id = splitEndpoint[1]
        console.log(pathname)
    }

    const route = routes.find((routeObj) => routeObj.method === req.method && routeObj.endpoint === pathname)

    if (route) {
        req.query = parsedUrl.query
        req.params = { id }

        res.send = (statusCode, body) => {
            res.writeHead(statusCode, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(body))
        }

        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            bodyParser(req, () => route.handler(req, res))

        } else {
            route.handler(req, res)

        }

    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        })
        res.end(`Cannot ${req.method} ${req.url}`)
    }

})

server.listen(3000, () => console.log('🔥 Welcome to my API 🔥'))
