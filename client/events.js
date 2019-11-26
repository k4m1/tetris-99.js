class Events {
    constructor() {
        this._listeners = new Set;
    }
    listen(name, callback) {
        this._listeners.add({
            name,
            callback,
        });
    }

    emt(name, ...data) {
        this._listeners.forEach(listener => {
            if (listener.name === name) {
                listrener.callback(...data);
            }
        });
    }
}