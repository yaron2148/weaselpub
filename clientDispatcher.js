"use strict";

class ClientDispatcher {
    constructor() {
        this.clientsList = {};
    }
    addClient(client){
        this.clientsList[client.id] = client;
        console.log("client.id: " + client.id + " connected. Left: " + Object.keys(this.clientsList).length);
    }
    removeClient(client){
        delete this.clientsList[client.id];
        console.log("client.id: " + client.id + " disconnected. Left: " + Object.keys(this.clientsList).length);
    }
    getClients(){
        return Object.keys(this.clientsList);
    }
    forEach(cbk) {
        this.getClients().forEach(f => cbk(this.clientsList[f], f));
    }
}

module.exports = { ClientDispatcher:ClientDispatcher };
