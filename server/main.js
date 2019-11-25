const WebSocketServer = require('ws').Server;

const server = new WebSocketServer({port: 42069})

const sessions = new Map;

class Session {
    constructor(id) {
        this.id = id
    }
}


server.on('connection', connection => {
    console.log('connected')

    connection.on('message', msg => {
        console.log('mesg recived', msg)

        if (msg === 'create-session') {
            const sessions = new Session('alakazam');
            sessions.set(session.is, session);
            console.log(sessions)
        }
    })

    connection.on('close', () => {
        console.log('disconnected')
    })
})