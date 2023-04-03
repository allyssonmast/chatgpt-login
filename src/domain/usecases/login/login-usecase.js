class LoginUserUseCase {
  constructor(userRepository, bcrypt) {
    this.userRepository = userRepository
    this.bcrypt = bcrypt
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('Incorrect email/password combination')
    }

    const passwordMatched = await this.bcrypt.compare(
      password,
      user.passwordHash
    )

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination')
    }

    return user.id
  }
}

module.exports = LoginUserUseCase
