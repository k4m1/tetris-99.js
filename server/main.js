const WebSocketServer = require('ws').Server;
const session = require('./session')
const client = require('./client')

const server = new WebSocketServer({port: 42069})

const sessions = new Map;



createId = (length = 6, chars = 'abcdefghjkmopqrstwxyz1234567890') {
    let id = '';
    while (len--) {
        id += chars[Math.random() * chars.length | 0];
    }
    return id
}


server.on('connection', connection => {
    console.log('connected')
    const client = new Client(connection);

    connection.on('message', msg => {
        console.log('mesg recived', msg)

        if (msg === 'create-session') {
            const id = createId()
            const sessions = new Session(id);
            session.join(client);
            sessions.set(session.is, session);
            client.send(session.id)
        }
    })

    connection.on('close', () => {
        console.log('disconnected')
        cinst session = client.session;
        if (session) {
            client.leave(client)
            if (session.clients.size === 0) {
                sessions.delete(session.id)
            }
        }

    });
});