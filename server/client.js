class Client {
  constructor(connection) {
    this.connection = connection;
    this.session = null;
  }

  send = data => {
        const msg = JSON.stringify(data);

      console.log('putting the letter in the mail box')
      this.comm.send(msg, function ack(err) {
          if (err) {
              console.error('msg fail', msg, err)
          }
      })
  }
}

module.exports = Client;
 