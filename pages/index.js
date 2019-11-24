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


const draw = () => {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.clientWidth, canvas.height);
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


const playerDrop = () => {
    player.pos.y++;
    dropCounter = 0
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

const player = {
    pos: { x: 5, y: 5},
    matrix: matrix,
}

// These event listners will move the player left or right by incremnting the x plane
// the 'down' control sets our 'dropCounter' to zero which tirggers a 'move' down one position
document.addEventListener('keydown', e => {
    if (e.keyCode === 37) {
        player.pos.x--;
    } else if (e.keyCode === 39) {
        player.pos.x++;
    } else if (e.keyCode === 40) {
        dropCounter = 0
    }

})

update()
