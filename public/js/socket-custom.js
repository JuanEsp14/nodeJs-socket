var socket = io();
//Function "ON" is for listenning information
socket.on('connect', function() {
    console.log('Server connected');
});
//Function "ON" is for listenning information
socket.on('disconnect', function() {
    console.log('Lost server connection');
});

//Function "emit" is for send information only to server
socket.emit('sendMessage', {
    user: 'Juan',
    message: 'Hello world'
}, (resp) => {
    console.log('Server answer: ', resp);
});

//Listenning the server
socket.on('sendMessage', (message) => {
    console.log(message);
});