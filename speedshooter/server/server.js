const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const game = require('./game');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('client'));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    game.addPlayer(socket.id);

    socket.on('keydown', (key) => {
        game.handleKeydown(socket.id, key);
    });

    socket.on('keyup', (key) => {
        game.handleKeyup(socket.id, key);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        game.removePlayer(socket.id);
    });
});

setInterval(() => {
    io.sockets.emit('state', game.getGameState());
}, 1000 / 60);

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
