const http = require('http')



const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to pur community. we are very happy</h1>')
});

server.listen(4000);