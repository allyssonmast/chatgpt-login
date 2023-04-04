const mongoose = require('mongoose');
require('dotenv').config();
class Database {
    constructor(url) {
        this.url = url
        this.client = null;
    }

    async connect() {
        const url = "mongodb+srv://allyssonmast:a451412@allyssoncluster.uemd966.mongodb.net/mycontacts-backend?retryWrites=true&w=majority"
        this.client = await mongoose.connect(url);
        console.log('Database connect', this.client.host, this.client.name);
    }

    async disconnect() {
        await this.client.close();
        this.client = null;
        this.db = null;
    }

    getCollection(name) {
        return this.db.collection(name);
    }
}

module.exports = Database;
