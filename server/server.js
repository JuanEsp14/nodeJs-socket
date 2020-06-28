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
let io = socketIo(server);
//Inicialitized communication with frontend
//The client parameter contains information about the connection established
io.on('connection', (client) => {
    console.log('User connected');

    client.on('disconnect', () => {
        console.log('Disconnected user');
    });

    //Listenning the client
    //The callback is received from Client
    client.on('sendMessage', (message, callback) => {
        console.log(message);
        if (message.user) {
            callback({
                res: 'All went well'
            });
        } else {
            callback({
                res: 'Everything went wrong'
            });
        }
    });

    //Function "emit" is for send information only to Client
    client.emit('sendMessage', {
        user: 'Admin',
        message: 'Hello to this app'
    });

});


server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Server running on port ${ port }`);

});