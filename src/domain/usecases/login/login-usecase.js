// useCases/user/loginUserUseCase.js
const { NotFoundError, UnauthorizedError } = require('../../../utils/erros/app-erros');

class LoginUserUseCase {
  constructor(userRepository, jwtSecret, bcrypt, jwt) {
    this.userRepository = userRepository;
    this.jwtSecret = jwtSecret;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new UnauthorizedError('Email and password are required');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const passwordMatch = await this.bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedError('Email or password invalid');
    }

    const token = this.jwt.sign({ userId: user.id }, this.jwtSecret);
    return { token };
  }
}

module.exports = LoginUserUseCase;
