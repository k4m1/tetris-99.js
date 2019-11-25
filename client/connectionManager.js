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
            this.initSession()

            this.connection.send('create-session')
        })
        this.connection.addEventListener('message', e => {
            console.log('recv msg', event.data)
        })
    }

    send = data => {
        const msg = JSON.stringify(data);
        console.log(snding msg);
        this.connection.send(msg);
    }
}