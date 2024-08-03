const players = {};

function addPlayer(id) {
    players[id] = {
        x: Math.random() * 750,
        y: Math.random() * 550,
        color: getRandomColor(),
        speed: 5,
        direction: null
    };
}

function removePlayer(id) {
    delete players[id];
}

function handleKeydown(id, key) {
    if (players[id]) {
        switch (key) {
            case 'ArrowUp':
                players[id].direction = 'up';
                break;
            case 'ArrowDown':
                players[id].direction = 'down';
                break;
            case 'ArrowLeft':
                players[id].direction = 'left';
                break;
            case 'ArrowRight':
                players[id].direction = 'right';
                break;
        }
    }
}

function handleKeyup(id, key) {
    if (players[id]) {
        if ((key === 'ArrowUp' && players[id].direction === 'up') ||
            (key === 'ArrowDown' && players[id].direction === 'down') ||
            (key === 'ArrowLeft' && players[id].direction === 'left') ||
            (key === 'ArrowRight' && players[id].direction === 'right')) {
            players[id].direction = null;
        }
    }
}

function getGameState() {
    for (const id in players) {
        const player = players[id];
        if (player.direction === 'up') player.y -= player.speed;
        if (player.direction === 'down') player.y += player.speed;
        if (player.direction === 'left') player.x -= player.speed;
        if (player.direction === 'right') player.x += player.speed;
    }
    return { players };
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

module.exports = { addPlayer, removePlayer, handleKeydown, handleKeyup, getGameState };
