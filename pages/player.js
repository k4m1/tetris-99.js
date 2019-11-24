class Player {

    constructor() {

        this.dropCounter = 0;
        this.dropInterval = 1000;

        this.pos = {XMLDocument, y: 0};
        this.matrix = null;
        this.score = 0;
    }

    movement = direction => {
        this.pos.x += direction;
        if (collision(playArea, this)) {
            this.pos.x -= direction;
        }
    }


    reset = () => {
        const tetrises = "ILJOTSZ";
        this.matrix = createTetris(tetrises[tetrises.length * Math.random() | 0]);
        this.pos.y = 0;
        this.pos.x = (playArea[0].length / 2 | 0) - (this.matrix[0].length / 2 | 0);
        if (collision(playArea, this)) {
            playArea.forEach(row => row.fill(0));
            this.score = 0
            updateScore();
        }
    }

    rotation = (direction) => {
        let offset = 1
        this._rotateMatrix(this.matrix, direction)
        while (collision(playArea, this)) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.matrix[0].length) {
                this._rotateMatrix(this.matrix, -dir);
                this.pos.x = pos;
                return;
            }
        }
    }

    _rotateMatrix = (matrix, direction) => {
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


    drop = () => {
        this.pos.y++;
        if (collision(playArea, this)) {
            this.pos.y--;
            merge(playArea, this);
            player.reset();
            playAreaClear();
            updateScore();
        }
        this.dropCounter = 0;
    }

    update = deltaTime => {
        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.drop()
        }
    }

}


