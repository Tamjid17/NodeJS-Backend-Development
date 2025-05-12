const http = require('http')

const server = http.createServer((req, res) => {

    console.log(req, 'req');
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Hello from node js http module')

});

const port = 4000;
server.listen(port, () => {
    console.log(`Server is now listening to ${port}`)
})