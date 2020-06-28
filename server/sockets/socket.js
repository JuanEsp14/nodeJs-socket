const { io } = require('../server');

//Inicialitized communication with frontend
//The client parameter contains information about the connection established
io.on('connection', (client) => {
    console.log('User connected');

    client.on('disconnect', () => {
        console.log('Disconnected user');
    });

    //Listenning the client
    //The callback is received from Client
    client.on('sendMessage', (data, callback) => {
        console.log(data);
        client.broadcast.emit('sendMessage', data)
            // if (message.user) {
            //     callback({
            //         res: 'All went well'
            //     });
            // } else {
            //     callback({
            //         res: 'Everything went wrong'
            //     });
            // }
    });

    //Function "emit" is for send information only to Client
    client.emit('sendMessage', {
        user: 'Admin',
        message: 'Hello to this app'
    });

});