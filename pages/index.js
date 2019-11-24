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

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0

const update = (time = 0) => {
    const deltatime = time - lastTime;
    lastTime = time

    dropCounter += deltatime
    if (dropCounter > dropInterval) {
        player.pos.y++;
        dropCounter = 0;
    }
    draw();
    requestAnimationFrame(update);

}

const player = {
    pos: { x: 5, y: 5},
    matrix: matrix,
}

document.addEventListener('keydown', e => {
    console.log(event);
})

update()
