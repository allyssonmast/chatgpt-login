const mongoose = require('mongoose');

class MongoConfig {
    constructor() {
        dotenv.config();
    }

    async connect() {
        try {
            const url = process.env.MONGODB_URI;
            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };

            await mongoose.connect(url, options);
            console.log('MongoDB connected');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

    async disconnect() {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
}

module.exports = MongoConfig;
