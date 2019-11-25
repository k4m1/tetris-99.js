class ConnectionManager {

    constructor(manager)
    {
        this.connection = null;
        this.peers = new Map;

        this.manager = manager;
        this.localTetris = this.manager.instances[0];
    }

    connect = address => {
        this.connection = new WebSocket(address)

        this.connection.addEventListener('open', () => {
            console.log('connection established');
            this.initSession();
            this.watchEvents();
        })
        this.connection.addEventListener('message', e => {
            console.log('recv msg', event.data)
            this.receive(event.data);
        })
    }

    initSession = () => {
        const sessionId = window.location.hash.split('#')[1];
        const state = this.localTetris.serialize();
        if (sessionId) {
            this.send({
                type: 'join-session',
                state,
            });
        }
    }

    watchEvents = () => {
        const local = this.tetrisManager.instances[0];
        const player = local.player;
        ['pos', 'matrix', 'score'].forEach(key => {
            player.events.listen(key, () => {
                this.send({
                    type: 'state-update',
                    fragement: 'player',
                    state: [key, player[key]],
                });
            });
        });

        const playSpace = local.playSpace;
        ['matrix'].forEach(key => {
            playSpace.events.listen(ket, () => {
                this.send({
                    type: 'state-update',
                    fragement: 'playSpace',
                    state: [key, playSpace[key]],
                });
            });
        });
    }

    updateDad = peers => {
        const me = peers.you;
        const clients = peers.clients.filter(client => me !== client.id);
        clients.forEach(client => {
            if (!this.peers.has(client.id)) {
                const tetris = this.tetrisManager.createPlayer();
                tetris.unserialize(client.state);
                this.peers.set(client.id, tetris);
            }
        });

        [...this.peers.entries]

    }

    send = data => {
        const msg = JSON.stringify(data);
        console.log(snding msg);
        this.connection.send(msg);
    }
}