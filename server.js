const http = require('http');
const app = require('./app');
const server =  http.createServer(app);
var port = 3000;

server.listen( port, () => {
    console.log('The server is running!');
    console.log('At port http://localhost:' + port);
});