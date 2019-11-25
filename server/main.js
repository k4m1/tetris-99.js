const WebSocketServer = require('ws').Server;

const server = new WebSocketServer({port: 42069})

const sessions = new Map;

class Session {
    constructor(id) {
        this.id = id
        this.clients = new Set
    }

    join(client) {
        if (client.session) {
            throw new Error('client is already in the session my guy');
        }
        this.clients.add(client);
        client.session = this;
    }

    leave(client) {
        if (client.session !== this) {
            throw new Error('client is not in the session so they cannot leave')
        }
        this.clients.delete(client);
        client.session = null;
    }
}

class Client {
    constructor(connection) {
        this.connection = connection
        this.session = null;
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
    const client = new Client(connection);

    connection.on('message', msg => {
        console.log('mesg recived', msg)

        if (msg === 'create-session') {
            const id = createId()
            const sessions = new Session(id);
            session.join(client);
            sessions.set(session.is, session);
            console.log(sessions)
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