const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    console.log("🚀 ~ file: server.js ~ line 4 ~ router", router)
    res.jsonp(req.query)
})

server.post('/login', (req, res) => {
    console.log("🚀 ~ file: server.js ~ line 15 ~ server.post ~ req", req.body)
    if (req.body.username == '7905127546' || req.body.pass == '12345') {
        res.status(200).send({ "msg": "hehe" })
    }

})



// Use default router
server.use(router)
server.listen(5555, () => {
    console.log('JSON Server is running:5555')
})