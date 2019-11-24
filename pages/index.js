import { createTracing } from "trace_events";

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20);

context.fillStyle = '#000';
context.fillRect(0,0, canvas.clientWidth, canvas.height);




const collision = (playArea, player) => {
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
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
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


const playerDrop = () => {
    player.pos.y++;
    if (collision(playArea, player)) {
        player.pos.y--;
        merge(playArea, player);
        playerReset();
    }
    dropCounter = 0;
}

const playerMove = direction => {
    player.pos.x += direction;
    if (collision(playArea, player)) {
        player.pos.x -= direction;
    }
}

const playerReset = () => {
    const tetrises = "ILJOTSZ";
    player.matrix= createTetris(tetrises[tetrises.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (playArea[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
    if (collision(playArea, player)) {
        playArea.forEach(row => row.fill(0));
    }
}

const playerRotation = (direction) => {
    let offset = 1
    rotate(player.matrix, direction)
    while (collision(playArea, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
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
    matrix: createTetris('T'),
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

const colors = [
null,
'purple',
'yellow',
'blue',
'orange',
'light blue',
'green',
'red'
]

update()
