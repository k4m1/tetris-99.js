class Client {
  constructor(connection, id) {
    this.connection = connection;
    this.id = id;
    this.session = null;

    this.state = {
      playArea: {
        matrix: [],
      },
      player: {
        matrix: [],
        pos: {X: 0, y: 0},
        score: 0,
      },
    };
  }


  broadcast = data => {
    if (!this.session) {
      throw new Error('Can not cast without a session')
    }

    data.clientId = this.id;

    [...this.session.clients].filter(client => client !== this).forEach(client => client.send(data));
  }

  send = data => {
      const msg = JSON.stringify(data);
      console.log('putting the letter in the mail box')
      this.comm.send(msg, function ack(err) {
          if (err) {
              console.log('msg fail', msg, err)
          }
      })
  }
}

module.exports = Client;
 