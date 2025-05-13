const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    if(url === '/') {
        res.writeHead(200, {'Content-type': 'text/plain'})
        res.end('Home page')
    }
    else if(url === '/projects') {
        res.writeHead(200, { "Content-type": "text/plain" });
        res.end("Projects");
    }
    else {
        res.writeHead(404, { "Content-type": "text/plain" });
        res.end("This page cannot be found!");
    }
})

const port = 4000
server.listen(port, () => {
    console.log(`Server is now listening to ${port}`);
});