const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
  res.createdAt = Date.now()

  next()
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    let response = [],
        item = {},
        anotherPage = {},
        updatedPage = {};

    item.id = "108",
    item.label = "new page",
    item.href = "/updated"
    anotherPage.id = "109",
    anotherPage.label = "updated page",
    anotherPage.href = "/updated_page"
    updatedPage.id = "110",
    updatedPage.label = "another page",
    updatedPage.href = "/another"
    response.push(item,anotherPage,updatedPage)
    res.jsonp(response)
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use('/backend/api', router)
server.listen(8080, () => {
  console.log('JSON Server is running')
})