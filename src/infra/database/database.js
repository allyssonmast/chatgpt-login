const { MongoClient } = require('mongodb');

class Database {
    constructor({ url, dbName }) {
        this.url = url;
        this.dbName = dbName;
        this.client = null;
    }

    async connect() {
        this.client = await MongoClient.connect(this.url, { useUnifiedTopology: true });
        this.db = this.client.db(this.dbName);
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
