const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20);

context.fillStyle = '#000';
context.fillRect(0,0, canvas.clientWidth, canvas.height);

const matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
];


const collision(playArea, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[y].length; x++) {
            if (m[y][x] !== 0 && (playArea[y + o.y] && playArea[y + o.y][x + o.x]) !== 0) {
                return true

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


const draw = () => {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.clientWidth, canvas.height);
    drawMatrix(playArea, {x: 0, y: 0})
    drawMatrix(player.matrix, player.pos)
}

const drawMatrix = (nmatrix, offset) => {
    
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value != 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

const merge = (playArea, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0 ) {
                playArea[y + player.pos.y][x + player.pos.x] = value
            }
        })
    })
}


const playerDrop = () => {
    player.pos.y++;
    if (collision(playArea, player)) {
        player.pos.y--;
        merge(playArea, player);
        player.pos.y = 0;
    }
    dropCounter = 0;
}

const playerMove = direction => {
    player.pos.x += direction;
    if (collision(playArea, player)) {
        player.pos.x -= direction;
    }
}

const playerRotation = (direction) => {
    rotate(player.matrix, direction)
}


const rotate = (matrix, direction) => {
    for (let y = 0; y < matrix.length; y++ ) {
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
    draw();
    requestAnimationFrame(update);

}

const playArea = createMatrix(12, 20);


const player = {
    pos: { x: 5, y: 5},
    matrix: matrix,
}

// These event listners will move the player left or right by incremnting the x plane
// the 'down' control sets our 'dropCounter' to zero which tirggers a 'move' down one position
document.addEventListener('keydown', e => {
    if (e.keyCode === 37) {
        playerMovement(-1);
    } else if (e.keyCode === 39) {
        playerMovement(1);
    } else if (e.keyCode === 40) {
        playerDrop()
    } else if (e.keyCode === 81) {
        playerRotation(-1)
    } else if (e.keyCode === 87) {
        playerRotation(1)
    }

})

update()
