const http = require('http')
const fs   = require('fs')
const url = require('url');

// Your code here! We've required a few of the libraries you'll need to complete the project. 
const hostName = '127.0.0.1'
const port = 8000
const server = http.createServer(serverLive)

// console.log(url)

function serverLive(request,response) {
    // response.write('<h1>Hello, World</h1>')
    // response.end()
    function renderText(data,statusCode = 200) {
        response.writeHead(statusCode)
        response.write(data)
        response.end()
    }
     
    function renderHtml(path, queryRep = {name: 'segun'}) {
        console.log(queryRep)
        fs.readFile(path, 'utf8', (err, res) => {
            if(err) {
                console.log('Error processing data')
            }else {
                Object.keys(queryRep).forEach(params => {
                    res = res.replace(`{{${params}}}`, queryRep[params])
                })
                renderText(res)
            }
        })
    }
    
    let URL = url.parse(request.url)
    if(URL.pathname === '/') {
        let querys = url.parse(request.url, true).query
        renderHtml("index.html",querys)
        // renderText('<h1>Hello, World</h1>')
    }else if(URL.pathname === '/dogs') {
        let querys = url.parse(request.url, true).query
        renderHtml("dog.html",querys)
    }else {
        renderText('Sorry, that route does not exist.',404)
    }
    // console.log(URL)
 
} 


server.listen(port, () => {
    console.log(`Server running at http://${hostName}:${port}/ `)
})