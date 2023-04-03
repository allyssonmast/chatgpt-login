const User = require('../models/User')

class UserRepository {
  async findByEmail(email) {
    return User.findOne({ email })
  }
}

module.exports = UserRepository
