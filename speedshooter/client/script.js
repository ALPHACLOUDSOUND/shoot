const socket = io();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let players = {};

socket.on('state', (gameState) => {
    players = gameState.players;
    drawGame();
});

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const id in players) {
        const player = players[id];
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, 50, 50);
    }
}

document.addEventListener('keydown', (event) => {
    socket.emit('keydown', event.key);
});

document.addEventListener('keyup', (event) => {
    socket.emit('keyup', event.key);
});
