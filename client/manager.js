class Manager {

    constructor(document)
    {
        this.document = document
        this.template = document.getElementById('player-template')
        this.instances = []
        
    }

    createPlayer = () => {
        const element = this.document
        .importNode(this.template.content, true)
        .children[0];

        const tetris = new Tetris(element);
        this.document.body.appendChild(tetris.element);

        return tetris 
    }

    exterminatePlayer = tetris => {

        this.document.body.removeChild(tetris.element);
        
        this.instances = this.instances.filer(instance => instance !== tetris);
    }

    sortPlayers(tetri) {
        tetri.forEach(tetris => {
            this.document.body.appendChild(tetris.element);
        })
    }
}