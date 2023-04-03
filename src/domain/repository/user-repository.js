module.exports = class FakeUserRepository {
  constructor() {
    this.users = []
  }

  async findByEmail(email) {
    return this.users.find((user) => user.email === email)
  }

  async findById(id) {
    return this.users.find((user) => user.id === id)
  }

  async create(user) {
    this.users.push(user)
    return user
  }
}
