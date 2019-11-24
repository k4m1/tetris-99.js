class Manager {

    constructor(document)
    {
        this.document = document
        this.instances = []
        const playerElements = document.querySelectorAll('.player');
        [...playerElements].forEach(element => {
            const tetris = new Tetris(element);
            tetri.push(tetris);
    });
    }




}