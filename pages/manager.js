class Manager {

    constructor(document)
    {
        this.document = document

        this.template = document.getElementById('player-template')

        this.instances = []
        const playerElements = document.querySelectorAll('.player');
        [...playerElements].forEach(element => {
            const tetris = new Tetris(element);
            tetri.push(tetris);
    });
    }

    createPlayer = () => {
        cosnt element = this.document.importNode(this.template.content, true)
         
    }
}