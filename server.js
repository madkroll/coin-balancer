const http = require('http');

const hostname = '127.0.0.1';
const port = 8090;

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        return;
    } else if (req.url === '/build') {
        require('./service/report').build();
    } else if (req.url === '/show') {
        let view = require('fs').readFileSync('index.html', 'utf-8');

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(view);
    } else if (req.url === '/fetch') {
        let view = JSON.stringify(require('./service/report').fetch());

        res.writeHead(200, {'Content-Type': 'text/html', "Access-Control-Allow-Origin": "*"});
        res.write(view);
    }

    res.statusCode = 200;
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});