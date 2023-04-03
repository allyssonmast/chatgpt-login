const User = require('../../domain/entities/user');

class UserRepository {
    constructor(database) {
        this.database = database;
    }

    async findByEmail(email) {
        const collection = await this.database.getCollection('users');
        const user = await collection.findOne({ email });
        return user && new User(user);
    }

    async save(user) {
        const collection = await this.database.getCollection('users');
        const { id, ...userWithoutId } = user;
        const result = await collection.updateOne({ id }, { $set: userWithoutId }, { upsert: true });
        if (result.upsertedCount) {
            user.id = result.upsertedId._id;
        }
        return user;
    }
}


module.exports = UserRepository;
