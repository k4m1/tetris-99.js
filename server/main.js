const WebSocketServer = require('ws').Server;

const server = new WebSocketServer({port: 42069})

const sessions = new Map;

class Session {
    constructor(id) {
        this.id = id
    }
}

createId = (length = 6, chars = 'abcdefghjkmopqrstwxyz1234567890') {
    let id = '';
    while (len--) {
        id += chars[Math.random() * chars.length | 0];
    }
    return id
}


server.on('connection', connection => {
    console.log('connected')

    connection.on('message', msg => {
        console.log('mesg recived', msg)

        if (msg === 'create-session') {
            const id = createId()
            const sessions = new Session(id);
            sessions.set(session.is, session);
            console.log(sessions)
        }
    })

    connection.on('close', () => {
        console.log('disconnected')
    })
})