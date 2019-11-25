class Session {
  constructor(id) {
    this.id = id;
    this.clients = new Set();
  }

  join = client => {
    if (client.session) {
      throw new Error("client is already in the session my guy");
    }
    this.clients.add(client);
    client.session = this;
  }

  leave = client => {
    if (client.session !== this) {
      throw new Error("client is not in the session so they cannot leave");
    }
    this.clients.delete(client);
    client.session = null;
  }
}

module.exports = Session;
