const bcrypt = require('bcrypt')

class HashPassword {
    constructor() {
        this.saltRounds = 10;
    }

    async execute(password) {
        const hashedPassword = await bcrypt.hash(password, this.saltRounds);
        return hashedPassword;
    }

    async compare(password, hashedPassword) {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }
}

module.exports = HashPassword;
