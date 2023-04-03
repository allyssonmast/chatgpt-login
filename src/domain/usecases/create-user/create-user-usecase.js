const AppError = require('../../../utils/erros/app-erros')

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(user) {
    if (!user.email) {
      throw new AppError('Email is required')
    }

    if (!user.password) {
      throw new AppError('Password is required')
    }

    const existingUser = await this.userRepository.findByEmail(user.email)

    if (existingUser) {
      throw new AppError('E-mail already registered')
    }

    const userCreate = await this.userRepository.create(user)

    return userCreate
  }
}

module.exports = CreateUserUseCase
