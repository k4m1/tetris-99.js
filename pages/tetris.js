const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20);

// context.fillStyle = '#000';
// context.fillRect(0,0, canvas.clientWidth, canvas.height);


const playAreaClear = () => {
    let rowCount = 1;
    outer: for (let y = playArea.length -1; y > 0; --y) {
        for (let x = 0; x < playArea[y].length; ++x) {
            if (playArea[y][x] === 0) {
                continue outer;
            }
        }
        const row = playArea.splice(y, 1)[0].fill[0];
        playArea.unshift(row);
        ++y;

        player.score += rowCount * 100
        rowCount *= 20
    }

}


const collision = (playArea, player) => {
    const m = player.matrix;
    const o = player.pos;

    for (let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[y].length; x++) {
            if (m[y][x] !== 0 &&
                (playArea[y + o.y] &&
                    playArea[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false
}

const createMatrix = (width, height) => {
    const matrix = [];
    // while height is not 0
    while (height--) {
        matrix.push(new Array(width).fill(0));
    }
    return matrix

}

const createTetris = type => {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                    y + offset.y,
                    1, 1);
            }
        });
    });
}

const draw = () => {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.clientWidth, canvas.height);
    drawMatrix(playArea, {x: 0, y: 0})
    drawMatrix(player.matrix, player.pos)
}


const merge = (playArea, player) => {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0 ) {
                playArea[y + player.pos.y][x + player.pos.x] = value
            }
        })
    })
}

const rotate = (matrix, direction) => {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < y; x++) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                    matrix[y][x],
                    matrix[x][y],
                ]
        }
    }

    if (direction > 0) {
        matrix.forEach(row => row.reverse())
    } else {
        matrix.reverse();
    }

}


const playerDrop = () => {
    player.pos.y++;
    if (collision(playArea, player)) {
        player.pos.y--;
        merge(playArea, player);
        playerReset();
        playAreaClear();
        updateScore();
    }
    dropCounter = 0;
}




const playerReset = () => {
    const tetrises = "ILJOTSZ";
    player.matrix = createTetris(tetrises[tetrises.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (playArea[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
    if (collision(playArea, player)) {
        playArea.forEach(row => row.fill(0));
        player.score = 0
        updateScore();
    }
}









let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0

const update = (time = 0) => {
    const deltatime = time - lastTime;
    lastTime = time

    dropCounter += deltatime
    if (dropCounter > dropInterval) {
        playerDrop()
    }

    lastTime = time;

    draw();
    requestAnimationFrame(update);
}

const updateScore = () => {
    document.getElementById('score').innerText = player.score
}

const playArea = createMatrix(12, 20);
const player = new Player;

// These event listners will move the player left or right by incremnting the x plane
// the 'down' control sets our 'dropCounter' to zero which tirggers a 'move' down one position
document.addEventListener('keydown', e => {
    if (e.keyCode === 37) {
        player.movement(-1);
    } else if (e.keyCode === 39) {
        player.movement(1);
    } else if (e.keyCode === 40) {
        playerDrop()
    } else if (e.keyCode === 81) {
        player.rotation(-1)
    } else if (e.keyCode === 87) {
        player.rotation(1)
    }

})

const colors = [
null,
'purple',
'yellow',
'blue',
'orange',
'light blue',
'green',
'red'
];



 
playerReset();
update();
updateScore();
