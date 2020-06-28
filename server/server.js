const express = require('express');
//Socket.io don't work with express, then i need use the NodeJS's library http
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');
const app = express();
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

//Crete server for Socket.Io
let server = http.createServer(app);

app.use(express.static(publicPath));

//Inicialitized backend communication with Socket.Io
module.exports.io = socketIo(server);
require('./sockets/socket');

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Server running on port ${ port }`);

});