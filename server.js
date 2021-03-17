const http = require('http')
const hostName = '127.0.0.1'
const port = 8000
const server = http.createServer(serverLive)
function serverLive(request,response) {
    response.write('<h1>Hello, World</h1>')
    response.end()
} 

server.listen(port, () => {
    console.log(`Server running at http://${hostName}:${port}/ `)
})