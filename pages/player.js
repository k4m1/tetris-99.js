class Player {

    constructor() {
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

    rotation = (direction) => {
        let offset = 1
        rotate(this.matrix, direction)
        while (collision(playArea, this)) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.matrix[0].length) {
                rotate(this.matrix, -dir);
                this.pos.x = pos;
                return;
            }
        }
    }

}


