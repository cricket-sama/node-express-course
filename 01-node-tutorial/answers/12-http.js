const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req)
    if(req.url === '/'){
        res.end('Howdy there, pal!')
    } else if(req.url === '/about'){
        res.end('Here is a little about us...')
    } else
    res.end(`
        <h1>Oopsie!</h1>
        <p>We couldn't find the page you were looking for...</p>
        <a href='/'>Go Home</a>
    `)
})

server.listen(3000)