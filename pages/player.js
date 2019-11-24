class player {

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

}


