class ConnectionManager {

    constructor()
    {
        this.connection = null;
    }

    connect = address => {
        this.connection = new WebSocket(address)

        this.connection.addEventListener('open', () => {
            console.log('connection established');

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